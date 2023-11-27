const menu = document.getElementById("menu")
menu.addEventListener("click", ()=>{
    ClickInPlay()
})

function ClickInPlay() {
    menu.classList.add("none")
    const screenDiv = document.querySelector("#screen")
    const P1HMTL = document.getElementById("player1")
    const P2HMTL = document.getElementById("player2")
    
    let points = {
        p1: 1,
        p2: 1
    }
    
    let GameIsRunning = false
    
    let gameTime = 60
    let intervalGame
    
    const timer = document.getElementById("timer")
    
    function tf() {
        return Math.random() < 0.5;
    }
    function initCount() {
        GameIsRunning = true
            intervalGame = setInterval(() => {
                gameTime--;
                timer.textContent = gameTime
                if (gameTime == 0) {
                    clearInterval(intervalGame)
                }
              }, 1000);
    }
    
    function pauseCount() {
        clearInterval(intervalGame);
        GameIsRunning = !GameIsRunning
    }
    
    class Bars{
        constructor(keyUp, keyDown){
            this.element = document.createElement("div")
            this.element.classList.add("bars")
            screenDiv.appendChild(this.element)
            this.moving = null
            this.sH = Math.floor(screenDiv.offsetHeight - 75)
            this.sW = screenDiv.offsetWidth
            this.down = keyDown
            this.up = keyUp,
            this.y = this.sH / 2,
            this.dy = 1
            document.addEventListener("keydown", (keyPressed)=>{
                switch (keyPressed.key) {
                    case this.up:
                        this.upBar()
                        break;
                    case this.down:
                        this.downBar()
                        break;
                }
            })
            document.addEventListener("keyup", (keyPressed)=>{
                switch (keyPressed.key) {
                    case this.up:
                        this.stop()
                        break;
                    case this.down:
                        this.stop()
                        break;
                    }
            })
        }
        
        get top(){
            return this.y
        }
    
        get bottom(){
            return this.y + 35
        }
    
        get barHeight(){
            return this.element.offsetHeight
        }
    
        play(){
            this.element.style.transform = `translateY(${this.y}px)`
        }
    
        upBar(){
            if (!this.moving && GameIsRunning) {
                this.moving = setInterval(() => {
                    if (this.y > 0) {
                    this.y -= this.dy
                    this.element.style.transform = `translateY(${this.y}px)`
                } else this.stop()
            }, 1);
            }
        }
        
        stop(){
            clearInterval(this.moving)
            this.moving = null
        }
        
        downBar(){
            if (!this.moving && GameIsRunning) {
                this.moving = setInterval(() => {
                    if (this.y < this.sH) {
                    this.y += this.dy
                    this.element.style.transform = `translateY(${this.y}px)`
                } else this.stop()
            }, 1);
            }
        }
    
        reverseControl(){
             let savedUp = this.up
             let savedDown = this.down
            this.down = savedUp
            this.up = savedDown
            setTimeout(() => {
                this.down = savedDown
                this.up = savedUp
            }, 10000);
        }
    }
    
    const P2 = new Bars("o", "l")
    P2.play()
    const P1 = new Bars("w", "s")
    P1.play()
    
    class Ball{
        constructor(){
            this.element = document.createElement("div")
            this.element.classList.add("ball")
            screenDiv.appendChild(this.element)
            this.sH = Math.floor(screenDiv.offsetHeight - 45)
            this.sW = Math.floor(screenDiv.offsetWidth - 50)
            this.x = this.sW / 2
            this.y = this.sH / 2
            this.Bheight = this.element.offsetHeight
            this.BWidth = this.element.offsetWidth
            this.dx = 1
            this.dy = 1
            this.moving = null
            this.left 
        }
    
        reset(){
            pauseCount()
            this.element.style.transform = `translateY(${this.sH / 2}px) translateX(${this.sW / 2 + 3}px)`
            clearInterval(this.moving)
            this.moving = null
            this.y = this.sH / 2
            this.x = this.sW / 2 + 3
            this.dy = 0
            this.dx *= -1
            this.ballHeight = this.element.offsetHeight
        }
    
        get differenceY(){
            return [((this.y + this.ballHeight /2) - (P1.top + P1.barHeight/2)) / 17.5,
                    ((this.y + this.ballHeight /2) - (P2.top + P1.barHeight/2)) / 17.5]
                }
    
        stopBall(){
            
        }
    
        moveBall(){
            initCount()
            this.moving = setInterval(() => {
                console.log(321);
                if (!GameIsRunning) {
                    return;
                }
                if (this.y + 2.5 >= this.sH || this.y + 2.5 <= 0) {
                    this.dy *= -1
                }
                if ((this.x <= 5 && ((this.y + 2.5 >= P1.top) && (this.y + 2.5 <= P1.bottom)))) {
                    this.dy = -ball.differenceY[0]
                        this.dx *= -1
                    }
                else if ((this.x >= this.sW && (this.y + 2.5 >= P2.top) && (this.y + 2.5 <= P2.bottom))) {
                        this.dy = -ball.differenceY[1]
                        this.dx *= -1
                    }
                    let win = 2000
                if (this.x - 5 >= this.sW + 5) {
                    this.reset()
                    P1HMTL.innerHTML = points.p1++
                    P1HMTL.classList.add("rainbow-text")
                    setTimeout(() => {
                        P1HMTL.classList.remove("rainbow-text")
                    }, win);
                } 
                else if (this.x <= 0) {
                    this.reset()
                    P2HMTL.innerHTML = points.p2++
                    P2HMTL.classList.add("rainbow-text")
                    setTimeout(() => {
                        P2HMTL.classList.remove("rainbow-text")
                    }, win);
                }
                if (GameIsRunning) {
                    this.x += this.dx
                    this.y -= this.dy
                    this.element.style.transform = `translateY(${this.y}px) translateX(${this.x}px)`
                }
            }, 1);     
        }
    }
    
        const ball = new Ball()
        
        ball.reset()
        
        class Power{
            constructor(){
                this.element = document.createElement("span")
                this.element.classList.add("power")
                this.sH = Math.floor(screenDiv.offsetHeight - 40)
                this.sW = Math.floor(screenDiv.offsetWidth)
                this.y = 0
                this.x = this.sW / 2 - 5
                this.dy = .1
                this.moving
        }
        fallOrRise(bool){
            bool ? (this.dy = Math.abs(this.dy), this.y = -50, console.log("falling")): (this.dy = -Math.abs(this.dy), this.y = this.sH + 50, console.log("ascending"))
        }
    
        movePower(){
            if (!this.moving) {
                this.moving = setInterval(() => {
                    this.y += this.dy
                    this.element.style.transform = `translateY(${this.y}px)`
                }, 10);
            }
        }
    
        addToScreen(){
            if (!screenDiv.contains(this.element)) {
                screenDiv.appendChild(this.element)
                this.fallOrRise(tf())
                this.movePower()
            }
        }
        
        removeToScreen(){
            if (screenDiv.contains(this.element)) {
                screenDiv.removeChild(this.element)
            }
        }
    }
    
    const power = new Power()
    
    document.addEventListener("keypress", (start)=>{
        if (start.code === "Enter" && GameIsRunning) {
        power.removeToScreen()
        setTimeout(() => {
            power.addToScreen()
        }, 1000);
        ball.reset()
        ball.moveBall()
    }
        if (start.code === "Space" && !GameIsRunning) {
            initCount()
        } else if (start.code === "Space" && GameIsRunning) {
            pauseCount()
        }
    })
}
