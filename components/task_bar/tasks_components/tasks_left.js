import { useSelector, useDispatch } from "react-redux";

const Tasks_left = () => {

    const open_apps = useSelector(state => state.open_apps);
    const task_bar = useSelector(state => state.task_bar);
    const dispatch = useDispatch();

    

    const apps = open_apps.apps.map((app) => {
        let name = app["name"].toLowerCase();
        let img_path = "";
        try{
            img_path = "url("+ require("../../../img/"+name+".png") +")";
        }
        catch{
            img_path = "url("+ require("../../../img/icons8-default-64.png") +")"
        }
        return (
            <li
                key={name}
                data-name={name}
                data-focus={app["focus"]}
                data-action="TOGGLE"
                data-g_action="APP_MIN"
                className="task task_hover"
            >
                <div
                    className="task_icon"
                    data-action={"TOGGLE"}
                    data-name={name}
                >
                    <div
                        className="icon"
                        data-action="TOGGLE"
                        data-name={name}
                        style={{
                            backgroundImage:img_path
                        }}
                    ></div>
                </div>
            </li>
        )
    });

    return (
        <div
            className="tasks_left"
        >
            <div
                className="fix_tasks"
            >
                <div
                    className="start_tasks_btn"
                >
                    <div
                        className="start_btn task task_hover"
                        data-action="START_TOOGLE"
                        onMouseEnter={() => {
                            dispatch({
                                type:"START_COLOR_TOGGLE",
                            });
                        }}
                        onMouseOut={() => {
                            dispatch({
                                type:"START_COLOR_TOGGLE",
                            });
                        }}
                    >
                        <svg data-hover={task_bar.hover} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path fill="#ffffff" d="M20 25.026L5.011 25 5.012 37.744 20 39.818zM22 25.03L22 40.095 42.995 43 43 25.066zM20 8.256L5 10.38 5.014 23 20 23zM22 7.973L22 23 42.995 23 42.995 5z"/></svg>
                        <svg data-hover={!task_bar.hover} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="20px" height="20px"><path fill="#00b0ff" d="M20 25.026L5.011 25 5.012 37.744 20 39.818zM22 25.03L22 40.095 42.995 43 43 25.066zM20 8.256L5 10.38 5.014 23 20 23zM22 7.973L22 23 42.995 23 42.995 5z"/></svg>
                    </div>
                {/* <div
                    className="tasks_btn task task_hover"
                >
                    tasks
                </div> */}
                </div>
            </div>
            <div
                className="apps"
            >
                <ul>
                    {apps}
                </ul>
            </div>
        </div>
    )
}

export {Tasks_left}

