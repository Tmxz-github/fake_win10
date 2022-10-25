import { useDispatch, useSelector } from "react-redux";

import { Tasks_right } from "./tasks_components/tasks_right";
import { Tasks_left } from "./tasks_components/tasks_left";

import "./task_bar.css"
// import "./tasks_components/battery/battery.css"
// import "./tasks_components/notice.css"
import "./task_bar_effect.css"

const Task_bar = () => {
    const dispatch = useDispatch();

    const dispatch_click = (e) => {
        let action_type = getComputedStyle(e.target).getPropertyValue(
			"--prefix"
		);
        if(action_type === "FUNCS_INFO") return;
        dispatch({
            type:e.target.dataset.action || "",
            payload:e.target.closest(".left_task").classList[0] || "",
        });
        dispatch({
            type:e.target.dataset.g_action || "",
            payload:e.target.dataset.name || "",
        });
    }

    return (
        <div
            className="task_bar"
            onClick={dispatch_click}
        >
            <Tasks_left />
            <Tasks_right />
        </div>
    )
}

export {Task_bar}