import { useSelector, useDispatch } from "react-redux"

const Start_side = () => {

    const start_menu = useSelector(state => state.start_menu);
    const start_side = useSelector(state => state.start_side);
    const start_side_power = useSelector(state => state.start_side_power);
    const start_side_user = useSelector(state => state.start_side_user);

    const dispatch = useDispatch();

    const dispatch_click = (e) => {
        let action = {
            type:e.target.dataset.action,
        }
        if(action.type){
            dispatch(action);
        }
    }

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
                    className="start_side_open side_option"
                    data-action="SIDE_TOGGLE"
                    onClick={dispatch_click}
                >open</div>
            </div>
            <div
                className="start_side_bottom"
            >
                <div
                    className="start_side_user side_option"
                    data-action="SIDE_USER_TOGGLE"
                    onClick={dispatch_click}
                >user
                    <ul
                        className="start_side_user_setting"
                        data-hide={(start_side_user.hide || start_menu.hide)}
                        data-action="SIDE_USER_KEEP"
                    >
                        <li>更改账户信息</li>
                        <li>锁定</li>
                        <li>注销</li>
                    </ul>
                </div>
                <div
                    className="start_side_setting side_option"
                >setting</div>
                <div
                    className="start_side_power side_option"
                    data-action="SIDE_POWER_TOGGLE"
                    onClick={dispatch_click}
                >power
                    <ul
                        className="start_side_power_setting"
                        data-hide={(start_side_power.hide || start_menu.hide)}
                        data-action="SIDE_POWER_KEEP"
                    >
                        <li>
                            睡眠
                        </li>
                        <li>
                            关机
                        </li>
                        <li>
                            重启
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {Start_side}
