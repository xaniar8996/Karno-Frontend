
export interface notificationType {
    userId: string,
    title: string,
    message: string,
    type: "VERIFY_ACCOUNT" | "SYSTEM" | "WARNING",
    isRead?: boolean,
    createdAt: Date
}