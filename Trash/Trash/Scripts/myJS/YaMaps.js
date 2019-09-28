function YaMaps() {
    this.wigth = 0.000011;
    this.height = 0.000032;
    this.map;
    this.recicles = [];

    //инициализация карты
    this.init = function(latitude, longitude) {
        ymaps.ready(
            // Создание карты.    
            this.map = new ymaps.Map("map", {
                // Координаты центра карты.
                center: [latitude, longitude],
                // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19.
                zoom: 17
            })
        );
    }

    this.GetSize = function() {
        return this.map.getZoom();
    }

    //получить координаты и передать их функции
    this.GetLocation = function (func) {
        var location = ymaps.geolocation.get();

        // Асинхронная обработка ответа.
        location.then(
            function (result) {
                var position = result.geoObjects.position;
                var pos = { x: position[0], y: position[1] };
                func(pos);
            }
        );
    }

    this.AddPlaceMark = function(latitude, longitude, colors) {
        var dataTrash = [];

        for (var i = 0; i < colors.length; i++) {
            dataTrash.push({ weight: 1, color: colors[i] });
        }
        
        var myPlacemark = new ymaps.Placemark([latitude, longitude], {
            //данные для диаграммы
            data: dataTrash,
            iconContent: ''
        }, {
                iconLayout: 'default#pieChart'
            });

        //return myPlacemark;
        this.recicles.push(myPlacemark);
    }

    /*
    this.AddRoute = function(latitude, longitude) {
        var location = ymaps.geolocation.get();

        // Асинхронная обработка ответа.
        location.then(
            function (result) {
                var position = result.geoObjects.position;

                var multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        position,
                        [latitude, longitude]
                    ]
                });

                this.map.geoObjects.add(multiRoute);

                return multiRoute;
            }
        );
    }
    */

    this.DrawingObj = function () {
        this.Clear();
        var myClusterer = new ymaps.Clusterer();
        myClusterer.add(this.recicles);
        this.map.geoObjects.add(myClusterer);
    };

    this.Clear = function () {
        this.map.geoObjects.removeAll();
        /*map.poligons.forEach(function (key) { map.myMap.geoObjects.remove(key) });
        map.unions.forEach(function (key) { map.myMap.geoObjects.remove(key) });
        map.poligons = [];
        map.unions = [];*/
    }

    /*
    function GetCluster(objs, map) {
        var clusterer = new ymaps.Clusterer({
        });

        objs.forEach(function (key) { clusterer.add(key) });

        map.myMap.geoObjects.add(clusterer);
    }
    */

    /*
    function GetPlaceMark(latitude, longitude, plases) {
        var myPlacemark = new ymaps.Placemark([latitude, longitude], {
            //данные для диаграммы
            data: plases,
            iconContent: plases[0].weight + '/' + (plases[1].weight + plases[0].weight)
        }, {
                iconLayout: 'default#pieChart',
            });

        return myPlacemark;
    }
    */

    /*
    function DravingList(poligons, map) {
        map.Clear(map);
        poligons.forEach(function (key) { map.myMap.geoObjects.add(key) });
        DrawRout(map);
    }
    */

    /*
    function DrawingObj(obj, map) {
        map.Clear(map);
        map.myMap.geoObjects.add(obj);
        DrawRout(map);
    };
    */
}