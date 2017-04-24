/*global location */
sap.ui.define([
		"de/fis/filebrowser/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"de/fis/filebrowser/model/formatter"
	], function (BaseController, JSONModel, formatter) {
		"use strict";

		return BaseController.extend("de.fis.filebrowser.controller.Detail", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var oViewModel = new JSONModel({
					busy : false,
					delay : 0,
					lineItemListTitle : this.getResourceBundle().getText("detailFolderContentTableHeading")
				});

				this.getModel("contentModel").attachEvent("requestCompleted", function() {
					oViewModel.setProperty("/busy", false);
				}, this);
				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				this.setModel(oViewModel, "detailView");

//				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Updates the item count within the line item table's header
			 * @param {object} oEvent an event containing the total number of items in the list
			 * @private
			 */
			onTableUpdateFinished : function (oEvent) {
				var sTitle,
					iTotalItems = oEvent.getParameter("total"),
					oViewModel = this.getModel("detailView");

				// only update the counter if the length is final
				if (this.byId("folderContentTable").getBinding("items").isLengthFinal()) {
					if (iTotalItems) {
						sTitle = this.getResourceBundle().getText("detailFolderContentTableHeadingCount", [iTotalItems]);
					} else {
						//Display 'Line Items' instead of 'Line items (0)'
						sTitle = this.getResourceBundle().getText("detailFolderContentTableHeading");
					}
					oViewModel.setProperty("/lineItemListTitle", sTitle);
				}
			},
			
			/**
			 * Navigates to selected folder
			 * @param {object} oEvent an event containing the source of the press-event
			 * @private
			 */
			onBreadcrumbPress : function (oEvent) {
				var oSource = oEvent.getSource();
				var oBindingContext = oSource.getBindingContext("contentModel");
				var sObjectId = oBindingContext.getProperty("Id");
				
				this.getModel("contentModel").loadData("/backend/filebrowser?action=navigate&id=" + sObjectId);
				this.getModel("detailView").setProperty("/busy", true);
			},

			/**
			 * Navigates to selected folder or opens selected file
			 * @param {object} oEvent an event containing the source of the press-event
			 * @private
			 */
			onItemPressed : function (oEvent) {
				var oBindingContext = oEvent.getParameter("listItem").getBindingContext("contentModel");
				var sId = oBindingContext.getProperty("Id");
				
				switch (oBindingContext.getProperty("Type")) {
					case "Folder":
						this._loadFolder(sId);
						break;
					case "Document":
						this._loadDocument(sId);
						break;
				}
			},
			
			/**
			 * Deletes the corresponding folder or document
			 * @param {object} oEvent an event containing the source of the press-event
			 * @private
			 */
			onDeletePressed : function (oEvent) {
				var oListItem = oEvent.getSource().getParent().getParent();
				var oBindingContext = oListItem.getBindingContext("contentModel");
				
				this._deleteItem(oBindingContext.getProperty("Id"), oBindingContext.getProperty("Type") === "Folder");
			},
			
			/* =========================================================== */
			/* begin: internal methods                                     */
			/* =========================================================== */

			_loadFolder : function (sId) {
				this.getModel("contentModel").loadData("/backend/filebrowser?action=navigate&id=" + sId);
				this.getModel("detailView").setProperty("/busy", true);
			},
			
			_loadDocument : function (sId) {
				window.open("/backend/filebrowser/" + sId, '_blank');
			},
			
			_reloadFolderContent : function () {
				var sId = this.getModel("contentModel").getProperty("/SelectedFolder/Id");
				
				this._loadFolder(sId);
			},
			
			_reloadHierarchy : function () {
				this.getModel("hierarchyModel").loadData("/backend/filebrowser?action=hierarchy");
				this.getModel("masterView").setProperty("/busy", true);
			},
			
			_deleteItem : function (sId, bReloadHierarchy) {
				$.ajax({
					 type: "GET",
					 url: "/backend/filebrowser?action=delete&id=" + sId,
					 data: {}
				}).always(function () {
					this._reloadFolderContent();
					if (bReloadHierarchy)
						this._reloadHierarchy();
				}.bind(this));
			},
			
			/**
			 * Binds the view to the object path and expands the aggregated line items.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
<<<<<<< Upstream, based on 593767ec33ee7437c36d7bee797bb302abda15a5
				this.getModel("contentModel").loadData("/backend/filebrowser?action=navigate&id=" + sObjectId);
				this.getModel("detailView").setProperty("/busy", true);
=======
				this._loadFolder(sObjectId);
>>>>>>> 7d5cddd Implemented deleting functionality 
				
//				this.getModel().metadataLoaded().then( function() {
//					var sObjectPath = this.getModel().createKey("Applicants", {
//						ApplicantId :  sObjectId
//					});
//					this._bindView("/" + sObjectPath);
//				}.bind(this));
			},

			/**
			 * Binds the view to the object path. Makes sure that detail view displays
			 * a busy indicator while data for the corresponding element binding is loaded.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound to the view.
			 * @private
			 */
			_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				var oViewModel = this.getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					events: {
						change : this._onBindingChange.bind(this),
						dataRequested : function () {
							oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("detailObjectNotFound");
					// if object could not be found, the selection in the master list
					// does not make sense anymore.
					this.getOwnerComponent().oListSelector.clearMasterListSelection();
					return;
				}

				var sPath = oElementBinding.getPath(),
					oResourceBundle = this.getResourceBundle(),
					oObject = oView.getModel().getObject(sPath),
					sObjectId = oObject.ApplicantId,
					sObjectName = oObject.Lastname,
					oViewModel = this.getModel("detailView");

				this.getOwnerComponent().oListSelector.selectAListItem(sPath);

				oViewModel.setProperty("/shareSendEmailSubject",
					oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
					oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			},

			_onMetadataLoaded : function () {
				// Store original busy indicator delay for the detail view
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = this.getModel("detailView"),
					oLineItemTable = this.byId("lineItemsList"),
					iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

				// Make sure busy indicator is displayed immediately when
				// detail view is displayed for the first time
				oViewModel.setProperty("/delay", 0);
				oViewModel.setProperty("/lineItemTableDelay", 0);

				oLineItemTable.attachEventOnce("updateFinished", function() {
					// Restore original busy indicator delay for line item table
					oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
				});

				// Binding the view will set it to not busy - so the view is always busy if it is not bound
				oViewModel.setProperty("/busy", true);
				// Restore original busy indicator delay for the detail view
				oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
			}

		});

	}
);
