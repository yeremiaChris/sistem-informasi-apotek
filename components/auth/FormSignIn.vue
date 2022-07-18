<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="userLogin">
        <p v-if="errorBackend" class="text-red-500">{{ errorBackend }}</p>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            @click="userLogin"
            :disabled="disabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data() {
    return {
      email: "",
      password: "",
      errorBackend: "",
    };
  },
  watch: {
    "$data.email"() {
      this.errorBackend = "";
    },
    "$data.password"() {
      this.errorBackend = "";
    },
  },
  computed: {
    disabled() {
      return this.$store.state.isRequesting;
    },
  },
  methods: {
    async userLogin() {
      try {
        const { email, password } = this.$data;
        const response = await this.$auth.loginWith("local", {
          data: { email, password },
        });
        const { data } = response;
        await this.$auth.setUser(data);
        this.$auth.strategy.token.set(data.data.token);
        this.$auth.setUserToken(data.token, data.data.refreshToken);
        // this.$router.push("/");
      } catch (err) {
        this.errorBackend = err.response.data.message;
        console.log(err.response);
      }
    },
  },
};
</script>
