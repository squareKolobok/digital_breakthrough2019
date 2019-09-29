function MapColorFull() {
    var cfree = '#2DF047';
    var cmidl = '#E9F62C';
    var cfull = 'F60E0E';
    var description = [];
    description[1] = 'батарейки';
    description[2] = 'пластик';
    description[3] = 'бумага';
    description[4] = 'стекло';
    description[5] = 'ртуть';
    description[6] = 'другое';

    this.type = 0;
    this.midl = 40;
    this.warning = 80;


    this.GetColor = function (types) {
        var result = []

        for (var i = 0; i < types.length; i++) {
            if (types[i].tipId == this.type) {
                result.push({
                    color: types[i].val < this.midl ? cfree : types[i].val > this.warning ? cfull : cmidl,
                    type: description[this.type],
                    full: types[i].val
                });
                break;
            }
        }

        return result;
    }
}