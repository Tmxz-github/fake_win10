import { useDispatch, useSelector } from "react-redux"
import "./desk.css"

const Desk = () => {
    const dispatch = useDispatch();
	const op_apps = useSelector(state => state.open_apps);

    return (
        <div
            className="desk"
        >
            <div
                className="desk_icons"
                >
                <div
                    data-action="APP_OPEN"
                    data-name="calculator"
                    className="desk_icon calculator_desk hover selected"
                    data-selected={op_apps.select === "calculator"}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name="calculator"
                        className="calculator_desk_icon"
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name="calculator"
                        className="calculator_desk_name"
                    >计算器</span>
                </div>
                <div
                    data-action="APP_OPEN"
                    data-name="draw"
                    className="desk_icon draw_desk hover selected"
                    data-selected={op_apps.select === "DRAW"}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name="draw"
                        className="draw_desk_icon"
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name="draw"
                        className="draw_desk_name"
                    >画图</span>
                </div>
            </div>
            
        </div>
    )
}

export {Desk}