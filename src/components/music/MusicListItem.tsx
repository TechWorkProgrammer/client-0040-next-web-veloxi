import React from "react";
import Image from "next/image";
import {MusicData} from "@/types/music";
import {AiFillPlayCircle, AiOutlineAudio} from "react-icons/ai";

interface MusicListItemProps {
    music: MusicData;
}

const MusicListItem: React.FC<MusicListItemProps> = ({music}) => {
    const createdAt = new Date(music.createdAt).toLocaleDateString();
    const imageUrl = music.imageUrl;

    return (
        <div
            className="group flex gap-4 items-center cursor-pointer rounded-xl border border-accent-500/40 bg-background-dark hover:bg-background-light transition duration-200 p-4 shadow-sm"
            onClick={() => (window.location.href = `/music/${music.taskId}`)}
        >
            <div
                className="relative w-20 h-20 rounded-lg overflow-hidden bg-primary-700 border border-secondary-300 flex items-center justify-center">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={music.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-secondary-400">
                        <AiOutlineAudio className="w-7 h-7"/>
                        <span className="text-xs mt-1">No Image</span>
                    </div>
                )}

                <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <AiFillPlayCircle className="text-white text-3xl"/>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <h3 className="text-white font-semibold text-base md:text-lg truncate group-hover:text-accent-400">
                    {music.title}
                </h3>
                <p className="text-sm text-secondary-500 truncate">
                    Played {music.totalView} times
                </p>
                <p className="text-xs text-secondary-600">Release on {createdAt}</p>

                {music.tags && (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {music.tags.split(",").map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-0.5 rounded bg-primary-700 text-secondary-300"
                            >
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicListItem;
