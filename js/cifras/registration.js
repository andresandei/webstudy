document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var itemName = document.getElementById("itemName").value;
        var itemImage = document.getElementById("itemImage").files[0]; // File input
        var itemTono = document.getElementById("itemTono").value;

        // Create FormData object to send files
        var formData = new FormData();
        formData.append("itemName", itemName);
        formData.append("itemImage", itemImage);
        formData.append("itemTono", itemTono);

        // Use fetch to send data to the server
        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // Convert response to text
        .then(data => {
            console.log(data);  // Log the raw response text

            try {
                var jsonData = JSON.parse(data);
        
                // Display the notification
                displayNotification(jsonData.status, jsonData.message);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

function displayNotification(status, message) {
    var notificationContainer = document.getElementById('notificationContainer');
    var notificationContent = document.getElementById('notificationContent');
    var okButton = document.getElementById('okButton');

    // Set the content and style based on the status
    notificationContent.innerHTML = message;
    notificationContainer.className = ''; // Clear existing classes

    if (status === 'success') {
        notificationContainer.classList.add('success');
    } else if (status === 'error') {
        notificationContainer.classList.add('error');
    }

    // Display the notification
    notificationContainer.style.display = 'flex'; // Change to 'block' if you prefer
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind the notification

    // Attach event listener to the OK button
    okButton.addEventListener('click', function () {
        closeNotification(notificationContainer);
    });
}

function closeNotification(notificationContainer) {
    // Hide the notification
    notificationContainer.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

//TODO: Make a feedback of the registering process
//TODO: Make a way to add more than 1 image
//TODO: Make to delete a song from the list?