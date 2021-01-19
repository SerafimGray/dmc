import { setVideoSpeed } from './load.js'

function addClassToIDs(idList) {
    idList.forEach(id => document.getElementById(id).classList.add('onscroll'))
}

function addClassToClasses(classList, screenNumber) {
    classList.forEach(className =>
        document
            .getElementsByClassName(className)[screenNumber]
            .classList
            .add('onscroll')
    )
}

function manageHealth(counter, screenNumber) {
    const healthpoint = document.getElementsByClassName('healthpoint')
    if (counter === 1) {
        healthpoint[counter + screenNumber].classList.remove('hide')
    } else {
        healthpoint[screenNumber].classList.add('hide')
    }
}

function onscroll(wait) {
    setVideoSpeed(0, 0, 1, 1000)
    const idList = ['background-blot', 'blot', 'scroll-down']
    addClassToIDs(idList)
    const classList = ['not_first-letter', 'first-letter', 'subtitle', 'total-measure_value', 'total-measure_description', 'results']
    const listItemsCollection = document
        .getElementById('main-list')
        .getElementsByTagName('li')
    const listItems = Array.from(listItemsCollection)
    const screenNumber = listItems.findIndex(listItem => listItem.id === "visible")
    addClassToClasses(classList, screenNumber)
    window.setTimeout(function () {
        setVideoSpeed()
        const counter = scrollToDirection(screenNumber)
        manageHealth(counter, screenNumber)
        switchVisible(counter, listItemsCollection, screenNumber)
        removeScrollClassFromIDs(idList.slice(0, -1))
        removeScrollClassFromClasses(classList, screenNumber)
    }, wait - 500)
}

function removeScrollClassFromClasses(classList, screenNumber) {
    classList.forEach(className =>
        document
            .getElementsByClassName(className)[screenNumber]
            .classList
            .remove('onscroll')
    )
}

function removeScrollClassFromIDs(idList) {
    idList.forEach(id => document.getElementById(id).classList.remove('onscroll'))
}

function scrollToDirection(screenNumber) {
    const screenHeight = document.documentElement.clientHeight
    const previousPosition = screenHeight * screenNumber
    let counter = 1
    if (window.pageYOffset >= previousPosition) {
        window.scrollTo(0, previousPosition + screenHeight)
    } else {
        window.scrollTo(0, previousPosition - screenHeight)
        counter = -1
    }
    return counter
}

function switchVisible(counter, listItemsCollection, screenNumber) {
    document.getElementById("visible").removeAttribute('id')
    listItemsCollection[screenNumber + counter].id = "visible"
}

function throttle(fn, wait) {
    let time = 0;
    return function () {
        if (Date.now() > time + wait) {
            fn(wait);
            time = Date.now();
        }
    }
}

export { onscroll, throttle }