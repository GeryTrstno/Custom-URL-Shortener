import React from 'react';
import { Button } from './ui/button';
import { AlertTriangle, Trash2} from 'lucide-react'; // Import Icon

type DeleteConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    processing: boolean;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    processing,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            >
                {/* <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button> */}

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-red-500/10 p-4">
                        <AlertTriangle className="h-8 w-8 text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white">
                            Delete Link?
                        </h2>
                        <p className="text-sm text-gray-400">
                            Are you sure you want to delete this link? This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex w-full gap-3 pt-2">
                        <Button
                            variant="outline"
                            className="flex-1 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white transition"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20 transition"
                            onClick={onConfirm}
                            disabled={processing}
                        >
                            {processing ? (
                                'Deleting...'
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;