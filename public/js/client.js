const socket = io()



let username ;
do{
    username = prompt("Enter your user name :")
}while(!username)

socket.emit('new-user-joined',username)


socket.on('user-connected',(socket_name)=>{
    userJoinLeft(socket_name,'joined')
})
socket.on('user-disconnected',(user)=>{
    userJoinLeft(user,'Left')
})


function userJoinLeft(name,staus){

    let div = document.createElement('div')
div.setAttribute('class','user-join')

let content =`<p>${name} ${staus} the chat</p> `
div.innerHTML=content
let chat = document.querySelector('#container')
chat.appendChild(div)
console.log(name)
}


socket.on('user-list',(users)=>{
  let count=0;
  for(let key in users){
    count++
  }
  document.querySelector("#quantity").innerHTML=count;
  console.log(count)  

})











 document.querySelector("#btn").addEventListener('click',SEND)


function SEND(){

   let msg=  document.querySelector("#massageinp")

   let data  = {
    'user':username,
     'msg':msg.value
   }

appendMassage(data,'right')
socket.emit('message',data)

   
msg.value="";

}
socket.on('massage',(data)=>{
    appendMassage(data,'left')
})

function appendMassage(data,status){
let div= document.createElement('div')
div.setAttribute('class', 'massage')
div.setAttribute('id',status)

let content = `${data.user}:-${data.msg}`;
div.innerHTML=content
document.querySelector("#container").appendChild(div)
console.log(data)

}




