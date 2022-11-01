import { useSelector } from "react-redux";
import { Notice } from "./notice/notice";
import { Battery } from "./battery/battery";
import { Time } from "./time/time";
import { Wifi } from "./wifi/wifi";


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
                        className="show_invisible task_hover"
                        data-action="FUNCS_INFO_TOOGLE"
                        data-name="show_invisible"
                    >^</li>
                    <Battery />
                    <Wifi />
                    <li
                        className="volume task_hover"
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
                        data-name="keyboard"
                    >
                        <div
                            className="task_bar_task_content"
                        >
                            ENG
                        </div>
                    </li>
                    <Time />
                    <Notice />
                </ul>
            </div>
        </div>
    )
}

export {Tasks_right}
