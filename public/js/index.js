document.addEventListener("DOMContentLoaded", function() {
    console.log('Your document is ready!');

    const searchInputElement  = document.querySelector('#search-input');
    const searchButtonElement = document.querySelector('#search-button');
    const searchResultBoxElement = document.getElementById('search-result-box');

    let searchResultDataLength = 0;

    /* 
        검색창에서 유저가 키를 눌렀을때 발생하는 이벤트
    */
    searchInputElement.addEventListener('keypress', function(e) {
        /* 만약 누른 키가 Enter 이라면 search button을 클릭하게 한다 */
        if(e.key === "Enter") {
            searchButtonElement.click();
        }
    });

    searchButtonElement.addEventListener('click', function() {
        let searchValue = searchInputElement.value;

        sendAjax("http://localhost:3000/search", searchValue);
    });

    function sendAjax(url, searchData) {
        let data = {'search': searchData };
        let xhr = new XMLHttpRequest();
        data = JSON.stringify(data);
        
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);
        
        xhr.addEventListener('load', function() {
            let resultData = JSON.parse(xhr.responseText);
            
            if(resultData.signal !== "success" || resultData.detail.data.result.length === 0) {
                searchResultBoxElement.style.display = "none";
                return;
            }
            
            searchResultBoxElement.style.display = "block";

            const searchResultBoxUlElement = document.querySelector('#search-result-box ul');

            while(searchResultBoxUlElement.childElementCount !== 0) {
                searchResultBoxUlElement.removeChild(searchResultBoxUlElement.firstChild);
            }

            if(resultData.detail.data.result.length !== 0) {
                searchResultDataLength = resultData.detail.data.result.length;
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
            if(searchResultBoxElement.style.display === 'block') {
                searchResultBoxElement.style.display = 'none';
            }
        }
    });

    searchInputElement.addEventListener('click', function(e) {
        if(searchResultDataLength !== 0) {
            searchResultBoxElement.style.display = 'block';
        }
    })
});
