<template>
  <div>
    <AuthHeader />

    <AuthFormSignUp />
  </div>
</template>

<script>
export default {
  layout: "login",
  name: "Login",
  auth: false,
};
</script>
