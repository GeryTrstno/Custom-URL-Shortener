import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { shortener } from '@/routes';
import links from '@/routes/links';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
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
        };
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        original_url: '',
        custom_alias: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(links.store().url, {
            onSuccess: () => reset('original_url'),
        });
    };

    return (
        <AppLayout>
            <Head title="URL Shortener" />
            <div className="p-4">
                <h1 className="flex justify-center py-4 text-2xl font-bold">
                    URL Shortener by GeryTrstno
                </h1>
                <form onSubmit={submit}>
                    <div className="my-4 flex justify-center">
                        <Input
                            className="w-xl rounded-l-lg border border-black bg-neutral-300 dark:border-white dark:bg-neutral-900"
                            type="url"
                            placeholder="Paste your URL here"
                            value={data.original_url}
                            onChange={(e) =>
                                setData('original_url', e.target.value)
                            }
                        ></Input>
                    </div>
                    <div className="flex justify-center">
                        <span className="flex items-center">
                            {window.location.origin}/
                        </span>
                        <Input
                            className="mx-2 w-md border border-black bg-neutral-300 dark:border-white dark:bg-neutral-900"
                            type="text"
                            placeholder="custom-name (optional)"
                            value={data.custom_alias}
                            onChange={(e) =>
                                setData('custom_alias', e.target.value)
                            }
                        ></Input>

                        <Button
                            className="border border-black dark:border-white"
                            type="submit"
                            disabled={processing}
                            variant="secondary"
                        >
                            Shorten
                        </Button>
                    </div>
                </form>

                {errors.custom_alias && (
                    <div className="mx-auto w-fit py-4 text-red-500">
                        {errors.custom_alias}
                    </div>
                )}

                {flash?.success && flash.short_link && (
                    <div className="mx-auto mt-8 w-fit rounded-md border border-black p-4 dark:border-white">
                        <p className="flex justify-center font-semibold text-green-800 dark:text-green-200">
                            {flash.success}
                        </p>
                        <div className="mt-2 flex items-center justify-center gap-2">
                            <a
                                href={flash.short_link.toString()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center text-lg font-bold text-indigo-600 hover:underline"
                            >
                                {flash.short_link.toString()}
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
