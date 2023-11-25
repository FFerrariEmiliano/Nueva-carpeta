const screenDiv = document.querySelector("#screen")
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
console.log(screenDiv.offsetHeight, screenDiv.offsetWidth);


class Bars{
    constructor(keyUp, keyDown){
        this.element = document.createElement("div")
        this.element.classList.add("bars")
        screenDiv.appendChild(this.element)
        this.moving
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
        if (!this.moving) {
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
        this.moving = false
    }
    
    downBar(){
        if (!this.moving) {
            this.moving = setInterval(() => {
                if (this.y < this.sH) {
                this.y += this.dy
                this.element.style.transform = `translateY(${this.y}px)`
            } else this.stop()
        }, 1);
        }
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
        this.dx = 1
        this.y = this.sH / 2
        this.dy = 1
        this.moving = false
    }

    reset(){
        this.element.style.transform = `translateY(${this.sH / 2}px) translateX(${this.sW / 2 + 3}px)`
        clearInterval(this.moving)
        this.y = this.sH / 2 
        this.x = this.sW / 2 + 3
        this.dy = 0
        this.dx *= -1
        this.moving = false
        this.ballHeight = this.element.offsetHeight
    }

    get differenceY(){
        return [((this.y + this.ballHeight /2) - (P1.top + P1.barHeight/2)) / 17.5,
                ((this.y + this.ballHeight /2) - (P2.top + P1.barHeight/2)) / 17.5]
            }

            moveBall(){
        this.moving = setInterval(() => {            
            this.x += this.dx
            this.y -= this.dy
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

                if (this.x - 5 >= this.sW + 5) {
                this.reset()
                player1.innerHTML++
            } else if (this.x <= 0) {
                this.reset()
                player2.innerHTML++
            }
            this.element.style.transform = `translateY(${this.y}px) translateX(${this.x}px)`
        }, 1);
    }
}

const ball = new Ball()

ball.reset()
document.addEventListener("keypress", (start)=>{
    if (start.code === "Space") {
        ball.reset()
        ball.moveBall()
    }
})