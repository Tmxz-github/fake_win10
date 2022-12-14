import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
// import allActions from './actions'

import {
	Task_bar,
	Desk,
	Draw,
	Start_menu,
	Calculator,
	Context_menu,
	Mine_sweeper,
} from './components/index';

const App = () => {
	const dispatch = useDispatch();
	const op_apps = useSelector(state => state.open_apps);
	const canvas = useSelector(state => state.canvas);

	const click_empty = (e) => {
		if(!e) return;
		const empty_action = [
			["START","START_HIDE"],
			["SIDE","SIDE_HIDE"],
			["SIDE_POWER","POWER_SIDE_HIDE"],
			["SIDE_USER","USER_SIDE_HIDE"],
			["CONTEXT","CLOSE_CONTEXT_MENU"],
			["FUNCS_INFO","CLOSE_FUNCS_INFO_MENU"],
		]
		let action_type = "";
		try{
			action_type = e.target.dataset.action || "";
		}catch(err){}

		let action_type1 = getComputedStyle(e.target).getPropertyValue(
			"--prefix"
		);
		empty_action.forEach((action,i) => {
			if(!action_type.startsWith(action[0]) && !action_type1.startsWith(action[0])){
				dispatch({
					type:action[1],
				});
			}
		});

		
			dispatch({
				type:"SELECT",
				payload:e.target.dataset.name,
			});
	}
	const to_top = (e) => {
		if(e.target.closest(".app")){
			let name = e.target.closest(".app").classList[0].toUpperCase();
			op_apps.apps.forEach((app) => {
				if(app.name === name){
					dispatch({
						type:"TO_TOP",
						payload:name,
					})
				}
			})
		}
	}
	const handle_context_menu = (e) => {
		e.preventDefault();
		click_empty(e);
		if(getComputedStyle(e.target).getPropertyValue("--prefix") === "CONTEXT") return;
		if(e.target.classList[0] != "desk" && e.target.classList[0] != "desk_icons"){
			dispatch({
				type:"CLOSE_CONTEXT_MENU",
				payload:e,
			});
		}
		else{
			dispatch({
				type:"OPEN_CONTEXT_MENU",
				payload:e,
			});
		}
	}
	const dispatch_dbclick = (e) => {
		if(e.target.dataset.action != "APP") return;
        dispatch({
            type:"OPEN",
            payload:e.target.dataset.name,
        });
	}
	const keyboard_down_handle = (e) => {
		if(e.key === " ")e.preventDefault();
		dispatch({
			type: "KEY_DOWN",
			payload: e.key,
		});
	}
	const keyboard_up_handle = () => {
		dispatch({
			type: "KEY_UP",
		});
	}

	window.onclick = click_empty;
	window.oncontextmenu = handle_context_menu;
	window.onmousedown = to_top;
	window.ondblclick = dispatch_dbclick;
	window.onkeydown = keyboard_down_handle;
	window.onkeyup = keyboard_up_handle;

	Function.prototype.throttle = function(fn, delay){
		let timer = null;
		return function(){
			if(timer) return;
			timer = setTimeout(() => {
				fn.apply(this, arguments);
				timer = null;
			},delay);
		}
	}

	return (
		<div
			className="screen"
			onMouseMove={canvas.extending ? (e) => {
				dispatch({
					type:"EXTENDING",
					payload:e,
				})
			} : null}
			onMouseUp={canvas.extending ? (e) => {
				dispatch({
					type:"CANCLE_CANVAS_EXTEND",
					payload:e,
				})
			} : null}
		>
			<Desk />
			<Calculator />
			<Draw />
			<Task_bar />
			<Start_menu />
			<Context_menu />
			<Mine_sweeper />
		</div>
	)
}

export default App
