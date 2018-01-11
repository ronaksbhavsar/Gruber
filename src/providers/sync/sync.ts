import { Injectable } from '@angular/core';
import { DataService } from '../data-service/data-service';

declare var WindowsAzure: any;
var mobileAppClient, // Connection to the Azure Mobile App backend
    store,  // Sqlite store to use for offline data sync
    syncContext // Offline data sync context

// Set useOfflineSync to true to use tables from local store.
// Set useOfflineSync to false to use tables on the server.
var useOfflineSync: boolean = true;

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
            'p_accurateSettings': 'string',//'p_identity': 'string',            
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

@Injectable()
export class Sync {
    userId: string = "";

    constructor(public dataService: DataService) {

    }

    /**
      This function is use for the sync all relevant data of registered user with local sqlite database.
      ** Call this function only if device is ready..
    */
    initializeTables() {

        //mobileAppClient = new WindowsAzure.MobileServiceClient("http://192.168.4.142:8089");
        mobileAppClient = new WindowsAzure.MobileServiceClient("https://gruberapidev.azurewebsites.net");

        return this.dataService.getUserFromLocalStorage().then((res) => {
            console.log('local user data: ', res);
            this.userId = res.id;

            mobileAppClient.currentUser = {
                userId: this.userId,
                mobileServiceAuthenticationToken: res.auth_token.toString()
            };
            return this.initializeStore();
        });
    }

    /**
    * Initialize local tables.
    */
    initializeStore() {

        // Create the sqlite store
        store = new WindowsAzure.MobileServiceSqliteStore('gruber.db');
        console.log('initializing store');
        // Define the table schema
        return this.initTableWithSync(tables.mob_activity.tblname, tables.mob_activity.tbldefinition)
            .then((result) => {
                return this.initTableWithSync(tables.mob_dispatchers.tblname, tables.mob_dispatchers.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_documentTypes.tblname, tables.mob_documentTypes.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_messages.tblname, tables.mob_messages.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_messagesTexts.tblname, tables.mob_messagesTexts.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_messagesTextsRead.tblname, tables.mob_messagesTextsRead.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_notifications.tblname, tables.mob_notifications.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_orders.tblname, tables.mob_orders.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_positions.tblname, tables.mob_positions.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_sharedAuthorization.tblname, tables.mob_sharedAuthorization.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_trip.tblname, tables.mob_trip.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_tripDocuments.tblname, tables.mob_tripDocuments.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_tripDocumentsImages.tblname, tables.mob_tripDocumentsImages.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_tripGoods.tblname, tables.mob_tripGoods.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_tripTimeLine.tblname, tables.mob_tripTimeLine.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_events.tblname, tables.mob_events.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_user.tblname, tables.mob_user.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_userRegistrations.tblname, tables.mob_userRegistrations.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_userSettings.tblname, tables.mob_userSettings.tbldefinition);
            })
            .then((result) => {
                return this.initTableWithSync(tables.mob_userCompany.tblname, tables.mob_userCompany.tbldefinition);
            })
            .then(function () {
                return true;
            });
    }

