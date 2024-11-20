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
    icon: <Layout />,
  },
  {
    slug: "locations",
    name: "Locations",
    icon: <Layout />,
  },
  {
    slug: "events",
    name: "Events",
    icon: <CalendarDays />,
  },
  {
    slug: "booths",
    name: "Booths",
    icon: <ShoppingBag />,
  },
  {
    slug: "blogs",
    name: "Blogs",
    icon: <Newspaper />,
  },
  {
    slug: "form-submissions",
    name: "Form Submissions",
    icon: <FormInput />,
  },
];
