import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import {FaHome} from "react-icons/fa";
import {useRouter} from "next/router";
import {motion} from "framer-motion";

const ComingSoon: React.FC = () => {
    const router = useRouter();

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen w-full px-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.6}}
        >
            <motion.div
                className="text-center space-y-6 px-6 py-8 rounded-2xl shadow-xl w-full max-w-md bg-background-dark/70 border border-white/10 backdrop-blur-md"
                initial={{scale: 0.95, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.6, ease: "easeOut"}}
            >
                <div className="flex justify-center">
                    <Image
                        src="/icon.png"
                        alt="Coming Soon Icon"
                        width={80}
                        height={80}
                        className="animate-pulse"
                        priority
                    />
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                    Coming Soon
                </h1>
                <p className="text-secondary-500 text-md md:text-lg">
                    We’re building something powerful. Stay tuned and follow our journey!
                </p>

                <div className="flex justify-center">
                    <Button
                        label="Back to Home"
                        onClick={() => router.push("/")}
                        color="primary"
                        icon={<FaHome size={16}/>}
                        iconPosition="left"
                        fullWidth
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ComingSoon;
