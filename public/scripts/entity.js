const urlPath = window.location.pathname;
const adminPrefix = "admin/";
const isUsers = urlPath.includes(adminPrefix + "users");
const isNotes = urlPath.includes(adminPrefix + "notes");

function renderTable(entities) {
    if (Array.isArray(entities) && !!entities[0]) {
        const table = document.querySelector("table");
        table.innerHTML = "";

        const headerRow = document.createElement("tr");
        for (const key of Object.keys(entities[0])) {
            const cell = document.createElement("th");
            cell.innerText = key;
            headerRow.appendChild(cell);
        }
        const tableHeader = document.createElement("thead");
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement("tbody");
        for (const entity of entities) {
            const row = document.createElement("tr");
            for (const [, value] of Object.entries(entity)) {
                const cell = document.createElement("td");
                cell.innerText = value;
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }
        table.appendChild(tableBody);
    }
}

if (isUsers) {
    document.querySelector("title").textContent = "Users";
    document.querySelector("h1").textContent = "Users";
    fetch("/api/users").then(r => r.json()).then(renderTable);
} else if (isNotes) {
    document.querySelector("title").textContent = "Notes";
    document.querySelector("h1").textContent = "Notes";
    fetch("/api/notes").then(r => r.json()).then(renderTable);
}