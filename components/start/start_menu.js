import { useSelector, useDispatch } from 'react-redux'

import { Start_side } from './start_side'
import { Start_menu_mid } from './start_menu_mid'
import "./start_menu.css"
import "./start_menu_side.css"
import "./start_menu_mid.css"
import "./start_menu_effect.css"



const Start_menu = () => {
    const start = useSelector(state => state.start_menu);
    const dispatch = useDispatch();
    const dispatch_click = (e) => {
        const action = e.target.dataset.action || "";
        const name = e.target.dataset.name || "";
        dispatch({
            type:"TO_TOP",
            payload:name,
        });
        dispatch({
            type:name+"_OPEN",
        });
        dispatch({
            type:action,
            payload:name,
        });
        if(e.target.closest(".app")){
            dispatch({
                type:"START_HIDE"
            });
        }
    }

    return (
        <div
            className="start_menu"
            data-hide={start.hide}
			style={{ "--prefix": "START" }}
            onClick={dispatch_click}
        >
            <Start_side />
			<Start_menu_mid />
        </div>
    )
 }


 export {Start_menu}