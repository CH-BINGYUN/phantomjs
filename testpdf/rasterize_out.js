var webpage = require('webpage'),
    system = require('system'),
    helper = require('./Helper.js'),
    output,address, selector,timeout;
 

try{
       
        address = system.args[1] ; 
        output = system.args[2] ;
        timeout = system.args[3] ;
        selector = system.args[4] ;
 
        var page = webpage.create(); 
        page.viewportSize = {width: 1200, height: 768};
         page.paperSize = { format: 'A4', orientation: 'landscape', margin: '0cm' };
    page.zoomFactor = 1;
    page.settings.loadImages = true;
	
	
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
                        
						page.render(output, {format: 'pdf', quality: '100' });
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
    
     