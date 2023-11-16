var popupTrigger = document.getElementById('musicList');
var popupOverlay = document.getElementById('popupOverlay');
var popupPanel = document.getElementById('popupPanel');
var closeBtn = document.getElementById('closeBtn');

popupTrigger.addEventListener('click', function () {
    popupOverlay.style.display = 'flex';
    popupPanel.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    popupOverlay.style.display = 'none';
    popupPanel.style.display = 'none';
});

// Close the popup when clicking outside the panel
popupOverlay.addEventListener('click', function (event) {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = 'none';
        popupPanel.style.display = 'none';
    }
});

// Initialize an empty array to store user data
var userDataArray = [];

// Use fetch to call the PHP script and get data
fetch('cifras.php')
    .then(response => response.json())
    .then(data => {
        // Store data in the JavaScript array
        userDataArray = data;

        // Display data in the HTML
        displayData(userDataArray);
    })
    .catch(error => console.error('Error:', error));

// Display data in the HTML
function displayData(data) {
    var userList = document.getElementById('musicList');

    data.forEach(function (user) {
        var userDiv = document.createElement('div');
        userDiv.innerHTML = 'ID: ' + user.id + '<br>Name: ' + user.nome + '<br>Email: ' + user.path + '<hr>';
        userList.appendChild(userDiv);
    });
}
