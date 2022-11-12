import { useSelector } from "react-redux"

const Start_menu_mid = () => {

    const apps = [["C",["calculator"]],["D",["draw"]],["M",["mine_sweeper"]]];
    const uls = apps.map((app) => {
        return (
            <ul key={app} className="app_initial_char">
                <span
                    className="start_hover"
                >{app[0]}</span>
                {app[1].map((app_name) => {
                    return (
                        <li
                            className="app_bar start_hover app"
                            data-action="APP_OPEN"
                            key={app_name}
                            data-name={app_name}
                        >
                            <div
                                className="app_icon"
                                data-action="APP_OPEN"
                                data-name={app_name}
                            >
                                <div
                                    className="icon"
                                    data-action="APP_OPEN"
                                    data-name={app_name}
                                    style={{
                                        backgroundImage:"url("+ require("../../img/"+app_name+".png") +")"
                                    }}
                                ></div>
                            </div>
                            <span
                                data-action="APP_OPEN"
                                data-name={app_name}
                            >{app_name}</span>
                        </li>
                    )
                })}
            </ul>
        )
    });
    return (
        <div className="start_menu_mid">
            {uls}
        </div>
    )
}

export {Start_menu_mid}
