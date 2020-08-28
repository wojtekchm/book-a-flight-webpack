import usersList from "./../data/users.json";

const loginForm = document.querySelector("#loginForm form");
const loginFormWrap = document.querySelector("#loginForm");
const loggedUserName = document.getElementById("loggedUser");

const { users } = usersList;

if (loginForm) {
  const submitBtn = loginForm.querySelector("button");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const emailValue = loginForm.querySelector("#email").value;
    const passwordValue = loginForm.querySelector("#password").value;

    users.forEach((user) => {
      const { email, password, token, name, subName } = user;
      if (email === emailValue && password === passwordValue) {
        sessionStorage.setItem("token", token);
        loggedUserName.textContent = `${name} ${subName}`;
        loginCheck();
      }
    });
  });
}

const loginCheck = () => {
  const loginToken = sessionStorage.getItem("token");
  if (loginToken) {
    users.forEach((user) => {
      const { token, name, subName } = user;
      if (loginToken === token) {
        const logOutBtn = document.getElementById("logoutBtn");
        loggedUserName.textContent = `${name} ${subName}`;

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
