export default [
  // { name: "Dashboard", href: "/", icon: "icon", isActive: false },
  {
    name: "Obat",
    href: "",
    icon: "icon",
    isActive: false,

    subMenu: [
      { name: "Daftar obat", href: "/obat/list" },
      { name: "Jenis obat", href: "/obat/jenis" },
      { name: "Satuan obat", href: "/obat/satuan" },
    ],
  },
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
  // { name: "Retur", href: "#", icon: "icon", isActive: false },
];
