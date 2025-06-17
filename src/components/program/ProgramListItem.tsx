import React from "react";
import {CodeData} from "@/types/code";
import {IoCodeSlash} from "react-icons/io5";

interface ProgramListItemProps {
    code: CodeData;
}

const ProgramListItem: React.FC<ProgramListItemProps> = ({code}) => {
    const createdAt = new Date(code.createdAt).toLocaleDateString();

    return (
        <div
            className="group cursor-pointer border border-primary-600 hover:border-accent-500 bg-gradient-to-br from-primary-800 to-background-dark hover:from-primary-700 transition-all duration-200 rounded-2xl shadow-lg p-4 space-y-4"
            onClick={() => (window.location.href = `/program/${code.id}`)}
        >
            <div className="flex items-start gap-3">
                <div className="bg-accent-500/20 text-accent-400 p-2 rounded-md">
                    <IoCodeSlash className="text-xl"/>
                </div>
                <div className="flex-1">
                    <h3 className="text-white text-base font-semibold group-hover:text-accent-400 line-clamp-2">
                        {code.prompt}
                    </h3>
                    <p className="text-xs text-secondary-500 mt-1">Created on {createdAt}</p>
                </div>
            </div>
        </div>
    );
};

export default ProgramListItem;
