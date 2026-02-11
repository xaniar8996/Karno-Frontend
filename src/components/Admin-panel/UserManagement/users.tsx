import { useState } from "react";
import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/useAPIQuery";
import { usePagination } from "@hooks/usePagination";
import UserStore from "@Store/UserStore";
import { UserRole, UsersTypes } from "@Types/UserStore";
import { Pagination } from "../../../utils/Pagination";
import { IoAdd } from "react-icons/io5";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { motion } from "framer-motion";
import AddUserModal from "@components/modal/UserModal/AddUserModal";
import DeleteUserModal from "@components/modal/UserModal/DeleteUser";
import { useModal } from "@hooks/useModal";
import { getUserId } from "@utils/GetUserId";

export default function Users() {
    const GetAllUsers = UserStore((state) => state.GetAllUsers);
    const [selectedUser, setSelectedUser] =
        useState<Partial<Pick<UsersTypes, "Fullname" | "_id" | "email" | "password" | "Birthdate" | "roles">> | null>(null);
    const [method, setMethod] = useState<"add" | "edit">("add");
    const addUserModal = useModal();
    const deleteUserModal = useModal();

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

    const openDeleteModal = (
        username: UsersTypes["Fullname"],
        id: UsersTypes["_id"]
    ) => {
        setSelectedUser({ Fullname: username, _id: id });
        deleteUserModal?.open();
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
                    <div className="w-full flex justify-center items-center">
                        <p>{error?.message || "خطا در گرفتن اطلاعات کاربران"}</p>
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
                                                    {/* delete */}
                                                    <button
                                                        disabled={CurrentAdmin}
                                                        onClick={() => openDeleteModal(user.Fullname, user._id)}
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
            {deleteUserModal.isOpen && (
                <DeleteUserModal
                    onClose={deleteUserModal.close}
                    username={selectedUser?.Fullname ?? ""}
                    id={selectedUser?._id ?? ""}
                />
            )}
        </div>
    )
}