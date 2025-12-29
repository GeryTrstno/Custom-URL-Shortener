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
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import QRCodeModal from '@/components/QRCodeModal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ links: linkData }: { links: any[] }) {
    const { delete: destroy } = useForm();

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
                        <TableRow>
                            {linkData.length === 0 && (
                                <TableCell
                                    colSpan={5}
                                    className="py-4 text-center text-xl"
                                >
                                    No Link Shortened yet.
                                </TableCell>
                            )}
                        </TableRow>
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
                                        variant="destructive"
                                        key={link.id}
                                        onClick={() => {
                                            if (confirm('Delete this link ?')) {
                                                destroy(
                                                    link.destroy({
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
            </div>
            
            <QRCodeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                link={selectedLink}
            />

        </AppLayout>
    );
}
