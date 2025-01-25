const boothEnquiryTemplate = async (
  { name, email, phoneNumber, rentalQuotation, purchaseRequest, customizationRequest, eventName, country, eventCity, url, message , budget },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default(page_source);
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
    
    <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #FFF5F5;">
      <tbody>
        ${generateRequestRows()}
        <!-- Name Row -->
        <tr>
          <td style="padding: 20px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Name :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Email Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Email :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${email}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Phone Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Phone :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${phoneNumber}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Country Row (previously Country) -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Country :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${country}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        
        
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Event name :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${eventName}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
         <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Event City :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${eventCity}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
         <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Budget :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${budget}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Message :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px; line-height: 1.5;">
                  ${message}
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- URL Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>URL :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  <a href="${url}" style="color: #0000EE; text-decoration: underline;">${url}</a>
                </td>
              </tr>
              <tr>
                <td>
                  <div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

    ${footerHtml}
  `;
};

export default boothEnquiryTemplate;
