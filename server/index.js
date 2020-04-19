const express =  require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket)=>{
    console.log('connection from client side')
    socket.on('Chat RealTime', (data)=>{
        console.log(data,'socketData')
        // send messgae on this event to client side 
        socket.emit('message',{user:'admin',text:'welcome user join room!'})
        //all other user or single other person
        socket.broadcast.to('Chat RealTime').emit('message',{message:'new user joined us'})
        // join room fro socket.. to start chat ..
        
        socket.join('Chat RealTime')
    })
    socket.on('message',(data)=>{
        console.log('data'),
        io.to('Chat RealTime').emit('message',{data})
    })
    socket.on('disconnect', ()=>{
        console.log('Client disconnected');

    })
})
app.get('/', (req,res,next  )=>{
    res.send({
        name: 'socket implementation'
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT)