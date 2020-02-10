document.addEventListener("DOMContentLoaded", function() {
    console.log('Your document is ready!');

    const searchInputElement  = document.querySelector('#search-input');
    const searchButtonElement = document.querySelector('#search-button');
    const searchSuggestBoxElement = document.getElementById('search-suggest-box');
    const searchResultBoxUlElement = document.querySelector('#search-suggest-box ul');

    let searchResultDataLength = 0;

    /* 
        검색창에서 유저가 키를 눌렀을때 발생하는 이벤트
    */
    searchInputElement.addEventListener('keyup', function(e) {
        /* 만약 누른 키가 Enter 이라면 search button을 클릭하게 한다 */
        if(e.key === "Enter") {
            searchButtonElement.click();
        } else {
            let searchValue = searchInputElement.value;

            while(searchResultBoxUlElement.childElementCount !== 0) {
                searchResultBoxUlElement.removeChild(searchResultBoxUlElement.firstChild);
            }
            
            sendAjax("http://localhost:3000/suggest", searchValue);
        }
    });

    //검색
    searchButtonElement.addEventListener('click', function() {
    });
    
    function sendAjax(url, searchKeywordData) {
        let data = {'keyword': searchKeywordData };
        let xhr = new XMLHttpRequest();
        data = JSON.stringify(data);
        
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);
        
        xhr.addEventListener('load', function() {
            let resultData = JSON.parse(xhr.responseText);

            if(resultData.signal === "success") {
                searchResultDataLength = resultData.detail.data.result.length;
            }

            if(resultData.signal !== "success" || searchResultDataLength === 0) {
                searchSuggestBoxElement.style.display = "none";
                searchResultBoxUlElement.classList.remove("add-box");
                return;
            }
            
            searchSuggestBoxElement.style.display = "block";
            searchResultBoxUlElement.classList.add("add-box");

            while(searchResultBoxUlElement.childElementCount !== 0) {
                searchResultBoxUlElement.removeChild(searchResultBoxUlElement.firstChild);
            }

            if(searchResultDataLength !== 0) {
                Object.keys(resultData.detail.data.result).forEach(function(key) {
                    if(key !== 'length') {
                        let liElement = document.createElement("li");
                        liElement.innerText = key;
                      
                        searchResultBoxUlElement.append(liElement);
                    }
                });
            }
            
            console.log(resultData);
        });
        
    }

    document.querySelector("body").addEventListener('click', function(e) {
        /* body를 클릭했을때 만 작동 */
        if(e.toElement === document.querySelector("body")) {
            if(searchSuggestBoxElement.style.display === 'block') {
                searchSuggestBoxElement.style.display = 'none';
            }
        }
    });

    searchInputElement.addEventListener('click', function(e) {

        // if(searchResultDataLength !== 0)
        if(searchResultBoxUlElement.childElementCount !== 0) {
            searchSuggestBoxElement.style.display = 'block';
        }

    })
});
