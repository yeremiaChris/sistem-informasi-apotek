export default function (context) {
  context.$axios.onError((err) => {
    console.log(err.response);
    if (
      err.response.status === 403 &&
      err.response.statusText === "Forbidden"
    ) {
      context.$auth.strategy.token.reset();
      context.redirect("/login");
      window.location.reload();
    }
  });
  if (!context.$auth.loggedIn) {
    context.redirect("/login");
  }
  return true;
}
