import nodemailer from "nodemailer";
import path from "path";
export class EmailService {
  constructor(page_source, template) {
    console.log(
      process.env.EMAIL_HOST,
      process.env.EMAIL_USERNAME,
      process.env.EMAIL_PASSWORD
    );
    const mail1 = process.env.EMAIL_TO
    const mail2 = process.env.EMAIL_TO2
    this.to = `${mail1},${mail2}`;
    this.page_source = page_source;
    this.template = template;
    this.from = `Chronicle Exhibits LLC <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    //sendgrid

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(fields, subject, fileData) {
    const templateModule = await import(`./templates/${this.template}.js`);
    console.log("template",JSON.stringify(await templateModule))
    const templateFunc = templateModule.default; // Access the default export

    // Await the result of templateFunc since it is likely async
    const html = await templateFunc(fields, this.page_source);
    let logoPath = path.join(process.cwd(), "public/chronicle-exhibits-dark-bg.png");
    let attachements = [{
      filename: "chronicle-exhibits-dark-bg.png",
      path: logoPath,
      cid: "logo",
    }];

    if (fileData) {
      for (const file of fileData) {
        const fileBuffer = await file.arrayBuffer();
        attachements.push({
          filename: file.name,
          content: Buffer.from(fileBuffer), 
          contentType: file.type || "application/octet-stream",
        });
      }
    }

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      attachments: attachements,
      html: html, // Ensure this is a resolved string
    };

    return this.newTransport().sendMail(mailOptions);
  }
}
