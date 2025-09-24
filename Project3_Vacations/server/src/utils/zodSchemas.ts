import { z } from "zod";

export const registerSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password required"),
});

const isoDateString = z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Invalid date format, expected ISO string",
});

export const vacationCreateSchema = z.object({
    destination: z.string().min(1, "destination is required"),
    description: z.string().min(1, "description is required"),
    start_date: isoDateString,
    end_date: isoDateString,
    price: z.number().min(0).max(10000),
});

export const vacationUpdateSchema = vacationCreateSchema;
