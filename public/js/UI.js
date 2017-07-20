/*******************************************************************************
 * Copyright (c) 2014 IBM Corp.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution.
 *
 * The Eclipse Public License is available at
 *   http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Contributors:
 *   Bryan Boyd - Initial implementation
 *******************************************************************************/

function UI(demo) {
	this.canvas = document.getElementById("canvas");
	this.context = this.canvas.getContext("2d");

	this.map = null;
	this._bSatView = false;
	this._mainLayer = null;
	this._satLayer = null;
	this._clickStart = { x: null, y: null };
	this._bMoving = false;
	this.mode = "SELECTION";

	this.bDrawOverlays = true;
	this.bDrawMap = false;
	this.selectedObj = null;
	this.trackOn = true;

	this._viewport = {
		lon: {
			min: null,
			max: null,
		},
		lat: {
			min: null,
			max: null,
		}
	}

	this.MIN_ZOOM_LEVEL = 12;
	this.MAX_ZOOM_LEVEL = 19;
}

UI.prototype.init = function() {
	this.map = new OpenLayers.Map("openLayersMap", { units: 'm', projection: "EPSG:4326" });
	this._mainLayer = new OpenLayers.Layer.OSM("OSM");
	this.map.addLayer(this._mainLayer);

//var featureSource = new OpenLayers.source.GeoJSON({
//    'projection': this.map.getView().getProjection(),
//    'url': 'https://rdc-gb-shamba.eu-gb.mybluemix.net/features/schools'
//});

var geoJSON = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { "Kasulu Dis": 1, "name": "Kabagwe Secondary School", "lat": -4.8455049, "long": 29.9359882, "w3w": "isemwe.wasaa.mipera", "units": 10, "capacity": 200 }, "geometry": { "type": "Point", "coordinates": [ 29.9359882, -4.8455049 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 2, "name": "Kasangezi Secondary School", "lat": -4.7658166, "long": 30.0371694, "w3w": "kujitathmini.wanaoa.udenda", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.0371694, -4.7658166 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 3, "name": "Kihenya Secondary School", "lat": -4.1780809, "long": 30.2305691, "w3w": "kukuonya.hakimo.kupambanua", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.2305691, -4.1780809 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 4, "name": "Kimenyi Secondary School", "lat": -4.5709234, "long": 30.5889437, "w3w": "kuingizwa.useremala.nyakua", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.5889437, -4.5709234 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 5, "name": "Kimwanya Secondary School", "lat": -4.3755208, "long": 30.3622609, "w3w": "zimefungwa.vitatoa.mafunzo", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.3622609, -4.3755208 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 6, "name": "Kinyaka Secondary School", "lat": -4.5070593, "long": 30.2505696, "w3w": "mwagwa.asivyo.wachapishaji", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.2505696, -4.5070593 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 7, "name": "Kurunyemi Secondary School", "lat": -4.6494613, "long": 30.3292464, "w3w": "shemeji.arithi.yamekamilika", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.3292464, -4.6494613 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 8, "name": "Makere Secondary School", "lat": -4.2804789, "long": 30.4214679, "w3w": "upishi.kunguru.vyombo", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.4214679, -4.2804789 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 9, "name": "Muyovoz Secondary School", "lat": -4.404492, "long": 30.268579, "w3w": "kuruka.utawaona.zenye", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.268579, -4.404492 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 10, "name": "Nkundutsi Secondary School", "lat": -4.3240123, "long": 30.4012114, "w3w": "yalifanya.kasema.mkono", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.4012114, -4.3240123 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 11, "name": "Ntamya Secondary School", "lat": -4.3622673, "long": 30.1894401, "w3w": "vinono.kutosha.vunjika", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.1894401, -4.3622673 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 12, "name": "Nyakitonto Secondary School", "lat": -4.2912821, "long": 30.2177132, "w3w": "husomwa.midundo.inaratibu", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.2177132, -4.2912821 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 13, "name": "Rungwe Mpya Secondary School", "lat": -4.7688508, "long": 30.2058593, "w3w": "sikukuu.kuelekea.zurura", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.2058593, -4.7688508 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 14, "name": "Rusesa Secondary School", "lat": -4.8215939, "long": 30.0082437, "w3w": "mwanasayansi.kuzitaka.kubadilishia", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.0082437, -4.8215939 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 15, "name": "Titye Secondary School", "lat": -4.6562983, "long": 30.274765, "w3w": "imetangaza.chipua.alitii", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.274765, -4.6562983 ] } },
{ "type": "Feature", "properties": { "Kasulu Dis": 16, "name": "Zeze Secondary School", "lat": -4.9113281, "long": 30.0474822, "w3w": "hereni.ulioko.umbika", "units": null, "capacity": null }, "geometry": { "type": "Point", "coordinates": [ 30.0474822, -4.9113281 ] } }
]
};

