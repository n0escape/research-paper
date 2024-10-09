const Promise1 = new Promise(function(resolve){

    console.log ('some event1');
    resolve(true);

});
Promise1.then(value1=>{
    if(value1){
        const Promise2 = new Promise(function(resolve){

            console.log ('some event2');
            resolve(true);

        });

        Promise2.then(value2=>{
            if(value2){
                const Promise3 = new Promise(function(resolve){

                    console.log ('some event3');
                    resolve(true);

                });

                Promise3.then(value3=>{
                    if(value3){
                        const Promise4 = new Promise(function(resolve){

                                console.log ('some event4');
                                resolve(true);

                        });

                        Promise4.then(value4=>{
                            if(value4){
                                const Promise5 = new Promise(function(resolve){

                                    console.log ('some event5');
                                    resolve(true);

                                });

                                Promise5.then(value5=>{
                                    if(value5){
                                        const Promise6 = new Promise(function(resolve){

                                            console.log ('some event6');
                                            resolve(true);

                                        });

                                        Promise6.then(value6=>{
                                            if(value6){
                                                const Promise7 = new Promise(function(resolve){

                                                    console.log ('some event7');
                                                    resolve(true);

                                                });

                                                Promise7.then(value7=>{
                                                    if(value7){
                                                        const Promise8 = new Promise(function(resolve){

                                                            console.log ('some event8');
                                                            resolve(true);

                                                        });

                                                        Promise8.then(value8=>{
                                                            if(value8){
                                                                const Promise9 = new Promise(function(resolve){

                                                                    console.log ('some event9');
                                                                    resolve(true);

                                                                });
                                                            }
                                                        })
                                                        //8
                                                    }
                                                })
                                                //7
                                            }
                                        })
                                        //6
                                    }
                                })
                                //5
                            }
                        })
                        //4
                    }
                })
                //3
            }
        })
        //2
    }
});
//1


function test1(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 880;
let enemies = [];
let limit = 10;
let score = limit;
let gameOver = false;
let win = false;
let pause = false;

class InputHandler {
    constructor(){
        this.keys = [];
        //использована стрелочная функция чтобы иметь доступ к this родителя
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (e) => {
        if ((       e.code === 'KeyS'||
                    e.code === 'KeyW'||
                    e.code === 'KeyA'||
                    e.code === 'KeyD')
                    && this.keys.indexOf(e.code) === -1){
                this.keys.push(e.code)
            }
            else if(e.code === 'Space') restartGame();
            else if(e.code === 'Escape') pauseGame();
            else if(e.code === 'Enter') resumeGame();
    }

    keyup = (e) => {
        if (    e.code === 'KeyS'||
                e.code === 'KeyW'||
                e.code === 'KeyA'||
                e.code === 'KeyD'){
            this.keys.splice(this.keys.indexOf(e.code), 1);
        }
    }

    destroyListeners() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keydown", this.keyup);
    }
}

class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50;
        this.height = 50;
        //положение игрока
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        //cкорость игрока
        this.speedX = 0;
        this.speedY = 0;

    }
    draw(context){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }
    update(input, enemies){
        //коллизия
        enemies.forEach(enemy => {
            if (this.x + this.width > enemy.x &&
                this.x < enemy.x + enemy.width &&
                this.y + this.height > enemy.y &&
                this.y < enemy.y + enemy.height){
                gameOver = true;
            }
        })
        //движение
        if (input.keys.indexOf('KeyD') > -1){
            if (input.keys.indexOf('KeyS') > -1){
                this.speedY = 8;
            }else if(input.keys.indexOf('KeyW') > -1){
                this.speedY = -8;
            }else{
                this.speedY = 0;
            }
            this.speedX = 8;
        } else if (input.keys.indexOf('KeyA') > -1){
            if (input.keys.indexOf('KeyS') > -1){
                this.speedY = 8;
            }else if(input.keys.indexOf('KeyW') > -1){
                this.speedY = -8;
            }else{
                this.speedY = 0;
            }
            this.speedX = -8;
        } else if (input.keys.indexOf('KeyW') > -1){
            this.speedY = -8;
            this.speedX = 0;
        } else if (input.keys.indexOf('KeyS') > -1){
            this.speedY = 8;
            this.speedX = 0;
        }else{
            this.speedX = 0;
            this.speedY = 0;
        }
        //движение
        this.x += this.speedX;
        this.y += this.speedY;

        //ограничение движения по вертикали
        if (this.x < 0){this.x = 0;}
        else if (this.x > this.gameWidth - this.width)
        {this.x = this.gameWidth - this.width}
        //ограничение движения по горизонтали
        if (this.y < 0){this.y = 0;}
        else if (this.y > this.gameHeight - this.height)
        {this.y = this.gameHeight - this.height}

        this.secondX = this.x + this.width;
        this.secondY = this.y + this.height;
        this.centerX = (this.x + this.secondX) / 2;
        this.centerY = (this.y + this.secondY) / 2;
    }
    restart(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }
}

