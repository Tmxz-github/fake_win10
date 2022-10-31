import { useSelector, useDispatch } from "react-redux";
import "./widgets.css"



const Widget = (args) => {

    const op_apps = useSelector(state => state.open_apps);
    const widgets = useSelector(state => state.widgets);
    const dispatch = useDispatch();

    const app_name = args.app;
    const wg = widgets.apps.filter((app) => {
        if(app["name"] === app_name) return app;
    })[0];

    const self = op_apps.apps.filter((app) => {
        return app["name"] === app_name;
    })[0];

    const dispatch_click = (e) => {
        const key = e.target;
        if(key.classList[0] === "win_ctl"){
            dispatch({
                type:key.dataset.action || "",
                payload:key.dataset.name || "",
            });
            dispatch({
                type:key.dataset.g_action || "",
                payload:key.dataset.name || "",
            });
            return;
        }
        if(args.dispatch_click)args.dispatch_click(e);
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
            data-hide={wg.hide}
            data-max={wg.max}
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
                            data-name={app_name}
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
            {args.info}
        </div>
    )
}

export {Widget}


