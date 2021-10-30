getApiStatus();

var contentLoaded = false;

document.addEventListener("DOMContentLoaded", function () {
    contentLoaded = true;
});

async function getApiStatus() {
    var error = "";
    try {
        var res = await fetch("https://api.wavelink.me/status");
    } catch (e) {
        error = e;
    }

    if (contentLoaded) {
        setDom();
    } else {
        while (!contentLoaded) {}
        setDom()
    }

    function setDom() {
        const element = document.getElementById("api-status");
        if (res) {
            if(res.status == 200) {
                element.innerHTML = "200";
                element.style.color = "green";
            } else {
                element.innerHTML = res.status;
                element.style.color = "red";
            }
        } else {
            console.log("cs");
            element.innerHTML = error.toString().replace("TypeError: ", "");
            element.style.color = "red";
        }
    }
}
