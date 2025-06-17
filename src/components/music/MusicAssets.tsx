import React, {useEffect, useState, useCallback, useRef} from "react";
import {useAlert} from "@/context/Alert";
import {MusicData} from "@/types/music";
import MusicListItem from "@/components/music/MusicListItem";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";
import Icon from "@/components/common/Icon";

const MusicAssets: React.FC = () => {
    const [musicList, setMusicList] = useState<MusicData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/music/user`);
            setMusicList(response.data.data);
        } catch (error: any) {
            alert(
                "Opps...",
                error.response?.data?.message || "Failed to fetch music data.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    }, [alert]);

    const assetsFetch = useRef(false);
    useEffect(() => {
        if (assetsFetch.current) return;
        assetsFetch.current = true;
        fetchData().then();
    }, [fetchData]);

    const sortedMusicList = [...musicList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMusic = sortedMusicList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMusicList.length) {
        return (
            <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center px-4">
                <div className="bg-background-dark/50 rounded-full p-5 shadow-md mb-4">
                    <Icon name="music" className="w-12 h-12 text-accent-400"/>
                </div>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
                    No Music Assets Found
                </h2>
                <p className="text-secondary-400 max-w-md">
                    You haven’t created any AI-generated music yet. Start exploring your ideas
                    and let Veloxi turn them into real music.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4 md:px-2">
                {currentMusic.map((music) => (
                    <MusicListItem key={music.id} music={music}/>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMusicList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MusicAssets;
