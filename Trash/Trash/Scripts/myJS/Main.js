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
    var refresh = 10000;
    var LastTime = Date.now();

    var tc = new MapTypeColor();
    var map = new YaMaps();
    map.init('55.796289', '49.108795');

    getTrash(DrawObjs);

    function main() {
        var dt = Date.now() - LastTime;

        if (dt >= refresh) {
            
            LastTime = Date.now();
        }

        requestAnimFrame(main);
    };

    main();

    function DrawObjs(objs) {
        map.RemoveRecicles();

        for (var i = 0; i < objs.length; i++) {
            var key = objs[i];
            var types = [];

            for (var j = 0; j < key.res.length; j++) {
                types.push(key.res[j]);
            }

            map.AddPlaceMark(key.x, key.y, tc.GetColors(types));
        }

        map.DrawingObj();
    }

    //получить список нажатых чекбоксов
    document.getElementById('typetrash').addEventListener('change', function () {
        var checks = document.getElementsByName('type');
        var result = [];

        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                result.push(checks[i].value);
            }
        }

        getTrashFilter(DrawObjs, result);
    });

    document.getElementById('radius').addEventListener('click', function () {
        //рандом, т.к. позиционирование выводит в лес.
        var rand = [['55.8818', '49.0306'], ['55.80657', '48.9986'], ['55.8860', '49.0376'], ['55.8732', '49.1450785']];
        var point = rand[Math.floor(Math.random() * 4)];
        var radius = document.getElementById("range").value - 0;
        //выбрать все мусорки
        map.DrawInCircle(point[0], point[1], radius);
    });

    document.getElementById("range").addEventListener('change', function () {
        document.getElementById("radius").value = document.getElementById("range").value + 'м';
        /*document.getElementById("SendRadius").value = "Радиус поиска" + document.getElementById("range").value + 'м'; 
        //рандом, т.к. позиционирование выводит в лес.
        var rand = [['55.8818', '49.0306'], ['55.80657', '48.9986'], ['55.8860', '49.0376'], ['55.8732', '49.1450785']];
        var point = rand[1];
        var radius = document.getElementById("range").value;
        //выбрать все мусорки
        map.DrawInCircle(point[0], point[1], radius);*/
    })
}

function getTrash(func) {
    
    $.ajax({
        type: "GET",
        url: "/api/Trash",
        success: function (res) {
            func(res);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function getTrashFilter(func, filter) {

    $.ajax({
        type: "POST",
        url: "/api/TrashFilter",
        data: {'':filter},
        success: function (res) {
            func(res);
        },
        error: function (e) {
            alert('err');
            console.log(e);
        }

    });
}