var size = 0;

var styleCache_ZipCode_2012={}
var style_ZipCode_2012 = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(178,223,138,1.0)'})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_ZipCode_2012[key]){
        var text = new ol.style.Text({
              font: '14.3px \'Ubuntu\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(0, 0, 0, 255)'
              }),
            });
        styleCache_ZipCode_2012[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_ZipCode_2012[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};