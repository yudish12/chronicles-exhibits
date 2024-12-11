import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import SubHeader from "@/components/ui/sub-header";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllBlogs } from "@/server/actions/blogs";
const page = async ({ params }) => {
  const blogId = (await params).blog_id;
  const blogFromDb = await getAllBlogs()
  const blogsToBeMapped = blogFromDb.data.slice(0,3);
  console.log("==blog from db ==" , blogFromDb)
  const relatedBlogs = [
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
  ];
  return (
    <>
      <SubHeader />
      <Header />
      <div className="bg-[url('/blog-hero-bg-small.png')] bg-cover bg-no-repeat px-20 text-white gap-4 h-[300px] justify-center items-center flex flex-col">
        <Image
          src={"/Book-open.png"}
          width={60}
          height={60}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-[2.35rem] font-bold">
          MAXIMIZING THE USE OF SPACE IN TRADE SHOWS
        </h3>
      </div>

      <div className="bg-background  text-gray-800 ">
        {/* Main Content Section */}
        <div className="px-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-[40px] py-20 ">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <Image
              src="/what-we-do-2.png"
              alt="Trade Show"
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
            {/* Blog Content */}
            <div className="mt-6 space-y-4 bg-white shadow-one px-10 py-14  rounded-lg ">
              <p>
                Participating in a trade show could lead exhibitors to abundant
                opportunities. It could help them get a higher target audience
                and more chances to meet industry professionals and tycoons.
                When you plan to participate in a trade show, it might become
                important to utilise the space you have booked adequately.
              </p>
              <p className="text-secondary ">
                A trade show booth builder could design an exhibition booth for
                you that makes the most of the space and build it to represent
                your company’s mission and brand. There are so many ways to
                maximise the use of space at an exhibition stand, and some of
                them you will explore in this blog:
              </p>
              <h3 className="font-bold">Make a plan</h3>
              <p className="text-secondary ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita, odit eos, dolor accusantium illo iste rem quod neque
                non odio, explicabo vel! Minima, tempore accusamus! Sunt
                consequatur veritatis nobis error! Deleniti corporis rem
                accusamus itaque, saepe dicta eius et molestias voluptate,
                maxime nemo laborum ipsum id sit recusandae. Voluptas, velit.
              </p>
              <h3 className="font-bold">Select a multi-level design</h3>
              <p className="text-secondary ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita, odit eos, dolor accusantium illo iste rem quod neque
                non odio, explicabo vel! Minima, tempore accusamus! Sunt
                consequatur veritatis nobis error! Deleniti corporis rem
                accusamus itaque, saepe dicta eius et molestias voluptate,
                maxime nemo laborum ipsum id sit recusandae. Voluptas, velit.
              </p>
              <h3 className="font-bold">Utilize every inch</h3>
              <p className="text-secondary ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita, odit eos, dolor accusantium illo iste rem quod neque
                non odio, explicabo vel! Minima, tempore accusamus! Sunt
                consequatur veritatis nobis error! Deleniti corporis rem
                accusamus itaque, saepe dicta eius et molestias voluptate,
                maxime nemo laborum ipsum id sit recusandae. Voluptas, velit.
              </p>
              <h3 className="font-bold">Showcase your brand:</h3>
              <p className="text-secondary ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita, odit eos, dolor accusantium illo iste rem quod neque
                non odio, explicabo vel! Minima, tempore accusamus! Sunt
                consequatur veritatis nobis error! Deleniti corporis rem
                accusamus itaque, saepe dicta eius et molestias voluptate,
                maxime nemo laborum ipsum id sit recusandae. Voluptas, velit.
              </p>
              <h3 className="font-bold">Showcase your brand:</h3>
              <p className="text-secondary ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestias itaque voluptates, sunt similique minima a expedita,
                rem sed provident dignissimos, commodi magnam corporis.
                Consequatur, dicta asperiores ad assumenda ratione nulla
                accusamus, quos, repellendus incidunt voluptatem quisquam nemo
                magnam. Numquam odio perferendis nisi voluptatem itaque et
                explicabo molestiae similique quo, culpa porro in? Non animi
                dolores alias iusto, placeat voluptatum temporibus unde fugiat
                rem vel impedit dolorem voluptas? Numquam debitis aspernatur, ab
                error, modi inventore quos porro explicabo quasi alias labore
                voluptas eos autem saepe voluptatem tenetur fugiat. Eveniet
                deleniti iusto dicta exercitationem aliquid, eos culpa fuga,
                nemo impedit hic architecto.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur, animi? Et libero veritatis, minima quam facilis
                pariatur provident dolorum voluptatum nihil ipsa, assumenda, aut
                nostrum! Perferendis consectetur qui aspernatur itaque,
                repellendus impedit, neque beatae asperiores officiis nisi minus
                veniam molestiae. Iure soluta quo excepturi amet possimus unde
                veritatis impedit debitis, consectetur eos, libero vel saepe
                aperiam fuga ab similique voluptatibus ea. Rerum quisquam iste
                eligendi adipisci, ab quae debitis officia fugiat animi minus.
                Aliquam vitae molestiae ut nostrum eligendi repellat! Blanditiis
                autem quia omnis, laboriosam exercitationem asperiores totam
                doloremque eligendi ipsum accusantium pariatur quasi atque
                similique ratione maiores commodi cumque.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Necessitatibus accusamus omnis id, ab doloremque repellendus
                repudiandae officia asperiores alias, beatae nam atque
                perferendis perspiciatis officiis voluptate itaque laudantium.
                Magnam temporibus vero modi sint exercitationem architecto in,
                neque eos iure eaque repellendus omnis, laborum possimus dolores
                a sequi laudantium nemo non quidem debitis deleniti distinctio
                atque commodi aut. Architecto provident nam neque tenetur dolor
                nihil natus soluta vero quia repudiandae. Inventore tenetur quod
                cum ipsam exercitationem.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 w-full">
            {/* Related Blogs */}
            <div className="flex flex-col justify-center items-center py-4">
              <h3 className="text-lg font-semibold py-2 text-[#B0CB1F]">
                Related Blogs
              </h3>
              <div className="space-y-8">
                {blogsToBeMapped.map((blog, index) => (
                  <Card
                    key={index}
                    className="shadow-one relative h-full w-full flex flex-col justify-between"
                  >
                    {/* Image Section */}
                    <div className="w-full border-b-2 border-primary">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="rounded-t-lg max-h-[155px] w-full object-cover"
                      />
                    </div>

                    {/* Title Section */}
                    <CardContent className="p-4 flex flex-col h-full">
                      <CardTitle className="text-[1.35rem] font-medium heading-font text-secondary text-center">
                        {blog.title}
                      </CardTitle>
                      <Link
                        className="self-center mt-2 h-full"
                        href={`/blog/${index}`}
                      >
                        <Button className="bg-white border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-white">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white p-10 rounded-lg shadow-md text-center flex flex-col justify-center items-center ">
              <div className="w-[98%] h-full bg-[#B0CB1F] rounded-lg py-2 ">
                <h3 className="text-2xl heading-font text-secondary ">
                  ENQUIRY FORM
                </h3>
              </div>
              <form className="gap-6 w-full mt-2 pt-4 flex flex-col ">
                <Input
                  placeholder="Your Name"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Your Email"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Phone Number"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  type="file"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Event Name"
                  className="w-full shadow-two py-2 border-0 "
                />
                <Input
                  placeholder="Booth Size"
                  className="w-full shadow-two py-2 border-0"
                />
                <Textarea
                  placeholder="Tell us about your requirements"
                  className="w-full shadow-two py-2 border-0"
                  rows={3}
                />
                <Button
                  type="submit"
                  className=" bg-secondary hover:bg-white hover:text-secondary text-white shadow-one font-bold "
                >
                  View Portfolio
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
