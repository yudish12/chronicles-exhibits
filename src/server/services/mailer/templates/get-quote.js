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
              <table align="center" cellpadding="10" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #B0CB1F; color: white; margin-inline:8px; mmargin-top:10px;">
    <tbody>
        <!-- Name Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Name:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${name}
            </td>
        </tr>
        <!-- Email Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Email:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${email}
            </td>
        </tr>
        <!-- Country Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                company:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${company}
            </td>
        </tr>
        <!-- Phone Number Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Phone Number:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${phone}
            </td>
        </tr>
        <!-- Call Date Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Booth Size:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${boothSize}
            </td>
        </tr>
         <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Event Name:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${eventName}
            </td>
        </tr>
       
        <!-- Message Row -->
        <tr>
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left; vertical-align: top;">
                Message:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${message}
            </td>
        </tr>
    </tbody>
</table>
    ${footerHtml}
  `;
};

export default getQuoteTemplate;
