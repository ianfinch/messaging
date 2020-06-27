document.getElementById("source").addEventListener("input", updateDiagram);
document.getElementById("download").addEventListener("click", downloadSvg);
document.getElementById("about").addEventListener("click", showHelp);
document.getElementById("close-help").addEventListener("click", closeHelp);
updateDiagram();

function updateDiagram() {
    var diagram = document.getElementById("diagram");
    var options = {theme: 'hand'};
    var editor = document.getElementById("editor");
    var src = document.getElementById("source").value;

    if (editor.classList.contains("parse-error")) {
        editor.classList.remove("parse-error");
    }

    try {
        var d = Diagram.parse(src);
        if (diagram.children) {
            [...diagram.children].forEach(child => diagram.removeChild(child));
        }
        d.drawSVG('diagram', options);
    } catch (e) {
        editor.classList.add("parse-error");
        if (e.name !== "ParseError") {
            console.error(e);
        }
    }
}

function serialise(content, mimeType) {
    let serialised = btoa(content);
    return "data:" + mimeType + ";base64,\n" + serialised;
}

function downloadSvg() {

    let svg = [...document.getElementById("diagram").children].filter(x => x.tagName === "svg")[0];
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    let fontFamily = document.createElement("style");
    fontFamily.textContent = "@font-face {font-family: danielbd; src: url('" + fontData + "');}";
    svg.getElementsByTagName("defs")[0].appendChild(fontFamily);
    svg.getElementsByTagName("desc")[0].textContent = document.getElementById("source").value;

    let link = document.createElement("a");
    link.setAttribute("download", "diagram.svg");
    link.href = serialise(svg.outerHTML, "image/svg+xml");
    document.body.appendChild(link);
    link.click();
}

function showHelp() {
    let popup = document.getElementById("help");
    if (popup.classList.contains("hidden")) {
        popup.classList.remove("hidden");
    }
}

function closeHelp() {
    let popup = document.getElementById("help");
    popup.classList.add("hidden");
}
