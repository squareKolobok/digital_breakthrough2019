function YaMaps() {
    this.wigth = 0.000011;
    this.height = 0.000032;
    this.map;
    this.recicles = [];
    this.Route = null;
    this.RoutePoints = [];
    this.zavods = [];

    //инициализация карты
    this.init = function (latitude, longitude) {
        ymaps.ready(
            // Создание карты.    
            this.map = new ymaps.Map("map", {
                // Координаты центра карты.
                center: [latitude, longitude],
                // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19.
                zoom: 12
            }),
        );
    }

    this.GetSize = function() {
        return this.map.getZoom();
    }

    //нарисовать заводы
    this.DrawZavods = function () {
        var myClusterer = new ymaps.Clusterer();

        for (var i = 0; i < this.zavods.length; i++) {
            var myPlacemark = new ymaps.Placemark(this.zavods[i], {
                iconContent: 'завод по переработке'
            }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/Content/img/zavod.png',
                    iconImageSize: [100, 70],
                    iconImageOffset: [-5, -38]
                });

            myClusterer.add(myPlacemark);
        }

        this.map.geoObjects.add(myClusterer);
    }

    //нарисовать точки, находящиеся в заданном круге. радиус в метрах
    this.DrawInCircle = function (lon, lat, radius) {
        this.Clear();

        var maptmp = this.map;
        this.recicles.forEach(function (key) { maptmp.geoObjects.add(key);})

        var circle = new ymaps.Circle([[lon, lat], radius], {}, {});
        this.map.geoObjects.add(circle);
        var result = ymaps.geoQuery(this.map.geoObjects).searchInside(circle).clusterize();

        this.Clear();
        this.map.geoObjects.add(result);
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

    //добавить метку в список меток
    this.AddPlaceMark = function (latitude, longitude, mark) {
        var dataTrash = [];
        var StrType = "<div>";

        for (var i = 0; i < mark.length; i++) {
            dataTrash.push({ weight: 1, color: mark[i].color });
            StrType += "<span>" + mark[i].type + ", заполнено на " + mark[i].full + "%</span><br>";
        }

        StrType += "</div>";
        var myPlacemark = new ymaps.Placemark([latitude, longitude], {
            //данные для диаграммы
            data: dataTrash,
            //содержимое заголовка балуна.
            balloonContentHeader: '<h2>Бак</h2>',
            //содержимое основной части балуна.
            balloonContentBody: StrType,
            //содержимое нижней части балуна.
            balloonContentFooter: 'Информация предоставлена:<br/>OOO "Рога и копыта"',
            iconContent: ''
        }, {
                iconLayout: 'default#pieChart'
            });

        //обработка нажатия на контейнер
        myPlacemark.events.add('click', function () { myPlacemark.balloon.open() });
        this.recicles.push(myPlacemark);
    }

    //нарисовать список объектов
    this.DrawingObj = function () {
        this.Clear();
        var myClusterer = new ymaps.Clusterer();
        myClusterer.add(this.recicles);
        this.map.geoObjects.add(myClusterer);
    };

    //очистить список объектов
    this.RemoveRecicles = function(){
        this.recicles = [];
    }

    //удалить все объекты с карты
    this.Clear = function () {
        this.map.geoObjects.removeAll();
    }

    //создать маршрут
    this.CreateRoute = function () {

        this.DeleteRoute();
        this.Route = new ymaps.multiRouter.MultiRoute({
            referencePoints: this.RoutePoints
        });

        this.map.geoObjects.add(this.Route);
    }

    //удалить маршрут с карты
    this.DeleteRoute = function () {
        if (this.Route != null)
            this.map.geoObjects.remove(this.Route);
    }

    //удалить информацию о маршруте
    this.ClearRoute = function(){
        this.DeleteRoute();
        this.RoutePoints = [];
        this.Route = null;
    }
}