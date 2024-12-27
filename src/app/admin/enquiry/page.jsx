"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { getAllForms } from "@/server/actions/forms";
import {  Trash2 } from "lucide-react";
import { deleteForm } from "@/server/actions/forms";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteUTFiles } from "@/server/services/uploadthing";
export default function PortfolioTable() {
  const [portfolios, setPortfolios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingPortfolioId, setDeletingPortfolioId] = React.useState(null);

  const fetchData = async () => {
    try {
      const resp = await getAllForms();
      console.log("Resp", resp);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setPortfolios(resp.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Portfolios");
    }
  };
  if (loading) {
    <TableSkeletonLoader />;
  }
  React.useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteConfirm = async () => {
    try {
      const uploadedImage = portfolios.find(
        (portfolio) => portfolio._id === deletingPortfolioId
      );
      const resp = await deleteForm(deletingPortfolioId);
      deleteUTFiles([uploadedImage.image.split("f/")[1]]);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setPortfolios((prevPortfolios) =>
        prevPortfolios.filter(
          (portfolio) => portfolio._id !== deletingPortfolioId
        )
      );
      toast.success("Portfolio deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };
  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Enquiry Forms</h1>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>E mail</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Page source</TableHead>
              <TableHead>Call Time</TableHead>
              <TableHead>Call Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio) => (
              <TableRow key={portfolio._id}>
                <TableCell>
                  {portfolio.name}
                </TableCell>
                <TableCell>{portfolio.email}</TableCell>
                <TableCell>{portfolio.phoneNumber}</TableCell>
                <TableCell>{portfolio.page_source}</TableCell>
                <TableCell>{portfolio.callDate}</TableCell>
                <TableCell>{portfolio.callTime}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setDeletingPortfolioId(portfolio._id);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">
                      Delete {portfolio.image_alt_text}
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* delete dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be
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
  );
}