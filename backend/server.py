from fastapi import FastAPI, APIRouter, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# -----------------------------
# ENVIRONMENT SETUP
# -----------------------------
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# -----------------------------
# MODELS
# -----------------------------
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = ""
    message: str
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


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


# -----------------------------
# EMAIL FUNCTION
# -----------------------------
def send_email(
    name: str,
    email: str,
    company: str,
    message: str,
    preferred_date: str = None,
    preferred_time: str = None,
):

    smtp_server = os.environ.get("SMTP_SERVER")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_username = os.environ.get("SMTP_USERNAME")
    smtp_password = os.environ.get("SMTP_PASSWORD")

    sender_email = os.environ.get("SENDER_EMAIL", smtp_username)
    admin_email = os.environ.get("RECIPIENT_EMAIL")

    if not all([smtp_server, smtp_username, smtp_password, admin_email]):
        logger.warning("SMTP configuration missing.")
        return False

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)

        # -----------------------------
        # EMAIL TO ADMIN
        # -----------------------------
        admin_html = f"""
        <h2>New Demo Booking from PyrunAI Website</h2>

        <b>Name:</b> {name}<br>
        <b>Email:</b> {email}<br>
        <b>Company:</b> {company or "Not provided"}<br><br>

        <b>Message:</b><br>
        {message}<br><br>

        Preferred Slot: {preferred_date or "N/A"} {preferred_time or ""}
        """

        admin_msg = MIMEMultipart()
        admin_msg["From"] = sender_email
        admin_msg["To"] = admin_email
        admin_msg["Subject"] = f"New Demo Request from {name}"

        admin_msg.attach(MIMEText(admin_html, "html"))
        server.send_message(admin_msg)

        # -----------------------------
        # EMAIL TO USER
        # -----------------------------
        user_html = f"""
        <h2>Thank you for contacting PyrunAI 🚀</h2>

        Hi {name},<br><br>

        Your demo request has been received successfully.

        Our team will review your request and contact you within
        <b>24 hours</b>.

        <br><br>

        <b>Your Message:</b><br>
        {message}

        <br><br>

        Best Regards,<br>
        <b>PyrunAI Team</b><br>
        info@pyrunai.com
        """

        user_msg = MIMEMultipart()
        user_msg["From"] = sender_email
        user_msg["To"] = email
        user_msg["Subject"] = "Your PyrunAI demo request has been received"

        user_msg.attach(MIMEText(user_html, "html"))
        server.send_message(user_msg)

        server.quit()

        logger.info("Admin + User emails sent successfully")

        return True

    except Exception as e:
        logger.error(f"Email failed: {str(e)}")
        return False


# -----------------------------
# ROUTES
# -----------------------------
@api_router.get("/")
async def root():
    return {"message": "PyrunAI API is running"}


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
        send_email,
        request.name,
        request.email,
        request.company or "",
        request.message,
        request.preferred_date,
        request.preferred_time,
    )

    return ContactResponse(
        status="success",
        message="Thank you! Your demo request has been submitted. Our team will contact you within 24 hours.",
    )


@api_router.get("/contact/submissions")
async def get_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(100)
    return submissions


app.include_router(api_router)


# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# SHUTDOWN EVENT
# -----------------------------
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
