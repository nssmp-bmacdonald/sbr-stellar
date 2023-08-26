const toggleLoader = (val) => {
    (val) ?
        document.body.insertAdjacentHTML("beforeend", '<div id="loader" class="loader-container fade show" data-loader="true"><div class="loader"><div></div> Loading...</div></div>')
    :
        (document.getElementById('loader')) ? document.getElementById('loader').remove() : null;
    
}

export default toggleLoader;