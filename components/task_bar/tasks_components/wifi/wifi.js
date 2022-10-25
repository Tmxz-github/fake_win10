import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import "./wifi.css"


const Wifi = () => {
    const task_bar = useSelector(state => state.task_bar);
    const dispatch = useDispatch();


    return (
        <li
            className="wifi left_task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="task_bar_left_task_content task_hover"
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
            <div
                className="wifi_info"
                data-hide={task_bar.funcs_info !== "wifi"}
                style={{ "--prefix": "FUNCS_INFO" }}
            >
                <div
                    className="wifi_info_top"
                >
                    <div
                        className="wifi_info_top_left"
                    >
                        <div
                            className="wifi_info_icon"
                        >
                            <div
                                className="icon"
                                data-action="FUNCS_INFO_TOOGLE"
                            ></div>
                        </div>
                    </div>
                    <div
                        className="wifi_info_top_right"
                    >
                        <span>WLAN</span>
                        <span>已关闭</span>
                    </div>
                </div>
                <div
                    className="wifi_reopen_select"
                ></div>
                <div
                    className="wifi_info_net_setting"
                ></div>
                <div
                    className="wifi_info_bottom"
                ></div>
            </div>
        </li>
    )
}


export {Wifi}

