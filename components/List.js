var List = function(type, domElement, domButton) {
    var dom = {
        list: domElement,
        button: domButton
    };
    var page = 1;
    var items = [];

    function addItems(items) {
        for (var i=0;i<items.length;i++) {
            addItem(items[i]);
        }
        incrementPage();
    };

    function addItem(item) {
        dom.list.appendChild(item.getDomElement());
        items.push(item);
    };

    function clear() {
        page = 1;
        items = [];
        domElement.innerHTML = '';
    };

    function getItems() {
        return items;
    };

    function loadMore() {
        app.loadMore(type, page);
    };

    function manageNoResults() {
        var info = document.createElement('li');
        info.className = 'no-results-info';
        info.innerHTML = 'We are sorry, but we couldn\'t find any results for your query.';
        dom.list.innerHTML = '';
        dom.list.appendChild(info);
        app.togglePreloader(false);
        app.toggleMainContainer(true);
        hideButton();
    };

    // increments page, checks if the page limit hit the maximum and hides the button if it did
    function incrementPage() {
        if (page === 10) {
            hideButton();
        }   
        page++;
    };

    function hideButton() {
        domButton.style.visibility = 'hidden';
    };

    function showButton() {
        domButton.style.visibility = 'visible';
    };

    function addListeners() {
        dom.button.addEventListener("click", loadMore);
    };

    // initialize
    (function init() {
        addListeners();
    })();

    return {
        addItems: addItems,
        getItems: getItems,
        clear: clear,
        showButton: showButton,
        manageNoResults: manageNoResults
    };
}