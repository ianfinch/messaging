document.getElementById("source").addEventListener("input", updateDiagram);
document.getElementById("download").addEventListener("click", downloadSvg);
document.getElementById("about").addEventListener("click", showHelp);
document.getElementById("drawn").addEventListener("click", switchThemeToDrawn);
document.getElementById("straight").addEventListener("click", switchThemeToSimple);
document.getElementById("close-help").addEventListener("click", closeHelp);

var options = { theme: "hand", "font-size": 14 };
updateDiagram();

function updateDiagram() {
    var diagram = document.getElementById("diagram");
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
    let embeddedStyle = document.createElement("style");
    embeddedStyle.textContent = [
        "@font-face { font-family: danielbd; src: url('" + fontData + "'); }",
        "svg .actor path, svg .actor rect { fill: antiquewhite; }",
        "svg .signal path, svg .signal line { stroke: mediumblue; }",
        "svg .signal text { fill: mediumblue; }",
        "svg #markerArrowBlock { fill: mediumblue; }",
        "svg .note path, svg .note rect { stroke: darkgoldenrod; fill: #ffffa5; }"
    ].join("\n");
    svg.getElementsByTagName("defs")[0].appendChild(embeddedStyle);
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

function switchThemeToSimple() {
    options = { theme: "simple", "font-size": 12 };
    updateDiagram();
    document.getElementById("straight").classList.add("hidden");
    if (document.getElementById("drawn").classList.contains("hidden")) {
        document.getElementById("drawn").classList.remove("hidden");
    }
    if (document.getElementsByTagName("body")[0].classList.contains("hand-drawn")) {
        document.getElementsByTagName("body")[0].classList.remove("hand-drawn");
    }
}

function switchThemeToDrawn() {
    options = { theme: "hand", "font-size": 14 };
    updateDiagram();
    document.getElementById("drawn").classList.add("hidden");
    if (document.getElementById("straight").classList.contains("hidden")) {
        document.getElementById("straight").classList.remove("hidden");
    }
    document.getElementsByTagName("body")[0].classList.add("hand-drawn");
}
