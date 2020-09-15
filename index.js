const http=require('http');
const fs=require('fs');
const path=require('path');
const hostanme="localhost";
const port=5000;
const server=http.createServer((req,res)=>{
    console.log('request for' +req.url + 'by method' + req.method);
    if(req.method=='GET')
    {
        var fileURL;
        if(req.url=='/')
        {
            fileURL="/index.html";
        }
        else{
            fileURL=req.url;
        }
        var filePath=path.resolve('./public'+fileURL);
        var fileExt=path.extname(filePath);
        if (fileExt=='.html'){
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode=400;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>File not exixts</h1></body></html>');
                }
                res.statusCode=400;
    res.setHeader('Content-Type','text/html');
    fs.createReadStream(filePath).pipe(res);
            })
        }else{
            res.statusCode=400;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Not html file</h1></body></html>');
        }
    }
    else{
        res.statusCode=400;
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>Not supported</h1></body></html>');
    }
   // res.statusCode=200;
    //res.setHeader('Content-Type','text/html');
    //res.end('<html><body><h1>Server Connection Successfully Established</h1></body></html>');
});
server.listen(port,hostanme,()=>{
    console.log(`server is started at the post : ${port}`);
});