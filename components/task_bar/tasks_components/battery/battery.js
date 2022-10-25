
import { useSelector } from "react-redux"
import "./battery.css"

const Battery = () => {


    const task_bar = useSelector(state => state.task_bar);
    
    return (
        <li
            className="battery task_hover task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="task_bar_left_task_content"
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
    )
}

export {Battery}
