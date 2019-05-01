<html>
<head>
<!----------------------------------------------------------

	Copyright (c) 2015-2018 Jean-Marc VIGLINO,
	released under CeCILL-B (french BSD like) licence: http://www.cecill.info/

------------------------------------------------------------>
	<title>ol-ext: style chart</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<meta name="description" content="ol.style.Chart is an image style to draw statistical graphics (bar or pie charts) on a map." />
	<meta name="keywords" content="ol3, style, vector, statistic, chart, pie, animation" />

	<!-- jQuery -->
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.0.min.js"></script>

	<!-- Openlayers -->
    <link rel="stylesheet" href="https://openlayers.org/en/latest/css/ol.css" />
	<script type="text/javascript" src="https://openlayers.org/en/latest/build/ol.js"></script>
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL,Object.assign"></script>

	<!-- ol-ext -->
	<link rel="stylesheet" href="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.css" />
	<script type="text/javascript" src="https://cdn.rawgit.com/Viglino/ol-ext/master/dist/ol-ext.min.js"></script>

</head>
<body >
	<a href="https://github.com/Viglino/ol-ext" class="icss-github-corner"><i></i></a>

	<a href="../index.html">
		<h1>ol-ext: chart style + values</h1>
	</a>
	<p class="info">
		The <i>ol.style.Chart</i> is an image style to draw statistical graphics (bar or pie charts) on a map.
		<br/>
		This example show how to display values on a pie chart using a style function.
	</p>

	<!-- DIV pour la carte -->
	<div id="map" style="width:600px; height:400px;"></div>
	<div class="options">
		Select a feature to show its values.
	</div>

	<script type="text/javascript">
	// Layers
