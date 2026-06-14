import { useState } from "react";
import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/api-hooks/useAPIQuery";
import { usePagination } from "@hooks/usePagination";
import UserStore from "@Store/UserStore";
import { UserRole, UsersTypes } from "@Types/UserStore";
import { Pagination } from "../../../utils/Pagination";
import { IoAdd } from "react-icons/io5";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { GoBellFill } from "react-icons/go";
import { motion } from "framer-motion";
import SendNotificationModal from "../../modal/UserModal/SendNotificationModal";
import AddUserModal from "@components/modal/UserModal/AddUserModal";
import { useModal } from "@hooks/ui/useModal";
import { useDeleteModalHook } from "@hooks/ui/useDeleteModal";
import { getUserId } from "@utils/GetUserId";

export default function Users() {
    const sendNotificationModal = useModal();
    const openDeleteModal = useDeleteModalHook();

    const GetAllUsers = UserStore((state) => state.GetAllUsers);
    const [selectedUser, setSelectedUser] =
        useState<Partial<Pick<UsersTypes, "Fullname" | "_id" | "email" | "password" | "Birthdate" | "roles">> | null>(null);
    const [method, setMethod] = useState<"add" | "edit">("add");
    const addUserModal = useModal();

    const { data: allUsers, isLoading, isError, error } = useAPIQuery<UsersTypes | UsersTypes[] | null>({
        key: ["allUsers"],
        queryFn: GetAllUsers,
    });

    const {
        paginatedItems: users,
        pageCount,
        setCurrentPage,
    } = usePagination({
        items: Array.isArray(allUsers) ? allUsers : [],
        itemsPerPage: 8,
    });


    const getUserRoles = (roles?: UsersTypes["roles"]): UserRole[] => {
        if (!roles) return [];

        return Object.keys(roles) as UserRole[];
    };

    const openAddModal = () => {
        setSelectedUser(null);
        setMethod("add");
        addUserModal?.open();
    };

    const handleDeleteUser = (
        username: UsersTypes["Fullname"],
        id: UsersTypes["_id"]
    ) => {
        openDeleteModal({
            id: id || "",
            name: username || "",
            type: "user"
        });
    };

    const openEditModal = (user: UsersTypes) => {
        setSelectedUser({
            _id: user._id,
            Fullname: user.Fullname,
            email: user.email,
            password: user.password,
            Birthdate: user.Birthdate,
            roles: user.roles
        });
        setMethod("edit");
        addUserModal?.open();
    };


    const roleStyles: Record<UserRole, string> = {
        Admin: "bg-green-500/20 text-green-400 border border-green-500/40",
        Moderator: "bg-orange-500/20 text-orange-400 border border-orange-500/40",
        User: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    };

    const formatDate = (date: unknown) => {
        if (!date) return "-";

        if (date instanceof Date) {
            return date.toLocaleDateString("fa-IR");
        }

        return String(date);
    };

    const currentUserId = getUserId();

    // open notifs modal
    const openNotifModal = (id: UsersTypes["_id"] , username:UsersTypes["Fullname"]) => {
        sendNotificationModal?.open();
        setSelectedUser({
            _id: id,
            Fullname:username
        });
    }

    return (
        <div className="w-full h-auto flex flex-col justify-center items-start gap-5 px-5">
            <div className="w-full flex flex-row justify-between items-center px-10">
                <h1 className="text-white text-2xl mt-4">مدیریت کاربران</h1>
                <button onClick={openAddModal} type="button" className="text-green-100/50 group cursor-pointer py-2 px-5 rounded-xl
                 bg-green-500/20 transition-all hover:bg-green-500/30 active:scale-95 flex flex-row justify-center items-center gap-2">
                    <IoAdd className=" group-hover:text-green-100/70" />
                    <span>کاربر جدید</span>
                </button>
            </div>
            <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
            >
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
                        <p className="font-medium">خطا در بارگیری کاربران</p>
                        <p className="text-xs text-red-600">
                            {error.message ?? "لطفاً چند لحظه دیگر دوباره تلاش کنید."}
                        </p>
                    </div>
                </div>
                ) : (
                    <div className="w-full h-auto border-2 border-gray-700 p-3 rounded-3xl py-5 relative group p-5">
                        <table className="w-full text-white border-separate border-spacing-y-5">
                            <thead>
                                <tr className="border-b border-gray-600 px-10">
                                    <th className="py-2 text-right px-10 border-b border-gray-700">نام کاربری</th>
                                    <th className="py-2 text-right border-b border-gray-700">ایمیل</th>
                                    <th className="py-2 text-right border-b border-gray-700">تاریخ تولد</th>
                                    <th className="py-2 text-right border-b border-gray-700">نقش‌ها</th>
                                    <th className="py-2 text-right border-b border-gray-700">عملیات ها</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    const roles = getUserRoles(user.roles);
                                    const CurrentAdmin = roles.includes("Admin") && user._id !== currentUserId;

                                    return (
                                        <tr key={user._id || index} className="text-sm">
                                            <td>{user.Fullname ?? "ناشناس"}</td>
                                            <td>{user.email ?? "guest@gmail.com"}</td>
                                            <td>{formatDate(user.Birthdate)}</td>

                                            {/* Role badge */}
                                            <td>
                                                <div className="flex gap-2 flex-wrap">
                                                    {roles.map((r) => (
                                                        <span
                                                            key={r}
                                                            className={`px-3 py-1 rounded-full text-xs ${roleStyles[r]}`}
                                                        >
                                                            {r === "Admin" && "ادمین"}
                                                            {r === "Moderator" && "ادیتور"}
                                                            {r === "User" && "کاربر"}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td>
                                                <div className="flex gap-3">
                                                    {/* notifications */}
                                                    <button
                                                        disabled={CurrentAdmin}
                                                        onClick={() => openNotifModal(user._id , user?.Fullname)}
                                                        className={`p-2 rounded-md transition-all active:scale-95 cursor-pointer
                                                        ${CurrentAdmin
                                                                ? "bg-gray-500/10 text-gray-500 cursor-not-allowed"
                                                                : "text-yellow-500/60 bg-yellow-500/20 hover:text-yellow-500/80 hover:bg-yellow-500/40"
                                                            }`}
                                                    >
                                                        <GoBellFill className="w-4 h-4" />
                                                    </button>

                                                    {/* delete */}
                                                    <button
                                                        disabled={CurrentAdmin}
                                                        onClick={() => handleDeleteUser(user.Fullname, user._id)}
                                                        className={`p-2 rounded-md transition-all active:scale-95 cursor-pointer
                                                        ${CurrentAdmin
                                                                ? "bg-gray-500/10 text-gray-500 cursor-not-allowed"
                                                                : "text-red-500/60 bg-red-500/20 hover:text-red-500/80 hover:bg-red-500/40"
                                                            }`}
                                                    >
                                                        <IoTrashBinOutline />
                                                    </button>

                                                    {/* Edit */}
                                                    <button
                                                        disabled={CurrentAdmin}
                                                        onClick={() => openEditModal(user)}
                                                        className={`p-2 rounded-md transition-all active:scale-95 cursor-pointer
                                                        ${CurrentAdmin
                                                                ? "bg-gray-500/10 text-gray-500 cursor-not-allowed"
                                                                : "text-blue-500/60 bg-blue-500/20 hover:text-blue-500/80 hover:bg-blue-500/40"
                                                            }`}
                                                    >
                                                        <MdOutlineModeEdit />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>
                )}
            </motion.div>

            {/* Pagination */}
            <div className="w-full flex justify-center items-center">
                <Pagination
                    pageCount={pageCount}
                    onPageChange={setCurrentPage}
                />
            </div>
            {addUserModal.isOpen &&
                <AddUserModal
                    onClose={addUserModal.close}
                    method={method as "add" | "edit"}
                    user={selectedUser}
                />}
            {sendNotificationModal.isOpen && (
                <SendNotificationModal
                    onClose={sendNotificationModal.close}
                    selectedUser={selectedUser ?? null}
                />
            )}
        </div>
    )
}