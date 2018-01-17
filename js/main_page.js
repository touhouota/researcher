window.onload = function() {
	// user_idがあるかを確認
	if (!Base.get_cookie("user_id")) {
		// なければ、ログインページに飛ぶ
		window.location = "/b1013179/researcher";
	}

	let _template_button = document.getElementById("task_button_template");
	let template_button;

	let my_areas = document.getElementsByClassName(Base.get_cookie("user_id"));
	let i = 0,
		length = my_areas.length;

	for (i = 1; i < length; i += 1) {
		// 0の時は無視
		// if (i === 0) continue;

		template_button = document.importNode(_template_button.content, true);
		template_button = template_button.querySelector("button");

		template_button.addEventListener("click", Events.create_form);
		my_areas[i].appendChild(template_button);
	}
}