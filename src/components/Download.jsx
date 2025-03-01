import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { usePDF } from 'react-to-pdf';
import './Download.css';

const Download = () => {
  const [inputValue, setInputValue] = useState('https://example.com');
  const [qrSize, setQrSize] = useState(256);
  const targetRef = useRef();
  const { toPDF } = usePDF();

  const handleDownload = () => {
    toPDF({ filename: 'QRCode.pdf' });
  };

  return (
    <div className='download-container'>
      <h2 className='download-title'>QR Code Generator</h2>
      <div className='input-group'>
        <label htmlFor='qr-input'>Enter URL or Text:</label>
        <input
          id='qr-input'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Enter text or URL'
        />
      </div>

      <div className='qr-size-control'>
        <label>QR Code Size:</label>
        <input
          type='range'
          min='128'
          max='512'
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
        />
        <span>{qrSize}px</span>
      </div>

      <div id='qr-code-container' className='qr-code-wrapper' ref={targetRef}>
        <QRCodeSVG value={inputValue} size={qrSize} level='H' includeMargin={true} />
      </div>

      <button className='download-button' onClick={handleDownload}>
        Download QR Code as PDF
      </button>
    </div>
  );
};

export default Download;
