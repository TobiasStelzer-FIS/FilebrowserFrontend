sap.ui.define([
	], function () {
		"use strict";

		return {

			formatListItemClass: function (sListItemId) {
				var sEditItemId = this.getModel("detailView").getProperty("editItem");
				
				if (sListItemId === sEditItemId) {
					return "greenTableRow";
				}
			},

			formatDate: function (iMillis) {
				if (!iMillis) {
					return "";
				}
				
				var oDate = new Date(parseInt(iMillis));
				
				return oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString();
			},
			
			formatFilesize: function (iSize) {
				if (!iSize)
					return "";
					
				var MB = 1000000;
				var KB = 1000;
				if (iSize >= 1 * MB) {
					// Size is bigger or equal 10 MB
					return (iSize / MB).toFixed(1) + " MB";
				} else if (iSize >= 0.1 * KB) {
					// Size is bigger or equal 0.1 KB but lesser than 10 MB
					return (iSize / KB).toFixed(1) + " KB";
				} else {
					return "<0.1 KB";
				}
			}
		};

	}
);