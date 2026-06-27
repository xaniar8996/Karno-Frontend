import {z} from "zod"

export const NotifValidation = z.object({
    userId:z.string(),
    title:z.string(),
    message:z.string(),
    type:z.string(),
    isRead:z.boolean(),
    createdAt:z.date()
});

export type NotificationType = z.infer<typeof NotifValidation>
