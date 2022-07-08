export default function ({ store, app, redirect }) {
  if (app.$auth.loggedIn) {
    return redirect("/");
  }

  return true;
}
