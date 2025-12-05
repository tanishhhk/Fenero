from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
from datetime import datetime
import re
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pandas as pd
from io import BytesIO
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ==================== EMAIL CONFIGURATION ====================
# Add these to your .env file:
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'your-email@gmail.com')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'your-app-password')
OWNER_EMAILS = os.getenv('OWNER_EMAILS', 'owner1@example.com,owner2@example.com').split(',')

# ==================== DATABASE SETUP ====================
def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            phone TEXT,
            company TEXT,
            designation TEXT,
            role TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# ==================== HELPER FUNCTIONS ====================
def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def send_notification_email(user_data):
    """Send email to owners when new user signs up"""
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"🎉 New {user_data['role'].title()} Signup - {user_data['name']}"
        msg['From'] = SENDER_EMAIL
        msg['To'] = ', '.join(OWNER_EMAILS)
        
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #2980b9 0%, #3498db 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
                    <h1 style="margin: 0; font-size: 28px;">New User Registration!</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px;">Someone just joined Fenero</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; margin-top: 20px; border-radius: 10px; border-left: 4px solid #2980b9;">
                    <h2 style="color: #2c5f7f; margin-top: 0;">User Details</h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600; width: 40%;">Name:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['name']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Email:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['email']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Phone:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['phone']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Company:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['company']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Designation:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['designation']}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Role:</td>
                            <td style="padding: 12px 0;">
                                <span style="background: #e8f4f8; color: #2980b9; padding: 6px 12px; border-radius: 6px; font-weight: 600; text-transform: uppercase; font-size: 13px;">
                                    {user_data['role']}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; color: #5a8aad; font-weight: 600;">Registered:</td>
                            <td style="padding: 12px 0; color: #1e3a5f; font-weight: 500;">{user_data['created_at']}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffc107;">
                    <p style="margin: 0; color: #856404; font-size: 14px;">
                        ⚡ <strong>Action Required:</strong> Please reach out to this user within 24 hours.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; color: #5a8aad; font-size: 13px;">
                    <p>This is an automated notification from Fenero</p>
                </div>
            </body>
        </html>
        """
        
        msg.attach(MIMEText(html, 'html'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Email notification failed: {str(e)}")
        return False

def send_welcome_email(user_email, user_name):
    """Send welcome email to new user"""
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Welcome to Fenero! Our Team Will Contact You Soon"
        msg['From'] = SENDER_EMAIL
        msg['To'] = user_email
        
        html = f"""
        <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #2980b9 0%, #3498db 100%); padding: 40px; border-radius: 10px; color: white; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px;">Welcome to Fenero!</h1>
                    <p style="margin: 15px 0 0 0; font-size: 18px;">We're excited to have you on board, {user_name}</p>
                </div>
                
                <div style="padding: 30px 0;">
                    <h2 style="color: #2c5f7f; font-size: 22px;">What Happens Next?</h2>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2980b9;">
                        <p style="margin: 0; color: #1e3a5f; font-size: 16px; line-height: 1.6;">
                            <strong>Account Created Successfully</strong><br/>
                            Your registration has been received and our team has been notified.
                        </p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2980b9;">
                        <p style="margin: 0; color: #1e3a5f; font-size: 16px; line-height: 1.6;">
                            <strong>We'll Contact You Soon</strong><br/>
                            One of our financial experts will reach out within 24-48 hours to discuss your needs.
                        </p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2980b9;">
                        <p style="margin: 0; color: #1e3a5f; font-size: 16px; line-height: 1.6;">
                            <strong>Tailored Solutions</strong><br/>
                            We'll work together to find the perfect financial solution for your business.
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 20px; background: #e8f4f8; border-radius: 8px;">
                    <p style="margin: 0; color: #2c5f7f; font-size: 14px;">
                        Have questions? Reply to this email or call us at <strong>+91 8130718822 </strong>
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #5a8aad; font-size: 13px;">
                    <p>© 2024 Fenero. All rights reserved.</p>
                </div>
            </body>
        </html>
        """
        
        msg.attach(MIMEText(html, 'html'))
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Welcome email failed: {str(e)}")
        return False

# ==================== ROUTES ====================
@app.route('/')
def home():
    return jsonify({
        "message": "Fenero API is running",
        "status": "active",
        "version": "2.0"
    })

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        email = data.get('email', '').strip()
        name = data.get('name', '').strip()
        phone = data.get('phone', '').strip()
        company = data.get('company', '').strip()
        designation = data.get('designation', '').strip()
        role = data.get('role', '').strip()
        
        if not email or not name:
            return jsonify({"error": "Email and name are required"}), 400
        
        if not is_valid_email(email):
            return jsonify({"error": "Invalid email format"}), 400
        
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        try:
            c.execute('''INSERT INTO users (email, name, phone, company, designation, role) 
                        VALUES (?, ?, ?, ?, ?, ?)''', 
                     (email, name, phone, company, designation, role))
            conn.commit()
            user_id = c.lastrowid
            created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            user_data = {
                'id': user_id,
                'email': email,
                'name': name,
                'phone': phone,
                'company': company,
                'designation': designation,
                'role': role,
                'created_at': created_at
            }
            
            # Send notifications
            send_notification_email(user_data)
            send_welcome_email(email, name)
            
            return jsonify({
                "message": "Registration successful! Our team will contact you within 24-48 hours.",
                "user_id": user_id,
                "email": email
            }), 201
            
        except sqlite3.IntegrityError:
            return jsonify({"error": "This email is already registered with us"}), 409
        
        finally:
            conn.close()
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        c.execute('''SELECT id, email, name, phone, company, designation, role, created_at 
                    FROM users ORDER BY created_at DESC''')
        users = c.fetchall()
        conn.close()
        
        users_list = [
            {
                "id": u[0],
                "email": u[1],
                "name": u[2],
                "phone": u[3],
                "company": u[4],
                "designation": u[5],
                "role": u[6],
                "created_at": u[7]
            }
            for u in users
        ]
        
        return jsonify({"users": users_list, "count": len(users_list)}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/export-users', methods=['GET'])
def export_users():
    """Export all users to Excel file"""
    try:
        conn = sqlite3.connect('users.db')
        df = pd.read_sql_query('''SELECT id, name, email, phone, company, designation, 
                                 role, created_at FROM users ORDER BY created_at DESC''', conn)
        conn.close()
        
        # Create Excel file in memory
        output = BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Users')
            
            # Auto-adjust column widths
            worksheet = writer.sheets['Users']
            for idx, col in enumerate(df.columns):
                max_length = max(df[col].astype(str).apply(len).max(), len(col)) + 2
                worksheet.column_dimensions[chr(65 + idx)].width = min(max_length, 50)
        
        output.seek(0)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'fenero_users_{timestamp}.xlsx'
        
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name=filename
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    try:
        conn = sqlite3.connect('users.db')
        c = conn.cursor()
        
        c.execute('SELECT COUNT(*) FROM users')
        total_users = c.fetchone()[0]
        
        c.execute('SELECT COUNT(*) FROM users WHERE role = "borrower"')
        borrowers = c.fetchone()[0]
        
        c.execute('SELECT COUNT(*) FROM users WHERE role = "partner"')
        partners = c.fetchone()[0]
        
        c.execute('SELECT COUNT(*) FROM users WHERE DATE(created_at) = DATE("now")')
        today_signups = c.fetchone()[0]
        
        conn.close()
        
        return jsonify({
            "total_users": total_users,
            "borrowers": borrowers,
            "partners": partners,
            "today_signups": today_signups
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    init_db()
    print("=" * 50)
    print("Fenero API Server Starting...")
    print("=" * 50)
    print(f"Notifications will be sent to: {', '.join(OWNER_EMAILS)}")
    print(f"Excel exports available at: /api/export-users")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)