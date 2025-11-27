export default function authHeader() {
  const userId = sessionStorage.getItem("userId");
  const accessToken = sessionStorage.getItem("token");

  if (userId && accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else {
    return {};
  }
}
