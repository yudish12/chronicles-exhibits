"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/search";
import Link from "next/link";
import { Eye, Pencil, PlusIcon, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getAllUsers , deleteData , updateData , addData } from "@/server/actions/user";
const User = ()=>{
    const [user , setUser] = useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState("");
    const [deletingUserId , setDeletingUserId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 6;
    const router = useRouter();
    // if (loading) {
    //     return <TableSkeletonLoader />;
    //   }
    const getData = async (page = 1) => {
        try {
          setLoading(true);
          const skip = (page - 1) * limit;
          const resp = await getAllUsers(skip, limit);
          console.log("resp users", resp);
          if (!resp.success) {
            toast.error(resp.err);
            setLoading(false);
            return;
          }
          setUser(resp.data);
          setTotalPages(Math.ceil(resp.count / limit));
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      
    const handleDeleteConfirm = async () => {
        const resp = await deleteData(deletingUserId);
        if (!resp.success) {
          toast.error(resp.err);
          return;
        }
        const updatedUsers = user.filter(
          (user) => user._id !== deletingUserId
        );
        setUser(updatedUsers);
        setIsDeleteDialogOpen(false);
      };
    
    const handleDelete = (id) => {
        setDeletingUserId(id);
        setIsDeleteDialogOpen(true);
      };

      React.useEffect(() => {
        getData(currentPage);
      }, [currentPage]);

    return (
        <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold ">Users</h1>
        <Button
          onClick={() => {
            router.push("/admin/users/add");
          }}
        >
          Add User
        </Button>
        </Card>
          <Card className="mt-6 bg-white p-4 border">
          <Table>
          <TableHeader>
            <TableRow>
            <TableHead>S. No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {user.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
                <TableCell className="font-medium">
                  {user.email}
                </TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/users/edit/${user._id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
            </Table>
          </Card>
        {/* delete dialog  */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this User ? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
    )
}

export default User ;