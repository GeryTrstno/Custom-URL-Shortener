import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';
import links from '@/routes/links';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Url } from 'url';

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
import { useState } from 'react';
// Import Icon biar tabelnya ganteng
import { Copy, Pencil, QrCode, Trash2 } from 'lucide-react';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'URL Shortener',
        href: home().url,
    },
];

export default function Shortener({ links: linkData }: { links: any[] }) {


    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
            short_link?: Url;
        };
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        original_url: '',
        custom_alias: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(links.store().url, {
            onSuccess: () => {
                reset('original_url');
                reset('custom_alias');
            },
        });
    };

    const { delete: destroy, processing:isDeleting } = useForm();

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
                onSuccess: () => setEditingLink(null),
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

    const [linkToDelete, setLinkToDelete] = useState<any | null>(null);

    const confirmDeleteLink = (link: any) => {
        setLinkToDelete(link);
    };

    const handleDelete = () => {
        if (linkToDelete) {
            destroy(links.destroy({ link: linkToDelete.id }).url, {
                preserveScroll: true,
                onSuccess: () => setLinkToDelete(null),
                onFinish: () => setLinkToDelete(null),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
                {/* --- HEADER SECTION (Gradient Style) --- */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Shorten Your Link.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400">
                        Paste your long link, give it a unique name, and share
                        it with the world.
                    </p>
                </div>

                {/* --- FORM SECTION --- */}
                <div className="mx-auto max-w-4xl">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
                        {/* Hiasan Background (Glow Effect) */}
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 animate-pulse rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>

                        <form
                            onSubmit={submit}
                            className="relative z-10 space-y-6"
                        >
                            {/* Input 1: Original URL */}
                            <div>
                                <label className="mb-2 ml-1 block text-sm font-medium text-gray-400">
                                    Target URL
                                </label>
                                <div className="group relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                        🔗
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/very-long-url..."
                                        className="w-full rounded-xl border border-gray-700 bg-gray-900 py-4 pr-4 pl-10 text-white placeholder-gray-500 shadow-inner transition-all focus:border-transparent"
                                        value={data.original_url}
                                        onChange={(e) =>
                                            setData(
                                                'original_url',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Input 2: Custom Alias & Button */}
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="flex-grow">
                                    <label className="mb-2 ml-1 block text-sm font-medium text-gray-400">
                                        Custom Alias (Optional)
                                    </label>
                                    <div className="flex flex-row gap-2">
                                        <div className="flex w-full rounded-xl bg-gray-900 shadow-inner transition-all">
                                            <span className="flex items-center rounded-l-xl border border-gray-700 bg-gray-800 px-4 text-sm text-gray-400">
                                                {window.location.host}/
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="my-link"
                                                className="flex w-full rounded-r-xl border-none bg-transparent px-4 py-4 text-white placeholder-gray-500 focus:ring-0"
                                                value={data.custom_alias}
                                                onChange={(e) =>
                                                    setData(
                                                        'custom_alias',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="transform rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold whitespace-nowrap text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                                            >
                                                {processing
                                                    ? 'Processing...'
                                                    : 'Shorten It! 🚀'}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.custom_alias && (
                                        <p className="mt-2 ml-1 animate-bounce text-sm text-red-400">
                                            ⚠️ {errors.custom_alias}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* --- SUCCESS RESULT BOX --- */}
                    {flash?.success && flash.short_link && (
                        <div className="animate-fade-in-up mt-8 rounded-xl border border-green-500/30 bg-gray-800 p-6 text-center shadow-lg">
                            <p className="mb-2 font-semibold text-green-400">
                                ✨ {flash.success}
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-900 p-4 sm:flex-row">
                                <a
                                    href={flash.short_link.toString()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-2xl font-bold break-all text-transparent hover:underline"
                                >
                                    {flash.short_link.toString()}
                                </a>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            flash.short_link!.toString(),
                                        );
                                        alert('Copied!');
                                    }}
                                    className="text-gray-400 transition hover:text-white"
                                    title="Copy"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12">
                    <Separator className="bg-gray-700 opacity-50" />
                </div>

                <div className="mx-auto mt-12 max-w-7xl">
                    <div className="mb-6 flex items-center justify-between px-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Your History
                            </span>
                        </h2>
                        <div className="text-sm text-gray-400">
                            Total Links:{' '}
                            <span className="font-bold text-white">
                                {linkData.length}
                            </span>
                        </div>
                    </div>

                    {linkData.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-800/50 py-20 text-center">
                            <p className="text-lg text-gray-400">
                                No links Created
                            </p>
                            <p className="text-sm text-gray-500">
                                Let's make your first link above!
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-2xl">
                            <Table>
                                <TableHeader className="bg-gray-900/50">
                                    <TableRow className="border-gray-700 hover:bg-transparent">
                                        <TableHead className="w-[50px] text-gray-400">
                                            #
                                        </TableHead>
                                        <TableHead className="text-gray-400">
                                            Original Link
                                        </TableHead>
                                        <TableHead className="text-gray-400">
                                            Short Link
                                        </TableHead>
                                        <TableHead className="text-center text-gray-400">
                                            Stats
                                        </TableHead>
                                        <TableHead className="text-center text-gray-400">
                                            QR
                                        </TableHead>
                                        <TableHead className="text-right text-gray-400">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {linkData.map((link, index) => (
                                        <TableRow
                                            key={link.id}
                                            className="border-gray-700 transition-colors hover:bg-gray-700/30"
                                        >
                                            {/* Nomor */}
                                            <TableCell className="font-medium text-gray-500">
                                                {index + 1}
                                            </TableCell>

                                            {/* Original URL (Truncated) */}
                                            <TableCell className="max-w-[250px]">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="truncate font-mono text-xs text-gray-300"
                                                        title={
                                                            link.original_url
                                                        } // Tooltip native browser
                                                    >
                                                        {link.original_url}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Short Link */}
                                            <TableCell>
                                                <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-700/50 bg-gray-900/50 px-3 py-1.5">
                                                    <a
                                                        href={`/${link.short_code}`}
                                                        target="_blank"
                                                        className="text-sm font-bold text-indigo-400 hover:underline"
                                                    >
                                                        /{link.short_code}
                                                    </a>
                                                    <button
                                                        onClick={() => {
                                                            const fullUrl = `${window.location.origin}/${link.short_code}`;
                                                            navigator.clipboard.writeText(
                                                                fullUrl,
                                                            );
                                                            // Ganti alert dengan toast nanti, sementara ini ok
                                                            alert(
                                                                'Link copied!',
                                                            );
                                                        }}
                                                        className="text-gray-500 transition-colors hover:text-white"
                                                        title="Copy Link"
                                                    >
                                                        <Copy className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </TableCell>

                                            {/* Clicks */}
                                            <TableCell className="text-center">
                                                <div className="inline-flex items-center rounded-full bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-200">
                                                    {link.click_count || 0}{' '}
                                                    clicks
                                                </div>
                                            </TableCell>

                                            {/* QR Code Button */}
                                            <TableCell className="text-center">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full text-gray-400 hover:bg-indigo-600/20 hover:text-white"
                                                    onClick={() =>
                                                        handleOpenModal(
                                                            `${window.location.origin}/${link.short_code}`,
                                                        )
                                                    }
                                                    title="View QR Code"
                                                >
                                                    <QrCode className="h-4 w-4" />
                                                </Button>
                                            </TableCell>

                                            {/* Actions (Edit & Delete) */}
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                                                        onClick={() =>
                                                            openEditModal(link)
                                                        }
                                                        title="Edit Link"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full text-red-500 hover:bg-red-500/10 hover:text-red-400"
                                                        onClick={() =>
                                                            confirmDeleteLink(
                                                                link,
                                                            )
                                                        } // Panggil function baru
                                                        title="Delete Link"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
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

            <DeleteConfirmationModal
                isOpen={linkToDelete !== null}
                onClose={() => setLinkToDelete(null)}
                onConfirm={handleDelete}
                processing={isDeleting}
            ></DeleteConfirmationModal>
        </AppLayout>
    );
}
