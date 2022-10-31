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
                    data-name="CALCULATOR"
                    className="desk_icon calculator_desk hover selected"
                    data-selected={op_apps.select === "CALCULATOR"}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name="CALCULATOR"
                        className="calculator_desk_icon"
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name="CALCULATOR"
                        className="calculator_desk_name"
                    >计算器</span>
                </div>
                <div
                    data-action="APP_OPEN"
                    data-name="DRAW"
                    className="desk_icon draw_desk hover selected"
                    data-selected={op_apps.select === "DRAW"}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name="DRAW"
                        className="draw_desk_icon"
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name="DRAW"
                        className="draw_desk_name"
                    >画图</span>
                </div>
                <div
                    data-action="APP_OPEN"
                    data-name="WIDGET"
                    className=" hover selected"
                    data-selected={op_apps.select === "WIDGET"}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name="WIDGET"
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name="WIDGET"
                    >widget</span>
                </div>
            </div>
            
        </div>
    )
}

export {Desk}