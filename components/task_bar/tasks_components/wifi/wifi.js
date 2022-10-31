import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import "./wifi.css"


const Wifi = () => {
    const task_bar = useSelector(state => state.task_bar);
    const dispatch = useDispatch();


    return (
        <li
            className="wifi task"
            data-action="FUNCS_INFO_TOOGLE"
        >
            <div
                className="task_bar_task_content task_hover"
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
                >
                    <span>重新打开 Wi-Fi</span>
                    <select>
                        <option>手动</option>
                    </select>
                </div>
                <div
                    className="wifi_info_net_setting"
                >
                    <span>网络和Internet设置</span>
                    <span>更改设置,例如将某链接设置为按流量计费.</span>
                </div>
                <div
                    className="wifi_info_bottom"
                >
                    <ul>
                        <li>WLAN</li>
                        <li>飞行模式</li>
                        <li>移动热点</li>
                    </ul>
                </div>
            </div>
        </li>
    )
}


export {Wifi}

