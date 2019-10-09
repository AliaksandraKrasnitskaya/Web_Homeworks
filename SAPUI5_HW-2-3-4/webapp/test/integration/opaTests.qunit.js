/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/hw2/HW2/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});