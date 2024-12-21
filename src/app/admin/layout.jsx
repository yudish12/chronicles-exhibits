import { cookies } from "next/headers";
import React from "react";
import { jwtFuncs } from "@/utils";
import LoginPage from "./components/login-form";
import { Button } from "@/components/ui/button";
import LogoutButton from "./components/logout-button";
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
import Link from "next/link";

const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authorization")?.value;
  console.log(authToken);
  let isVerified = false;

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
          <SidebarContent className="px-4 justify-between ">
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
          <LogoutButton/>
          </SidebarContent>
        </Sidebar>
        {children}
      </SidebarProvider>
    </div>
  );
};

export default Layout;
