var page = require('webpage').create(),
    system = require('system'),
    address, output, size,orientation;

if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
	orientation = system.args[3];
    /*size of browser*/
   page.viewportSize = { width: 1600, height: 900 };
    /*
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: 'A4', orientation: 'portrait', margin: '1cm' };
    }
    */
    /* ie and chrome view diffrent format of pdf */ 
    //page.settings.userAgent = 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36';
    page.paperSize = { format: 'A4', orientation:orientation, margin: '0cm' };
    page.zoomFactor = 1;
    page.settings.loadImages = true;
	
	page.onLoadFinished =function() {
		//window.setTimeout(function () {
			try{
				page.render(output, {format: 'pdf', quality: '100' });
				phantom.exit(1); 
			}catch(error){
				console.log(error);
				phantom.exit(0);
			}
           
        //}, 1000); //setting the time is enough to loading the page. document.ready
            
	}
    //some question about the page language
    page.open(address, function (status) {
        if (status !== 'success') { 
			console.log(status);
            phantom.exit(0);  
        } 
    });
}