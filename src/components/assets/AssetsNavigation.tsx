import React from "react";
import {useRouter} from "next/router";

interface AssetsNavigationProps {
    activeCategory: "mesh" | "music" | "code";
}

const tabs = [
    {label: "3D Models", value: "mesh", path: "/assets/3d"},
    {label: "Music", value: "music", path: "/assets/music"},
    {label: "Code", value: "code", path: "/assets/code"},
];

const AssetsNavigation: React.FC<AssetsNavigationProps> = ({activeCategory}) => {
    const router = useRouter();

    return (
        <div className="w-full flex justify-center mb-8">
            <div
                className="flex gap-2 bg-background-dark/50 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 shadow-inner">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => router.push(tab.path)}
                        className={`px-5 py-2 text-sm md:text-base rounded-full font-medium transition-all duration-300
                            ${
                            activeCategory === tab.value
                                ? "bg-accent-500 text-black shadow-md"
                                : "text-white hover:bg-white/10"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AssetsNavigation;
