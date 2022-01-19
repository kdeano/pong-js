import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById("ball"))
const paddlePlayer = new Paddle(document.getElementById("paddle-player"))
const paddleCPU = new Paddle(document.getElementById("paddle-cpu"))
const scorePlayerElem = document.getElementById("score-player")
const scoreCPUElem = document.getElementById("score-cpu")

let lastTime

function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime

        //* Update code every ~7ms

        ball.update(delta, [paddlePlayer.rect(), paddleCPU.rect()])
        paddleCPU.update(delta, ball.y)

        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (isLose()) handleLose()
    }

    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()

    if (rect.right >= window.innerWidth) {
        scorePlayerElem.textContent = parseInt(scorePlayerElem.textContent) + 1
    } else {
        scoreCPUElem.textContent = parseInt(scoreCPUElem.textContent) + 1
    }

    ball.reset()
    paddleCPU.reset()
}

document.addEventListener("mousemove", e => {
    paddlePlayer.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)