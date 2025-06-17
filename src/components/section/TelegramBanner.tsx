import React from "react";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import {FaTelegramPlane} from "react-icons/fa";

const TelegramBanner: React.FC = () => {
    return (
        <motion.section
            className="w-full py-16 px-4 md:px-8 flex flex-col items-center justify-center text-center text-white"
            initial={{opacity: 0, y: 40}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.8, ease: "easeOut"}}
        >
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow mb-4">
                Prefer Chatting? Use Our{" "}
                <span className="bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
                    Telegram Bot
                </span>
            </h2>

            <p className="text-base md:text-lg text-secondary-600 max-w-xl mb-8">
                Generate stunning AI content directly from Telegram. Just prompt, and let VeloxiAI do the rest —
                anytime, anywhere.
            </p>

            <Button
                label="Generate on Telegram"
                onClick={() => window.open("https://t.me/veloxiai_bot", "_blank")}
                icon={<FaTelegramPlane className="text-white"/>}
                iconPosition="left"
                color="primary"
                fullWidth={false}
            />
        </motion.section>
    );
};

export default TelegramBanner;
