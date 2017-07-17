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
var iotdevtype = "quad";
var config = {
	iot_deviceOrg: "wybq11",       // replace with your IoT Foundation organization
	iot_deviceType: iotdevtype,     // replace with your deviceType
	iot_deviceSet: [               // replace with your registered device(s)
		{ token: "shambaquad" , deviceId: "philomena-margaret-vivienne"},
		{ token: "shambaquad" , deviceId: "mary-louise-evelyn"},
		{ token: "shambaquad" , deviceId: "elizabeth-mary-margaret"},
		{ token: "shambaquad" , deviceId: "margaret-susan-helen"},
		{ token: "shambaquad" , deviceId: "davina-helen-elizabeth"},
		{ token: "shambaquad" , deviceId: "mary-helen-susan"},
		{ token: "shambaquad" , deviceId: "margaret-abigail-jane"},
		{ token: "shambaquad" , deviceId: "joan-jane-mary"},
		{ token: "shambaquad" , deviceId: "susan-jane-elizabeth"},
		{ token: "shambaquad" , deviceId: "evelyn-helen-louise"}
	],
	iot_apiKey: "a-wybq11-p9voljkvss",    // replace with the key for a generated API token
	iot_apiToken: "Uv0&o&A)a-4Naeju86",  // replace with the generated API token

	// these topics will be used by Geospatial Analytics
	notifyTopic: "iot-2/type/api/id/geospatial/cmd/geoAlert/fmt/json",
	//inputTopic: "iot-2/type/vehicle/id/+/evt/telemetry/fmt/json",
	//RDC match device type to above
	inputTopic: "iot-2/type/"+iotdevtype+"/id/+/evt/telemetry/fmt/json",
};

try {
	module.exports = config;
} catch (e) { window.config = config; }
