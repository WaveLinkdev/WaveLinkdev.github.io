getApiStatus();

const isDOMready = () =>
    new Promise((resolve) => {
        if (document.readyState === "complete") {
            resolve();
        } else {
            while (document.readyState != "complete") {}
            resolve();
        }
    });

async function getApiStatus() {
    var error = "";
    try {
        var res = await fetch("https://api.wavelink.me/status");
        await isDOMready();
        setDom();
    } catch (e) {
        error = e;
    }

    function setDom() {
        const element = document.getElementById("api-status");
        if (res) {
            if (res.status == 200) {
                element.innerHTML = "200";
                element.style.color = "green";
            } else {
                element.innerHTML = res.status;
                element.style.color = "red";
            }
        } else {
            element.innerHTML = error.toString().replace("TypeError: ", "");
            element.style.color = "red";
        }
    }
}