class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('backgroundImage');
        this.width = 1920;
        this.height = 880;

        this.x = 0;
        this.y = 0;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
    }
}

class Enemy {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 100;
        this.height = 100;

        this.randX = Math.floor(Math.random() * (this.gameWidth - this.width))
        this.randY = Math.floor(Math.random() * (this.gameHeight - this.height));

        while(
            this.randX > player.centerX - this.width - 200 &&
            this.randX < player.centerX + 200 &&
            this.randY > player.centerY - this.height - 200 &&
            this.randY < player.centerY + 200){
                this.randX = Math.floor(Math.random() * (this.gameWidth - this.width));
                this.randY = Math.floor(Math.random() * (this.gameHeight - this.height));
        }
        this.x = this.randX;
        this.y = this.randY;

        this.speed = 5;
        this.flagToDelete = false;
        this.secondX = this.x + this.width;
        this.secondY = this.y + this.height;
        this.centerX = (this.x + this.secondX) / 2;
        this.centerY = (this.y + this.secondY) / 2;
    }
    draw(context){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        if (this.centerX != player.centerX && this.centerY != player.centerY){
            this.angel = 180*Math.atan2(player.centerX - this.centerX, player.centerY - this.centerY)/Math.PI;
            this.x += this.speed * Math.sin(this.angel * (Math.PI/180));
            this.y += this.speed * Math.cos(this.angel * (Math.PI/180));
        }
    }
}

function handlerEnemies(deltaTime, input){
    if(score > 0){
        if(enemyTimer > enemyInterval){
        //когда таймер доходит до предела,
        //создаем нового врага и сбрасываем таймер до 0
        enemies.push(new Enemy(canvas.width, canvas.height));
        enemyTimer = 0;
        score--;
        } else {
            //отсчет до следующего создания врага
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update();
        });
    }else{
        win = true;
        enemies.length = 0;
        setTimeout(()=>{
            input.destroyListeners();
            resolve(win);
        },3* 1000);
    }
}
let newEnemey = setInterval(() => {
    enemies.shift();
}, 1.3 * 1000);

function displayStatusText(context){
    context.fillStyle = 'black';
    context.font = '40px Leto Text Sans';
    context.textAlign = 'left';
    context.fillText('Time: ' + score, 20, 50);

    if(gameOver){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('Game over, press Space to restart, time to win: ' + score, canvas.width/2, 250);
    }
    if(win){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillText('Victory! Congratulations!', canvas.width/2, 250);
    }
    if (pause){
        context.font = '80px';
        context.fillText('Pause', canvas.width/2, 250);
    }
}
function restartGame(){
    player.restart();
    enemies.length = 0;
    score = limit;
    win = false;
    gameOver = false;
    pause = false;
    animate(0);
}
function pauseGame(){
    pause = true;
}
function resumeGame(){
    pause = false;
    animate(0);
}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);

let lastTime = 0;        //значение времени из предыдущего вызова цикла
let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                         //сбрасывается до нуля при достижении предела
let enemyInterval = 1000;//интервал добавления врага

