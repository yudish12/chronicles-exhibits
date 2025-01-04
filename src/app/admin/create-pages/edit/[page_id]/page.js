import { getSinglePage } from "@/server/actions/pages";
import PageEditForm from "../../_component/Form";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const id = resolvedParams.page_id;

  const { data } = await getSinglePage({ _id: id });

  return <PageEditForm isLocationPage={false} pageData={data} />;
};

export default Page;
