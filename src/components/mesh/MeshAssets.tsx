import React, {useCallback, useEffect, useRef, useState} from "react";
import {useAlert} from "@/context/Alert";
import {MeshData} from "@/types/mesh";
import MeshCard from "@/components/mesh/MeshCard";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import api from "@/utils/axios";
import Icon from "@/components/common/Icon";

const MeshAssets: React.FC = () => {
    const [meshList, setMeshList] = useState<MeshData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/mesh/user`);
            setMeshList(response.data.data);
        } catch (error: any) {
            alert("Opps...", error.response?.data?.message || "Failed to fetch mesh data.", "error");
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

    const sortedMeshList = [...meshList].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMeshes = sortedMeshList.slice(indexOfFirstItem, indexOfLastItem);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <Loader size="large"/>
            </div>
        );
    }

    if (!sortedMeshList.length) {
        return (
            <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center px-4">
                <div className="bg-background-dark/50 rounded-full p-5 shadow-md mb-4">
                    <Icon name="3d" className="w-12 h-12 text-accent-400"/>
                </div>
                <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
                    No Mesh Assets Found
                </h2>
                <p className="text-secondary-400 max-w-md">
                    You haven’t created any AI-generated mesh yet. Start exploring your ideas
                    and let Veloxi turn them into real 3d.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 relative justify-between">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentMeshes.map((mesh) => (
                        <MeshCard key={mesh.id} mesh={mesh}/>
                    ))}
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={sortedMeshList.length}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
            />
        </div>
    );
};

export default MeshAssets;
