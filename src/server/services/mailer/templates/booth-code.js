const boothEnquiryTemplate = async (
  { name, email, phone, rentalQuotation, purchaseRequest, customizationRequest, eventName, country, eventCity, url, message , budget },
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
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Request Type :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  Rental Quotation
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
        `;
    }

    if (purchaseRequest) {
      rows += `
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Request Type :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  Purchase Request
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
        `;
    }

    if (customizationRequest) {
      rows += `
        <!-- Customization request row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Request Type :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  Customization Request
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
`;
    }

    return rows;
  };

  return `
    ${headerHtml}
    
    <table align="center" cellpadding="10" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #FFF5F5;">
      <tbody>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Name:</strong></td>
          <td>${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Email:</strong></td>
          <td>${email}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Phone:</strong></td>
          <td>${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Country:</strong></td>
          <td>${country}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Event Name:</strong></td>
          <td>${eventName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Event City:</strong></td>
          <td>${eventCity}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Budget:</strong></td>
          <td>${budget}</td>
        </tr>
    
        <!-- Conditional Rows for Requests -->
        ${rentalQuotation ? `
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Request Type:</strong></td>
          <td>Rental Quotation</td>
        </tr>` : ''}
    
        ${purchaseRequest ? `
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Request Type:</strong></td>
          <td>Purchase Request</td>
        </tr>` : ''}
    
        ${customizationRequest ? `
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Request Type:</strong></td>
          <td>Customization Request</td>
        </tr>` : ''}
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>Message:</strong></td>
          <td>${message}</td>
        </tr>
        <tr style="border-bottom: 1px solid #B0CB1F;">
          <td><strong>URL:</strong></td>
          <td><a href="${url}" style="color: #0000EE; text-decoration: underline;">${url}</a></td>
        </tr>
      </tbody>
    </table>
            

    ${footerHtml}
  `;
};

export default boothEnquiryTemplate;
