import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PDFDocument, StandardFonts } from 'pdf-lib';



export async function POST(req: NextRequest) {
  try {
    const { fullName, email, beneficiaries, assets } = await req.json();

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 900]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 850;
    const draw = (text: string, size = 12, isBold = false) => {
      page.drawText(text, { x: 50, y, size, font: isBold ? bold : font });
      y -= size + 8;
    };

    draw('LAST WILL AND TESTAMENT', 24, true);
    draw(`of ${fullName}`, 18, true);
    draw(`Date: ${new Date().toLocaleDateString()}`, 14);
    y -= 20;

    draw('I, ' + fullName + ', being of sound mind, declare this my last will.');
    draw('I revoke all prior wills and codicils.');
    y -= 10;

    draw('Beneficiaries:', 14, true);
    beneficiaries.split('\n').forEach((line: string) => draw(`• ${line.trim()}`));

    y -= 10;
    draw('Distribution of Assets:', 14, true);
    assets.split('\n').forEach((line: string) => draw(`• ${line.trim()}`));

    y -= 30;
    draw('Signed: ___________________________', 14);
    draw(fullName, 16, true);
    y -= 40;

    draw('This is a simple template only and is NOT legal advice.', 10);
    draw('Consult an attorney to ensure legal validity in your jurisdiction.', 10);

    const pdfBytes = await pdfDoc.save();

    // Send email via Resend
    await resend.emails.send({
      from: 'Simple Will Maker <will@yourdomain.com>',
      to: email,
      subject: 'Your Last Will & Testament (PDF)',
      html: `<p>Hi ${fullName.split(' ')[0]},</p>
             <p>Attached is your generated will.</p>
             <p><strong>Remember: this is a template only — not legal advice.</strong></p>`,
      attachments: [
        {
          filename: 'My-Will.pdf',
          content: Buffer.from(pdfBytes).toString('base64'),
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
