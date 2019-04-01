var TextItem = function(title, url, snippet) {
    var title = title || 'Title is missing.';
    var url = url || 'URL is missing.';
    var snippet = snippet || 'Snippet is missing.';
    var domElement = null;
    var dom = {
        title: null,
        url: null,
        snippet: null
    };

    function createDomElement() {
        var el = document.createElement('li');
        var titleEl = document.createElement('div');
        var urlEl = document.createElement('div');
        var snippetEl = document.createElement('div');
        
        titleEl.innerHTML = title;
        urlEl.innerHTML = url;
        snippetEl.innerHTML = snippet;

        titleEl.className = 'text-title';
        urlEl.className = 'text-url';
        snippetEl.className = 'text-snippet';
        
        el.appendChild(titleEl);
        el.appendChild(urlEl);
        el.appendChild(snippetEl);

        el.className = 'text-item';

        return el;
    };

    function getDomElement() {
        return domElement;
    };

    function addListeners() {
        dom.title.addEventListener('click', openLink);
        dom.url.addEventListener('click', openLink);
    };

    
    function fetchDom() {
        dom.title = domElement.children[0];
        dom.url = domElement.children[1];
        dom.snippet = domElement.children[2];
    };

    function openLink() {
        app.openLinkInNewTab(url);
    }

    // initialize
    (function() {
        domElement = createDomElement();
        fetchDom();
        addListeners();
    })();

    return {
        getDomElement: getDomElement
    };
};