jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"de/fis/filebrowser/test/integration/NavigationJourneyPhone",
		"de/fis/filebrowser/test/integration/NotFoundJourneyPhone",
		"de/fis/filebrowser/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});