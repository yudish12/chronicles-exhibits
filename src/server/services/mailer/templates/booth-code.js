const boothEnquiryTemplate = async (
  { name, email, phoneNumber, rentalQuotation, purchaseRequest, customizationRequest, eventName, country, eventCity, url, message , budget },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default();
  const footerHtml = footerModule.default();

  // Helper to generate rows dynamically based on conditions
  const generateRequestRows = () => {
    let rows = "";

    if (rentalQuotation) {
      rows += `
        <!-- Rental quotation row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Rental Quotation:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                Requested
            </td>
        </tr>`;
    }

    if (purchaseRequest) {
      rows += `
        <!-- Purchase request row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Purchase Request:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                Requested
            </td>
        </tr>`;
    }

    if (customizationRequest) {
      rows += `
        <!-- Customization request row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Customization Request:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                Requested
            </td>
        </tr>`;
    }

    return rows;
  };

  return `
    ${headerHtml}
       <table align="center" cellpadding="10" cellspacing="0" border="0" width="100%" style="max-width:680px; border-collapse: collapse; background-color: #B0CB1F; color: white; font-family: Arial, sans-serif; margin-top:10px;">
    <caption style="padding: 15px; font-size: 24px; font-weight: bold; color: white; background-color: #8FAF1B; text-align: center;">
        Get a Quote form filled from page: ${page_source}
    </caption>
    <tbody>
        ${generateRequestRows()}
        <!-- Name Row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Country:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${country}
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
        <!-- URL row -->
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Url:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${url}
            </td>
        </tr>
        <tr style="border-bottom: 2px solid #8FAF1B;">
            <td style="padding: 15px; font-size: 18px; font-weight: bold; color: #ffffff; text-align: left;">
                Budget:
            </td>
            <td style="padding: 15px; font-size: 16px; font-weight: normal; color: #ffffff; text-align: left;">
                ${budget}
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

export default boothEnquiryTemplate;
