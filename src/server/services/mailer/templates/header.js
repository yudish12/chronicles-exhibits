const headerTemplate = (page_source) => `
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
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Arial', sans-serif;">
    <div style="max-width: 600px; margin: 10px auto; background: white; border-radius: 8px 8px 0 0; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #B0CB1F 0%, #8FAF1B 100%); padding: 24px; text-align: center;">
            <h1 style="color: #B0CB1F; margin: 0; font-size: 24px; font-weight: 600;">
                Quote Request Details
            </h1>
            <p style="color: #B0CB1F; margin: 8px 0 0; font-size: 16px;">
                Submitted from: ${page_source}
            </p>
        </div>
    </div>
`;

export default headerTemplate;
