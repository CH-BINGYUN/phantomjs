var webpage = require('webpage'),
    system = require('system'),
    helper = require('./Helper.js'),
    address, selector,timeout;
 

try{
       
        address = system.args[1] ;  
        timeout = system.args[2] ;
        selector = system.args[3] ;
 
        var page = webpage.create(); 
        page.viewportSize = {width: 1200, height: 768};
        
        page.open(address,function(status){
            if(status !== "success"){ 
                console.log(status);
                phantom.exit(0);   
            }
            else{
                helper.evaluate(page);  
                setTimeout(function() {   
                    try{
                        var pic = helper.renderElement(page, selector || 'body'); 
                        console.log(pic);	
                        phantom.exit(1);                        
                    }catch(error){  	  
                        console.log(error);
                        phantom.exit(0);   
                    } 
                },  timeout || 2000);
            }
        });	
    }catch(error){ 
        console.log(error); 
        phantom.exit(0);
    }    
    
     