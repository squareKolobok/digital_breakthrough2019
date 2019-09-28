var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.onload = function () {
    var map = new YaMaps();
    map.init('55.908469', '48.989186');
    map.AddPlaceMark('55.908469', '48.99', ['#ff0000', '#0000aa', '#63abb0', '#2faa11']);
    map.AddPlaceMark('55.907469', '48.9890', ['#ff0000', '#0000aa']);
    map.AddPlaceMark('55.908', '48.9892', ['#ff0000', '#63abb0', '#2faa11']);
    map.AddPlaceMark('55.905', '48.988', ['#ff0000', '#0000aa', '#2faa11']);
    map.DrawingObj();
    map.GetLocation(console.log);
}