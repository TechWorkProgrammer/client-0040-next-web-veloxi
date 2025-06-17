import React, {useEffect, useState, useRef, useCallback} from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaDownload,
    FaBookOpen,
} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import {MusicData} from "@/types/music";
import Missing from "@/components/Missing";
import {useLoader} from "@/context/Loader";
import api from "@/utils/axios";
import Loader from "@/components/common/Loader";

interface MusicResultProps {
    id?: string;
    embedded?: boolean;
}

const MusicResult: React.FC<MusicResultProps> = ({id, embedded = false}) => {
    const router = useRouter();
    const queryId = router.query.id;
    const finalId = id || (typeof queryId === "string" ? queryId : null);
    const [music, setMusic] = useState<MusicData | null>(null);
    const [fetchError, setError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showLyrics, setShowLyrics] = useState(false);
    const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);
    const alert = useAlert();
    const loader = useLoader();

    const fetchMusic = useCallback(async () => {
        if (!finalId) return;
        try {
            loader(true);
            const response = await api.get(`/music/result/${finalId}`);
            if (response.status === 202) {
                setError(true);
                alert("Hold up", response.data?.message || "The request is still being processed.", "warning");
                return;
            }
            setMusic(response.data.data);
        } catch {
            setError(true);
            alert("Opps...", "Failed to fetch music data.", "error");
        } finally {
            loader(false);
        }
    }, [finalId, loader, alert]);

    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (
            router.isReady &&
            finalId &&
            !hasFetchedRef.current
        ) {
            fetchMusic().then();
            hasFetchedRef.current = true;
        }
    }, [router.isReady, finalId, fetchMusic]);


    const updateTime = useCallback(() => {
        if (mediaRef.current) {
            if ("currentTime" in mediaRef.current) {
                setCurrentTime(mediaRef.current.currentTime);
            }
        }
    }, []);

    const updateDuration = useCallback(() => {
        if (mediaRef.current) {
            if ("duration" in mediaRef.current) {
                setDuration(mediaRef.current.duration);
            }
        }
    }, []);

    const assignMediaRef = useCallback(
        (node: HTMLAudioElement | HTMLVideoElement | null) => {
            if (mediaRef.current) {
                if ("removeEventListener" in mediaRef.current) {
                    mediaRef.current.removeEventListener("timeupdate", updateTime);
                }
                if ("removeEventListener" in mediaRef.current) {
                    mediaRef.current.removeEventListener("loadedmetadata", updateDuration);
                }
            }
            if (node) {
                node.addEventListener("timeupdate", updateTime);
                node.addEventListener("loadedmetadata", updateDuration);
            }
            mediaRef.current = node;
        },
        [updateTime, updateDuration]
    );

    const togglePlay = () => {
        if (mediaRef.current) {
            if (isPlaying) {
                if ("pause" in mediaRef.current) {
                    mediaRef.current.pause();
                }
            } else {
                if ("play" in mediaRef.current) {
                    mediaRef.current.play();
                }
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (mediaRef.current) {
            if ("muted" in mediaRef.current) {
                mediaRef.current.muted = !isMuted;
            }
            setIsMuted(!isMuted);
        }
    };

    const handleVolume = (value: number) => {
        if (mediaRef.current) {
            if ("volume" in mediaRef.current) {
                mediaRef.current.volume = value;
            }
            setVolume(value);
        }
    };

    const handleSeek = (value: number) => {
        if (mediaRef.current) {
            if ("currentTime" in mediaRef.current) {
                mediaRef.current.currentTime = value;
            }
            setCurrentTime(value);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleLyricsClick = () => {
        setShowLyrics(!showLyrics);
    };

    if (fetchError) {
        return (
            <Missing/>
        );
    }

    if (!finalId) return embedded ? null : <Missing/>;

    if (!music) return embedded ? <Loader/> : null;

    return (
        <div className="w-full text-white p-0 m-0 flex flex-col items-center">
            <div className="border border-accent-400 rounded-xl w-full overflow-hidden shadow-sm">
                <div className="relative w-full h-72 sm:h-96 bg-background-light flex items-center justify-center">
                    <audio ref={assignMediaRef as React.Ref<HTMLAudioElement>} src={music.audioUrl}/>

                    {showLyrics ? (
                        <div className="absolute inset-0 p-6 overflow-y-auto bg-background-dark text-sm">
                            <h2 className="text-xl font-semibold mb-3 text-accent-400">Lyrics</h2>
                            <p className="whitespace-pre-wrap text-white text-base">
                                {music.lyrics || "Lyrics are not available."}
                            </p>
                        </div>
                    ) : music.imageUrl ? (
                        <Image
                            src={music.imageUrl}
                            alt={music.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="text-primary-400">No image available</div>
                    )}
                </div>

                <div className="flex flex-col gap-2 border-t border-accent-400 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={togglePlay}
                            className="p-3 bg-accent-400 rounded-md text-black hover:bg-accent-300"
                        >
                            {isPlaying ? <FaPause/> : <FaPlay/>}
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-secondary-800 px-3 py-2 rounded-md">
                                <button onClick={toggleMute}>
                                    {isMuted ? <FaVolumeMute/> : <FaVolumeUp/>}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => handleVolume(parseFloat(e.target.value))}
                                    className="ml-2 w-24 accent-accent-400 cursor-pointer"
                                />
                            </div>

                            <button onClick={handleLyricsClick} className="p-2 bg-secondary-700/40 rounded-md">
                                <FaBookOpen/>
                            </button>

                            <button
                                onClick={() => window.open(music?.audioUrl || "", "_blank")}
                                className="p-2 bg-secondary-700/40 rounded-md"
                            >
                                <FaDownload/>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <span className="font-semibold">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime}
                            onChange={(e) => handleSeek(parseFloat(e.target.value))}
                            className="flex-grow h-1 accent-accent-400 bg-white rounded-lg"
                        />
                        <span className="font-semibold">{formatTime(duration)}</span>
                    </div>
                </div>

                <div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-4 border-t border-primary-700 bg-background-light">
                    <div>
                        <h2 className="text-xl font-bold">{music.title}</h2>
                        {music.tags && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {music.tags.split(",").map((tag, idx) => (
                                    <span key={idx}
                                          className="text-xs px-2 py-1 bg-accent-100 text-black font-semibold rounded">
                                    {tag.trim()}
                                </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-sm text-secondary-600 mt-4 md:mt-0 text-end">
                        <p>Played {music.totalView} times</p>
                        {music.user && (
                            <p>
                                Created by <strong>{music.user.username}</strong> on{" "}
                                {new Date(music.createdAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicResult;