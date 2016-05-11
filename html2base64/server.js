var system = require('system'),
	page = require('webpage').create(),
    helper = require('./Helper.js'),
    Routes = require('./Routes.js'),
    app = new Routes();

    var service ;
page.viewportSize = {width: 1366, height: 768};

app.use(function(req,res,next){ 
	if(req.post&&req.post.width && req.post.height){
		if(isNaN(parseInt(req.post.width)) && isNaN(parseInt(req.post.height))){
			req.post.width = Math.abs(Math.floor(req.post.width));
			req.post.height = Math.abs(Math.floor(req.post.height));	
		}
		else{
			req.post.width = null;
			req.post.height = null;
		}
	}
	next();
});



app.post('/.*',function(req, res) {
     
 
    var args = helper.extendObj( helper.parseArgs(req.post) , helper.parseArgs(req.url) );
      
	if(!args.url){
		res.send("No URL received");
	}
	if(args.width && args.height){
		page.viewportSize = {width: args.width, height: args.height};
	}
	page.open(args.url,function(status){
		if(status !== "success"){
        	res.send(status);
		}
		else{
            helper.evaluate(page);
			setTimeout(function() {  
				var pic = helper.renderElement(page, 'body');
		    	res.send(pic);	
			}, args.timeout || 2000);
		}
	});	
});

app.get('/.*',function(req, res) {  
    try{
        console.log( req.url );
        var args = helper.parseArgs(req.url);
        
       // console.log( args.url);
        if(!args.url){
            res.send("No URL received");
        }
        if(args.width && args.height){
            page.viewportSize = {width: args.width, height: args.height};
        }
        page.open(args.url,function(status){
            if(status !== "success"){
                res.send(status);
            }
            else{
                helper.evaluate(page); 
             
                setTimeout(function() {   
                    var pic = helper.renderElement(page, args.selector || 'body');
                    res.send(pic);	  
                }, args.timeout || 2000);
            }
        });	
    }catch(error){
        res.send("error");	 
        console.log(error);
    }
}); 


service  = app.listen(system.args[1] || 8000);
 
if (service) { 
          console.log('Web server running on port ' + (system.args[1] || 8000) ); 
  } else { 
         console.log('Error: Could not create web server listening on port ' + (system.args[1] || 8000) ); 
          phantom.exit(); 
 } 
 