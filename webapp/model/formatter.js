sap.ui.define([
	], function () {
		"use strict";

		return {

			formatDate: function (iMillis) {
				if (!iMillis) {
					return "";
				}
				
				var oDate = new Date(parseInt(iMillis));
				
				return oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString();
			}
		};

	}
);