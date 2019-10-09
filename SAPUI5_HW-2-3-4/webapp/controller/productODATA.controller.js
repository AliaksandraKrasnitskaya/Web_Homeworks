sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
	], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("sap.hw2.HW2.controller.productODATA", {
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.getRoute("productODATA").attachMatched(this._onRouteMatched, this);
			var url = "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/OData/OData.svc";
			var oModel = new sap.ui.model.odata.ODataModel(url, true);
			sap.ui.getCore().setModel(oModel, "products");
			
		},
		
		_onRouteMatched: function () {
			var oModel = sap.ui.getCore().getModel("products");

    		var that = this;
			oModel.read("/Products", null, null, false, 
			  function(oData, oResponse) { /* do something */ 
  				MessageToast.show("Success");
  				var oProducts = oData.results;
				var oJsonModel = new sap.ui.model.json.JSONModel(oProducts);
				var oTable = that.byId("productsTable");
				oTable.setModel(oJsonModel, "products");
			  });
		},
	
		action: function (oEvent) {
			var that = this;
			var actionParameters = JSON.parse(oEvent.getSource().data("wiring").replace(/'/g, "\""));
			var eventType = oEvent.getId();
			var aTargets = actionParameters[eventType].targets || [];
			aTargets.forEach(function (oTarget) {
				var oControl = that.byId(oTarget.id);
				if (oControl) {
					var oParams = {};
					for (var prop in oTarget.parameters) {
						oParams[prop] = oEvent.getParameter(oTarget.parameters[prop]);
					}
					oControl[oTarget.action](oParams);
				}
			});
			var oNavigation = actionParameters[eventType].navigation;
			if (oNavigation) {
				var oParams = {};
				(oNavigation.keys || []).forEach(function (prop) {
					oParams[prop.name] = encodeURIComponent(JSON.stringify({
						value: oEvent.getSource().getBindingContext(oNavigation.model).getProperty(prop.name),
						type: prop.type
					}));
				});
				if (Object.getOwnPropertyNames(oParams).length !== 0) {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName, oParams);
				} else {
					this.getOwnerComponent().getRouter().navTo(oNavigation.routeName);
				}
			}
		}
		
	});
});