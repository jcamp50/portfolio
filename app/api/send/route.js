// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

export async function POST(req, res) {
  const { name, email, message } = await req.json();
  console.log(name, email, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: [fromEmail, toEmail],
      subject: `New email from ${name} - ${email}`,
      react: (
        <>
          <p>{message}</p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}