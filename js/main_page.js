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
		console.table(response);

		let tasks = response.data;
		let i = 0,
			size = tasks.length;
		let search_query, form;
		console.log(size);
		for (i = 0; i < size; i += 1) {
			search_query = [
				".",
				tasks[i].user_id,
				"[data-task=", tasks[i].task, "]",
				" > .task_form"
			].join("");
			// それぞれのformに情報を付加する
			form = document.querySelector(search_query);
			form.minute.value = tasks[i].expected;
			form.querySelector(".progress").value = tasks[i].progress;
			form.memo.value = tasks[i].memo;
			form.plan_id.value = tasks[i].plan_id;

			// もし、自分のタスクに何らかの情報があれば、「やるぞ！」ボタンを非表示にする
			if (tasks[i].user_id === Base.get_cookie("user_id") && tasks[i].start) {
				// formを表示
				Display.at(form);
				// ボタンを非表示
				Display.hide_element(form.parentElement.querySelector(".add_task"));
			}
		}
	}).send(null);
}