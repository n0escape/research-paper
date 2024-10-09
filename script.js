const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const window_width = window.innerWidth;
const window_height = window.innerHeight;

canvas.width = window_width;
canvas.height = window_height;

var current = 0;
var musicPlaying = false;
var music = document.getElementById("myPlayer");
$("#myPlayer").bind("ended", function(){
    current++;
    music.src = "./audio/" + current%6 + ".mp3";
    music.load();
    music.play();
});

const sound = document.getElementById('sound');

class Circle {
        constructor(xpoint, ypoint, radius, color) {
            this.xpoint = xpoint;
            this.ypoint = ypoint;
            this.radius = radius;
            this.color = color;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.xpoint, this.ypoint, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        changeColor(newcolor){
            this.color = newcolor;
            this.draw(ctx);
        }

        clickCircle(xmouse, ymouse){
            const distance =
            Math.sqrt(
            ( ( xmouse - this.xpoint ) * ( xmouse - this.xpoint ) )
            +
            ( ( ymouse - this.ypoint ) * ( ymouse - this.ypoint ) )
            );

            if(distance < this.radius) {
                this.changeColor('#f65');
                return true;
            } else {
                return false;
            }
        }

        removeClick(){
            this.changeColor('red');
            return true;
        }
    }

class Button {
    constructor(xpoint, ypoint, buttonWidth, buttonHeight, color) {
        this.xpoint = xpoint;
        this.ypoint = ypoint;
        this.buttonWidth = buttonWidth;
        this.buttonHeight = buttonHeight;
        this.color = color;
    }

    draw(context) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xpoint, this.ypoint, this.buttonWidth, this.buttonHeight, false);
    }
}

window.addEventListener('load', menu = () => {
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let circle = new Circle(canvas.width/2, canvas.height/2, 200, 'red');

    circle.draw(ctx);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'Black';
    ctx.font = "40px Arial";
    ctx.fillText('Почати', canvas.width/2,  canvas.height/2);

    canvas.addEventListener('mousedown', click = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        circle.clickCircle(x, y);

        const distance =
            Math.sqrt(
            ( Math.pow( ( x - circle.xpoint ), 2) )
            +
            ( Math.pow( ( y - circle.ypoint ), 2) )
        );

        if(distance < circle.radius) {
            removeListeners();
            gamestart();

        }

    });

    canvas.addEventListener('mouseup', removeClick = (event) =>{
        circle.removeClick();
    });

    canvas.addEventListener('mousemove', hover = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const distance =
            Math.sqrt(
            ( Math.pow( ( x - circle.xpoint ), 2) )
            +
            ( Math.pow( ( y - circle.ypoint ), 2) )
        );
        if(distance < circle.radius) {
            circle.changeColor('yellow');
            ctx.fillStyle = "#555";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            circle.radius = 190;
            circle.draw(ctx);
            ctx.textAlign = 'center';
            ctx.fillStyle = 'Black';
            ctx.font = "40px Arial";
            ctx.fillText('Почати', canvas.width/2,  canvas.height/2);
        } else {
            circle.changeColor('red');
            circle.radius = 200;
            ctx.textAlign = 'center';
            ctx.fillStyle = 'Black';
            ctx.font = "40px Arial";
            ctx.fillText('Почати', canvas.width/2,  canvas.height/2);
        }
    });
});

