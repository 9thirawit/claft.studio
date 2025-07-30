export default function Header() {
    return (
        <header className="font-mono fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="font-mono text-white text-xl">
                    claft.studio
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="#home" className="text-white hover:text-blue-200 transition-colors">
                        Home
                    </a>
                    <a href="#about" className="text-white hover:text-blue-200 transition-colors">
                        About
                    </a>
                    <a href="#services" className="text-white hover:text-blue-200 transition-colors">
                        Services
                    </a>
                    <a href="#contact" className="text-white hover:text-blue-200 transition-colors">
                        Contact
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}