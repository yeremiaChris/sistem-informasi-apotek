<template>
  <div>fsdfds</div>
</template>

<script>
import navigation from "@/helpers/fields/navigation";

export default {
  middleware({ redirect, $auth }) {
    const auth = $auth.$storage.getLocalStorage("user");
    const menu = auth.role.menus;
    const menus = menu
      .filter((el) => el.isPermitted)
      .map((item) => {
        const obj = navigation.find((el) => el.title === item.menuName);
        return obj;
      });
    return !menus[0].subMenu.length
      ? redirect(menus[0].href)
      : redirect(menus[0].subMenu[0].href);
  },
};
</script>
