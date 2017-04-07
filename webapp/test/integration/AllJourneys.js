jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 Applicants in the list
// * All 3 Applicants have at least one Applications

sap.ui.require([
	"sap/ui/test/Opa5",
	"de/fis/filebrowser/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"de/fis/filebrowser/test/integration/pages/App",
	"de/fis/filebrowser/test/integration/pages/Browser",
	"de/fis/filebrowser/test/integration/pages/Master",
	"de/fis/filebrowser/test/integration/pages/Detail",
	"de/fis/filebrowser/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "de.fis.filebrowser.view."
	});

	sap.ui.require([
		"de/fis/filebrowser/test/integration/MasterJourney",
		"de/fis/filebrowser/test/integration/NavigationJourney",
		"de/fis/filebrowser/test/integration/NotFoundJourney",
		"de/fis/filebrowser/test/integration/BusyJourney"
	], function () {
		QUnit.start();
	});
});