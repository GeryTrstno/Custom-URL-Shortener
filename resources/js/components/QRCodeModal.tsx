import { Download, ExternalLink } from 'lucide-react'; // Import Icon
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

    // Ref ke Wrapper DIV, bukan langsung ke komponen QRCode (lebih aman)
    const qrWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleDownloadAsPNG = () => {
        if (qrWrapperRef.current) {
            // Cari elemen SVG di dalam wrapper
            const svg = qrWrapperRef.current.querySelector('svg');

            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Tambahkan padding putih saat download biar QR tidak mepet
                const padding = 20;
                canvas.width = img.width + padding * 2;
                canvas.height = img.height + padding * 2;

                if (ctx) {
                    // Gambar background putih
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // Gambar QR Code di tengah
                    ctx.drawImage(img, padding, padding);
                }

                const dataUrl = canvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = `qrcode-${Date.now()}.png`;
                a.click();
            };

            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity fade-in">
            <div
                className="relative w-full max-w-sm animate-in rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-2xl duration-200 zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button> */}

                <div className="flex flex-col items-center space-y-6">
                    <div className="space-y-1 text-center">
                        <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
                            Scan Me!
                        </h2>
                        <p className="text-sm text-gray-400">
                            Use your camera to visit the link.
                        </p>
                    </div>

                    <div
                        ref={qrWrapperRef}
                        className="rounded-xl border-4 border-indigo-500/20 bg-white p-4 shadow-inner"
                    >
                        <QRCode
                            value={link}
                            size={180}
                            viewBox={`0 0 256 256`}
                            style={{
                                height: 'auto',
                                maxWidth: '100%',
                                width: '100%',
                            }}
                        />
                    </div>

                    <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                        <p className="flex-1 truncate font-mono text-xs text-gray-300">
                            {link}
                        </p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:text-indigo-300"
                            title="Open Link"
                        >
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>

                    <div className="flex w-full gap-3">
                        <Button
                            className="flex-1 border-gray-600 bg-gray-700 text-white transition hover:bg-gray-600"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 border-none bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition hover:from-indigo-500 hover:to-purple-500"
                            onClick={handleDownloadAsPNG}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Save PNG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeModal;
