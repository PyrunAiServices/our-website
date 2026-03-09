import requests
import sys
from datetime import datetime
import json

class PyrunAiAPITester:
    def __init__(self, base_url="https://pyrun-refresh.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status: {response.status_code}")
            if response.status_code != expected_status:
                print(f"   Response: {response.text}")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ {name} - PASSED")
                return True, response.json() if response.text and response.text.strip() else {}
            else:
                print(f"❌ {name} - FAILED (Expected {expected_status}, got {response.status_code})")
                self.failed_tests.append({
                    'test': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'endpoint': endpoint,
                    'response': response.text[:200] if response.text else ''
                })
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ {name} - FAILED (Timeout)")
            self.failed_tests.append({
                'test': name,
                'error': 'Request timeout',
                'endpoint': endpoint
            })
            return False, {}
        except Exception as e:
            print(f"❌ {name} - FAILED (Error: {str(e)})")
            self.failed_tests.append({
                'test': name,
                'error': str(e),
                'endpoint': endpoint
            })
            return False, {}

    def test_health_check(self):
        """Test the root API endpoint"""
        return self.run_test("API Health Check", "GET", "/", 200)

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@pyrunai.com",
            "company": "Test Company",
            "message": "This is a test message for the PyrunAi contact form."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "/contact",
            200,
            data=test_data
        )
        
        if success and response:
            print(f"   Response Message: {response.get('message', 'No message')}")
            return response.get('status') == 'success'
        return success

    def test_contact_submission_with_booking(self):
        """Test contact form submission with preferred date/time"""
        test_data = {
            "name": f"Booking User {datetime.now().strftime('%H%M%S')}",
            "email": "booking@pyrunai.com",
            "company": "Booking Test Co",
            "message": "Testing calendar booking functionality with preferred date and time.",
            "preferred_date": "2025-08-25",
            "preferred_time": "14:30"
        }
        
        success, response = self.run_test(
            "Contact Form with Booking",
            "POST",
            "/contact",
            200,
            data=test_data
        )
        
        if success and response:
            print(f"   Response Message: {response.get('message', 'No message')}")
            return response.get('status') == 'success'
        return success

    def test_get_submissions(self):
        """Test getting contact submissions"""
        return self.run_test("Get Contact Submissions", "GET", "/contact/submissions", 200)

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("🚀 Starting PyrunAi Backend API Tests")
        print("=" * 60)
        
        # Test 1: Health Check
        self.test_health_check()
        
        # Test 2: Contact Form Submission
        self.test_contact_submission()
        
        # Test 3: Contact Form with Booking
        self.test_contact_submission_with_booking()
        
        # Test 4: Get Submissions
        self.test_get_submissions()
        
        # Print Results
        print("\n" + "=" * 60)
        print("📊 Backend API Test Results")
        print("=" * 60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "0%")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
                print(f"   • {test['test']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = PyrunAiAPITester()
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())