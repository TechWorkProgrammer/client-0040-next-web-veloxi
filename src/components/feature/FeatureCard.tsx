import React from "react";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

interface FeatureCardProps {
    title: string;
    path: string;
    iconName: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, path, iconName, description}) => {
    const router = useRouter();

    return (
        <motion.div
            className="group relative w-full h-auto p-[2px] rounded-2xl bg-gradient-to-br from-veloxiai-gradientFrom to-veloxiai-gradientTo hover:shadow-2xl transition duration-300"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: false}}
            transition={{duration: 0.6, ease: "easeOut"}}
        >
            <div
                className="bg-background-dark rounded-2xl h-full p-6 flex flex-col justify-between gap-4 hover:bg-background-dark/90 transition duration-300">
                <div className="flex items-center gap-3">
                    <div className="bg-white/5 p-3 rounded-xl">
                        <Icon name={iconName} className="text-accent-400 w-6 h-6"/>
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
                <p className="text-secondary-600 text-sm leading-relaxed">
                    {description}
                </p>
                <Button
                    label="Try Now"
                    onClick={() => router.push(path)}
                    color="primary"
                    fullWidth
                />
            </div>
        </motion.div>
    );
};

export default FeatureCard;
