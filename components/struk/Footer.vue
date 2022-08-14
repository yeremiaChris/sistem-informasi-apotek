<template>
  <div
    class="pdf-item mt-12 flex justify-end pr-10 h-full"
    :class="{ 'text-xs': $route.path.includes('struk') }"
  >
    <div class="grid gap-3 font-bold mb-6">
      <p class="text-center">Penanggung Jawab</p>
      <p>Semarang, {{ $dayjs().format("DD MMMM YYYY ") }}</p>
      <div class="flex justify-center">
        <img
          src="/apotek.png"
          class="rounded-full px-2 py-2 bg-gray-200 self-center"
          :class="{
            'h-12 w-12': $route.path.includes('struk'),
            'h-24 w-24': !$route.path.includes('struk'),
          }"
        />
      </div>
      <p class="text-center">Apotek Pontjol</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
