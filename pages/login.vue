<template>
  <div class="fixed flex justify-center items-center inset-0 z-50">
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthHeader />

      <AuthFormSignIn />
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  name: "Login",
};
</script>
