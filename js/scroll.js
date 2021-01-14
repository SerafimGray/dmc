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

function onscroll(wait) {
    setVideoSpeed(0, 0, 1, 1000)
    const idList = ['background-blot', 'blot']
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
        switchVisible(counter, listItemsCollection, screenNumber)
        removeScrollClassFromIDs(idList)
        removeScrollClassFromClasses(classList, screenNumber)
    }, wait - 50)
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
    if (window.pageYOffset > previousPosition) {
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
    let time = Date.now();
    return function () {
        if (time + wait - Date.now() < 0) {
            fn(wait);
            time = Date.now();
        }
    }
}

export { onscroll, throttle }