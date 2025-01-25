const boothEnquiryTemplate = async (
  { name, email, phone, eventName, country,boothSize, url , file ,  message },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default(page_source);
  const footerHtml = footerModule.default();
  return `
    ${headerHtml}
           <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px; border-collapse: collapse; background-color: #FFF5F5;">
      <tbody>
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
                  ${phone}
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

        
         <!-- Booth Size Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Booth Size :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${boothSize}
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
         <!-- Booth Size Row -->
        <tr>
          <td style="padding: 0 40px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Event Name :</strong>
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
