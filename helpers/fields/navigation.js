export default [
  { name: "Dashboard", href: "/", icon: "icon", isActive: false },
  { name: "Obat", href: "/obat/list", icon: "icon", isActive: false },
  { name: "Supplier", href: "/supplier/list", icon: "icon", isActive: false },
  {
    name: "Transaksi",
    href: "",
    icon: "icon",
    isActive: false,
    subMenu: [
      { name: "Pembelian", href: "/transaksi/pembelian" },
      { name: "Penjualan", href: "/transaksi/penjualan" },
    ],
  },
  {
    name: "Laporan",
    href: "",
    icon: "icon",
    isActive: false,
    subMenu: [
      { name: "Pembelian", href: "/laporan/pembelian" },
      { name: "Penjualan", href: "/laporan/penjualan" },
    ],
  },
  { name: "Retur", href: "#", icon: "icon", isActive: false },
];
