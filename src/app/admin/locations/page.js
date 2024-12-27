import { getSinglePage } from "@/server/actions/pages";
import PageEditForm from "../create-pages/_component/Form";

const Page = async () => {
  const { data } = await getSinglePage({ name: "locations" });

  return <PageEditForm pageData={data} />;
};

export default Page;
