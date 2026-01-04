import { Link, Head } from '@inertiajs/react';

export default function Error({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Unknown Error';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the link you are looking for could not be found or has expired.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'Something went wrong.';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 text-center text-white">
            <Head title={title} />
            
            {/* Background Glow */}
            <div className="fixed top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
            </div>

            <div className="relative z-10 space-y-6">
                <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
                    {status}
                </h1>
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="text-lg text-gray-400 max-w-md mx-auto">
                    {description}
                </p>
                <div className="pt-6">
                    <Link
                        href="/"
                        className="rounded-xl bg-indigo-600 px-8 py-3 font-bold text-white transition hover:bg-indigo-500 shadow-lg hover:-translate-y-1"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}