function animate(timeStamp){
    //разница во времени между предыдущим циклом и текущим
    //сколько времени нужно на отрисовку одного кадра
    //timeStamp время от текущего цикла (создается автоматически)
    const deltaTime = timeStamp - lastTime;
    //меняем значение предыщего цикла на текущий
    //для использования дальше
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);

    player.draw(ctx);
    player.update(input, enemies);

    handlerEnemies(deltaTime, input);

    displayStatusText(ctx);

    if (!gameOver && !win && !pause){
        requestAnimationFrame(animate);
    }
}
animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
}
function test2(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 880;
let enemies = [];
let gates = [];
let score = 0;
let gameOver = false;
let win = false;
let pause = false;

class InputHandler {
    constructor(){
        this.keys = [];
        //использована стрелочная функция чтобы иметь доступ к this родителя
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (e) => {
        if ((       e.code === 'KeyS'||
                    e.code === 'KeyW'||
                    e.code === 'KeyA'||
                    e.code === 'KeyD')
                    && this.keys.indexOf(e.code) === -1){
                this.keys.push(e.code)
            }
            else if(e.code === 'Space') restartGame();
            else if(e.code === 'Escape') pauseGame();
            else if(e.code === 'Enter') resumeGame();
    }

    keyup = (e) => {
        if (    e.code === 'KeyS'||
                e.code === 'KeyW'||
                e.code === 'KeyA'||
                e.code === 'KeyD'){
            this.keys.splice(this.keys.indexOf(e.code), 1);
        }
    }

    destroyListeners() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keydown", this.keyup);
    }
}

class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 200;
        this.height = 200;
        //положение игрока
        this.x = 0;
        this.y = this.gameHeight - this.height;
        //добавление изображения
        this.image = document.getElementById('playerImage');
        //координаты фреймов
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8
        this.fps = 20;       //колличество кадров в секунду
        this.frameTimer = 0; //значение от 0 до интервала кадра в сек
        this.frameInterval = 1000/this.fps; //длительность кадра
        //скорость игрока
        // speed - горизонтальная
        // vy - вертикальная
        this.speed = 0;
        this.vy = 0;
        //коэфициент гравитации
        this.gravity = 1;
    }
    draw(context){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //полное изображение this.image, this.x, this.y, this.width, this.height
        //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//            context.drawImage(this.image,
//                              this.frameX * this.width,
//                              this.frameY * this.height,
//                              this.width, this.height,
//                              this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime, enemies, gate){
        //коллизия - просчет столкновения объектов (на основе кругов)
        enemies.forEach(enemy => {
            if (this.x + this.width > enemy.x &&
                this.x < enemy.x + enemy.width &&
                this.y + this.height > enemy.y &&
                this.y < enemy.y + enemy.height){
                gameOver = true;
            }
        })
//            enemies.forEach(enemy => {
//                let dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
//                let dy = (enemy.y + enemy.height/2) - (this.y + this.width/2);
//                let dist = (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))) + 20;
//                if (dist < enemy.width/2 + this.width/2){
//                    gameOver = true;
//                }
//            })
        gates.forEach(gate => {
            let dx = (gate.x + gate.width/2) - (this.x + this.width/2);
            let dy = (gate.y + gate.height/2) - (this.y + this.width/2);
            let dist = (Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)));
            if (dist < gate.width/2 + this.width/2){
                win = true;
                setTimeout(()=>{
                    input.destroyListeners();
                    resolve(win);
                },3* 1000);
            }
        })
        //анимация по кадрам
//            if (this.frameTimer > this.frameInterval){
//                if(this.frameX >= this.maxFrame){
//                    this.frameX = 0;
//                } else {
//                    this.frameX++;
//                }
//                this.frameTimer = 0;
//            } else {
//                this.frameTimer += deltaTime;
//            }
        //движение
        if (input.keys.indexOf('KeyD') > -1){
            this.speed = 5;
            if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
                this.vy -= 30;
            }
        } else if (input.keys.indexOf('KeyA') > -1){
            this.speed = -5;
            if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
                this.vy -= 30;
            }
        } else if (input.keys.indexOf('KeyW') > -1 && this.onGround()){
            this.vy -= 30;
        } else if (input.keys.indexOf('KeyS') > -1 && !this.onGround()){
            this.vy += this.gravity * 10;
        } else if (input.keys.indexOf('KeyS') > -1 && this.onGround()){
            this.height = 120;
            this.speed = 0;
            this.frameX = 0;
            this.frameY = 0;
        } else {
            this.height = 200;
            this.speed = 0;
        }
        //вертикальное движение
        this.x += this.speed;
        //ограничение движения по вертикали
        if (this.x < 0){this.x = 0;}
        else if (this.x > this.gameWidth - this.width)
        {this.x = this.gameWidth - this.width}

        //горизонтальное движение
        this.y += this.vy;
        //гравитация
        if (!this.onGround()){
            this.vy += this.gravity;
            this.maxFrame =  5;
            this.frameY = 1;
        } else {
            this.vy = 0;
            this.maxFrame =  8;
            this.frameY = 0;
        }
        //ограничение движения по горизонтали
        //создание "земли"
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height
    }
    onGround(){
        return this.y >= this.gameHeight - this.height
    }
    restart(){
        this.x = 0;
        this.y = this.gameHeight - this.height;
    }
}

