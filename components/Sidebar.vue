<template>
  <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-gray-800 overflow-y-auto"
    >
      <div class="flex items-center flex-shrink-0 px-4 gap-2">
        <img src="/apotek.png" class="h-10 w-10 rounded-full bg-gray-400" />
        <h1 class="text-lg text-gray-200 uppercase font-bold">
          Apotek Pontjol
        </h1>
      </div>
      <div class="mt-5 flex-grow flex flex-col">
        <nav class="flex-1 px-2 pb-4 space-y-1">
          <div v-for="(item, index) in navigation" :key="index + 'menu'">
            <NuxtLink
              v-if="item.href"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <div class="flex gap-4">
                <img
                  v-if="$route.path === item.href"
                  class="w-5"
                  :src="'/sidebar/' + item.name.toLowerCase() + '.svg'"
                  alt="logo"
                />
                <img
                  v-else
                  class="w-5"
                  :src="'/sidebar/' + item.name.toLowerCase() + '-white.svg'"
                  alt="logo"
                />
                {{ item.title }}
              </div>
            </NuxtLink>
            <button
              v-else
              :disabled="disabled"
              class="w-full"
              :class="[
                $route.path === item.href &&
                item.subMenu.some((el) => $route.path.includes(el.href))
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
              @click="showDropdown(item.name)"
            >
              <div class="flex w-full justify-between">
                <div class="flex gap-4">
                  <img
                    v-if="$route.path === item.href"
                    class="w-5"
                    :src="'/sidebar/' + item.name.toLowerCase() + '.svg'"
                    alt="logo"
                  />
                  <img
                    v-else
                    class="w-5"
                    :src="'/sidebar/' + item.name.toLowerCase() + '-white.svg'"
                    alt="logo"
                  />
                  <p>
                    {{ item.title }}
                  </p>
                </div>
                <div class="transform" :class="{ 'rotate-90': !item.isActive }">
                  <img src="/arrow.svg" class="w-3" alt="arrow" />
                </div>
              </div>
            </button>

            <div v-if="item.isActive" class="pl-10 text-sm grid gap-2">
              <NuxtLink
                v-for="(menu, index) in item.subMenu"
                :key="index"
                :to="menu.href"
                class="flex items-center gap-2 py-1"
              >
                <div class="w-5">
                  <svg
                    class="ml-2"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="5"
                      stroke="gray"
                      stroke-width="2"
                    />
                  </svg>
                </div>

                <p
                  class="text-gray-200"
                  :class="{ 'text-yellow-400': $route.path === menu.href }"
                >
                  {{ menu.name }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <button
      @click="logout"
      :disabled="disabled"
      class="shadow flex bg-white items-center gap-4 border px-3 py-2 text-sm"
    >
      <img class="w-6" src="/sidebar/logout.svg" alt="logout" />
      LOGOUT
    </button>
  </div>
</template>

<script>
import navigation from "@/helpers/fields/navigation";
export default {
  name: "IndexPage",
  data() {
    return {
      navigation,
    };
  },
  computed: {
    disabled() {
      return this.$store.state.isRequesting;
    },
  },
  methods: {
    showDropdown(name) {
      this.navigation = this.navigation.map((item) =>
        item.name === name
          ? { ...item, isActive: !item.isActive }
          : { ...item, isActive: false }
      );
    },
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
