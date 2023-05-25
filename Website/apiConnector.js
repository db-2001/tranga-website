﻿let apiUri = `http://${window.location.host.split(':')[0]}:6531`

if(getCookie("apiUri") != ""){
    apiUri = getCookie("apiUri");
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function GetData(uri){
    let request = await fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    let json = await request.json();
    return json;
}

function PostData(uri){
    fetch(uri, {
        method: 'POST'
    });
}

function DeleteData(uri){
    fetch(uri, {
        method: 'DELETE'
    });
}

async function GetAvailableControllers(){
    var uri = apiUri + "/Tranga/GetAvailableControllers";
    let json = await GetData(uri);
    return json;
}

async function GetPublication(connectorName, title){
    var uri = apiUri + `/Tranga/GetPublicationsFromConnector?connectorName=${connectorName}&title=${title}`;
    let json = await GetData(uri);
    return json;
}

async function GetKnownPublications(){
    var uri = apiUri + "/Tranga/GetKnownPublications";
    let json = await GetData(uri);
    return json;
}

async function GetTaskTypes(){
    var uri = apiUri + "/Tasks/GetTaskTypes";
    let json = await GetData(uri);
    return json;
}
async function GetRunningTasks(){
    var uri = apiUri + "/Tasks/GetRunningTasks";
    let json = await GetData(uri);
    return json;
}

async function GetDownloadTasks(){
    var uri = apiUri + "/Tasks/Get?taskType=DownloadNewChapters";
    let json = await GetData(uri);
    return json;
}

async function GetSettings(){
    var uri = apiUri + "/Settings/Get";
    let json = await GetData(uri);
    return json;
}

async function GetKomgaTask(){
    var uri = apiUri + "/Tasks/Get?taskType=UpdateKomgaLibrary";
    let json = await GetData(uri);
    return json;
}

function CreateTask(taskType, reoccurrence, connectorName, publicationId, language){
    var uri = apiUri + `/Tasks/Create?taskType=${taskType}&connectorName=${connectorName}&publicationId=${publicationId}&reoccurrenceTime=${reoccurrence}&language=${language}`;
    PostData(uri);
}

function StartTask(taskType, connectorName, publicationId){
    var uri = apiUri + `/Tasks/Start?taskType=${taskType}&connectorName=${connectorName}&publicationId=${publicationId}`;
    PostData(uri);
}

function EnqueueTask(taskType, connectorName, publicationId){
    var uri = apiUri + `/Queue/Enqueue?taskType=${taskType}&connectorName=${connectorName}&publicationId=${publicationId}`;
    PostData(uri);
}

function UpdateSettings(downloadLocation, komgaUrl, komgaAuth){
    var uri = apiUri + `/Settings/Update?downloadLocation=${downloadLocation}&komgaUrl=${komgaUrl}&komgaAuth=${komgaAuth}`;
    PostData(uri);
}

function DeleteTask(taskType, connectorName, publicationId){
    var uri = apiUri + `/Tasks/Delete?taskType=${taskType}&connectorName=${connectorName}&publicationId=${publicationId}`;
    DeleteData(uri);
}

function DequeueTask(taskType, connectorName, publicationId){
    var uri = apiUri + `/Queue/Dequeue?taskType=${taskType}&connectorName=${connectorName}&publicationId=${publicationId}`;
    DeleteData(uri);
}

async function GetQueue(){
    var uri = apiUri + "/Queue/GetList";
    let json = await GetData(uri);
    return json;
}