// import the webserver module, and create a server
var server = require('webserver').create();
var port = require('system').env.PORT || 7788;

console.log("Start Application");
console.log("Listen port " + port);

// Create serever and listen port 
server.listen(port, function (request, response) {

    console.log("request method: ", request.method);  // request.method POST or GET     

    if (request.method == 'POST') {
        console.log("POST params should be next: ");
        console.log(JSON.stringify(request.post));//dump
        console.log(request.post['1']);//key is '1'
        console.log(request.post['2']);//key is '2'
        code = response.statusCode = 200;
        response.write(code);
        response.close();
    }
});