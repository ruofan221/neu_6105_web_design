//  鼠标显示效果
// 点状边框监视 设置相应操作
var oTailor = document.getElementById("grid");
oTailor.onmousemove = function(ev) {
    var oTarget = ev.srcElement;  
    switch(oTarget.id) {
        case 'block_1':                           // 左上

            setAssign(oTailor , 'cursor' , 'nw-resize');                

            break;
        case 'block_3':                           // 右上  

            setAssign(oTailor , 'cursor' , 'ne-resize');                

            break;
        case 'block_7':                           // 左下
            
            setAssign(oTailor , 'cursor' , 'sw-resize');
            
            break;
        case 'block_5':                           // 右下
            setAssign(oTailor , 'cursor' , 'se-resize');
            
            break;
        case 'block_2':                           // 上            
            setAssign(oTailor , 'cursor' , 'n-resize');
            
            break;
        case 'block_8':                           // 左
            setAssign(oTailor , 'cursor' , 'w-resize');
            
            break;
        case 'block_6':                           // 下            
            setAssign(oTailor , 'cursor' , 's-resize');
            
            break;
        case 'block_4':                           // 右            
            setAssign(oTailor , 'cursor' , 'e-resize');
            
            break;
        default :                               // 裁剪区域 显示可移动提示
            setAssign(oTailor , 'cursor' , 'move');
            break;
    }
}