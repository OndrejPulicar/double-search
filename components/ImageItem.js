var ImageItem = function(title, imageSrc) {
    var title = title || 'Title is missing.';
    var imageSrc = imageSrc || 'Link to the picture is missing.';
    var domElement = null;

    // creates an image-item DOM element and returns it
    function createDomElement() {
        var el = document.createElement('li');
        var imgEl = document.createElement('img');
        var titleEl = document.createElement('div');
        
        imgEl.src = imageSrc;
        titleEl.innerHTML = title;
        
        titleEl.className = 'image-title';

        el.appendChild(imgEl);
        el.appendChild(titleEl);

        el.className = 'image-item';

        return el;
    };

    function getDomElement() {
        return domElement;
    };

    function openLink() {
        app.openLinkInNewTab(imageSrc);
    };

    function addListeners() {
        domElement.addEventListener('click', openLink);
    };

    // initialize
    (function() {
        domElement = createDomElement();
        addListeners();
    })();


    return {
        getDomElement: getDomElement,
        title: title
    };
};