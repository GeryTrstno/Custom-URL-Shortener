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
import links from '@/routes/links';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ links: linkData }: { links: any[] }) {

    const { delete: destroy } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="flex justify-center py-4 text-3xl">
                    My Shortened Link
                </h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Original Link</TableHead>
                            <TableHead>Shortened Link</TableHead>
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
                                        className="text-gray-500 hover:text-white ml-2"
                                        title="Copy to Clipboard"
                                    >
                                        📋
                                    </button>
                                </TableCell>
                                <TableCell>{link.click_count}</TableCell>
                                <TableCell>
                                    <button
                                        key={link.id}
                                        onClick={() => {
                                            if (confirm('Delete this link?')) {
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
                                        className="text-white hover:text-red-100 bg-red-600 px-4 py-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
