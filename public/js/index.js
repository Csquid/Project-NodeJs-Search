document.addEventListener("DOMContentLoaded", function() {
    console.log('Your document is ready!');

    const searchInputElement  = document.querySelector('#search-input');
    const searchButtonElement = document.querySelector('#search-button');
    
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
            let result = JSON.parse(xhr.responseText);

            if(result.signal !== "success") {
                return;
            } 

            console.log(result);
        });
        
    }
});
