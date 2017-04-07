sap.ui.define([
	], function () {
		"use strict";

		return {
			/**
			 * Rounds the currency value to 2 digits
			 *
			 * @public
			 * @param {string} sValue value to be formatted
			 * @returns {string} formatted currency value with 2 digits
			 */
			currencyValue : function (sValue) {
				if (!sValue) {
					return "";
				}

				return parseFloat(sValue).toFixed(2);
			},
			
			getIcon: function (sName) {
				var p = this.getParent();
				var id = this.getId();
				var oItem = this.getView().byId(id);
				var oTreeItem = this;
			}
		};

	}
);