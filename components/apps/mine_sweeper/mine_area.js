import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const Mine_area = () => {

    const canvasRef = useRef(null);

    let map = [];
    let map_width = 8;
    let map_height = 8;
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
    },[]);
    useEffect(() => {
        const canvas_node = canvasRef.current;
        const context = canvas_node.getContext("2d");

        context.fillStyle = "ff0000";
        map.my_forEach((row,i) => {
            row.my_forEach((grid, j) => {
                context.fillRect(0 + j * 25, 0 + i * 25, 20, 20);
            })
        });

    }, [draw]);
    
    return (
        <canvas
            className="mine_area_canvas"
            ref={canvasRef}/>
    )

}


export {Mine_area}
