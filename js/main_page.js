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
	let event_targets, j = 0,
		target_size;

	for (i = 1; i < length; i += 1) {
		button = template_button.cloneNode(true).querySelector("button");
		// console.log(button);

		button.addEventListener("click", Events.create_form);
		my_areas[i].appendChild(button);

		// 進捗更新ボタンのイベントを定義
		my_areas[i].querySelector(".plus").addEventListener("click", Events.progress_plus);
		my_areas[i].querySelector(".minus").addEventListener("click", Events.progress_minus);

		event_targets = my_areas[i].querySelectorAll("input[type=number], textarea");
		for (j = 0, target_size = event_targets.length; j < target_size; j += 1) {
			console.log(event_targets[i]);
			event_targets[j].addEventListener("change", Events.form_change);
		}
	}

	// タスクの情報を取得する
	let query = "?cmd=get_task";
	Base.create_request("GET", Base.request_path + query, function() {
		let response = JSON.parse(this.responseText);
		console.table(response.data);
		if (response.ok) {
			TaskForm.insert_info(response.data);
		}
	}).send(null);
}