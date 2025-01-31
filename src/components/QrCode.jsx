import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const contactInfo = `
Chronicle Exhibits LLC
8465 W. Sahara Ave., Suite 111 Unit #1183
Las Vegas, NV 89117, United States

Phone: +1 (725) 333-1920
E-mail: info@chronicleexhibits.com
Website: https://chronicleexhibits.com/
`;

  return (
      <QRCodeCanvas value={contactInfo} size={120} />
  );
};

export default QRCodeGenerator;
