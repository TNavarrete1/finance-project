const form = document.querySelector("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: email.value, password: password.value }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.status === 400 || res.status === 401) {
      window.alert(`${data.message}. ${data.error ? data.error : ""}`);
      return;
    }
    data.role === "Admin"
      ? location.assign("/admin")
      : location.assign("/basic");
  } catch (error) {
    console.log(error);
  }
});
