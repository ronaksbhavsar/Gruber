webpackJsonp([13],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sync; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var mobileAppClient, // Connection to the Azure Mobile App backend
store, // Sqlite store to use for offline data sync
syncContext; // Offline data sync context
// Set useOfflineSync to true to use tables from local store.
// Set useOfflineSync to false to use tables on the server.
var useOfflineSync = true;
var tables = {
    mob_activity: {
        tblname: 'mob_activity',
        tbldefinition: {
            'id': 'string',
            'a_description': 'string',
            'a_activityGroup': 'string',
            'a_nextActivity': 'string',
            'a_nextActivityDeltaSeconds': 'integer',
            'a_permitsManualDate': 'boolean',
            'a_icon': 'string',
            'a_isFoto': 'boolean',
            'a_documentTypeId': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_events: {
        tblname: 'mob_events',
        tbldefinition: {
            'id': 'string',
            'e_phone': 'string',
            'e_tripid': 'string',
            'e_sequence': 'integer',
            'e_activityId': 'string',
            'e_dtFilledTime': 'date',
            'e_dtDeviceTime': 'date',
            'e_dtGPSTime': 'date',
            'e_longitude': 'string',
            'e_latitude': 'string',
            'e_coordinatesOrigin': 'string',
            'e_placeAddress': 'string',
            'e_placeZip': 'string',
            'e_placeCity': 'string',
            'e_placeNation': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_dispatchers: {
        tblname: 'mob_dispatchers',
        tbldefinition: {
            'id': 'string',
            'dp_name': 'string',
            'dp_mail': 'string',
            'dp_phone': 'string',
            'dp_group': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_documentTypes: {
        tblname: 'mob_documentTypes',
        tbldefinition: {
            'id': 'string',
            'd_description': 'string',
            'd_group': 'string',
            'd_barcodeRequired': 'boolean',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_messages: {
        tblname: 'mob_messages',
        tbldefinition: {
            'id': 'string',
            'm_objectType': 'string',
            'm_objectKey': 'string',
            'dp_id': 'string',
            'dp_group': 'string',
            'm_dtcreation': 'date',
            'm_status': 'string',
            'm_source': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_messagesTexts: {
        tblname: 'mob_messagesTexts',
        tbldefinition: {
            'id': 'string',
            'ms_messageId': 'string',
            'ms_dtcreation': 'date',
            'ms_sender': 'string',
            'ms_message': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_messagesTextsRead: {
        tblname: 'mob_messagesTextsRead',
        tbldefinition: {
            'id': 'string',
            'ms_messageId': 'string',
            'ms_messageTextId': 'string',
            'ms_user': 'string',
            'ms_dtRead': 'date',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_notifications: {
        tblname: 'mob_notifications',
        tbldefinition: {
            'id': 'string',
            'n_notificationType': 'string',
            'n_notificationMessage': 'string',
            'n_notificationRead': 'date',
            'n_notificationReadUser': 'string',
            'n_notificationUserId': 'integer',
            'm_objectType': 'string',
            'm_objectKey': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_orders: {
        tblname: 'mob_orders',
        tbldefinition: {
            'id': 'string',
            'o_orderCompany': 'integer',
            'o_orderYear': 'integer',
            'o_orderBranch': 'string',
            'o_orderNumber': 'integer',
            'o_description': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_positions: {
        tblname: 'mob_positions',
        tbldefinition: {
            'id': 'string',
            'p_dtCreazion': 'date',
            'p_positionLongitude': 'string',
            'p_positionLatitude': 'string',
            'p_origin': 'string',
            'p_tripId': 'string',
            'p_userId': 'string',
            'p_accurateSettings': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_sharedAuthorization: {
        tblname: 'mob_sharedAuthorization',
        tbldefinition: {
            'id': 'string',
            'sa_objectType': 'string',
            'sa_objectId': 'string',
            'sa_password': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_trip: {
        tblname: 'mob_trip',
        tbldefinition: {
            'id': 'string',
            't_company': 'integer',
            't_year': 'integer',
            't_branch': 'string',
            't_number': 'integer',
            't_dispatcher': 'string',
            't_userID': 'string',
            't_plateTruck': 'string',
            't_plateTrailer': 'string',
            't_aggregationGroup': 'string',
            't_bookingNr': 'string',
            't_dtFirstLoading': 'date',
            't_dtLastUnloading': 'date',
            't_FirstLoadingPlace': 'string',
            't_LastUnloadingPlace': 'string',
            't_mapImage': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_tripDocuments: {
        tblname: 'mob_tripDocuments',
        tbldefinition: {
            'id': 'string',
            'td_tripId': 'string',
            'td_docType': 'string',
            'td_datetime': 'date',
            'td_required': 'bool',
            'tl_orderCompany': 'integer',
            'tl_orderYear': 'integer',
            'tl_orderBranch': 'string',
            'tl_orderNumber': 'integer',
            'tl_orderStop': 'integer',
            'tl_barcode': 'string',
            'td_externalKey': 'string',
            'td_nomeFile': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_tripDocumentsImages: {
        tblname: 'mob_tripDocumentsImages',
        tbldefinition: {
            'id': 'string',
            'td_TripDocumentsId': 'string',
            'td_document': 'string',
            'td_note': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_tripGoods: {
        tblname: 'mob_tripGoods',
        tbldefinition: {
            'id': 'string',
            'tg_TripId': 'string',
            'tg_description': 'string',
            'tg_quantity': 'integer',
            'tg_uom': 'string',
            'tg_width': 'float',
            'tg_height': 'float',
            'tg_length': 'float',
            'tg_orderId': 'string',
            'tg_orderStop': 'integer',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_tripTimeLine: {
        tblname: 'mob_tripTimeLine',
        tbldefinition: {
            'id': 'string',
            'tl_tripId': 'string',
            'tl_sequence': 'integer',
            'tl_dtTimeEstimate': 'date',
            'tl_dtTimeEffective': 'date',
            'tl_activityId': 'string',
            'tl_orderId': 'string',
            'tl_orderStop': 'integer',
            'tl_longitude': 'string',
            'tl_latitude': 'string',
            'tl_placeDescription': 'string',
            'tl_placeAddress': 'string',
            'tl_placeZip': 'string',
            'tl_placeCity': 'string',
            'tl_placeNation': 'string',
            'tl_notes': 'string',
            'tl_dtInsert': 'date',
            'tl_externalKey': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_user: {
        tblname: 'mob_user',
        tbldefinition: {
            'id': 'string',
            'u_phone': 'string',
            'u_name': 'string',
            'u_language': 'string',
            'u_lastLogin': 'date',
            'u_photo': 'object',
            'u_identity': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_userCompany: {
        tblname: 'mob_userCompany',
        tbldefinition: {
            'id': 'string',
            'uc_userId': 'string',
            'uc_company': 'string',
            'uc_codedip': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_userRegistrations: {
        tblname: 'mob_userRegistrations',
        tbldefinition: {
            'id': 'string',
            'ur_phone': 'string',
            'ur_identity': 'string',
            'ur_verificationCode': 'string',
            'ur_datetimeRequest': 'date',
            'deleted': 'boolean',
            'version': 'string'
        }
    },
    mob_userSettings: {
        tblname: 'mob_userSettings',
        tbldefinition: {
            'id': 'string',
            'set_UserId': 'string',
            'set_key': 'string',
            'set_value': 'string',
            'deleted': 'boolean',
            'version': 'string'
        }
    }
};
var Sync = (function () {
    function Sync(dataService) {
        this.dataService = dataService;
        this.userId = "";
    }
    /**
      This function is use for the sync all relevant data of registered user with local sqlite database.
      ** Call this function only if device is ready..
    */
    Sync.prototype.initializeTables = function () {
        var _this = this;
        //mobileAppClient = new WindowsAzure.MobileServiceClient("http://192.168.4.142:8089");
        mobileAppClient = new WindowsAzure.MobileServiceClient("https://gruberapidev.azurewebsites.net");
        return this.dataService.getUserFromLocalStorage().then(function (res) {
            console.log('local user data: ', res);
            _this.userId = res.id;
            mobileAppClient.currentUser = {
                userId: _this.userId,
                mobileServiceAuthenticationToken: res.auth_token.toString()
            };
            return _this.initializeStore();
        });
    };
    /**
    * Initialize local tables.
    */
    Sync.prototype.initializeStore = function () {
        var _this = this;
        // Create the sqlite store
        store = new WindowsAzure.MobileServiceSqliteStore('gruber.db');
        console.log('initializing store');
        // Define the table schema
        return this.initTableWithSync(tables.mob_activity.tblname, tables.mob_activity.tbldefinition)
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_dispatchers.tblname, tables.mob_dispatchers.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_documentTypes.tblname, tables.mob_documentTypes.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_messages.tblname, tables.mob_messages.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_messagesTexts.tblname, tables.mob_messagesTexts.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_messagesTextsRead.tblname, tables.mob_messagesTextsRead.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_notifications.tblname, tables.mob_notifications.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_orders.tblname, tables.mob_orders.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_positions.tblname, tables.mob_positions.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_sharedAuthorization.tblname, tables.mob_sharedAuthorization.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_trip.tblname, tables.mob_trip.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_tripDocuments.tblname, tables.mob_tripDocuments.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_tripDocumentsImages.tblname, tables.mob_tripDocumentsImages.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_tripGoods.tblname, tables.mob_tripGoods.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_tripTimeLine.tblname, tables.mob_tripTimeLine.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_events.tblname, tables.mob_events.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_user.tblname, tables.mob_user.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_userRegistrations.tblname, tables.mob_userRegistrations.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_userSettings.tblname, tables.mob_userSettings.tbldefinition);
        })
            .then(function (result) {
            return _this.initTableWithSync(tables.mob_userCompany.tblname, tables.mob_userCompany.tbldefinition);
        })
            .then(function () {
            return true;
        });
    };
    /**
    * Initialize local table with sync to pull or push data from server.
    */
    Sync.prototype.initTableWithSync = function (tableName, tableDefinition) {
        console.log('initializing table', tableName);
        return store.defineTable({
            name: tableName,
            columnDefinitions: tableDefinition
        })
            .then(function () {
            // Initialize the sync context
            syncContext = mobileAppClient.getSyncContext();
            // Define an overly simplified push handler that discards
            // local changes whenever there is an error or conflict.
            // Note that a real world push handler will have to take action according
            // to the nature of conflict.
            syncContext.pushHandler = {
                //onConflict: this.onConflict,
                onConflict: function (pushError) {
                    console.log('onConflict', pushError);
                    return pushError.cancelAndDiscard();
                },
                onError: function (pushError) {
                    // Treat 404 as a conflict. This can happen if server deletes a record and client pushes an updated value of the record
                    if (pushError.getError().request.status === 404) {
                        return this.onConflict(pushError, 'server');
                    }
                    console.log('status', pushError.getError().request.status);
                    console.log('getClientRecord', pushError.getClientRecord());
                    console.log('getError', pushError.getError());
                    console.log('getTableName', pushError.getTableName());
                    console.log('getAction', pushError.getAction());
                    console.log('getServerRecord', pushError.getServerRecord());
                    pushError.isHandled = true;
                    console.log(tableName, JSON.stringify(tableDefinition));
                    console.log('onError', JSON.stringify(pushError));
                    return this.handleError(pushError, 'Encountered error while pushing change to server. Possibly connectivity issue!');
                }
            };
            return syncContext.initialize(store);
        });
    };
    /**
    * Synchronize local table with the table on the server.
    * We do this by pushing local changes to the server and then
    * pulling the latest changes from the server.
    */
    Sync.prototype.syncLocalTable = function (syncTableName) {
        console.log('sync local table', syncTableName);
        //#101 - Incremental Sync
        return syncContext.pull(new WindowsAzure.Query(syncTableName), syncTableName + "_FULL");
    };
    /**
   * Push local table data to table on the server.
    It will not pull data from the server and sync with local tables..
   */
    Sync.prototype.pushLocalTablesData = function () {
        console.log('push local tables to server');
        return syncContext.push();
    };
    /**
    * Sync all tables of local database table
    */
    Sync.prototype.syncAllLocalTables = function () {
        var _this = this;
        // sync all tables
        console.log('sync all tables');
        //alert('sync complete');
        return this.initializeTables().then(function (res) {
            return _this.pushLocalTablesData();
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_activity.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_dispatchers.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_documentTypes.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messages.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTexts.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_notifications.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_orders.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_sharedAuthorization.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_trip.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripDocuments.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripDocumentsImages.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripGoods.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripTimeLine.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_user.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_userCompany.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_userSettings.tblname);
        });
    };
    Sync.prototype.syncMessageRelatedLocalTables = function () {
        var _this = this;
        // sync all tables
        return this.initializeTables().then(function (res) {
            return _this.pushLocalTablesData();
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_dispatchers.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messages.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTexts.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_notifications.tblname);
        });
    };
    Sync.prototype.syncMessageTextsRelatedLocalTables = function () {
        var _this = this;
        return this.pushLocalTablesData()
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTexts.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
        });
    };
    Sync.prototype.syncTripRelatedLocalTables = function () {
        var _this = this;
        // sync all tables
        return this.initializeTables().then(function (res) {
            return _this.pushLocalTablesData();
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_activity.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_documentTypes.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_orders.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_trip.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripDocuments.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripDocumentsImages.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripGoods.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_tripTimeLine.tblname);
        });
    };
    Sync.prototype.syncUserRelatedLocalTables = function () {
        var _this = this;
        // sync all tables
        return this.pushLocalTablesData()
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_sharedAuthorization.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_user.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_userCompany.tblname);
        })
            .then(function (result) {
            return _this.syncLocalTable(tables.mob_userSettings.tblname);
        });
    };
    Sync.prototype.getTableData = function (tableName, filterParams) {
        var tableData;
        if (filterParams) {
            filterParams.deleted = false;
        }
        else {
            filterParams = { deleted: false };
        }
        // Create a table reference
        if (useOfflineSync) {
            tableData = mobileAppClient.getSyncTable(tableName);
        }
        else {
            tableData = mobileAppClient.getTable(tableName);
        }
        syncContext.pushHandler = {
            onConflict: function (pushError) {
                // Handle the conflict.
                console.log("Sync conflict! " + pushError.getError().message);
                // Update failed, revert to server's copy.
                pushError.cancelAndDiscard();
            },
            onError: function (pushError) {
                // Handle the error
                // In the simulated offline state, you get "Sync error! Unexpected connection failure."
                console.log("Sync error! " + pushError.getError().message);
            }
        };
        return tableData
            .where(filterParams)
            .read() // Read the results
            .then(function (data) {
            //alert(tableName + ' offline : ' + data.length);
            return data;
        });
    };
    Sync.prototype.getTableReference = function (tableName) {
        // Create a table reference
        if (useOfflineSync) {
            return mobileAppClient.getSyncTable(tableName);
        }
        else {
            return mobileAppClient.getTable(tableName);
        }
    };
    Sync.prototype.insertTableRow = function (tableName, record) {
        var _this = this;
        var table = this.getTableReference(tableName);
        return table.insert(record)
            .then(function (result) {
            _this.pushLocalTablesData().then(function (res) {
                _this.syncLocalTable(tableName);
            });
            return result;
        }, function (error) {
            alert(JSON.stringify(error));
            return error;
        });
    };
    Sync.prototype.updateTableRow = function (tableName, record) {
        var _this = this;
        var table = this.getTableReference(tableName);
        return table.update(record)
            .then(function (result) {
            _this.pushLocalTablesData().then(function (res) {
                _this.syncLocalTable(tableName);
            });
            return result;
        }, function (error) {
            console.log(JSON.stringify(error));
            return error;
        });
    };
    Sync.prototype.deleteTableRow = function (tableName, record) {
        var _this = this;
        var table = this.getTableReference(tableName);
        return table.del(record)
            .then(function (result) {
            _this.pushLocalTablesData().then(function (res) {
                _this.syncLocalTable(tableName);
            });
            return result;
        }, function (error) {
            alert(JSON.stringify(error));
            return error;
        });
    };
    Sync.prototype.onConflict = function (pushError, whoIsMaster) {
        switch (pushError.getAction()) {
            case 'insert':
                return this.handleInsertConflict(pushError);
            case 'update':
                return this.handleUpdateConflict(pushError, whoIsMaster);
            case 'delete':
                return this.handleDeleteConflict(pushError);
        }
        return this.handleError(pushError, 'Unhandled conflict!');
    };
    Sync.prototype.handleInsertConflict = function (pushError) {
        // As the record ID is a GUID, a conflict here means that the client
        // pushed the record to the server in the past but the change was 
        // not removed from the pending operations queue, thus pushing it again.
        // We simply cancel this change from being pushed again.
        return pushError.cancel();
    };
    Sync.prototype.handleUpdateConflict = function (pushError, whoIsMaster) {
        var serverRecord = pushError.getServerRecord(), clientRecord = pushError.getClientRecord(), status = pushError.getError().request.status;
        if (status === 404) {
            // In either case, we cancel the update.
            return pushError.cancelAndDiscard();
        }
        if (serverRecord && clientRecord) {
            // If the client and server records are identical, just ignore
            // the conflict and discard the pending change
            if (serverRecord.deleted === clientRecord.deleted) {
                return pushError.cancelAndDiscard();
            }
            // Involve the user in conflict resolution
            return (function (result) {
                if (whoIsMaster === 'skip') {
                    return;
                }
                if (whoIsMaster === 'server') {
                    return pushError.cancelAndUpdate(serverRecord);
                }
                if (whoIsMaster === 'client') {
                    result = clientRecord;
                }
                else {
                    result.id = serverRecord.id; // The custom value specified by the user need not have ID. We set it explicitly
                }
                result.version = serverRecord.version; // Update the version in the record to match the server version
                return pushError.update(result);
            });
        }
    };
    Sync.prototype.handleDeleteConflict = function (pushError) {
        var status = pushError.getError().request.status, serverRecord = pushError.getServerRecord();
        // If the server record never existed, status code will be 404
        // If the server record has been deleted, the status code could be 404, 409 or 412 based on the scenario
        // The node and .net backends need to be fixed so that the behavior be consistent.
        // For now, we simply check for all possible status codes
        if (status === 404 || status === 409 || (status === 412 && serverRecord.deleted)) {
            return pushError.cancelAndDiscard();
        }
        // server updated, client deleted. so discard client change and update client record as per server value
        if (status === 412 && !serverRecord.deleted) {
            return pushError.changeAction('update', serverRecord);
        }
        return this.handleError(pushError, 'All possible errors were handled. We do not expect to be here ever!');
    };
    Sync.prototype.handleError = function (pushError, message) {
        return pushError.cancelAndDiscard();
    };
    return Sync;
}());
Sync = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service_data_service__["a" /* DataService */]])
], Sync);

//# sourceMappingURL=sync.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_user__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_toast_service__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_camera_provider__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__api_api__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__user_user__["a"]; });
/* unused harmony reexport ToastService */
/* unused harmony reexport CameraProvider */

//import { Items } from '../mocks/providers/items';
//import { Settings } from './settings/settings';




//# sourceMappingURL=providers.js.map

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 122;

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/activity-details/activity-details.module": [
		314,
		12
	],
	"../pages/activity-list/activity-list.module": [
		315,
		11
	],
	"../pages/chat-contacts/chat-contacts.module": [
		316,
		1
	],
	"../pages/chat/chats.module": [
		317,
		0
	],
	"../pages/chat/messages/messages.module": [
		318,
		2
	],
	"../pages/confirm-activity/confirm-activity.module": [
		319,
		10
	],
	"../pages/current-activity/current-activity.module": [
		320,
		9
	],
	"../pages/document-scan/document-scan.module": [
		321,
		8
	],
	"../pages/login/login.module": [
		322,
		7
	],
	"../pages/notifications/notifications.module": [
		323,
		6
	],
	"../pages/picture-upload/picture-upload.module": [
		324,
		5
	],
	"../pages/profile/profile.module": [
		325,
		4
	],
	"../pages/settings/settings.module": [
		326,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 177;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = (function () {
    function Api(http) {
        this.http = http;
        this.url = 'https://gruberapidev.azurewebsites.net';
        this.token = "";
    }
    // Custom method to add standard headers.
    Api.prototype._addStandardHeaders = function (header) {
        header = header.append('Content-Type', 'application/json');
        header = header.append('Accept', 'application/json');
        header = header.append('Access-Control-Allow-Orgin', '*');
        //header = header.append('ZUMO-API-VERSION', '2.0.0');  
        return header;
    };
    // custom method to initialize reqOpts
    Api.prototype._initializeReqOpts = function (reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */](),
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            };
        }
        return reqOpts;
    };
    Api.prototype.get = function (endpoint, params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["d" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.post = function (endpoint, body, reqOpts) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.put = function (endpoint, body, reqOpts) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.delete = function (endpoint, reqOpts) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    return Api;
}());
Api = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
], Api);

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationTracker; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_background_geolocation__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocationTracker = (function () {
    function LocationTracker(backgroundGeolocation, geolocation, sync, dataService) {
        var _this = this;
        this.backgroundGeolocation = backgroundGeolocation;
        this.geolocation = geolocation;
        this.sync = sync;
        this.dataService = dataService;
        this.user = {
            id: "",
            auth_token: ""
        };
        this.dataService.getUserFromLocalStorage().then(function (res) {
            _this.user = res;
        });
    }
    LocationTracker.prototype.saveMobilePosition = function (location) {
        var _this = this;
        var mob_positionsTable = this.sync.getTableReference('mob_positions');
        mob_positionsTable.insert({
            p_dtCreazion: new Date(),
            p_positionLatitude: location.latitude,
            p_positionLongitude: location.longitude,
            p_origin: 'PHONE',
            p_tripId: '',
            p_userId: this.user.id,
            p_accurateSettings: ''
            //p_identity: ''
            //p_identity: location.serviceProvider
        }).then(function (result) {
            _this.sync.pushLocalTablesData();
        }, function (error) {
            alert('error :' + error);
        });
    };
    LocationTracker.prototype.startTracking = function () {
        var _this = this;
        // Get a reference to the plugin.
        var bgGeo = window.BackgroundGeolocation;
        //This callback will be executed every time a geolocation is recorded in the background.
        var callbackFn = function (location) {
            console.log('- Location: ', JSON.stringify(location));
            _this.saveMobilePosition(location);
        };
        // This callback will be executed if a location-error occurs. 
        // Eg: this will be called if user disables location- services.
        var failureFn = function (errorCode) {
            //alert('- BackgroundGeoLocation error: ' + errorCode);
        };
        // Listen to location events & errors.
        bgGeo.on('location', callbackFn, failureFn);
        // Fired whenever state changes from moving->stationary or vice-versa.
        bgGeo.on('motionchange', function (isMoving) {
            console.log('- onMotionChange: ', isMoving);
            //alert('- onMotionChange: ' + isMoving);
        });
        // Fired whenever a geofence transition occurs.
        bgGeo.on('geofence', function (geofence) {
            console.log('- onGeofence: ', geofence.identifier, geofence.location);
        });
        // Fired whenever an HTTP response is received from your server.
        bgGeo.on('http', function (response) {
            console.log('http success: ', response.responseText);
            //alert('http success: ' + response.responseText);
        }, function (response) {
            console.log('http failure: ', response.status);
            //alert('http success: ' + response.responseText);
        });
        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure({
            // Geolocation config
            desiredAccuracy: 0,
            distanceFilter: 10,
            stationaryRadius: 25,
            // Activity Recognition config
            activityRecognitionInterval: 10000,
            stopTimeout: 5,
            // Application config
            debug: true,
            stopOnTerminate: false,
            startOnBoot: true,
            // HTTP / SQLite config
            url: "https://gruberapidev.azurewebsites.net/POST_MobilePositions",
            method: "POST",
            autoSync: true,
            maxDaysToPersist: 3,
            headers: {
                "ZUMO-API-VERSION": "2.0.0",
                "X-ZUMO-AUTH": this.user.auth_token
            },
            params: {}
        }, function (state) {
            // This callback is executed when the plugin is ready to use.
            console.log("BackgroundGeolocation ready: ", state);
            if (!state.enabled) {
                bgGeo.start();
            }
        });
    };
    LocationTracker.prototype.getCurrentLocation = function () {
        var location = {};
        location = {
            latitude: '',
            longitude: '',
            coordinatesOrigin: "GPS",
            coordinatesDatetime: new Date()
        };
        this.geolocation.getCurrentPosition().then(function (pos) {
            location.latitude = pos.coords.latitude;
            location.longitude = pos.coords.longitude;
            location.coordinatesDatetime = new Date();
            return location;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        return location;
    };
    LocationTracker.prototype.stopTracking = function () {
        console.log('stopTracking');
        this.backgroundGeolocation.finish();
    };
    return LocationTracker;
}());
LocationTracker = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_3__sync_sync__["a" /* Sync */],
        __WEBPACK_IMPORTED_MODULE_4__data_service_data_service__["a" /* DataService */]])
], LocationTracker);

//# sourceMappingURL=location-tracker.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoScanService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util_camera_provider__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhotoScanService = (function () {
    function PhotoScanService(loadingCtrl, barcodeScanner, cameraProvider) {
        this.loadingCtrl = loadingCtrl;
        this.barcodeScanner = barcodeScanner;
        this.cameraProvider = cameraProvider;
    }
    PhotoScanService.prototype.scanBarcode = function () {
        var options = {
            preferFrontCamera: false,
            showFlipCameraButton: true,
            showTorchButton: true,
            torchOn: false,
            prompt: 'Place a barcode inside the scan area',
            // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            resultDisplayDuration: 500,
            //formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
            // Android only (portrait|landscape), default unset so it rotates with the device
            orientation: 'portrait',
            disableAnimations: true,
            disableSuccessBeep: false // iOS
        };
        return this.barcodeScanner.scan(options).then(function (barcodeData) {
            return barcodeData;
        }, function (err) {
            return err;
        });
    };
    PhotoScanService.prototype.takePicture = function () {
        var loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromCamera().then(function (picture) {
            loading.dismiss();
            return picture;
        }, function (error) {
            alert(error);
            return error;
        });
    };
    PhotoScanService.prototype.getPicture = function () {
        var loading = this.loadingCtrl.create();
        loading.present();
        return this.cameraProvider.getPictureFromPhotoLibrary().then(function (picture) {
            loading.dismiss();
            return picture;
        }, function (error) {
            alert(error);
            return error;
        });
    };
    return PhotoScanService;
}());
PhotoScanService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_3__providers_util_camera_provider__["a" /* CameraProvider */]])
], PhotoScanService);

//# sourceMappingURL=photo-scan.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MainPage; });
// The page the user lands on after opening the app and without a session
// The page the user lands on after opening the app and without a session
var LoginPage = 'LoginPage';
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
var MainPage = 'ProfilePage';
////// The initial root pages for our tabs (remove if not using tabs)
//export const Tab1Root = 'ProfilePage';
//export const Tab2Root = 'ProfilePage';
//export const Tab3Root = 'ProfilePage';
//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(242);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_util_camera_provider__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_location_tracker_location_tracker__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_geolocation__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngx_translate_http_loader__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_push__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_providers__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__app_component__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_sync_sync__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_data_service_data_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_photo_scan_photo_scan__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import { GoogleMaps } from '@ionic-native/google-maps';








//import { Items } from '../mocks/providers/items';
//import { Settings } from '../providers/providers';






//import { NativeGoogleMapsProvider } from '../providers/native-google-maps/native-google-maps';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_18__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//export function provideSettings(storage: Storage) {
//    /**
//     * The Settings provider takes a set of default settings for your app.
//     *
//     * You can add new settings options at any time. Once the settings are saved,
//     * these values will not overwrite the saved values (this can be done manually if desired).
//     */
//    return new Settings(storage, {
//        option1: true,
//        option2: 'Ionitron J. Framework',
//        option3: '3',
//        option4: 'Hello'
//    });
//}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_19_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/activity-details/activity-details.module#ActivityDetailsPageModule', name: 'ActivityDetailsPage', segment: 'activity-details', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/activity-list/activity-list.module#ActivityListPageModule', name: 'ActivityListPage', segment: 'activity-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat-contacts/chat-contacts.module#ChatContactsPageModule', name: 'ChatContactsPage', segment: 'chat-contacts', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat/chats.module#ChatsPageModule', name: 'ChatsPage', segment: 'chats', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/chat/messages/messages.module#MessagesPageModule', name: 'MessagesPage', segment: 'messages', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/confirm-activity/confirm-activity.module#ConfirmActivityPageModule', name: 'ConfirmActivityPage', segment: 'confirm-activity', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/current-activity/current-activity.module#CurrentActivityPageModule', name: 'CurrentActivityPage', segment: 'current-activity', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/document-scan/document-scan.module#DocumentScanPageModule', name: 'DocumentScanPage', segment: 'document-scan', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/notifications/notifications.module#NotificationsPageModule', name: 'NotificationsListPage', segment: 'notifications', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/picture-upload/picture-upload.module#PictureUploadPageModule', name: 'PictureUploadPage', segment: 'picture-upload', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_19_ionic_angular__["f" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_22__app_component__["a" /* MyApp */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_17__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__providers_location_tracker_location_tracker__["a" /* LocationTracker */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_geolocation__["a" /* BackgroundGeolocation */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_21__providers_providers__["a" /* Api */],
            __WEBPACK_IMPORTED_MODULE_21__providers_providers__["b" /* User */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__providers_util_camera_provider__["a" /* CameraProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_23__providers_sync_sync__["a" /* Sync */],
            __WEBPACK_IMPORTED_MODULE_24__providers_data_service_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_25__providers_photo_scan_photo_scan__["a" /* PhotoScanService */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_push__["a" /* Push */],
            //{ provide: Settings, useFactory: provideSettings, deps: [Storage] },
            // Keep this to enable Ionic's runtime error handling during development
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_19_ionic_angular__["g" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_api__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
var User = (function () {
    function User(api) {
        this.api = api;
    }
    /**
    * Send a POST request to our Login/Register and Verify user endpoint with the data
    * the user entered on the form.
    */
    User.prototype.authenticate = function (accountInfo) {
        var seq = this.api.post('Mobile_authentication?ZUMO-API-VERSION=2.0.0', accountInfo).share();
        seq.subscribe(function (res) {
            //// If the API returned a successful response, mark the user as logged in
            //if (res.status == 'success') {
            //    this._user = res.user;
            //}
        }, function (err) {
            console.error('ERROR', err);
        });
        return seq;
    };
    /**
     * Log the user out, which forgets the session
     */
    User.prototype.logout = function () {
        this._user = null;
    };
    /**
     * Process a login/signup response to store user data
     */
    User.prototype._loggedIn = function (resp) {
        this._user = resp.user;
    };
    return User;
}());
User = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_api__["a" /* Api */]])
], User);

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ToastService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ToastService = (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastService.prototype.create = function (message, ok, duration) {
        if (ok === void 0) { ok = false; }
        if (duration === void 0) { duration = 2000; }
        if (this.toast) {
            this.toast.dismiss();
        }
        this.toast = this.toastCtrl.create({
            message: message,
            duration: ok ? null : duration,
            position: 'bottom',
            showCloseButton: ok,
            closeButtonText: 'OK'
        });
        this.toast.present();
    };
    return ToastService;
}());
ToastService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ToastController */]])
], ToastService);

//# sourceMappingURL=toast.service.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_pages__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_data_service_data_service__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { Settings } from '../providers/providers';

var MyApp = (function () {
    function MyApp(translate, platform, config, statusBar, splashScreen, backgroundMode, toastCtrl, loadingCtrl, dataService, events) {
        var _this = this;
        this.translate = translate;
        this.platform = platform;
        this.config = config;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.backgroundMode = backgroundMode;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.dataService = dataService;
        this.events = events;
        this.pages = [
            { title: 'LoginPage', component: 'LoginPage' },
            { title: 'ProfilePage', component: 'ProfilePage' }
        ];
        this.initTranslate();
        if (!this.isInstantiated) {
            platform.ready().then(function () {
                //To Enable Backgroud mode for prevent to close app.
                if (!_this.backgroundMode.isActive()) {
                    _this.backgroundMode.enable();
                    //this.backgroundMode.excludeFromTaskList();
                    _this.backgroundMode.disableWebViewOptimizations();
                }
                _this.isInstantiated = true;
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                //this.statusBar.styleDefault();
                _this.statusBar.backgroundColorByHexString('#077f7f');
                //back button handle
                //Registration of push in Android and Windows Phone
                var lastTimeBackPress = 0;
                var timePeriodToExit = 2000;
                platform.registerBackButtonAction(function () {
                    // get current active page
                    var view = _this.nav.getActive();
                    if (view.component.name == "ProfilePage" || view.component.name == "LoginPage") {
                        //Double check to exit app
                        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                            //this.platform.exitApp(); //Exit from app    
                            _this.backgroundMode.overrideBackButton();
                        }
                        else {
                            var toast = _this.toastCtrl.create({
                                message: 'Press back again to exit app?',
                                duration: 3000,
                                position: 'bottom'
                            });
                            toast.present();
                            lastTimeBackPress = new Date().getTime();
                        }
                    }
                    else {
                        // go to previous page
                        _this.nav.pop({});
                    }
                });
                _this.dataService.getUser().then(function (user) {
                    if (user != null && user.id != null) {
                        //this.dataService.getUserFromLocalStorage().then((user) => {
                        //    console.log('local storage: ', user);
                        //});
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_pages__["b" /* MainPage */];
                        _this.splashScreen.hide();
                        //// Set in local storage for get or set user data.
                        //this.dataService.setUserInLocalStorage(user).then(() => {
                        //    //this.nav.setRoot('ProfilePage', { isFirstTimeLogin: false }, { animate: true, direction: 'forward' });
                        //});
                    }
                    else {
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_pages__["a" /* LoginPage */];
                        _this.splashScreen.hide();
                    }
                });
            });
        }
    }
    MyApp.prototype.ionViewDidLoad = function () {
    };
    MyApp.prototype.initTranslate = function () {
        // Set the default language for translation strings, and the current language.
        var _this = this;
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.dataService.getUser().then(function (response) {
            if (response != null && response.u_language != null && response.u_language != "") {
                _this.translate.setDefaultLang(response.u_language); // Set your language here
                _this.translate.use(response.u_language); // Set your language here
            }
        });
        this.events.subscribe('changeUserLanguage', function (langId) {
            _this.translate.setDefaultLang(langId);
            _this.translate.use(langId);
        });
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "<ion-nav #content [root]=\"rootPage\"></ion-nav>"
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["c" /* Config */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_background_mode__["a" /* BackgroundMode */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_7__providers_data_service_data_service__["a" /* DataService */],
        __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Events */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = (function () {
    function DataService(sqlite, storage) {
        var _this = this;
        this.sqlite = sqlite;
        this.storage = storage;
        this.sDBName = 'gruber.db';
        this.execSqlCustom = function (sqlToExecute, bracketValues) {
            return _this.sqlite.create({
                name: _this.sDBName,
                location: 'default'
            }).then(function (db) {
                return db.executeSql(sqlToExecute, bracketValues)
                    .then(function (res) {
                    var data = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        data.push(res.rows.item(i));
                    }
                    return data;
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { return console.log(e); });
        };
    }
    DataService.prototype.getMob_UserSettings = function () {
        var query = "SELECT * FROM mob_userSettings WHERE deleted=0";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_notifications = function (Id) {
        var query = "SELECT * FROM mob_notifications WHERE deleted=0 AND m_objectKey=? ORDER BY n_notificationRead ASC";
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_dispatchers = function () {
        var query = "SELECT * FROM mob_dispatchers WHERE deleted=0 ORDER BY dp_name ASC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_messages = function () {
        var query = "SELECT * FROM Mob_messages WHERE deleted=0 ORDER BY rowid DESC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_messagesByDp_id = function (dp_id, m_objectKey) {
        var query = "SELECT * FROM Mob_messages WHERE deleted=0 AND dp_id =? AND m_objectKey=? LIMIT 1";
        return this.execSqlCustom(query, [dp_id, m_objectKey]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_messagesByObjectKey = function (m_objectKey) {
        var query = "SELECT * FROM Mob_messages WHERE deleted=0 AND m_objectKey =?";
        return this.execSqlCustom(query, [m_objectKey]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getChatsByDp_id = function (dp_id) {
        var query = "Select *, " +
            "     ifnull( " +
            "         (SELECT dp_name FROM mob_dispatchers WHERE  Deleted = 0 AND Mob_messages.m_objectType = 'User' AND mob_dispatchers.Id = Mob_messages.m_objectKey LIMIT 1) " +
            "     , " +
            "     (SELECT cast(Mob_trip.t_company AS text) || '-' || cast(Mob_trip.t_number AS text) || '/' || " +
            "         cast(Mob_trip.t_branch  AS text) || '/' || cast(Mob_trip.t_year  AS text) FROM Mob_trip WHERE  Deleted = 0 AND Mob_messages.m_objectType = 'Trip' AND Mob_trip.Id = Mob_messages.m_objectKey LIMIT 1)  " +
            " ) as dispatcherName, " +
            "     (SELECT ms_message FROM Mob_messagesTexts WHERE Deleted = 0 AND Mob_messagesTexts.ms_messageId = Mob_messages.Id " +
            " ORDER BY ms_dtcreation DESC LIMIT 1) as lastMessage, " +
            "     (SELECT ms_dtcreation FROM Mob_messagesTexts WHERE Deleted = 0 AND Mob_messagesTexts.ms_messageId = Mob_messages.Id " +
            " ORDER BY ms_dtcreation DESC LIMIT 1) as lastDate " +
            " from Mob_messages AS Mob_messages  " +
            " WHERE Mob_messages.deleted = 0 " +
            " AND Mob_messages.dp_id = ?";
        return this.execSqlCustom(query, [dp_id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_messagesTextsByMessageId = function (MessageId) {
        var query = 'SELECT Mob_messagesTexts.id,Mob_messagesTexts.ms_message,Mob_messagesTexts.ms_sender,' +
            ' Mob_messagesTexts.ms_dtcreation, Mob_messagesTexts.ms_messageId, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId ' +
            ' FROM Mob_messagesTexts ' +
            ' LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId ' +
            ' WHERE Mob_messagesTexts.deleted = 0 AND Mob_messagesTexts.ms_messageId =? ' +
            ' ORDER BY Mob_messagesTexts.ms_dtcreation ASC';
        //, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId
        //Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //
        return this.execSqlCustom(query, [MessageId]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_messagesTextsByMessageIdAndDatetime = function (MessageId, ms_dtcreation) {
        var query = 'SELECT Mob_messagesTexts.id,Mob_messagesTexts.ms_message,Mob_messagesTexts.ms_sender,' +
            ' Mob_messagesTexts.ms_dtcreation, Mob_messagesTexts.ms_messageId, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId ' +
            ' FROM Mob_messagesTexts LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId' +
            ' WHERE Mob_messagesTexts.deleted = 0 AND Mob_messagesTexts.ms_messageId =? AND Mob_messagesTexts.ms_dtcreation > ? ' +
            ' ORDER BY Mob_messagesTexts.ms_dtcreation ASC';
        //
        //LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId
        //Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //
        return this.execSqlCustom(query, [MessageId, ms_dtcreation]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_dispatchersById = function (Id) {
        var query = 'SELECT * FROM mob_dispatchers WHERE deleted=0 AND Id=?';
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_trips = function () {
        var query = "SELECT * FROM Mob_trip WHERE deleted=0 ORDER BY rowid DESC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getCurrentActivityDetails = function () {
        //let query: string = "Select " +
        //    "     Mob_Trip.Id AS t_tripId, Mob_Trip.t_company, Mob_Trip.t_year, Mob_Trip.t_branch, Mob_Trip.t_number, Mob_Trip.t_dispatcher, Mob_Trip.t_userID, Mob_Trip.t_plateTruck," +
        //    "     Mob_Trip.t_plateTrailer, Mob_Trip.t_aggregationGroup, Mob_Trip.t_bookingNr, Mob_Trip.t_dtFirstLoading, Mob_Trip.t_dtLastUnloading," +
        //    "     Mob_tripTimeLine.Id AS Id,Mob_tripTimeLine.tl_sequence, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_activityId, Mob_tripTimeLine.tl_orderId," +
        //    "     Mob_tripTimeLine.tl_orderStop, Mob_tripTimeLine.tl_longitude, Mob_tripTimeLine.tl_latitude, Mob_tripTimeLine.tl_placeDescription, Mob_tripTimeLine.tl_placeAddress," +
        //    "     Mob_tripTimeLine.tl_placeZip, Mob_tripTimeLine.tl_placeCity, Mob_tripTimeLine.tl_placeNation, Mob_tripTimeLine.tl_notes, Mob_tripTimeLine.tl_dtInsert, Mob_tripTimeLine.tl_externalKey," +
        //    "     Mob_activity.Id AS activityId, Mob_activity.a_description, Mob_activity.a_activityGroup, Mob_activity.a_nextActivity, Mob_activity.a_nextActivityDeltaSeconds, Mob_activity.a_permitsManualDate," +
        //    "     Mob_activity.a_icon, Mob_activity.a_isFoto, Mob_activity.a_documentTypeId," +
        //    "     '' AS t_FirstLoadingPlace, '' AS t_LastUnLoadingPlace,Mob_dispatchers.dp_phone " +
        //    " from Mob_Trip " +
        //    " INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_Trip.Id" +
        //    " INNER JOIN Mob_activity ON Mob_tripTimeLine.tl_activityId = Mob_activity.Id" +
        //    " LEFT JOIN Mob_dispatchers ON Mob_dispatchers.Id = Mob_Trip.t_dispatcher"
        //    " Where  Mob_Trip.deleted = 0" +
        //    //" AND Mob_tripTimeLine.tl_sequence = 0" +
        //    " AND Mob_tripTimeLine.tl_dtInsert IS NULL " +
        //    " ORDER BY Mob_tripTimeLine.tl_sequence ASC LIMIT 1";
        var query = "SELECT Mob_Trip.Id AS t_tripId, Mob_Trip.t_company, Mob_Trip.t_year, Mob_Trip.t_branch, Mob_Trip.t_number, Mob_Trip.t_dispatcher, Mob_Trip.t_userID, Mob_Trip.t_plateTruck," +
            "     Mob_Trip.t_plateTrailer, Mob_Trip.t_aggregationGroup, Mob_Trip.t_bookingNr, Mob_Trip.t_dtFirstLoading, Mob_Trip.t_dtLastUnloading," +
            "     Mob_tripTimeLine.Id AS Id,Mob_tripTimeLine.tl_sequence, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_activityId, Mob_tripTimeLine.tl_orderId," +
            "     Mob_tripTimeLine.tl_orderStop, Mob_tripTimeLine.tl_longitude, Mob_tripTimeLine.tl_latitude, Mob_tripTimeLine.tl_placeDescription, Mob_tripTimeLine.tl_placeAddress," +
            "     Mob_tripTimeLine.tl_placeZip, Mob_tripTimeLine.tl_placeCity, Mob_tripTimeLine.tl_placeNation, Mob_tripTimeLine.tl_notes, Mob_tripTimeLine.tl_dtInsert, Mob_tripTimeLine.tl_externalKey," +
            "     Mob_activity.Id AS activityId, Mob_activity.a_description, Mob_activity.a_activityGroup, Mob_activity.a_nextActivity, Mob_activity.a_nextActivityDeltaSeconds, Mob_activity.a_permitsManualDate," +
            "     Mob_activity.a_icon, Mob_activity.a_isFoto, Mob_activity.a_documentTypeId," +
            "     Mob_Trip.t_FirstLoadingPlace,Mob_Trip.t_LastUnLoadingPlace, " +
            "  (Select dp_phone FROM Mob_dispatchers WHERE Id = Mob_Trip.t_dispatcher LIMIT 1) AS dp_phone " +
            " FROM Mob_trip INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_trip.Id " +
            " INNER JOIN Mob_activity ON Mob_activity.Id = Mob_tripTimeLine.tl_activityId " +
            " WHERE Mob_Trip.deleted = 0 AND Mob_tripTimeLine.tl_dtInsert IS NULL " +
            " ORDER BY Mob_tripTimeLine.tl_sequence ASC LIMIT 1";
        return this.execSqlCustom(query, []).then(function (data) {
            return data[0] || null;
        });
    };
    DataService.prototype.getActiveActivities = function () {
        var query = " Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup,  " +
            " t_bookingNr, t_dtFirstLoading, t_dtLastUnloading, t_mapImage, t_FirstLoadingPlace, t_LastUnLoadingPlace, " +
            "     (CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime IS NULL) > 0 THEN 'OPEN' WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime IS NULL) = 0 THEN 'OK' ELSE '' END) AS DocStatus, " +
            "         Case when (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0 then 'OPEN' " +
            " 	     When((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NOT NULL) > 0  AND  (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0) Then 'ACTIVE' " +
            " 	     WHEN(Select count(Id) from mob_tripDocuments Where td_tripId = Mob_Trip.Id AND td_required = 1 and td_datetime IS NULL) > 0 THEN 'ACTIVE'  " +
            " END AS ActivityStatus  " +
            " from Mob_Trip Where  deleted= 0 " +
            " AND " +
            "     ( " +
            "     (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0 " +
            " OR " +
            "     ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NOT NULL) > 0  AND (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0)  " +
            " OR " +
            "     (Select count(Id) from mob_tripDocuments Where td_tripId = Mob_Trip.Id AND td_required = 1 and td_datetime IS NULL) > 0 " +
            "            ) " +
            " ORDER  BY  t_dtFirstLoading DESC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data || null;
        });
    };
    DataService.prototype.getCompletedActivities = function () {
        var query = "Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup, " +
            " t_bookingNr, t_dtFirstLoading, t_dtLastUnloading, t_mapImage, " +
            "     (CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime IS NULL) > 0 THEN 'OPEN'  " +
            " WHEN(Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime IS NULL) = 0 THEN 'OK'  " +
            " ELSE '' END) AS DocStatus, " +
            "     'COMPLETED' AS ActivityStatus  " +
            " from Mob_Trip Where  deleted= 0 " +
            " AND " +
            "     ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) <= 0) " +
            " AND " +
            "     ((Select count(Id) from mob_tripDocuments Where td_tripId = Mob_Trip.Id AND td_required = 1 and td_datetime IS NULL) <= 0) " +
            " ORDER  BY  t_dtFirstLoading DESC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getActivitiesList = function () {
        var query = "Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup,t_bookingNr,t_dtFirstLoading,t_dtLastUnloading,t_mapImage,(CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) > 0 THEN 'OPEN' WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) = 0 THEN 'OK' ELSE '' END) AS DocStatus," +
            " 'Active' AS [Status] from Mob_Trip Where  deleted= 0 AND ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) > 0" +
            " OR ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective <>  NULL) > 0" +
            " AND (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) > 0 ))" +
            " UNION ALL" +
            " Select Id, t_company, t_year, t_branch, t_number, t_dispatcher, t_userID, t_plateTruck, t_plateTrailer, t_aggregationGroup, t_bookingNr, t_dtFirstLoading, t_dtLastUnloading, t_mapImage, (CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) > 0 THEN 'OPEN' WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) = 0 THEN 'OK' ELSE '' END) AS DocStatus," +
            " 'Completed' AS [Status] from Mob_Trip Where  deleted= 0 AND (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) = 0" +
            " ORDER  BY  t_dtFirstLoading DESC";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getMob_tripById = function (Id) {
        var query = "Select *, " +
            "    (Select dp_phone FROM Mob_dispatchers WHERE Id = Mob_Trip.t_dispatcher LIMIT 1) AS dp_phone, " +
            "    Case " +
            "    When " +
            "        ((Select Count(Id) from Mob_tripTimeLine Where Mob_tripTimeLine.deleted = 0 AND tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0 " +
            "    OR " +
            "        ((Select Count(Id) from Mob_tripTimeLine Where Mob_tripTimeLine.deleted = 0 AND tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective IS NOT NULL) > 0  AND  (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) > 0) " +
            "    OR " +
            "        (Select count(Id) from mob_tripDocuments Where mob_tripDocuments.deleted = 0 AND td_tripId = Mob_Trip.Id AND td_required = 1 and td_datetime IS NULL) > 0  " +
            "    ) THEN 'ACTIVE' " +
            "    WHEN " +
            "        ((Select Count(Id) from Mob_tripTimeLine Where Mob_tripTimeLine.deleted = 0 AND tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective IS NULL) <= 0) " +
            "    AND " +
            "        ((Select count(Id) from mob_tripDocuments Where mob_tripDocuments.deleted = 0 AND td_tripId = Mob_Trip.Id AND td_required = 1 and td_datetime IS NULL) <= 0) " +
            "    THEN 'COMPLETED' " +
            "    ELSE '' " +
            "    END AS activityStatus   " +
            "    from Mob_Trip " +
            "    Where Mob_Trip.deleted = 0 " +
            "    AND Mob_trip.Id = ? " +
            "   ORDER  BY Mob_Trip.t_dtFirstLoading DESC";
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getTripTimeLineByTripId = function (Id) {
        var loadId = "Start Loading";
        var unloadId = "Start unloading";
        var query = "SELECT Mob_trip.Id, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_placeDescription," +
            " Mob_tripTimeLine.tl_placeAddress, Mob_tripTimeLine.tl_placeZip, " +
            " Mob_tripTimeLine.tl_placeCity,Mob_tripTimeLine.tl_placeNation,Mob_tripTimeLine.tl_notes " +
            " FROM Mob_trip " +
            " INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_trip.Id" +
            " INNER JOIN Mob_Activity ON Mob_Activity.Id = Mob_tripTimeLine.tl_activityId" +
            " WHERE Mob_trip.Id = ? AND Mob_Activity.a_description IN ('" + loadId + "','" + unloadId + "')" +
            " ORDER BY tl_sequence";
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getTripGoodsDescriptionByTripId = function (Id) {
        var query = 'SELECT Mob_trip.Id,Mob_tripGoods.tg_description,Mob_tripGoods.tg_quantity,Mob_tripGoods.tg_uom,Mob_tripGoods.tg_width,Mob_tripGoods.tg_height,' +
            ' Mob_tripGoods.tg_length FROM Mob_tripGoods INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripGoods.tg_TripId WHERE Mob_trip.Id =?';
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getTripEventTimeLineByTripId = function (Id) {
        var query = 'SELECT Mob_trip.id,Mob_tripTimeLine.tl_activityId,Mob_tripTimeLine.tl_dtTimeEstimate FROM Mob_tripTimeLine' +
            ' INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripTimeLine.tl_tripId WHERE Mob_trip.Id =?';
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getTripEventTimeLineByTripIdNew = function (tripId) {
        var query = "SELECT  * FROM  (" +
            " SELECT Mob_trip.Id AS t_tripId,Mob_tripTimeLine.Id, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_placeDescription," +
            " Mob_tripTimeLine.tl_placeAddress, Mob_tripTimeLine.tl_placeZip," +
            " Mob_tripTimeLine.tl_placeCity, Mob_tripTimeLine.tl_placeNation, Mob_tripTimeLine.tl_notes," +
            " Mob_activity.a_icon, Mob_activity.a_description," +
            " Mob_tripTimeLine.tl_dtInsert, Mob_tripTimeLine.tl_sequence," +
            " ifnull(Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_dtTimeEstimate) as eventDatetime," +
            " Mob_activity.Id AS activityId, Mob_activity.a_isFoto, Mob_activity.a_permitsManualDate, Mob_activity.a_documentTypeId " +
            " FROM Mob_trip INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_trip.Id" +
            " INNER JOIN Mob_activity ON Mob_activity.Id = Mob_tripTimeLine.tl_activityId" +
            " WHERE Mob_tripTimeLine.tl_dtInsert IS NOT NULL AND Mob_trip.Id = ? ORDER BY Mob_tripTimeLine.tl_sequence ASC " +
            " ) " +
            " UNION ALL " +
            " SELECT * FROM (" +
            " SELECT Mob_trip.Id AS t_tripId,Mob_tripTimeLine.Id, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_placeDescription," +
            " Mob_tripTimeLine.tl_placeAddress, Mob_tripTimeLine.tl_placeZip," +
            " Mob_tripTimeLine.tl_placeCity, Mob_tripTimeLine.tl_placeNation, Mob_tripTimeLine.tl_notes," +
            " Mob_activity.a_icon, Mob_activity.a_description," +
            " Mob_tripTimeLine.tl_dtInsert, Mob_tripTimeLine.tl_sequence," +
            " ifnull(Mob_tripTimeLine.tl_dtTimeEffective, Mob_tripTimeLine.tl_dtTimeEstimate) as eventDatetime, " +
            " Mob_activity.Id AS activityId, Mob_activity.a_isFoto, Mob_activity.a_permitsManualDate, Mob_activity.a_documentTypeId " +
            " FROM Mob_trip INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_trip.Id" +
            " INNER JOIN Mob_activity ON Mob_activity.Id = Mob_tripTimeLine.tl_activityId" +
            " WHERE Mob_tripTimeLine.tl_dtInsert IS NULL AND Mob_trip.Id = ? ORDER BY Mob_tripTimeLine.tl_sequence ASC LIMIT 1" +
            " ) ";
        return this.execSqlCustom(query, [tripId, tripId]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getTripRequestedDocumentByTripId = function (Id) {
        var query = "SELECT Mob_trip.Id AS tripId,Mob_tripDocuments.Id AS tripDocumentsId,Mob_tripDocuments.td_docType, Mob_tripDocuments.td_datetime," +
            " Mob_tripDocuments.td_required, Mob_documentTypes.d_description, Mob_documentTypes.d_barcodeRequired" +
            " FROM Mob_tripDocuments  " +
            " INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripDocuments.td_tripId" +
            " INNER JOIN Mob_documentTypes ON Mob_documentTypes.Id = Mob_tripDocuments.td_docType" +
            " WHERE Mob_trip.Id =? ";
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getDocumentTypesByGroup = function (group) {
        var query = " Select id,d_description,d_group,d_barcodeRequired from Mob_documentTypes" +
            " Where mob_documentTypes.deleted = 0 and (d_group=? OR 'ALL'=?)";
        return this.execSqlCustom(query, [group, group]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getDocumentTypesByTripId = function (tripId, documentTypeId) {
        var query = " Select Mob_tripDocuments.Id AS tripDocumentId,Mob_documentTypes.Id, Mob_documentTypes.d_description, Mob_documentTypes.d_group, Mob_documentTypes.d_barcodeRequired" +
            " from Mob_tripDocuments INNER JOIN Mob_documentTypes ON Mob_tripDocuments.td_docType = Mob_documentTypes.Id" +
            " Where Mob_tripDocuments.deleted = 0 AND Mob_documentTypes.deleted = 0" +
            " AND Mob_tripDocuments.td_tripId =? AND  Mob_documentTypes.Id =? LIMIT 1";
        return this.execSqlCustom(query, [tripId, documentTypeId]).then(function (data) {
            return data[0] || null;
        });
    };
    DataService.prototype.getDocumentTypesByTripIdAndDocumentTypeId = function (tripId, documentTypeId) {
        var query = "Select Mob_tripDocuments.Id AS tripDocumentId,Mob_documentTypes.Id AS documentTypeId, Mob_documentTypes.d_description, Mob_documentTypes.d_group, Mob_documentTypes.d_barcodeRequired from Mob_documentTypes " +
            " LEFT JOIN Mob_tripDocuments ON Mob_documentTypes.Id = Mob_tripDocuments.td_docType " +
            " AND Mob_tripDocuments.td_tripId = ? AND Mob_tripDocuments.Deleted = 0 " +
            " WHERE Mob_documentTypes.Id = ? AND Mob_documentTypes.Deleted = 0 LIMIT 1";
        return this.execSqlCustom(query, [tripId, documentTypeId]).then(function (data) {
            return data[0] || null;
        });
    };
    DataService.prototype.getTripTimeRecordForNewEvent = function (tripId) {
        var query = "Select Maintt.tl_tripId, Maintt.tl_sequence,Maintt.tl_dtTimeEstimate,Maintt.tl_dtTimeEffective,Maintt.tl_activityId, " +
            " Maintt.tl_orderId, Maintt.tl_orderStop, Maintt.tl_longitude, Maintt.tl_latitude, Maintt.tl_placeDescription, Maintt.tl_placeAddress, Maintt.tl_placeZip," +
            "     tl_placeCity, tl_placeNation, tl_notes, tl_dtInsert, tl_externalKey," +
            "     Act.a_description, Act.a_activityGroup, Act.a_nextActivity, Act.a_nextActivityDeltaSeconds, Act.a_permitsManualDate," +
            "     Act.a_isFoto, Act.a_documentTypeId," +
            "     (Maintt.tl_sequence) AS  maxtl_sequence" +
            " from Mob_tripTimeLine AS Maintt " +
            " INNER JOIN Mob_Activity AS Act ON  Maintt.tl_activityId = Act.Id" +
            " Where Maintt.deleted = 0" +
            " AND Maintt.tl_tripId =? " +
            " AND Maintt.tl_dtInsert IS NOT NULL " +
            " Order BY Maintt.tl_sequence DESC LIMIT 1";
        return this.execSqlCustom(query, [tripId]).then(function (data) {
            return data[0] || null;
        });
    };
    DataService.prototype.getMob_activityById = function (Id) {
        var query = "SELECT id,a_description,a_activityGroup,a_nextActivity,a_nextActivityDeltaSeconds,a_permitsManualDate,a_isFoto,a_documentTypeId " +
            " FROM Mob_activity WHERE deleted= 0 AND Id=? LIMIT 1";
        return this.execSqlCustom(query, [Id]).then(function (data) {
            return data[0] || null;
        });
    };
    DataService.prototype.getMobActivityByActivityGroup = function (a_activityGroup) {
        var query = "SELECT id, a_description,a_activityGroup,a_nextActivity,a_nextActivityDeltaSeconds,a_permitsManualDate,a_icon," +
            " a_isFoto,a_documentTypeId FROM Mob_activity WHERE deleted=0 AND a_activityGroup=?";
        return this.execSqlCustom(query, [a_activityGroup]).then(function (data) {
            return data;
        });
    };
    DataService.prototype.getUser = function () {
        var _this = this;
        var query = "SELECT * FROM Mob_user WHERE deleted=0 AND id=?  LIMIT 1";
        return this.storage.get('user').then(function (userdetail) {
            var user = JSON.parse(userdetail);
            var userId = user != null ? user.id : '';
            return _this.execSqlCustom(query, [userId]).then(function (data) {
                if (data != null) {
                    return data[0];
                }
                else {
                    return { id: null, u_language: "en" };
                }
            });
        });
    };
    DataService.prototype.getUserFromLocalStorage = function () {
        var _this = this;
        //// get from local storage for get or set user data.
        return this.storage.ready().then(function () {
            return _this.storage.get('user').then(function (userdetail) {
                return JSON.parse(userdetail);
            });
        });
    };
    DataService.prototype.clearUserData = function () {
        return this.storage.clear();
    };
    DataService.prototype.setUserInLocalStorage = function (user) {
        var _this = this;
        //// get from local storage for get or set user data.
        return this.storage.ready().then(function () {
            return _this.storage.set('user', JSON.stringify(user));
        });
    };
    DataService.prototype.getMob_tripTimeLineTest = function () {
        var query = "SELECT * FROM Mob_tripTimeLine";
        return this.execSqlCustom(query, []).then(function (data) {
            return data;
        });
    };
    return DataService;
}());
DataService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], DataService);

//# sourceMappingURL=data-service.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CameraProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CameraProvider = (function () {
    function CameraProvider(camera) {
        this.camera = camera;
    }
    CameraProvider.prototype.getPictureFromCamera = function () {
        return this.getImage(this.camera.PictureSourceType.CAMERA, false);
    };
    CameraProvider.prototype.getPictureFromPhotoLibrary = function () {
        return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
    };
    // This method takes optional parameters to make it more customizable
    CameraProvider.prototype.getImage = function (pictureSourceType, crop, quality, allowEdit, saveToAlbum) {
        //const options = {
        //    quality,
        //    allowEdit,
        //    destinationType: this.camera.DestinationType.DATA_URL,
        //    sourceType: pictureSourceType,
        //    encodingType: this.camera.EncodingType.JPEG,
        //    saveToPhotoAlbum: saveToAlbum
        //};
        if (crop === void 0) { crop = false; }
        if (quality === void 0) { quality = 50; }
        if (allowEdit === void 0) { allowEdit = false; }
        if (saveToAlbum === void 0) { saveToAlbum = true; }
        var options = {
            quality: quality,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            encodingType: this.camera.EncodingType.JPEG
        };
        // If set to crop, restricts the image to a square of 600 by 600
        if (crop) {
            options['targetWidth'] = 600;
            options['targetHeight'] = 600;
        }
        return this.camera.getPicture(options).then(function (imageData) {
            //const base64Image = 'data:image/png;base64,' + imageData;
            //return base64Image;
            return imageData;
        }, function (error) {
            console.log('CAMERA ERROR -> ' + JSON.stringify(error));
            alert('CAMERA ERROR -> ' + JSON.stringify(error));
        });
    };
    return CameraProvider;
}());
CameraProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */]])
], CameraProvider);

//# sourceMappingURL=camera.provider.js.map

/***/ })

},[225]);
//# sourceMappingURL=main.js.map