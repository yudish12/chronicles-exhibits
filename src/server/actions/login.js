"use server";

import { jwtFuncs } from "@/utils";
import { cookies } from "next/headers";

export const login = async ({ email, password }) => {
  // Mock authentication logic
  if (email === "admin@chronicles.com" && password === "password123") {
    const token = jwtFuncs.signJWT({ email }); // Sign the JWT

    // Set the JWT in cookies
    cookies().set({
      name: "authorization",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return true;
  }

  return false;
};
