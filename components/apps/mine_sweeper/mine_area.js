import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Mine_area = () => {

    const canvasRef = useRef(null);

    let map = [];
    let map_width = 9;
    let map_height = 9;
    let mine_num = 10;
    class Grid{
        constructor(){
            this.mine = false;
            this.num = 0;
        }
    }


    const draw = (ctx) => {
    }
    

    useEffect(() => {
        let coord = [];//雷坐标
        for (let i = 0; i < mine_num; i++){
            let tmp = [];
            tmp.push(parseInt(Math.abs(Math.random() * 10 - 2)));
            tmp.push(parseInt(Math.abs(Math.random() * 10 - 2)));
            coord.push(tmp);
        }//雷位置有可能重复  还没处理
        for(let i = 0; i < map_width; i++){
            let row = [];
            for(let j = 0; j < map_height; j++){
                row.push(new Grid());
            }
            map.push(row);
        }
        coord.my_forEach((xy) => {
            map[xy[0]][xy[1]].mine = true;
        });

        //行i纵j
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
                    }catch(err){ }//左下
                    try{
                        if (map[i - 1][j + 1].mine) num++;
                    }catch(err){ }//左上
                    try{
                        if (map[i + 1][j - 1].mine) num++;
                    }catch(err){ }//右下
                    try{
                        if (map[i + 1][j + 1].mine) num++;
                    }catch(err){ }//右上
                    try{
                        if (map[i][j + 1].mine) num++;
                    }catch(err){ }//上
                    try{
                        if (map[i][j - 1].mine) num++;
                    }catch(err){ }//下
                    grid.num = num;
                }
                
            });

        });
    },[]);//地图初始化
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");

        
        map.my_forEach((row,i) => {
            row.my_forEach((grid, j) => {
                if(grid.num !== 0){
                    context.fillStyle = "#c0c0c0";
                    context.fillRect(j * 22.2,i * 22.2, 22, 22);
                    context.fillStyle = "#000000";
                    context.fillText(grid.num, 7 + j * 22.2, 14 + i * 22.2);
                }
                else if(grid.mine){
                    context.fillStyle = "#c0c0c0";
                    context.fillRect(j * 22.2,i * 22.2, 22, 22);
                    context.fillStyle = "#000000";
                    context.fillRect(8 + j * 22.2,8 +i * 22.2, 6, 6);
                }
                else{
                    context.fillStyle = "#ffffff";
                    context.fillRect(j * 22.2, i * 22.2, 22.2, 2);
                    context.fillRect(j * 22.2, i * 22.2, 2, 22.2);
    
                    context.fillStyle = "#c0c0c0";
                    context.fillRect(2 + j * 22.2, 2 + i * 22.2, 18, 18);
    
                    context.fillStyle = "#808080";
                    context.fillRect(20 + j * 22.2, i * 22.2, 2, 22.2);
                    context.fillRect(j * 22.2, 20 + i * 22.2, 22.2, 2);   
                }
            })
        });

    }, [draw]);
    
    return (
        <canvas
            className="mine_area_canvas"
            ref={canvasRef}
            width="200px"
            height="200px"
        />
    )

}


export {Mine_area}
