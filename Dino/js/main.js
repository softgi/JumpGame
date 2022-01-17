var canvas = document.getElementById('canvas');//id가 canvas라는 엘리멘트를 들고온다
var ctx = canvas.getContext('2d');

var img1 = new Image();
var img2 = new Image();
img1.src = '../image/people.png';
img2.src = '../image/jump.png';

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x : 10,
    y : 200,
    width : 100,
    height : 200,
    draw(){
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}


class Cactus {
    constructor(){
        this.x = 1000;
        this.y = 300;
        this.width = 100;
        this.height = 100;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2, this.x, this.y,this.width,this.height);
    }
}

var jumpTimer = 0;
var timer = 0;
var cactus여러개 = [];
var animation;


function 프레임마다실행할거(){
    animation = requestAnimationFrame(프레임마다실행할거)
    timer++;
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    if(timer % 120 ===0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i ,o)=>{
        //x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x-=5;

        충돌하냐(dino, a);

        a.draw();
    })    
    
    if(jump == true){
        dino.y-=7;
        jumpTimer++;
    }
    if(jump == false){
        if(dino.y < 200){
            dino.y+=4;       
        }
    }
    if(jumpTimer > 25){
        jump = false;
        jumpTimer = 0;
    }

    dino.draw()
}

프레임마다실행할거();

//충돌확인
function 충돌하냐(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if( x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}

var jump = false;
document.addEventListener('keydown', function(e){
    if( e.code === 'Space'){
        jump = true;
    }
})