    /**
    * Initialize local table with sync to pull or push data from server.    
    */
    initTableWithSync(tableName, tableDefinition) {

        console.log('initializing table', tableName);

        return store.defineTable({
            name: tableName, // tableName
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
    }

    /**
    * Synchronize local table with the table on the server.
    * We do this by pushing local changes to the server and then
    * pulling the latest changes from the server.
    */
    syncLocalTable(syncTableName) {
        console.log('sync local table', syncTableName);

        //#101 - Incremental Sync
        return syncContext.pull(new WindowsAzure.Query(syncTableName), syncTableName + "_FULL");
    }

    /**
   * Push local table data to table on the server.
    It will not pull data from the server and sync with local tables..
   */
    pushLocalTablesData() {
        console.log('push local tables to server');
        return syncContext.push();
    }

    /**
    * Sync all tables of local database table
    */
    syncAllLocalTables() {
        // sync all tables
        console.log('sync all tables');
        //alert('sync complete');
        return this.initializeTables().then((res) => {
            return this.pushLocalTablesData();
        })
            .then((result) => {
                return this.syncLocalTable(tables.mob_activity.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_dispatchers.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_documentTypes.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messages.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTexts.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_notifications.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_orders.tblname);
            })
            //.then((result) => { 
            //// no need to get data from this table. One side - APP -> Azure
            //    return this.syncLocalTable(tables.mob_positions.tblname);
            //})
            .then((result) => {
                return this.syncLocalTable(tables.mob_sharedAuthorization.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_trip.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripDocuments.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripDocumentsImages.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripGoods.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripTimeLine.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_user.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_userCompany.tblname);
            })
            //.then((result) => {
            //    return this.syncLocalTable(tables.mob_userRegistrations.tblname);
            //})
            .then((result) => {
                return this.syncLocalTable(tables.mob_userSettings.tblname);
            });

    }

    syncMessageRelatedLocalTables() {
        // sync all tables
        return this.initializeTables().then((res) => {
            return this.pushLocalTablesData();
        })
            .then((result) => {
                return this.syncLocalTable(tables.mob_dispatchers.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messages.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTexts.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_notifications.tblname);
            });
    }

    syncMessageTextsRelatedLocalTables() {
        return this.pushLocalTablesData()
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTexts.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_messagesTextsRead.tblname);
            })
    }

    syncTripRelatedLocalTables() {
        // sync all tables
        return this.initializeTables().then((res) => {
            return this.pushLocalTablesData();
        })
            .then((result) => {
                return this.syncLocalTable(tables.mob_activity.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_documentTypes.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_orders.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_trip.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripDocuments.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripDocumentsImages.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripGoods.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_tripTimeLine.tblname);
            });
    }

    syncUserRelatedLocalTables() {
        // sync all tables
        return this.pushLocalTablesData()
            .then((result) => {
                return this.syncLocalTable(tables.mob_sharedAuthorization.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_user.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_userCompany.tblname);
            })
            .then((result) => {
                return this.syncLocalTable(tables.mob_userSettings.tblname);
            });
    }

    getTableData(tableName, filterParams?: any) {
        var tableData;
        if (filterParams) {
            filterParams.deleted = false;
        } else {
            filterParams = { deleted: false };
        }

        // Create a table reference
        if (useOfflineSync) {
            tableData = mobileAppClient.getSyncTable(tableName);
        } else {
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

        }
        return tableData
            .where(filterParams)
            .read()                         // Read the results
            .then((data) => {
                //alert(tableName + ' offline : ' + data.length);
                return data;
            });
    }

    getTableReference(tableName) {
        // Create a table reference
        if (useOfflineSync) {
            return mobileAppClient.getSyncTable(tableName);
        } else {
            return mobileAppClient.getTable(tableName);
        }
    }

    insertTableRow(tableName, record) {
        var table = this.getTableReference(tableName);
        return table.insert(record)
            .then((result) => {
                this.pushLocalTablesData().then((res) => {
                    this.syncLocalTable(tableName);
                });
                return result;
            }, (error) => {
                alert(JSON.stringify(error));
                return error;
            });
    }

    updateTableRow(tableName, record) {
        var table = this.getTableReference(tableName);
        return table.update(record)
            .then((result) => {
                this.pushLocalTablesData().then((res) => {
                    this.syncLocalTable(tableName);
                });
                return result;
            }, (error) => {
                console.log(JSON.stringify(error));
                return error;
            });
    }

    deleteTableRow(tableName, record) {
        var table = this.getTableReference(tableName);
        return table.del(record)
            .then((result) => {
                this.pushLocalTablesData().then((res) => {
                    this.syncLocalTable(tableName);
                });
                return result;
            }, (error) => {
                alert(JSON.stringify(error));
                return error;
            });
    }

    onConflict(pushError, whoIsMaster) {

        switch (pushError.getAction()) {
            case 'insert':
                return this.handleInsertConflict(pushError);
            case 'update':
                return this.handleUpdateConflict(pushError, whoIsMaster);
            case 'delete':
                return this.handleDeleteConflict(pushError);
        }

        return this.handleError(pushError, 'Unhandled conflict!')
    }

    handleInsertConflict(pushError) {
        // As the record ID is a GUID, a conflict here means that the client
        // pushed the record to the server in the past but the change was 
        // not removed from the pending operations queue, thus pushing it again.
        // We simply cancel this change from being pushed again.
        return pushError.cancel();
    }

    handleUpdateConflict(pushError, whoIsMaster) {
        var serverRecord = pushError.getServerRecord(),
            clientRecord = pushError.getClientRecord(),
            status = pushError.getError().request.status;

        if (status === 404) { // Either the server record never existed or has been deleted
            // In either case, we cancel the update.
            return pushError.cancelAndDiscard();
        }

        if (serverRecord && clientRecord) { // Server and client have conflicting changes to the record

            // If the client and server records are identical, just ignore
            // the conflict and discard the pending change
            if (serverRecord.deleted === clientRecord.deleted) {
                return pushError.cancelAndDiscard();
            }

            // Involve the user in conflict resolution
            return (function (result) {
                if (whoIsMaster === 'skip') { // skip resolving this conflict
                    return;
                }

                if (whoIsMaster === 'server') { // use the server value to resolve the conflict
                    return pushError.cancelAndUpdate(serverRecord);
                }

                if (whoIsMaster === 'client') { // use the client value to resolve the conflict
                    result = clientRecord;
                } else { // if result is not one of 'server', 'client', 'skip', we assume the user has provided a custom value for the record
                    result.id = serverRecord.id; // The custom value specified by the user need not have ID. We set it explicitly
                }

                result.version = serverRecord.version; // Update the version in the record to match the server version
                return pushError.update(result);
            });
        }
    }

    handleDeleteConflict(pushError) {

        var status = pushError.getError().request.status,
            serverRecord = pushError.getServerRecord();

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
    }

    handleError(pushError, message) {
        return pushError.cancelAndDiscard();
    }

}