function gamestart(){
    const Promise1 = new Promise(function(resolve){

        const video = document.getElementById('video1');

        video.play();

        unmuteButton.addEventListener('click', soundBtn, false);

        function soundBtn() {
            if(video.muted){
                video.muted = false;
                sound.setAttribute('src', './img/volume.png')
            } else {
                video.muted = true;
                sound.setAttribute('src', './img/mute.png')

            }
        }

        video.addEventListener('play', function(){
            draw(this,ctx,canvas.width,canvas.height);
            unmuteButton.style.display = "";
        },false);

        function draw(video,canvas,w,h) {
            if(video.paused || video.ended){
                unmuteButton.style.display = "none";
                sound.setAttribute('src', './img/mute.png')
                resolve(true);
                unmuteButton.removeEventListener('click', soundBtn, false);
                return false;
            }else{
                canvas.drawImage(video,0,0,w,h);
                setTimeout(draw,20,video,canvas,w,h);
            }
        }

    });
    Promise1.then(value1=>{
        if(value1){
            rule1();
            const Promise2 = new Promise(function(resolve){
                    setTimeout(()=>{
                        let enemies = [];
                        let pauseButtons = [];
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
                                this.image = document.getElementById('playerImage1');
                                this.width = 100;
                                this.height = 100;
                                //положение игрока
                                this.x = canvas.width/2;
                                this.y = canvas.height/2;
                                //cкорость игрока
                                this.speedX = 0;
                                this.speedY = 0;

                            }
                            draw(ctx){
                                ctx.drawImage(this.image,
                                                  0,
                                                  0,
                                                  this.width, this.height,
                                                  this.x, this.y, this.width, this.height);

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
                                this.image = document.getElementById('backgroundImage1');

                                this.x = 0;
                                this.y = 0;
                            }
                            draw(ctx){
                                ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
                            }
                        }

                        class Enemy {
                            constructor(gameWidth, gameHeight){
                                this.gameWidth = gameWidth;
                                this.gameHeight = gameHeight;
                                this.image = document.getElementById('enemyImage1');
                                this.width = 150;
                                this.height = 105;

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

                                this.frameX = 0;
                                this.frameY = 0;
                                this.maxFrame = 4;   //колличесво кадров в изображении
                                this.fps = 20;       //колличество кадров в секунду
                                this.frameTimer = 0; //значение от 0 до интервала кадра в сек
                                this.frameInterval = 1000/this.fps; //длительность кадра
                            }
                            draw(ctx){
                                ctx.drawImage(this.image,
                                                  this.frameX * this.width,
                                                  0,
                                                  this.width, this.height,
                                                  this.x, this.y, this.width, this.height);
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
                                //движение + направление
                                if (this.centerX != player.centerX && this.centerY != player.centerY){
                                    this.angel = 180*Math.atan2(player.centerX - this.centerX, player.centerY - this.centerY)/Math.PI;
                                    this.x += this.speed * Math.sin(this.angel * (Math.PI/180));
                                    this.y += this.speed * Math.cos(this.angel * (Math.PI/180));
                                }
                            }
                        }

                        canvas.addEventListener('mousedown', click = (event) =>{
                            const rect = canvas.getBoundingClientRect();
                            const x = event.clientX - rect.left;
                            const y = event.clientY - rect.top;

                            if(x < buttonPause.xpoint + buttonPause.buttonWidth &&
                               x > buttonPause.xpoint &&
                               y < buttonPause.ypoint + buttonPause.buttonHeight &&
                               y > buttonPause.buttonHeight) {
                                pauseGame();
                            }
                        });

                        function handlerEnemies(deltaTime){
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
                                    enemy.update(deltaTime);
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

                        function callRule(){
                            rule1();

                            let resume = new Button( 50, 50, canvas.width * .07, canvas.width * .04, 'blue' );

                            resume.draw(ctx);
                            ctx.fillStyle = 'black';
                            ctx.font = '20px Leto Text Sans';
                            ctx.fillText('Resume', 85, 80);

                            canvas.addEventListener('mousedown', click = (event) =>{
                                const rect = canvas.getBoundingClientRect();
                                const x = event.clientX - rect.left;
                                const y = event.clientY - rect.top;
                                if(x < resume.xpoint + resume.buttonWidth &&
                                   x > resume.xpoint &&
                                   y < resume.ypoint + resume.buttonHeight &&
                                   y > resume.ypoint) {
                                    callRemoveEvent();
                                    resumeGame();
                                }
                            });
                        }

                        function callSettings(){
                            settings();

                            let resume = new Button( (canvas.width/2) - 100, canvas.height * .37, 200, canvas.width * .04, 'blue' );

                            resume.draw(ctx);
                            ctx.fillStyle = 'black';
                            ctx.fillText('Продовжити', canvas.width/2, canvas.height * .4, canvas.width);

                            canvas.addEventListener('mousedown', click = (event) =>{
                                const rect = canvas.getBoundingClientRect();
                                const x = event.clientX - rect.left;
                                const y = event.clientY - rect.top;
                                if(x < resume.xpoint + resume.buttonWidth &&
                                   x > resume.xpoint &&
                                   y < resume.ypoint + resume.buttonHeight &&
                                   y > resume.ypoint) {
                                    callRemoveEvent();
                                    resumeGame();
                                }
                            });
                        }

                        function callRemoveEvent(){
                            removeListeners();
                        }

                        function pauseTab(){
                            ctx.fillStyle = 'rgba(255, 255, 51, .5)';
                            ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
                            ctx.fillStyle = 'black';
                            ctx.textAlign = 'center';
                            ctx.font = '3vh Leto Text Sans';
                            ctx.fillText('Пауза', canvas.width/2, canvas.height * .25, canvas.width - 20 );

                            let resume = new Button( (canvas.width/2) - 100, canvas.height * .3, 200, canvas.width * .04, 'blue');
                            let rule = new Button( (canvas.width/2) - 100, canvas.height * .4, 200, canvas.width * .04, 'green');
                            let settings = new Button( (canvas.width/2) - 100, canvas.height * .5, 200, canvas.width * .04, 'green');
                            let escape = new Button( (canvas.width/2) - 100, canvas.height * .6, 200, canvas.width * .04, 'pink');

                            resume.draw();
                            rule.draw();
                            settings.draw();
                            escape.draw();

                            ctx.fillStyle = 'black';
                            ctx.fillText('Продовжити', canvas.width/2, canvas.height * .35);
                            ctx.fillText('Правила', canvas.width/2, canvas.height * .45);
                            ctx.fillText('Налаштування', canvas.width/2, canvas.height * .55);
                            ctx.fillText('Вихід', canvas.width/2, canvas.height * .65);

                            pauseButtons.push(resume, rule, settings, escape);

                            canvas.addEventListener('mousedown', click = (event) =>{
                                const rect = canvas.getBoundingClientRect();
                                const x = event.clientX - rect.left;
                                const y = event.clientY - rect.top;

                                if(x < resume.xpoint + resume.buttonWidth &&
                                   x > resume.xpoint &&
                                   y < resume.ypoint + resume.buttonHeight &&
                                   y > resume.ypoint) {
                                    callRemoveEvent();
                                    resumeGame();
                                    buttonPause.color = 'blue';
                                    buttonPause.draw(ctx);
                                }
                                if(x < rule.xpoint + rule.buttonWidth &&
                                   x > rule.xpoint &&
                                   y < rule.ypoint + rule.buttonHeight &&
                                   y > rule.ypoint){
                                    callRemoveEvent();
                                    callRule();
                                }
                                if(x < settings.xpoint + settings.buttonWidth &&
                                   x > settings.xpoint &&
                                   y < settings.ypoint + settings.buttonHeight &&
                                   y > settings.ypoint){
                                    callRemoveEvent();
                                    callSettings();
                                }
                                if(x < escape.xpoint + escape.buttonWidth &&
                                   x > escape.xpoint &&
                                   y < escape.ypoint + escape.buttonHeight &&
                                   y > escape.ypoint){
                                    callRemoveEvent();
                                    input.destroyListeners();
                                    menu();
                                }
                            });
                        }

                        function displayStatusText(ctx){
                            ctx.fillStyle = 'aqua';
                            ctx.font = '40px Leto Text Sans';
                            ctx.textAlign = 'left';
                            ctx.fillText('Секунд до перемоги: ' + score, 20, 50);

                            if(gameOver){
                                ctx.fillStyle = '#333';
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.textAlign = 'center';
                                ctx.fillStyle = 'white';
                                ctx.fillText('Кінець гри, натисність Space для перезапуску рівня, час до перемоги: ' + score, canvas.width/2, 250, canvas.width - 20);
                            }
                            if(win){
                                ctx.fillStyle = '#333';
                                ctx.fillRect(0, 0, canvas.width, ctx.height);
                                ctx.textAlign = 'center';
                                ctx.fillStyle = 'white';
                                ctx.fillRect(this.x, this.y, this.width, this.height);
                                ctx.fillText('Перемога! Вітаємо!', canvas.width/2, 250);
                            }
                            if (pause){
                                pauseTab();
                            }
                        }

                        function pauseGame(){
                            pause = true;
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

                        function resumeGame(){
                            pause = false;
                            ctx.globalAlpha = 1;
                            animate(0);
                        }

                        const input = new InputHandler();
                        const player = new Player(canvas.width, canvas.height);
                        const background = new Background(canvas.width, canvas.height);
                        const buttonPause = new Button(canvas.width - 100, 50, 50, 50, 'blue');

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

                            buttonPause.draw(ctx);
                            ctx.fillStyle = 'black';
                            ctx.textAlign = 'center';
                            ctx.font = '22px Leto Text Sans';
                            ctx.fillText('Pause', canvas.width - 75, 80);

                            handlerEnemies(deltaTime, input);

                            displayStatusText(ctx);

                            if (!gameOver && !win && !pause){
                                requestAnimationFrame(animate);
                            }
                        }
                        animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0;
                    }, 10 * 1000)
            });

            Promise2.then(value2=>{
                if(value2){
                    const Promise3 = new Promise(function(resolve){
                        const video = document.getElementById('video2');

                        video.play();

                        unmuteButton.addEventListener('click', soundBtn, false);

                        function soundBtn() {
                            if(video.muted){
                                video.muted = false;
                                sound.setAttribute('src', './img/volume.png')
                            } else {
                                video.muted = true;
                                sound.setAttribute('src', './img/mute.png')

                            }
                        }

                        video.addEventListener('play', function(){
                            draw(this,ctx,canvas.width,canvas.height);
                            unmuteButton.style.display = "";
                        },false);

                        function draw(video,canvas,w,h) {
                            if(video.paused || video.ended){
                                unmuteButton.style.display = "none";
                                sound.setAttribute('src', './img/mute.png')
                                resolve(true);
                                unmuteButton.removeEventListener('click', soundBtn, false);
                                return false;
                            }else{
                                canvas.drawImage(video,0,0,w,h);
                                setTimeout(draw,20,video,canvas,w,h);
                            }
                        }

                    });

                    Promise3.then(value3=>{
                        if(value3){
                            rule2();
                            const Promise4 = new Promise(function(resolve){
                                setTimeout(()=>{
                                    let enemies = [];
                                    let gates = [];
                                    let pauseButtons = [];
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
                                            this.width = 130;
                                            this.height = 160;
                                            //положение игрока
                                            this.x = 0;
                                            this.y = this.gameHeight - this.height;
                                            //добавление изображения
                                            this.image = document.getElementById('playerImage2');
                                            //координаты фреймов
                                            this.frameX = 0;
                                            this.frameY = 0;
                                            this.maxFrame = 8;
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
                                        draw(ctx){
                                            //полное изображение this.image, this.x, this.y, this.width, this.height
                                            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
                                            ctx.drawImage(this.image,
                                                          this.frameX * this.width,
                                                          this.frameY * this.height,
                                                          this.width, this.height,
                                                          this.x, this.y, this.width, this.height);
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
                                                this.speed = 0;
                                            } else {
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
                                            } else {
                                                this.vy = 0;
                                                this.maxFrame =  8;
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
                                            this.image = document.getElementById('backgroundImage2');
                                            this.width = this.gameWidth;
                                            this.height = this.gameHeight;

                                            this.x = 0;
                                            this.y = 0;
                                            this.speed = 20;
                                        }
                                        draw(ctx){
                                            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                                            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
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
                                            this.image = document.getElementById('enemyImage2');
                                            this.width = 160;
                                            this.height = 120;

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
                                            this.maxFrame = 4;   //колличесво кадров в изображении
                                            this.fps = 20;       //колличество кадров в секунду
                                            this.frameTimer = 0; //значение от 0 до интервала кадра в сек
                                            this.frameInterval = 1000/this.fps; //длительность кадра
                                            this.speed = 8;
                                            this.flagToDelete = false;
                                        }
                                        draw(ctx){
                                            //полное изображение this.image, this.x, this.y, this.width, this.height
                                            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
                                            ctx.drawImage(this.image,
                                                              this.frameX * this.width,
                                                              0,
                                                              this.width, this.height,
                                                              this.x, this.y, this.width, this.height);
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

                                    class Gate {
                                        constructor(gameWidth, gameHeight){
                                            this.gameWidth = gameWidth;
                                            this.gameHeight = gameHeight;
                                            this.image = document.getElementById('finishImage2');
                                            this.width = 200;
                                            this.height = 200;

                                            this.x = this.gameWidth;
                                            this.y = this.gameHeight - this.height;
                                            this.frameX = 0;
                                            this.frameY = 0;
                                            this.maxFrame = 3;   //колличесво кадров в изображении
                                            this.fps = 20;       //колличество кадров в секунду
                                            this.frameTimer = 0; //значение от 0 до интервала кадра в сек
                                            this.frameInterval = 1000/this.fps; //длительность кадра
                                        }
                                        draw(ctx){
                                            //полное изображение this.image, this.x, this.y, this.width, this.height
                                            //обрезаем изображение по фрейму this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height
                                            ctx.drawImage(this.image,
                                                          this.frameX * this.width,
                                                          0,
                                                          this.width, this.height,
                                                          this.x, this.y, this.width, this.height);
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

                                    canvas.addEventListener('mousedown', click = (event) =>{
                                        const rect = canvas.getBoundingClientRect();
                                        const x = event.clientX - rect.left;
                                        const y = event.clientY - rect.top;

                                        if(x < buttonPause.xpoint + buttonPause.buttonWidth &&
                                           x > buttonPause.xpoint &&
                                           y < buttonPause.ypoint + buttonPause.buttonHeight &&
                                           y > buttonPause.buttonHeight) {
                                            pauseGame();
                                        }
                                    });

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
                                            handlerGate(deltaTime);
                                        }
                                    }

                                    function handlerGate(deltaTime){
                                        gate.draw(ctx);
                                        gate.update(deltaTime);
                                    }

                                    function callRule(){
                                        rule2();

                                        let resume = new Button( 50, 50, canvas.width * .07, canvas.width * .04, 'blue' );

                                        resume.draw(ctx);
                                        ctx.fillStyle = 'black';
                                        ctx.font = '20px Leto Text Sans';
                                        ctx.fillText('Resume', 85, 80);

                                        canvas.addEventListener('mousedown', click = (event) =>{
                                            const rect = canvas.getBoundingClientRect();
                                            const x = event.clientX - rect.left;
                                            const y = event.clientY - rect.top;
                                            if(x < resume.xpoint + resume.buttonWidth &&
                                               x > resume.xpoint &&
                                               y < resume.ypoint + resume.buttonHeight &&
                                               y > resume.ypoint) {
                                                callRemoveEvent();
                                                resumeGame();
                                            }
                                        });
                                    }

                                    function callSettings(){
                                        settings();

                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .37, 200, canvas.width * .04, 'blue' );

                                        resume.draw(ctx);
                                        ctx.fillStyle = 'black';
                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .4, canvas.width);

                                        canvas.addEventListener('mousedown', click = (event) =>{
                                            const rect = canvas.getBoundingClientRect();
                                            const x = event.clientX - rect.left;
                                            const y = event.clientY - rect.top;
                                            if(x < resume.xpoint + resume.buttonWidth &&
                                               x > resume.xpoint &&
                                               y < resume.ypoint + resume.buttonHeight &&
                                               y > resume.ypoint) {
                                                callRemoveEvent();
                                                resumeGame();
                                            }
                                        });
                                    }

                                    function callRemoveEvent(){
                                        removeListeners();
                                    }

                                    function pauseTab(){
                                        ctx.fillStyle = 'rgba(255, 255, 51, .5)';
                                        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
                                        ctx.fillStyle = 'black';
                                        ctx.textAlign = 'center';
                                        ctx.font = '3vh Leto Text Sans';
                                        ctx.fillText('Пауза', canvas.width/2, canvas.height * .25, canvas.width - 20 );

                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .3, 200, canvas.width * .04, 'blue');
                                        let rule = new Button( (canvas.width/2) - 100, canvas.height * .4, 200, canvas.width * .04, 'green');
                                        let settings = new Button( (canvas.width/2) - 100, canvas.height * .5, 200, canvas.width * .04, 'green');
                                        let escape = new Button( (canvas.width/2) - 100, canvas.height * .6, 200, canvas.width * .04, 'pink');

                                        resume.draw();
                                        rule.draw();
                                        settings.draw();
                                        escape.draw();

                                        ctx.fillStyle = 'black';
                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .35);
                                        ctx.fillText('Правила', canvas.width/2, canvas.height * .45);
                                        ctx.fillText('Налаштування', canvas.width/2, canvas.height * .55);
                                        ctx.fillText('Вихід', canvas.width/2, canvas.height * .65);
                                        pauseButtons.push(resume, rule, settings, escape);

                                        canvas.addEventListener('mousedown', click = (event) =>{
                                            const rect = canvas.getBoundingClientRect();
                                            const x = event.clientX - rect.left;
                                            const y = event.clientY - rect.top;

                                            if(x < resume.xpoint + resume.buttonWidth &&
                                               x > resume.xpoint &&
                                               y < resume.ypoint + resume.buttonHeight &&
                                               y > resume.ypoint) {
                                                callRemoveEvent();
                                                resumeGame();
                                                buttonPause.color = 'blue';
                                                buttonPause.draw(ctx);
                                            }
                                            if(x < rule.xpoint + rule.buttonWidth &&
                                               x > rule.xpoint &&
                                               y < rule.ypoint + rule.buttonHeight &&
                                               y > rule.ypoint){
                                                callRemoveEvent();
                                                callRule();
                                            }
                                            if(x < settings.xpoint + settings.buttonWidth &&
                                               x > settings.xpoint &&
                                               y < settings.ypoint + settings.buttonHeight &&
                                               y > settings.ypoint){
                                                callRemoveEvent();
                                                callSettings();
                                            }
                                            if(x < escape.xpoint + escape.buttonWidth &&
                                               x > escape.xpoint &&
                                               y < escape.ypoint + escape.buttonHeight &&
                                               y > escape.ypoint){
                                                callRemoveEvent();
                                                input.destroyListeners();
                                                menu();
                                            }
                                        });
                                    }

                                    function displayStatusText(ctx){
                                        ctx.textAlign = 'left';
                                        ctx.fillStyle = 'black';
                                        ctx.font = '40px Leto Text Sans';
                                        ctx.fillText('Кількість пройдених ворогів: ' + score, 20, 50);
                                        if(gameOver){
                                            ctx.fillStyle = '#333';
                                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                                            ctx.textAlign = 'center';
                                            ctx.fillStyle = 'white';
                                            ctx.fillRect(this.x, this.y, this.width, this.height);
                                            ctx.fillText('Кінець гри, натисність Space для перезапуску рівня, кількість ворогів до перемоги: ' + score, canvas.width/2, 250, canvas.width - 20);
                                        }
                                        if(win){
                                            ctx.fillStyle = '#333';
                                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                                            ctx.textAlign = 'center';
                                            ctx.fillStyle = 'white';
                                            ctx.fillRect(this.x, this.y, this.width, this.height);
                                            ctx.fillText('Перемога! Вітаємо', canvas.width/2, 250);
                                        }
                                        if(pause){
                                            pauseTab();
                                        }
                                    }

                                    function pauseGame(){
                                        pause = true;
                                    }

                                    function restartGame(){
                                        player.restart();
                                        enemies.length = 0;
                                        score = 0;
                                        win = false;
                                        gameOver = false;
                                        animate(0);
                                    }

                                    function resumeGame(){
                                        pause = false;
                                        ctx.globalAlpha = 1;
                                        animate(0);
                                    }

                                    const input = new InputHandler();
                                    const player = new Player(canvas.width, canvas.height);
                                    const background = new Background(canvas.width, canvas.height);
                                    const gate = new Gate(canvas.width, canvas.height);
                                    const buttonPause = new Button(canvas.width - 100, 50, 50, 50, 'blue');

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

                                        buttonPause.draw(ctx);
                                        ctx.fillStyle = 'black';
                                        ctx.textAlign = 'center';
                                        ctx.font = '22px Leto Text Sans';
                                        ctx.fillText('Pause', canvas.width - 75, 80);

                                        handlerEnemies(deltaTime);

                                        displayStatusText(ctx);

                                        if (!gameOver && !win && !pause){
                                            requestAnimationFrame(animate);
                                        }
                                    }
                                    animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
                                }, 10 * 1000)
                            });

                            Promise4.then(value4=>{
                                if(value4){
                                    const Promise5 = new Promise(function(resolve){

                                        const video = document.getElementById('video3');

                                        video.play();

                                        unmuteButton.addEventListener('click', soundBtn, false);

                                        function soundBtn() {
                                            if(video.muted){
                                                video.muted = false;
                                                sound.setAttribute('src', './img/volume.png')
                                            } else {
                                                video.muted = true;
                                                sound.setAttribute('src', './img/mute.png')

                                            }
                                        }

                                        video.addEventListener('play', function(){
                                            draw(this,ctx,canvas.width,canvas.height);
                                            unmuteButton.style.display = "";
                                        },false);

                                        function draw(video,canvas,w,h) {
                                            if(video.paused || video.ended){
                                                unmuteButton.style.display = "none";
                                                sound.setAttribute('src', './img/mute.png')
                                                resolve(true);
                                                unmuteButton.removeEventListener('click', soundBtn, false);
                                                return false;
                                            }else{
                                                canvas.drawImage(video,0,0,w,h);
                                                setTimeout(draw,20,video,canvas,w,h);
                                            }
                                        }

                                    });

                                    Promise5.then(value5=>{
                                        if(value5){
                                            rule3();
                                            const Promise6 = new Promise(function(resolve){
                                                setTimeout(()=>{
                                                    let pauseButtons = [];
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
                                                            this.image = document.getElementById('playerImage3');
                                                            this.width = 20;
                                                            this.height = 20;
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
                                                        draw(ctx){
                                                            ctx.drawImage(this.image,
                                                                          this.x, this.y,
                                                                          this.width, this.height);
                                                        }
                                                        update(input){
                                                            //движение
                                                            if (input.keys.indexOf('KeyD') > -1){
                                                                this.vy = 0;
                                                                this.speed = 2;
                                                            } else if (input.keys.indexOf('KeyA') > -1){
                                                                this.vy = 0;
                                                                this.speed = -2;
                                                            } else if (input.keys.indexOf('KeyW') > -1){
                                                                this.vy = -2;
                                                                this.speed = 0;
                                                            } else if (input.keys.indexOf('KeyS') > -1){
                                                                this.vy = 2;
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
                                                        draw(ctx){
                                                            ctx.drawImage(this.image, this.x, this.y, canvas.width, canvas.height);
                                                            ctx.fillStyle="#333";
                                                            ctx.fillRect(0,0,canvas.width,canvas.height);
                                                        }
                                                    }

                                                    canvas.addEventListener('mousedown', click = (event) =>{
                                                        const rect = canvas.getBoundingClientRect();
                                                        const x = event.clientX - rect.left;
                                                        const y = event.clientY - rect.top;

                                                        if(x < buttonPause.xpoint + buttonPause.buttonWidth &&
                                                           x > buttonPause.xpoint &&
                                                           y < buttonPause.ypoint + buttonPause.buttonHeight &&
                                                           y > buttonPause.buttonHeight) {
                                                            pauseGame();
                                                        }
                                                    });

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
                                                    function checkForCollision(){
                                                        // Перебираем все пиксели лабиринта и инвертируем их цвет
                                                        let imgData = ctx.getImageData(player.x, player.y, 20, 20);
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

                                                    function callRule(){
                                                        rule3();

                                                        let resume = new Button( 50, 50, canvas.width * .07, canvas.width * .04, 'blue' );

                                                        resume.draw(ctx);
                                                        ctx.fillStyle = 'black';
                                                        ctx.font = '20px Leto Text Sans';
                                                        ctx.fillText('Resume', 85, 80);

                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                            const rect = canvas.getBoundingClientRect();
                                                            const x = event.clientX - rect.left;
                                                            const y = event.clientY - rect.top;
                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                               x > resume.xpoint &&
                                                               y < resume.ypoint + resume.buttonHeight &&
                                                               y > resume.ypoint) {
                                                                callRemoveEvent();
                                                                resumeGame();
                                                            }
                                                        });
                                                    }

                                                    function callSettings(){
                                                        settings();

                                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .37, 200, canvas.width * .04, 'blue' );

                                                        resume.draw(ctx);
                                                        ctx.fillStyle = 'black';
                                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .4, canvas.width);

                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                            const rect = canvas.getBoundingClientRect();
                                                            const x = event.clientX - rect.left;
                                                            const y = event.clientY - rect.top;
                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                               x > resume.xpoint &&
                                                               y < resume.ypoint + resume.buttonHeight &&
                                                               y > resume.ypoint) {
                                                                callRemoveEvent();
                                                                resumeGame();
                                                            }
                                                        });
                                                    }

                                                    function callRemoveEvent(){
                                                        removeListeners();
                                                    }

                                                    function pauseTab(){
                                                        ctx.fillStyle = 'rgba(255, 255, 51, .5)';
                                                        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
                                                        ctx.fillStyle = 'black';
                                                        ctx.textAlign = 'center';
                                                        ctx.font = '3vh Leto Text Sans';
                                                        ctx.fillText('Пауза', canvas.width/2, canvas.height * .25, canvas.width - 20 );

                                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .3, 200, canvas.width * .04, 'blue');
                                                        let rule = new Button( (canvas.width/2) - 100, canvas.height * .4, 200, canvas.width * .04, 'green');
                                                        let settings = new Button( (canvas.width/2) - 100, canvas.height * .5, 200, canvas.width * .04, 'green');
                                                        let escape = new Button( (canvas.width/2) - 100, canvas.height * .6, 200, canvas.width * .04, 'pink');


                                                        resume.draw();
                                                        rule.draw();
                                                        settings.draw();
                                                        escape.draw();

                                                        ctx.fillStyle = 'black';
                                                        ctx.fillStyle = 'black';
                                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .35);
                                                        ctx.fillText('Правила', canvas.width/2, canvas.height * .45);
                                                        ctx.fillText('Налаштування', canvas.width/2, canvas.height * .55);
                                                        ctx.fillText('Вихід', canvas.width/2, canvas.height * .65);

                                                        pauseButtons.push(resume, rule, settings, escape);

                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                            const rect = canvas.getBoundingClientRect();
                                                            const x = event.clientX - rect.left;
                                                            const y = event.clientY - rect.top;

                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                               x > resume.xpoint &&
                                                               y < resume.ypoint + resume.buttonHeight &&
                                                               y > resume.ypoint) {
                                                                callRemoveEvent();
                                                                resumeGame();
                                                                buttonPause.color = 'blue';
                                                                buttonPause.draw(ctx);
                                                            }
                                                            if(x < rule.xpoint + rule.buttonWidth &&
                                                               x > rule.xpoint &&
                                                               y < rule.ypoint + rule.buttonHeight &&
                                                               y > rule.ypoint){
                                                                callRemoveEvent();
                                                                callRule();
                                                            }
                                                            if(x < settings.xpoint + settings.buttonWidth &&
                                                               x > settings.xpoint &&
                                                               y < settings.ypoint + settings.buttonHeight &&
                                                               y > settings.ypoint){
                                                                callRemoveEvent();
                                                                callSettings();
                                                            }
                                                            if(x < escape.xpoint + escape.buttonWidth &&
                                                               x > escape.xpoint &&
                                                               y < escape.ypoint + escape.buttonHeight &&
                                                               y > escape.ypoint){
                                                                callRemoveEvent();
                                                                input.destroyListeners();
                                                                menu();
                                                            }
                                                        });
                                                    }

                                                    function displayStatusText(ctx){
                                                        ctx.font = '40px Leto Text Sans';
                                                        if(win){
                                                            ctx.fillStyle = '#333';
                                                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                            ctx.textAlign = 'center';
                                                            ctx.fillStyle = 'white';
                                                            ctx.fillRect(this.x, this.y, this.width, this.height);
                                                            ctx.fillText('Перемога! Вітаємо!', canvas.width/2, 250);
                                                        }
                                                        if (pause){
                                                            ctx.fillStyle = 'white';
                                                            ctx.fillText('Пауза', canvas.width/2, 250);
                                                        }
                                                        if(pause){
                                                            pauseTab();
                                                        }
                                                    }

                                                    function pauseGame(){
                                                        pause = true;
                                                    }

                                                    function restartGame(){
                                                        player.restart();
                                                        win = false;
                                                        gameOver = false;
                                                        pause = false;
                                                        animate(0);
                                                    }

                                                    function resumeGame(){
                                                        pause = false;
                                                        ctx.globalAlpha = 1;
                                                        animate(0);
                                                    }

                                                    const input = new InputHandler();
                                                    const player = new Player(canvas.width, canvas.height);
                                                    const background = new Background(canvas.width, canvas.height);
                                                    const buttonPause = new Button(canvas.width - 100, 50, 50, 50, 'blue');

                                                    function animate(){
                                                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                                                        background.draw(ctx);

                                                        player.draw(ctx);
                                                        player.update(input);

                                                        buttonPause.draw(ctx);
                                                        ctx.fillStyle = 'black';
                                                        ctx.textAlign = 'center';
                                                        ctx.font = '22px Leto Text Sans';
                                                        ctx.fillText('Pause', canvas.width - 75, 80);

                                                        displayStatusText(ctx);

                                                        if(!win && !pause){
                                                            requestAnimationFrame(animate);
                                                        }
                                                    }
                                                    animate();
                                                }, 10 * 1000)
                                            });

                                            Promise6.then(value6=>{
                                                if(value6){
                                                    const Promise7 = new Promise(function(resolve){

                                                        const video = document.getElementById('video4');

                                                        video.play();

                                                        unmuteButton.addEventListener('click', soundBtn, false);

                                                        function soundBtn() {
                                                            if(video.muted){
                                                                video.muted = false;
                                                                sound.setAttribute('src', './img/volume.png')
                                                            } else {
                                                                video.muted = true;
                                                                sound.setAttribute('src', './img/mute.png')

                                                            }
                                                        }

                                                        video.addEventListener('play', function(){
                                                            draw(this,ctx,canvas.width,canvas.height);
                                                            unmuteButton.style.display = "";
                                                        },false);

                                                        function draw(video,canvas,w,h) {
                                                            if(video.paused || video.ended){
                                                                unmuteButton.style.display = "none";
                                                                sound.setAttribute('src', './img/mute.png')
                                                                resolve(true);
                                                                unmuteButton.removeEventListener('click', soundBtn, false);
                                                                return false;
                                                            }else{
                                                                canvas.drawImage(video,0,0,w,h);
                                                                setTimeout(draw,20,video,canvas,w,h);
                                                            }
                                                        }

                                                    });

                                                    Promise7.then(value7=>{
                                                        if(value7){
                                                            rule4();
                                                            const Promise8 = new Promise(function(resolve){
                                                                setTimeout(()=>{
                                                                    let enemies = [];
                                                                    let fuels = [];
                                                                    let planetArr = [];
                                                                    let playerArr = [];
                                                                    let pauseButtons = [];
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
                                                                            this.image = document.getElementById('playerImage4');
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
                                                                        draw(ctx){
                                                                            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
                                                                            if(score <= 0){
                                                                                score = 0;
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

                                                                    class Background {
                                                                        constructor(gameWidth, gameHeight){
                                                                            this.gameWidth = gameWidth;
                                                                            this.gameHeight = gameHeight;
                                                                            this.image = document.getElementById('backgroundImage4');
                                                                            this.width = 1920;
                                                                            this.height = 880;

                                                                            this.x = 0;
                                                                            this.y = 0;
                                                                            this.speed = 20;
                                                                        }
                                                                        draw(ctx){
                                                                            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                                                                            ctx.drawImage(this.image, this.x, this.y - this.height + this.speed, this.width, this.height);
                                                                            ctx.drawImage(this.image, this.x, this.y + this.height - this.speed, this.width, this.height);
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
                                                                            this.image = document.getElementById('finishImage4');

                                                                            this.radius = this.gameWidth/2;
                                                                            this.width = this.gameWidth;
                                                                            this.height = this.gameWidth;

                                                                            this.x = 0;
                                                                            this.y = 0-this.height;

                                                                            this.speed = 1;
                                                                        }
                                                                        draw(ctx){
                                                                            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                                                                        }
                                                                        update(){
                                                                            this.y++;
                                                                        }
                                                                    }

                                                                    class SpaceObj {
                                                                        constructor(){
                                                                            this.width = 100;
                                                                            this.height = 100;
                                                                            this.speed = 8;
                                                                            this.flagToDelete = false;
                                                                            this.image = document.getElementById('enemyImage');
                                                                        }
                                                                        draw(context){
                                                                            context.drawImage(this.image, this.x, this.y, this.width, this.height)
                                                                        }
                                                                        update(){

                                                                            this.y += this.speed;
                                                                            //помечаем пройденных врагов
                                                                            if (this.y > 0 + this.gameHeight){
                                                                                this.flagToDelete = true;
                                                                            }
                                                                        }
                                                                    }

                                                                    class Enemy extends SpaceObj {
                                                                        #gameWidth
                                                                        constructor(gameWidth, gameHeight, width, height, speed, flagToDelete, image){
                                                                            super(width, height, speed, flagToDelete, image)
                                                                            this.#gameWidth = gameWidth;
                                                                            this.gameHeight = gameHeight;

                                                                            this.x = Math.floor(Math.floor(Math.random() * (this.#gameWidth-this.width)) / 100) * 100;
                                                                            this.y = (Math.floor(Math.floor(Math.random()*(1500-0+1)+0) / 100) * 100) - 1500;
                                                                        }

                                                                    }

                                                                    class Fuel extends SpaceObj {
                                                                        #gameWidth
                                                                        constructor(gameWidth, gameHeight, width, height, speed, flagToDelete, image){
                                                                            super(width, height, speed, flagToDelete, image)
                                                                            this.#gameWidth = gameWidth;
                                                                            this.gameHeight = gameHeight;
                                                                            this.image = document.getElementById('fuelImage');


                                                                            this.randX = Math.floor(Math.floor(Math.random() * (this.#gameWidth-this.width)) / 100) * 100;
                                                                            this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;

                                                                            enemies.forEach(enemy => {
                                                                                while(
                                                                                    this.randX + this.width > enemy.x &&
                                                                                    this.randX < enemy.x + enemy.width &&
                                                                                    this.randY + this.height > enemy.y &&
                                                                                    this.randY < enemy.y + enemy.height) {

                                                                                this.randX = Math.floor(Math.floor(Math.random() * (this.#gameWidth-this.width)) / 100) * 100;
                                                                                this.randY = (Math.floor((Math.floor(Math.random()*(1500-0+1)+0)) / 100) * 100) - 1500;


                                                                            } })
                                                                            this.x = this.randX;
                                                                            this.y = this.randY;
                                                                        }
                                                                    }

                                                                    canvas.addEventListener('mousedown', click = (event) =>{
                                                                        const rect = canvas.getBoundingClientRect();
                                                                        const x = event.clientX - rect.left;
                                                                        const y = event.clientY - rect.top;

                                                                        if(x < buttonPause.xpoint + buttonPause.buttonWidth &&
                                                                           x > buttonPause.xpoint &&
                                                                           y < buttonPause.ypoint + buttonPause.buttonHeight &&
                                                                           y > buttonPause.buttonHeight) {
                                                                            pauseGame();
                                                                        }
                                                                    });

                                                                    function handlerPlayer(){
                                                                        player.draw(ctx);
                                                                        player.update(input);
                                                                    }

                                                                    function handlerPlanet(){
                                                                        planet.draw(ctx);
                                                                        planet.update();
                                                                    }

                                                                    function handlerEnemies(deltaTime){
                                                                        if(timer > 0 && !pause){
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
                                                                                if(!pause){
                                                                                    timer--;
                                                                                }
                                                                            } else {
                                                                                //отсчет до следующего создания врага
                                                                                enemyTimer += deltaTime;
                                                                                score -= 4;
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

                                                                    function callRule(){
                                                                        rule4();

                                                                        let resume = new Button( 50, 50, canvas.width * .07, canvas.width * .04, 'blue' );

                                                                        resume.draw(ctx);
                                                                        ctx.fillStyle = 'black';
                                                                        ctx.font = '20px Leto Text Sans';
                                                                        ctx.fillText('Resume', 85, 80);

                                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                                            const rect = canvas.getBoundingClientRect();
                                                                            const x = event.clientX - rect.left;
                                                                            const y = event.clientY - rect.top;
                                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                                               x > resume.xpoint &&
                                                                               y < resume.ypoint + resume.buttonHeight &&
                                                                               y > resume.ypoint) {
                                                                                callRemoveEvent();
                                                                                resumeGame();
                                                                            }
                                                                        });
                                                                    }

                                                                    function callSettings(){
                                                                        settings();

                                                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .37, 200, canvas.width * .04, 'blue' );

                                                                        resume.draw(ctx);
                                                                        ctx.fillStyle = 'black';
                                                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .4, canvas.width);

                                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                                            const rect = canvas.getBoundingClientRect();
                                                                            const x = event.clientX - rect.left;
                                                                            const y = event.clientY - rect.top;
                                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                                               x > resume.xpoint &&
                                                                               y < resume.ypoint + resume.buttonHeight &&
                                                                               y > resume.ypoint) {
                                                                                callRemoveEvent();
                                                                                resumeGame();
                                                                            }
                                                                        });
                                                                    }

                                                                    function callRemoveEvent(){
                                                                        removeListeners();
                                                                    }

                                                                    function pauseTab(){
                                                                        ctx.fillStyle = 'rgba(255, 255, 51, .5)';
                                                                        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
                                                                        ctx.fillStyle = 'black';
                                                                        ctx.textAlign = 'center';
                                                                        ctx.font = '3vh Leto Text Sans';
                                                                        ctx.fillText('Пауза', canvas.width/2, canvas.height * .25, canvas.width - 20 );

                                                                        let resume = new Button( (canvas.width/2) - 100, canvas.height * .3, 200, canvas.width * .04, 'blue');
                                                                        let rule = new Button( (canvas.width/2) - 100, canvas.height * .4, 200, canvas.width * .04, 'green');
                                                                        let settings = new Button( (canvas.width/2) - 100, canvas.height * .5, 200, canvas.width * .04, 'green');
                                                                        let escape = new Button( (canvas.width/2) - 100, canvas.height * .6, 200, canvas.width * .04, 'pink');


                                                                        resume.draw();
                                                                        rule.draw();
                                                                        settings.draw();
                                                                        escape.draw();

                                                                        ctx.fillStyle = 'black';
                                                                        ctx.fillText('Продовжити', canvas.width/2, canvas.height * .35);
                                                                        ctx.fillText('Правила', canvas.width/2, canvas.height * .45);
                                                                        ctx.fillText('Налаштування', canvas.width/2, canvas.height * .55);
                                                                        ctx.fillText('Вихід', canvas.width/2, canvas.height * .65);

                                                                        pauseButtons.push(resume, rule, settings, escape);

                                                                        canvas.addEventListener('mousedown', click = (event) =>{
                                                                            const rect = canvas.getBoundingClientRect();
                                                                            const x = event.clientX - rect.left;
                                                                            const y = event.clientY - rect.top;

                                                                            if(x < resume.xpoint + resume.buttonWidth &&
                                                                               x > resume.xpoint &&
                                                                               y < resume.ypoint + resume.buttonHeight &&
                                                                               y > resume.ypoint) {
                                                                                callRemoveEvent();
                                                                                resumeGame();
                                                                                buttonPause.color = 'blue';
                                                                                buttonPause.draw(ctx);
                                                                            }
                                                                            if(x < rule.xpoint + rule.buttonWidth &&
                                                                               x > rule.xpoint &&
                                                                               y < rule.ypoint + rule.buttonHeight &&
                                                                               y > rule.ypoint){
                                                                                callRemoveEvent();
                                                                                callRule();
                                                                            }
                                                                            if(x < settings.xpoint + settings.buttonWidth &&
                                                                               x > settings.xpoint &&
                                                                               y < settings.ypoint + settings.buttonHeight &&
                                                                               y > settings.ypoint){
                                                                                callRemoveEvent();
                                                                                callSettings();
                                                                            }
                                                                            if(x < escape.xpoint + escape.buttonWidth &&
                                                                               x > escape.xpoint &&
                                                                               y < escape.ypoint + escape.buttonHeight &&
                                                                               y > escape.ypoint){
                                                                                callRemoveEvent();
                                                                                input.destroyListeners();
                                                                                menu();
                                                                            }
                                                                        });
                                                                    }

                                                                    function displayStatusText(ctx){
                                                                        ctx.fillStyle = 'white';
                                                                        ctx.font = '60px Leto Text Sans';

                                                                        ctx.textAlign = 'left';
                                                                        ctx.fillText('Паливо: ' + score, 20, 50);

                                                                        ctx.textAlign = 'center';
                                                                        ctx.fillText('Турбо: ' + turbo + '%',(canvas.width/2) + 20, 50);

                                                                        ctx.textAlign = 'right';
                                                                        ctx.fillText('Час: ' + timer, canvas.width - 20, 50);

                                                                        if(gameOver){
                                                                            ctx.fillStyle = '#333';
                                                                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                                            ctx.textAlign = 'center';
                                                                            ctx.fillStyle = 'white';
                                                                            ctx.fillText('Кінець гри, натисність Space для перезапуску рівня, час до перемоги: ' + timer, canvas.width/2, 250, canvas.width - 20);
                                                                        }
                                                                        if(win){
                                                                            ctx.fillStyle = '#333';
                                                                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                                                                            ctx.textAlign = 'center';
                                                                            ctx.fillStyle = 'white';
                                                                            ctx.fillText('Вітаємо! Перемога!', canvas.width/2, 250);
                                                                        }
                                                                        if(pause){
                                                                            pauseTab();
                                                                        }
                                                                    }

                                                                    function pauseGame(){
                                                                        pause = true;
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

                                                                    function resumeGame(){
                                                                        pause = false;
                                                                        ctx.globalAlpha = 1;
                                                                        animate(0);
                                                                    }

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
                                                                    const buttonPause = new Button(canvas.width - 100, 50, 50, 50, 'blue');

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
                                                                        if(!pause){
                                                                            handlerEnemies(deltaTime);
                                                                        }
                                                                        if (input.keys.indexOf('ShiftLeft') > -1 && turbo == 100){
                                                                            playerArr.length = 0;
                                                                            player.y -= 200;
                                                                            turbo = 0;

                                                                        } else if(!pause){
                                                                            playerArr.push(player);
                                                                            handlerPlayer();
                                                                        }

                                                                        buttonPause.draw(ctx);
                                                                        ctx.fillStyle = 'black';
                                                                        ctx.textAlign = 'center';
                                                                        ctx.font = '22px Leto Text Sans';
                                                                        ctx.fillText('Pause', canvas.width - 75, 80);

                                                                        displayStatusText(ctx);

                                                                        if (!gameOver && !win && !pause){
                                                                            requestAnimationFrame(animate);
                                                                        }
                                                                    }
                                                                    animate(0); //т.к. timeStamp генерируется при вызове функции, то первыый раз передаем 0
                                                                }, 10 * 1000)
                                                            });

                                                            Promise8.then(value8=>{
                                                                if(value8){
                                                                    const Promise9 = new Promise(function(resolve){

                                                                        const video = document.getElementById('video5');

                                                                        video.play();

                                                                        unmuteButton.addEventListener('click', soundBtn, false);

                                                                        function soundBtn() {
                                                                            if(video.muted){
                                                                                video.muted = false;
                                                                                sound.setAttribute('src', './img/volume.png')
                                                                            } else {
                                                                                video.muted = true;
                                                                                sound.setAttribute('src', './img/mute.png')

                                                                            }
                                                                        }

                                                                        video.addEventListener('play', function(){
                                                                            draw(this,ctx,canvas.width,canvas.height);
                                                                            unmuteButton.style.display = "";
                                                                        },false);

                                                                        function draw(video,canvas,w,h) {
                                                                            if(video.paused || video.ended){
                                                                                unmuteButton.style.display = "none";
                                                                                sound.setAttribute('src', './img/mute.png')
                                                                                resolve(true);
                                                                                unmuteButton.removeEventListener('click', soundBtn, false);
                                                                                return false;
                                                                            }else{
                                                                                canvas.drawImage(video,0,0,w,h);
                                                                                setTimeout(draw,20,video,canvas,w,h);
                                                                            }
                                                                        }

                                                                    });

                                                                    Promise9.then(value9=>{
                                                                        if(value9){
                                                                            const Promise10 = new Promise(function(resolve){

                                                                                const video = document.getElementById('titers');

                                                                                video.play();

                                                                                unmuteButton.addEventListener('click', soundBtn, false);

                                                                                function soundBtn() {
                                                                                    if(video.muted){
                                                                                        video.muted = false;
                                                                                        sound.setAttribute('src', './img/volume.png')
                                                                                    } else {
                                                                                        video.muted = true;
                                                                                        sound.setAttribute('src', './img/mute.png')

                                                                                    }
                                                                                }

                                                                                video.addEventListener('play', function(){
                                                                                    draw(this,ctx,canvas.width,canvas.height);
                                                                                    unmuteButton.style.display = "";
                                                                                },false);

                                                                                function draw(video,canvas,w,h) {
                                                                                    if(video.paused || video.ended){
                                                                                        unmuteButton.style.display = "none";
                                                                                        sound.setAttribute('src', './img/mute.png')
                                                                                        resolve(true);
                                                                                        unmuteButton.removeEventListener('click', soundBtn, false);
                                                                                        return false;
                                                                                    }else{
                                                                                        canvas.drawImage(video,0,0,w,h);
                                                                                        setTimeout(draw,20,video,canvas,w,h);
                                                                                    }
                                                                                }

                                                                            });
                                                                        }
                                                                    })
                                                                    //9
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
}

function settings(){
    pause = true;

    ctx.fillStyle = 'rgba(255, 255, 51, 1)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

    const playMusicButton = new Button( (canvas.width/2) - 100, canvas.height * .47, 200, canvas.width * .04, 'green');
    const plusButton = new Button( (canvas.width/2) - 100, canvas.height * .72, 50, canvas.width * .04, 'red');
    const minuseButton = new Button( (canvas.width/2) + 50, canvas.height * .72, 50, canvas.width * .04, 'red');

    playMusicButton.draw(ctx);
    plusButton.draw(ctx);
    minuseButton.draw(ctx);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '3vh Leto Text Sans';

    ctx.fillText('Налаштвування', canvas.width/2, canvas.height * .2, canvas.width - 20 );
    ctx.fillText('Музика', canvas.width/2, canvas.height * .5, canvas.width);
    ctx.fillText('Гучність музики', canvas.width/2, canvas.height * .65);
    ctx.fillText('+', (canvas.width/2) - 75, canvas.height * .75);
    ctx.fillText('-', (canvas.width/2) + 75, canvas.height * .75);

    canvas.addEventListener('mousedown', click = (event) =>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(x < playMusicButton.xpoint + playMusicButton.buttonWidth &&
           x > playMusicButton.xpoint &&
           y < playMusicButton.ypoint + playMusicButton.buttonHeight &&
           y > playMusicButton.ypoint) {
            music.play();
        }
        if(x < plusButton.xpoint + plusButton.buttonWidth &&
           x > plusButton.xpoint &&
           y < plusButton.ypoint + plusButton.buttonHeight &&
           y > plusButton.ypoint) {
            music.volume += 0.1;
        }
        if(x < minuseButton.xpoint + minuseButton.buttonWidth &&
           x > minuseButton.xpoint &&
           y < minuseButton.ypoint + minuseButton.buttonHeight &&
           y > minuseButton.ypoint) {
            music.volume -= 0.1;
        }
    });
}

function removeListeners(){
    canvas.removeEventListener('mouseup', removeClick, false);
    canvas.removeEventListener('mousedown', click, false);
    canvas.removeEventListener('mousemove', hover, false);
}

function ruleTab(){
    pause = true;

    ctx.fillStyle = 'rgba(255, 255, 51, 1)';
    ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '3vh Leto Text Sans';
}

function rule1(){
    ruleTab();

    ctx.fillText("Правила игры", canvas.width/2, canvas.height * .15, canvas.width-100 );
    ctx.fillText("Игра длится 1 минуту", canvas.width/2, canvas.height * .2, canvas.width-100 );
    ctx.fillText("Цель игры заключается в том чтобы избежать летающих чудищ и прожить 1 минуту", canvas.width/2, canvas.height * .25, canvas.width-100 );
    ctx.fillText("По истечению времнни игра заканчивается", canvas.width/2, canvas.height * .3, canvas.width-100 );

    ctx.fillStyle = 'red';
    ctx.fillText("Важно!", canvas.width/2, canvas.height * .35 );
    ctx.fillStyle = 'black';
    ctx.fillText("Враг пропадает, прожив 1.3 сек. Изаначально враги летят в сторону игрока", canvas.width/2, canvas.height * .4, canvas.width-100 );

    ctx.fillText("Управление", canvas.width/2, canvas.height * .45 );
    ctx.fillText("W - движение вверх", canvas.width/2, canvas.height * .5 );
    ctx.fillText("A - движение влево", canvas.width/2, canvas.height * .55 );
    ctx.fillText("S - движение вниз", canvas.width/2, canvas.height * .6 );
    ctx.fillText("D - движение вправо", canvas.width/2, canvas.height * .65 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, canvas.height * .7 );
    ctx.fillText("Escape - пауза", canvas.width/2, canvas.height * .75 );
    ctx.fillText("Enter - возобновить игру", canvas.width/2, canvas.height * .8 );
}

function rule2(){
    ruleTab();

    ctx.fillText("Правила игры 2", canvas.width/2, canvas.height * .15, canvas.width-100 );
    ctx.fillText("Игра длиться до 100 очков", canvas.width/2, canvas.height * .2 );
    ctx.fillText("Цель игры заключается в том чтобы избежать летающих чудищ и добраться до врат", canvas.width/2, canvas.height * .25, canvas.width-100 );
    ctx.fillText("По достижении отметки в 100 очков, появляются врата окончания игры", canvas.width/2, canvas.height * .3, canvas.width-100 );

    ctx.fillStyle = 'red';
    ctx.fillText("Важно!", canvas.width/2, canvas.height * .35 );
    ctx.fillStyle = 'black';
    ctx.fillText("Очки зачисляются лишь тогда, когда враг ушел за пределы карты", canvas.width/2, canvas.height * .4, canvas.width-100 );

    ctx.fillText("Управление", canvas.width/2, canvas.height * .45 );
    ctx.fillText("W - прыжок", canvas.width/2, canvas.height * .5 );
    ctx.fillText("A - движение влево", canvas.width/2, canvas.height * .55 );
    ctx.fillText("S - присесть / быстро спуститься", canvas.width/2, canvas.height * .6 );
    ctx.fillText("D - движение вправо", canvas.width/2, canvas.height * .65 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, canvas.height * .7 );
    ctx.fillText("Escape - пауза", canvas.width/2, canvas.height * .75 );
    ctx.fillText("Enter - возобновить игру", canvas.width/2, canvas.height * .8 );
}

function rule3(){
    ruleTab();

    ctx.fillText("Правила игры 3", canvas.width/2, canvas.height * .15, canvas.width-100 );
    ctx.fillText("Игра длиться до нахождения портала", canvas.width/2, canvas.height * .2 );
    ctx.fillText("Цель игры заключается в том чтобы найти правильный путь в лабиринте", canvas.width/2, canvas.height * .25, canvas.width-100 );
    ctx.fillText("Подсказка: он предположительно справа снизу", canvas.width/2, canvas.height * .3 );

    ctx.fillStyle = 'red';
    ctx.fillText("Важно!", canvas.width/2, canvas.height * .35 );
    ctx.fillStyle = 'black';
    ctx.fillText("Портал в начале тестовый, так что не считается ;3", canvas.width/2, canvas.height * .4 );

    ctx.fillText("Управление", canvas.width/2, canvas.height * .45 );
    ctx.fillText("W - вперед", canvas.width/2, canvas.height * .5 );
    ctx.fillText("A - влево", canvas.width/2, canvas.height * .55 );
    ctx.fillText("S - вниз", canvas.width/2, canvas.height * .6 );
    ctx.fillText("D - вправо", canvas.width/2, canvas.height * .65 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, canvas.height * .7 );
    ctx.fillText("Escape - пауза", canvas.width/2, canvas.height * .75 );
    ctx.fillText("Enter - возобновить игру", canvas.width/2, canvas.height * .8 );
}

function rule4(){
    ruleTab();

    ctx.fillText("Правила игры 4", canvas.width/2, canvas.height * .16 );
    ctx.fillText("Цель игры заключается в том чтобы избежать астероидов и высадится на безопасной планете", canvas.width/2, canvas.height * .20, canvas.width-100 );
    ctx.fillText("Чтобы долететь, попутно надо собирать баночки с топливом (синие квадратики)", canvas.width/2, canvas.height * .24, canvas.width-100 );
    ctx.fillText("По истечении отсчета времени (справа сверху), появится планета, куда надо долететь", canvas.width/2, canvas.height * .28, canvas.width-100 );

    ctx.fillStyle = 'red';
    ctx.fillText("Важно!", canvas.width/2, canvas.height * .32, canvas.width-100 );
    ctx.fillStyle = 'black';
    ctx.fillText("1) Чтобы использовать турбо скачок, нужно чтобы показатель турбо был равен 100%", canvas.width/2, canvas.height * .36, canvas.width-100 );
    ctx.fillText("2) Вы в космосе поэтому переодически добавляйте газу чтобы лететь, иначе СМЭРТЬ", canvas.width/2, canvas.height * .4, canvas.width-100 );
    ctx.fillText("3) Следите за уровнем топлива, иначе СМЭРТЬ", canvas.width/2, canvas.height * .44, canvas.width-100 );
    ctx.fillText("4) Следите также чтобы ракета не вылетела за нижнюю границу, иначе СМЭРТЬ", canvas.width/2, canvas.height * .48, canvas.width-100 );

    ctx.fillText("Управление", canvas.width/2, canvas.height * .52 );
    ctx.fillText("W - полет вперед / добавить газку", canvas.width/2, canvas.height * .56 );
    ctx.fillText("S - движение влево / сбавить обороты", canvas.width/2, canvas.height * .6 );
    ctx.fillText("A - движение влево", canvas.width/2, canvas.height * .64 );
    ctx.fillText("D - движение вправо", canvas.width/2, canvas.height * .68 );
    ctx.fillText("L Shift - пространсвенный скачек вперед", canvas.width/2, canvas.height * .72 );
    ctx.fillText("Space - перезапуск уровня", canvas.width/2, canvas.height * .76 );
    ctx.fillText("Escape - пауза", canvas.width/2, canvas.height * .80 );
    ctx.fillText("Enter - возобновить игру", canvas.width/2, canvas.height * 84 );
}
