
import { useSelector } from "react-redux"

const Notice = () => {

    const task_bar = useSelector(state => state.task_bar);
    const options = new Array(16).fill("option");
    const ops = options.map((op,i) => {
        return (
            <li
                className="option"
                key={i}
            >
                {op}
            </li>
        )
    });

    return (
        <li
            className="notice task_hover task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="notice_icon  icon_continer"
                data-action="FUNCS_INFO_TOOGLE"
            >
                <div
                    className="icon"
                    data-action="FUNCS_INFO_TOOGLE"
                ></div>
            </div>
            <div
                className="notice_info"
                data-hide={task_bar.funcs_info !== "notice"}
                style={{ "--prefix": "FUNCS_INFO" }}
            >
                <div
                    className="notice_top"
                >
                    <div
                        className="notice_manage"
                    >
                        <span>管理通知</span>
                    </div>
                    <div
                        className="notices"
                    >没有新通知</div>
                </div>
                <div
                    className="notice_bottom"
                >
                    <div
                        className="options_fold"
                    >
                        <span>折叠</span>
                        <span>清除所有通知</span>
                    </div>
                    <div
                        className="options_container"
                    >
                        <ul>
                            {ops}
                        </ul>
                    </div>
                    <input type="range"></input>
                </div>
            </div>
        </li>
    )
}

export {Notice}

