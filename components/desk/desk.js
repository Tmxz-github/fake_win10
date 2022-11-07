import { useDispatch, useSelector } from "react-redux"
import "./desk.css"

const Desk = () => {
    const dispatch = useDispatch();
    const widgets = useSelector(state => state.widgets);
    const op_apps = useSelector(state => state.open_apps);
    
    const apps = widgets.apps.map((app) => {
        return (
            <li
                className="desk_icons"
                >
                <div
                    data-action="APP_OPEN"
                    data-name={app.name}
                    className={`desk_icon ${app.name}r_desk hover selected`}
                    data-selected={op_apps.select === app.name}
                >
                    <div
                        data-action="APP_OPEN"
                        data-name={app.name}
                        className={`${app.name}_desk_icon`}
                    ></div>
                    <span
                        data-action="APP_OPEN"
                        data-name={app.name}
                        className="calculator_desk_name"
                    >{app.name}</span>
                </div>
            </li>
        )
    });

    return (
        <div
            className="desk"
        >
            <ul>
                {apps}
            </ul>
            
        </div>
    )
}

export {Desk}




/* <div
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
        data-selected={op_apps.select === "draw"}
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
</div> */