# Email Integration Setup Guide

## Overview
The temple booking system now supports sending automated emails with QR codes to devotees when they book a seva.

## Setup Instructions

### 1. Configure Email Credentials
Edit your `.env.local` file and add your email configuration:

```env
# Gmail SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=your-gmail@gmail.com
```

### 2. Gmail Setup (Recommended)
If using Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this 16-character password in EMAIL_PASS

### 3. Alternative Email Services
You can also use other SMTP providers by updating the .env.local file:
```env
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@provider.com
EMAIL_PASS=your-password
EMAIL_FROM=noreply@vidyaranyapuramutt.org
```

## Features
- **Automatic QR Code Generation**: Each booking gets a unique QR code
- **HTML Email Templates**: Professional-looking email with booking details
- **QR Code Attachment**: QR code attached as PNG file
- **Fallback System**: If email fails, shows mock notification

## How It Works
1. User fills booking form
2. System generates unique QR code (QR + timestamp)
3. Email API endpoint is called with booking details
4. QR code is generated and embedded in email
5. Professional HTML email is sent with booking details
6. QR code is also attached as separate file

## Testing
To test the email system:
1. Configure your .env.local with real email credentials
2. Make a test booking
3. Check your email inbox for the confirmation
4. Verify the QR code is properly generated and attached

## Dependencies
- `nodemailer` - Email sending library
- `qrcode` - QR code generation
- Environment variables for secure credential storage
