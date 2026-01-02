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

export default function Shortener({ links: linkData }: { links: any[] }) {
    // Note: Saya tambahkan prop 'links' di sini karena nanti kamu butuh untuk Tabel
    
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
                
                {/* --- HEADER SECTION (Gradient Style) --- */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Shorten Your Link.
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Paste link panjang kamu, kasih nama unik, dan bagikan ke dunia.
                    </p>
                </div>

                {/* --- FORM SECTION --- */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-2xl relative overflow-hidden">
                        
                        {/* Hiasan Background (Glow Effect) */}
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                        <form onSubmit={submit} className="space-y-6 relative z-10">
                            
                            {/* Input 1: Original URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
                                    Target URL
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        🔗
                                    </div>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/very-long-url..."
                                        className="w-full pl-10 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
                                        value={data.original_url}
                                        onChange={(e) => setData('original_url', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Input 2: Custom Alias & Button */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow">
                                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
                                        Custom Alias (Optional)
                                    </label>
                                    <div className="flex rounded-xl bg-gray-900 border border-gray-700 overflow-hidden shadow-inner focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                                        <span className="flex items-center px-4 bg-gray-800 text-gray-400 border-r border-gray-700 text-sm">
                                            {window.location.host}/
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="my-link"
                                            className="flex-grow py-4 px-4 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0"
                                            value={data.custom_alias}
                                            onChange={(e) => setData('custom_alias', e.target.value)}
                                        />
                                    </div>
                                    {errors.custom_alias && (
                                        <p className="text-red-400 text-sm mt-2 ml-1 animate-bounce">
                                            ⚠️ {errors.custom_alias}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Processing...' : 'Shorten It! 🚀'}
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>

                    {/* --- SUCCESS RESULT BOX --- */}
                    {flash?.success && flash.short_link && (
                        <div className="mt-8 bg-gray-800 border border-green-500/30 rounded-xl p-6 shadow-lg text-center animate-fade-in-up">
                            <p className="text-green-400 font-semibold mb-2">✨ {flash.success}</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-gray-900 p-4 rounded-lg">
                                <a
                                    href={flash.short_link.toString()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 hover:underline break-all"
                                >
                                    {flash.short_link.toString()}
                                </a>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(flash.short_link!.toString());
                                        alert('Copied!');
                                    }}
                                    className="text-gray-400 hover:text-white transition"
                                    title="Copy"
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- TABLE SECTION (PLACEHOLDER) --- */}
                {/* Jangan lupa paste kode Tabel kamu yang tadi di sini ya! 
                    Biar user bisa lihat riwayat link mereka di bawah form ini.
                */}
                 <div className="max-w-6xl mx-auto mt-12">
                     {/* <Table links={links} ... /> */}
                 </div>

            </div>
        </AppLayout>
    );
}