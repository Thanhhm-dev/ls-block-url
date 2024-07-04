const content = `
<!DOCTYPE html>
<html>

<head>
    <title>Thông báo</title>
</head>

<body class="body-ls-vn">
    <div id="notification-warn">
        <button type="button" id="btn-ls-vn">Đóng</button>
        <div class="container-ls-vn">
            <svg viewBox="0 0 960 300" class="svg-ls-vn">
                <symbol id="s-text">
                    <text text-anchor="middle" x="50%" y="80%">Production!!!</text>
                </symbol>

                <g class="g-ants">
                    <use xlink:href="#s-text" class="text-copy-ls-vn"></use>
                    <use xlink:href="#s-text" class="text-copy-ls-vn"></use>
                    <use xlink:href="#s-text" class="text-copy-ls-vn"></use>
                    <use xlink:href="#s-text" class="text-copy-ls-vn"></use>
                    <use xlink:href="#s-text" class="text-copy-ls-vn"></use>
                </g>
            </svg>
        </div>
    </div>
</body>

</html>
`;

document.addEventListener('DOMContentLoaded', function() {
    function showWarnignAlert() {
        let notification = document.createElement('div');
        notification.id = 'my-notification';
        notification.innerHTML = content;
        document.body.appendChild(notification);
    
        let btn = document.getElementById("btn-ls-vn");
        btn.addEventListener("click", function () {
            notification.remove();
        });
    }
    
    chrome.storage.sync.get('urls', function(store) {
        const urls = store.urls || [];
        const currentUrl = window.location.href;
    
        urls.forEach(url => {      
            if (currentUrl.startsWith(url)) {  
                showWarnignAlert();
                document.querySelectorAll('form').forEach(form => {
                    if (form.method.toUpperCase() === 'POST') {
                        form.method = '';
                        form.action = '/';
                        form.setAttribute('onsubmit', `
                            alert('You are submitting data on a blocked URL!!!');
                            return false;
                        `);
                    }
                });
            }
        });
    });
});
