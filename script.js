const canvas = document.getElementById('pong')
const context = canvas.getContext('2d')
const FPS = 50
let rectX = 0

const user ={
    x: 0,
    y: canvas.height/2 - 50,
    width:10,
    height: 100,
    color: "white",
    score: 0
}
const com = {
    x: canvas.width - 10,
    y: canvas.height/2 - 50,
    width:10,
    height: 100,
    color: "white",
    score: 0
}
const net = {
    x: canvas.width/2 - 1,
    y: 0,
    width :2,
    height : 10,
    color: "white",
}
const ball ={
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "white",

}

function drawRect( marginLeft, marginTop, width, height, color ){
    context.fillStyle = color
    context.fillRect( marginLeft, marginTop, width, height )
}
function drawCircle( x, y, radius, startAngle, color ){
    context.fillStyle = color
    context.beginPath()
    context.arc( x, y, radius, 0, Math.PI * 2, false )
    context.closePath()
    context.fill()
}
function drawText( text, x, y, color ){
    context.fillStyle = color
    context.font = "75px fantasy"
    context. fillText(text, x, y)
}
function drawNet(){
    for (let i = 0; i <= canvas.height; i+=15) {
        drawRect( net.x, net.y + i , net.width, net.height, net.color) 
    }
}

function render(){
    drawRect( 0, 0, 1000, 700, "black")

    drawText( user.score, canvas.width/4, canvas.height/5, "white" )
    drawText( com.score, 3*canvas.width/4 - 45, canvas.height/5, "white" )

    drawNet()

    drawRect( user.x, user.y, user.width, user.height, user.color )
    drawRect( com.x, com.y, com.width, com.height, com.color )
    drawCircle( ball.x, ball.y, ball.radius, ball.color )
}
function resetBall(){
    ball.x = canvas.width/2
    ball.y = canvas.height/2
    ball.speed = 5
    ball.velocityX = -ball.velocityX
}

canvas.addEventListener("mousemove", movePaddle)

function movePaddle(event){
    let rect = canvas.getBoundingClientRect()

    user.y = event.clientY - rect.top - user.height/2
}

function update(){
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    let computerLevel = 0.1
    com.y += ( ball.y - ( com.y + com.height/2 ) ) * computerLevel

    if( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0 ){
        ball.velocityY = -ball.velocityY
    }
   let player = ( ball.x < canvas.width/2 ) ? user : com

   if( collision(ball, player)){
       let collidePoint = ( ball.y - ( player.y + player.height/2 ) )
       collidePoint = collidePoint / ( player.height/2 )

       let andleRad = ( Math.PI/4 ) * collidePoint

       let direction = ( ball.x < canvas.width/2 ) ? 1 : -1

        ball.velocityX = direction * ball.speed * Math.cos(andleRad)
        ball.velocityY = ball.speed * Math.sin(andleRad)

        ball.speed += 0.5
   }

   if( ball.x - ball.radius < 0  ){
       com.score++
       resetBall()
   } else if ( ball.x + ball.radius > canvas.width ){
       user.score++
       resetBall()
   }
}
function collision(b, p){
    p.top = p.y
    p.bottom = p.y + p.height
    p.left = p.x
    p.right = p.x + p.width


    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
}
function game(){
    update()
    render()
}
setInterval(game, 1000/FPS)
