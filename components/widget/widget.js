import { useSelector, useDispatch } from "react-redux";
import "./widget.css"



const Widget = (args) => {

    const op_apps = useSelector(state => state.open_apps);
    const widget = useSelector(state => state.widget);
    const dispatch = useDispatch();

    const app_name = args.app;

    const self = op_apps.apps.filter((app) => {
        return app["name"] === app_name;
    })[0];

    const dispatch_click = (e) => {
        const key = e.target;
        if(key.classList[0] === "win_ctl"){
            dispatch({
                type:key.dataset.action || "",
            });
            dispatch({
                type:key.dataset.g_action || "",
                payload:key.dataset.name || "",
            });
            return;
        }
    }
    const drag_handle = (e,target) => {
        let x = e.pageX - target.dataset.offsetX;
        let y = e.pageY - target.dataset.offsetY;
        target.style.left = x + "px";
        target.style.top = y + "px";
    }

    return (
        <div
            className={`app ${app_name}`}
            onClick={dispatch_click}
            data-hide={widget.hide}
            data-max={widget.max}
            data-top={self ? self.active : ""}
        >
            <div
                className="widget_top_bar"
                onMouseDown={(e) => {
                    dispatch({
                        type: "TOP_MOUSE_DOWN",
                        payload: e,
                        app: app_name
                    });
                }}
                onMouseUp={() => {
                    dispatch({
                        type: "TOP_MOUSE_UP",
                        app: app_name
                    });
                }}
                onMouseOut={() => {
                    dispatch({
                        type: "TOP_MOUSE_UP",
                    });
                }}
                onMouseMove={op_apps.active_app === app_name ? (e) => {
                    drag_handle(e,e.target.closest(`.${app_name}`));
                } : null}
            >
                <div>
                    <div className="widget_icon">W</div>
                </div>
                <div>
                    <ul className="widget_oper_bar">
                        <li
                            className="win_ctl min"
                            data-action="CLOSE"
                            data-g_action="APP_MIN"
                            data-name={app_name}
                        >
                            -
                        </li>
                        <li
                            className="win_ctl max"
                            data-action="MAX_TOGGLE"
                        >
                            口
                        </li>
                        <li
                            className="win_ctl close"
                            data-action="CLOSE"
                            data-g_action="APP_CLOSE"
                            data-name={app_name}
                        >
                            X
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export {Widget}