var featuresLayer = new OpenLayers.Layer.Markers( "Markers" );

    var size = new OpenLayers.Size(50,50);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('img/mortar.png', size, offset);
		var gj = geoJSON.features;
    featuresLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0,0),icon));
		for (var q in gj) {
	    featuresLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(gj[q].properties.long,gj[q].properties.lat),icon.clone()));
		};


// Add the layer to the map
this.map.addLayer(featuresLayer);



	this.updateCursor();

	demo.location = defaults.mapLocation;
	this.map.setCenter(
		Utils.toOL(
			new OpenLayers.LonLat(
				demo.location.getCenter().lon,
				demo.location.getCenter().lat
			)
		), demo.location.defaultZoom
	);

	if (!this.context.constructor.prototype.fillRoundedRect) {
		this.context.constructor.prototype.fillRoundedRect = function (xx,yy, ww,hh, rad, fill, stroke) {
			if (typeof(rad) == "undefined") rad = 5;
			this.beginPath();
			this.moveTo(xx+rad, yy);
			this.arcTo(xx+ww, yy,    xx+ww, yy+hh, rad);
			this.arcTo(xx+ww, yy+hh, xx,    yy+hh, rad);
			this.arcTo(xx,    yy+hh, xx,    yy,    rad);
			this.arcTo(xx,    yy,    xx+ww, yy,    rad);
			if (stroke) this.stroke();  // Default to no stroke
			if (fill || typeof(fill)=="undefined") this.fill();  // Default to fill
		}
	}

	this.setInputEvents();
}

UI.prototype.updateCursor = function() {
	document.body.style.cursor = (this.mode == "SELECTION" || this.mode == "ALERT") ? "pointer" : "default";
}

UI.prototype.processClick_selection = function(x, y) {

	// get Fence poly that is editable
	var fences = demo.getFences();
	var fence = null;
	for (var i in fences) {
		if (fences[i].inEdit) {
			fence = fences[i];
		}
	}
	if (fence) {
		var poly = fence.polygon;
		if (poly) {
			// check each point to see if we are inside of it
			for (var i in poly.points) {
				p = poly.points[i];
				var pPt = Utils.geoToXY(p.lon, p.lat);
				if (Utils.getXYDist({ x: x, y: y }, pPt) < poly.pointRadius * 1.5) {
					document.body.onmousemove = (function(ctx) {
						return function(event) {
							var newGeo = Utils.xyToGeo(event.pageX, event.pageY - demo.ui.canvas.offsetTop, true);
							ctx.points[i].lon = newGeo.lon;
							ctx.points[i].lat = newGeo.lat;
						}
					})(poly);

					document.body.onmouseup = function() {
						document.body.onmousemove = defaultOnMouseMove;
					}
					return;
				}
			}

			var dotProd = function(a, b) {
				return (a.x * b.x + a.y * b.y);
			}

			// check if we are selecting an edge of the poly
			var pts = [];
			for (var i in poly.points) {
				pts.push(Utils.geoToXY(poly.points[i].lon, poly.points[i].lat));
			}

			for (var i = 0; i < pts.length; i++) {
				var startIndex = i;
				var endIndex = i == 0 ? pts.length - 1 : (i-1);
				var start = pts[startIndex];
				var end = pts[endIndex];

				var segDist = Utils.getXYDist(start, end);
				var distFromSeg = 10000000;
				for (var t = 1; t < 20; t++) {
					var interpol = {
						x: start.x + (t / 20) * (end.x - start.x),
						y: start.y + (t / 20) * (end.y - start.y)
					};
					var d = Utils.getXYDist({x: x, y: y}, interpol)
					if (d < distFromSeg) { distFromSeg = d; }
				}
				//console.log("dist from inner segment: " + distFromSeg);
				if (distFromSeg < segDist/20) {
					console.log("selected edge " + startIndex + " --> " + endIndex);
					document.body.onmousemove = function(event) {
						var delta = {
							x: event.pageX - demo.ui.clickLast.x,
							y: event.pageY - demo.ui.clickLast.y
						}
						poly.moveEdge(startIndex, endIndex, delta.x, delta.y);
						demo.ui.clickLast.x = event.pageX;
						demo.ui.clickLast.y = event.pageY;
					};
					document.body.onmouseup = function() {
						document.body.onmousemove = defaultOnMouseMove;
					}
					return;
				}
			}
		}
	}

	// first, check for a click on a map object
	var bGotObject = false;
	for (var type in demo.mapObjects) {
		for (var i in demo.mapObjects[type].objects) {
			var obj = demo.mapObjects[type].objects[i];
			if (obj.canSelect()) {
				var dist = Utils.getXYDist({ x: x, y: y }, obj.pos);
				if (dist < (obj.getRadius() * 1.2) && obj.canSelect()) {
					bGotObject = true;
					demo.ui.select(obj);
					document.body.onmouseup = function() {
						document.body.onmousemove = defaultOnMouseMove;
					}
					break;
				}
			}
		}
	}

	// next, check for a map pan
	if (!bGotObject) {
		if (!this.selectedObj) {
			this._bMoving = true;
			demo.doMapGraphUpdate = true;

			// start pan of map
			document.body.onmousemove = function(e) {
				var delta = {
					x: e.pageX - demo.ui.clickLast.x,
					y: e.pageY - demo.ui.clickLast.y
				}
				demo.ui.map.pan(-delta.x, -delta.y, { dragging: true });
				demo.ui.updateViewport();
				demo.ui.clickLast.x = e.pageX;
				demo.ui.clickLast.y = e.pageY;
				demo.doMapGraphUpdate = true;
			};
		}

		document.body.onmouseup = function(e) {
			document.body.onmousemove = defaultOnMouseMove;
			if (!e.pageX || (demo.ui._clickStart.x == e.pageX && demo.ui._clickStart.y == e.pageY)) {
				// we did a single-click (without panning) on an empty map space, so de-select
				demo.ui.deselect();
			}
			this._bMoving = false;
		}
	}
}