//	var layer = new ol.layer.Tile({ source: new ol.source.Stamen({ layer: 'watercolor' }) });
var layer = new ol.layer.Tile({ source: new ol.source.OSM() });


	// The map
	var map = new ol.Map
		({	target: 'map',
			view: new ol.View
			({	zoom: 6,
				//center: [166326, 5992663]
				center: ol.proj.fromLonLat([-83.5, 28.5])
			}),
			layers: [layer]
		});

	// Style function
	var styleCache={};

	function getFeatureStyle (feature, sel)
	{	var k = $("#graph").val()+"-"+ $("#color").val()+"-"+(sel?"1-":"")+feature.get("data");
  		var style = styleCache[k];
		if (!style)
		{	var radius = 15;
			// area proportional to data size: s=PI*r^2
			radius = 8* Math.sqrt (feature.get("sum") / Math.PI);
			var data = feature.get("data");
			radius *= (sel?1.2:1);
			// Create chart style
			style = [ new ol.style.Style(
				{	image: new ol.style.Chart(
					{	type: "pie",
						radius: radius,
						data: data,
						rotateWithView: true,
						stroke: new ol.style.Stroke(
						{	color: "#fff",
							width: 2
						}),
					})
				})];

			// Show values on select
			if (sel)
			{	/*
				var sum = 0;
				for (var i=0; i<data.length; i++)
				{	sum += data[i];
				}
				*/
				var sum = feature.get("sum");

				var s = 0;
				for (var i=0; i<data.length; i++)
				{	var d = data[i];
      				var a = (2*s+d)/(sum/10) * Math.PI - Math.PI/2;
					var v = Math.round(d/(sum/10)*1000);
					if (v>0)
      				{	style.push(new ol.style.Style(
						{	text: new ol.style.Text(
							{	text: (v/10)+"%", /* d.toString() */
          						offsetX: Math.cos(a)*(radius+3),
          						offsetY: Math.sin(a)*(radius+3),
								textAlign: (a < Math.PI/2 ? "left":"right"),
								textBaseline: "middle",
								stroke: new ol.style.Stroke({ color:"#fff", width:2.5 }),
								fill: new ol.style.Fill({color:"#333"})
							})
						}));
					}
					s += d;
				}
			}
		}
		styleCache[k] = style;
		return style;
	}

	// 30 random features with data: array of 4 values
	//var ext = map.getView().calculateExtent(map.getSize());
	//document.write(JSON.stringify(ext));
	var features=[];
	// for (var i=0; i<30; ++i)
	// {	var n, nb=0, data=[];
	// 	for (var k=0; k<4; k++)
	// 	{	n = Math.round(8*Math.random());
	// 		data.push(n);
	// 		nb += n;
	// 	}
	// 	features[i] = new ol.Feature(
	// 		{	geometry: new ol.geom.Point([ext[0]+(ext[2]-ext[0])*Math.random(), ext[1]+(ext[3]-ext[1])*Math.random()]),
	// 			data: data,
	// 			sum: nb
	// 		});
	// }

	features[0] = new ol.Feature(
		{ geometry:new ol.geom.Point(ol.proj.fromLonLat([ -76.1426 , 36.889797 ])), data: [ 1 , 0 ], sum:  10 });
	features[1] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.46092 , 30.641487 ])), data: [ 1 , 0 ], sum:  10 });
	features[2] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.21351 , 30.272356 ])), data: [ 1 , 1 ], sum:  20 });
	features[3] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.72195 , 29.97289 ])), data: [ 0 , 1 ], sum:  10 });
	features[4] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.957151 , 30.331517 ])), data: [ 0 , 1 ], sum:  10 });
	features[5] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.72916 , 30.160965 ])), data: [ 1 , 0 ], sum:  10 });
	features[6] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.51284 , 29.955409 ])), data: [ 1 , 0 ], sum:  10 });
	features[7] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.03602 , 29.204009 ])), data: [ 0 , 2 ], sum:  20 });
	features[8] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.83636 , 29.401523 ])), data: [ 0 , 1 ], sum:  10 });
	features[9] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.95736 , 29.016897 ])), data: [ 1 , 0 ], sum:  10 });
	features[10] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.10296 , 29.284924 ])), data: [ 0 , 1 ], sum:  10 });
	features[11] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.69113 , 30.354588 ])), data: [ 1 , 0 ], sum:  10 });
	features[12] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.586 , 30.333022 ])), data: [ 1 , 0 ], sum:  10 });
	features[13] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.49965 , 30.348585 ])), data: [ 0 , 1 ], sum:  10 });
	features[14] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.41049 , 30.383023 ])), data: [ 0 , 1 ], sum:  10 });
	features[15] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.74894 , 30.222489 ])), data: [ 0 , 1 ], sum:  10 });
	features[16] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.56882 , 30.148209 ])), data: [ 0 , 1 ], sum:  10 });
	features[17] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.60274 , 30.092346 ])), data: [ 0 , 1 ], sum:  10 });
	features[18] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.59087 , 30.364339 ])), data: [ 0 , 2 ], sum:  20 });
	features[19] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.26903 , 30.431283 ])), data: [ 0 , 1 ], sum:  10 });
	features[20] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.406629 , 30.130775 ])), data: [ 0 , 1 ], sum:  10 });
	features[21] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.16049 , 30.531677 ])), data: [ 0 , 1 ], sum:  10 });
	features[22] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.188446 , 30.514599 ])), data: [ 0 , 1 ], sum:  10 });
	features[23] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.346204 , 30.479347 ])), data: [ 0 , 1 ], sum:  10 });
	features[24] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -84.35533 , 30.194939 ])), data: [ 0 , 1 ], sum:  10 });
	features[25] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -83.88017 , 30.530854 ])), data: [ 0 , 1 ], sum:  10 });
	features[26] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -85.65297 , 30.161901 ])), data: [ 1 , 0 ], sum:  10 });
	features[27] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -85.56392 , 30.188585 ])), data: [ 0 , 1 ], sum:  10 });
	features[28] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -87.225691 , 30.474288 ])), data: [ 0 , 1 ], sum:  10 });
	features[29] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -87.18937 , 30.48787 ])), data: [ 0 , 1 ], sum:  10 });
	features[30] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -87.21485 , 30.527195 ])), data: [ 0 , 1 ], sum:  10 });
	features[31] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -87.31979 , 30.600993 ])), data: [ 0 , 1 ], sum:  10 });
	features[32] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -86.58533 , 30.760184 ])), data: [ 0 , 1 ], sum:  10 });
	features[33] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -87.01098 , 30.70969 ])), data: [ 0 , 1 ], sum:  10 });
	features[34] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.3469 , 29.653145 ])), data: [ 0 , 1 ], sum:  10 });
	features[35] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.36889 , 29.676006 ])), data: [ 0 , 1 ], sum:  10 });
	features[36] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.3941 , 29.611545 ])), data: [ 0 , 2 ], sum:  20 });
	features[37] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.29591 , 29.713911 ])), data: [ 0 , 1 ], sum:  10 });
	features[38] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.28621 , 29.648594 ])), data: [ 1 , 0 ], sum:  10 });
	features[39] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.60407 , 29.823616 ])), data: [ 0 , 1 ], sum:  10 });
	features[40] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.39008 , 29.735832 ])), data: [ 1 , 0 ], sum:  10 });
	features[41] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.31772 , 28.665125 ])), data: [ 0 , 1 ], sum:  10 });
	features[42] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.28151 , 28.683408 ])), data: [ 0 , 1 ], sum:  10 });
	features[43] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.18764 , 28.910383 ])), data: [ 0 , 2 ], sum:  20 });
	features[44] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.33992 , 28.758133 ])), data: [ 0 , 2 ], sum:  20 });
	features[45] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.89049 , 28.707648 ])), data: [ 1 , 0 ], sum:  10 });
	features[46] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.64475 , 28.786272 ])), data: [ 1 , 0 ], sum:  10 });
	features[47] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.85374 , 28.868986 ])), data: [ 0 , 1 ], sum:  10 });
	features[48] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.21026 , 28.656375 ])), data: [ 0 , 1 ], sum:  10 });
	features[49] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.28761 , 28.803979 ])), data: [ 0 , 3 ], sum:  30 });
	features[50] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.35594 , 28.598677 ])), data: [ 0 , 1 ], sum:  10 });
	features[51] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.37446 , 28.541879 ])), data: [ 1 , 1 ], sum:  20 });
	features[52] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.35244 , 28.557579 ])), data: [ 1 , 0 ], sum:  10 });
	features[53] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.36054 , 28.51483 ])), data: [ 0 , 1 ], sum:  10 });
	features[54] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.44369 , 28.576028 ])), data: [ 0 , 2 ], sum:  20 });
	features[55] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.42695 , 28.619445 ])), data: [ 0 , 1 ], sum:  10 });
	features[56] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.260818 , 28.566338 ])), data: [ 0 , 1 ], sum:  10 });
	features[57] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.48608 , 28.583103 ])), data: [ 0 , 1 ], sum:  10 });
	features[58] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.47345 , 28.391608 ])), data: [ 1 , 0 ], sum:  10 });
	features[59] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.35898 , 28.410872 ])), data: [ 0 , 1 ], sum:  10 });
	features[60] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.18404 , 28.542132 ])), data: [ 0 , 2 ], sum:  20 });
	features[61] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.47863 , 28.528789 ])), data: [ 1 , 1 ], sum:  20 });
	features[62] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.52488 , 28.401151 ])), data: [ 0 , 1 ], sum:  10 });
	features[63] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.60014 , 28.031689 ])), data: [ 1 , 0 ], sum:  10 });
	features[64] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.74196 , 28.366284 ])), data: [ 0 , 1 ], sum:  10 });
	features[65] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.79887 , 28.47123 ])), data: [ 0 , 1 ], sum:  10 });
	features[66] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.61119 , 28.326985 ])), data: [ 1 , 0 ], sum:  10 });
	features[67] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.65077 , 28.13926 ])), data: [ 1 , 0 ], sum:  10 });
	features[68] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.69402 , 28.21981 ])), data: [ 0 , 1 ], sum:  10 });
	features[69] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.53518 , 28.01514 ])), data: [ 1 , 0 ], sum:  10 });
	features[70] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.70198 , 28.396301 ])), data: [ 2 , 0 ], sum:  20 });
	features[71] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.40294 , 27.636828 ])), data: [ 1 , 0 ], sum:  10 });
	features[72] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.51468 , 27.645377 ])), data: [ 0 , 1 ], sum:  10 });
	features[73] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.14526 , 26.051916 ])), data: [ 0 , 1 ], sum:  10 });
	features[74] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.12231 , 26.018967 ])), data: [ 1 , 0 ], sum:  10 });
	features[75] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.14925 , 26.016984 ])), data: [ 0 , 2 ], sum:  20 });
	features[76] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.21318 , 25.989119 ])), data: [ 1 , 0 ], sum:  10 });
	features[77] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.23851 , 26.023567 ])), data: [ 1 , 0 ], sum:  10 });
	features[78] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.34798 , 26.018418 ])), data: [ 0 , 1 ], sum:  10 });
	features[79] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.2773 , 25.94422 ])), data: [ 0 , 1 ], sum:  10 });
	features[80] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.11319 , 26.279108 ])), data: [ 1 , 0 ], sum:  10 });
	features[81] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.26564 , 26.242559 ])), data: [ 1 , 0 ], sum:  10 });
	features[82] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.19782 , 25.779076 ])), data: [ 0 , 1 ], sum:  10 });
	features[83] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.2441 , 25.730678 ])), data: [ 0 , 1 ], sum:  10 });
	features[84] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.18622 , 25.853184 ])), data: [ 1 , 0 ], sum:  10 });
	features[85] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.29642 , 25.702929 ])), data: [ 1 , 0 ], sum:  10 });
	features[86] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.23327 , 25.753177 ])), data: [ 1 , 0 ], sum:  10 });
	features[87] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.23773 , 25.850124 ])), data: [ 0 , 1 ], sum:  10 });
	features[88] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.30685 , 25.739011 ])), data: [ 0 , 1 ], sum:  10 });
	features[89] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.34859 , 25.606583 ])), data: [ 1 , 0 ], sum:  10 });
	features[90] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.18164 , 25.893372 ])), data: [ 1 , 1 ], sum:  20 });
	features[91] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.3583 , 25.734828 ])), data: [ 0 , 2 ], sum:  20 });
	features[92] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.36151 , 25.786634 ])), data: [ 0 , 1 ], sum:  10 });
	features[93] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.35999 , 25.653431 ])), data: [ 0 , 1 ], sum:  10 });
	features[94] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.40947 , 25.662292 ])), data: [ 0 , 2 ], sum:  20 });
	features[95] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.3494 , 25.56071 ])), data: [ 1 , 0 ], sum:  10 });
	features[96] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.45925 , 25.650232 ])), data: [ 0 , 1 ], sum:  10 });
	features[97] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.23 , 25.93 ])), data: [ 1 , 0 ], sum:  10 });
	features[98] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.12646 , 26.137693 ])), data: [ 1 , 0 ], sum:  10 });
	features[99] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.11379 , 26.165212 ])), data: [ 1 , 0 ], sum:  10 });
	features[100] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.10846 , 26.191111 ])), data: [ 1 , 1 ], sum:  20 });
	features[101] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.17987 , 26.094665 ])), data: [ 1 , 0 ], sum:  10 });
	features[102] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.12931 , 26.101114 ])), data: [ 0 , 1 ], sum:  10 });
	features[103] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.2631 , 26.211122 ])), data: [ 0 , 2 ], sum:  20 });
	features[104] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.27284 , 26.150863 ])), data: [ 2 , 0 ], sum:  20 });
	features[105] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.37697 , 26.112366 ])), data: [ 0 , 1 ], sum:  10 });
	features[106] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.08226 , 26.529581 ])), data: [ 1 , 0 ], sum:  10 });
	features[107] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.21841 , 26.348354 ])), data: [ 1 , 0 ], sum:  10 });
	features[108] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.66279 , 26.685125 ])), data: [ 1 , 0 ], sum:  10 });
	features[109] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.15648 , 26.347711 ])), data: [ 1 , 0 ], sum:  10 });
	features[110] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.22 , 26.58 ])), data: [ 0 , 1 ], sum:  10 });
	features[111] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.14697 , 27.076516 ])), data: [ 1 , 0 ], sum:  10 });
	features[112] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.65425 , 26.817786 ])), data: [ 1 , 0 ], sum:  10 });
	features[113] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.1356 , 26.458152 ])), data: [ 0 , 1 ], sum:  10 });
	features[114] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.29748 , 27.953801 ])), data: [ 1 , 0 ], sum:  10 });
	features[115] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.14042 , 28.663132 ])), data: [ 1 , 0 ], sum:  10 });
	features[116] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.29 , 28.28 ])), data: [ 0 , 1 ], sum:  10 });
	features[117] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.46629 , 28.142694 ])), data: [ 1 , 0 ], sum:  10 });
	features[118] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.514615 , 28.157704 ])), data: [ 1 , 1 ], sum:  20 });
	features[119] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.35965 , 27.713353 ])), data: [ 0 , 2 ], sum:  20 });
	features[120] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.29 , 27.79 ])), data: [ 0 , 1 ], sum:  10 });
	features[121] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.24508 , 27.911226 ])), data: [ 1 , 1 ], sum:  20 });
	features[122] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.24 , 27.88 ])), data: [ 1 , 0 ], sum:  10 });
	features[123] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.49537 , 27.963798 ])), data: [ 0 , 1 ], sum:  10 });
	features[124] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.45171 , 28.048595 ])), data: [ 1 , 1 ], sum:  20 });
	features[125] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.52355 , 28.07506 ])), data: [ 0 , 1 ], sum:  10 });
	features[126] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.61135 , 28.052799 ])), data: [ 1 , 0 ], sum:  10 });
	features[127] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.63931 , 27.770955 ])), data: [ 0 , 1 ], sum:  10 });
	features[128] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.6449 , 27.843052 ])), data: [ 1 , 0 ], sum:  10 });
	features[129] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.62795 , 27.816977 ])), data: [ 2 , 0 ], sum:  20 });
	features[130] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.63751 , 27.796454 ])), data: [ 1 , 0 ], sum:  10 });
	features[131] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.72865 , 27.815953 ])), data: [ 1 , 1 ], sum:  20 });
	features[132] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.72244 , 27.788637 ])), data: [ 0 , 1 ], sum:  10 });
	features[133] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.64515 , 27.874324 ])), data: [ 1 , 0 ], sum:  10 });
	features[134] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.78166 , 27.979114 ])), data: [ 0 , 1 ], sum:  10 });
	features[135] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.78702 , 27.944631 ])), data: [ 0 , 1 ], sum:  10 });
	features[136] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.74115 , 27.932797 ])), data: [ 0 , 2 ], sum:  20 });
	features[137] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.75633 , 27.883188 ])), data: [ 0 , 1 ], sum:  10 });
	features[138] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.38206 , 27.293327 ])), data: [ 1 , 0 ], sum:  10 });
	features[139] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.8127 , 27.541676 ])), data: [ 1 , 0 ], sum:  10 });
	features[140] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.72457 , 28.051985 ])), data: [ 0 , 1 ], sum:  10 });
	features[141] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.670264 , 28.310679 ])), data: [ 0 , 1 ], sum:  10 });
	features[142] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.8727 , 26.62365 ])), data: [ 0 , 2 ], sum:  20 });
	features[143] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.93052 , 26.502677 ])), data: [ 1 , 0 ], sum:  10 });
	features[144] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.865 , 26.711647 ])), data: [ 2 , 0 ], sum:  20 });
	features[145] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.90174 , 26.555958 ])), data: [ 1 , 0 ], sum:  10 });
	features[146] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.14859 , 26.984486 ])), data: [ 1 , 0 ], sum:  10 });
	features[147] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.2112 , 27.012758 ])), data: [ 1 , 0 ], sum:  10 });
	features[148] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.00403 , 26.837879 ])), data: [ 0 , 1 ], sum:  10 });
	features[149] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.70296 , 26.60599 ])), data: [ 0 , 1 ], sum:  10 });
	features[150] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.77391 , 26.348523 ])), data: [ 1 , 0 ], sum:  10 });
	features[151] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.51663 , 27.267649 ])), data: [ 0 , 1 ], sum:  10 });
	features[152] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.51506 , 27.336973 ])), data: [ 0 , 2 ], sum:  20 });
	features[153] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.47836 , 27.240571 ])), data: [ 0 , 1 ], sum:  10 });
	features[154] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.87196 , 27.201006 ])), data: [ 1 , 0 ], sum:  10 });
	features[155] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.45241 , 27.136731 ])), data: [ 1 , 0 ], sum:  10 });
	features[156] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.1606 , 27.072445 ])), data: [ 2 , 0 ], sum:  20 });
	features[157] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.28449 , 28.751024 ])), data: [ 0 , 1 ], sum:  10 });
	features[158] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.35021 , 28.793722 ])), data: [ 0 , 1 ], sum:  10 });
	features[159] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.47641 , 28.932403 ])), data: [ 0 , 1 ], sum:  10 });
	features[160] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.21004 , 29.08091 ])), data: [ 0 , 1 ], sum:  10 });
	features[161] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.02658 , 28.991135 ])), data: [ 1 , 0 ], sum:  10 });
	features[162] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.38002 , 28.566183 ])), data: [ 0 , 1 ], sum:  10 });
	features[163] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.59741 , 28.470236 ])), data: [ 0 , 2 ], sum:  20 });
	features[164] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.52 , 28.27 ])), data: [ 0 , 1 ], sum:  10 });
	features[165] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.66973 , 28.209833 ])), data: [ 0 , 1 ], sum:  10 });
	features[166] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -82.76116 , 28.076744 ])), data: [ 1 , 1 ], sum:  20 });
	features[167] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.42159 , 28.301788 ])), data: [ 0 , 1 ], sum:  10 });
	features[168] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.88466 , 28.797245 ])), data: [ 0 , 1 ], sum:  10 });
	features[169] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.48731 , 28.178192 ])), data: [ 0 , 1 ], sum:  10 });
	features[170] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.28749 , 28.24934 ])), data: [ 0 , 1 ], sum:  10 });
	features[171] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -81.5362 , 28.495982 ])), data: [ 0 , 2 ], sum:  20 });
	features[172] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.40526 , 27.53831 ])), data: [ 0 , 1 ], sum:  10 });
	features[173] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -80.34907 , 27.312471 ])), data: [ 1 , 0 ], sum:  10 });
	features[174] = new ol.Feature(
	  { geometry:new ol.geom.Point(ol.proj.fromLonLat([ -112.38482 , 33.430922 ])), data: [ 1 , 0 ], sum:  10 });

	// GeoJSON layer
	// var vectorSource = new ol.source.Vector(
	// {	url: '../../../Evac.geojson',
	// 	projection: 'EPSG:3857',
	// 	format: new ol.format.GeoJSON(),
	// });


	var vector = new ol.layer.Vector(
	{	name: 'Vecteur',
		source: new ol.source.Vector({ features: features }),
		// y ordering
		renderOrder: ol.ordering.yOrdering(),
		style: function(f) { return getFeatureStyle(f); }
	})

	map.addLayer(vector);

	// Control Select
	var select = new ol.interaction.Select({
            style: function(f) { return getFeatureStyle(f, true); }
          });
	map.addInteraction(select);

	</script>

</body>
</html>
