// import throttle from 'lodash.throttle'
// import for webpack
import "../css/normalize.css"
import "../css/_main.css"
import "../img/background_blot.png"
import "../img/blot.gif"
import "../img/healthbar.webp"
import "../img/poster.jpg"
import { prepareToAction } from "./load"
import { onscroll, throttle } from "./scroll"

window.addEventListener('scroll', throttle(onscroll, 1500))
window.addEventListener('load', prepareToAction)
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0)
})

