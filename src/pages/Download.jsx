import React, {  } from 'react';








import { QRCodeSVG } from 'qrcode.react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Download() {
  // Replace with actual app store links
  const appStoreLink = 'https://apps.apple.com/your-app-link';
  const playStoreLink = 'https://play.google.com/store/apps/details?id=your.app.package';
  
  // Replace with your actual app download QR code URL or app website
  const qrCodeUrl = 'https://yourapp.com/download';

  return (
    <Container className="download-section py-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <h2 className="mb-4">Download Our App</h2>
          <QRCodeSVG 
            value={qrCodeUrl} 
            size={256} 
            level={'H'} 
            includeMargin={true}
            className="mb-4 shadow"
          />
          <p className="text-muted">Scan the QR code to download our app</p>
        </Col>
        
        <Col md={6}>
          <div className="download-buttons d-flex flex-column">
            <Button 
              variant="dark" 
              href={appStoreLink} 
              target="_blank" 
              className="mb-3 p-3"
            >
              <FaApple className="me-2" /> Download on the App Store
            </Button>
            
            <Button 
              variant="success" 
              href={playStoreLink} 
              target="_blank" 
              className="p-3"
            >
              <FaGooglePlay className="me-2" /> Get it on Google Play
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}


