window.onload = function () {
    var tc = new MapColorFull();
    var map = new YaMaps();
    var trashs = [];
    var drawtrash = [];
    map.init('55.836289', '49.108795');
    map.zavods = [['55.8818', '49.0306'], ['55.786388', '49.130366'], ['55.8732', '49.1450785']];
    map.DrawZavods();

    function DrawObjs(objs, rewrite = true) {
        if (rewrite) {
            trashs = objs;
        }
        
        map.RemoveRecicles();

        for (var i = 0; i < objs.length; i++) {
            var key = objs[i];
            var types = [];

            for (var j = 0; j < key.res.length; j++) {
                types.push(key.res[j]);
            }

            map.AddPlaceMark(key.x, key.y, tc.GetColor(types));
        }

        map.DrawingObj();
        map.DrawZavods();
    }

    //получить нажатую радио
    document.getElementById('typetrash').addEventListener('change', function () {
        var checks = document.getElementsByName('type');
        var result;

        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                result = checks[i].value;
            }
        }

        tc.type = result;
        getTrashOper(DrawObjs, result);
    });

    document.getElementById('filterTrash').addEventListener('click', function () {
        //var rand = [['55.8818', '49.0306'], ['55.80657', '48.9986'], ['55.8860', '49.0376'], ['55.8732', '49.1450785']];
        var result = [];
        var rkey = document.getElementById("range").value - 0;
        var min = 0;

        switch (rkey) {
            case 1:
                min = tc.midl;
                break;
            case 2:
                min = tc.warning;
                break;
        }

        for (var i = 0; i < trashs.length; i++) {
            for (var j = 0; j < trashs[i].res.length; j++)
                if (trashs[i].res[j].tipId == tc.type && trashs[i].res[j].val >= min) {
                    result.push(trashs[i]);
            }
        }

        drawtrash = result;
        DrawObjs(result, false);
    });

    document.getElementById("rout").addEventListener('click', function () {
        var startPoint = ['55.8818', '49.0306'];
        var endPoint = ['55.786388', '49.130366'];
        map.RoutePoints.push(startPoint);

        for (var i = 0; i < drawtrash.length; i++) {
            map.RoutePoints.push([drawtrash[i].x, drawtrash[i].y]);
        }

        map.RoutePoints.push(endPoint);
        map.CreateRoute();
        map.CreateRoute();
    })
}

function getTrashOper(func, id) {
    
    $.ajax({
        type: "GET",
        url: "/api/Operator/" + id,
        success: function (res) {
            func(res);
        },
        error: function (e) {
            console.log(e);
        }
    });
}