const menuOpt = document.getElementById("volume__options")

const opt = document.getElementById("options")

const optSect = document.getElementById("opt-sect")

const contOpt = document.querySelector(".vol-opt")

const voltest1 = new Audio("pong/coin-collect-retro-8-bit-sound-effect-145251.mp3")
class VolumeOption{
    constructor(nameVolume, audio, volumeDefault, loop){
        const containerConfig = document.createElement("div")
        const paragraph = document.createElement("p")
        const controls = document.createElement("div")
        const min = document.createElement("span")
        const numVol = document.createElement("b")
        const max = document.createElement("span")
        this.soundInstance = new Audio(audio)
        this.soundInstance.volume = volumeDefault
        this.soundInstance.loop = loop

        containerConfig.appendChild(paragraph)
        controls.appendChild(min)
        controls.appendChild(numVol)
        controls.appendChild(max)
        containerConfig.appendChild(controls)

        paragraph.textContent = nameVolume
        min.classList.add("change-vol")
        min.textContent = "-"
        numVol.classList.add("value")
        numVol.textContent = this.soundInstance.volume * 10
        max.classList.add("change-vol")
        max.textContent = "+"

        contOpt.appendChild(containerConfig)

        min.addEventListener("click", ()=>{
            if (numVol.textContent > 0) {
                numVol.textContent--
                this.soundInstance.volume = numVol.textContent/10
                this.soundInstance.currentTime = 0
                this.soundInstance.volume = this.soundInstance.volume
                this.soundInstance.play()
            }
        })

        max.addEventListener("click", ()=>{
            if (numVol.textContent < 10) {
                numVol.textContent++
                this.soundInstance.volume = numVol.textContent/10
                voltest1.volume = this.soundInstance.volume
            }
            this.soundInstance.currentTime = 0
            this.soundInstance.play()
        })

        containerConfig.addEventListener("mouseleave", ()=>{
            this.soundInstance.currentTime = 0
            this.soundInstance.pause()
            console.log("lol");
        })

    }

    play(){
        this.soundInstance.play()
    }

    pause(){
        this.soundInstance.pause()
    }
}

const countDownAudio = new VolumeOption("countdown volume", 'pong/countdown-sound-effect-8-bit-151797.mp3', .3)
const clockAudio = new VolumeOption("clock ticking volume", 'pong/clock-ticking-60-second-countdown-118231.mp3', .2, true)
const pointAudio = new VolumeOption("point volume", 'pong/tennis-smash-100733.mp3', .6)
const smashBarAudio = new VolumeOption("hit bar volume", 'pong/one_beep-99630.mp3', .9)

menuOpt.addEventListener("click", ()=>[
    opt.classList.remove("none")
])

const back = document.getElementById("back")
back.addEventListener("click", ()=>{
    opt.classList.add("none")
})

const body = document.getElementById("body")
const container = document.querySelector(".container-question")
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")
const menu = document.getElementById("menu")
const menustart = document.getElementById("menu-start")
const menuContinue = document.getElementById("continue")
const pause = document.getElementById("pause")
const throwControl = document.getElementById("throw")
const rsvTimeContainer = document.getElementById("rsv-count")
const P1HTML = document.getElementById("player1")
const P2HTML = document.getElementById("player2")


let response
let GameIsRunning = false
let enter = false
let fCountInit = true
let thrownIn
let counting = false


function fCount(time) {
    if (!counting) {
        counting = !counting
        rsvTimeContainer.innerHTML = `
        <p id="rsv-count__throw">throwing</p>
        <span id="rsv__span">${time}</span>
        `
        countDownAudio.play()
        if (!thrownIn) {
            thrownIn = setInterval(() => {
                time--
                rsvTimeContainer.innerHTML = `
                <p id="rsv-count__throw">throwing</p>
                <span id="rsv__span">${time}</span>
                `
            if (time <= 0) {
                rsvTimeContainer.innerHTML = "GO"
                setTimeout(() => {
                    rsvTimeContainer.innerHTML = ""
                }, 500);
                clearInterval(thrownIn)
                thrownIn = null
            }
        }, 1000);
        }
        counting = !counting
    }
}

