//Amazon ElasticSearch endpoint URL
var endPointURL =
"https://search-xxx.ap-northeast-1.es.amazonaws.com/indexname/typename/";

//-------------------------------------
// creating timestamp string
//-------------------------------------
var nowdate=new Date();

var year = nowdate.getFullYear();
var month = nowdate.getMonth()+1;
var day = nowdate.getDate();
var hour = nowdate.getHours();
var minute = nowdate.getMinutes();
var second = nowdate.getSeconds();

if ( month < 10 ) {
	month = "0" + month;
}
if ( day < 10 ) {
	day = "0" + day;
}
if ( hour < 10 ) {
	hour = "0" + hour;
}
if ( minute < 10 ) {
	minute = "0" + minute;
}
if ( second < 10 ) {
	second = "0" + second;
}

var nowtime = year + "-" + month + "-" + day + "T" + hour + ":" +
minute + ":" + second + "+0900";

log(nowtime + "  " + messageValues.humidity);

//json data to send to Amazon ElasticSearch
var jsonData = {
    "humid" : messageValues.humidity,
"@timestamp":nowtime
};

var sendData = JSON.stringify(jsonData);
	log(sendData);

ajax ({
    url : endPointURL,
    type : "post",
    data : sendData,
    contentType : "application/json",
    dataType : "json",
    timeout : 5000,
    success : function ( contents ) {
		log("POST success");
		log(JSON.stringify(contents));
		callbackSuccess( {
            resultType : "continue"
        } );
    },
    error : function ( request, errorMessage ) {
		log("POST error");
        callbackSuccess( {
            resultType : "continue"
        } );
    }
});

return {
    resultType : "pause"
};