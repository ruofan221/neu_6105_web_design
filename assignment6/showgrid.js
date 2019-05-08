
document.write("<script type='text/javascript' src='./showshadow.js'></script>");
document.write("<script type='text/javascript' src='./getcss.js'></script>");

// show the crop grid
    function showGrid(){
        let item = document.getElementsByClassName("grid-item");
        let grid = document.getElementsByClassName("grid-container");
        let images = document.getElementById('img');
       
        let shadows = document.getElementsByClassName("outer");

        let btn = document.getElementById('confirm');
        
        grid[0].style.width = "300px";
        grid[0].style.height = "300px";
        grid[0].style.top = parseInt(getCss(images , 'top')) +"px";
        grid[0].style.left = parseInt(getCss(images , 'left'))+"px";
        for (var i = 0; i < item.length; i++) {
            item[i].style.border = "solid 1px";
        };

        let block2 = document.getElementById('block_2');
        let block4 = document.getElementById('block_4');
        let block6 = document.getElementById('block_6');
        let block8 = document.getElementById('block_8');
        block2.style.left = (parseInt(getCss(oShadow[0],'width')) + (parseInt(getCss(grid[0],'width')) / 2 )) + 'px';
        
        block4.style.top = (parseInt(getCss(oShadow[1],'height')) + (parseInt(getCss(grid[0],'height')) / 2) )+ 'px';
      
        block6.style.right = (parseInt(getCss(oShadow[0],'width')) + (parseInt(getCss(grid[0],'width')) / 2 )) + 'px';
        block8.style.bottom = (parseInt(getCss(oShadow[1],'height')) + (parseInt(getCss(grid[0],'height')) / 2) )+ 'px';
       
        // drew shadow area
        shadow(images , grid , shadows);
      
    }

    

   