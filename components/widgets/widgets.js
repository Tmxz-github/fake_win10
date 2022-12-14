import { useSelector, useDispatch } from "react-redux";
import "./widgets.css"



const Widget = (args) => {

    const op_apps = useSelector(state => state.open_apps);
    const widgets = useSelector(state => state.widgets);
    const dispatch = useDispatch();

    const app_name = args.app;
    const wg = widgets.apps.filter((app) => {
        return app["name"] === app_name;
    })[0] || widgets.default;

    const self = op_apps.apps.filter((app) => {
        return app.name === app_name;
    })[0] || {};

    const dispatch_click = (e) => {
        const key = e.target;
        dispatch({
            type: "TO_TOP",
            payload: app_name,
        });
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
    const drag_handle = (e, target) => {
        let x = e.pageX - target.dataset.offsetX;
        let y = e.pageY - target.dataset.offsetY;
        target.style.left = x + "px";
        target.style.top = y + "px";
    }
    let img_path = "";
    try{
        img_path = "url("+ require("../../img/"+app_name+".png") +")";
    }
    catch{
        img_path = "url("+ require("../../img/icons8-default-64.png") +")"
    }

    return (
        <div
            className={`app ${app_name} widget`}
            onClick={dispatch_click}
            data-open={wg.open}
            data-max={wg.max}
            data-top={self ? self.focus : ""}
        >
            <div
                className={`${app_name}_top_bar widget_top_bar`}
                onMouseDown={(e) => {
                    dispatch({
                        type: "TOP_MOUSE_DOWN",
                        payload: app_name,
                        e: e,
                    });
                }}
                onMouseUp={() => {
                    dispatch({
                        type: "TOP_MOUSE_UP",
                        payload: app_name
                    });
                }}
                onMouseOut={() => {
                    dispatch({
                        type: "TOP_MOUSE_UP",
                    });
                }}
                onMouseMove={self.moving ? (e) => {
                    drag_handle(e,e.target.closest(`.${app_name}`));
                } : null}
            >
                <div>
                    <div className="widget_icon">
                        <div
                            className="icon"
                            style={{
                                backgroundImage: img_path,
                            }}
                        ></div>
                    </div>
                </div>
                <div>
                    <ul className="widget_oper_bar">
                        <li
                            className="win_ctl min"
                            data-action="MIN"
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
                            ???
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


