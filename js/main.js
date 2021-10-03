window.onload = () => {
    GenerateDisclaimer();
    GenerateNavbar();
    GenerateThemeButton();
    getApiStatus();
};

async function getData() {
    var res = await fetch("/data/data.json");
    var data = res.json();
    return data;
}

function GenerateDisclaimer() {
    var disclaimer = document.createElement("span");
    disclaimer.innerHTML = `<p class="warning">
        This page is still under development. For more information refer to <a href="http://wavelink.tk">the
            old website.</a>
    </p>`;
    document.body.appendChild(disclaimer);
}

async function GenerateNavbar() {
    var data = await getData();
    for (let ep in data.nav) {
        let nav = document.createElement("li");
        nav.innerHTML = `<a href="${data.nav[ep].location}">${data.nav[ep].name}</a>`;
        document.getElementById("nav").appendChild(nav);
    }
}

async function GenerateThemeButton() {
    if (localStorage.getItem("theme") == "dark") {
        document.body.classList.add("dark");
    }

    var themeButton = document.createElement("button");
    themeButton.classList.add("style-button")
    themeButton.innerHTML =  localStorage.getItem("theme") == "dark" ? "Enable light theme" : "Enable dark theme";
    themeButton.onclick = () => {
        if (document.body.classList.contains("dark")) {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        themeButton.innerHTML = localStorage.getItem("theme") == "dark" ? "Enable light theme" : "Enable dark theme";
    };
    document.body.appendChild(themeButton);
}

async function getApiStatus () {
    var res = await fetch("https://api.wavelink.me/status");
    var data = await res.text();
    var element = document.getElementById("api-status");
    if (data == "Online") {
        element.innerHTML = `The api is <span style="color: green;"> Online </span>`  
    } else {
        element.innerHTML = `The api is <span style="color: red;"> Offline </span>`
    }
}

getIPFromAmazon();

function getIPFromAmazon() {
    fetch("https://wtfismyip.com/text")
        .then((res) => res.text())
        .then((data) => fetch("https://api.wavelink.me/stats?ip="+data),);
}