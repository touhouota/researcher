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
            // console.log(search_query);
            // それぞれのformに情報を付加する
            form = document.querySelector(search_query);
            // console.log("TaskForm: ", form);
            form.minute.value = tasks[i].expected;
            form.querySelector(".progress").value = tasks[i].progress;
            form.memo.value = tasks[i].memo;
            form.plan_id.value = tasks[i].plan_id;

            // 進捗により、色分け
            Display.progress_to_color(form.parentElement, tasks[i].progress || 0);

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
