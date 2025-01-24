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
    <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <div style="background: white; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: #B0CB1F; black: white; padding: 10px; font-size: 24px; font-weight: 600; text-align: center;">
            <h1 style="color: black; margin: 0; font-size: 24px; font-weight: 600;">
                Quote Request Details
            </h1>
            <p style="color: black; font-weight: 300; margin: 8px 0 0; font-size: 14px;">
                Submitted from: <span style="font-weight:500;" >${page_source}</span>
            </p>
        </div>
    </div>
`;

export default headerTemplate;
