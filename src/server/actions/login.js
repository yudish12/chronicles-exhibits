"use server";

import { jwtFuncs } from "@/utils";
import { cookies } from "next/headers";

export const login = async ({ email, password }) => {
  // Mock authentication logic
  if ((email === "admin@chronicles.com" || email === "rohit@chronicleexhibits.com") && password === "Chronicle@22") {
    const token = jwtFuncs.signJWT({ email }); // Sign the JWT

    // Set the JWT in cookies
    cookies().set({
      name: "authorization",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: "/",
      maxAge: 60 * 60 * 48,
    });

    return true;
  }

  return false;
};

export const logout = async ()=>{
  cookies().set({
    name : "authorization",
    value: "",
    path: "/",
    maxAge : -1
  })
  return true ;
}
