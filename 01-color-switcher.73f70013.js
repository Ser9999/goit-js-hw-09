!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");function a(){r.style.backgroundColor="".concat("#".concat(Math.floor(16777215*Math.random()).toString(16)))}t.addEventListener("click",(function(){t.setAttribute("disabled",""),e.removeAttribute("disabled"),a(),n=setInterval(a,1e3)})),e.addEventListener("click",(function(){e.setAttribute("disabled",""),t.removeAttribute("disabled"),clearInterval(n)})),e.setAttribute("disabled","");var n=null}();
//# sourceMappingURL=01-color-switcher.73f70013.js.map