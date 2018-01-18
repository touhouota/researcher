let TaskForm = {
	insert_info: function(tasks) {
		let i = 0,
			size = tasks.length;
		let search_query, form;
		for (i = 0; i < size; i += 1) {
			search_query = [
				".",
				tasks[i].user_id,
				"[data-task='", tasks[i].task, "']",
				" > .task_form"
			].join("");
			// それぞれのformに情報を付加する
			console.log(search_query);
			form = document.querySelector(search_query);
			console.log("TaskForm: ", form);
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
	}
};