from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Content

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = ""
    message: str
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactRequest(BaseModel):
    name: str
    email: str
    company: Optional[str] = ""
    message: str
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None


class ContactResponse(BaseModel):
    status: str
    message: str


def send_email_via_sendgrid(name: str, email: str, company: str, message: str, preferred_date: str = None, preferred_time: str = None):
    api_key = os.environ.get('SENDGRID_API_KEY')
    sender_email = os.environ.get('SENDER_EMAIL', 'noreply@pyrunai.com')
    recipient_email = os.environ.get('RECIPIENT_EMAIL', 'info@pyrunai.com')

    if not api_key:
        logger.warning("SendGrid API key not configured, skipping email send")
        return False

    booking_row = ""
    if preferred_date and preferred_time:
        booking_row = f"""
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #1A365B;">Preferred Slot:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #334E68;"><strong style="color: #70E252;">{preferred_date} at {preferred_time} IST</strong> (30 min)</td>
                </tr>
        """

    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1A365B; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #FFFFFF; margin: 0;">New Demo Booking from PyrunAi Website</h2>
        </div>
        <div style="background: #F8FAFC; padding: 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #1A365B; width: 140px;">Name:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #334E68;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #1A365B;">Email:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #334E68;"><a href="mailto:{email}">{email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: #1A365B;">Company:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #334E68;">{company or 'Not provided'}</td>
                </tr>
                {booking_row}
                <tr>
                    <td style="padding: 12px 0; font-weight: bold; color: #1A365B; vertical-align: top;">Message:</td>
                    <td style="padding: 12px 0; color: #334E68;">{message}</td>
                </tr>
            </table>
        </div>
        <p style="color: #64748B; font-size: 12px; margin-top: 16px; text-align: center;">
            This email was sent from the PyrunAi website booking form.
        </p>
    </body>
    </html>
    """

    msg = Mail(
        from_email=sender_email,
        to_emails=recipient_email,
        subject=f"New Demo Request from {name} - {company or 'Individual'}",
        html_content=html_content
    )

    try:
        sg = SendGridAPIClient(api_key)
        response = sg.send(msg)
        logger.info(f"Email sent successfully. Status: {response.status_code}")
        return response.status_code == 202
    except Exception as e:
        logger.error(f"SendGrid email failed: {str(e)}")
        return False


@api_router.get("/")
async def root():
    return {"message": "PyrunAi API is running"}


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(request: ContactRequest, background_tasks: BackgroundTasks):
    submission = ContactSubmission(
        name=request.name,
        email=request.email,
        company=request.company or "",
        message=request.message,
        preferred_date=request.preferred_date,
        preferred_time=request.preferred_time,
    )

    doc = submission.model_dump()
    await db.contact_submissions.insert_one(doc)

    background_tasks.add_task(
        send_email_via_sendgrid,
        request.name,
        request.email,
        request.company or "",
        request.message,
        request.preferred_date,
        request.preferred_time,
    )

    return ContactResponse(
        status="success",
        message="Thank you! Your demo request has been submitted. We'll get back to you within 24 hours."
    )


@api_router.get("/contact/submissions")
async def get_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(100)
    return submissions


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
