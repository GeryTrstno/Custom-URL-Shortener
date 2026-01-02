export function AppFooter() {
    return (
        <>
            {/* --- FOOTER --- */}
            <footer className="border-t border-gray-800 bg-gray-900 py-8 text-center text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} GeryShortener. Built with
                    Laravel & React.
                </p>
            </footer>
        </>
    );
}
