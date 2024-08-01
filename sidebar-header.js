function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

window.addEventListener('DOMContentLoaded', () => {
    loadHTML('./header.html', 'header-container');
    loadHTML('./sidebar-nav.html', 'sidebar-container');
});
