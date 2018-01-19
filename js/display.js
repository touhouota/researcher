let Display = {
    at: function(element) {
        element.classList.remove("hide");
    },

    hide_element: function(element) {
        element.classList.add("hide");
    },

    progress_to_color: function(change_area, progress) {
        console.log("change_area:", change_area, progress);
        // 一旦、付いている色に関するクラスを取り除く
        change_area.classList.remove("todo", "doing_first", "doing_second", "done");
        switch (progress.toString()) {
            case "0":
                change_area.classList.add("todo");
                break;
            case "20":
            case "40":
                change_area.classList.add("doing_first");
                break;
            case "60":
            case "80":
                change_area.classList.add("doing_second");
                break;
            case "100":
                change_area.classList.add("done");
                break;
        }
    },
};
