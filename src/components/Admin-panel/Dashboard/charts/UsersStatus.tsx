import "@/lib/chart";
import { MiniLoader } from "@app/loadings/loading";
import { useAPIQuery } from "@hooks/useAPIQuery";
import UserStore from "@Store/UserStore";
import { UsersTypes } from "@Types/UserStore";
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";

export default function UsersStatus() {
  const GetAllUsers = UserStore((state) => state?.GetAllUsers);

  // Share the same query key with UsersNumbers component for cache efficiency
  const { data: allUsers, isLoading, isError, error } = useAPIQuery<UsersTypes | UsersTypes[] | null>({
    key: ["allUsers"],
    queryFn: GetAllUsers,
  });

  // Memoize calculation - optimized filter with early return
  const chartData = useMemo(() => {
    if (!allUsers || !Array.isArray(allUsers)) {
      return {
        labels: ["احراز هویت شده", "احراز هویت نشده"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#22c55e", "#f97316"],
          },
        ],
      };
    }

    const unAuthorizedCount = allUsers.reduce((count, user) => {
      return user.isAccountVerified === false ? count + 1 : count;
    }, 0);

    const authorizedCount = allUsers.length - unAuthorizedCount;

    return {
      labels: ["احراز هویت شده", "احراز هویت نشده"],
      datasets: [
        {
          data: [authorizedCount, unAuthorizedCount],
          backgroundColor: ["#22c55e", "#f97316"],
        },
      ],
    };
  }, [allUsers]);

  return (
    <div className="w-1/2">
      {isLoading ? (
            <div className="flex items-center justify-center py-5">
            <MiniLoader />
        </div>
      ) : (
        <Doughnut data={chartData} />
      )}
    </div>
  );
}
