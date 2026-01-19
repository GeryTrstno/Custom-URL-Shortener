import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { Lock, ShieldCheck } from 'lucide-react'; // Tambah Icon Shield & Lock

export default function ConfirmPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="Confirm Password" />

            {/* --- BACKGROUND DECORATION (Glow Effects) --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-red-500/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                
                {/* --- HEADER --- */}
                <div className="text-center flex flex-col items-center">
                    {/* Icon Shield Besar */}
                    <div className="bg-gray-800 p-4 rounded-full border border-gray-700 shadow-xl mb-4">
                        <ShieldCheck className="h-10 w-10 text-indigo-400" />
                    </div>
                    
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Secure Area
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400 max-w-xs mx-auto">
                        This is a secure area. Please confirm your password before continuing.
                    </p>
                </div>

                {/* --- GLASS CARD --- */}
                <div className="bg-gray-800/80 backdrop-blur-md py-8 px-4 shadow-2xl rounded-2xl border border-gray-700 sm:px-10 relative overflow-hidden">
                    
                    {/* Hiasan kecil */}
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-indigo-500 rounded-full blur-2xl opacity-20"></div>

                    <Form {...store.form()} resetOnSuccess={['password']}>
                        {({ processing, errors }) => (
                            <div className="space-y-6 relative z-10">
                                {/* PASSWORD INPUT */}
                                <div className="space-y-1">
                                    <Label htmlFor="password" className="text-gray-300">Current Password</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            autoFocus
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* BUTTON */}
                                <div className="pt-2">
                                    <Button
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-6 rounded-xl shadow-lg transform transition hover:-translate-y-0.5"
                                        disabled={processing}
                                        data-test="confirm-password-button"
                                    >
                                        {processing && <Spinner className="mr-2 text-white" />}
                                        Confirm Access 🔐
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}