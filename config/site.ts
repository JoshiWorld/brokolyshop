export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Brokoly-Shop",
  headline: "Brokoly Mix & Master Shop",
  description: "Die Hilfe für deine Musikproduktion!",
  mainPageButtons: [
    {
      title: "Zum Shop",
      href: "/shop",
    },
  ],
  mainNav: [
    {
      title: "Start",
      href: "/",
    },
    {
      title: "Shop",
      href: "/shop",
    },
    {
      title: "Kontakt",
      href: "/contact",
    },
    {
      title: "Bestellungen",
      href: "/orders",
      role: "ADMIN",
    },
  ],
  links: {
    twitter: "https://twitter.com/brokolyyyyy",
    instagram: "https://instagram.com/nichtbrokoly",
    docs: "https://ui.shadcn.com",
  },
}
