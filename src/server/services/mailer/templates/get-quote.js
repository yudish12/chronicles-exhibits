const getQuoteTemplate = async (
  { name, company, email, phone, boothSize, eventName, message, file },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default(page_source);
  const footerHtml = footerModule.default();
  return `
    ${headerHtml}
       <div style="max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Content -->
        <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                    <!-- Name -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Name:</td>
                        <td style="padding: 16px 8px; color: #333;">${name}</td>
                    </tr>

                    <!-- Company -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Company:</td>
                        <td style="padding: 16px 8px; color: #333;">${company}</td>
                    </tr>

                    <!-- Email -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Email:</td>
                        <td style="padding: 16px 8px; color: #333;">${email}</td>
                    </tr>

                    <!-- Phone -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Phone:</td>
                        <td style="padding: 16px 8px; color: #333;">${phone}</td>
                    </tr>

                    <!-- Booth Size -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Booth Size:</td>
                        <td style="padding: 16px 8px; color: #333;">${boothSize}</td>
                    </tr>

                    <!-- Event Name -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">Event:</td>
                        <td style="padding: 16px 8px; color: #333;">${eventName}</td>
                    </tr>

                    <!-- File -->
                    <tr style="border-bottom: 1px solid #eee;">
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600;">File:</td>
                        <td style="padding: 16px 8px; color: #333;">
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; word-break: break-all;">
                                ${file}
                            </div>
                        </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                        <td style="padding: 16px 8px; width: 140px; color: #666; font-weight: 600; vertical-align: top;">Message:</td>
                        <td style="padding: 16px 8px; color: #333;">
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 4px; white-space: pre-wrap;">
                                ${message}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    ${footerHtml}
  `;
};

export default getQuoteTemplate;
