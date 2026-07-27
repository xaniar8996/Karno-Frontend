import { Dispatch, SetStateAction } from "react";

interface SearchUserProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function SearchUser({ query, setQuery }: SearchUserProps) {
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="جستجوی کاربر..."
      className=" w-full px-4 py-2 rounded-xl text-white bg-transparent border-2
         border-gray-600 outline-none focus:border-green-500 transition-all "
    />
  );
}
