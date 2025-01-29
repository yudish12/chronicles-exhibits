"use server";

import { jwtFuncs } from "@/utils";
import { cookies } from "next/headers";

const users = [
  {
    email: "admin@chronicleexhibits.com",
    password: "Chronicle@22"
  },
  {
    email: "rohit@chronicleexhibits.com",
    password: "Rohit@chronicles22"
  }
]

export const login = async ({ email, password }) => {
  // Mock authentication logic
  const emailFromList = users.find(user => user.email === email);

  if (!emailFromList) {
    return false;
  }

  if (emailFromList.password !== password) {
    return false;
  }
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
};

export const logout = async () => {
  cookies().set({
    name: "authorization",
    value: "",
    path: "/",
    maxAge: -1
  })
  return true;
}
