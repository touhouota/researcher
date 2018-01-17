window.onload = function() {
	// user_idがあるかを確認
	if (!Base.get_cookie("user_id")) {
		// なければ、ログインページに飛ぶ
		window.location = "/b1013179/researcher";
	}

	let _template_button = document.getElementById("task_button_template");
	let template_button = document.importNode(_template_button.content, true);

	let my_areas = document.getElementsByClassName(Base.get_cookie("user_id"));
	let i = 0,
		length = my_areas.length;

	for (i = 1; i < length; i += 1) {
		button = template_button.cloneNode(true).querySelector("button");
		// console.log(button);

		button.addEventListener("click", Events.create_form);
		my_areas[i].querySelector(".plus").addEventListener("click", Events.progress_plus);
		my_areas[i].querySelector(".minus").addEventListener("click", Events.progress_minus);
		my_areas[i].appendChild(button);
	}

	// let task_forms = document.forms;
	// let form_num = task_forms.length;
	// for (i = 0; i < form_num; i += 1) {
	// 
	// }
}