class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('backgroundImage');
        this.width = 1920;
        this.height = 880;

        this.x = 0;
        this.y = 0;
        this.speed = 20;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
    }
    update(){
        this.x -= this.speed;
        if (this.x < 0 - this.width){
            this.x = 0;
        }
    }
    restart(){
        this.x = 0;
        this.y = 0;
        this.speed = 20;
    }
}

class Enemy {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImage');
        this.width = 160;
        this.height = 119;

        this.randY = Math.floor(Math.random() * ((this.gameHeight - this.height)-(this.gameHeight/2)) + (this.gameHeight/2));

        while(
            this.randY > canvas.height *(3/4) - this.height- 50 &&
            this.randY < canvas.height *(3/4) + 50){
                this.randY = Math.floor(Math.random() * ((this.gameHeight - this.height)-(this.gameHeight/2)) + (this.gameHeight/2));
        }
        this.x = this.gameWidth;
        this.y = this.randY;

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;   //колличесво кадров в изображении
        this.fps = 20;       //колличество кадров в секунду
        this.frameTimer = 0; //значение от 0 до интервала кадра в сек
        this.frameInterval = 1000/this.fps; //длительность кадра
        this.speed = 8;
        this.flagToDelete = false;
    }
    draw(context){
//            ctx.fillStyle = "pink";
//            ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height);
//
//            ctx.fillStyle = "yellow";
//            ctx.fillRect(0, (canvas.height *(3/4)) - 50, canvas.width, 100);
//            canvas.x + (canvas.height *(3/4)) + 50

        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //полное изображение this.image, this.x, this.y, this.width, this.height
        //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//            context.drawImage(this.image,
//                              this.frameX * this.width,
//                              0,
//                              this.width, this.height,
//                              this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        //переключение кадров
        if (this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame){
                this.frameX = 0;
            } else {
                this.frameX++;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        //помечаем пройденных врагов
        if (this.x < 0 - this.width){
            this.flagToDelete = true;
            score++;
        }
    }
}

function handlerEnemies(deltaTime){
    if (score < 3){
    if(enemyTimer > enemyInterval + randomEnemyInterval){
        //когда таймер доходит до предела,
        //создаем нового врага и сбрасываем таймер до 0
        enemies.push(new Enemy(canvas.width, canvas.height));

        randomEnemyInterval = Math.random() * 1000 + 500;
        enemyTimer = 0;
    } else {
        //отсчет до следующего создания врага
        enemyTimer += deltaTime;
    }
    enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.update(deltaTime);
    });
    //оставляем в массиве только не отмеченных врагов
    enemies = enemies.filter(enemy => !enemy.flagToDelete)
    } else {
        enemies = enemies.filter(enemy => enemy.flagToDelete)
        handlerGate();
    }
}

class Gate {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('gateImage');
        this.width = 160;
        this.height = 119;

        this.x = this.gameWidth;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;   //колличесво кадров в изображении
        this.fps = 20;       //колличество кадров в секунду
        this.frameTimer = 0; //значение от 0 до интервала кадра в сек
        this.frameInterval = 1000/this.fps; //длительность кадра
    }
    draw(context){
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //полное изображение this.image, this.x, this.y, this.width, this.height
        //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//                    context.drawImage(this.image,
//                                      this.frameX * this.width,
//                                      0,
//                                      this.width, this.height,
//                                      this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        //переключение кадров
        if (this.frameTimer > this.frameInterval){
            if(this.frameX >= this.maxFrame){
                this.frameX = 0;
            } else {
                this.frameX++;
            }
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x --;
    }
}

function handlerGate(deltaTime){
    gate.draw(ctx);
    gate.update(deltaTime);
}

function displayStatusText(context){
    context.textAlign = 'left';
    context.fillStyle = 'black';
    context.font = '40px Leto Text Sans';
    context.fillText('Score: ' + score, 20, 50);
    if(gameOver){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillText('Game over, press Space to restart, your score: ' + score, canvas.width/2, 250);
    }
    if(win){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillText('Victory! Congratulations!', canvas.width/2, 250);
    }
    if(pause){
        context.font = '80px';
        context.fillText('Pause', canvas.width/2, 250);
    }
}

