import PageEditForm from "../../../create-pages/_component/Form.jsx";
import { getSingleLocationPage } from "@/server/actions/locations";

const PageEdit = async ({ params }) => {
  const resolvedParams = await params;
  const { data } = await getSingleLocationPage({ _id: params.id });
  console.log(data);

  return <PageEditForm isLocationPage={true} pageData={data} />;
};

export default PageEdit;
