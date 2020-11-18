window.onload = function () {
    const hasFocus = document.hasFocus()
    if (hasFocus) {
        startAction()
    } else {
        waitForWindowFocus()
    }
}

function clearIntervalCheck(intervalID, t) {
    if (t > 1) {
        window.clearInterval(intervalID)
        setPlaybackRate(0)
    }
}

function countPlaybackRate(from, to, t) {
    const playbackRate = (1 - t) ** 3 * from + 3 * (1 - t) ** 2 * t * (from - to) + 3 * (1 - t) * t ** 2 * (from - to) + t ** 3 * to
    return playbackRate
}

function runAnimation() {
    document.getElementsByTagName('body')[0].classList.add('run_animation')
}

function setPlaybackRate(playbackRate) {
    document.querySelector('video').playbackRate = playbackRate
}

function setVideoSpeed() {
    const playbackRate = document.querySelector('video').playbackRate
    const to = 0.0625
    if (playbackRate > to) {
        const delay = 1000
        const from = 1.0
        const period = 3000
        const interval = 10
        window.setTimeout(translatePlaybackRate, delay, from, to, period, interval)
    }
}

function startAction() {
    runAnimation()
    setVideoSpeed()
}

function translatePlaybackRate(from, to, period, interval) {
    let t = 0
    const step = interval / period
    const intervalID = window.setInterval(function () {
        const playbackRate = countPlaybackRate(from, to, t)
        setPlaybackRate(playbackRate)
        t += step
        clearIntervalCheck(intervalID, t)
    }, interval);
}

function waitForWindowFocus() {
    window.onfocus = function () {
        startAction()
    }
}
