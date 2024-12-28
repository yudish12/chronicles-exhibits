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
import { useRouter } from "next/navigation";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import { getAllPortfolios } from "@/server/actions/portfolio";
import { Pencil, Trash2 } from "lucide-react";
import { deletePortfolio } from "@/server/actions/portfolio";
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
  const router = useRouter();
  const [portfolios, setPortfolios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingPortfolioId, setDeletingPortfolioId] = React.useState(null);

  const fetchData = async () => {
    try {
      const resp = await getAllPortfolios();
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
      const resp = await deletePortfolio(deletingPortfolioId);
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
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Button
          onClick={() => {
            router.push("/admin/portfolio/add");
          }}
        >
          Add Portfolio
        </Button>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Image Alt Text</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio, index) => (
              <TableRow key={portfolio._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={portfolio.image}
                    alt={portfolio.image_alt_text}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{portfolio.image_alt_text}</TableCell>
                <TableCell className="text-right">
                  <Button
                    className="mr-2"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      router.push(`/admin/portfolio/edit/${portfolio._id}`);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">
                      Edit {portfolio.image_alt_text}
                    </span>
                  </Button>
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
