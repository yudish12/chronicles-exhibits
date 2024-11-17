import { cookies } from "next/headers";
import React from "react";
import { jwtFuncs } from "@/utils";
import LoginPage from "./components/login-form";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { collections } from "@/utils/constants/enums";
import { Home, Settings, User } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authorization")?.value;
  console.log(authToken);
  let isVerified = false;

  // Verify the JWT if it exists
  if (authToken) {
    try {
      isVerified = jwtFuncs.verifyJWT(authToken);
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
    }
  }

  if (!isVerified) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold p-4">Admin Panel</h2>
          </SidebarHeader>
          <SidebarContent className="px-4">
            <SidebarMenu>
              {collections.map((collection, ind) => (
                <SidebarMenuItem key={ind}>
                  <SidebarMenuButton>
                    {collection.icon}
                    <Link href={`/admin/${collection.slug}`}>
                      {collection.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <p>Your main content goes here.</p>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Page;
