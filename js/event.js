let Events = {
    create_form: function(event) {
        let target_area = Base.parents(event.target, Base.get_cookie("user_id"));
        let form = target_area.querySelector(".task_form");
        // タスクformを表示
        Display.at(form);
        // 「やるぞ」ボタンの非表示
        Display.hide_element(target_area.querySelector(".add_task"));

        let query = [
            "cmd=start_task",
            "&user_id=" + Base.get_cookie("user_id"),
            "&plan_id=" + form.plan_id.value,
        ].join("");

        // 
        Base.create_request("POST", Base.request_path, function() {
            let response = JSON.parse(this.responseText);
            console.table(response);
            // 目的のタスクを探すクエリー
            let search_query;
            if (response.ok) {
                // querySelector(".bxxxxxxx[data-task='hoge']")のような形の文字列を作る
                search_query = [
                    ".",
                    response.data.user_id,
                    "[data-task='", response.data.task, "']"
                ].join("");
                console.log(search_query);
                Display.icon_change(document.querySelector(search_query), "succ");
            } else {
                search_query = [
                    ".",
                    response.input.user_id,
                    "[data-task='" + response.input.task + "']",
                ].join("");
                Display.icon_change(document.querySelector(search_query), "fail");
            }
        }).send(query);

        // タスクの状態をloadingにする
        Display.icon_change(target_area, "loading");
    },

    form_change: function(event) {
        console.log("form_change: ", event.target.value);
        let form = Base.parents(event.target, "task_form");
        let formdata = new FormData(form);
        formdata.append("progress", form.querySelector(".progress").value);

        Events.send_task_info(formdata);
        // 読み込み中にする
        Display.icon_change(form.parentElement, "loading");
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

        // 更新をサーバへ送る
        let formdata = new FormData(form);
        formdata.append("progress", value);
        Events.send_task_info(formdata);
        // 読み込み中にする
        Display.icon_change(form.parentElement, "loading");

        // 色を変更
        Display.progress_to_color(form.parentElement, value);
    },

    progress_minus: function(event) {
        let button = Base.parents(event.target, 'minus');
        let form = Base.parents(button.parentElement, "task_form");
        let progress = form.querySelector(".progress");

        let value = Number(progress.value);
        if (0 < value) {
            value -= 20;
        }

        // 値の指定
        progress.value = value;

        // 更新をサーバへ送る
        let formdata = new FormData(form);
        formdata.append("progress", value);
        Events.send_task_info(formdata);
        // 読み込み中にする
        Display.icon_change(form.parentElement, "loading");

        // 色を変更
        Display.progress_to_color(form.parentElement, value);
    },

    // 変更をサーバへ送る
    // input: {cmd=xxxx, user_id=xxxx, plan_id=xxxx}
    send_task_info: function(formdata) {
        formdata.append("cmd", "task_modify");
        formdata.append("user_id", Base.get_cookie("user_id"));

        Base.create_request("POST", Base.request_path, function() {
            let response = JSON.parse(this.responseText);
            if (response.ok) {
                let task_data = response.data;
                let search_query = [
                    "input[value='",
                    task_data.plan_id,
                    "']",
                ].join("");
                let form = Base.parents(document.querySelector(search_query), "task_form");
                console.log(form);
                form.minute.value = task_data.expected;
                form.querySelector(".progress").value = task_data.progress;
                form.memo.value = task_data.memo;

                // 状態を更新
                Display.icon_change(form.parentElement, "succ");
            } else {
                // エラーの時は、入力したタスク情報からセルを特定
                let search_query = [
                    ".",
                    response.input.user_id,
                    "[data-task='" + response.input.task + "']",
                ].join("");
                Display.icon_change(document.querySelector(search_query), "fail");
            }
        }).send(formdata);
    },
}