import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Widget } from "../../widgets/widgets";
import { Mine_area } from "./mine_area";

import "./mine_sweeper.css"



const Mine_sweeper = () => {

    const dispatch = useDispatch();
    const ms = useSelector(state => state.mine_sweeper);
    let [mine_sweeper_time, set_mine_sweeper_time] = useState(0);
    const [mine_sweeper_time_id, set_mine_sweeper_time_id] = useState(null);
    let game_state = "INIT";
    switch(ms.game_state){
        case 0: {
            game_state = "INIT";
            break;
        }
        case 1: {
            game_state = "GAMING";
            break;
        }
        case -1: {
            game_state = "OVER";
            break;
        }
        case 2: {
            game_state = "YOU_WIN";
            break;
        }
        default: {
            game_state = "INIT";
        }
    }

    const click_handle = (e) => {
        if(e.target.id === "mine_sweeper_face_icon"){
            dispatch({
                type:"MINE_INIT",
            });
        }
    }

    useEffect(() => {
        switch(ms.game_state){
            case 0:{
                clearInterval(mine_sweeper_time_id);
                set_mine_sweeper_time(0);
                set_mine_sweeper_time_id(null);
                break;
            }
            case 1:{
                let mine_sweeper_time_id = setInterval(() => {
                    set_mine_sweeper_time(++mine_sweeper_time);
                }, 1000);
                set_mine_sweeper_time_id(mine_sweeper_time_id);
                break;
            }
            case -1:
            case 2:{
                clearInterval(mine_sweeper_time_id);
                break;
            }
            default:{
                break;
            }
        }
        if(ms.game_state === 1){
            
        }
    }, [ms.game_state])

    const content = (
        <div
            className="content"
            onClick={click_handle}
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
                        <div
                            className="mine_sweeper_left_flags mine_sweeper_digital_num"
                        >{ms.mine_num - ms.flags}</div>
                        <div
                            className="mine_sweeper_state"
                            id="mine_sweeper_face_icon"
                        >
                        {game_state}</div>
                        <div
                            className="mine_sweeper_time mine_sweeper_digital_num"
                        >{mine_sweeper_time}</div>
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
