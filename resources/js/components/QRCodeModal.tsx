import React from 'react';
import QRCode from 'react-qr-code';

type QRCodeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    link: string;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, link }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the modal
            >
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-xl font-bold">
                        &times;
                    </button>
                </div>
                <h2 className="text-2xl mb-4 text-center">QR Code for Link</h2>
                <div className="flex justify-center">
                    <QRCode value={link} size={100} />
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;
