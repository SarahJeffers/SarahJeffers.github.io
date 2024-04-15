document.addEventListener("DOMContentLoaded", function () {
    const quoteText = document.getElementById("quote-text");
    const charName = document.getElementById("character");
    const charAv = document.getElementById("character-avatar");
    const newQuoteBtn = document.getElementById("new-quote-btn");

    // Function to fetch a random quote
    function fetchRandomQuote() {
        fetch("https://officeapi.akashrajpurohit.com/quote/random")
            .then(response => response.json())
            .then(data => {
                // Update the quote text with the fetched quote
                quoteText.textContent = data.quote;
                charName.textContent = data.character;
                charAv.src = data.character_avatar_url; // Set the src attribute of the img element
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
                quoteText.textContent = "Failed to fetch quote. Please try again later.";
            });
    }

    // Fetch a random quote when the page loads
    fetchRandomQuote();

    // Event listener for the "New Quote" button
    newQuoteBtn.addEventListener("click", fetchRandomQuote);
});