sap.ui.define([
	"sap/m/Text",
	"de/fis/filebrowser/model/formatter"
], function(Text, formatter) {
	"use strict";

	QUnit.module("formatter - formatDate");

	QUnit.test("Should return the 3rd March 2017", function(assert) {
		var dateTime = formatter.formatDate(1488495600000);

		assert.strictEqual(dateTime, "3.3.2017 00:00:00", "Correct date was returned");
	});

	QUnit.test("Should return the 29th February 2000", function(assert) {
		var dateTime = formatter.formatDate(951778800000);

		assert.strictEqual(dateTime, "29.2.2000 00:00:00", "Correct date was returned");
	});

	QUnit.test("Should not return the 29th February 2001", function(assert) {
		var dateTime = formatter.formatDate(983401200000);

		assert.notStrictEqual(dateTime, "29.2.2001 00:00:00", "Correct date was returned");
	});

	QUnit.module("formatter - formatFilesize");

	QUnit.test("Should return 0 B", function(assert) {
		var result = formatter.formatFilesize(0);

		assert.strictEqual(result, "0 B");
	});

	QUnit.test("Should not return <0.1 KB", function(assert) {
		var result = formatter.formatFilesize(100);

		assert.notStrictEqual(result, "<0.1 KB");
	});

	QUnit.test("Should return <0.1 KB", function(assert) {
		var result = formatter.formatFilesize(99);

		assert.strictEqual(result, "<0.1 KB");
	});

	QUnit.test("Should return 10.0 MB", function(assert) {
		var result = formatter.formatFilesize(10000000);

		assert.strictEqual(result, "10.0 MB");
	});

	QUnit.test("Should round down to 9.9 MB", function(assert) {
		var result = formatter.formatFilesize(9950000);

		assert.strictEqual(result, "9.9 MB");
	});

	QUnit.test("Should round up to 10.0 MB", function(assert) {
		var result = formatter.formatFilesize(9950001);

		assert.strictEqual(result, "10.0 MB");
	});
	
	QUnit.test("Should return 999.9 KB", function(assert) {
		var result = formatter.formatFilesize(999949);

		assert.strictEqual(result, "999.9 KB");
	});
	
	QUnit.test("Should return 1.0 MB", function(assert) {
		var result = formatter.formatFilesize(1000000);

		assert.strictEqual(result, "1.0 MB");
	});
	
	QUnit.test("Should return 0 B", function(assert) {
		var result = formatter.formatFilesize(-1);

		assert.strictEqual(result, "0 B");
	});
	
});