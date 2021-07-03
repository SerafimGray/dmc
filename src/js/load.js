export function prepareToAction() {
    const hasFocus = document.hasFocus()
    if (hasFocus) {
        startAction()
    } else {
        waitForWindowFocus()
    }
}

export function startAction() {
    runAnimation()
    setVideoSpeed()
}

export function runAnimation() {
    document.body.classList.add('run_animation')
}

export function setVideoSpeed(delay = 1000, from = 1.0, to = 0, period = 3000) {
    const playbackRate = document.getElementById('background-video').playbackRate
    const isPlaybackInRange = playbackRate > Math.min(from, to) || 
        playbackRate < Math.max(from, to)
    if (isPlaybackInRange) {
        const interval = 10
        setTimeout(translatePlaybackRate, delay, from, to, period, interval)
    }
}

export function translatePlaybackRate(from, to, period, interval) {
    let progress = 0
    const step = interval / period
    const intervalID = setInterval(function () {
        const playbackRate = countPlaybackRate(from, to, progress, 'linear')
        setPlaybackRate(playbackRate)
        progress += step
        clearIntervalCheck(intervalID, progress)
    }, interval);
}

export function countPlaybackRate(from, to, t, method = 'bezier') {
    let playbackRate = 0
    switch (method) {
        case "bezier":
            playbackRate = 
                from * (1 - t) ** 3 + 
                3 * t * Math.abs(from - to) * (1 - t) ** 2 + 
                3 * Math.abs(from - to) * (1 - t) * t ** 2  + 
                to* t ** 3 
            break
        case "linear":
            playbackRate = from + (to - from) * t
    }
    return playbackRate
}

export function setPlaybackRate(playbackRate, minPlaybackRate = 0.0625) {
    const safePlaybackRate = playbackRate < minPlaybackRate ? 0 : playbackRate
    document.getElementById('background-video').playbackRate = safePlaybackRate
}

export function clearIntervalCheck(intervalID, progress) {
    if (progress > 1) {
        clearInterval(intervalID)
    }
}

export function waitForWindowFocus() {
    window.addEventListener('focus', startAction)
}

