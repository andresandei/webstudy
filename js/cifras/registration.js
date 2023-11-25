document.addEventListener("DOMContentLoaded", function () {
    var registrationForm = document.getElementById("registrationForm");
    var registerButton = document.getElementById("registerButton");
    var okButton = document.getElementById("okButton");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Hide the OK button during processing
        okButton.style.display = 'none';

        // Get form data
        var itemName = document.getElementById("itemName").value;
        var itemImage = document.getElementById("itemImage").files[0]; // File input
        var itemTono = document.getElementById("itemTono").value;

        // Check if image type is allowed
        if (!isImageTypeAllowed(itemImage)) {
            displayNotification("error", "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
            return; // Stop further processing
        }

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

                // If successful, show the OK button
                if (jsonData.status === 'success') {
                    okButton.style.display = 'block';
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // OK button click event to hide the notification
    okButton.addEventListener("click", function () {
        document.getElementById('notificationContainer').style.display = 'none';
        // You can add any additional logic here, such as redirecting to the list page
    });

    // Function to check if the image type is allowed
    function isImageTypeAllowed(file) {
        var allowedFormats = ["jpg", "jpeg", "png", "gif"];
        var imageFileType = file.name.split('.').pop().toLowerCase();
        return allowedFormats.includes(imageFileType);
    }
});