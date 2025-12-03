export const useLevelHelper = () => {

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: "bg-red-100 text-red-700",
      intermediate: "bg-yellow-100 text-yellow-700",
      midlevel: "bg-yellow-100 text-yellow-700",
      advanced: "bg-blue-100 text-blue-700",
      expert: "bg-green-100 text-green-700",
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  const getLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      beginner: "مبتدی",
      intermediate: "متوسط",
      midlevel: "متوسط",
      advanced: "پیشرفته",
      expert: "متخصص",
    };
    return labels[level] || level;
  };

  return { getLevelColor, getLevelLabel };
};
