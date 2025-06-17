import React from "react";
import {motion} from "framer-motion";

interface LoaderProps {
    size?: "small" | "medium" | "large";
    color?: string;
}

const Loader: React.FC<LoaderProps> = ({size = "medium", color = "#00FFC2"}) => {
    const dimension =
        size === "small" ? 24 : size === "large" ? 96 : 48;

    return (
        <div className="flex items-center justify-center" role="status">
            <motion.div
                className="relative"
                initial={{scale: 0.9}}
                animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.8, 1, 0.8],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <svg
                    width={dimension}
                    height={dimension}
                    viewBox="0 0 100 100"
                    fill="none"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="280"
                        strokeDashoffset="100"
                        strokeOpacity="0.25"
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="80"
                        strokeDashoffset="60"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                        }}
                        className="origin-center"
                    />
                </svg>
            </motion.div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;
