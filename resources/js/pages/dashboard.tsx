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
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ links }: { links: any[] }) {
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {links.length === 0 && (
                                <TableCell
                                    colSpan={4}
                                    className="py-4 text-center text-xl"
                                >
                                    No Link Shortened yet.
                                </TableCell>
                            )}
                        </TableRow>
                        {links.map((link, index) => (
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
                                </TableCell>
                                <TableCell>{link.click_count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Original URL</th>
                            <th>Shortened URL</th>
                            <th>Clicks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                >
                                    No Link Shortened yet.
                                </td>
                            </tr>
                        )}

                        {links.map((link, index) => 
                            <tr key={link.id}>
                                <td>{index + 1}</td>
                                <td>{link.original_url}</td>
                                <td><a
                                        href={`/${link.short_code}`}
                                        target="_blank"
                                    >
                                        {window.location.origin}/{link.short_code}
                                    </a>
                                </td>
                                <td>{link.click_count}</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
            </div>
        </AppLayout>
    );
}
