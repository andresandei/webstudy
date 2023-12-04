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
        var itemImages = document.getElementById("itemImages").files;
        var itemTono = document.getElementById("itemTono").value;

        for (var i = 0; i < itemImages.length; i++) {
            var currentItem = itemImages[i];

            // Check if image type is allowed
            if (!isImageTypeAllowed(currentItem)) {
                // Display error notification immediately
                displayNotification('error', 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.');
                okButton.style.display = 'block';
                return; // Stop further processing
            }

            // Check if image size is within the allowed limit
            if (!isImageSizeAllowed(currentItem)) {
                // Display error notification immediately
                displayNotification('error', 'Sorry, your file is too large.');
                okButton.style.display = 'block';
                return; // Stop further processing
            }

            // Continue with the rest of the processing for this file...
        }

        // Rest of the form submission logic remains the same
        var formData = new FormData();
        formData.append("itemName", itemName);

        for (var i = 0; i < itemImages.length; i++) {
            formData.append("itemImages[]", itemImages[i]);
        }

        formData.append("itemTono", itemTono);

        displayNotification("processing", "Cadastrando...");

        fetch("register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            try {
                var jsonData = JSON.parse(data);

                displayNotification(jsonData.status, jsonData.message);

                okButton.style.display = 'block';
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => ErrorDealing(error));
    });

    // OK button click event to hide the notification
    okButton.addEventListener("click", function () {
        window.open("cifras.html","_self")
        // You can add any additional logic here, such as redirecting to the list page
    });

    function ErrorDealing(error) {
        console.error('Error:', error)
        if (error == "Sorry, your file is too large.") {
            // Handle specific error if needed
        }
    }

    // Function to check if the image type is allowed
    function isImageTypeAllowed(file) {
        var allowedFormats = ["jpg", "jpeg", "png", "gif"];
        var imageFileType = file.name.split('.').pop().toLowerCase();
        return allowedFormats.includes(imageFileType);
    }

    function isImageSizeAllowed(file) {
        // Adjust the maximum allowed size (in bytes) as needed
        var maxSize = 500000; // 500 KB
        return file && file['size'] <= maxSize;
    }

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
        notificationContainer.style.display = 'flex';
    }
});