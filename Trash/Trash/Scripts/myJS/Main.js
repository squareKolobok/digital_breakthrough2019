window.onload = function () {
    var tc = new MapTypeColor();
    var map = new YaMaps();
    var hideMenu = false;
    map.init('55.836289', '49.108795');
    map.zavods = [['55.8818', '49.0306'], ['55.786388', '49.130366'], ['55.8732', '49.1450785']];
    getTrash(DrawObjs);

    function DrawObjs(objs) {
        map.RemoveRecicles();

        for (var i = 0; i < objs.length; i++) {
            var key = objs[i];
            var types = [];

            for (var j = 0; j < key.res.length; j++) {
                types.push(key.res[j]);
            }

            //map.AddPlaceMark(key.x, key.y, tc.GetColors(types));
            map.AddPlaceMark(key.x, key.y, tc.GetColors(types), objs[i].id, getLider);
        }

        map.DrawingObj();
        map.DrawZavods();
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
    })

    document.getElementById('hideMenu').addEventListener('click', function () {
        if (hideMenu) {
            document.getElementById('typetrash').style = 'display: block';
        }
        else {
            document.getElementById('typetrash').style = 'display: none';
        }

        hideMenu = !hideMenu;
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

function getLider(place, id, str) {

    $.ajax({
        type: "GET",
        url: "/api/Trash/"+ id,
        success: function (res) {
            place.properties.set('balloonContentBody', 'Лидер: ' + res.fio + '</br> собрал ' + res.val + 'л</br>'+str);
            //func(res);
        },
        error: function (e) {
            console.log('err');
            console.log(e);
        }

    });
}