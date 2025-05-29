import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { listing, userEmail, pdfBase64 } = await request.json();
    
    if (!listing || !userEmail || !pdfBase64) {
      return NextResponse.json(
        { error: 'Missing listing data, email address, or PDF data' },
        { status: 400 }
      );
    }

    // Prepare email
    const msg = {
      to: userEmail,
      from: 'hello_support@icloud.com', // this is a temporary verified sender email address
      subject: `Invoice for ${listing.listingTitle}`,
      text: `Please find attached the invoice for your listing: ${listing.listingTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a202c;">Your Invoice is Ready</h2>
          <p>Hello,</p>
          <p>Please find attached the invoice for your listing:</p>
          <h3 style="color: #4a5568;">${listing.listingTitle}</h3>
          <p>Selling Price: <strong>$${listing.sellingPrice?.toFixed(2)}</strong></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #718096; font-size: 14px;">
            Best regards,<br>
            Garage Technologies, Inc.<br>
            637 Wyckoff Ave, Wyckoff, NJ 07417<br>
            (201) 293-7164
          </p>
        </div>
      `,
      attachments: [
        {
          content: pdfBase64,
          filename: `invoice-${listing.listingTitle.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    await sgMail.send(msg);
    
    return NextResponse.json({ success: true, message: 'Invoice sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 