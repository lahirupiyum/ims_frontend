export const handleLogoutIfUnauthorized = (err: any) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      }
}