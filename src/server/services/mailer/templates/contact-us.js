const getQuoteTemplate = async (
    { name, email, phone, message, budget , file },
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
        <!-- Table Content -->
        ${[
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
          {label : "Budget" , value : budget},
          ]
          .map(
            ({ label, value }) => `
            <tr>
              <td style="padding: 10px 40px; font-size: 16px; color: #000000; font-weight: bold; width: 150px;">${label}:</td>
              <td style="padding: 10px 40px; font-size: 16px; color: #000000;">${value}</td>
            </tr>
            <tr><td colspan="2"><div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div></td></tr>
          `
          )
          .join("")}

        <!-- Message Row (Full Width) -->
        <tr>
          <td colspan="2" style="padding: 10px 40px; font-size: 16px; color: #000000; font-weight: bold;">Message:</td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 10px 40px; font-size: 16px; color: #000000; line-height: 1.5;">
            ${message}
          </td>
        </tr>
        <tr><td colspan="2"><div style="border-bottom: 1px solid #B0CB1F; width: 100%;"></div></td></tr>
      </tbody>
    </table>
    ${footerHtml}
    `;
  };
  
  export default getQuoteTemplate;
  