<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md text-dark-blue">
    <img
      class="mx-auto h-12 w-auto"
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
    <h2 class="mt-6 text-center text-3xl font-extrabold">Apotek Pontjol</h2>
    <p class="text-center mt-6 font-bold">
      Jl. Imam Bonjol No.31, Purwosari, Kec. Semarang Utara, Kota Semarang, Jawa
      Tengah 50172
    </p>
    <h2 class="mt-6 text-center text-3xl font-extrabold">
      {{ $route.path.includes("register") ? "Sign up" : "Sign in" }} to your
      account
    </h2>
  </div>
</template>

<script>
export default {};
</script>
