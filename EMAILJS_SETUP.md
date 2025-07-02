# EmailJS Setup and Troubleshooting Guide

## Current Configuration

The portfolio uses the following EmailJS setup:

- **Service ID**: `service_4gx9jau`
- **Template ID**: `template_30bq9w5`
- **Public Key**: `SuGitmy9neHJIi0UQ`

## ✅ SOLUTION - Fix EmailJS Contact Form

### Step 1: Verify EmailJS Account Setup

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in with your account
3. Verify the service ID `service_4gx9jau` exists
4. Check that template ID `template_30bq9w5` exists
5. Confirm public key `SuGitmy9neHJIi0UQ` is correct

### Step 2: Email Template Configuration

Your EmailJS template should include these variables:

```
{{from_name}} - Sender's name
{{from_email}} - Sender's email
{{message}} - Message content
{{to_name}} - Your name (Aadarsh Kumar)
{{reply_to}} - Reply-to email address
```

Example template:

```
Hello {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Message: {{message}}

You can reply directly to: {{reply_to}}

Best regards,
Portfolio Contact Form
```

### Step 3: Vercel Environment Variables

Add these to Vercel Dashboard → Settings → Environment Variables:

1. **VITE_EMAILJS_SERVICE_ID**: `service_4gx9jau`
2. **VITE_EMAILJS_TEMPLATE_ID**: `template_30bq9w5`
3. **VITE_EMAILJS_PUBLIC_KEY**: `SuGitmy9neHJIi0UQ`

Set for: Production, Preview, and Development

### Step 4: Test EmailJS Configuration

Open browser console and run:

```javascript
testEmailJS();
```

This will test your EmailJS configuration and show any errors.

### Step 5: Common Issues and Solutions

#### Issue: "Invalid public key"

- **Solution**: Check that the public key in environment variables matches your EmailJS account

#### Issue: "Invalid service ID"

- **Solution**: Verify the service ID exists in your EmailJS dashboard

#### Issue: "Template not found"

- **Solution**: Ensure template ID is correct and template is published

#### Issue: "Network error"

- **Solution**: Check internet connection and EmailJS service status

### Step 6: Alternative Email Services

If EmailJS continues to fail, consider these alternatives:

- **Formspree**: Simple form handling service
- **Netlify Forms**: Built-in form handling (if using Netlify)
- **Getform**: Form backend service
- **Contact form with backend API**: Custom email sending

### Step 7: Direct Contact Fallback

The form includes direct contact links as fallback:

- **Email**: Direct mailto link
- **GitHub**: Professional contact
- **LinkedIn**: Professional networking
- **Twitter**: Social contact

## Testing Checklist

- [ ] EmailJS account accessible
- [ ] Service ID correct
- [ ] Template ID correct and published
- [ ] Public key correct
- [ ] Environment variables set in Vercel
- [ ] Template variables match code
- [ ] Console shows no initialization errors
- [ ] Test function works in browser console

---

_If issues persist, users can still contact you via the direct social links provided in the contact section._
