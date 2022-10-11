import { useSelector } from "react-redux";

const Tasks_right = () => {

    
    const task_bar = useSelector(state => state.task_bar);
    
    const get_time = () => {
        const date = new Date();
        let h = date.getHours();
        h = h < 10 ? "0"+h : ""+h;
        let m = date.getMinutes();
        m = m < 10 ? "0"+m : ""+m;
        return h+":"+m;
    }
    const get_date = () => {
        const date = new Date();
        return date.toLocaleDateString();
    }

    return (
        <div
            className="tasks_right"
        >
            <div
                className="funcs"
            >
                <ul>
                    <li
                        className="show_invisible task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >^</li>
                    <li
                        className="battery task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >
                        <div
                            className="battery_icon icon_continer"
                            data-action="FUNCS_INFO_TOOGLE"
                        >
                            <div
                                className="icon"
                                data-action="FUNCS_INFO_TOOGLE"
                            ></div>
                        </div>
                        <div
                            className="battery_info"
                            data-hide={task_bar.funcs_info !== "battery"}
                            style={{ "--prefix": "FUNCS_INFO" }}
                        >
                            <div
                                className="battery_state"
                            >
                                <div
                                    className="battery_icon_big"
                                >
                                    <div
                                        className="icon"
                                    ></div>
                                </div>
                                <div
                                    className="battery_precent"
                                >100%</div>
                                <div
                                    className="battery_full"
                                >电池已充满</div>
                            </div>
                            <div
                                className="power_mode"
                            >
                                <span>电源模式(已接通电源)：更好的性能</span>
                            </div>
                            <div
                                className="power_setting"
                            >
                                <a>电池设置</a>
                            </div>
                        </div>
                    </li>
                    <li
                        className="wifi task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >
                        <div
                            className="wifi_icon icon_continer"
                            data-action="FUNCS_INFO_TOOGLE"
                        >
                            <div
                                className="icon"
                                data-action="FUNCS_INFO_TOOGLE"
                            ></div>
                        </div>
                    </li>
                    <li
                        className="volume task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >
                        <div
                            className="volume_icon icon_continer"
                            data-action="FUNCS_INFO_TOOGLE"
                        >
                            <div
                                className="icon"
                                data-action="FUNCS_INFO_TOOGLE"
                            ></div>
                        </div>
                    </li>
                    <li
                        className="keyboard task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >
                        ENG
                    </li>
                    <li
                        className="time task_hover task"
                        data-action="FUNCS_INFO_TOOGLE"
                    >
                        <div
                            className="clock"
                            data-action="FUNCS_INFO_TOOGLE"
                        >{get_time()}</div>
                        <div
                            className="date"
                            data-action="FUNCS_INFO_TOOGLE"
                        >{get_date()}</div>
                    </li>
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
                    </li>
                </ul>
            </div>
        </div>
    )
}

export {Tasks_right}
