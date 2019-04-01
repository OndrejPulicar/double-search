var App = function() {
    var googleApiProps = {
        key: 'AIzaSyC28lIbZRbghRUa5x3C5DqrKRq0MOCZenA', // unique API key
        cx: '004656629007218189634:9qpbujcu8-s' // custom search engine API
    };
    
    var dom = {
        preloader: null,
        main: null
    };

    var searchBar = new SearchBar();
    var textList = new List(
        'text',
        document.getElementById('text-results'),
        document.getElementById('text-results-load-more')    
    );
    var imageList = new List(
        'image',
        document.getElementById('image-results'),
        document.getElementById('image-results-load-more') 
    );

    // remembers current query so when user presses Load more, it can automatically search for it
    var currentQuery = '';
    
    // sends a request to Google Search API and if successful calls displayResults
    // imageSearch - if true, the API will return images, if false the API returns text results
    function search(query, imageSearch, page) {
        var xmlHttp = null;
        var imageSearchStr = (imageSearch) ? '&searchType=image&imgSize=medium' : '';
        var startPage = 1+(page*10-10);

        // creates a HTTP request to Google Search API
        function sendRequestToGoogleApi(query) {
            var url = 'https://www.googleapis.com/customsearch/v1?key='
                + googleApiProps.key + '&cx=' + googleApiProps.cx + '&q=' + encodeURIComponent(query) + '&start=' + startPage + imageSearchStr;
                
            xmlHttp = new XMLHttpRequest(); 
            xmlHttp.onreadystatechange = processRequest;
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        }

        // catch HTTP errors 
        function processRequest() {
            if (xmlHttp.readyState === 4) {
                var response = eval ('('+xmlHttp.responseText+')');
                // success
                if (xmlHttp.status === 200) {
                    if (response.searchInformation.totalResults === '0') {
                        if (!imageSearch) {
                            textList.manageNoResults();
                        } else {
                            imageList.manageNoResults();
                        }    
                    } else {
                        var items = response.items;
                        if (!imageSearch) {
                            displayResults('text', items);
                        } else {
                            displayResults('image', items)
                        }     
                    } 
                // client side error
                } else if (xmlHttp.status >= 400 && xmlHttp.status <= 500) {
                    if (response.error.errors[0].reason === 'dailyLimitExceeded') {
                        console.error('Number of requests to the Google Search API server has been exceeded.');   
                    } else {
                        console.error('There was an error on the client\'s side.');  
                    } 
                // network side error
                } else if (xmlHttp.status >= 500) {
                    console.error('There was an error on the server\'s side.');
                }
            }
        }

        sendRequestToGoogleApi(query);
    };

    // calls the search functions for both lists, hides the main container and shows the preloader
    function searchForQuery(query) {
        toggleMainContainer(false);
        togglePreloader(true);
        showLoadMoreButtons();
        clearLists();
        search(query, false, 1);
        search(query, true, 1); 
        setCurrentQuery(query);
    }

    // depending on searchType this adds TextItems or ImageItems into their lists
    function displayResults(searchType, results) {
        var items = [];
        var list = null;
        var newItem = null;

        for (var i=0;i<results.length;i++) {
            var result = results[i];

            if (searchType === 'text') {
                newItem = new TextItem(result.title, result.formattedUrl, result.snippet);
                items.push(newItem);
            } else if  (searchType === 'image') {
                newItem = new ImageItem(result.title, result.link);
                items.push(newItem);
            }
        }

        if (searchType === 'text') {
            list = textList;
        } else if (searchType === 'image') {
            list = imageList;
        }
        list.addItems(items);
        togglePreloader(false);
        toggleMainContainer(true);
    };

    // removes all the items from both lists
    function clearLists() {
        textList.clear();
        imageList.clear();
    };

    // loads ten more items into the list
    function loadMore(searchType, page) {
        if (searchType === 'text') {
            search(currentQuery, false, page);            
        } else if (searchType === 'image') {
            search(currentQuery, true, page);
        } else {
            console.error('Wrong search type.');
        }
    };

    function toggleMainContainer(show) {
        if (show) {
            dom.main.classList.remove('hidden');
        } else {
            dom.main.classList.add('hidden');
        }        
    };

    function togglePreloader(show) {
        if (show) {
            dom.preloader.classList.remove('hidden');
        } else {
            dom.preloader.classList.add('hidden');
        }
    };

    // shows "Load more" buttons under the lists
    function showLoadMoreButtons() {
        textList.showButton();
        imageList.showButton();
    };

    function openLinkInNewTab(link) {
        window.open(link,"_blank"); 
    };

    // saves the last searched query so this can be used when loading more items with 'See more...' buttons
    function setCurrentQuery(query) {
        currentQuery = query;
    };

    function fetchDom() {
        dom.preloader = document.getElementById('preloader-cont');
        dom.main = document.getElementById('main-results-cont');
    };

    function init() {
        fetchDom();  
    };

    return {
        init: init,
        search: search,
        loadMore: loadMore,
        searchForQuery: searchForQuery,
        openLinkInNewTab: openLinkInNewTab,
        togglePreloader: togglePreloader,
        toggleMainContainer: toggleMainContainer
    };
};