function restartGame(){
    player.restart();
    enemies.length = 0;
    score = 0;
    win = false;
    gameOver = false;
    animate(0);
}
function pauseGame(){
    pause = true;
}
function resumeGame(){
    pause = false;
    animate(0);
}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);
const gate = new Gate(canvas.width, canvas.height);
gates.push(gate);

let lastTime = 0;        //значение времени из предыдущего вызова цикла
let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                         //сбрасывается до нуля при достижении предела
let enemyInterval = 600;//интервал добавления врага
let randomEnemyInterval = Math.random() * 1000 + 700;

function animate(timeStamp){
    //разница во времени между предыдущим циклом и текущим
    //сколько времени нужно на отрисовку одного кадра
    //timeStamp время от текущего цикла (создается автоматически)
    const deltaTime = timeStamp - lastTime;
    //меняем значение предыщего цикла на текущий
    //для использования дальше
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();

    player.draw(ctx);
    player.update(input, deltaTime, enemies);

    handlerEnemies(deltaTime);

    displayStatusText(ctx);

    if (!gameOver && !win && !pause){
        requestAnimationFrame(animate);
    }
}
animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
}
function test3(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 880;
let win = false;
let pause = false;

class InputHandler {
    constructor(){
        this.keys = [];
        //использована стрелочная функция чтобы иметь доступ к this родителя
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (e) => {
        if ((       e.code === 'KeyS'||
                    e.code === 'KeyW'||
                    e.code === 'KeyA'||
                    e.code === 'KeyD')
                    && this.keys.indexOf(e.code) === -1){
                this.keys.push(e.code)
            }
            else if(e.code === 'Space') restartGame();
            else if(e.code === 'Escape') pauseGame();
            else if(e.code === 'Enter') resumeGame();
    }

    keyup = (e) => {
        if (    e.code === 'KeyS'||
                e.code === 'KeyW'||
                e.code === 'KeyA'||
                e.code === 'KeyD'){
            this.keys.splice(this.keys.indexOf(e.code), 1);
        }
    }

    destroyListeners() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keydown", this.keyup);
    }
}
class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 10;
        this.height = 10;
        //положение игрока
        this.x = 10;
        this.y = this.gameHeight - this.height - 10;

        //скорость игрока
        // speed - горизонтальная
        // vy - вертикальная
        this.speed = 0;
        this.vy = 0;
        //коэфициент гравитации
        this.gravity = 1;

        this.secondX = this.x + this.width;
        this.secondY = this.y + this.height;
    }
    restart(){
        this.x = 10;
        this.y = this.gameHeight - this.height - 10;
    }
    draw(context){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update(input){
        //движение
        if (input.keys.indexOf('KeyD') > -1){
            this.vy = 0;
            this.speed = 3;
        } else if (input.keys.indexOf('KeyA') > -1){
            this.vy = 0;
            this.speed = -3;
        } else if (input.keys.indexOf('KeyW') > -1){
            this.vy = -3;
            this.speed = 0;
        } else if (input.keys.indexOf('KeyS') > -1){
            this.vy = 3;
            this.speed = 0;
        } else {
            this.speed = 0;
            this.vy = 0;
        }
        mouseHandler();

        this.secondX = this.x + this.width;
        this.secondY = this.y + this.height;
        this.centerX = (this.x + this.secondX) / 2;
        this.centerY = (this.y + this.secondY) / 2;

        //движение
        this.x += this.speed;
        this.y += this.vy;

        if (checkForCollision()){
            this.x -= this.speed;
            this.y -= this.vy;
        }
    }
}
class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('backgroundImage3');
        this.width = 1920;
        this.height = 880;

        this.x = 0;
        this.y = 0;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
        ctx.fillStyle="#333";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
