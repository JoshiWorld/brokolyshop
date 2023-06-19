export type OrdersConfig = typeof ordersConfig

export const ordersConfig = {
  name: "Orders",
  headline: "Bestellungen",
  description: "Hier findest du alle Bestellungen",
  mainPageButtons: [
    {
      title: "Dashboard",
      href: "/orders/dashboard",
    },
    {
      title: "Tasks",
      href: "/orders/tasks",
    },
  ],
}
