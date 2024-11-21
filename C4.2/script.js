document.addEventListener("DOMContentLoaded", function() {
    const funnyJokeButton = document.getElementById("funny-joke-btn");
    const lameJokeButton = document.getElementById("lame-joke-btn");
    const jokeContainer = document.getElementById("joke-container");

    // Funkcja do pobierania losowego żartu z kategorii
    function getJoke(category) {
        fetch(`/jokebook/joke/${category}`)
            .then(response => response.json())
            .then(data => {
                if (data.joke) {
                    jokeContainer.innerHTML = `<p>${data.joke}</p><p><strong>Odpowiedź:</strong> ${data.response}</p>`;
                } else {
                    jokeContainer.innerHTML = `<p>${data.error}</p>`;
                }
            })
            .catch(error => {
                jokeContainer.innerHTML = `<p>Błąd: ${error.message}</p>`;
            });
    }

    // Obsługa przycisków
    funnyJokeButton.addEventListener("click", function() {
        getJoke("funnyJoke");
    });

    lameJokeButton.addEventListener("click", function() {
        getJoke("lameJoke");
    });
});
