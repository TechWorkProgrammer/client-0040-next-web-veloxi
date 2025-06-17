import React from "react";
import {motion} from "framer-motion";

interface Props {
    label?: string;
    onClick: () => void;
    color?: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    disabled?: boolean;
}

const Button: React.FC<Props> = ({
                                     label,
                                     onClick,
                                     color = "primary",
                                     type = "button",
                                     children,
                                     fullWidth = false,
                                     icon,
                                     iconPosition = "left",
                                     disabled = false,
                                 }) => {
    const baseStyles =
        "relative font-semibold flex items-center justify-center gap-2 text-md md:text-lg px-5 py-2.5 rounded-xl transition-all duration-300 focus:outline-none overflow-hidden";

    const primaryStyles = `
        bg-gradient-to-br from-accent-400 to-veloxiai-green
        text-black hover:text-white 
        hover:from-accent-500 hover:to-veloxiai-blue 
        shadow-[0_0_10px_rgba(0,255,200,0.5)]
    `;

    const secondaryStyles = `
        bg-white/5 border-2 border-white 
        text-white hover:text-accent-400 
        hover:border-accent-400 
        shadow-[0_0_8px_rgba(255,255,255,0.15)]
    `;

    const contentStyles = "relative z-10 flex items-center gap-2";
    const disabledStyles = "opacity-40 cursor-not-allowed";

    return (
        <div
            className={`${
                fullWidth ? "w-full" : "w-auto"
            } flex justify-center items-center`}
        >
            <motion.div
                className={`relative ${fullWidth ? "w-full" : "w-auto"} ${
                    disabled ? "pointer-events-none" : ""
                }`}
                whileHover={{scale: disabled ? 1 : 1.05}}
                whileTap={{scale: disabled ? 1 : 0.95}}
            >
                <button
                    onClick={disabled ? undefined : onClick}
                    type={type}
                    disabled={disabled}
                    className={`
                        ${baseStyles} 
                        ${color === "primary" ? primaryStyles : secondaryStyles} 
                        ${disabled ? disabledStyles : ""} 
                        ${fullWidth ? "w-full" : ""}
                    `}
                >
                    <span className={contentStyles}>
                        {icon && iconPosition === "left" && <span>{icon}</span>}
                        {children || label}
                        {icon && iconPosition === "right" && <span>{icon}</span>}
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default Button;
