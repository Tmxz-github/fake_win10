
import { useSelector, useDispatch } from "react-redux"
import "./notice.css"

const Notice = () => {

    const task_bar = useSelector(state => state.task_bar);
    const dispatch = useDispatch();
    const dispatch_click = (e) => {
        dispatch({
            type: e.target.dataset.action,
        });
    }
    const options = task_bar.options_fold ? ["平板模式","网络","所有设置","飞行模式"] : 
                    ["平板模式","网络","所有设置","飞行模式","定位","专注助手","移动热点","夜间模式","VPN","节电模式",
                    "屏幕截图","投影","连接","亮度","就近共享","旋转锁定"];
    const ops =  options.map((op,i) => {
        return (
            <li
                className="option"
                key={i}
            >
                <div
                    className="option_icon"
                >
                    <div
                        className="icon"
                    ></div>
                </div>
                <span
                    className="option_text"
                >{op}</span>
            </li>
        )
    });

    return (
        <li
            className="notice left_task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="task_bar_left_task_content task_hover"
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
                    data-fold={task_bar.options_fold}
                >
                    <div
                        className="options_fold"
                    >
                        <span
                            className="fold"
                            data-action="OPTIONS_TOGGLE"
                            onClick={dispatch_click}
                        >折叠</span>
                    </div>
                    <div
                        className="options_container"
                        data-fold={task_bar.options_fold}
                    >
                        <ul>
                            {ops}
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    )
}

export {Notice}

