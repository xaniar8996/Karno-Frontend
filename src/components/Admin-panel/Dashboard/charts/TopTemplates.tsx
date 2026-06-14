import "@/lib/chart";
import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

export default function TopTemplates() {

    const getAllCVs = async () => {
        try {
            const response = await NextAPI.get("/api/CV/allCvs");
            return response?.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const { data: allCVs, isLoading, isError, error } = useAPIQuery({
        key: ["allCVs"],
        queryFn: getAllCVs,
    });

    const Templates = useMemo(() => {
        if (!allCVs) return 0;

        return allCVs.reduce((acc: Record<string, number>, cv: any) => {
            acc[cv.template] = (acc[cv.template] || 0) + 1;

            return acc;
        }, {});

    }, [allCVs]);

    const chartData = useMemo(() => {
    if (!Templates || typeof Templates !== "object") return null;

    const labels = Object.keys(Templates);
    const data = Object.values(Templates);

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    "#22c55e",
                    "#f97316",
                    "#38bdf8",
                    "#a855f7",
                    "#eab308",
                ],
                borderWidth: 2,
                borderColor: "#0f172a",
            },
        ],
    };
}, [Templates]);


    return (
        <div className="w-11/12">
            {isLoading ? (
                <div className="flex items-center justify-center py-5">
                    <MiniLoader />
                </div>
            ) : isError ? (
                <p className="text-red-600">{error.message || "خطا در بارگیری نمودار کاربران !"}</p>
            ) : chartData && (
                <Bar data={chartData}/>
            )}
        </div>
    );
}
