import React from "react";
import {FaMedium, FaXTwitter} from "react-icons/fa6";
import {RiTelegram2Fill} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

const quickLinks = [
    {label: "About", path: "#about"},
    {label: "Product", path: "#product"},
    {label: "Studio", path: "#studio"},
    {label: "Pricing", path: "#pricing"},
];

const Footer: React.FC = () => {
    const router = useRouter();

    return (
        <footer className="w-full bg-background-dark text-muted py-12">
            <div className="container mx-auto px-4 md:px-8 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-3"
                    >
                        <div className="relative w-10 h-10">
                            <Image
                                src="/icon.png"
                                alt="VeloxiAI Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-white font-bold text-2xl tracking-tight">
                              VeloxiAI
                        </span>
                    </button>

                    <ul className="flex gap-6 flex-wrap text-sm font-medium">
                        {quickLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.path}
                                    target={item.path.startsWith("http") ? "_blank" : "_self"}
                                    className="hover:text-accent transition-colors"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-line pt-6 gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © 2025 VeloxiAI. All Rights Reserved.
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="https://t.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                        >
                            <RiTelegram2Fill size={20}/>
                        </a>
                        <a
                            href="https://x.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                        >
                            <FaXTwitter size={20}/>
                        </a>
                        <a
                            href="https://medium.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                        >
                            <FaMedium size={20}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
