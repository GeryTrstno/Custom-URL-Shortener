import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { Button } from './ui/button';

type QRCodeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    link: string;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, link }) => {
    if (!isOpen) return null;

    // Reference to the SVG element to access QR code
    const qrRef = useRef<SVGSVGElement | null>(null);

    const handleDownloadAsPNG = () => {
        if (qrRef.current) {
            // Get SVG element as string
            const svg = qrRef.current;
            const svgData = new XMLSerializer().serializeToString(svg);

            // Create canvas and get the context
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Create an image from the SVG
            const img = new Image();

            img.onload = () => {
                // Set canvas width and height to the image dimensions
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image on the canvas
                ctx?.drawImage(img, 0, 0);

                // Convert the canvas to PNG data URL
                const dataUrl = canvas.toDataURL('image/png');

                // Create a temporary <a> to trigger download
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'qrcode.png';
                a.click();
            };

            // Embed SVG as base64 string to load the image
            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose} // Close the modal when clicking outside
        >
            <div
                className="w-full max-w-sm rounded-lg bg-neutral-200 p-6 shadow-lg dark:bg-neutral-800"
                onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the modal
            >
                <div className="flex flex-col items-center space-y-4">
                    <h2 className="text-center text-xl font-semibold text-neutral-900 dark:text-white">
                        Scan the QR Code
                    </h2>
                    <div className="bg-white p-2">
                        {/* Attach ref to the QRCode */}
                        <QRCode
                            className="p-2"
                            value={link}
                            size={150}
                            ref={qrRef}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="dark:hover:bg-neutral-900"
                        onClick={handleDownloadAsPNG}
                    >
                        Download QR Code
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;
