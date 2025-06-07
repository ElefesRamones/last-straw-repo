# EmailJS Template Anti-Threading Configuration

## The Problem
Gmail groups emails with similar subjects and content patterns into conversations, making it difficult to distinguish individual form submissions.

## The Solution
Configure your EmailJS template with these specific settings to break Gmail's threading algorithm.

## Step 1: Access Your EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Navigate to **Email Templates**
3. Select template `template_ti5dryi`
4. Click **Edit**

## Step 2: Configure Subject Line

**Replace the current subject with:**
```
{{email_subject}}
```

This will use our dynamically generated subject lines that rotate between 8 different patterns.

## Step 3: Update Email Body Template

**Replace the entire email body with this enhanced template:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Portfolio Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <!-- ANTI-THREADING HEADER (Hidden from view) -->
    <div style="display: none; font-size: 1px; color: transparent;">
        REF: {{inquiry_id}} | SESSION: {{session_id}} | MICRO: {{micro_timestamp}} | HASH: {{random_hash}} | THREAD_BREAKER: {{thread_breaker}} | SUBMISSION: {{submission_hash}}
    </div>
    
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Portfolio Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From {{from_name}}</p>
        </div>
        
        <!-- Content -->
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <!-- Inquiry Details -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
                <h2 style="color: #667eea; margin-top: 0;">Inquiry Details</h2>
                <p><strong>Name:</strong> {{from_name}}</p>
                <p><strong>Email:</strong> {{reply_to}}</p>
                <p><strong>Budget:</strong> {{budget}}</p>
                <p><strong>Timeline:</strong> {{timeline}}</p>
            </div>
            
            <!-- Message -->
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #333; margin-top: 0;">Message</h3>
                <div style="background: #f1f3f4; padding: 15px; border-radius: 5px; font-style: italic;">
                    {{message}}
                </div>
            </div>
            
            <!-- Technical Info -->
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                <h3 style="color: #6c757d; margin-top: 0; font-size: 16px;">Submission Details</h3>
                <div style="font-size: 12px; color: #6c757d; line-height: 1.4;">
                    <p><strong>Inquiry ID:</strong> {{inquiry_id}}</p>
                    <p><strong>Submitted:</strong> {{submission_time}}</p>
                    <p><strong>Timezone:</strong> {{client_timezone}}</p>
                    <p><strong>Reference:</strong> {{unique_ref}}</p>
                    <p><strong>Session:</strong> {{session_id}}</p>
                    <p><strong>Platform:</strong> {{client_platform}}</p>
                    <p><strong>Language:</strong> {{client_language}}</p>
                    <p><strong>Form Version:</strong> {{form_version}}</p>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 12px;">
            <p>This email was sent from your portfolio contact form</p>
            <p>Unique Reference: {{thread_breaker}}</p>
        </div>
    </div>
    
    <!-- ANTI-THREADING FOOTER (Hidden from view) -->
    <div style="display: none; font-size: 1px; color: transparent;">
        FINGERPRINT: {{user_agent}} | SCREEN: {{screen_info}} | HASH_END: {{submission_hash}} | RANDOM_TAIL: {{random_hash}}
    </div>
</body>
</html>
```

## Step 4: Configure Reply-To Field

In the template settings, make sure the **Reply-To** field is set to:
```
{{reply_to}}
```

## Step 5: Configure From Name

Set the **From Name** to:
```
Portfolio Contact - {{from_name}}
```

## Step 6: Save and Test

1. Click **Save** in the EmailJS template editor
2. Test the form on your website
3. Check Gmail to verify emails are no longer grouping

## Why This Works

1. **Dynamic Subject Lines**: 8 rotating subject patterns prevent Gmail from recognizing similar emails
2. **Hidden Unique Data**: Invisible content at the top and bottom with unique identifiers
3. **Variable Content Structure**: Each email has different technical details
4. **Multiple Fingerprints**: Browser, session, and timestamp data create unique signatures
5. **Thread Breakers**: Special fields designed to interrupt Gmail's threading algorithm

## Expected Result

Each form submission will now appear as a separate email in Gmail instead of being grouped into a conversation thread.

## Troubleshooting

If emails still group:
1. Verify all template variables are properly saved
2. Clear Gmail cache (sign out and back in)
3. Test with different email subjects manually
4. Check that the hidden anti-threading divs are properly configured

---

**Note**: After updating the template, wait 5-10 minutes for EmailJS to propagate the changes, then test the form.
