import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery"
import { NextAPI } from "@lib/axios";
import { templatesData } from "@data/TemplatesData";
import { ResumeData } from "@Types/resumeType";
import { MdWork } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
import Link from "next/link";
import { useDeleteModalHook } from "@hooks/ui/useDeleteModal";
import { Pagination } from "@utils/Pagination";
import { usePagination } from "@hooks/usePagination";

export default function CVs() {
    const openDeleteModal = useDeleteModalHook();

    const templateById = Object.fromEntries(
        templatesData.map((t) => [t.id, { image: t.image, name: t.name }] as const)
    ) as Record<string, { image: string; name: string }>;

    const getAllCVs = async () => {
        try {
            const response = await NextAPI.get("/api/CV/allCvs");
            return response?.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const { data: allCVs, isLoading, isError, error } = useAPIQuery<ResumeData[] | null>({
        key: ["allCVs"],
        queryFn: getAllCVs,
    });

    // --- set CV Name and Image ---
    const getTemplateImage = (templateId: string) =>
        templateById[templateId]?.image ?? "/Images/templates/nova.jpg";

    const getTemplateName = (templateId: string) =>
        templateById[templateId]?.name ?? "قالب نامشخص";

    // open delete modal
    const handleDeleteCV = (cv: ResumeData) => {
        openDeleteModal({
            id: cv._id || "",
            name: cv.personal?.fullName || cv.personal?.jobTitle || "رزومه",
            type: "CV"
        });
    };

    // pagination 
    const {
        paginatedItems: CVs,
        pageCount,
        setCurrentPage,
    } = usePagination({
        items: Array.isArray(allCVs) ? allCVs : [],
        itemsPerPage: 8,
    });

    return (
        <div className="w-full h-full text-white p-5 px-9 space-y-10">
            <h1 className="text-2xl">مدیریت رزومه ها</h1>

            {/* CVs */}
            {isLoading ? (
                <MiniLoader />
            ) : isError ? (
                <div className="w-full rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800 shadow-sm flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M11 7h2v6h-2zm0 8h2v2h-2z" />
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
                        </svg>
                    </span>
                    <div className="space-y-1">
                        <p className="font-medium">خطا در بارگیری رزومه‌ها</p>
                        <p className="text-xs text-red-600">
                            {error.message ?? "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-4 justify-center items-center gap-5">
                    {CVs.map((cv: ResumeData, idx: number) => (
                        <div
                            key={cv?._id ?? idx}
                            className="w-full max-w-sm overflow-hidden rounded-[2.25rem] bg-white text-black shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_55px_-35px_rgba(15,23,42,0.65)]"
                        >
                            <div className="relative h-60 w-full">
                                <img
                                    src={getTemplateImage(cv.template)}
                                    alt="cv-template-preview"
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                            </div>

                            <div className="space-y-4 px-6 pb-6 pt-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="truncate text-xl font-semibold">
                                                {cv?.personal?.fullName ?? "guest"}
                                            </h3>
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                                                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                                            {getTemplateName(cv.template)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCV(cv)}
                                        className="cursor-pointer rounded-lg transition-all hover:bg-gray-200 p-2 active:scale-95 group hover:bg-red-600/20">
                                        <AiOutlineDelete className="w-auto text-lg text-gray-600 group-hover:text-red-600" />
                                    </button>
                                </div>

                                <div className="flex flex-row justify-between items-center gap-8 text-sm text-zinc-700">
                                    <div className="flex items-center gap-8">
                                        <div className="flex items-center gap-2" title="مهارت ها">
                                            <MdWork />
                                            <span className="font-semibold">{cv?.skills?.length ?? 0}</span>
                                        </div>

                                        <div className="flex items-center gap-2" title="تجربه ها">
                                            <IoStarSharp />
                                            <span className="font-semibold">{cv?.experiences?.length ?? 0}</span>
                                        </div>
                                    </div>

                                    <Link href={`/CV/view?id=${cv._id}&tpl=${cv.template}`} className="w-auto">
                                        <button
                                            type="button"
                                            className="shrink-0 cursor-pointer rounded-2xl bg-zinc-100 px-4 py-2 text-sm
                                         font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 active:scale-95 transition-all"
                                        >
                                            مشاهده +
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* paginations */}

            <div className="w-full flex justify-center items-center">
                <Pagination
                    pageCount={pageCount}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div >
    )
}