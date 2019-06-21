var size = 0;

var styleCache_Evac_R2={}
var style_Evac_R2 = function(feature, resolution){
    var value = ""
    var size = feature.get('features').length;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 4.0 + size,
            stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(142,57,92,1.0)'})})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_Evac_R2[key]){
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
        styleCache_Evac_R2[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_Evac_R2[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};