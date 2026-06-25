import { z } from "zod";

/** Shared input schemas. Used by both client forms and server routes so the
 *  server never trusts the client and validation lives in one place. */

export const registerSchema = z
  .object({
    name: z.string().min(2, "Please enter your name").max(80),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(7, "Enter a valid number")
      .max(20)
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .max(100)
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number"),
  })
  .strict();

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

// `company` is a honeypot: a hidden field real users never see. Bots that fill
// every input will set it, letting us silently drop the submission.
export const shopperRequestSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid WhatsApp number").max(20),
  category: z.string().min(1, "Select a category"),
  details: z.string().max(2000).optional().or(z.literal("")),
  company: z.string().max(0).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z.string().min(5, "Tell us a little more").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export const addressSchema = z.object({
  label: z.string().max(40).optional().or(z.literal("")),
  fullName: z.string().min(2, "Enter the recipient's name").max(80),
  line1: z.string().min(3, "Enter the address").max(120),
  line2: z.string().max(120).optional().or(z.literal("")),
  city: z.string().min(2, "Enter the city").max(60),
  state: z.string().max(60).optional().or(z.literal("")),
  country: z.string().min(2, "Enter the country").max(60),
  postalCode: z.string().max(20).optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Enter your name").max(80),
  phone: z.string().max(20).optional().or(z.literal("")),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ShopperRequestInput = z.infer<typeof shopperRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
