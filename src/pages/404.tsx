import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Button from "@/components/common/Button";
import {FaArrowLeft} from "react-icons/fa";
import {motion} from "framer-motion";

const Custom404: React.FC = () => {
    const router = useRouter();

    return (
        <motion.div
            className="flex items-center justify-center h-screen px-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            <motion.div
                className="text-center space-y-6 p-6 md:p-8 max-w-md w-full bg-background-dark/50 backdrop-blur-md border border-white/10 rounded-xl shadow-xl"
                initial={{y: 30, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.8, ease: "easeOut"}}
            >
                <div className="flex justify-center">
                    <Image
                        src="/icon.png"
                        alt="Lost Icon"
                        width={80}
                        height={80}
                        className="animate-pulse"
                        priority
                    />
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                    404 - Not Found
                </h1>
                <p className="text-secondary-500 text-md md:text-lg">
                    You’ve wandered into the void. Let’s teleport you back to base.
                </p>

                <div className="flex justify-center w-full">
                    <Button
                        label="Back to Home"
                        onClick={() => router.push("/")}
                        color="primary"
                        icon={<FaArrowLeft size={16}/>}
                        iconPosition="left"
                        fullWidth
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Custom404;
