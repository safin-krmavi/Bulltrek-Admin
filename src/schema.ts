import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(false)
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    first_name: z
        .string()
        .min(1, "First name is required")
        .max(30, "First name too long")
        .regex(/^[A-Za-z ]+$/, "First name must only contain letters and spaces"),
    last_name: z
        .string()
        .min(1, "Last name is required")
        .max(30, "Last name too long")
        .regex(/^[A-Za-z ]+$/, "Last name must only contain letters and spaces"),
    email: z.string().email("Invalid email address"),
    mobile: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const newPasswordSchema = z.object({
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export type NewPasswordInput = z.infer<typeof newPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;