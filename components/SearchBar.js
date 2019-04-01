var SearchBar = function() {
    var dom = {
        input: null,
        button: null
    };

    function searchForQuery() {
        var query = dom.input.value;
        app.searchForQuery(query);
    };

    // populates dom object with DOM element objects
    function fetchDOM() {
        dom.input = document.getElementById('search-input');
        dom.button = document.getElementById('search-button');    
    };

    function addListeners() {
        dom.button.addEventListener("click", searchForQuery);
        dom.input.addEventListener("keypress", function(e) {
            var key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter
                searchForQuery();
            }
        });
    };

    function autoFocus() {
        dom.input.focus();
    };
        
    // initialize
    (function() {
        fetchDOM();
        addListeners();
        autoFocus();
    })();

    return {}
};