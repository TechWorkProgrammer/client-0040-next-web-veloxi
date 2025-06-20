import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!isNavOpen) {
                setIsScrolled(window.scrollY > 50);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isNavOpen]);

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? "hidden" : "";
    }, [isNavOpen]);

    const navItems = [
        {label: "About", path: "#about"},
        {label: "Product", path: "#product"},
        {label: "How to use", path: "#how-to-use"},
        {label: "Pricing", path: "#pricing"},
        {label: "Documentation", path: "#"},
    ];

    const handleNavigation = (path: string) => {
        setIsNavOpen(false);
        if (!path.startsWith("#")) {
            router.push(path).then();
        }
    };

    const headerBg = isNavOpen
        ? "bg-primary-900 shadow-lg"
        : isScrolled
            ? "bg-primary-900 bg-opacity-90 shadow-lg"
            : "bg-transparent";

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${headerBg}`}
            >
                <nav className="px-4 lg:px-10 py-3">
                    <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center space-x-2 w-auto h-8 md:h-10"
                        >
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/icon.png"
                                    alt="VeloxiAI Logo"
                                    fill
                                    sizes="(max-width: 768px) 32px, (max-width: 1200px) 40px, 48px"
                                    style={{objectFit: "contain"}}
                                    priority
                                />
                            </div>
                            <span className="text-white font-semibold text-xl md:text-2xl">
                                VeloxiAI
                            </span>
                        </button>

                        <ul className="flex space-x-2 md:space-x-6">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    {item.path.startsWith("http") ? (
                                        <a
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white font-semibold text-sm hover:text-accent-500 transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={item.path}
                                            className="text-white font-semibold text-sm md:text-md lg:text-lg hover:text-accent-500 transition-colors"
                                            onClick={() => handleNavigation(item.path)}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
