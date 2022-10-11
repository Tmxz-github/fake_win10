import { useSelector } from "react-redux";
import { Notice } from "./notice";


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
    const get_time_s = () => {
        const date = new Date();
        return date.toLocaleTimeString
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
                                <input type="range" min="0" max="2" value ="1"></input>
                                <div
                                    className="power_mode_range_icons"
                                >
                                    <div>
                                        <div>1</div>
                                        <span>最长续航</span>
                                    </div>
                                    <div>
                                        <div>2</div>
                                        <span>最佳性能</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="power_setting"
                            >
                                <span>电池设置</span>
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
                        <div
                            className="time_info"
                            data-hide={task_bar.funcs_info !== "time"}
                            style={{ "--prefix": "FUNCS_INFO" }}
                        >
                            <div
                                className="calendar_container_top"
                            >
                                <div
                                    className="clock_calendar"
                                >{get_time_s()}</div>
                                <div
                                    className="date_calendar"
                                ></div>
                            </div>
                            <div
                                className="calendar"
                            ></div>
                        </div>
                    </li>
                    <Notice />
                </ul>
            </div>
        </div>
    )
}

export {Tasks_right}
