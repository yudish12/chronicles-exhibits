const getQuoteTemplate = async (
  { name,company,email, phoneNumber, boothSize, eventName, message , file },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default();
  const footerHtml = footerModule.default();
  return `
    ${headerHtml}
       <table align="center" cellpadding="10" cellspacing="0" border="0" width="100%" style="max-width:680px; border-collapse: collapse; background-color: #B0CB1F; color: white; font-family: Arial, sans-serif; margin-top:10px;">
    <caption style="padding: 15px; font-size: 24px; font-weight: bold; color: white; background-color: #8FAF1B; text-align: center;">
        Get a Quote form filled from page: ${page_source}
    </caption>
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
        <!-- Company Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Company:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${company}
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
        <!-- Phone Number Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Phone Number:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${phoneNumber}
            </td>
        </tr>
        <!-- Booth Size Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Booth Size:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${boothSize}
            </td>
        </tr>
        <!-- Event Name Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Event Name:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${eventName}
            </td>
        </tr>
        <!-- file Row -->
        <tr>
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left; vertical-align: top;">
                File:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${file}
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
