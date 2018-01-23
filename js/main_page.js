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

    let _status_template = document.getElementById("ajaxinfo_template");
    let status_template = document.importNode(_status_template.content, true);
    let icon;
    for (i = 0; i < length; i += 1) {
        // formがなければ、そこは無視スべき場所
        let form = my_areas[i].querySelector(".task_form");
        if (form === null) {
            continue;
        }

        button = template_button.cloneNode(true).querySelector("button");
        // console.log(button);

        button.addEventListener("click", Events.create_form);
        my_areas[i].appendChild(button);

        // 状態を表すアイコンを設置
        icon = status_template.cloneNode(true);
        my_areas[i].appendChild(icon);

        // 進捗更新ボタンのイベントを定義
        my_areas[i].querySelector(".plus").addEventListener("click", Events.progress_plus);
        my_areas[i].querySelector(".minus").addEventListener("click", Events.progress_minus);

        // 入力欄に、変化がある場合サーバへ送るようにイベントを追加
        event_targets = my_areas[i].querySelectorAll("input[type=number], textarea");
        for (j = 0, target_size = event_targets.length; j < target_size; j += 1) {
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
