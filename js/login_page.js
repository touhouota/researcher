window.onload = function() {
	let button = document.getElementById("login_button");
	button.addEventListener("click", Login.check_account);

	if (Base.get_cookie("user_id")) {
		window.location = "/b1013179/researcher/main.html";
	}
}