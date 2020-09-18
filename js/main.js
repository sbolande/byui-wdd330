const links = [
    {
        label: "Week01 Notes",
        url: "week01/index.html"
    }
];

function createLinks() {
    links.forEach(link => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${link.url}">${link.label}</a>`;
        document.getElementById("links").appendChild(listItem);
    });
};