UI.prototype.processLeftClick = function(x, y) {
	this.processClick_selection(x, y);
}

UI.prototype.processRightClick = function() {
	// do nothing
}

UI.prototype.toggleMap = function() {
	this.bDrawMap = !this.bDrawMap;
	this.bForceDrawMap = true;
}

UI.prototype.flash = function(id, remainingTime) {
	if (!remainingTime) { remainingTime = 1000; }
	remainingTime -= 50;
	if (!demo.getCar(id)) { return; }
	demo.getCar(id).factor = 1 + 0.5*(1000/2 - Math.abs(1000/2 - remainingTime)) / (1000/2);
	if (remainingTime <= 0 && !demo.getCar(id)._flashing) { return; }

	setTimeout(function() {
		demo.ui.flash(id, remainingTime);
	}, 50);
}

UI.prototype.select = function(obj) {
	this.deselect();
	this.trackOn = false;
	this.selectedObj = obj;
	obj.select();
	this.slideTo(this.selectedObj.geo);
}

UI.prototype.deselect = function() {
	if (this.selectedObj) { this.selectedObj.deselect(); }
	demo.ui.inCarEdit = false;
	this.selectedObj = null;
	$(".popover").fadeOut();
}

UI.prototype.zoomOut = function() {
	this.map.zoomOut();
	demo.doMapGraphUpdate = true;
	this.updateViewport();
	this.checkZoomBounds();
}

UI.prototype.zoomIn = function() {
	this.map.zoomIn();
	demo.doMapGraphUpdate = true;
	this.updateViewport();
	this.checkZoomBounds();
}

UI.prototype.trackSelected = function() {
	if (this.selectedObj && this.trackOn) {
		var xy = Utils.geoToXY(this.selectedObj.geo);
		var newGeo = Utils.xyToGeo(xy.x, xy.y);// + deltaY);
		this.map.setCenter(Utils.toOL(new OpenLayers.LonLat(newGeo.lon, newGeo.lat)));
		this.updateViewport();
	}
}

