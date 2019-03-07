module.exports = function convertBase(nbasefrom, basefrom, baseto, charset) {
    if (basefrom <= 0 || basefrom > charset.length || baseto <= 0 || baseto > charset.length) {
        console.log("Base unallowed");
        return null;
    }
    var i, nbaseten = 0;
    if (basefrom != 10) {
        var sizenbasefrom = nbasefrom.length;
        for (i = 0; i < sizenbasefrom; i++) {
            var mul, mul_ok = -1;
            for (mul = 0; mul < charset.length; mul++) {
                if (nbasefrom[i] == charset[mul]) {
                    mul_ok = 1;
                    break;
                }
            }
            if (mul >= basefrom) {
                console.log("Symbol unallowed in basefrom");
                return null;
            }
            if (mul_ok == -1) {
                console.log("Symbol not found");
                return null;
            }
            var exp = (sizenbasefrom - i - 1);
            if (exp == 0) nbaseten += mul;
            else nbaseten += mul * Math.pow(basefrom, exp);
        }
    } else nbaseten = parseInt(nbasefrom);
    if (baseto != 10) {
        var nbaseto = [];
        while (nbaseten > 0) {
            var mod = nbaseten % baseto;
            if (mod < 0 || mod >= charset.length) {
                console.log("Out of bounds error");
                return null;
            }
            nbaseto.push(charset[mod]);
            nbaseten = parseInt(nbaseten / baseto);
        }
        return nbaseto.reverse().toString().replace(/,/g, '');
    } else {
        return nbaseten.toString();
    }
}
