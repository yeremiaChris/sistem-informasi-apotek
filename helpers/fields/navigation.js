export default [
  // { name: "Dashboard", href: "/", icon: "icon", isActive: false },
  {
    name: "Superadmin",
    title: "Manage Superadmin",
    front: "Mengelola User",
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
    front: "Mengelola Obat",
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
    front: "Mengelola Supplier",
    href: "/supplier/list",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  {
    name: "Supplier",
    title: "Pembelian",
    front: "Pembelian",
    href: "/transaksi/pembelian",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  {
    name: "Obat",
    title: "Penjualan",
    front: "Penjualan",
    href: "/transaksi/Penjualan",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },

  {
    name: "Laporan",
    title: "Laporan Pembelian",
    front: "Laporan Pembelian",
    href: "/laporan/pembelian",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },

  {
    name: "Laporan",
    title: "Laporan Penjualan",
    front: "Laporan Penjualan",
    href: "/laporan/penjualan",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  {
    name: "Laporan",
    title: "Laporan Persediaan",
    front: "Laporan Persediaan",
    href: "/laporan/persediaan",
    icon: "icon",
    isActive: false,
    subMenu: [],
  },
  // { name: "Retur", href: "#", icon: "icon", isActive: false },
];
