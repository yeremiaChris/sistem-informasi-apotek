<template>
  <div></div>
</template>

<script>
export default {
  middleware({ redirect }) {
    return redirect("/obat/list");
  },
};
</script>
