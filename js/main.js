const links = [
    {
        label: "Week01 Notes",
        url: "week01/index.html"
    }, {
        label: "Week02 Notes",
        url: "week02/index.html"
    }, {
        label: "Week02 Code",
        url: "week02/code.html"
    }, {
        label: "Week03 Code",
        url: "week03/code.html"
    }, {
        label: "Week04 Notes",
        url: "week04/index.html"
    }, {
        label: "Week05 Notes",
        url: "week05/index.html"
    }, {
        label: "Challenge01: TODO Application",
        url: "challenge01/index.html"
    }, {
        label: "Week07 Notes",
        url: "week07/index.html"
    }
];

function createLinks() {
    links.forEach(link => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${link.url}">${link.label}</a>`;
        document.getElementById("links").appendChild(listItem);
    });
};