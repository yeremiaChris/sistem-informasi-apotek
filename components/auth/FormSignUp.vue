<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="signUp">
        <p v-if="errorBackend" class="text-red-500">{{ errorBackend }}</p>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div class="mt-1">
            <input
              v-model="name"
              id="name"
              name="name"
              type="name"
              autocomplete="name"
              required=""
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

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
            @click="signUp"
            :disabled="disabled"
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
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
      name: "",
      email: "",
      password: "",
      errorBackend: "",
    };
  },
  watch: {
    "$data.name"() {
      this.errorBackend = "";
    },
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
    async signUp() {
      try {
        const { name, email, password } = this.$data;
        const data = {
          name,
          email,
          password,
        };
        await this.$axios.post("/auth/register", data);
        this.$router.push("/login");
      } catch (err) {
        this.errorBackend = err.response.data.message;
        console.log(err.response);
      }
    },
  },
};
</script>
