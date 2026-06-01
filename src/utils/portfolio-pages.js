export const PORTFOLIO_STATIC_PAGES = [
  { value: "home", label: "Home" },
  {
    value: "custom-trade-show-booth-ideas",
    label: "Custom Trade Show Booth Ideas",
  },
];

/** CMS pages (pages model) that can host a portfolio section */
export const PORTFOLIO_CMS_PAGE_NAMES = [
  "portfolio",
  "trade-show-booth-displays-designs",
];

/** Maps show_on_pages values to Next.js revalidate paths */
export const PORTFOLIO_PAGE_PATHS = {
  home: "/",
  "custom-trade-show-booth-ideas": "/custom-trade-show-booth-ideas",
  portfolio: "/portfolio",
  "trade-show-booth-displays-designs": "/trade-show-booth-displays-designs",
};

export function getPortfolioPagePath(pageName) {
  return PORTFOLIO_PAGE_PATHS[pageName] ?? null;
}

export function formatPortfolioPageLabel(name) {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
