var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
new ol.layer.Tile({
    'title': 'OSM HOT',
    'type': 'base',
    source: new ol.source.XYZ({
        url: 'http://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        attributions: [new ol.Attribution({html: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'})]
    })
})
]
});
var format_ZipCode_2012 = new ol.format.GeoJSON();
var features_ZipCode_2012 = format_ZipCode_2012.readFeatures(geojson_ZipCode_2012, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ZipCode_2012 = new ol.source.Vector();
jsonSource_ZipCode_2012.addFeatures(features_ZipCode_2012);var lyr_ZipCode_2012 = new ol.layer.Vector({
                source:jsonSource_ZipCode_2012, 
                style: style_ZipCode_2012,
                title: "ZipCode_2012"
            });var format_SurveyResults = new ol.format.GeoJSON();
var features_SurveyResults = format_SurveyResults.readFeatures(geojson_SurveyResults, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SurveyResults = new ol.source.Vector();
jsonSource_SurveyResults.addFeatures(features_SurveyResults);var lyr_SurveyResults = new ol.layer.Vector({
                source:jsonSource_SurveyResults, 
                style: style_SurveyResults,
                title: "SurveyResults"
            });

lyr_ZipCode_2012.setVisible(false);lyr_SurveyResults.setVisible(true);
var layersList = [baseLayer,lyr_ZipCode_2012,lyr_SurveyResults];
lyr_ZipCode_2012.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'PO_NAME': 'PO_NAME', 'ZIP': 'ZIP', 'CA_NAME': 'CA_NAME', 'SUMBLKPOP': 'SUMBLKPOP', 'POP2010': 'POP2010', 'POP10_SQMI': 'POP10_SQMI', 'SQMI': 'SQMI', 'DESCRIPT': 'DESCRIPT', 'FGDLAQDATE': 'FGDLAQDATE', 'AUTOID': 'AUTOID', });
lyr_SurveyResults.set('fieldAliases', {'field_1': 'field_1', 'ZIP_Code': 'ZIP_Code', 'Evac': 'Evac', 'NoEvac': 'NoEvac', 'total': 'total', 'city': 'city', 'state': 'state', 'latitude': 'latitude', 'longitude': 'longitude', });
lyr_ZipCode_2012.set('fieldImages', {'OBJECTID': 'TextEdit', 'PO_NAME': 'TextEdit', 'ZIP': 'TextEdit', 'CA_NAME': 'TextEdit', 'SUMBLKPOP': 'TextEdit', 'POP2010': 'TextEdit', 'POP10_SQMI': 'TextEdit', 'SQMI': 'TextEdit', 'DESCRIPT': 'TextEdit', 'FGDLAQDATE': 'TextEdit', 'AUTOID': 'TextEdit', });
lyr_SurveyResults.set('fieldImages', {'field_1': 'TextEdit', 'ZIP_Code': 'TextEdit', 'Evac': 'TextEdit', 'NoEvac': 'TextEdit', 'total': 'TextEdit', 'city': 'TextEdit', 'state': 'TextEdit', 'latitude': 'TextEdit', 'longitude': 'TextEdit', });
lyr_ZipCode_2012.set('fieldLabels', {'OBJECTID': 'no label', 'PO_NAME': 'no label', 'ZIP': 'inline label', 'CA_NAME': 'inline label', 'SUMBLKPOP': 'no label', 'POP2010': 'inline label', 'POP10_SQMI': 'no label', 'SQMI': 'inline label', 'DESCRIPT': 'no label', 'FGDLAQDATE': 'no label', 'AUTOID': 'no label', });
lyr_SurveyResults.set('fieldLabels', {'field_1': 'no label', 'ZIP_Code': 'inline label', 'Evac': 'inline label', 'NoEvac': 'inline label', 'total': 'inline label', 'city': 'inline label', 'state': 'inline label', 'latitude': 'no label', 'longitude': 'no label', });
lyr_SurveyResults.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});