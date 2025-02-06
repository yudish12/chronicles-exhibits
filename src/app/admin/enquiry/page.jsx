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
import { downloadFormSubmissions, getAllForms } from "@/server/actions/forms";
import { Eye, Trash2 } from "lucide-react";
import { deleteForm } from "@/server/actions/forms";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteUTFiles } from "@/server/services/uploadthing";
import { Pagination } from "./_components/Pagination";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import moment from "moment";
import Link from "next/link";
export default function PortfolioTable() {
  const [portfolios, setPortfolios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingPortfolioId, setDeletingPortfolioId] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [downloadDialog, setDownloadDialog] = React.useState(false);

  const [download_start_date, setDownload_start_date] = React.useState("");
  const [download_end_date, setDownload_end_date] = React.useState("");

  const limit = 6;
  const fetchData = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * limit;
      const resp = await getAllForms(skip, limit);
      console.log("Resp", resp);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      setPortfolios(resp.data);
      setTotalPages(Math.ceil(resp.count / limit));
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Enquiries");
    }
  };
  if (loading) {
    <TableSkeletonLoader />;
  }

  React.useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleDeleteConfirm = async () => {
    try {
      const uploadedImage = portfolios.find(
        (portfolio) => portfolio._id === deletingPortfolioId
      );
      const resp = await deleteForm(deletingPortfolioId);

      if (!resp.success) {
        toast.error(resp.error);
        return;
      }

      toast.success("Enquiry deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete Enquiry");
    }
  };

  const handleDownload = async () => {
    try {
      const resp = await downloadFormSubmissions(
        download_start_date,
        download_end_date
      );

      if (!resp.success) {
        toast.error(resp.error);
        return;
      }

      const data = resp.data;

      if (!data || data.length === 0) {
        toast.error("No data available to download.");
        setDownloadDialog(false);
        return;
      }

      // Convert data to CSV format
      const headers = Object.keys(data[0]).join(","); // Create CSV headers
      const rows = data
        .map((row) => {
          return Object.values(row)
            .map((value) => `"${value}"`)
            .join(",");
        })
        .join("\n");

      const csv = `${headers}\n${rows}`;

      // Create a Blob and download the file
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const formattedStartDate = new Date(download_start_date)
        .toLocaleDateString()
        .replace(/\//g, "-");
      const formattedEndDate = new Date(download_end_date)
        .toLocaleDateString()
        .replace(/\//g, "-");
      link.href = url;
      link.download = `Form_Submissions_${formattedStartDate}_to_${formattedEndDate}.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File downloaded successfully.");
      setDownloadDialog(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download");
      setDownloadDialog(false);
    }
  };

  return (
    <div className="container bg-border overflow-auto mx-auto p-8">
      <Card className="flex justify-between items-center bg-white p-4">
        <h1 className="text-2xl font-bold">Enquiry Forms</h1>
        <Dialog open={downloadDialog} onOpenChange={setDownloadDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              style={{ marginTop: "0px", height: "35px" }}
              className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
            >
              Download CSV
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-6">
              <div>
                <Label className="mb-4 block">Start Date</Label>
                <Input
                  value={download_start_date}
                  onChange={(e) => setDownload_start_date(e.target.value)}
                  className="rounded-sm"
                  type="date"
                  required
                />
              </div>
              <div>
                <Label className="mb-4 block">End Date</Label>
                <Input
                  value={download_end_date}
                  onChange={(e) => setDownload_end_date(e.target.value)}
                  className="rounded-sm"
                  type="date"
                  required
                />
              </div>
            </div>
            <Button
              onClick={handleDownload}
              variant="outline"
              style={{ marginTop: "0px", height: "35px" }}
              className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
            >
              Download
            </Button>
          </DialogContent>
        </Dialog>
      </Card>

      <Card className="mt-6 bg-white p-4 border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>E mail</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Page source</TableHead>
              <TableHead>Call Time</TableHead>
              <TableHead>Call Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio, index) => (
              <TableRow key={portfolio._id}>
                <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
                <TableCell>{portfolio.name}</TableCell>
                <TableCell>{portfolio.email}</TableCell>
                <TableCell>{portfolio.phone}</TableCell>
                <TableCell>{portfolio.page_source}</TableCell>
                <TableCell>{portfolio.callTime}</TableCell>
                {portfolio.callDate ? <TableCell>{moment(portfolio.callDate).format("DD")}-{moment(portfolio.callDate).format("MMM")}-{moment(portfolio.callDate).format("YYYY")}</TableCell> : <TableCell>No Date Provided</TableCell>}
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/enquiry/view/${portfolio._id}`}
                      target="_blank"
                    >
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Enquiry</span>
                      </Button>
                    </Link>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
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
