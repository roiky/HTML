import { z } from "zod";

export const CreateLecturerSchema = z.object({
    first_name: z.string().min(1, "first_name is required"),
    last_name: z.string().min(1, "last_name is required"),
    email: z.string().email("Invalid email"),
    age: z.number().int().min(0, "age must be non-negative"),
    course_count: z.number().int().min(0, "course_count must be non-negative"),
});

export type CreateLecturerDTO = z.infer<typeof CreateLecturerSchema>;
