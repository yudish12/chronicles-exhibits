import {
  CalendarDays,
  Newspaper,
  ShoppingBag,
  Layout,
  FileText,
  FormInput,
  GalleryThumbnails,
} from "lucide-react";

export const continents = {
  america: "America",
  middleEast: "Middle East",
  europe: "Europe",
};

export const collections = [
  {
    slug: "create-pages",
    name: "Create Pages",
    icon: <FileText color="#B0CB1F" />,
  },
  {
    slug: "booth-sizes",
    name: "Booth Sizes",
    icon: <Layout className="hover:stroke-black" color="#B0CB1F" />,
  },
  {
    slug: "create-city",
    name: "Create City",
    icon: <Layout className="hover:stroke-black" color="#B0CB1F" />,
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
  {
    slug: "portfolio",
    name: "Portfolio",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "home",
    name: "Home",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "about-us",
    name: "About Us",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "custom-trade-show-booth-designs",
    name: "Custom Trade Show",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "faq",
    name: "FAQ",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "locations",
    name: "Major Cities",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
  {
    slug: "site-map",
    name: "Site Map",
    icon: <GalleryThumbnails color="#B0CB1F" />,
  },
];
