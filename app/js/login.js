import usersList from "./../data/users.json";

const loginForm = document.querySelector("#loginForm form");
const loginFormWrap = document.querySelector("#loginForm");

const { users } = usersList;

if (loginForm) {
  const submitBtn = loginForm.querySelector("button");

  console.log(users);

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = loginForm.querySelector("#email").value;
    const passwordValue = loginForm.querySelector("#password").value;

    users.forEach((user) => {
      const { email, password, token } = user;
      if (email === emailValue && password === passwordValue) {
        sessionStorage.setItem("token", token);
        loginCheck();
      }
    });
  });
}

const loginCheck = () => {
  const loginToken = sessionStorage.getItem("token");
  if (loginToken) {
    users.forEach((user) => {
      const { token } = user;
      if (loginToken === token) {
        const logOutBtn = document.getElementById("logoutBtn");
        logOutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          sessionStorage.removeItem("token");
          loginCheck();
        });
        if (loginFormWrap) {
          loginFormWrap.style.opacity = "0";

          setTimeout(() => {
            loginFormWrap.style.display = "none";
          }, 150);
        }
      }
    });
  } else {
    loginFormWrap.style.display = "flex";
    setTimeout(() => {
      loginFormWrap.style.opacity = "1";
    }, 550);
  }
};

loginCheck();
