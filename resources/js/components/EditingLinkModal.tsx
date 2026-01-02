import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type EditingLinkModalProps = {
    isOpen: boolean;
    onClose: () => void;
    link: any;
    editData: { original_url: string; custom_alias: string };
    setEditData: (key: string, value: string) => void; // Tipe yang lebih spesifik
    submitEdit: (e: React.FormEvent) => void;
    processingEdit: boolean;
    errorsEdit: { [key: string]: string }; // Tipe error yang benar
};

const EditingLinkModal: React.FC<EditingLinkModalProps> = ({
    isOpen,
    onClose,
    link,
    editData,
    setEditData,
    submitEdit,
    processingEdit,
    errorsEdit,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                onClick={(e) => e.stopPropagation}
                className="w-full max-w-sm rounded-lg bg-neutral-200 p-6 shadow-lg dark:bg-neutral-800"
            >
                <div className="flex flex-col space-y-4">
                    <h2 className="mb-4 flex justify-center text-xl font-semibold">
                        Edit Link
                    </h2>
                    <form onSubmit={submitEdit}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Original URL</FieldLabel>
                                    <Input
                                        className="dark:bg-neutral-900"
                                        type="text"
                                        value={editData.original_url}
                                        onChange={(e) =>
                                            setEditData(
                                                'original_url',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errorsEdit.original_url && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errorsEdit.original_url}
                                        </p>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel>Custom Alias</FieldLabel>
                                    <Input
                                        className="dark:bg-neutral-900"
                                        type="text"
                                        value={editData.custom_alias}
                                        onChange={(e) =>
                                            setEditData(
                                                'custom_alias',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errorsEdit.custom_alias && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errorsEdit.custom_alias}
                                        </p>
                                    )}
                                </Field>
                                <Field orientation="horizontal">
                                    <Button
                                        type="submit"
                                        disabled={processingEdit}
                                    >
                                        {' '}
                                        {processingEdit
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="dark:hover:bg-neutral-900"
                                        type="button"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditingLinkModal;
