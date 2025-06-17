import React from "react";
import {motion} from "framer-motion";
import {FaSearch} from "react-icons/fa";

interface DiscoverySearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    handleSearch: () => void;
    activeCategory: string;
    setActiveCategory: React.Dispatch<React.SetStateAction<"mesh" | "music">>;
}

const tabs = [
    {label: "3D Models", value: "mesh"},
    {label: "Music", value: "music"},
];

const DiscoverySearchBar: React.FC<DiscoverySearchBarProps> = ({
                                                                   searchQuery,
                                                                   setSearchQuery,
                                                                   handleSearch,
                                                                   activeCategory,
                                                                   setActiveCategory,
                                                               }) => {
    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
            <div
                className="relative flex bg-background-dark/50 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner w-fit gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveCategory(tab.value as "mesh" | "music")}
                        className={`relative z-10 px-6 py-2 font-semibold text-sm md:text-base rounded-full transition-colors duration-300 ${
                            activeCategory === tab.value
                                ? "text-black"
                                : "text-white hover:text-accent-400"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
                <motion.div
                    className="absolute top-1 bottom-1 rounded-full bg-accent-500 z-0"
                    layout
                    transition={{type: "spring", stiffness: 300, damping: 30}}
                    style={{
                        width: "50%",
                        left: activeCategory === "mesh" ? "2%" : "48%",
                    }}
                />
            </div>

            <div
                className="flex items-center gap-3 bg-background-dark/60 border border-white/10 rounded-full px-4 py-2 w-full max-w-lg shadow-md backdrop-blur-md">
                <FaSearch className="text-secondary-500"/>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    placeholder="Search models or users..."
                    className="bg-transparent outline-none text-white w-full placeholder-secondary-500"
                />
            </div>
        </div>
    );
};

export default DiscoverySearchBar;
