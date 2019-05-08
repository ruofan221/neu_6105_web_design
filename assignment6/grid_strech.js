document.write("<script type='text/javascript' src='./showshadow.js'></script>"
);
document.write("<script type='text/javascript' src='./showgrid.js'></script>"
);
// movement of crop area
var clipAttri
var oTailor = document.getElementById("grid");
var oPicture = document.getElementById('img');
var oShadow = document.getElementsByClassName("outer");
var grid = document.getElementsByClassName("grid-container");
oTailor.onmousedown = function (ev) {
    // event object
    var oEvent = ev || window.event;

    // get status of cursor
    var oCur = getCss(oTailor, 'cursor');
    // original position of mouse
    var sTmpX = oEvent.clientX;
    var sTmpY = oEvent.clientY;
    var oAttrs = {};
    // get the attributes of crop area, and store in an object
    oAttrs.left = getCss(oTailor, 'left');
    oAttrs.top = getCss(oTailor, 'top');
    oAttrs.width = getCss(oTailor, 'width');
    oAttrs.height = getCss(oTailor, 'height');

    document.onmousemove = function (ev) {
        // movement event object
        var oEvent = ev || window.event;

        // 当前鼠标位置减去初始鼠标位置 等于 鼠标移动距离
        // the distance of moust movement
        var sLeftT = oEvent.clientX - sTmpX;
        var sTopT = oEvent.clientY - sTmpY;

        // the distance of moust movement
        var oTmpHeight = '';
        var oTmpTop = '';
        var oTmpWidth = '';
        var oTmpLeft = '';
        var block2 = document.getElementById('block_2');
        var block4 = document.getElementById('block_4');
        var block6 = document.getElementById('block_6');
        var block8 = document.getElementById('block_8');
        switch (oCur) {
            case 'nw-resize':          // northewest

                oTmpWidth = parseInt(oAttrs.width) - sLeftT;
                oTmpHeight = parseInt(oAttrs.height) - sTopT;
                oTmpLeft = parseInt(oAttrs.left) + sLeftT;
                oTmpTop = parseInt(oAttrs.top) + sTopT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            case 'ne-resize':          // northeast
                oTmpWidth = parseInt(oAttrs.width) + sLeftT;
                oTmpHeight = parseInt(oAttrs.height) - sTopT;
                // 右上角移动不需要left值 因为默认响右移动
                oTmpTop = parseInt(oAttrs.top) + sTopT;
                showLittleblocks(block2, block4, block6, block8);

                break;
            case 'sw-resize':          // southwest
                oTmpWidth = parseInt(oAttrs.width) - sLeftT;
                oTmpHeight = parseInt(oAttrs.height) + sTopT;
                oTmpLeft = parseInt(oAttrs.left) + sLeftT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            case 'se-resize':          // southeast

                oTmpWidth = parseInt(oAttrs.width) + sLeftT;
                oTmpHeight = parseInt(oAttrs.height) + sTopT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            case 'n-resize':          // north

                oTmpHeight = parseInt(oAttrs.height) - sTopT;
                oTmpTop = parseInt(oAttrs.top) + sTopT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            case 'w-resize':          // west

                oTmpWidth = parseInt(oAttrs.width) - sLeftT;
                oTmpLeft = parseInt(oAttrs.left) + sLeftT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            case 's-resize':          // south

                oTmpHeight = parseInt(oAttrs.height) + sTopT;
                showLittleblocks(block2, block4, block6, block8);
                break;

            case 'e-resize':          // easter

                var oTmpWidth = parseInt(oAttrs.width) + sLeftT;
                showLittleblocks(block2, block4, block6, block8);
                break;
            default:
                // move the whole copper
                tailorMove(oEvent, oTailor, oPicture, oShadow);
                break;
        }

        function showLittleblocks(b2, b4, b6, b8) {
            b2.style.left = parseInt(getCss(grid[0], 'width')) / 2 + 'px';
            b4.style.top = parseInt(getCss(grid[0], 'height')) / 2 + 'px';
            b6.style.right = parseInt(getCss(grid[0], 'width')) / 2 + 'px';
            b8.style.bottom = parseInt(getCss(grid[0], 'height')) / 2 + 'px';
        }

        /*  function */
        function tailorMove(ev, oTailor, oPicture, oShadow) {
            var oEvent = ev || window.event;

            var oTmpx = oEvent.clientX - oTailor.offsetLeft;
            var oTmpy = oEvent.clientY - oTailor.offsetTop;

            document.onmousemove = function (ev) {
                var oEvent = ev || window.event;

                oLeft = oEvent.clientX - oTmpx;
                oTop = oEvent.clientY - oTmpy;

                let block2 = document.getElementById('block_2');
                block2.style.left = parseInt(getCss(grid[0], 'width')) / 2 + 'px';
                let block4 = document.getElementById('block_4');
                block4.style.top = parseInt(getCss(grid[0], 'height')) / 2 + 'px';
                let block6 = document.getElementById('block_6');
                block6.style.right = parseInt(getCss(grid[0], 'width')) / 2 + 'px';
                let block8 = document.getElementById('block_8');
                block8.style.bottom = parseInt(getCss(grid[0], 'height')) / 2 + 'px';

                if (oLeft < oPicture.offsetLeft) {
                    oLeft = oPicture.offsetLeft;
                } else if (oLeft > (oPicture.offsetLeft + oPicture.offsetWidth - oTailor.offsetWidth)) {
                    oLeft = oPicture.offsetLeft + oPicture.offsetWidth - oTailor.offsetWidth;
                }
                if (oTop < oPicture.offsetTop) {
                    oTop = oPicture.offsetTop;
                } else if (oTop > (oPicture.offsetTop + oPicture.offsetHeight - oTailor.offsetHeight)) {
                    oTop = oPicture.offsetTop + oPicture.offsetHeight - oTailor.offsetHeight;
                }

                oTailor.style.left = (oLeft) + 'px';
                oTailor.style.top = (oTop) + 'px';
                shadow(oPicture, grid, oShadow);

            }
        }

        // top boundary
        if (parseInt(getCss(oTailor, 'top')) <= oPicture.offsetTop) {
            oTmpHeight = parseInt(getCss(oPicture, 'height')) - (oPicture.offsetTop + parseInt(getCss(oPicture, 'height')) - parseInt(getCss(oTailor, 'top')) - parseInt(getCss(oTailor, 'height')));
            oTmpTop = oPicture.offsetTop;
        } else if (oPicture.offsetTop + parseInt(getCss(oPicture, 'height')) <= (parseInt(getCss(oTailor, 'top')) + parseInt(getCss(oTailor, 'height')))) {
            // bottom boundary
            oTmpHeight = oPicture.offsetTop + parseInt(getCss(oPicture, 'height')) - parseInt(getCss(oTailor, 'top'));
        }
        // left boundary
        if ((parseInt(getCss(oTailor, 'left'))) <= oPicture.offsetLeft) {
            oTmpWidth = parseInt(getCss(oPicture, 'width')) - (oPicture.offsetLeft + parseInt(getCss(oPicture), 'width') - parseInt(getCss(oTailor, 'left')) - parseInt(getCss(oTailor, 'width')))
            oTmpLeft = oPicture.offsetLeft;
        } else if (parseInt(getCss(oTailor, 'width')) + parseInt(getCss(oTailor, 'left')) >= (oPicture.offsetLeft + oPicture.offsetWidth)) {
            // right boundary       
            oTmpWidth = oPicture.offsetLeft + oPicture.offsetWidth - parseInt(getCss(oTailor, 'left'));
        }

        // assign value
        if (oTmpWidth) {
            setAssign(oTailor, 'width', oTmpWidth + 'px');
        }
        if (oTmpHeight) {
            setAssign(oTailor, 'height', oTmpHeight + 'px');
        }
        if (oTmpLeft) {
            setAssign(oTailor, 'left', oTmpLeft + 'px');
        }
        if (oTmpTop) {
            setAssign(oTailor, 'top', oTmpTop + 'px');
        }

        // show shadow
        clipAttri = shadow(oPicture, grid, oShadow);

    };


    // cancel movement event when mouse up
    document.onmouseup = function (ev) {
        // eventobject
        var oEvent = ev || window.event;

        document.onmousemove = null;
        oEvent.preventDefault();
    }

    oEvent.preventDefault();


};

var btn = document.getElementById('confirm');

btn.onmousedown = function (ev) {
    var img2 = document.getElementById('img3');
    if (btn.value === 'crop') {
        oPicture.style.zIndex = '-1';
        btn.value = 'cropped';
        img2.style.clip = "rect(" + 0 + "px" + "," + 0 + "px" + "," + 0 + "px" + "," + 0 + "px" + ")";
        showGrid();
    } else if (btn.value === 'cropped') {
        oPicture.style.zIndex = '2';
        btn.value = 'crop';
        var cropL = oShadow[0].style.width;
        var cropT = oShadow[1].style.height;
        var cropR = (parseInt(getCss(oShadow[0], 'width')) + parseInt(getCss(document.getElementById('grid'), 'width'))) + 'px';
        var cropB = (parseInt(getCss(oShadow[1], 'height')) + parseInt(getCss(document.getElementById('grid'), 'height'))) + 'px';
        img2.style.clip = "rect(" + cropT + "," + cropR + "," + cropB + "," + cropL + ")";
        img2.style.top = '-' + cropT;
        img2.style.left = '-' + cropL;
    }

}



window.onunload = function() {
    document.getElementById("grid").removeEventListener();
}





