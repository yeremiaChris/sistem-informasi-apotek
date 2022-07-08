// import jwtDecode from 'jwt-decode'
export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    const payload = {
      props: "isRequesting",
      value: true,
    };

    store.commit("setProps", payload);
  });

  $axios.onResponse((config) => {
    const payload = {
      props: "isRequesting",
      value: false,
    };

    store.commit("setProps", payload);
  });

  $axios.onError((err) => {
    const payload = {
      props: "isRequesting",
      value: false,
    };
    // if (err.response.data === "Access denied") {
    //   redirect("/login");
    // }
    store.commit("setProps", payload);
  });
}
