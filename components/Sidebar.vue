<template>
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto"
    >
      <div class="flex items-center flex-shrink-0 px-4 gap-2">
        <img src="/apotek.png" class="h-10 w-10 rounded-full bg-gray-400" />
        <h1 class="text-xl">Apotek Pontjol</h1>
      </div>
      <div class="mt-5 flex-grow flex flex-col">
        <nav class="flex-1 px-2 pb-4 space-y-1">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              $route.path === item.href
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
            ]"
          >
            <div class="flex gap-4">
              <img
                class="w-5"
                :src="'/sidebar/' + item.name.toLowerCase() + '.svg'"
                alt="logo"
              />
              {{ item.name }}
            </div>
          </NuxtLink>
        </nav>
      </div>
    </div>

    <button
      class="shadow flex bg-white justify-center items-center gap-4 border py-3 text-lg font-bold"
    >
      <img class="w-6" src="/sidebar/logout.svg" alt="logout" />
      LOGOUT
    </button>
  </div>
</template>

<script>
const navigation = [
  { name: "Dashboard", href: "/", icon: "icon", current: false },
  { name: "Obat", href: "/obat/list", icon: "icon", current: false },
  { name: "Supplier", href: "/supplier/list", icon: "icon", current: false },
  { name: "Transaksi", href: "#", icon: "icon", current: false },
  { name: "Laporan", href: "#", icon: "icon", current: false },
  { name: "Retur", href: "#", icon: "icon", current: false },
];
export default {
  name: "IndexPage",
  data() {
    return {
      navigation,
    };
  },
};
</script>
