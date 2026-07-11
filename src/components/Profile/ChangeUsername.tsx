import { useApiMutation } from "@hooks/api-hooks/useAPIMutation";
import { useQueryClient } from "@tanstack/react-query";
import { UsersTypes } from "@Types/userStore";
import { FiEdit } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@components/base/button";

interface UserDataProps {
  userData: UsersTypes | null;
}

export default function ChangeUsername({ userData }: UserDataProps) {
  const [userName, setUserName] = useState<UsersTypes["Fullname"]>("");
  const [isChange, setIsChange] = useState(false);
  const queryClient = useQueryClient();


  const handleEditUsername = async () => {
    if (!userName || userName.length === 0) {
      toast.error("یک نام باید حتما انتخاب کنی");
      return;
    }

    if (!isChange) {
      setUserName(userData?.Fullname ?? "");
      setIsChange(true);
      return;
    }

    await editUsername.mutateAsync({
      Fullname: userName,
    });

    setIsChange(false);
  };

  return (
    <div className="text-white flex justify-start items-center gap-3 w-auto">
      {isChange ? (
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-1 rounded-xl w-auto border-2 border-gray-700/70 text-md px-2"
          placeholder="نام جدید..."
        />
      ) : (
        <span className="text-white w-auto text-lg">
          {userData?.Fullname ?? "Guest"}
        </span>
      )}
      <div className="w-auto flex justify-center items-center gap-2">
        <Button
          variant="contained"
          color="default"
          onClick={handleEditUsername}
          className="w-auto p-1.5 group bg-gray-600/30 hover:bg-gray-600/50 transition-all rounded-sm cursor-pointer active:scale-95 "
        >
          {isChange ? (
            <IoCheckmark className="text-green-600 text-sm group-hover:text-green-400 transition-all" />
          ) : (
            <FiEdit className="text-gray-500 text-sm group-hover:text-gray-400 transition-all" />
          )}
        </Button>
        {isChange && (
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              setUserName(userData?.Fullname ?? "");
              setIsChange(false);
            }}
            className="w-auto p-1.5 group bg-gray-600/30 hover:bg-gray-600/50 transition-all rounded-sm cursor-pointer active:scale-95 "
          >
            <LiaTimesSolid className="text-red-500/90 text-sm transition-all" />
          </Button>
        )}
      </div>
    </div>
  );
}
