import React from "react";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    setItemsPerPage: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   setCurrentPage,
                                                   totalItems,
                                                   itemsPerPage,
                                                   setItemsPerPage,
                                               }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];

    const getPagination = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
            <div className="flex items-center gap-2 flex-wrap">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        currentPage === 1
                            ? "bg-background-dark text-secondary-600 cursor-not-allowed"
                            : "bg-white/10 hover:bg-accent-500 text-white"
                    }`}
                >
                    <AiOutlineLeft className="w-4 h-4"/>
                </button>

                {getPagination().map((page, idx) =>
                    page === "..." ? (
                        <span key={idx} className="text-secondary-500 px-2">
                            ...
                        </span>
                    ) : (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(Number(page))}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                                currentPage === page
                                    ? "bg-accent-500 text-black shadow-lg"
                                    : "bg-white/5 hover:bg-white/10 text-white"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        currentPage === totalPages
                            ? "bg-background-dark text-secondary-600 cursor-not-allowed"
                            : "bg-white/10 hover:bg-accent-500 text-white"
                    }`}
                >
                    <AiOutlineRight className="w-4 h-4"/>
                </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
                <span className="text-secondary-500">Show</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="bg-background-dark border border-white/10 text-white px-4 py-2 rounded-full cursor-pointer appearance-none transition hover:border-accent-400"
                >
                    {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <span className="text-secondary-500">per page</span>
            </div>
        </div>
    );
};

export default Pagination;
