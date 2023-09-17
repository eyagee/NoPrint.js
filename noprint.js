/*
NoPrint.js V1.0
Created by PDFAntiCopy.com
*/
var noCopy = true; // Prevent copying text
var noPrint = true; // Prevent printing
var noScreenshot = true; // Prevent taking screenshots

if (noCopy) {
    document.body.oncopy = function () {
        return false;
    };
    document.body.oncontextmenu = function () {
        return false;
    };
    document.body.onselectstart = document.body.ondrag = function () {
        return false;
    };
    document.onkeydown = function (event) {
        if ((event.ctrlKey || event.metaKey) && (event.keyCode == 67 || event.keyCode == 88)) {
            // Disable copy (Ctrl+C or Ctrl+X)
            event.preventDefault();
        }
    };
}

if (noPrint) {
    var c = document.createElement("span");
    c.style.display = "none";
    c.style.position = "absolute";
    c.style.background = "#000";
    var first = document.body.firstChild;
    var wraphtml = document.body.insertBefore(c, first);
    c.setAttribute('width', document.body.scrollWidth);
    c.setAttribute('height', document.body.scrollHeight);
    c.style.display = "block";
    var cssNode3 = document.createElement('style');
    cssNode3.type = 'text/css';
    cssNode3.media = 'print';
    cssNode3.innerHTML = 'body{display:none}';
    document.head.appendChild(cssNode3);
}

var cssNode2 = document.createElement('style');
cssNode2.type = 'text/css';
cssNode2.media = 'screen';
cssNode2.innerHTML = 'div{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}';
document.head.appendChild(cssNode2);
document.body.style.cssText = "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";

function toBlur() {
    if (autoBlur) document.body.style.cssText = "-webkit-filter: blur(5px);-moz-filter: blur(5px);-ms-filter: blur(5px);-o-filter: blur(5px);filter: blur(5px);";
}

function toClear() {
    document.body.style.cssText = "-webkit-filter: blur(0px);-moz-filter: blur(0px);-ms-filter: blur(0px);-o-filter: blur(0px);filter: blur(0px);";
}

document.onclick = function (event) {
    toClear();
}

document.onmouseleave = function (event) {
    toBlur();
}

document.onblur = function (event) {
    toBlur();
}

document.addEventListener('keyup', (e) => {
    if (e.key == 'PrintScreen' && noScreenshot) {
        navigator.clipboard.writeText('');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key == 'p' && noPrint) {
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    
    // Prevent Ctrl + A (Select All)
    if (e.ctrlKey && e.key == 'a' && noCopy) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    
    // Prevent Ctrl + C (Copy)
    if (e.ctrlKey && e.key == 'c' && noCopy) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    // Prevent Windows + Shift + S (Snipping Tool)
    if ((e.metaKey || e.ctrlKey) && e.key == 'S' && e.shiftKey && noScreenshot) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
