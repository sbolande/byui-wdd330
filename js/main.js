const links = [
    {
        label: "Week01 Notes",
        url: "week01/index.html"
    }
];

function createLinks() {
    links.forEach(link => {
        document
            .getElementById("#links")
            .append(`<li><a href="${link.url}">${link.label}</a></li>`);
    });
}