function mouseHandler(e){
    ctx.save();
    ctx.beginPath();
    ctx.arc(player.centerX,player.centerY,200,0,Math.PI/180*360);
    ctx.clip();
    ctx.drawImage(background.image,0,0,canvas.width,canvas.height);
    player.draw(ctx);
    ctx.restore();
}
//коллизия стен лабиринта
function checkForCollision() {
    // Перебираем все пиксели лабиринта и инвертируем их цвет
    let imgData = ctx.getImageData(player.x-1, player.y-1, 10+2, 10+2);
    let pixels = imgData.data;

    // Получаем данные для одного пикселя
    for (let i = 0; i < pixels.length; i += 4) {
      let red = pixels[i];
      let green = pixels[i+1];
      let blue = pixels[i+2];
      let alpha = pixels[i+3];

      // Смотрим на наличие черного цвета стены,
      // что указывает на столкновение
      if (red == 0 && green == 0 && blue == 0) {
        return true;
      }

      // Смотрим на наличие red цвета краев,
      // что указывает на столкновение
      if (red == 255 && green == 0 && blue == 0) {
        win = true;
        setTimeout(() => {
            input.destroyListeners();
            resolve(win);
        }, 3 * 1000)
      }
    }
    return false;
}
//текст победы
function displayStatusText(context){
    context.font = '40px Leto Text Sans';
    if(win){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillText('Victory! Congratulations!', canvas.width/2, 250);
    }
    if (pause){
        context.fillStyle = 'white';
        context.fillText('Pause', canvas.width/2, 250);
    }
}
function restartGame(){
    player.restart();
    win = false;
    gameOver = false;
    pause = false;
    animate(0);
}
function pauseGame(){
    pause = true;
}
function resumeGame(){
    pause = false;
    animate(0);
}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw(ctx);

    player.draw(ctx);
    player.update(input);

    displayStatusText(ctx);

    if(!win && !pause){
        requestAnimationFrame(animate);
    }
}
animate();
}
function test4(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 880;
let enemies = [];
let fuels = [];
let planetArr = [];
let playerArr = [];
enemies.length = 0;
fuels.length = 0;
planetArr.length = 0;

let gameOver = false;
let win = false;
let pause = false;
let score = 1000;
let turbo = 0;
let limit = 10;
let timer = limit;

class InputHandler {
    constructor(){
        this.keys = [];
        //использована стрелочная функция чтобы иметь доступ к this родителя
        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
    }

    keydown = (e) => {
        if ((       e.code === 'KeyS'||
                    e.code === 'KeyW'||
                    e.code === 'KeyA'||
                    e.code === 'KeyD'||
                    e.code === 'ShiftLeft')
                    && this.keys.indexOf(e.code) === -1){
                this.keys.push(e.code)
            }
            else if(e.code === 'Space') restartGame();
            else if(e.code === 'Escape') pauseGame();
            else if(e.code === 'Enter') resumeGame();
    }

    keyup = (e) => {
        if (    e.code === 'KeyS'||
                e.code === 'KeyW'||
                e.code === 'KeyA'||
                e.code === 'KeyD'||
                e.code === 'ShiftLeft'){
            this.keys.splice(this.keys.indexOf(e.code), 1);
        }
    }

    destroyListeners() {
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keydown", this.keyup);
    }
}

class Player {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 50;
        this.height = 50;
        //положение игрока
        this.x = this.gameWidth/2;
        this.y = this.gameHeight/2;
        //добавление изображения
        this.image = document.getElementById('playerImage');
        //координаты фреймов
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8
        this.fps = 20;       //колличество кадров в секунду
        this.frameTimer = 0; //значение от 0 до интервала кадра в сек
        this.frameInterval = 1000/this.fps; //длительность кадра
        //скорость игрока
        // speed - горизонтальная
        // vy - вертикальная
        this.speed = 0;
        this.vy = 0;
        //коэфициент гравитации
        this.gravity = 5;
    }
    draw(context){

        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        //полное изображение this.image, this.x, this.y, this.width, this.height
        //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
//            context.drawImage(this.image,
//                              this.frameX * this.width,
//                              this.frameY * this.height,
//                              this.width, this.height,
//                              this.x, this.y, this.width, this.height);
    }
    update(input, deltaTime){
        //коллизия - просчет столкновения объектов (на основе кругов)
        enemies.forEach(enemy => {
            if (this.x + this.width > enemy.x &&
                this.x < enemy.x + enemy.width &&
                this.y + this.height > enemy.y &&
                this.y < enemy.y + enemy.height){
                gameOver = true;
            }
        })
        fuels.forEach(fuel => {
            if (this.x + this.width > fuel.x &&
                this.x < fuel.x + fuel.width &&
                this.y + this.height > fuel.y &&
                this.y < fuel.y + fuel.height){
                score += 1000;
                fuel.flagToDelete = true;
            }
        })

        if(this.y + this.height == this.gameHeight){
           gameOver = true;
        }
        planetArr.forEach(planet => {
            if (this.x + this.width > planet.x &&
                this.x < planet.x + planet.width &&
                this.y + this.height > planet.y &&
                this.y < planet.y + planet.height){
                win = true;
                setTimeout(() => {
                    input.destroyListeners();
                    resolve(win);
                }, 3 * 1000)
            }
        })
        //анимация по кадрам
//            if (this.frameTimer > this.frameInterval){
//                if(this.frameX >= this.maxFrame){
//                    this.frameX = 0;
//                } else {
//                    this.frameX++;
//                }
//                this.frameTimer = 0;
//            } else {
//                this.frameTimer += deltaTime;
//            }
        //движение
        if (input.keys.indexOf('KeyD') > -1){
            this.speed = 8;
            this.vy = 0;
            if (input.keys.indexOf('KeyW') > -1){
                this.vy = -10;
            } else if (input.keys.indexOf('KeyS') > -1){
                this.vy = 10;
            }
        } else if (input.keys.indexOf('KeyA') > -1){
            this.speed = -8;
            this.vy = 0;
            if (input.keys.indexOf('KeyW') > -1){
                this.vy = -10;
            } else if (input.keys.indexOf('KeyS') > -1){
                this.vy = 10;
            }
        } else if (input.keys.indexOf('KeyW') > -1){
            this.vy = -10;
        } else if (input.keys.indexOf('KeyS') > -1){
            this.vy = 10;
        } else {
            this.speed = 0;
            this.vy = 0;
        }
        //вертикальное движение
        this.x += this.speed;
        //ограничение движения по горизонтали
        if (this.x < 0)
            this.x = 0;
        else if (this.x > this.gameWidth - this.width)
            this.x = this.gameWidth - this.width

        //горизонтальное движение
        this.y += this.vy;
        //гравитация
        this.y += this.gravity;

        //ограничение движения по вертикали
        if (this.y < 0)
            this.y = 0;
        else if (this.y > this.gameHeight - this.height)
            this.y = this.gameHeight - this.height;
    }
    restart(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }
}
function handlerPlayer(){
    player.draw(ctx);
    player.update(input);
}

