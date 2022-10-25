import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import "./wifi.css"


const Wifi = () => {



    return (
        <li
            className="wifi task_hover task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="task_bar_left_task_content"
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
            </div>
        </li>
    )
}


export {Wifi}

