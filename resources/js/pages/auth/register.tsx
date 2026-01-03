import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { User, Mail, Lock, CheckCircle2 } from 'lucide-react'; // Import Icon

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="Register" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Join GeryShortener
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Create your free account and start managing links.
                    </p>
                </div>

                
                <div className="bg-gray-800/80 backdrop-blur-md py-8 px-4 shadow-2xl rounded-2xl border border-gray-700 sm:px-10 relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-indigo-500 rounded-full blur-2xl opacity-20"></div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex flex-col gap-5 relative z-10"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="John Doe"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="password_confirmation" className="text-gray-300">
                                        Confirm Password
                                    </Label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-6 rounded-xl shadow-lg transform transition hover:-translate-y-0.5"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2 text-white" />}
                                    Create Account 🚀
                                </Button>
                            </>
                        )}
                    </Form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-400">Already have an account? </span>
                        <TextLink 
                            href={login()} 
                            tabIndex={6}
                            className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            Log in
                        </TextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}