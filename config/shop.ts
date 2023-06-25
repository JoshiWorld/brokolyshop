export type ShopConfig = typeof shopConfig

export const shopConfig = {
  headline: "Shop",
  description: "Hier findest du alle Artikel",
  articles: [
    {
      id: 1,
      title: "Mix & Master",
      description: "Dein Mix & Mastering Service für den perfekten modernen Sound!",
      image: "/image/link",
      price: 25.00,
    },
    {
      id: 2,
      title: "Beat",
      description: "Dein exklusiv angefertigter Beat mit 100% Rechten",
      image: "/image/link",
      price: 35.00,
    },
  ]
}
