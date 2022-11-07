import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Widget } from "../../widgets/widgets";
import { Mine_area } from "./mine_area";

import "./mine_sweeper.css"



const Mine_sweeper = () => {


    const content = (
        <div
            className="content"
        >        
            <div
                className="mine_sweeper_tool_bar"
            >game</div>
            <div
                className="mine_sweeper_game"
            >
                <div
                    className="mine_sweeper_game_area"
                >
                    <div
                        className="mine_sweeper_status"
                    >
                        000
                    </div>
                    <div className="mid_bar"></div>
                    <div
                        className="mine_area"
                    >
                        <Mine_area />
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Widget    
            app="mine_sweeper"
            info={content}
            dispatch_click={""}
        />
    )
}


export {Mine_sweeper}
