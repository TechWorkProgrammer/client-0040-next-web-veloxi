import React from "react";
import {FaTimes} from "react-icons/fa";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({onClose, children, title = ""}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div
                className="relative w-full max-w-xl max-h-[90vh] bg-background-dark border border-secondary-200 rounded-xl shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-secondary-200">
                    {title && (
                        <h2 className="text-lg md:text-xl font-semibold text-accent-400">
                            {title}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="text-secondary-400 hover:text-white transition"
                        aria-label="Close modal"
                    >
                        <FaTimes size={20}/>
                    </button>
                </div>

                <div className="p-5">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
