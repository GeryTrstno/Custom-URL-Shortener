import AppLayout from '@/layouts/app-layout';
import { register } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }: { auth: any }) {
    return (
        <AppLayout>
            <Head title="Shorten URLs Fast" />

            {/* --- HERO SECTION --- */}
            <div className="px-4 py-20 text-center">
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
                    Make your links <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Short, Sweet, & Scannable.
                    </span>
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-400">
                    Shortener link platform with Analytics, QR Code generator,
                    and Custom Alias. Everything is free for Computer
                    Engineering students! 😉
                </p>

                {/* --- DEMO BOX (THE TRAP) --- */}
                <div className="mx-auto flex max-w-xl flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-2xl sm:flex-row">
                    <input
                        type="text"
                        placeholder="Paste your long URL here..."
                        className="flex-grow rounded-md border-none bg-gray-900 px-4 py-3 text-gray-400 focus:ring-0"
                    />
                    {auth.user ? (
                        <Link
                            href={register()}
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 font-bold whitespace-nowrap text-white transition hover:bg-indigo-500"
                        >
                            Shorten It! 🚀
                        </Link>
                    ) : (
                        <Link
                            href={register()}
                            className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 font-bold whitespace-nowrap text-white transition hover:bg-indigo-500"
                        >
                            Shorten It! 🚀
                        </Link>
                    )}
                </div>
                <p className="mt-3 text-sm text-gray-500">
                    *Demo only. Create an account to start shortening your
                    links!
                </p>
            </div>

            {/* --- FEATURES GRID --- */}
            <div className="bg-gray-800 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-white">
                            Why choose GeryShortener?
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 transition duration-300 hover:border-indigo-500">
                            <div className="mb-4 text-4xl">⚡</div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Lightning Fast
                            </h3>
                            <p className="text-gray-400">
                                Fast redirection using optimized Laravel &
                                PostgreSQL infrastructure.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 transition duration-300 hover:border-purple-500">
                            <div className="mb-4 text-4xl">📱</div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                QR Code Generator
                            </h3>
                            <p className="text-gray-400">
                                Automatically generate a QR code for every
                                link—perfect for posters, flyers, or café menus.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-xl border border-gray-700 bg-gray-900 p-8 transition duration-300 hover:border-pink-500">
                            <div className="mb-4 text-4xl">🎨</div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Custom Alias
                            </h3>
                            <p className="text-gray-400">
                                No more random links. Create a beautiful link of
                                your choice, for example:{' '}
                                <span className="text-indigo-400">
                                    gery.id/skripsi
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </AppLayout>
    );
}
