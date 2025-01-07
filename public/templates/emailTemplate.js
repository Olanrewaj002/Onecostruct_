// src/templates/emailTemplate.js

export const generateEmailTemplate = ({
  ask__first__name,
  ask__last__name,
  ask__registration__email,
  ask__number,
  ask__subject,
  ask_message,
  currentDate,
}) => `
 <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Inquiry</title>
          <style>
            /* Reset styles */
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              line-height: 1.6;
              color: #2d3748;
              margin: 0;
              padding: 0;
              background-color: #f7fafc;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* Main container */
            .email-wrapper {
              background-color: #f7fafc;
              padding: 20px;
            }
            
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }

            /* Header styles */
            .header {
              background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }

            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
              letter-spacing: -0.025em;
            }

            .header p {
              margin: 10px 0 0;
              opacity: 0.9;
              font-size: 14px;
            }

            /* Content area */
            .content {
              padding: 30px;
            }

            /* Field styling */
            .field {
              margin-bottom: 25px;
              border-radius: 6px;
              overflow: hidden;
            }

            .field:last-child {
              margin-bottom: 0;
            }

            .field-label {
              font-weight: 600;
              color: #4a5568;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 0.05em;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
            }

            .field-value {
              background-color: #f8fafc;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              font-size: 15px;
              line-height: 1.6;
            }

            /* Message box specific styling */
            .message-box {
              background-color: #f8fafc;
              padding: 20px;
              border-radius: 6px;
              border: 1px solid #e2e8f0;
              margin-top: 10px;
              white-space: pre-line;
            }

            /* Priority indicator */
            .priority-badge {
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 500;
              margin-left: 8px;
              background-color: #FEF3C7;
              color: #92400E;
            }

            /* Contact actions */
            .contact-actions {
              margin-top: 25px;
              padding: 15px;
              background-color: #f8fafc;
              border-radius: 6px;
              text-align: center;
            }

            .action-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 500;
              margin: 0 10px;
            }

            /* Footer styling */
            .footer {
              text-align: center;
              margin-top: 30px;
              padding: 20px;
              background-color: #f8fafc;
              border-top: 1px solid #e2e8f0;
              font-size: 13px;
              color: #718096;
            }

            .footer p {
              margin: 5px 0;
            }

            /* Responsive design */
            @media only screen and (max-width: 600px) {
              .email-container {
                margin: 0;
                border-radius: 0;
              }
              
              .content {
                padding: 20px;
              }

              .action-button {
                display: block;
                margin: 10px 0;
              }
            }

            /* Links */
            a {
              color: #4F46E5;
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
                <p>${currentDate}</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="field-label">
                    Sender Information
                  </div>
                  <div class="field-value">
                    <strong>${ask__first__name} ${ask__last__name}</strong>
                  </div>
                </div>
                
                <div class="field">
                  <div class="field-label">
                    Contact Details
                  </div>
                  <div class="field-value">
                    📧 <a href="mailto:${ask__registration__email}">${ask__registration__email}</a><br>
                    📱 <a href="tel:${ask__number}">${ask__number}</a>
                  </div>
                </div>
                
                <div class="field">
                  <div class="field-label">
                    Subject
                    <span class="priority-badge">New Inquiry</span>
                  </div>
                  <div class="field-value">
                    ${ask__subject}
                  </div>
                </div>
                
                <div class="field">
                  <div class="field-label">Message Content</div>
                  <div class="message-box">
                    ${ask_message.replace(/\n/g, "<br>")}
                  </div>
                </div>

                <div class="contact-actions">
                  <a href="mailto:${ask__registration__email}" class="action-button">Reply to Sender</a>
                </div>
              </div>
              
              <div class="footer">
                <p>This is an automated message from your contact form system</p>
                <p>Please do not reply to this email directly. Use the Reply to Sender button above.</p>
                <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
`;