class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('backgroundImage');
        this.width = 1920;
        this.height = 880;

        this.x = 0;
        this.y = 0;
        this.speed = 20;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y - this.height + this.speed, this.width, this.height);
        context.drawImage(this.image, this.x, this.y + this.height - this.speed, this.width, this.height);
    }
    update(){
        this.y += this.speed;
        if (this.y == this.height){
            this.y = 0;
        }
    }
}

class Planet {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImage');

        this.radius = this.gameWidth/2;
        this.width = this.gameWidth/2;
        this.height = this.gameWidth/2;

        this.x = 0;
        this.y = 0-this.height;

        this.speed = 1;
    }
    draw(context){

        context.arc(this.x + this.radius, this.y, this.radius, 0, Math.PI, false);
        context.fillStyle = "yellow";
        context.fill();

    }
    update(){
        this.y++;
    }
}
function handlerPlanet(){
    planet.draw(ctx);
    planet.update();
}

class Enemy {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImage');
        this.width = 100;
        this.height = 100;

        this.x = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
        this.y = (Math.floor(Math.floor(Math.random()*(1500-0+1)+0) / 100) * 100) - 1500;

        this.speed = 8;
        this.flagToDelete = false;
    }
    draw(context){
        context.fillStyle = "red"
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update(){

        this.y += this.speed;
        //помечаем пройденных врагов
        if (this.y > 0 + this.gameHeight){
            this.flagToDelete = true;
        }
    }
}
class Fuel {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.image = document.getElementById('enemyImage');
        this.width = 100;
        this.height = 100;

        this.randX = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
        this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;

        enemies.forEach(enemy => {
            while(
                this.randX + this.width > enemy.x &&
                this.randX < enemy.x + enemy.width &&
                this.randY + this.height > enemy.y &&
                this.randY < enemy.y + enemy.height) {

            this.randX = Math.floor(Math.floor(Math.random() * (this.gameWidth-this.width)) / 100) * 100;
            this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;


        } })
        this.x = this.randX;
        this.y = this.randY;

