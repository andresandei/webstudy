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
                // Try to parse the response as JSON
                var jsonData = JSON.parse(data);
                console.log(jsonData);  // Log the parsed JSON data

                // Display the full-screen notification
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
    var notificationMessage = document.getElementById('notificationMessage');

    // Set the content and style based on the status
    notificationMessage.innerHTML = message;

    // Display the notification
    notificationContainer.classList.remove('hidden');

    // Focus on the OK button for accessibility
    document.getElementById('okButton').focus();
}

function returnToListPage() {
    // Redirect to the list page (adjust the URL as needed)
    window.location.href = 'list-page.html';
}

//TODO: Make a feedback of the registering process
//TODO: Make a way to add more than 1 image
//TODO: Make to delete a song from the list?