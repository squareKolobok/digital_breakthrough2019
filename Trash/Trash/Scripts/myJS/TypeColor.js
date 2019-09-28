function MapTypeColor() {
    var colors = [];
    var description = [];
    colors[1] = '#D724C5'; //батарейка
    colors[2] = '#2DDF9E'; //пластик
    colors[3] = '#849090'; //бумага
    colors[4] = '#405ADC'; //стекло
    colors[5] = '#E55427'; //ртуть
    colors[6] = '#E5D227'; //другое

    description[1] = 'батарейки';
    description[2] = 'пластик';
    description[3] = 'бумага';
    description[4] = 'стекло';
    description[5] = 'ртуть';
    description[6] = 'другое';

    this.GetColors = function (types) {
        var result = []

        for (var i = 0; i < types.length; i++) {
            var value = colors[types[i].tipId];

            if (value != null && value != undefined) {
                result.push({ color: value, type: description[types[i].tipId], full: types[i].val});
            }
            else {
                console.log(types[i] + 'не является ключем для цвета');
            }
        }

        return result;
    }
}