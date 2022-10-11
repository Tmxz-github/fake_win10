import { useSelector, useDispatch } from "react-redux"

const Start_menu_mid = () => {

    const apps = ["b","c","d","g"];
    const uls = apps.map((app) => {
        return (
            <ul key={app} className="char_select">{app}</ul>
        )
    });
    return (
        <div className="start_menu_mid">
            {uls}
        </div>
    )
}

export {Start_menu_mid}