UI.prototype._doSlide = function(remaining) {
	if (remaining <= 0) {
		this.trackOn = true;
		return;
	}
	if (remaining == 10) {
		$(".popover.left").slideDown();
		if (demo.ui.inboxOn) {
			$(".popover.right").slideDown();
		}
	}
	this.updateViewport();
	setTimeout(function() { demo.ui._doSlide(remaining-1); }, 10);
}
UI.prototype.slideTo = function(geo) {
	this.trackOn = false;
	$(".popover").hide();
	this.map.panTo(Utils.toOL(new OpenLayers.LonLat(geo.lon, geo.lat)));
	setTimeout(function() { demo.ui._doSlide(30); }, 10);
}

UI.prototype.updateViewport = function() {
	if (!this.map) { return; }
	var min = Utils.toLL(this.map.getLonLatFromViewPortPx({ x: 0, y: win.height }));
	var max = Utils.toLL(this.map.getLonLatFromViewPortPx({ x: win.width, y: 0 }));
	// correct
	var bViewChanged = false;
	if (this._viewport.lon.min != min.lon || this._viewport.lon.max != max.lon || this._viewport.lat.min != min.lat || this._viewport.lat.max != max.lat) {
		bViewChanged = true;
	}
	this._viewport.lon.min = min.lon;
	this._viewport.lat.min = min.lat;
	this._viewport.lon.max = max.lon;
	this._viewport.lat.max = max.lat;
	this._viewport.lon.center = min.lon + ((max.lon - min.lon) / 2)
	this._viewport.lat.center = min.lat + ((max.lat - min.lat) / 2)
}

UI.prototype.checkZoomBounds = function() {
	if (demo.ui.map.getZoom() >= UI.MAX_ZOOM_LEVEL) {
		document.getElementById("zoomInBtn").disabled = true;
	} else {
		document.getElementById("zoomInBtn").disabled = false;
	}

	if (demo.ui.map.getZoom() <= UI.MIN_ZOOM_LEVEL) {
		document.getElementById("zoomOutBtn").disabled = true;
	} else {
		document.getElementById("zoomOutBtn").disabled = false;
	}
}

UI.prototype.getMinLon = function() {
	return this._viewport.lon.min;
}

UI.prototype.getMinLat = function() {
	return this._viewport.lat.min;
}

UI.prototype.getMaxLon = function() {
	return this._viewport.lon.max;
}

UI.prototype.getMaxLat = function() {
	return this._viewport.lat.max;
}

UI.prototype.getLonWidth = function() {
	return this.getMaxLon() - this.getMinLon();
}

UI.prototype.getLatHeight = function() {
	return this.getMaxLat() - this.getMinLat();
}

var defaultOnMouseMove = function(event) {
}
UI.prototype.clickLast = {
	x: 0,
	y: 0
};
UI.prototype.setInputEvents = function() {
	document.body.oncontextmenu = function() {
		return false;
	}

	document.body.onmousemove = defaultOnMouseMove;

	document.body.onkeydown = function(event) {
	};
	document.body.onkeyup = function(event) {
	};

	document.body.onmousedown = function(event) {
		var mapX = event.pageX;
		var mapY = event.pageY;

		if (event.which == 1 && event.target.nodeName == "CANVAS") {
			demo.ui.clickLast = {
				x: event.pageX,
				y: event.pageY
			};

			demo.ui._clickStart.x = demo.ui.clickLast.x;
			demo.ui._clickStart.y = demo.ui.clickLast.y;

			demo.ui.processLeftClick(mapX, mapY);

		} else if (event.which == 3 && event.target.nodeName == "CANVAS") {
			demo.ui.processRightClick(mapX, mapY);
		}
	}
}

UI.prototype.touchLast = {
	x: 0,
	y: 0
}
UI.prototype.touchStart = function(event) {
	console.log("touchStart: " + event.touches[0].clientX + ", " + event.touches[0].clientY);
	event.preventDefault();
	document.body.onmousedown({ pageX: event.touches[0].clientX, pageY: event.touches[0].clientY, which: 1, target: event.target });
}

UI.prototype.touchEnd = function(event) {
	console.log("touchEnd");
	document.body.onmouseup({ });
}

UI.prototype.touchMove = function(event) {
	console.log("touchMove: " + event.touches[0].clientX + ", " + event.touches[0].clientY);
	event.preventDefault();
	document.body.onmousemove({ pageX: event.touches[0].clientX, pageY: event.touches[0].clientY, which: 1, target: event.target });
}

UI.prototype.touchCancel = function(event) {
	console.log("touchCancel: " + event.touches[0].clientX + ", " + event.touches[0].clientY);
	event.preventDefault();
}
