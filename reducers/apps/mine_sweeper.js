const df_state = {
    map: [[]],
    map_width: 9,
    map_height: 9,
    mine_num: 10,
    game_state: 0,//0 未开始; 1 游戏中; -1 游戏结束; 2 胜利;
    curr_grid: 0,//0 空; 1 数字; -1 雷;
    flags: 0,
    right: 0,//旗,被标出的雷;
    // mine_sub_flags: 10,//雷总数减旗数
}

class Grid{
    constructor(){
        this.mine = false;
        this.num = 0;
        this.open = false;
        this.context = 0;//0 空, 1 旗子, 2 问号
    }
}

const mine_sweeper = (state = df_state, action) => {
    const ms = {
        ...state
    }
    switch(action.type){
        case "MINE_INIT": {
            for (let arr in ms) {
                ms[arr] = df_state[arr];
            }
            let map = [];
            let coord = [];//雷坐标
            do{
                let tmp = [];
                let is_in = false;
                tmp.push(parseInt(Math.abs(Math.random() * 10 - 2)));
                tmp.push(parseInt(Math.abs(Math.random() * 10 - 2)));
                coord.my_forEach((xy) => {
                    if (xy[0] === tmp[0] && xy[1] === tmp[1]) {
                        is_in = true;
                        return;
                    }
                });//去重
                if (!is_in) coord.push(tmp);
            }while (coord.length < ms.mine_num);
            for(let i = 0; i < ms.map_height; i++){
                let row = [];
                for(let j = 0; j < ms.map_width; j++){
                    row.push(new Grid());
                }
                map.push(row);
            }
            coord.my_forEach((xy) => {
                map[xy[0]][xy[1]].mine = true;
            });

            map.my_forEach((row, i) => {
                row.my_forEach((grid, j) => {
                    let num = 0;
                    if(!grid.mine){
                        try{
                            if(map[i - 1][j].mine) num++;
                        }catch(err){ }//左
                        try{
                            if(map[i + 1][j].mine) num++;
                        } catch(err){ }//右
                        try{
                            if (map[i - 1][j - 1].mine) num++;
                        }catch(err){ }//左上
                        try{
                            if (map[i - 1][j + 1].mine) num++;
                        }catch(err){ }//左下
                        try{
                            if (map[i + 1][j - 1].mine) num++;
                        }catch(err){ }//右上
                        try{
                            if (map[i + 1][j + 1].mine) num++;
                        }catch(err){ }//右下
                        try{
                            if (map[i][j + 1].mine) num++;
                        }catch(err){ }//下
                        try{
                            if (map[i][j - 1].mine) num++;
                        }catch(err){ }//上
                        grid.num = num;
                    }
                    
                });
            });
            ms.map = map;
            return ms;
        }
        case "MINE": {
            ms.game_state = -1;
            return ms;
        }
        case "MINE_SWEEPER_START": {
            ms.game_state = 1;
            return ms;
        }
        case "MINE_FLAGS_INCRESMENT": {
            ms.flags++;
            return ms;
        }
        case "MINE_FLAGS_DECRESMENT": {
            ms.flags--;
            return ms;
        }
        case "MINE_RIGHT_INCRESMENT": {
            ms.right++;
            return ms;
        }
        case "MINE_RIGHT_DECRESMENT": {
            ms.right--;
            return ms;
        }
        case "MINE_SWEEPER_WIN": {
            ms.game_state = 2;
            return ms;
        }
        default: {
            return ms;
        }
    }
}

export {mine_sweeper}

