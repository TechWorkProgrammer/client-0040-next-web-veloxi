import React, {useState, useEffect, useRef} from "react";
import {AiFillHeart, AiOutlineHeart, AiOutlineShareAlt} from "react-icons/ai";
import {FaDownload} from "react-icons/fa";
import Image from "next/image";
import MeshCard from "@/components/mesh/MeshCard";
import {useAlert} from "@/context/Alert";
import api from "@/utils/axios";

type MeshDetailsProps = {
    title: string;
    taskId: string;
    modelType?: string;
    userId?: string;
    username?: string;
    createdAt?: string;
    modelLinks: { type: string; previewUrl?: string; refineUrl?: string }[];
    textures?: { id: string; type: string; url: string }[];
};

const MeshDetails: React.FC<MeshDetailsProps> = ({
                                                     title,
                                                     taskId,
                                                     modelType,
                                                     userId,
                                                     username,
                                                     createdAt,
                                                     modelLinks,
                                                     textures
                                                 }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [userMeshes, setUserMeshes] = useState<any[]>([]);
    const [fetchError, setFetchError] = useState(false);
    const hasFetched = useRef(false);
    const alert = useAlert();
    const shareLink = `${window.location.origin}/3d/${taskId}`;

    useEffect(() => {
        if (!userId || hasFetched.current) return;
        hasFetched.current = true;
        api.get(`/mesh/user/${userId}`)
            .then((res) => setUserMeshes(res.data.data))
            .catch(() => setFetchError(true));
    }, [userId]);

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Link copied to clipboard!", "success");
        });
    };

    return (
        <div
            className="w-full mt-8 rounded-xl bg-background-dark shadow space-y-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">{title || "Untitled Model"}</h2>
                    <p className="text-sm text-secondary-500">{modelType || "3D Model"}</p>
                    {username && createdAt && (
                        <p className="text-xs text-secondary-600 mt-1">
                            Created by <span className="font-medium">{username}</span> on {createdAt}
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        className="rounded-full bg-primary-700 p-2 hover:bg-accent-500 transition"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        {isFavorite ? (
                            <AiFillHeart className="text-red-500 w-5 h-5"/>
                        ) : (
                            <AiOutlineHeart className="text-white w-5 h-5"/>
                        )}
                    </button>
                    <button
                        className="rounded-full bg-primary-700 p-2 hover:bg-accent-500 transition"
                        onClick={handleShare}
                    >
                        <AiOutlineShareAlt className="text-white w-4 h-4"/>
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">Model Downloads</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {modelLinks.map(({type, previewUrl, refineUrl}) => (
                        <div key={type} className="p-4 bg-primary-800 rounded-lg flex justify-between items-center">
                            <span className="text-sm font-medium">{type}</span>
                            <div className="flex gap-2">
                                {previewUrl && (
                                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                                        <button
                                            className="text-sm bg-secondary-600 hover:bg-secondary-500 text-white px-3 py-1 rounded-md flex items-center">
                                            <FaDownload className="mr-2"/> Preview
                                        </button>
                                    </a>
                                )}
                                {refineUrl && (
                                    <a href={refineUrl} target="_blank" rel="noopener noreferrer">
                                        <button
                                            className="text-sm bg-accent-400 hover:bg-accent-300 text-black px-3 py-1 rounded-md flex items-center">
                                            <FaDownload className="mr-2"/> Textured
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {textures && textures.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Textures</h3>
                    <div className="flex flex-wrap gap-4">
                        {textures.map((texture) => (
                            <div key={texture.id} className="flex flex-col items-center">
                                <a href={texture.url} target="_blank" rel="noopener noreferrer">
                                    <Image src={texture.url} alt={texture.type} width={100} height={100}
                                           className="rounded-lg"/>
                                </a>
                                <span className="mt-2 text-xs text-secondary-400 capitalize">{texture.type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-lg font-semibold mb-3">Other Models by {username}</h3>
                {fetchError ? (
                    <p className="text-sm text-red-400">User data not found.</p>
                ) : userMeshes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {userMeshes.map((mesh) => (
                            <MeshCard key={mesh.id} mesh={mesh}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-secondary-500">This user has no other models yet.</p>
                )}
            </div>
        </div>
    );
};

export default MeshDetails;
