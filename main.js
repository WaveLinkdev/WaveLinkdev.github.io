window.onload = () => {
    GenerateDisclaimer();
    GenerateNavbar();
};

async function getData() {
    var res = await fetch("/data.json");
    var data = res.json();
    return data;
}

function GenerateDisclaimer() {
    var disclaimer = document.createElement("p");
    disclaimer.innerHTML = `<p class="warning">
        This page is still under development. For more accurate information refer to <a href="http://wavelink.tk">the
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
