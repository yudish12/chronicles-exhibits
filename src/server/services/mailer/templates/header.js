const headerTemplate = () => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Chronicle Exhibits LLC</title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');
    body{
        font-family: "Oswald", sans-serif;
        font-size: 17px;
        font-weight: 300;
        line-height: 24px;
    }
    </style>
    <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" bgcolor="#ffffff" style="padding-top:20px">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="border-radius: 3px;" bgcolor="black">
                  <a href="https://chronicles-exhibits.vercel.app" target="_blank" style="font-size: 20px; font-family: sans-serif; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block;padding:6px;">
                    <img src="cid:logo" width="150" height="50" alt="Logo" border="0" style="width: 150px; max-width: 150px; height: 50px; font-family: sans-serif; color: #ffffff; font-size: 18px; line-height: 22px; text-decoration: none;">
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
`;

export default headerTemplate;
