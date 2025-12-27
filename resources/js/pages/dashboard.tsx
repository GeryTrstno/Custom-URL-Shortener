import { index } from '@/actions/App/Http/Controllers/DashboardController';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { link } from 'fs';

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
            <div className="">
                <h1>My Shortened Links</h1>

                <table>
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
                </table>
            </div>
        </AppLayout>
    );
}
