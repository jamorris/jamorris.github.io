var size = 0;

var styleCache_SurveyResults={}
var style_SurveyResults = function(feature, resolution){
    var value = ""
    var size = 0;
    var style = [ new ol.style.Style({
        image: new ol.style.Circle({radius: 4.0 + size,
            stroke: new ol.style.Stroke({color: 'rgba(0,0,0,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0}), fill: new ol.style.Fill({color: 'rgba(101,193,214,1.0)'})})
    })];
    if ("" !== null) {
        var labelText = String("");
    } else {
        var labelText = ""
    }
    var key = value + "_" + labelText

    if (!styleCache_SurveyResults[key]){
        var text = new ol.style.Text({
              font: '10px \'None\', sans-serif',
              text: labelText,
              textBaseline: "center",
              textAlign: "left",
              offsetX: 5,
              offsetY: 3,
              fill: new ol.style.Fill({
                color: 'rgba(None, None, None, 255)'
              }),
            });
        styleCache_SurveyResults[key] = new ol.style.Style({"text": text})
    }
    var allStyles = [styleCache_SurveyResults[key]];
    allStyles.push.apply(allStyles, style);
    return allStyles;
};