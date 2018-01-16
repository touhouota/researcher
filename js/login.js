let Login = {
	check_account: function(event) {
		let form = Base.parents(event.target, "form");
		let query = [
			"?cmd=check_account",
			"&user_id=" + form.user_id.value,
		].join("");

		Base.create_request("GET", Base.request_path + query, function() {
			let response = JSON.parse(this.responseText);
			console.log(response);

			if (response.ok) {
				document.cookie = "user_id=" + response.data.user_id;
				document.cookie = "name=" + response.data.name;
				window.location = "/b1013179/researcher/main.html";
			} else {
				alert("ユーザが見つかりません。\n入力を確認してください。");
			}
		}).send(null);
	},
}