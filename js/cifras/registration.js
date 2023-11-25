document.addEventListener("DOMContentLoaded", function () {
    var registrationForm = document.getElementById("registrationForm");
    var registerButton = document.getElementById("registerButton");
    var okButton = document.getElementById("okButton");

    // Hide the Register button during processing
    registerButton.style.display = 'none';

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Hide the Register button during processing
        registerButton.style.display = 'none';

        // Get form data
        var itemName = document.getElementById("itemName").value;
        var itemImage = document.getElementById("itemImage").files[0]; // File input
        var itemTono = document.getElementById("itemTono").value;

        // Create FormData object to send files
        var formData = new FormData();
        formData.append("itemName", itemName);
        formData.append("itemImage", itemImage);
        formData.append("itemTono", itemTono);

        // Display "Cadastrando..." message immediately
        displayNotification("processing", "Cadastrando...");

        // Use fetch to send data to the server
        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text()) // Convert response to text
        .then(data => {
            try {
                var jsonData = JSON.parse(data);

                // Update the notification content and style based on the status
                displayNotification(jsonData.status, jsonData.message);

                // If successful, hide the OK button and show the Register button again
                if (jsonData.status === 'success') {
                    okButton.style.display = 'block';
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // OK button click event to hide the notification and show the Register button
    okButton.addEventListener("click", function () {
        document.getElementById('notificationContainer').style.display = 'none';
        registerButton.style.display = 'block';
        okButton.style.display = 'none';
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
    } else if (status === 'processing') {
        notificationContainer.classList.add('processing');
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