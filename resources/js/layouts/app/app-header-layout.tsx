import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { AppFooter } from '@/components/app-footer';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';


export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <Toaster position="bottom-right" theme="dark" richColors />
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
            <AppFooter></AppFooter>
        </AppShell>
    );
}
