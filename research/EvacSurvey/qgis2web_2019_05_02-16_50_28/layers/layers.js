var baseLayer = new ol.layer.Group({
    'title': 'Base maps',
    layers: [
new ol.layer.Tile({
    'title': 'OSM',
    'type': 'base',
    source: new ol.source.OSM()
})
]
});
var format_ZipCodeFlorida = new ol.format.GeoJSON();
var features_ZipCodeFlorida = format_ZipCodeFlorida.readFeatures(geojson_ZipCodeFlorida, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ZipCodeFlorida = new ol.source.Vector();
jsonSource_ZipCodeFlorida.addFeatures(features_ZipCodeFlorida);var lyr_ZipCodeFlorida = new ol.layer.Vector({
                source:jsonSource_ZipCodeFlorida, 
                style: style_ZipCodeFlorida,
                title: "ZipCodeFlorida"
            });var format_Evac_R2 = new ol.format.GeoJSON();
var features_Evac_R2 = format_Evac_R2.readFeatures(geojson_Evac_R2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Evac_R2 = new ol.source.Vector();
jsonSource_Evac_R2.addFeatures(features_Evac_R2);cluster_Evac_R2 = new ol.source.Cluster({
  distance: 10,
  source: jsonSource_Evac_R2
});var lyr_Evac_R2 = new ol.layer.Vector({
                source:cluster_Evac_R2, 
                style: style_Evac_R2,
                title: "Evac_R2"
            });

lyr_ZipCodeFlorida.setVisible(true);lyr_Evac_R2.setVisible(true);
var layersList = [baseLayer,lyr_ZipCodeFlorida,lyr_Evac_R2];
lyr_ZipCodeFlorida.set('fieldAliases', {'ZCTA5CE10': 'ZCTA5CE10', 'GEOID10': 'GEOID10', 'CLASSFP10': 'CLASSFP10', 'MTFCC10': 'MTFCC10', 'FUNCSTAT10': 'FUNCSTAT10', 'ALAND10': 'ALAND10', 'AWATER10': 'AWATER10', 'INTPTLAT10': 'INTPTLAT10', 'INTPTLON10': 'INTPTLON10', });
lyr_Evac_R2.set('fieldAliases', {'field_1': 'field_1', 'ZIP_Code': 'ZIP_Code', 'Evac': 'Evac', 'NoEvac': 'NoEvac', 'total': 'total', 'city': 'city', 'state': 'state', 'latitude': 'latitude', 'longitude': 'longitude', });
lyr_ZipCodeFlorida.set('fieldImages', {'ZCTA5CE10': 'TextEdit', 'GEOID10': 'TextEdit', 'CLASSFP10': 'TextEdit', 'MTFCC10': 'TextEdit', 'FUNCSTAT10': 'TextEdit', 'ALAND10': 'TextEdit', 'AWATER10': 'TextEdit', 'INTPTLAT10': 'TextEdit', 'INTPTLON10': 'TextEdit', });
lyr_Evac_R2.set('fieldImages', {'field_1': 'TextEdit', 'ZIP_Code': 'TextEdit', 'Evac': 'TextEdit', 'NoEvac': 'TextEdit', 'total': 'TextEdit', 'city': 'TextEdit', 'state': 'TextEdit', 'latitude': 'TextEdit', 'longitude': 'TextEdit', });
lyr_ZipCodeFlorida.set('fieldLabels', {'ZCTA5CE10': 'inline label', 'GEOID10': 'no label', 'CLASSFP10': 'no label', 'MTFCC10': 'no label', 'FUNCSTAT10': 'no label', 'ALAND10': 'no label', 'AWATER10': 'no label', 'INTPTLAT10': 'no label', 'INTPTLON10': 'no label', });
lyr_Evac_R2.set('fieldLabels', {'field_1': 'no label', 'ZIP_Code': 'no label', 'Evac': 'no label', 'NoEvac': 'no label', 'total': 'inline label', 'city': 'no label', 'state': 'no label', 'latitude': 'no label', 'longitude': 'no label', });
lyr_Evac_R2.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});