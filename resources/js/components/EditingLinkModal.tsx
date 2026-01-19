import { Link as LinkIcon, Save, Slash } from 'lucide-react'; // Import Icon
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label'; // Pastikan kamu punya komponen Label (atau ganti div biasa)

type EditingLinkModalProps = {
    isOpen: boolean;
    onClose: () => void;
    link: string;
    editData: { original_url: string; custom_alias: string };
    setEditData: (key: string, value: string) => void;
    submitEdit: (e: React.FormEvent) => void;
    processingEdit: boolean;
    errorsEdit: { [key: string]: string };
};

const EditingLinkModal: React.FC<EditingLinkModalProps> = ({
    isOpen,
    onClose,
    editData,
    setEditData,
    submitEdit,
    processingEdit,
    errorsEdit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity fade-in">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md animate-in rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-2xl duration-200 zoom-in-95"
            >
                {/* <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button> */}

                <div className="flex flex-col space-y-6">
                    <div className="text-center">
                        <h2 className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-xl font-bold text-transparent">
                            Edit Link Details
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Update destination or customize your alias.
                        </p>
                    </div>

                    <form onSubmit={submitEdit} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="ml-1 text-gray-300">
                                Destination URL
                            </Label>
                            <div className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-inner transition-all focus-within:ring-2 focus-within:ring-indigo-500">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 group-focus-within:text-indigo-400">
                                    <LinkIcon className="h-4 w-4" />
                                </div>
                                <Input
                                    className="rounded-xl border-none bg-gray-900 py-5 pl-10 text-white placeholder-gray-500 selection:bg-indigo-500 focus:ring-indigo-500"
                                    type="text"
                                    placeholder="https://example.com/..."
                                    value={editData.original_url}
                                    onChange={(e) =>
                                        setEditData(
                                            'original_url',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            {errorsEdit.original_url && (
                                <p className="ml-1 animate-pulse text-xs text-red-400">
                                    {errorsEdit.original_url}
                                </p>
                            )}
                        </div>

                        {/* INPUT 2: Custom Alias */}
                        <div className="space-y-2">
                            <Label className="ml-1 text-gray-300">
                                Custom Alias
                            </Label>
                            <div className="flex overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-inner transition-all focus-within:ring-2 focus-within:ring-indigo-500">
                                <span className="text-md flex items-center border-r border-gray-700 bg-gray-800 px-3 text-gray-400">
                                    <Slash className="h-3.5 w-3.5"></Slash>
                                </span>
                                <Input
                                    className="flex-grow rounded-none border-none bg-transparent px-3 py-5 text-white placeholder-gray-500 shadow-none selection:bg-indigo-500 focus:ring-0"
                                    type="text"
                                    placeholder="my-link"
                                    value={editData.custom_alias}
                                    onChange={(e) =>
                                        setEditData(
                                            'custom_alias',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            {errorsEdit.custom_alias && (
                                <p className="ml-1 animate-pulse text-xs text-red-400">
                                    {errorsEdit.custom_alias}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 border-gray-600 bg-gray-700 text-white transition hover:bg-gray-600"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processingEdit}
                                className="flex-1 border-none bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transition hover:from-indigo-500 hover:to-purple-500"
                            >
                                {processingEdit ? (
                                    'Saving...'
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditingLinkModal;
