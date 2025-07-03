function createPUTRequest(token, jsonObj, dbName, relName) {
    var putRequest = "{\n"
        + "\"token\" : \"" + token + "\","
        + "\"dbName\": \"" + dbName + "\",\n" + "\"cmd\" : \"PUT\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return putRequest;
}

function createUPDATERecordRequest(token, jsonObj, dbName, relName, recNo) {
    var updateRequest = "{\n"
        + "\"token\" : \"" + token + "\","
        + "\"dbName\": \"" + dbName + "\",\n" + "\"cmd\" : \"UPDATE\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"record\": " + recNo + ",\n"
        + "\"jsonStr\": \n"
        + jsonObj
        + "\n"
        + "}";
    return updateRequest;
}

function createGET_BY_KEYRequest(token, dbName, relName, keyJsonObj) {
    var getRequest = "{\n"
        + "\"token\" : \"" + token + "\","
        + "\"dbName\": \"" + dbName + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
        + "\"rel\" : \"" + relName + "\","
        + "\"jsonStr\": \n"
        + keyJsonObj
        + "\n"
        + "}";
    return getRequest;
}

function executeCommandAtGivenBaseUrl(requestString, baseUrl, apiEndPointUrl) {
    var url = baseUrl + apiEndPointUrl;

    var jsonObj;
    $.ajax({
        url: url,
        type: "POST",
        data: requestString,
        contentType: "application/json",
        async: false,
        success: function (result) {
            jsonObj = result;
        },
        error: function (result) {
            jsonObj = result;
        }
    });
    return jsonObj;
}
