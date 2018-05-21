var canvasWidth  = 600;
var canvasHeight = 600;

var scl = 10;
var food = [];
var status = false;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    snake = new Snake(10, 10);

    createFood();
    
    
    }

function draw() {
    clear();
    background(0, 153, 51);
    snake.update();
    snake.show();
    
    for(var i = 0; i < 3; i++){
            food[i].show();
    }
    
    snake.eat(food);
    frameRate(15)
}

function Snake(x, y){
    this.x = x;
    this.y = y;
    this.xMotion = 0;
    this.yMotion = 0;
    this.size = 0;
    this.body = [];
    
    
    this.update = function(){
            for (var i = 0; i < this.body.length - 1; i++){
                this.body[i] = this.body[i+1];
            }
        
        this.body[this.size - 1] = createVector(this.x, this.y);
        
        this.x = this.x + this.xMotion;
        this.y = this.y + this.yMotion;
        
        
        this.motion();
        this.stop();
    };
    
    this.show = function(){
        fill(51);
        stroke(255)
        for(i = 0; i < this.body.length; i++){
            rect(this.body[i].x, this.body[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
    
    this.motion = function(){
        if((keyCode === UP_ARROW || key === "w") && this.yMotion != scl){
            this.xMotion =  0;
            this.yMotion = -scl;
        } else if((keyCode === DOWN_ARROW || key === "s") && this.yMotion != -scl){
            this.xMotion =  0;
            this.yMotion =  scl;
        } else if((keyCode === LEFT_ARROW || key === "a") && this.xMotion != scl){
            this.xMotion = -scl;
            this.yMotion =  0;
        } else if((keyCode === RIGHT_ARROW || key === "d") && this.xMotion != -scl){
            this.xMotion =  scl;
            this.yMotion =  0;
        }
    };
    this.stop = function(){
        if(this.x < 0 || this.x > canvasWidth  - 10){
            // When the Snake goes out the screen horizontally.
            this.xMotion = 0;
            this.yMotion = 0;
            gameOver();
        } else if(this.y < 0 || this.y > canvasHeight - 10){
            // When the Snake goes out the screen vertically.
            this.xMotion = 0;
            this.yMotion = 0;
            gameOver();
        }
        for(var i = 0; i < this.body.length; i++){
            console.log(this.body[i].x === this.x && this.y === this.body[i].y)
            if(this.x === this.body[i].x && this.y === this.body[i].y){
                //When the Sanke crush into itself.
                this.xMotion = 0;
                this.yMotion = 0;
                gameOver();
            }
            
            
        }
    };
    
    this.eat = function(prey){
        for(var i = 0; i < 3; i++){
            if(this.x === prey[i].x && this.y === prey[i].y){
                this.size ++;
                document.getElementById('snakeSizeOutput').innerHTML = this.size + 1;
                createFood();
            }
        }
        
    };
}

function Food(x, y){
    this.x = x;
    this.y = y;
    
    this.show = function(){
        fill(255, 51, 133);
        noStroke();
        rect(this.x, this.y, scl, scl)
    }
    
}

function gameOver(){
    clear();
    background(0);
    textSize(80);
    fill(255);
    text("GAME OVER!", 50, 300);
}

function createFood(){
    for(var i = 0; i < 3; i++){
        var rows = Math.floor(Math.random() * canvasWidth / scl);
        var cols = Math.floor(Math.random() * canvasHeight / scl);
        food[i] = new Food(rows * scl, cols * scl);
    }
    
    
}


