import { useSelector } from "react-redux";
import { Notice } from "./notice/notice";
import { Battery } from "./battery/battery";
import { Time } from "./time/time";


const Tasks_right = () => {

    
    const task_bar = useSelector(state => state.task_bar);
    

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
                    <Battery />
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
                    <Time />
                    <Notice />
                </ul>
            </div>
        </div>
    )
}

export {Tasks_right}
