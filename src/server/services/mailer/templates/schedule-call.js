const scheduleCallTemplate = async (
  { name, email,country,  phoneNumber, callDate, callTime, url ,  message },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default(page_source);
  const footerHtml = footerModule.default();
  return `
    ${headerHtml}
       <table align="center" cellpadding="10" cellspacing="0" border="0" width="100%" style="max-width:680px; border-collapse: collapse; background-color: #B0CB1F; color: white; margin-inline:8px; mmargin-top:10px;">
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
                Country:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${country}
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
        <!-- Call Date Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Call Date:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${callDate}
            </td>
        </tr>
        <!-- Call Time Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Call Time:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${callTime}
            </td>
        </tr>
        <!-- URL row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Url:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${url}
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

export default scheduleCallTemplate;
