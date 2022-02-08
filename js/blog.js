const blogs = [];
let ready = false;
const onReady = {
    listeners: [],
    add: (fn) => {
        if (ready) {
            fn.call();
            console.log("us");
        } else onReady.listeners.push(fn);
    },
    call: () => {
        onReady.listeners.forEach((fn) => fn.call());
    },
};

fetch("/assets/blogs/index.json")
    .then((res) => res.json())
    .then((json) => {
        json.forEach((element, index) => {
            fetch("/assets/blogs/" + element)
                .then((res) => res.text())
                .then((md) => {
                    const converter = new showdown.Converter();
                    const html = converter.makeHtml(md);
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    blogs.push(el);
                    if (index + 1 == json.length) {
                        ready = true;
                        onReady.call();
                    }
                });
            
        });
    });

window.addEventListener("load", () => {
    onReady.add(() => {
        const main = document.getElementById("main");
        blogs.forEach(element => {
            main.appendChild(element);
        });
    });
});
