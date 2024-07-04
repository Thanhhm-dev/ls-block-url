document.addEventListener('DOMContentLoaded', function() {
    const listUrl = document.getElementById('listUrl');
    
    function loadUrlPatterns()
    {
        chrome.storage.sync.get('urls', function(store) {
            const urls = store.urls || [];
            listUrl.innerHTML = '';
            urls.forEach((url, index) => {
                const div = document.createElement('div');
                div.textContent = url;

                const deleteSpan = document.createElement('span');
                deleteSpan.textContent = 'X';
                deleteSpan.style.marginLeft = '5px';
                deleteSpan.style.cursor = 'pointer';
                deleteSpan.style.color = 'red';
                deleteSpan.addEventListener('click', function() {
                    urls.splice(index, 1);
                    chrome.storage.sync.set({ urls: urls }, function() {
                        loadUrlPatterns();
                    });
                });

                div.appendChild(deleteSpan);
                listUrl.appendChild(div);
            });
        });
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            chrome.tabs.sendMessage(activeInfo.urls, { 
                action: 'loadData',
                data: urls
            });
        });
    }

    document.getElementById('formSubmit').addEventListener('submit', function(e) {
        e.preventDefault();
        chrome.storage.sync.get('urls', function(store) {
            const url = document.getElementById('url').value;
            const urls = store.urls || [];
            urls.push(url);
            chrome.storage.sync.set({ urls: urls }, function() {
                loadUrlPatterns();
            });
        });
    });

    loadUrlPatterns();
});


