import React, {useState, useEffect} from "react";
import {FaRegPaperPlane} from "react-icons/fa";
import {useAlert} from "@/context/Alert";
import {getAccessToken} from "@/utils/user";
import api from "@/utils/axios";
import {io} from "socket.io-client";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import MusicResult from "@/components/music/MusicResult";
import {useRouter} from "next/router";

interface MusicGenerationForm {
    prompt: string;
    gpt_description_prompt?: string;
    title?: string;
    genres: string;
}

interface TaskResponse {
    taskId: string;
    state: string;
}

const GENRE_LIST = [
    "Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Country", "Electronic", "Reggae", "Blues",
    "Metal", "Punk", "R&B", "Soul", "Folk", "Disco", "House", "Techno", "Trance", "Lo-Fi",
    "Chill", "Indie", "Dubstep", "Ambient", "Funk", "Gospel", "K-Pop", "J-Pop", "Orchestra",
    "Instrumental", "Synthwave", "Vaporwave", "Hardcore", "Latin", "Afrobeat"
];

const MusicGeneration: React.FC = () => {
    const [form, setForm] = useState<MusicGenerationForm>({
        prompt: "",
        gpt_description_prompt: "",
        title: "",
        genres: "",
    });
    const [task, setTask] = useState<TaskResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAllGenres, setShowAllGenres] = useState(false);

    const alert = useAlert();
    const router = useRouter();
    const eventName = task?.taskId || null;

    useEffect(() => {
        if (!eventName) return;

        const socket = io("wss://api.veloxiai.app");

        socket.on(eventName, (data: { status: string; message?: string }) => {
            setTask(t => t ? {...t, state: data.status} : t);

            if (["done", "SUCCEEDED"].includes(data.status)) {
                setIsLoading(false);
            }
        });

        return () => {
            socket.off(eventName);
            socket.disconnect();
        };
    }, [eventName]);

    const handleChange = (field: keyof MusicGenerationForm, value: string) =>
        setForm((f) => ({...f, [field]: value}));

    const handleGenreSelect = (genre: string) => {
        const list = form.genres.split(",").map((g) => g.trim()).filter(Boolean);
        const updated = list.includes(genre)
            ? list.filter((g) => g !== genre)
            : [...list, genre];
        setForm((f) => ({...f, genres: updated.join(", ")}));
    };

    const handleGenerateMusic = async () => {
        if (!form.gpt_description_prompt?.trim() && !form.prompt.trim()) {
            alert("Missing Prompt", "Please enter at least one prompt.", "error");
            return;
        }
        const token = getAccessToken();
        if (!token) {
            alert("Authentication Required", "Please log in to generate music.", "error");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                prompt: form.prompt.trim(),
                gpt_description_prompt: form.gpt_description_prompt,
                title: form.title,
                tags: form.genres,
                mv: "sonic-v3-5",
                custom_mode: !!form.prompt.trim()
            };
            const res = await api.post("/music/generate", payload);
            setTask(res.data.data);
        } catch (err: any) {
            alert("Generation Failed", err.response?.data?.message || "Try again later.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const selectedGenres = form.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

    const genresToShow = showAllGenres ? GENRE_LIST : GENRE_LIST.slice(0, 6);

    const orderedGenres = [
        ...selectedGenres.filter((g) => genresToShow.includes(g)),
        ...genresToShow.filter((g) => !selectedGenres.includes(g)),
    ];

    const waitingForResult = isLoading || (task != null && !["done", "SUCCEEDED"].includes(task.state));

    return (
        <div className="w-full h-full text-white flex flex-col lg:flex-row">
            <aside
                className="w-full lg:w-[320px] bg-background-dark border-r border-secondary-200 h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-between">
                <div>
                    <h2 className="text-lg md:text-xl font-semibold px-6 py-4 border-b border-secondary-200">
                        Music Generator
                    </h2>
                    <div className="px-6 py-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary-400 mb-2">Genres</label>
                            <div className="flex flex-wrap gap-2">
                                {orderedGenres.map((g) => (
                                    <span
                                        key={g}
                                        onClick={() => handleGenreSelect(g)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
                                            selectedGenres.includes(g)
                                                ? "bg-accent-400 text-black"
                                                : "bg-secondary-300 text-secondary-800 hover:bg-secondary-400"
                                        }`}
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowAllGenres(!showAllGenres)}
                                className="text-accent-400 text-xs font-semibold mt-2"
                            >
                                {showAllGenres ? "Show Less" : "Show More"}
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-400 mb-2">Prompt</label>
                            <textarea
                                name="gpt_description_prompt"
                                placeholder="Enter a prompt..."
                                value={form.gpt_description_prompt}
                                onChange={(e) => handleChange("gpt_description_prompt", e.target.value)}
                                className="w-full bg-primary-800 text-white placeholder-secondary-500 border border-secondary-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent-500"
                                rows={4}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-400 mb-2">Optional Title</label>
                            <input
                                type="text"
                                placeholder="Input optional title"
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className="w-full bg-primary-800 text-white placeholder-secondary-500 border border-secondary-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-400 mb-2">Optional Lyrics</label>
                            <textarea
                                name="prompt"
                                placeholder="Input optional lyrics..."
                                value={form.prompt}
                                onChange={(e) => handleChange("prompt", e.target.value)}
                                className="w-full bg-primary-800 text-white placeholder-secondary-500 border border-secondary-300 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-accent-500"
                                rows={4}
                            />
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-secondary-200">
                    <Button
                        onClick={handleGenerateMusic}
                        color="primary"
                        icon={<FaRegPaperPlane/>}
                        label="Generate"
                        fullWidth
                        disabled={isLoading || !!task}
                    />
                </div>
            </aside>
            <main className="flex-1 px-6 py-8">
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h3 className="text-xl md:text-2xl font-bold">Generation Result</h3>
                    <Button
                        onClick={() => router.push("/assets/music")}
                        color="primary"
                        label="My Music Assets"
                    />
                </div>

                <div className="w-full bg-background-dark rounded-xl p-6 min-h-[60vh]">
                    {waitingForResult ? (
                        <div className="w-full flex justify-center items-center h-[40vh]">
                            <Loader size="large"/>
                        </div>
                    ) : task?.taskId ? (
                        <MusicResult id={task.taskId} embedded/>
                    ) : (
                        <p className="text-secondary-500 text-center mt-20">
                            No music generated yet. Try entering a prompt above.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MusicGeneration;
