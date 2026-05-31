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
import { Card, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TableSkeletonLoader from "@/components/loaders/table-skeleton";
import {
  getAllDataBySearch,
  getAllPortfolios,
  getPortfolioPageOptions,
} from "@/server/actions/portfolio";
import { formatPortfolioPageLabel } from "@/utils/portfolio-pages";
import PortfolioMultiSelect from "./_components/PortfolioMultiSelect";
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
import { Pagination } from "../blogs/_components/Pagination";
import Search from "@/components/ui/search";
import Link from "next/link";
export default function PortfolioTable() {
  const router = useRouter();
  const [portfolios, setPortfolios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingPortfolioId, setDeletingPortfolioId] = React.useState(null);
  const [totalPages, setTotalPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState([]);
  const [pageFilter, setPageFilter] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);
  const [pageOptions, setPageOptions] = React.useState([]);
  const limit = 6;

  const activeFilters = React.useMemo(
    () => [...pageFilter, ...locationFilter],
    [pageFilter, locationFilter],
  );

  React.useEffect(() => {
    getPortfolioPageOptions().then((resp) => {
      if (resp.success) {
        setLocationOptions(resp.data.locations ?? []);
        setPageOptions(resp.data.pages ?? []);
      }
    });
  }, []);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const resp = await getAllPortfolios(
        skip,
        limit,
        null,
        activeFilters.length > 0 ? activeFilters : null,
      );
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
      toast.error("Failed to fetch Portfolios");
    }
  };

  const handleSearchClick = async () => {
    if (!searchValue) return fetchData();
    try {
      const searchResp = await getAllDataBySearch(searchValue);
      console.log("===searchResp===", searchResp);
      setPortfolios(searchResp.data);
      const count = searchResp.count ?? 0;
      setTotalPages(Math.ceil(count / limit));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching data");
    }
  };

  if (loading) {
    <TableSkeletonLoader />;
  }
  React.useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, activeFilters]);
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
        <CardHeader className="flex mb-4 flex-row flex-wrap gap-4 items-end">
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="min-w-[220px] flex-1">
            <PortfolioMultiSelect
              label="Filter by locations"
              placeholder="All locations"
              options={locationOptions}
              value={locationFilter}
              onChange={(selected) => {
                setLocationFilter(selected);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="min-w-[220px] flex-1">
            <PortfolioMultiSelect
              label="Filter by pages"
              placeholder="All pages"
              options={pageOptions}
              value={pageFilter}
              onChange={(selected) => {
                setPageFilter(selected);
                setCurrentPage(1);
              }}
            />
          </div>
          <Button
            onClick={handleSearchClick}
            variant="outline"
            style={{ marginTop: "0px", height: "35px" }}
            className="border-secondary text-secondary mt-0 font-semibold px-4 py-"
          >
            Search
          </Button>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Image Alt Text</TableHead>
              <TableHead>Show on pages</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio, index) => (
              <TableRow key={portfolio._id}>
                <TableCell>{index + 1 + (currentPage - 1) * 6}</TableCell>
                <TableCell>
                  <img
                    src={portfolio.image}
                    alt={portfolio.image_alt_text}
                    className="w-16 h-16 rounded"
                  />
                </TableCell>
                <TableCell>{portfolio.image_alt_text}</TableCell>
                <TableCell className="max-w-[200px] text-sm">
                  {(portfolio.show_on_pages ?? []).length > 0
                    ? (portfolio.show_on_pages ?? [])
                        .map((p) => formatPortfolioPageLabel(p))
                        .join(", ")
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/portfolio/edit/${portfolio._id}`}>
                    <Button
                      className="mr-2"
                      variant="outline"
                      size="icon"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">
                        Edit {portfolio.image_alt_text}
                      </span>
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
