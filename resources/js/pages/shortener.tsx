import AppLayout from '@/layouts/app-layout';
import { home } from '@/routes';
import links from '@/routes/links';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Url } from 'url';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'URL Shortener',
        href: home().url,
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
            onSuccess: () => {
                reset('original_url');
                reset('custom_alias');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="URL Shortener" />
            <div className="px-4 py-20 text-center">
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                    Shorten Your URL Now!
                </h1>
                <form onSubmit={submit}>
                    {/* <div className="my-4 flex justify-center">
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
                    </div> */}
                    <div className="mx-auto mb-4 flex max-w-5xl flex-col rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-2xl sm:flex-row">
                        <input
                            type="url"
                            placeholder="Paste your URL here"
                            className="flex-grow rounded-md border-none bg-gray-900 px-4 py-3 text-gray-400 focus:ring-0"
                            value={data.original_url}
                            onChange={(e) =>
                                setData('original_url', e.target.value)
                            }
                        />
                    </div>
                    <div className="mx-auto flex max-w-3xl flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-2xl sm:flex-row">
                        <div className="flex w-full max-w-full">
                            <span className="borded-r-white flex items-center rounded-l-md bg-gray-900 px-4 py-3">
                                {window.location.origin}/
                            </span>
                            <input
                                type="text"
                                placeholder="custom-name (optional)"
                                className="w-full rounded-r-md border-none bg-gray-900 px-4 py-3 text-gray-400 focus:ring-0"
                                value={data.custom_alias}
                                onChange={(e) =>
                                    setData('custom_alias', e.target.value)
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 font-bold whitespace-nowrap text-white transition hover:bg-indigo-500"
                        >
                            Shorten It! 🚀
                        </button>
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
