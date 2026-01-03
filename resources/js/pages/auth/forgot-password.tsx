import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft } from 'lucide-react'; 

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="Forgot Password" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Forgot Password?
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        No worries! Enter your email and we will send you a reset link.
                    </p>
                </div>

                <div className="bg-gray-800/80 backdrop-blur-md py-8 px-4 shadow-2xl rounded-2xl border border-gray-700 sm:px-10 relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-pink-500 rounded-full blur-2xl opacity-20"></div>

                    {status && (
                        <div className="mb-6 text-center text-sm font-medium text-green-400 bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                            {status}
                        </div>
                    )}

                    <div className="space-y-6 relative z-10">
                        <Form {...email.form()}>
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-1">
                                        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="email@example.com"
                                                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="mt-6 flex items-center justify-start">
                                        <Button
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-6 rounded-xl shadow-lg transform transition hover:-translate-y-0.5"
                                            disabled={processing}
                                            data-test="email-password-reset-link-button"
                                        >
                                            {processing && (
                                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Send Reset Link 📨
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        <div className="flex items-center justify-center space-x-1 text-center text-sm text-gray-400">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Return to</span>
                            <TextLink 
                                href={login()} 
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                log in
                            </TextLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}