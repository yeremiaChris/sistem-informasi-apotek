<template>
  <div>
    <AuthHeader />

    <AuthFormSignIn />
  </div>
</template>

<script>
export default {
  layout: "login",
  name: "Login",
  auth: false,
};
</script>
