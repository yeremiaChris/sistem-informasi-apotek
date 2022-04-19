// import jwtDecode from 'jwt-decode'
export default function ({ $cookies, $dayjs, $axios, app, store }) {
  console.log($axios);
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
  $axios.onError(() => {
    const payload = {
      props: "isRequesting",
      value: false,
    };
    store.commit("setProps", payload);
  });
}
