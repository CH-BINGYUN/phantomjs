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



app.post('.*',function(req, res) { 
     send(req, res); 
});

app.get('.*',function(req, res) {  
    send(req, res); 
}); 


function send( req, res ){
    try{
       
        var args = helper.extendObj( new Object(), helper.parseArgs(req.url) ,typeof(req.post)=="object" ? req.post : helper.parseArgs(req.post)  );
        
        console.log( args.url);
        if(!args.url){
            res.send("No URL received");
        }
        if(args.width && args.height){
            page.viewportSize = {width: args.width, height: args.height};
        }
        page.open(args.url,function(status){
            if(status !== "success"){
                res.statusCode = 500;
                res.send(status);
            }
            else{
                helper.evaluate(page); 
             
                setTimeout(function() {   
                    try{
                        var pic = helper.renderElement(page, args.selector || 'body');
                        res.send(pic);	  
                    }catch(error){
                        res.statusCode = 500;
                        res.send(  error.message );	  
                        console.log(error);
                    } 
                }, args.timeout || 2000);
            }
        });	
    }catch(error){
        res.statusCode = 500;
        res.send( error.message  );	 
        console.log(error);
    }
}

service  = app.listen(system.args[1] || 8000);
 
if (service) { 
          console.log('Web server running on port ' + (system.args[1] || 8000) ); 
  } else { 
         console.log('Error: Could not create web server listening on port ' + (system.args[1] || 8000) ); 
          phantom.exit(); 
 } 
 