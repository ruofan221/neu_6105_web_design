/**
- 赋值函数  
- @param : obj      object
- @param : option   the operation to object
- @parma : value    the value assgined to object
 */
function setAssign(obj , option , value) {  
    
    switch(option) {
        case 'width':
            obj.style.width = value;
            break;
        case 'height':
            obj.style.height = value;
            break;
        case 'top':
            obj.style.top = value;
            break;
        case 'left':
            obj.style.left = value;
            break;
        case 'position':
            obj.style.position = value;
            break;
        case 'cursor':
            obj.style.cursor = value;
    }
}