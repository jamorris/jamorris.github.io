var format_ZipCodeFlorida = new ol.format.GeoJSON();
var features_ZipCodeFlorida = format_ZipCodeFlorida.readFeatures(geojson_ZipCodeFlorida, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ZipCodeFlorida = new ol.source.Vector();
jsonSource_ZipCodeFlorida.addFeatures(features_ZipCodeFlorida);var lyr_ZipCodeFlorida = new ol.layer.Vector({
                source:jsonSource_ZipCodeFlorida, 
                style: style_ZipCodeFlorida,
                title: "ZipCodeFlorida"
            });var format_SurveyResults = new ol.format.GeoJSON();
var features_SurveyResults = format_SurveyResults.readFeatures(geojson_SurveyResults, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SurveyResults = new ol.source.Vector();
jsonSource_SurveyResults.addFeatures(features_SurveyResults);var lyr_SurveyResults = new ol.layer.Vector({
                source:jsonSource_SurveyResults, 
                style: style_SurveyResults,
                title: "SurveyResults"
            });

lyr_ZipCodeFlorida.setVisible(false);lyr_SurveyResults.setVisible(true);
var layersList = [lyr_ZipCodeFlorida,lyr_SurveyResults];
lyr_ZipCodeFlorida.set('fieldAliases', {'ZCTA5CE10': 'ZCTA5CE10', 'GEOID10': 'GEOID10', 'CLASSFP10': 'CLASSFP10', 'MTFCC10': 'MTFCC10', 'FUNCSTAT10': 'FUNCSTAT10', 'ALAND10': 'ALAND10', 'AWATER10': 'AWATER10', 'INTPTLAT10': 'INTPTLAT10', 'INTPTLON10': 'INTPTLON10', });
lyr_SurveyResults.set('fieldAliases', {'field_1': 'field_1', 'ZIP_Code': 'ZIP_Code', 'Evac': 'Evac', 'NoEvac': 'NoEvac', 'total': 'total', 'city': 'city', 'state': 'state', 'latitude': 'latitude', 'longitude': 'longitude', });
lyr_ZipCodeFlorida.set('fieldImages', {'ZCTA5CE10': 'TextEdit', 'GEOID10': 'TextEdit', 'CLASSFP10': 'TextEdit', 'MTFCC10': 'TextEdit', 'FUNCSTAT10': 'TextEdit', 'ALAND10': 'TextEdit', 'AWATER10': 'TextEdit', 'INTPTLAT10': 'TextEdit', 'INTPTLON10': 'TextEdit', });
lyr_SurveyResults.set('fieldImages', {'field_1': 'TextEdit', 'ZIP_Code': 'TextEdit', 'Evac': 'TextEdit', 'NoEvac': 'TextEdit', 'total': 'TextEdit', 'city': 'TextEdit', 'state': 'TextEdit', 'latitude': 'TextEdit', 'longitude': 'TextEdit', });
lyr_ZipCodeFlorida.set('fieldLabels', {'ZCTA5CE10': 'header label', 'GEOID10': 'no label', 'CLASSFP10': 'no label', 'MTFCC10': 'no label', 'FUNCSTAT10': 'no label', 'ALAND10': 'no label', 'AWATER10': 'no label', 'INTPTLAT10': 'no label', 'INTPTLON10': 'no label', });
lyr_SurveyResults.set('fieldLabels', {'field_1': 'no label', 'ZIP_Code': 'no label', 'Evac': 'inline label', 'NoEvac': 'inline label', 'total': 'header label', 'city': 'no label', 'state': 'no label', 'latitude': 'no label', 'longitude': 'no label', });
lyr_SurveyResults.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});