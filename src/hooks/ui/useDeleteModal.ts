import { useDeleteModal } from "@context/DeleteModalContext";

/**
 * Hook برای باز کردن modal حذف به صورت ساده و بدون نیاز به state management
 * 
 * @example
 * const openDeleteModal = useDeleteModal();
 * 
 * // برای حذف کاربر:
 * openDeleteModal({ id: "123", name: "john_doe", type: "user" });
 * 
 * // برای حذف رزومه:
 * openDeleteModal({ id: "456", name: "رزومه من", type: "CV" });
 */
export function useDeleteModalHook() {
  const { openModal } = useDeleteModal();
  return openModal;
}
