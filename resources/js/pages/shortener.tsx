import React, { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { shortener } from '@/routes';
import links from '@/routes/links';
import { Url } from 'url';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'URL Shortener',
        href: shortener().url,
    },
];

export default function Shortener() {

    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
            short_link?: Url;
        }
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        original_url: '', 
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(links.store().url, {
            onSuccess: () => reset('original_url'),        
        });
    }

    return (
        <AppLayout>
            <Head title="URL Shortener" />
            <h1 className="text-2xl font-bold">URL Shortener by GeryTrstno</h1>
            <form onSubmit={submit}>
                <input 
                    type="url"
                    placeholder='Paste your URL here'
                    value={data.original_url}
                    onChange={(e) => setData('original_url', e.target.value)} 
                />
                
                <button type="submit" disabled={processing}>Shorten</button>
            </form>

            {flash?.success && flash.short_link && (
                <div>
                    <p>{flash.success}</p>
                    <a href={flash.short_link.toString()} target="_blank" rel="noopener noreferrer">{flash.short_link.toString()}</a>
                </div>
            )}
        </AppLayout>
    )
}

