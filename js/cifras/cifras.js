document.addEventListener("readystatechange", (event) => {
    var popupTrigger = document.getElementById('musicList');
    var popupOverlay = document.getElementById('popupOverlay');
    var popupPanel = document.getElementById('popupPanel');
    var closeBtn = document.getElementById('closeBtn');

    popupTrigger.addEventListener('click', function () {
        openFullscreen(popupPanel);
        popupOverlay.style.display = 'flex';
        popupPanel.style.display = 'block';
    });

    closeBtn.addEventListener('click', function () {
        closeFullscreen(popupPanel);
        popupOverlay.style.display = 'none';
        popupPanel.style.display = 'none';
    });

    // Close the popup when clicking outside the panel
    popupOverlay.addEventListener('click', function (event) {
        closeFullscreen(popupPanel);
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            popupPanel.style.display = 'none';
        }
    });

    document.getElementById('searchInput').addEventListener('input', function () {
        // Get the search input value
        var searchValue = this.value.toLowerCase();
    
        // Filter music data based on the search value
        var filteredData = userDataArray.filter(function (music) {
            return (
                music.nome.toLowerCase().includes(searchValue) ||
                music.tom.toLowerCase().includes(searchValue)
            );
        });
    
        // Display filtered data
        displayData(filteredData);
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
    musicList.innerHTML = '';
    data.forEach(function (user) {
        
        var userDiv = document.createElement('div');
        userDiv.classList.add('music-item');
        userDiv.innerHTML = user.nome + '<br>' +  user.tom;

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

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// Exit full screen
function closeFullscreen(element) {
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

