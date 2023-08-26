const toggleVisibility = (element) => { 
    let elementTarget = element.getAttribute('data-target');

    document.getElementById(elementTarget).classList.toggle('opened');
    document.getElementById(elementTarget).classList.toggle('show');
    (element.getAttribute('aria-expanded') === "true") ? element.setAttribute('aria-expanded', "false") : element.setAttribute('aria-expanded', "true"); 
};

export default toggleVisibility;