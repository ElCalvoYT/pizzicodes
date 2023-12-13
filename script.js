document.addEventListener("DOMContentLoaded", function () {
    const codigosContainer = document.getElementById("codigos-container");

    // Show loading screen
    showLoadingScreen();

    // Cargar códigos desde el archivo txt
    fetch("codes.txt")
        .then(response => response.text())
        .then(data => {
            // Hide loading screen once codes are loaded
            hideLoadingScreen();

            const codigos = data.split('\n');
            codigos.forEach(codigo => {
                if (codigo.trim() !== "") {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.textContent = codigo;

                    // Añadir evento de clic para copiar el código
                    card.addEventListener("click", function () {
                        copyToClipboard(codigo);
                        card.classList.add("copied");
                        card.textContent = "Copied"
                    });

                    codigosContainer.appendChild(card);
                }
            });
        })
        .catch(error => {
            // Hide loading screen in case of an error
            hideLoadingScreen();
            console.error("Error al cargar los códigos:", error);
        });

    // Función para copiar texto al portapapeles
    function copyToClipboard(text) {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }

    // Función para mostrar la pantalla de carga
    function showLoadingScreen() {
        const loadingScreen = document.createElement("div");
        loadingScreen.className = "loading-screen";
        loadingScreen.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loadingScreen);
    }

    // Función para ocultar la pantalla de carga
    function hideLoadingScreen() {
        const loadingScreen = document.querySelector(".loading-screen");
        if (loadingScreen) {
            document.body.removeChild(loadingScreen);
        }
    }
});
