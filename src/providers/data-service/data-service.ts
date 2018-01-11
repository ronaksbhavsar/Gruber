import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Promise } from 'es6-promise';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataService {
    private sDBName: string = 'gruber.db';

    constructor(private sqlite: SQLite, public storage: Storage) {

    }

    getMob_UserSettings() {
        let query: string = "SELECT * FROM mob_userSettings WHERE deleted=0";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getMob_notifications(Id: string) {
        let query: string = "SELECT * FROM mob_notifications WHERE deleted=0 AND m_objectKey=? ORDER BY n_notificationRead ASC";
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getMob_dispatchers() {
        let query: string = "SELECT * FROM mob_dispatchers WHERE deleted=0 ORDER BY dp_name ASC";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getMob_messages() {
        let query: string = "SELECT * FROM Mob_messages WHERE deleted=0 ORDER BY rowid DESC";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getMob_messagesByDp_id(dp_id: string, m_objectKey: string) {
        let query: string = "SELECT * FROM Mob_messages WHERE deleted=0 AND dp_id =? AND m_objectKey=? LIMIT 1";
        return this.execSqlCustom(query, [dp_id, m_objectKey]).then((data) => {
            return data;
        });
    }

    getMob_messagesByObjectKey(m_objectKey: string) {
        let query: string = "SELECT * FROM Mob_messages WHERE deleted=0 AND m_objectKey =?";
        return this.execSqlCustom(query, [m_objectKey]).then((data) => {
            return data;
        });
    }

    getChatsByDp_id(dp_id: string) {
        let query: string = "Select *, " +
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
        return this.execSqlCustom(query, [dp_id]).then((data) => {
            return data;
        });
    }

    getMob_messagesTextsByMessageId(MessageId: string) {
        let query: string = 'SELECT Mob_messagesTexts.id,Mob_messagesTexts.ms_message,Mob_messagesTexts.ms_sender,' +
            ' Mob_messagesTexts.ms_dtcreation, Mob_messagesTexts.ms_messageId, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId ' +
            ' FROM Mob_messagesTexts ' +
            ' LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId ' +
            ' WHERE Mob_messagesTexts.deleted = 0 AND Mob_messagesTexts.ms_messageId =? ' +
            ' ORDER BY Mob_messagesTexts.ms_dtcreation ASC';

        //, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId
        //Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //
        return this.execSqlCustom(query, [MessageId]).then((data) => {
            return data;
        });
    }

    getMob_messagesTextsByMessageIdAndDatetime(MessageId: string, ms_dtcreation: Date) {
        let query: string = 'SELECT Mob_messagesTexts.id,Mob_messagesTexts.ms_message,Mob_messagesTexts.ms_sender,' +
            ' Mob_messagesTexts.ms_dtcreation, Mob_messagesTexts.ms_messageId, Mob_messagesTextsRead.Id as Mob_messagesTextsReadId ' +
            ' FROM Mob_messagesTexts LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId' +
            ' WHERE Mob_messagesTexts.deleted = 0 AND Mob_messagesTexts.ms_messageId =? AND Mob_messagesTexts.ms_dtcreation > ? ' +
            ' ORDER BY Mob_messagesTexts.ms_dtcreation ASC';

        //
        //LEFT JOIN Mob_messagesTextsRead ON Mob_messagesTexts.Id = Mob_messagesTextsRead.ms_messageTextId
        //Mob_messagesTextsRead.Id as Mob_messagesTextsReadId
        //
        return this.execSqlCustom(query, [MessageId, ms_dtcreation]).then((data) => {
            return data;
        });
    }

    getMob_dispatchersById(Id: string) {
        let query: string = 'SELECT * FROM mob_dispatchers WHERE deleted=0 AND Id=?';
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getMob_trips() {
        let query: string = "SELECT * FROM Mob_trip WHERE deleted=0 ORDER BY rowid DESC";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getCurrentActivityDetails() {
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

        let query: string = "SELECT Mob_Trip.Id AS t_tripId, Mob_Trip.t_company, Mob_Trip.t_year, Mob_Trip.t_branch, Mob_Trip.t_number, Mob_Trip.t_dispatcher, Mob_Trip.t_userID, Mob_Trip.t_plateTruck," +
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
            " ORDER BY Mob_tripTimeLine.tl_sequence ASC LIMIT 1"
        return this.execSqlCustom(query, []).then((data) => {
            return data[0] || null;
        });
    }

    getActiveActivities() {
        let query: string = " Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup,  " +
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
        return this.execSqlCustom(query, []).then((data) => {
            return data || null;
        });
    }

    getCompletedActivities() {
        let query: string = "Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup, " +
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
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getActivitiesList() {
        let query: string = "Select Id,t_company,t_year,t_branch,t_number,t_dispatcher,t_userID,t_plateTruck,t_plateTrailer,t_aggregationGroup,t_bookingNr,t_dtFirstLoading,t_dtLastUnloading,t_mapImage,(CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) > 0 THEN 'OPEN' WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) = 0 THEN 'OK' ELSE '' END) AS DocStatus," +
            " 'Active' AS [Status] from Mob_Trip Where  deleted= 0 AND ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) > 0" +
            " OR ((Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective <>  NULL) > 0" +
            " AND (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_sequence = 0 AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) > 0 ))" +
            " UNION ALL" +
            " Select Id, t_company, t_year, t_branch, t_number, t_dispatcher, t_userID, t_plateTruck, t_plateTrailer, t_aggregationGroup, t_bookingNr, t_dtFirstLoading, t_dtLastUnloading, t_mapImage, (CASE WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) > 0 THEN 'OPEN' WHEN (Select count(Id) from mob_tripDocuments Where td_required = 1 and td_datetime = NULL) = 0 THEN 'OK' ELSE '' END) AS DocStatus," +
            " 'Completed' AS [Status] from Mob_Trip Where  deleted= 0 AND (Select Count(Id) from Mob_tripTimeLine Where tl_tripId = Mob_Trip.Id AND Mob_tripTimeLine.tl_dtTimeEffective = NULL) = 0" +
            " ORDER  BY  t_dtFirstLoading DESC";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });
    }

    getMob_tripById(Id: string) {
        let query: string = "Select *, " +
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

        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getTripTimeLineByTripId(Id: string) {
        let loadId = "Start Loading";
        let unloadId = "Start unloading";

        let query: string = "SELECT Mob_trip.Id, Mob_tripTimeLine.tl_dtTimeEstimate, Mob_tripTimeLine.tl_placeDescription," +
            " Mob_tripTimeLine.tl_placeAddress, Mob_tripTimeLine.tl_placeZip, " +
            " Mob_tripTimeLine.tl_placeCity,Mob_tripTimeLine.tl_placeNation,Mob_tripTimeLine.tl_notes " +
            " FROM Mob_trip " +
            " INNER JOIN Mob_tripTimeLine ON Mob_tripTimeLine.tl_tripId = Mob_trip.Id" +
            " INNER JOIN Mob_Activity ON Mob_Activity.Id = Mob_tripTimeLine.tl_activityId" +
            " WHERE Mob_trip.Id = ? AND Mob_Activity.a_description IN ('" + loadId + "','" + unloadId + "')" +
            " ORDER BY tl_sequence";
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getTripGoodsDescriptionByTripId(Id: string) {
        let query: string = 'SELECT Mob_trip.Id,Mob_tripGoods.tg_description,Mob_tripGoods.tg_quantity,Mob_tripGoods.tg_uom,Mob_tripGoods.tg_width,Mob_tripGoods.tg_height,' +
            ' Mob_tripGoods.tg_length FROM Mob_tripGoods INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripGoods.tg_TripId WHERE Mob_trip.Id =?';
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getTripEventTimeLineByTripId(Id: string) {
        let query: string = 'SELECT Mob_trip.id,Mob_tripTimeLine.tl_activityId,Mob_tripTimeLine.tl_dtTimeEstimate FROM Mob_tripTimeLine' +
            ' INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripTimeLine.tl_tripId WHERE Mob_trip.Id =?';
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getTripEventTimeLineByTripIdNew(tripId: string) {

        let query: string = "SELECT  * FROM  (" +
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
        return this.execSqlCustom(query, [tripId, tripId]).then((data) => {
            return data;
        });
    }

    getTripRequestedDocumentByTripId(Id: string) {
        let query: string = "SELECT Mob_trip.Id AS tripId,Mob_tripDocuments.Id AS tripDocumentsId,Mob_tripDocuments.td_docType, Mob_tripDocuments.td_datetime," +
            " Mob_tripDocuments.td_required, Mob_documentTypes.d_description, Mob_documentTypes.d_barcodeRequired" +
            " FROM Mob_tripDocuments  " +
            " INNER JOIN Mob_trip ON Mob_trip.Id = Mob_tripDocuments.td_tripId" +
            " INNER JOIN Mob_documentTypes ON Mob_documentTypes.Id = Mob_tripDocuments.td_docType" +
            " WHERE Mob_trip.Id =? ";
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data;
        });
    }

    getDocumentTypesByGroup(group: string) {
        let query: string = " Select id,d_description,d_group,d_barcodeRequired from Mob_documentTypes" +
            " Where mob_documentTypes.deleted = 0 and (d_group=? OR 'ALL'=?)";
        return this.execSqlCustom(query, [group, group]).then((data) => {
            return data;
        });
    }

    getDocumentTypesByTripId(tripId: string, documentTypeId: string) {
        let query: string = " Select Mob_tripDocuments.Id AS tripDocumentId,Mob_documentTypes.Id, Mob_documentTypes.d_description, Mob_documentTypes.d_group, Mob_documentTypes.d_barcodeRequired" +
            " from Mob_tripDocuments INNER JOIN Mob_documentTypes ON Mob_tripDocuments.td_docType = Mob_documentTypes.Id" +
            " Where Mob_tripDocuments.deleted = 0 AND Mob_documentTypes.deleted = 0" +
            " AND Mob_tripDocuments.td_tripId =? AND  Mob_documentTypes.Id =? LIMIT 1";
        return this.execSqlCustom(query, [tripId, documentTypeId]).then((data) => {
            return data[0] || null;
        });
    }

    getDocumentTypesByTripIdAndDocumentTypeId(tripId: string, documentTypeId: string) {
        let query: string = "Select Mob_tripDocuments.Id AS tripDocumentId,Mob_documentTypes.Id AS documentTypeId, Mob_documentTypes.d_description, Mob_documentTypes.d_group, Mob_documentTypes.d_barcodeRequired from Mob_documentTypes " +
            " LEFT JOIN Mob_tripDocuments ON Mob_documentTypes.Id = Mob_tripDocuments.td_docType " +
            " AND Mob_tripDocuments.td_tripId = ? AND Mob_tripDocuments.Deleted = 0 " +
            " WHERE Mob_documentTypes.Id = ? AND Mob_documentTypes.Deleted = 0 LIMIT 1";
        return this.execSqlCustom(query, [tripId, documentTypeId]).then((data) => {
            return data[0] || null;
        });
    }

    getTripTimeRecordForNewEvent(tripId: string) {
        let query: string = "Select Maintt.tl_tripId, Maintt.tl_sequence,Maintt.tl_dtTimeEstimate,Maintt.tl_dtTimeEffective,Maintt.tl_activityId, " +
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
        return this.execSqlCustom(query, [tripId]).then((data) => {
            return data[0] || null;
        });
    }

    getMob_activityById(Id: string) {
        let query: string = "SELECT id,a_description,a_activityGroup,a_nextActivity,a_nextActivityDeltaSeconds,a_permitsManualDate,a_isFoto,a_documentTypeId " +
            " FROM Mob_activity WHERE deleted= 0 AND Id=? LIMIT 1";
        return this.execSqlCustom(query, [Id]).then((data) => {
            return data[0] || null;
        });
    }

    getMobActivityByActivityGroup(a_activityGroup: string) {
        let query: string = "SELECT id, a_description,a_activityGroup,a_nextActivity,a_nextActivityDeltaSeconds,a_permitsManualDate,a_icon," +
            " a_isFoto,a_documentTypeId FROM Mob_activity WHERE deleted=0 AND a_activityGroup=?";
        return this.execSqlCustom(query, [a_activityGroup]).then((data) => {
            return data;
        });
    }

    getUser() {

        let query: string = "SELECT * FROM Mob_user WHERE deleted=0 AND id=?  LIMIT 1";
        return this.storage.get('user').then((userdetail) => {
            let user = JSON.parse(userdetail);

            let userId = user != null ? user.id : '';
            return this.execSqlCustom(query, [userId]).then((data) => {
                if (data != null) {
                    return data[0];
                } else {
                    return { id: null, u_language: "en" };
                }
            });
        });

    }

    getUserFromLocalStorage() {
        //// get from local storage for get or set user data.
        return this.storage.ready().then(() => {
            return this.storage.get('user').then((userdetail) => {
                return JSON.parse(userdetail);
            });
        });
    }

    clearUserData() {
        return this.storage.clear();
    }

    setUserInLocalStorage(user) {
        //// get from local storage for get or set user data.
        return this.storage.ready().then(() => {
            return this.storage.set('user', JSON.stringify(user));
        });
    }

    getMob_tripTimeLineTest() {

        let query: string = "SELECT * FROM Mob_tripTimeLine";
        return this.execSqlCustom(query, []).then((data) => {
            return data;
        });

    }

    private execSqlCustom = (sqlToExecute: string, bracketValues: Array<any>): Promise<any> => {
        return this.sqlite.create({
            name: this.sDBName,
            location: 'default'
        }).then(
            (db: SQLiteObject) => {

                return db.executeSql(sqlToExecute, bracketValues)
                    .then((res: any) => {
                        let data = [];
                        for (var i = 0; i < res.rows.length; i++) {
                            data.push(res.rows.item(i))
                        }
                        return data;
                    }
                    ).catch(e => console.log(e));
            }).catch(e => console.log(e));
    }
}
