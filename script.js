document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    const gameAppList = document.getElementById("game-app-list");
    const pagination = document.getElementById("pagination");

    searchBar.addEventListener("input", function() {
        console.log("Searching for:", searchBar.value);
    });

    let gamesAndApps = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    fetch('games_and_apps.json')
        .then(response => response.json())
        .then(data => {
            gamesAndApps = data;
            displayPage(currentPage);
            setupPagination();
        });

    function displayPage(page) {
        gameAppList.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = gamesAndApps.slice(start, end);

        pageItems.forEach(app => {
            const appDiv = document.createElement("div");
            appDiv.className = "game-app";

            const img = document.createElement("img");
            img.src = app.img;
            img.alt = app.name;

            const h3 = document.createElement("h3");
            h3.textContent = app.name;

            const p = document.createElement("p");
            p.textContent = app.category;

            const rating = document.createElement("p");
            rating.className = "rating";
            rating.textContent = `Rating: ${app.rating}`;

            const a = document.createElement("a");
            a.href = app.link;
            a.target = "_blank";
            a.className = "download-btn";
            a.textContent = "Download";

            appDiv.appendChild(img);
            appDiv.appendChild(h3);
            appDiv.appendChild(p);
            appDiv.appendChild(rating);
            appDiv.appendChild(a);

            gameAppList.appendChild(appDiv);
        });
    }

    function setupPagination() {
        const pageCount = Math.ceil(gamesAndApps.length / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.addEventListener("click", function() {
                currentPage = i;
                displayPage(currentPage);
            });
            pagination.appendChild(pageButton);
        }
    }
});