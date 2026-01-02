import EditingLinkModal from '@/components/EditingLinkModal';
import QRCodeModal from '@/components/QRCodeModal';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import links from '@/routes/links';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ links: linkData }: { links: any[] }) {
    const { delete: destroy } = useForm();

    const [editingLink, setEditingLink] = useState<any | null>(null);

    const {
        data: editData,
        setData: setEditData,
        put, // Method PUT untuk update
        processing: processingEdit,
        errors: errorsEdit,
        reset: resetEdit,
    } = useForm({
        original_url: '',
        custom_alias: '',
    });

    // Function saat tombol edit diklik
    const openEditModal = (link: any) => {
        setEditingLink(link);
        // Isi form dengan data yang sudah ada
        setEditData({
            original_url: link.original_url,
            custom_alias: link.short_code,
        });
    };

    // Function submit edit
    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingLink) {
            put(links.update({ link: editingLink.id }).url, {
                onSuccess: () => setEditingLink(null), // Tutup modal kalau sukses
            });
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState('');

    const handleOpenModal = (link: string) => {
        setSelectedLink(link);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLink('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-4">
                <h1 className="flex justify-center py-4 text-2xl font-bold">
                    My Shortened Link
                </h1>

                {linkData.length === 0 && (
                    <div className="py-4 text-center text-xl">
                        <p>No Link Shortened yet.</p>
                    </div>
                )}

                {linkData.length > 0 && (
                    <Table className="mx-auto w-auto">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Original Link</TableHead>
                                <TableHead>Shortened Link</TableHead>
                                <TableHead>Generate QR Code</TableHead>
                                <TableHead>Click Count</TableHead>
                                <TableHead>Modify</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {linkData.map((link, index) => (
                                <TableRow key={link.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{link.original_url}</TableCell>
                                    <TableCell>
                                        <a
                                            href={`/${link.short_code}`}
                                            target="_blank"
                                        >
                                            {window.location.origin}/
                                            {link.short_code}
                                        </a>

                                        <button
                                            onClick={() => {
                                                const fullUrl = `${window.location.origin}/${link.short_code}`;
                                                navigator.clipboard.writeText(
                                                    fullUrl,
                                                );
                                                alert(
                                                    'Link copied! (Nanti kita bikin toast notification biar keren)',
                                                );
                                            }}
                                            className="ml-2 text-gray-500 hover:text-white"
                                            title="Copy to Clipboard"
                                        >
                                            📋
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                handleOpenModal(
                                                    `${window.location.origin}/${link.short_code}`,
                                                )
                                            }
                                        >
                                            Open QR Code
                                        </Button>
                                    </TableCell>
                                    <TableCell>{link.click_count}</TableCell>
                                    <TableCell>
                                        <Button
                                            className="mr-2 bg-yellow-300 text-neutral-700 hover:bg-yellow-400"
                                            onClick={() => openEditModal(link)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            key={link.id}
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        'Delete this link ?',
                                                    )
                                                ) {
                                                    destroy(
                                                        links.destroy({
                                                            link: link.id,
                                                        }).url,
                                                        {
                                                            preserveScroll: true,
                                                        },
                                                    );
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <QRCodeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                link={selectedLink}
            />

            <EditingLinkModal
                isOpen={editingLink !== null} // Modal terbuka ketika editingLink bukan null
                onClose={() => setEditingLink(null)} // Fungsi untuk menutup modal
                link={editingLink} // Data link yang sedang diedit
                editData={editData} // Data form yang sedang diedit
                setEditData={setEditData} // Fungsi untuk mengubah data form
                submitEdit={submitEdit} // Fungsi untuk submit form
                processingEdit={processingEdit} // Status pengolahan form
                errorsEdit={errorsEdit} // Error dari form edit
            />
        </AppLayout>
    );
}
