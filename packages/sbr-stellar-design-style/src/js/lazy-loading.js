import LazyLoad from "vanilla-lazyload";

let myLazyLoad = new LazyLoad();

function logElementEvent(eventName, element) {
    console.log(Date.now(), eventName, element.getAttribute("data-src"));
}

const callback_enter = function (element) {
    logElementEvent("🔑 ENTERED", element);
};
const callback_exit = function (element) {
    logElementEvent("🚪 EXITED", element);
};

const callback_error = function (element) {
    logElementEvent("💀 ERROR", element);
    element.src =
        "https://via.placeholder.com/440x560/?text=Error+Placeholder";
};

window.lazyLoadOptions = {
    threshold: 0,
    // Assign the callbacks defined above
    callback_enter: callback_enter,
    callback_exit: callback_exit,
    callback_error: callback_error,
};


window.addEventListener('load', (event) => { 
    myLazyLoad.update();
});