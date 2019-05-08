document.write("<script type='text/javascript' src='./getcss.js'></script>");
document.write("<script type='text/javascript' src='./setassign.js'></script>");
/** 
 * @param：oPicture      image dom object
 * @param：oTailor       grid-crop object
 * @param：oShadow       shadow dom object
 */ 
function shadow(oPicture , oTailor , oShadow) {

    // left
    setAssign(oShadow[0] , 'width'  , (parseInt(getCss(oTailor[0] , 'left')) - parseInt(getCss(oPicture , 'left'))) + 'px');
    setAssign(oShadow[0] , 'height' , parseInt(getCss(oPicture , 'height')) + 'px');
    setAssign(oShadow[0] , 'left'   , parseInt(getCss(oPicture , 'left')) + 'px')
    setAssign(oShadow[0] , 'top'    , parseInt(getCss(oPicture , 'top')) + 'px')

    // right
    setAssign(oShadow[2] , 'width'  , (parseInt(getCss(oPicture , 'width')) - parseInt(getCss(oTailor[0] ,'width')) - parseInt(getCss(oShadow[0] , 'width'))) + 'px');
    setAssign(oShadow[2] , 'height' , parseInt(getCss(oPicture , 'height')) + 'px');
    setAssign(oShadow[2] , 'left'   , (parseInt(getCss(oTailor[0] , 'left')) + parseInt(getCss(oTailor[0] , 'width'))) + 'px');
    setAssign(oShadow[2] , 'top'    , parseInt(getCss(oPicture , 'top')) + 'px');

    // top
    setAssign(oShadow[1] , 'width'  , parseInt(getCss(oTailor[0] , 'width')) + 'px');
    setAssign(oShadow[1] , 'height' , (parseInt(getCss(oTailor[0], 'top')) - parseInt(getCss(oPicture , 'top'))) + 'px');
    setAssign(oShadow[1] , 'left'   , (parseInt(getCss(oPicture , 'left')) + parseInt(getCss(oShadow[0] , 'width'))) + 'px');
    setAssign(oShadow[1] , 'top'    , parseInt(getCss(oPicture , 'top')) + 'px');

    // bottom
    setAssign(oShadow[3] , 'width'  , parseInt(getCss(oTailor[0] , 'width')) + 'px');
    setAssign(oShadow[3] , 'height' , (parseInt(getCss(oPicture , 'height')) - parseInt(getCss(oTailor[0] , 'height')) - parseInt(getCss(oShadow[1] , 'height'))) + 'px');
    setAssign(oShadow[3] , 'left'   , (parseInt(getCss(oPicture , 'left' )) + parseInt(getCss(oShadow[0] , 'width'))) + 'px');
    setAssign(oShadow[3] , 'top'    , (parseInt(getCss(oTailor[0] , 'top' )) + parseInt(getCss(oTailor[0] , 'height'))) + 'px');

   
    
};