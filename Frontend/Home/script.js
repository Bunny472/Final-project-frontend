const authBtn=document.getElementById("login-btn");
if (sessionStorage.getItem("isAuth") === "true"){
    authBtn.classList.toggle("hidden")
}
