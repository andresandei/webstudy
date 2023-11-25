document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Get form data
        var itemName = document.getElementById("itemName").value;
        var itemImage = document.getElementById("itemImage").files[0]; // Arquivo do input
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
        .then(response => response.text()) // Converte a resposta para texto
        .then(data => {
            console.log(data);  // Log da resposta bruta

            try {
                var jsonData = JSON.parse(data);
                
                // Exibe a notificação
                displayNotification(jsonData.status, jsonData.message);

            } catch (error) {
                console.error('Erro ao analisar JSON:', error);
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});

function displayNotification(status, message) {
    var notificationContainer = document.getElementById('notificationContainer');
    var notificationContent = document.getElementById('notificationContent');
    var okButton = document.getElementById('okButton');

    // Defina o conteúdo e o estilo com base no status...

    // Exibe a notificação
    notificationContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Se o status for "success", altera o texto para "Completo" e exibe o botão OK
    if (status === 'success') {
        notificationContent.innerHTML = 'Completo';
        okButton.style.display = 'block';
    } else {
        // Caso contrário, mantém o texto original
        notificationContent.innerHTML = message;
        okButton.style.display = 'none';
    }

    // Atacha o evento de clique ao botão OK
    okButton.addEventListener('click', function () {
        closeNotification(notificationContainer);
    });
}

function closeNotification(container) {
    container.style.display = 'none';
    document.body.style.overflow = 'auto';
}

//TODO: Make a feedback of the registering process
//TODO: Make a way to add more than 1 image
//TODO: Make to delete a song from the list?