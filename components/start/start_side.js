import { useSelector } from "react-redux"

const Start_side = () => {

    const start_menu = useSelector(state => state.start_menu);
    const start_side = useSelector(state => state.start_side);
    const start_side_power = useSelector(state => state.start_side_power);
    const start_side_user = useSelector(state => state.start_side_user);



    return (
        <div
            className="start_side"
            data-hide={(start_side.hide || start_menu.hide)}
            data-action="SIDE_SHOW"
        >
            <div
                className="start_side_top"
            >
                <div
                    className="start_side_open side_option start_hover"
                    data-action="SIDE_TOGGLE"
                    data-hide={(start_side.hide || start_menu.hide)}
                >
                    <div
                        className="side_icon open_icon"
                        data-action="SIDE_TOGGLE"
                        >
                            <div
                                className="icon"
                                data-action="SIDE_TOGGLE"
                            ></div>
                    </div>
                    <span
                        className="start_side_text"
                        data-action="SIDE_TOGGLE"
                    >开始</span>
                </div>
            </div>
            <div
                className="start_side_bottom"
            >
                <div
                    className="start_side_user side_option start_hover"
                    data-action="SIDE_USER_TOGGLE"
                    data-hide={(start_side.hide || start_menu.hide)}
                >
                    <div
                        className="side_icon user_icon"
                        data-action="SIDE_USER_TOGGLE"
                    >
                        <div
                            className="icon"
                            data-action="SIDE_USER_TOGGLE"
                        ></div>
                    </div>
                    <ul
                        className="start_side_user_setting"
                        data-hide={(start_side_user.hide || start_menu.hide)}
                        data-action="SIDE_USER_KEEP"
                    >
                        <li
                            className="start_hover"
                        >更改账户信息</li>
                        <li
                            className="start_hover"
                        >锁定</li>
                        <li
                            className="start_hover"
                        >注销</li>
                    </ul>
                    <span
                        className="start_side_text"
                        data-action="SIDE_USER_TOGGLE"
                    >用户</span>
                </div>
                <div
                    className="start_side_setting side_option start_hover"
                    data-hide={(start_side.hide || start_menu.hide)}
                >
                    <div
                        className="side_icon setting_icon"
                    >
                        <div
                            className="icon"
                        ></div>
                    </div>
                    <span
                        className="start_side_text"
                    >设置</span>
                </div>
                <div
                    className="start_side_power side_option start_hover"
                    data-hide={(start_side.hide || start_menu.hide)}
                    data-action="SIDE_POWER_TOGGLE"
                >
                    <div
                        className="side_icon power_icon"
                        data-action="SIDE_POWER_TOGGLE"
                    >
                        <div
                            className="icon"
                            data-action="SIDE_POWER_TOGGLE"
                        ></div>
                    </div>
                    <ul
                        className="start_side_power_setting"
                        data-hide={(start_side_power.hide || start_menu.hide)}
                        data-action="SIDE_POWER_KEEP"
                    >
                        <li
                            className="start_hover"
                        >
                            睡眠
                        </li>
                        <li
                            className="start_hover"
                        >
                            关机
                        </li>
                        <li
                            className="start_hover"
                        >
                            重启
                        </li>
                    </ul>
                    <span
                        className="start_side_text"
                        data-action="SIDE_POWER_TOGGLE"
                    >电源</span>
                </div>
            </div>
        </div>
    )
}

export {Start_side}
