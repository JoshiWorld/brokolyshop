export type ShopConfig = typeof shopConfig

export const shopConfig = {
  name: "Shop",
  headline: "Brokoly-Shop",
  description: "Hier gibts alle Shop-Artikel",
  mainPageButtons: [
    {
      title: "Musik",
      href: "/shop/music",
    },
    {
      title: "Klamotten",
      href: "/shop/clothes",
    },
  ],
}
