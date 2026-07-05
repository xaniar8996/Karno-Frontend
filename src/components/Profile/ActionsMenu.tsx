import { useState } from "react";
import { Button } from "@components/base/button";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdShare } from "react-icons/io";
import { LuFilePlus2 } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "@app/loadings/loading";
import toast from "react-hot-toast";

interface CVId {
    id: string;
    tpl:string;
}

export const CopyCV = ({ id , tpl }: CVId) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const queryClient = useQueryClient();

    const copyCV = useApiMutation({
        key: "copy-CV",
        method: "post",
        url: `/api/CV/copy/${id}`,
        useNextAPI: true,
        onSuccessCallback: () => {
            toast.success("رزومه با موفقیت کپی شد");
            queryClient.invalidateQueries({
                queryKey: ["UserCV"]
            })
        },
        onErrorCallback: (error) => {
            if (error.response?.status === 404) {
                toast.error("رزومه پیدا نشد!");
            } 
        },
    });

    const handleCopyCV = () => {
        copyCV.mutate({})
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(
                `${window.location.origin}/CV/view?id=${id}&tpl=${tpl}`
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.log("Copy failed:", error);
        }
    }

    return (
        <div className="w-auto">
            {isModalOpen && (
                <AnimatePresence>
                    <motion.div
                        key="base-modal-root"
                        role="dialog"
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute w-auto h-auto rounded-lg bg-gray-800 -top-25 left-70 shadow-xl shadow-gray-800/30 transition-all p-2"
                        onMouseLeave={() => setIsModalOpen(false)}
                    >
                        <div className="w-full h-auto flex flex-col justify-center items-center gap-3">
                            <Button
                                variant="contained"
                                size="sm"
                                color="default"
                                icon={!copyCV.isPending && <LuFilePlus2 className="text-lg"/>}
                                className="cursor-pointer hover:bg-gray-700 transition-all"
                                onClick={() => handleCopyCV()}
                                fullWidth
                            >
                                {copyCV.isPending ? (
                                    <MiniLoader className="w-5 h-5" />
                                ) : "ساخت کپی روزمه"}
                            </Button>
                            <Button
                                variant="contained"
                                size="sm"
                                color="default"
                                icon={<IoMdShare className="text-lg"/>}
                                className="cursor-pointer hover:bg-gray-700 transition-all"
                                onClick={() => copyLink()}
                                fullWidth
                            >
                                {copied ? "کپی شد " : " لینک اشتراک‌ گذاری"}
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            )}
            <Button
                variant="text"
                size="xs"
                className="text-white bg-white/10 rounded-xs cursor-pointer group transition-all hover:bg-white/20 active:scale-95 py-2 px-2"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                <HiDotsHorizontal className="text-sm text-gray-400 " />
            </Button>
        </div>
    )
}