import { findBlogById } from "@/server/actions/blogs";
const Page = async ({ params }) => {
    const { blog_id: blogId } = params;
    const blogResponse = await findBlogById({ id: blogId });


}
export default Page