        this.speed = 8;
        this.flagToDelete = false;
    }
    draw(context){
        context.fillStyle = "aqua"
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    update(){

        this.y += this.speed;
        //помечаем пройденных врагов
        if (this.y > 0 + this.gameHeight){
            this.flagToDelete = true;
        }
    }
}


function handlerEnemies(deltaTime){
    if(timer > 0){
    if(enemyTimer > enemyInterval){
        //когда таймер доходит до предела,
        //создаем нового врага и сбрасываем таймер до 0
        for(let i = 0; i <  Math.floor(Math.random() * (15 - 12))+12; i++){
            enemies.push(new Enemy(canvas.width, canvas.height));
        }
        for(let i = 0; i < 3; i++){
            fuels.push(new Fuel(canvas.width, canvas.height));
        }
        enemyTimer = 0;

    } else {
        //отсчет до следующего создания врага
        enemyTimer += deltaTime;
    }
    enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.update(deltaTime);
    });
    fuels.forEach(fuel => {
        fuel.draw(ctx);
        fuel.update(deltaTime);
    });

    //оставляем в мессиве только не отмеченных врагов
    enemies = enemies.filter(enemy => !enemy.flagToDelete);
    fuels = fuels.filter(fuel => !fuel.flagToDelete);
    }else{
        handlerPlanet();
        enemies.length = 0;
        fuels.length = 0;
        planetArr.push(planet);
    }
}

function displayStatusText(context){
    context.fillStyle = 'black';
    context.font = '60px Leto Text Sans';

    context.textAlign = 'left';
    context.fillText('Fuel: ' + score, 20, 50);

    context.textAlign = 'center';
    context.fillText('Turbo: ' + turbo + '%',(canvas.width/2) + 20, 50);

    context.textAlign = 'right';
    context.fillText('Time: ' + timer, canvas.width - 20, 50);

    if(gameOver){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('Game over, press Space to restart, time to win: ' + timer, canvas.width/2, 250);
    }
    if(win){
        context.fillStyle = '#333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText('Victory! Congratulations!', canvas.width/2, 250);
    }else if (pause){
        context.font = '80px';
        context.fillText('Pause', (canvas.width/2)+40, 250);
    }
}

function restartGame(){
    player.restart();
    enemies.length = 0;
    fuels.length = 0;
    planetArr.length = 0;
    timer = limit;
    score = 1000;
    turbo = 0;
    win = false;
    gameOver = false;
    pause = false;
    animate(0);
}
function pauseGame(){
    pause = true;
}
function resumeGame(){
    pause = false;
    animate(0);
}

let limitFuel = setInterval(() => {
    score -= 10;
    if(score <= 0){
        score = 0;
        gameOver = true;
    }
}, 0.08 * 1000);

let timeToStop = setInterval( () =>{
    timer--;
    if (timer <= 0){
        timer = 0;
    }
}, 1 * 1000);

let collectTurbo = setInterval( () =>{
    if (turbo < 100){
        turbo += 20;
    } else{
        turbo = 100;
    }
}, 1 * 1000);

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const background = new Background(canvas.width, canvas.height);
const planet = new Planet(canvas.width, canvas.height);

let lastTime = 0;        //значение времени из предыдущего вызова цикла
let enemyTimer = 0;      //значение нудя до предела (enemyInterval)
                         //сбрасывается до нуля при достижении предела
let enemyInterval = 2500;//интервал добавления врага
let randomEnemyInterval = Math.random() * 1000 + 500;

function animate(timeStamp){
    //разница во времени между предыдущим циклом и текущим
    //сколько времени нужно на отрисовку одного кадра
    //timeStamp время от текущего цикла (создается автоматически)
    const deltaTime = timeStamp - lastTime;
    //меняем значение предыщего цикла на текущий
    //для использования дальше
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();

    handlerEnemies(deltaTime);

    if (input.keys.indexOf('ShiftLeft') > -1 && turbo == 100){
        playerArr.length = 0;
        player.y -= 200;
        turbo = 0;

    } else {
        playerArr.push(player);
        handlerPlayer();
    }

    displayStatusText(ctx);

    if (!gameOver && !win && !pause){
        requestAnimationFrame(animate);
    }
}
animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
}
