import { Request, Response, NextFunction } from "express";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.message === "EMAIL_EXISTS") {
    return res.status(409).json({ message: "Email already exists" });
  }
  if (err?.name === "ZodError") {
    return res.status(400).json({ message: "Validation error", details: err.errors });
  }
  console.error(err);
  return res.status(500).json({ message: "Server error" });
}
