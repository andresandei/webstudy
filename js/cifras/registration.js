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
            try {
                var jsonData = JSON.parse(data);
        
                // Display the notification immediately after clicking Register
                displayNotification(jsonData.status, "Cadastrando...");

                // If successful, update the notification content and style
                if (jsonData.status === 'success') {
                    displayNotification(jsonData.status, jsonData.message);
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // OK button click event to hide the notification
    document.getElementById("okButton").addEventListener("click", function () {
        document.getElementById('notificationContainer').style.display = 'none';
    });
});

function displayNotification(status, message) {
    var notificationContainer = document.getElementById('notificationContainer');
    var notificationContent = document.getElementById('notificationContent');

    // Set the content and style based on the status
    notificationContent.innerHTML = message;
    notificationContainer.className = ''; // Clear existing classes

    if (status === 'success') {
        notificationContainer.classList.add('success');
    } else if (status === 'error') {
        notificationContainer.classList.add('error');
    }

    // Display the notification
    notificationContainer.style.display = 'block';

    // If successful, hide the notification after a few seconds
    if (status === 'success') {
        setTimeout(function () {
            notificationContainer.style.display = 'none';
        }, 3000); // 3 seconds
    }
}