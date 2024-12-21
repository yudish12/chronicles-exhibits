'use client'
import { logout } from "@/server/actions/login"
import { RevalidatePath } from "@/server/actions/revalidate-path";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
export default function LogoutButton(){
    const handleLogout = async (formData)=>{
        try{
            await logout();
            toast.success("Logout successful")
            RevalidatePath('/admin')
        }catch(error){
            console.log("==error==" , error);
            toast.error("Logout failed")
        }
    }
    return (
        <>
    <form action={handleLogout}>
      <Button
        type="submit"
        className="text-white bg-black py-2 my-2 hover:bg-black hover:text-white w-full  "
      >
        Logout
      </Button>
    </form>
        </>
    )
}