import { useMemo } from "react";
import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { NextAPI } from "@lib/axios";
import { UsersTypes } from "@Types/userStore";
import Link from "next/link";
import { CopyCV } from "./ActionsMenu";
import { IoTrashBinOutline } from "react-icons/io5";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { useDeleteModalHook } from "@hooks/ui/useDeleteModal";
import { ResumeData } from "@Types/resumeType";
import { Button } from "@components/base/button";

interface UserDataTypes {
  userData: UsersTypes | null;
}

export default function UserCVs({ userData }: UserDataTypes) {
  const openDeleteModal = useDeleteModalHook();

  const { data: userCV, isLoading: cvLoading } = useAPIQuery<ResumeData[]>({
    key: ["UserCV"],
    queryFn: async () => {
      try {
        const CVResponse = await NextAPI.get("/api/CV/userCV");
        return CVResponse?.data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    enabled: Boolean(userData),
  });

  // open delete modal
  const handleDeleteUserCV = (cv: ResumeData) => {
    openDeleteModal({
      id: cv._id || "",
      name: cv.personal?.fullName || cv.personal?.jobTitle || "رزومه",
      type: "CV",
    });
  };

  const resumeList = useMemo(() => userCV || [], [userCV]);

  return (
    <div className="space-y-3">
      {cvLoading ? (
        <div className="w-full h-auto flex justify-center items-center">
          <MiniLoader className="w-13 h-13" />
        </div>
      ) : resumeList.length ? (
        resumeList.map((resume: any, index: number) => (
          <div
            key={resume._id || index}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-100 backdrop-blur transition hover:border-emerald-400/60 hover:bg-white/10 md:px-5 md:py-3.5 md:text-sm"
          >
            <div className="flex flex-1 items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 text-[11px] font-semibold text-slate-100 md:text-xs">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-white">
                  {resume?.template || "بدون نام"}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-300/80 md:text-xs">
                  {resume?.personal?.jobTitle ||
                    resume?.personal?.fullName ||
                    "رزومه"}
                </p>
                {/* <span>{resume.createdAt}</span> */}
              </div>
            </div>
            <div className="flex items-center gap-3 text-[11px] md:text-xs">
              <div className="flex items-center gap-3">
                <CopyCV id={resume._id || ""} tpl={resume.template} />
                <Button
                  variant="text"
                  size="xs"
                  onClick={() => handleDeleteUserCV(resume)}
                  className="bg-red-500/30 rounded-xs cursor-pointer group transition-all hover:bg-red-600/40 active:scale-95 px-2 py-2"
                >
                  <IoTrashBinOutline className="text-sm text-red-500/80" />
                </Button>
              </div>
              <Link href={`/CV/view?id=${resume._id}&tpl=${resume.template}`}>
                <Button
                  variant="contained"
                  size="sm"
                  className="rounded-xl bg-white/10 px-3 py-1.5 text-slate-100 transition hover:bg-white/20 cursor-pointer"
                >
                  مشاهده
                </Button>
              </Link>
              <Link href={`/CV?tpl=${resume.template}&editId=${resume._id}`}>
                <Button
                  variant="contained"
                  size="sm"
                  className="rounded-xl cursor-pointer px-3 py-1.5 font-semibold text-slate-950 shadow-[0_6px_20px_rgba(16,185,129,0.55)] transition hover:brightness-110"
                >
                  ویرایش
                </Button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center backdrop-blur-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-sky-500/10 shadow-[0_8px_32px_rgba(16,185,129,0.15)]">
            <HiOutlineDocumentPlus className="h-8 w-8 text-emerald-300" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium text-white md:text-base">
              رزومه ای نمیبینم!
            </p>
            <p className="text-xs text-slate-400 md:text-sm">
              با چند کلیک ساده، اولین رزومه حرفه‌ای خودت را بساز
            </p>
          </div>

          <Link
            href="/CV/CVSlider"
          >
            <Button
            variant="contained"
            color="primary"
            size="sm"
            icon={<HiOutlineDocumentPlus className="text-xl"/>}
            className="cursor-pointer hover:shadow-xl hover:shadow-green-900/50 transition-all hover:scale-105"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">ساخت رزومه</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
