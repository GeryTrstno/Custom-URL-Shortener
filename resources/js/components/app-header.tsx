import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { login, logout, register } from '@/routes';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function AppHeader({}: {
    navItems?: NavItem[];
    breadcrumbs?: BreadcrumbItem[];
}) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    return (
        <>
            <nav className="border-b border-gray-800 bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
                            GeryShortener
                        </div>
                        <div className="flex gap-4">
                            {auth.user ? (
                                // <DropdownMenu>
                                //     <DropdownMenuTrigger asChild>
                                //         <Button
                                //             variant="secondary"
                                //             className="size-10 rounded-full p-1"
                                //         >
                                //             <Avatar className="size-8 overflow-hidden rounded-full">
                                //                 <AvatarImage
                                //                     src={auth.user.avatar}
                                //                     alt={auth.user.name}
                                //                 />
                                //                 <AvatarFallback className="rounded-lg bg-white text-gray-900">
                                //                     {getInitials(
                                //                         auth.user.name,
                                //                     )}
                                //                 </AvatarFallback>
                                //             </Avatar>
                                //         </Button>
                                //     </DropdownMenuTrigger>
                                //     <DropdownMenuContent
                                //         className="w-56"
                                //         align="end"
                                //     >
                                //         <UserMenuContent user={auth.user} />
                                //     </DropdownMenuContent>
                                // </DropdownMenu>
                               
                                <Link href={logout()}
                                    className="rounded-md bg-white px-4 py-2 font-semibold text-gray-900 transition hover:bg-gray-100">
                                    Log Out
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-3 py-2 text-gray-300 transition hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-md bg-white px-4 py-2 font-semibold text-gray-900 transition hover:bg-gray-100"
                                    >
                                        Sign Up Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
