export default [
  // { name: "Dashboard", href: "/", icon: "icon", isActive: false },
  {
    name: "Superadmin",
    title: "Manage Superadmin",
    href: "",
    icon: "icon",
    isActive: false,
    subMenu: [
      { name: "User", href: "/admin/user" },
      { name: "Role", href: "/admin/role" },
    ],
  },
  {
    name: "Obat",
    title: "Manage Obat",
    href: "",
    icon: "icon",
    isActive: false,

    subMenu: [
      { name: "Daftar obat", href: "/obat/list" },
      { name: "Jenis obat", href: "/obat/jenis" },
      { name: "Satuan obat", href: "/obat/satuan" },
    ],
  },
  {
    name: "Supplier",
    title: "Manage Supplier",
    href: "/supplier/list",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  {
    name: "Supplier",
    title: "Pembelian",
    href: "/transaksi/pembelian",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  {
    name: "Obat",
    title: "Penjualan",
    href: "/transaksi/Penjualan",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },

  {
    name: "Laporan",
    title: "Laporan Pembelian",
    href: "/laporan/pembelian",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },

  {
    name: "Laporan",
    title: "Laporan Penjualan",
    href: "/laporan/penjualan",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  // { name: "Retur", href: "#", icon: "icon", isActive: false },
];
