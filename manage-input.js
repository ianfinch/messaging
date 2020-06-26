document.getElementById("source").addEventListener("input", updateDiagram);
updateDiagram();

function updateDiagram() {
    var diagram = document.getElementById("diagram");
    var options = {theme: 'hand'};
    var src = document.getElementById("source");

    if (src.classList.contains("parse-error")) {
        src.classList.remove("parse-error");
    }

    try {
        var d = Diagram.parse(src.value);
        if (diagram.children) {
            [...diagram.children].forEach(child => diagram.removeChild(child));
        }
        d.drawSVG('diagram', options);
    } catch (e) {
        src.classList.add("parse-error");
        if (e.name !== "ParseError") {
            console.error(e);
        }
    }
}
