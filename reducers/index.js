import {combineReducers} from 'redux'

import {start_menu, start_side, start_side_power, start_side_user} from './start';
import { calculator } from './apps/calculator';
import { open_apps } from './desk';
import { draw, canvas } from './apps/draw';
import { task_bar } from './task_bar';
import { context_menu } from './context_menu';
import { app } from './app';
import { widgets } from './container/widgets';
import { mine_sweeper } from './apps/mine_sweeper';

const rootReducer = combineReducers({
    start_menu,
    start_side,
    start_side_power,
    start_side_user,
    calculator,
    open_apps,
    draw,
    canvas,
    task_bar,
    context_menu,
    app,
    widgets,
    mine_sweeper,
});

export default rootReducer