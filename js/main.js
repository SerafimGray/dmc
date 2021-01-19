import { prepareToAction } from "./load.js"
import { onscroll, throttle } from "./scroll.js"

window.addEventListener('scroll', throttle(onscroll, 1500));
window.onload = prepareToAction
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

