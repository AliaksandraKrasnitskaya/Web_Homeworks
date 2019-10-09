sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";
    return Controller.extend("sap.hw2.HW2.controller.form", {
        onInit: function () {

            var oData = {
                book : {
                    author : "",
                    title : "",
                    pages : ""
                }
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

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
        },

        OnSubmitPress: function (oEvent) {

            oEvent.preventDefault();


            var oEntry = {
                author: String(this.getView().byId("inputAuthor").getValue()),
                title: String(this.getView().byId("inputTitle").getValue()),
                pages: parseInt(this.getView().byId("inputPages").getValue()),
            };

            var oModel = this.getView().getModel();
            oModel.setData(oEntry);

            fetch("http://127.0.0.1:2403/books/", {
                method: 'POST',
                body: JSON.stringify(oEntry),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => MessageToast.show(JSON.stringify(response)))
                .catch(error => console.error('Error:', error));


        }
    });
});