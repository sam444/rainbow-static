var loading  =  document.createElement("div");
loading.innerHTML = '<div id="loading" style="font-size: 150%;padding: 1em 0;margin: 0 auto;text-align: center;">Loading<img style="display:block;margin:auto;margin-top:5px;" src="http://rainbow.ebaotech.com/static/image/loading.gif"></div>';
document.body.appendChild(loading);
var hight = document.documentElement.clientHeight;
var loadingDiv = document.getElementById("loading");
loadingDiv.style.marginTop = (hight / 2 - 72) + "px";
window.onload = function() {
    var app = document.getElementById("app");
    loadingDiv.style.display = "none";
    app.style.display = "block";
};