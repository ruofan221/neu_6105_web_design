function $(dom) {

    function getDom(dom) {

        var str = dom.charAt(0);        
        switch( str ) {
            case '.' :
                this.ele = document.getElementsByClassName(dom.substring(1))||null; 
                            
                break;
            
            case '#' :

                this.ele =  document.getElementById(dom.substring(1)) || null;

                break;

            default : 

                if(document.getElementsByTagName(dom).length) {

                    this.ele = document.getElementsByTagName(dom);                              

                } else if(document.getElementsByName(dom).length) {

                    this.ele = document.getElementsByName(dom);                                 

                } else {                    
                    this.ele = null;
                }
        }
        return this;            
    };


    getDom.prototype.get = function(num) {
        return this.ele[num]||this.ele;
    }

    getDom.prototype.insert = function(value , num) {
        this.ele[num].innerHTML = value;            
    }

    return new getDom(dom);
}