let points = {
    p1: 1,
    p2: 1
}

function resetPoints() {
    points = {
        p1: 1,
        p2: 1
    }
    P1HTML.innerHTML = 0
    P2HTML.innerHTML = 0
}

let started = false
function ClickInPlay(gametimeselected, functionCount) {

    function resetAll() {
        
    }

    menuContinue.classList.remove("impossible")
    menuContinue.classList.add("possible")
    document.removeEventListener("keypress", handleKeyPress)
    fCount(functionCount)
    started = true
    container.classList.add("none")
    menu.classList.add("none")
    const screenDiv = document.querySelector("#screen")
    
    let gameTime = gametimeselected
    let intervalGame
    
    const timer = document.getElementById("timer")
    timer.textContent = gametimeselected
    
    function tf() {
        return Math.random() < 0.5;
    }

    function fContinue() {
            initCount()
            menu.classList.add("none")
    }

    function initCount() {
        clockAudio.play()
        menu.classList.add("none")
        if (enter) {
            GameIsRunning = true
            intervalGame = setInterval(() => {
                if (ball.bounce == 2) {
                    gameTime++
                    console.log("sumado");
                }
                gameTime--;
                timer.textContent = gameTime
                if (gameTime <= 0) {
                    clearInterval(intervalGame)
                    showResults()
                    enter = true
                    menuContinue.removeEventListener("click", fContinue)
                }
            }, 1000);
        }
    }
    
    function pauseCount() {
        clockAudio.pause()
        menu.classList.add("none")
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
            this.dy = 0
            this.y = this.sH / 2
            this.element.style.transform = `translateY(${this.y}px)`
            setTimeout(() => {
                this.dy = 1
            }, functionCount * 1000);
        }
    
        upBar(){
            if (!this.moving && enter && GameIsRunning) {
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
            if (!this.moving && enter && GameIsRunning) {
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
            this.dy = 1
            this.dx = 1
            this.moving = null
            this.bounce = 0
        }
    
        reset(){
            pauseCount()
            enter = false
            this.element.style.transform = `translateY(${this.sH / 2}px) translateX(${this.sW / 2 + 3}px)`
            clearInterval(this.moving)
            this.bounce = 0
            this.moving = null
            this.y = this.sH / 2
            this.x = this.sW / 2 + 3
            this.dy = 0
            this.dx *= -1
            this.ballHeight = this.element.offsetHeight
        }
        
        get differenceY(){
            return [((this.y + this.ballHeight /2) - (P1.top + P1.barHeight/2)) / 17.5,
                    ((this.y + this.ballHeight /2) - (P2.top + P2.barHeight/2)) / 17.5]
                }
                
        moveBall(){
            initCount()
            this.moving = setInterval(() => {
                if (!GameIsRunning) {
                    return;
                }
                if (this.y >= this.sH || this.y <= 0) {
                    this.dy *= -1
                    this.bounce++
                }
                if ((this.x <= 5 && ((this.y + 5 >= P1.top) && (this.y - 5 <= P1.bottom)))) {
                    this.dy = -ball.differenceY[0]
                    this.dx *= -1
                    this.bounce = 0
                    smashBarAudio.currentTime = 0
                    smashBarAudio.play()
                }
                else if ((this.x >= this.sW && (this.y + 5 >= P2.top) && (this.y - 5 <= P2.bottom))) {
                    this.dy = -ball.differenceY[1]
                    this.dx *= -1
                    this.bounce = 0
                    smashBarAudio.currentTime = 0
                    smashBarAudio.play()
                }
                    let win = 2000
                if (this.x - 5 >= this.sW + 5) {
                    pointAudio.play()
                    console.log("point");
                    fCount(functionCount)
                    this.reset()
                    P1.play()
                    P2.play()
                    ball.reset()
                    setTimeout(() => {
                        ball.reset()
                        enter = true
                        ball.moveBall()
                    }, functionCount * 1000);
                    P1HTML.innerHTML = points.p1++
                    P1HTML.classList.add("rainbow-text")
                    setTimeout(() => {
                        P1HTML.classList.remove("rainbow-text")
                    }, win);
                } 
                else if (this.x <= 0) {
                    pointAudio.play()
                    console.log("point");
                    fCount(functionCount)
                        this.reset()
                        P1.play()
                        P2.play()
                        ball.reset()
                        setTimeout(() => {
                            ball.reset()
                            enter = true
                            ball.moveBall()
                        }, functionCount * 1000);
                        P2HTML.innerHTML = points.p2++
                        P2HTML.classList.add("rainbow-text")
                        setTimeout(() => {
                            P2HTML.classList.remove("rainbow-text")
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
    // setTimeout(() => {
    //         power.addToScreen()
    //         power.movePower()
    //     }, 1000);
    
        ball.reset()
        
        function showResults() {
            throwControl.classList.add("impossible")
            ball.reset()
            GameIsRunning = true
            P1.play()
            P2.play()
            if (points.p1 > points.p2) {
                timer.textContent = "PLAYER 1 WINS"
            } else if (points.p1 < points.p2){
                timer.textContent = "PLAYER 2 WINS"
            } else {
                timer.textContent = "TIE"
            }
            menuContinue.classList.remove("possible")
            menuContinue.classList.add("impossible")
        } 

    function clickInYes() {
        console.log("si");
        container.classList.add("none")
        fCount(functionCount)
        gameTime = gametimeselected
        timer.textContent = gametimeselected
        resetPoints()
        power.removeToScreen()
        P1.play()
        P2.play()
        ball.reset()
        setTimeout(() => {
            ball.reset()
            enter = true
            ball.moveBall()
        }, functionCount * 1000);
    }

    function clickInNo() {
        console.log("no");
        container.classList.add("none")
        initCount()
    }
    
    function yn() {
        GameIsRunning = false
        container.classList.remove("none")
        yes.removeEventListener("click", clickInYes)
        yes.addEventListener("click", clickInYes)
        no.removeEventListener("click", clickInNo)
        no.addEventListener("click", clickInNo)
    }
            
    
    document.addEventListener("keypress", (start)=>{
        if (start.code === "Enter" && menu.className == "none") {
            pauseCount()
            yn()
        }
        if (start.code === "Space" && !GameIsRunning && enter && container.className == "none") {
            initCount()
        } else if (start.code === "Space" && GameIsRunning) {
            pauseCount()
            menu.classList.remove("none")
        }
    })
    menuContinue.addEventListener("click", fContinue)
    setTimeout(() => {
        ball.reset()
        enter = true
        ball.moveBall()
    }, functionCount * 1000);
}

menustart.addEventListener("click", removeMenu)

function handleKeyPress(event) {
    if (event.code === "Enter" && menu.className == "none") {
        console.log("new ball");
        menustart.removeEventListener("click", removeMenu)
        ClickInPlay(60, 3)
        throwControl.textContent = "RESET = ENTER"
        throwControl.classList.remove("possible")
        menustart.classList.add("impossible")
    } else if (event.code === "Space" && !started) {
        menu.classList.remove("none")
        started = false
        menustart.addEventListener("click", removeMenu)
    }
    event.preventDefault()
}

var backgroundMusic2 = new Audio('2020-03-22_-_8_Bit_Surf_-_FesliyanStudios.com_-_David_Renda.mp3'); // Reemplaza con el nombre correcto de tu archivo
backgroundMusic2.loop = true;
backgroundMusic2.volume = .5

function removeMenu() {
    if (!started) {
        backgroundMusic2.play()
        menu.classList.add("none")
        container.classList.add("none")
        document.addEventListener("keypress", handleKeyPress)
    }
}

menuContinue.classList.add("impossible")
throwControl.classList.add("possible")