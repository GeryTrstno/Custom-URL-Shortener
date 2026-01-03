import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Mail, Lock, LogIn } from 'lucide-react'; 

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
            <Head title="Log in" />

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">

                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Welcome Back!
                        </span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter your credentials to access your dashboard.
                    </p>
                </div>

                <div className="bg-gray-800/80 backdrop-blur-md py-8 px-4 shadow-2xl rounded-2xl border border-gray-700 sm:px-10 relative overflow-hidden">
                    
                    <div className="absolute top-0 left-0 -mt-2 -ml-2 w-16 h-16 bg-purple-500 rounded-full blur-2xl opacity-20"></div>

                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-400 bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6 relative z-10"
                    >
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
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-gray-300">Password</Label>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-400">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 rounded-xl py-5"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-gray-600 bg-gray-900 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                        />
                                        <Label htmlFor="remember" className="text-gray-400 text-sm cursor-pointer">
                                            Remember me
                                        </Label>
                                    </div>

                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-6 rounded-xl shadow-lg transform transition hover:-translate-y-0.5"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing ? <Spinner className="mr-2 text-white" /> : <LogIn className="mr-2 h-5 w-5" />}
                                    Log In
                                </Button>
                            </>
                        )}
                    </Form>

                    {canRegister && (
                        <div className="mt-6 text-center text-sm">
                            <span className="text-gray-400">Don't have an account? </span>
                            <TextLink 
                                href={register()} 
                                tabIndex={6}
                                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Sign up
                            </TextLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}