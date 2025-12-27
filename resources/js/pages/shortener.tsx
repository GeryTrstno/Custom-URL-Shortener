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
            <div className='flex h-screen items-center justify-center flex-col gap-4'>
                <h1 className="text-2xl font-bold">URL Shortener by GeryTrstno</h1>
                <form onSubmit={submit} className='flex gap-2 w-full max-w-xl'>
                    <input 
                        className='flex-1 border border-black dark:border-white p-4 rounded-lg'
                        type="url"
                        placeholder='Paste your URL here'
                        value={data.original_url}
                        onChange={(e) => setData('original_url', e.target.value)} 
                    />
                    
                    <button
                        className='border border-black dark:border-white p-4 rounded-lg cursor-pointer disabled:opacity-50' 
                        type="submit" disabled={processing}>Shorten
                    </button>
                </form>

                {flash?.success && flash.short_link && (
                    <div className="mt-8 p-4 border dark:border-white border-black rounded-md">
                        <p className="text-green-800 dark:text-green-200 font-semibold flex justify-center">{flash.success}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <a href={flash.short_link.toString()} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-indigo-600 font-bold hover:underline text-lg flex justify-center"
                            >
                            {flash.short_link.toString()}</a>
                        </div>
                    </div>
                )}
            </div>
            
        </AppLayout>
    )
}

