"use client";

import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { Button } from "@components/base/button";

interface EditableFieldProps {
  value: string;
  placeholder?: string;
  type?: "text" | "email";
  onSave: (value: string) => Promise<void>;
}

export default function EditableField({
  value,
  placeholder,
  type = "text",
  onSave,
}: EditableFieldProps) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClick = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }

    if (!inputValue.trim()) return;

    await onSave(inputValue);

    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <input
          autoFocus
          type={type}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
          className={`rounded-xl border border-gray-700 bg-transparent px-2 py-1 text-white outline-none ${type === "text" ? "w-auto" : "w-[250px]"}`}
        />
      ) : (
        <span className={`${type === "text" ? "text-lg" : "text-sm"} text-white`}>{value}</span>
      )}

      <Button
        variant="contained"
        color="default"
        className="p-1.5 cursor-pointer"
        onClick={handleClick}
      >
        {editing ? (
          <IoCheckmark className="text-green-500" />
        ) : (
          <FiEdit className="text-gray-400" />
        )}
      </Button>

      {editing && (
        <Button
          variant="contained"
          color="default"
          className="p-1.5 cursor-pointer"
          onClick={handleCancel}
        >
          <LiaTimesSolid className="text-red-500" />
        </Button>
      )}
    </div>
  );
}