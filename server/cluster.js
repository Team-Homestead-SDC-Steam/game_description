var cluster = require('cluster');
var express = require('express');
var numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    for (var i=0; i<numCPUs;i++){
        console.log(i)
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach((id)=>{
        console.log(`I am running with ID : ${cluster.workers[id].process.pid}`);
    })

    cluster.on('exit', function(worker,code,signal){
        console.log('worker '+ worker.process.pid+' died' )
    })
}else{
    require('./index.js')
}