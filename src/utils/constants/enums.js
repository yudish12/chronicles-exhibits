import {
  CalendarDays,
  Newspaper,
  ShoppingBag,
  Layout,
  FileText,
  FormInput,
} from "lucide-react";

export const continents = {
  america: "America",
  middleEast: "Middle East",
  europe: "Europe",
};

export const collections = [
  {
    slug: "booth-sizes",
    name: "Booth Sizes",
    icon: <Layout className="hover:stroke-black" color="#B0CB1F" />,
  },
  {
    slug: "locations",
    name: "Locations",
    icon: <Layout color="#B0CB1F" />,
  },
  {
    slug: "events",
    name: "Events",
    icon: <CalendarDays color="#B0CB1F" />,
  },
  {
    slug: "booths",
    name: "Booths",
    icon: <ShoppingBag color="#B0CB1F" />,
  },
  {
    slug: "blogs",
    name: "Blogs",
    icon: <Newspaper color="#B0CB1F" />,
  },
  {
    slug: "form-submissions",
    name: "Form Submissions",
    icon: <FormInput color="#B0CB1F" />,
  },
];
