import { useSelector } from 'react-redux'

import { Start_side } from './start_side'
import { Start_menu_mid } from './start_menu_mid'
import "./start_menu.css"
import "./start_menu_side.css"
import "./start_menu_mid.css"



const Start_menu = () => {
    const start = useSelector(state => state.start_menu);

    return (
        <div
            className="start_menu"
            data-hide={start.hide}
			style={{ "--prefix": "START" }}
        >
            <Start_side />
			<Start_menu_mid />
        </div>
    )
 }


 export {Start_menu}