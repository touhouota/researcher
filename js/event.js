let Events = {
	create_form: function(event) {
		let button = Base.parents(event.target, "add_task");
		button.classList.add("hide");

		let _template = document.getElementById("form_template");
		let template = document.importNode(_template.content, true);
		console.log("create_form");

		// 作ったものに対して、イベントを追加する
		Events.setting_progress_event(template);

		let target_area = Base.parents(event.target, Base.get_cookie("user_id"));
		target_area.appendChild(template);

		let query = [
			"cmd=append_task",
			"&user_id=" + Base.get_cookie("user_id"),
			"&task=" + target_area.dataset.task,
		].join("");

		// 
		Base.create_request("POST", Base.request_path, function() {
			let response = JSON.parse(this.responseText);
			console.table(response);
		}).send(query);
	},

	progress_plus: function(event) {
		let button = Base.parents(event.target, "plus");
		let form = Base.parents(button.parentElement, "task_form");
		let progress = form.querySelector(".progress");

		let value = Number(progress.value);
		console.log(progress);
		if (value < 100) {
			value += 20;
		}

		// 値を指定する
		progress.value = value;
	},

	progress_minus: function(event) {
		let button = Base.parents(event.target, 'minus');
		let form = Base.parents(button.parentElement, "task_form");
		let progress = form.querySelector(".progress");

		let value = Number(progress.value);
		if (0 < value) {
			value -= 20;
		}

		console.log(value);

		// 値の指定
		progress.value = value;
	},

	setting_progress_event: function(form) {
		form.querySelector(".plus").addEventListener("click", Events.progress_plus);
		form.querySelector(".minus").addEventListener("click", Events.progress_minus);
	},
};