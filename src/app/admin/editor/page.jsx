import EditablePage from "../components/Editor";
import { homePageData } from "@/utils/constants/dev-data/home";

export default function EditablePageView() {
  return (
    <div className="container mx-auto p-4">
      <EditablePage data={homePageData} isAdmin={true} />
    </div>
  );
}
