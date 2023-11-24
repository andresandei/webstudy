document.addEventListener("readystatechange", (event) => {
    var popupTrigger = document.getElementById('musicList');
    var popupOverlay = document.getElementById('popupOverlay');
    var popupPanel = document.getElementById('popupPanel');
    var closeBtn = document.getElementById('closeBtn');

    popupTrigger.addEventListener('click', function () {
        openFullscreen();
        popupOverlay.style.display = 'flex';
        popupPanel.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        closeFullscreen();
        popupOverlay.style.display = 'none';
        popupPanel.style.display = 'none';
    });

    // Close the popup when clicking outside the panel
    popupOverlay.addEventListener('click', function (event) {
        closeFullscreen();
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            popupPanel.style.display = 'none';
        }
    });
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
    var musicList = document.getElementById('musicList');
    data.forEach(function (user) {
        
        var userDiv = document.createElement('div');
        userDiv.classList.add('music-item');
        userDiv.innerHTML = 'ID: ' + user.id + '<br>Name: ' + user.nome + '<br>Email: ' + user.path;

        // Add a click event listener to each user item
        userDiv.addEventListener('click', function () {
            // Call the openPopup function with user details
            openPopup(user.path);
        });

        musicList.appendChild(userDiv);
    });
}

function openPopup(imgs) {
    // Clear previous images
    userImageContainer.innerHTML = '';
    let imgsArr = imgs.split("*");

    // Create img elements for each image path
    imgsArr.forEach(function (imagePath) {
        
        var img = document.createElement('img');
        img.classList.add('user-image');
        img.src = "../../img/cifras/"+imagePath;
        userImageContainer.appendChild(img);
    });

    popupOverlay.style.display = 'flex';
    popupPanel.style.display = 'block';
}

// Open full screen
function openFullscreen() {
    if (popupTrigger.requestFullscreen) {
        popupTrigger.requestFullscreen();
    } else if (popupTrigger.mozRequestFullScreen) {
        popupTrigger.mozRequestFullScreen();
    } else if (popupTrigger.webkitRequestFullscreen) {
        popupTrigger.webkitRequestFullscreen();
    } else if (popupTrigger.msRequestFullscreen) {
        popupTrigger.msRequestFullscreen();
    }
}

// Exit full screen
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}