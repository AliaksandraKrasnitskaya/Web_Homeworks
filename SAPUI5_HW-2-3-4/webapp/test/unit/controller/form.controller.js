/*global QUnit*/

sap.ui.define([
	"sap/hw2/HW2/controller/form.controller"
], function (Controller) {
	"use strict";

	QUnit.module("form Controller");

	QUnit.test("I should test the form controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});