const boothEnquiryTemplate = async (
  { resetLink },
  page_source
) => {
  const headerModule = await import("./header.js");
  const footerModule = await import("./footer.js");
  const headerHtml = headerModule.default(page_source);
  const footerHtml = footerModule.default();
  return `
    ${headerHtml}
      <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; background-color: #FFF5F5;">
      <tbody>
        <!--Link-->
        <tr>
          <td style="padding: 20px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 8px;">
                  <strong>Reset password :</strong>
                </td>
              </tr>
              <tr>
                <td style="font-size: 16px; color: #000000; padding-bottom: 4px;">
                  ${resetLink}
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
