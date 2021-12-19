$.ajaxSetup({
    cache: false
});
jQuery.fn.extend({
    setPrimeUICheckBoxChecked: function(b) {
        this.prop("checked", b);
        if (b) {
            this.parent().parent().find(".ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default").each(function() {
                $(this).addClass("ui-state-active");
                $(this).children("span").addClass("fa fa-fw fa-check")
            })
        } else {
            this.parent().parent().find(".ui-chkbox-box.ui-widget.ui-corner-all.ui-state-default").each(function() {
                $(this).removeClass("ui-state-active");
                $(this).children("span").removeClass("fa fa-fw fa-check")
            })
        }
    }
});
/*document.onkeydown = function(e) {
	  if(event.keyCode == 123) {
	     return false;
	  }
	  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
	     return false;
	  }
	  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
	     return false;
	  }
	  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
	     return false;
	  }
	  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
	     return false;
	  }
	}*/

/* Changed by Harry on 06-03-2020 CDAC CSRF issue*/
function getCSRFToken(name){
	 var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return $.base64.encode(c.substring(nameEQ.length, c.length));
    }
    return null;
}

/*function getCSRFToken(name){
	 var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') c = c.substring(1, c.length);
       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return null;
}*/

function encrypt(pass, msg) {
	var first = pass;
   	if (first.length >= 16) {
		first = first.substr(0,16);
	} else {
		while (first.length < 16) {
			first = first + first;
		}
		first = first.substr(0,16);
	}
	var sfs		 =  String2Hex(first);
   	var login_salt =  String2Hex(pass);
   	var aesUtil = new AesUtil(256, 1000);
   	var ciphertext = aesUtil.encrypt(login_salt,sfs, login_salt, msg);
   	return ciphertext;
}
function decrypt(pass, msg) {
	var first = pass;
	if (first.length >= 16) {
		first = first.substr(0,16);
	} else {
		while (first.length < 16) {
			first = first + first;
		}
		first = first.substr(0,16);
	}
	var sfs		 =  String2Hex(first);
	var login_salt =  String2Hex(pass);
	var aesUtil = new AesUtil(256, 1000);
	var ciphertext = aesUtil.decrypt(login_salt,sfs, login_salt, msg);
	return ciphertext;
}

function String2Hex(tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16);
    }
    return str;
}
function arrayBufferToBase64(c) {
    var d = $.base64.decode(c);
    return d
}

function showGrowlMessage(d, e, f) {
    if (d == "info") {
        $("#growlmessages").infoGrowlMessage("show", [f])
    } else {
        if (d == "warn") {
            $("#growlmessages").warnGrowlMessage("show", [f])
        } else {
            if (d == "error") {
                $("#growlmessages").errorGrowlMessage("show", [f])
            } else {
                $("#growlmessages").infoGrowlMessage("show", [f])
            }
        }
    }
}

function showGrowlMessages(m) {
    var j = [];
    var g = [];
    var k = [];
    for (var h = 0; h < m.length; h++) {
        var l = m[h];
        if (l.severity == "info") {
            g.push(l.detail)
        } else {
            if (l.severity == "warn") {
                k.push(l.detail)
            } else {
                if (l.severity == "error") {
                    j.push(l.detail)
                }
            }
        }
    }
    if (j.length > 0) {
        $("#growlmessages").errorGrowlMessage("show", j)
    }
    if (g.length > 0) {
        $("#growlmessages").infoGrowlMessage("show", g)
    }
    if (k.length > 0) {
        $("#growlmessages").warnGrowlMessage("show", k)
    }
}

function showTimsOverlay(d, c) {
    if (d) {
        jQuery("<div/>", {
            id: c + "_timsOverlay"
        }).css({
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "#fff",
            opacity: "0.3"
        }).appendTo($("#" + c).css("position", "relative"));
        $("#" + c + "_timsOverlay").show()
    } else {
        $("#" + c + "_timsOverlay").remove()
    }
}
var $tims_loading_dialog_init = false;

function openTimsLoadingDialog(b) {
    $("#TimsLoadingDialog").puidialog({
        showEffect: "fade",
        hideEffect: "fade",
        minimizable: false,
        maximizable: false,
        responsive: true,
        minWidth: 100,
        modal: true,
        closable: false,
        closeOnEscape: false,
        resizable: false,
        draggable: false
    });
    $("#TimsLoadingDialogContent").html(b);
    $("#TimsLoadingDialog").puidialog("show")
}

function hideTimsLoadingDialog() {
    $("#TimsLoadingDialog").puidialog("hide")
}
$tims_yesno_dialog_init = false;
$yesbuttonfunction = function() {
    console.log("yes")
};
$nobuttonfunction = function() {
    console.log("no")
};
$data = null;

function showYesNoDialog(h, k, g, f, j) {
    console.log("data: " + j);
    if ($tims_yesno_dialog_init === false) {
        $tims_yesno_dialog_init = true;
        $("#dialogYesNoMessage").puidialog({
            showEffect: "fade",
            hideEffect: "fade",
            minimizable: false,
            maximizable: false,
            responsive: true,
            minWidth: 100,
            modal: true,
            closable: false,
            closeOnEscape: false,
            buttons: [{
                text: "Yes",
                click: function() {
                    console.log("data on click" + $data);
                    if ($yesbuttonfunction != null) {
                        $yesbuttonfunction(this, $data)
                    }
                    $("#dialogYesNoMessage").puidialog("hide")
                }
            }, {
                text: "No",
                click: function() {
                    if ($nobuttonfunction != null) {
                        $nobuttonfunction(this, $data)
                    }
                    $("#dialogYesNoMessage").puidialog("hide")
                }
            }]
        })
    }
    $data = j;
    $("#dialogYesNoMessage_label").html(h);
    $("#dialogYesNoMessage .ui-dialog-content").html(k);
    $yesbuttonfunction = g;
    $nobuttonfunction = f;
    $("#dialogYesNoMessage").puidialog("show")
}
$(window).click(function(b) {
    $(".backReport").on("click", function(a) {
        a.preventDefault();
        var d = $(this).attr("id");
        if (typeof d != "undefined" || d == "") {
            $("#main-content-wrapper").empty();
            $("#main-content-wrapper").load(d);
            window.location.hash = d
        }
    })
});
window.redirectTo = function(b) {
    $("#main-content-wrapper").empty();
    $("#main-content-wrapper").load(b);
    window.location.hash = b
};

function feedback() {
    $("#feedbackForm")[0].reset();
    $("#feedbackDialogBox").css("display", "block");
    $("#feedbackfade").css("display", "block");
    var b = $("span.close");
    b.click(function() {
        toggleFeedBackDialog()
    });
    $("#feedbackCancel").click(function() {
        toggleFeedBackDialog()
    })
}

function loadCaptcha(f) {
    var e = f;
    var d = {};
    $("#typedCaptcha").val("");
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
        url: e + "/getCaptcha",
        data: JSON.stringify(d),
        success: function(a) {
            if (a != null) {
            	a = JSON.parse(DOMPurify.sanitize(JSON.stringify(a), {SAFE_FOR_JQUERY: true}));
                $("#captchaImg").attr("src", "data:image/png;base64," + a.captchaImage);
                CaptchaString = a.captchaText
            } else {
                modalShow("Failed to load Captcha")
            }
        },
        error: function(a, c, b) {
            var b = "Internal Server Error";
            if (a.responseJSON != null && a.responseJSON != "undefined" && a.responseJSON.message != null && a.responseJSON.message != "undefined") {
                b = a.responseJSON.message;
                if (b == 9999) {
                   // window.location.href = "sessionInvalid"
                }
            }
            modalShow("Failed to load Captcha")
        }
    })
}

function toggleFeedBackDialog() {
    if ($("#feedbackDialogBox").css("display") == "block") {
        $("#feedbackDialogBox").css("display", "none");
        $("#feedbackfade").css("display", "none")
    } else {
        $("#feedbackDialogBox").css("display", "block");
        $("#feedbackfade").css("display", "block")
    }
}

/*function initiateFeedbackForm(l, n, o, j) {
    $("#category").empty();
    $("#feedbackType").empty();
    var q = [];
    q = getOfficerWiseData(l, getMasterTableData(n, o));
    q.sort(function(a, b) {
    	   return a.moduleName.localeCompare(b.moduleName);
    	});
    if (q != null && q.length != 0) {
        var m = '<option value="-1">-- Please Select --</option>';
        for (element in q) {
            m = m + '<option value="' + q[element].moduleId + '">' + $.trim(q[element].moduleName) + "</option>"
        }
        $("#category").append(m)
    }
    var p = [];
    p = getMasterTableData(n, j);
    p.sort(function(a, b) {
 	   return a.feedbackName.localeCompare(b.feedbackName);
 	});
    if (p != null && p.length != 0) {
        var k = '<option value="-1">-- Please Select --</option>';
        for (element in p) {
            k = k + '<option value="' + p[element].feedbackTypeId + '">' + $.trim(p[element].feedbackName) + "</option>"
        }
        $("#feedbackType").append(k)
    }
}*/

function getOfficerWiseData(f, d) {
    var e = [];
    if (d != null) {
        if (f == 2) {
            e = $.grep(d, function(a, b) {
                if (a.noFlag) {
                    return a.noFlag == "Y"
                } else {
                    a
                }
            })
        } else {
            e = $.grep(d, function(a, b) {
                if (a.ioFlag) {
                    return a.noFlag == "Y"
                } else {
                    a
                }
            })
        }
    }
    return e
}

function checkValidation() {
    $("#feedbackForm").validate({
        rules: {
            category: {
                selectcheck: true
            },
            feedbackType: {
                selectcheck: true
            },
            feedbackText: {
                required: true,
                onlySpacesNotAllowed: true,
                allowSpecialChars: true
            },
            subject:{
            	allowSpecialChars: true
            }
        }
    })
}
$("#getSearch").load("searchButton");
$("#getExportDiv").load("components #downloadFormatDiv");
$("#search-btn").click(function() {
    $("#Filter").toggleClass("active").focus;
    $(this).toggleClass("animate");
    $("#Filter").val("")
});
$(".dropdown-menu").click(function(b) {
    b.stopPropagation()
});

window.displayViewData= function(f,requestParameterList) {
	var g = f.subRequestList;
	var subRequestFile = decrypt($.session.get("SYMMETRIC_KEY"), window.atob(f.subRequestList[0].requestFile));
    var h = JSON.parse(subRequestFile);
    var approvalFile = null;
    var approvalFileName = null;
    if(f.subRequestList[0].approvalFile != null && f.subRequestList[0].approvalFile != undefined && f.subRequestList[0].approvalFile != 'undefined' )
    {
    	approvalFile = JSON.stringify(f.subRequestList[0].approvalFile);
    	approvalFileName = JSON.stringify(f.subRequestList[0].approvalFileName);
    }
    var auth = "";
    if(approvalFile != null)
	 {
	   auth='';
	   auth = auth+"<div>";
	   $("#authorization_view").empty();
	   $("#authorization_div").css("display","block");
	   auth =auth +"<p><a href='javascript:onclick=getViewAuthorisation("+approvalFile+","+approvalFileName+");' label class='badge badge-success' style='font-size:0.75rem;padding:5px 10px;'>View Authorization</a></p>";
	   auth=auth+"</div>";
	 }
  else
	   $("#authorization_div").css("display","none");
    
    var e = "";
    e = e+"<div>";
    
var seq_arr=[];
   $.each(h, function(b, a) {
        if (b != "subRequestToken" && b != "operationName" && b != "po_name" && b != "ua_name" && b != "serviceName" && b != "clientId") {
        	$.each (requestParameterList,function(i,obj){      
        		
		           if(obj.parameterDescriptionUaId.descriptionId == g[0].descriptionId.descriptionId){
		        	   if(obj.requestFileMap ==b){
		        		   
		        		   if(obj.requestInputType == 'browse')
		        		   {  
	        				   e =e +"<p><a href='javascript:onclick=getViewImage("+JSON.stringify(a)+","+JSON.stringify(obj.parameterLabel)+");' label class='badge badge-success' style='font-size:0.75rem;padding:5px 10px;'>View Request File(Image/PDF)</a></p>";
				        		 
		        		   }else
		        		   {
		        			   if(obj.parameterSeq != null){
		        				   var ob={};
		        			    	ob.key=obj.parameterLabel;
		        			    	ob.value=a;
		        			    	
		        			    	if(seq_arr[obj.parameterSeq]){
		        			    		seq_arr[seq_arr.length]=ob;
		        			    	}
		        			    	else
		        			    	seq_arr[obj.parameterSeq]=ob;
		        			    	
		        			    }
		        			    else{
		        			    	var ob={};
		        			    	ob.key=obj.parameterLabel;
		        			    	ob.value=a;
		        			    	seq_arr.push(ob);
		        			    	 //e =e +'<p>'+ obj.parameterLabel+' - '+a +'</p>';
		        			    }
		        			     
		        		   }
		        	   }//=b	        	  
		        	  
		           }//description
		        	     	 
        	});// Request parameter list
        }
    });//Object
   
   if (seq_arr.length>0){
	   for(item in seq_arr){
		   if(seq_arr[item] != undefined && seq_arr[item] != 'undefined'){
			   e =e +'<p>'+ seq_arr[item].key+' - '+ seq_arr[item].value +'</p>';
		   }
	   }
   }
    e = e+"</div>";
   // e = e.slice(0, -1);
    $("#usecaselabel").text(f.subRequestList[0].descriptionId.descriptionLabel);
    $("#requestRaised").empty().append(e);
    $("#poName").text(f.subRequestList[0].poName);
    $("#createdBy").text(f.subRequestList[0].createdByName);
    $("#createdAt").text(f.subRequestList[0].createdAt);
    $("#subRequestId").text(f.subRequestList[0].subRequestId);
    $("#authorization_view").empty().append(auth);
    viewSubRequestDlg();
    $(window).scrollTop(0);
}

function getViewAuthorisation(approvalFile, fileName)
{
	 var e = $("#viewAuthorisationDlg");
	 var dataDiv = "";
	 dataDiv = dataDiv+"<div>";
	 var fileEx = fileName.split(".")[1].toLowerCase();
	 if(fileEx == 'jpg' || fileEx == 'png' || fileEx == 'gif'|| fileEx == 'gif')
		{
		 dataDiv =dataDiv +'<img style="box-sizing: border-box; max-width: 100%; max-height: 100%;" src="'+"data:image/(png|jpg|gif|jpeg);base64,"+ approvalFile+'" />';
		}
	   if(fileEx == 'pdf')
		{ 	
		   dataDiv =dataDiv +'<object width="100%" height="500px" type="application/pdf" data="'+"data:application/pdf;base64,"+ approvalFile+'" ></object>';
		}
	 $("#requestAuthorisation").empty().append(dataDiv);
    $("#closeAuthorisationDlg").click(function() {
        e.css("display", "none")
    });
    e.css("display", "block");
    window.onclick = function(a) {
        if (a.target == e) {
            e.style.display = "none"
        }
    }
}
function getViewImage(a,parameterLabel)
{	
	
	 var e = $("#viewImageFileDlg");
	 var dataDiv = "";
	 dataDiv = dataDiv+"<div>";
	 //var fileEx = fileName.split(".")[1];
	 if(a.format == 'jpg' || a.format == 'png' || a.format == 'gif'|| a.format == 'gif')
	 {
		 dataDiv = dataDiv +'<p>'+ parameterLabel+'</p><br />';
		 dataDiv = dataDiv +'<div><img style="max-width: 100%;max-height: 100%;" src="'+"data:image/(png|jpg|gif|jpeg);base64,"+ a.image+'" /></div>';
	 }
 	 if(a.format == 'pdf')
	 { 	
 		 dataDiv = dataDiv +'<p>'+ parameterLabel+'</p><br />';
	 	 dataDiv =dataDiv +'<object  width="100%" height="500px" style="overflow: auto;"  type="application/pdf" data="'+"data:application/"+a.format+";base64,"+ a.image+'"></object>';
	 }
   	 if( a.format =='txt'){
	  
   		 dataDiv =dataDiv +'<p>'+ parameterLabel+'</p><br />';
		 dataDiv =dataDiv  +'<div><img src="'+"data:image/png;base64,"+btoa(String.fromCharCode.apply(null, new Uint8Array(a.image)))+'" /></div>';
   	 }
	   
	$("#requestImageFile").empty().append(dataDiv);
    $("#closeImageFileDlg").click(function() {
        e.css("display", "none")
    });
    e.css("display", "block");
    window.onclick = function(a) {
        if (a.target == e) {
            e.style.display = "none"
        }
    }
}

window.getUCData = function(baseUrl,currentSubReqId,requestId){
	 var usecaseFile ;
	  var user_information = $.session.get("userData");
	  var user_details = JSON.parse(user_information);
	  var data = {
			  subRequestId : currentSubReqId,
			  requestId : requestId
		   }
		$.ajax({
		type : 'POST',
		dataType : 'json',
		async:false,
		contentType: "application/json",
		headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
		url : baseUrl +'/viewSubRequestData',
		data : JSON.stringify(data), 
		success : function(response) {	
			if (response.subRequestList != null) {
				response = JSON.parse(DOMPurify.sanitize(JSON.stringify(response), {SAFE_FOR_JQUERY: true}));
				var requestFile = decrypt($.session.get("SYMMETRIC_KEY"),window.atob(response.subRequestList[0].requestFile));
				usecaseFile =JSON.parse(requestFile)
			}
		},
		error : function(jq, status, message) {
			var message = "Internal Server Error";
			if(jq.responseJSON != null && jq.responseJSON != 'undefined' && jq.responseJSON.message != null && jq.responseJSON.message != 'undefined')
			{
				message = jq.responseJSON.message;
				if(message == '9999')
				{
					window.location.href = "sessionInvalid";
				}
			}
			document.getElementById("snackbar").innerHTML = message;
			snakebarShow();
			modalShow(message);
			}
		
	
	});  
		return usecaseFile;
}

function base64ToByteArray(base64String) {
    try {            
        var sliceSize = 1024;
        var byteCharacters = atob(base64String);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return byteArrays;
    } catch (e) {
        console.log("Couldn't convert to byte array: " + e);
        return undefined;
    }
}
function _arrayBufferToBase64( buffer ) {
	  var binary = '';
	  var bytes = new Uint8Array( buffer );
	  var len = bytes.byteLength;
	  for (var i = 0; i < len; i++) {
	     binary += String.fromCharCode( bytes[ i ] );
	  }
	  return window.btoa( binary );
	}
function getValue(f, d) {
    if (!d) {
        return f
    }
    const e = d.split(".");
    return getValue(f[e.shift()], e.join("."))
}
function getResponseParameter(){
	var user_information =  $.session.get("userData");
	var user_detail = JSON.parse(user_information);
	var data = {
			uaId : user_detail.orgId
			}
	
	var baseUrl = $.session.get("baseApplicationUrl");
	$.ajax({
		type : 'POST',
		dataType : 'json',
		async:false,
		contentType: "application/json",
		headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
		url : baseUrl +'/getResponseParameterByOrg',
		data : JSON.stringify(data),
		success : function(response) {
			response = JSON.parse(DOMPurify.sanitize(JSON.stringify(response), {SAFE_FOR_JQUERY: true}));
			$.session.remove("responseParameterList");
			$.session.set("responseParameterList", JSON.stringify(response.uaResponseMappingUaList));
		},
		error : function(jq, status, message) {
		}
	});  
};
function getRequestParameter(){
	var user_information = $.session.get("userData");
	var user_detail = JSON.parse(user_information);
		var data = {
				uaId : user_detail.orgId
				}
		var baseUrl =$.session.get("appUrl");
	$.ajax({
		type : 'POST',
		async:false,
		dataType : 'json',
		contentType: "application/json",
		headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
		url : baseUrl +'/getRequestParameterByOrg',
		data : JSON.stringify(data),
		success : function(response) {
			response = JSON.parse(DOMPurify.sanitize(JSON.stringify(response), {SAFE_FOR_JQUERY: true}));
			$.session.remove("requestParameterList");
			$.session.set("requestParameterList", JSON.stringify(response.requestParameterList));
		},
		error : function(jq, status, message) {
			
		}
	});  
	};
	function displayResponseData2(response,currentSubReqId,requestId,poId, poName ,stsID,dId,dlabel,UCFile) {
		document.getElementById('getResponseDivDialog').style.display='block';
		document.getElementById('fade2').style.display='block';
		$("#getResponseDiv").prepend('<div id="resposeTableDiv" style="max-height:1500px;"></div>');
		KeyStructureUI();
	}
	var dataShown;
	function paginationCustom(rowCount){
		
		if(rowCount==dataShown.length){//puipaginator
			$('#resposeTableDiv').customdatatable('getPaginator').custompaginator('option','rows', dataShown.length);
			$('#resposeTableDiv').customdatatable('getPaginator').custompaginator('setPage', 0);
		}
		else{
			if($("#dontShow").prop("checked") == false)
			exportLimitModal();
			
			$('#resposeTableDiv').customdatatable('getPaginator').custompaginator('option','rows', rowCount);
			$('#resposeTableDiv').customdatatable('getPaginator').custompaginator('setPage', 0);
			
			 $('#dontShow').bind('change', function () {
		    	});
		}
	}
	var lruCache;
	function initiateLRU(){
	lruCache = new LRUCache(5);
	}
	function setLruCache(key,value){
		lruCache.set(key, value);
	}
	function getLruCache(){
		return lruCache;
	}
function displayResponseData(response,currentSubReqId,requestId,poId, poName ,stsID,dId,dlabel,UCFile,casests) {
	var isImageData ='';
	$("#dontShow").prop("checked",false);
	 var respParameterList = null;
	 if($.session.get("requestParameterList") == null || $.session.get("requestParameterList") == "null"  || $.session.get("requestParameterList") =='undefined' || $.session.get("requestParameterList") == undefined){
		  getRequestParameter();
		  requestParameterList = JSON.parse($.session.get("requestParameterList")) ;
	  }
	  else
		  {
		  requestParameterList = JSON.parse($.session.get("requestParameterList")) ;
		  }
	 var user_information = $.session.get("userData");
		if(user_information == null || user_information == 'undefined')
		{
			window.location.href = "loginPage";
		}
		var user_details = JSON.parse(user_information);
		updateResponseDataDetails ={};
		updateResponseDataDetails=
		{
			"responseId":response.responseId,
			"SubrequestId":response.subrequestId,
			"userId":user_details.userId
		}
		byteArr = window.btoa(decrypt($.session.get("SYMMETRIC_KEY"),window.atob(response.responseFile)));
    if(response.responseFile == null && stsID==103){
    	showBodyScrollAgain();
    		if(casests == 'close')
    			modalShow('There is some error and response file is null.')
			else
				modalwithResubmitOption('There is some error and response file is null.');
    	
    	return;
    }
    if(response.responseFile == null){
    	modalShow('Response file is not available.')
    	return;
    }
		var reponseString = arrayBufferToBase64_main(byteArr);
		
	
		//uidev--------------------------------------------------------------------------------------

		if(stsID==103)
			{
			showBodyScrollAgain();
			/*	if(reponseString != null && reponseString.indexOf("Exception") > -1)
					{
						modalShow("Error while processing the request. Please contact to Natgrid Administrator."); 	
					}else*/
				if(reponseString == null )
				{
					if(casests == 'close')
					modalShow("Error while processing the request. Please contact to Natgrid Administrator."); 	
					else
						modalwithResubmitOption("Error while processing the request. Please contact to Natgrid Administrator.");
				}else
				{
					if(casests == 'close')
					   modalShow(reponseString);
					else
						modalwithResubmitOption(reponseString);
				}
			}
		else{
		var count = reponseString.indexOf('\0');
	 	 if (count>-1) {
	 		reponseString = reponseString.replace('\0', '');
	  	}
		document.getElementById('getResponseDivDialog').style.display='block';
		if(document.getElementById('fade2'))
			document.getElementById('fade2').style.display='block';
		if(document.getElementById('fade3'))
			document.getElementById('fade3').style.display='block';
		 $(window).scrollTop(0);
		$('#getResponseDiv').html("");
		
		
			$('#dataaboveTable').html("");
			
		
		var jsonParsedString = [];
		var jsonParsedArray = [];
		var requestParameter = null;
		var responseObject = null;
		 var paginatorVal=null;
		if(JSON.parse(reponseString) != null)
		{
			//requestParameter = JSON.parse(reponseString)[0].request;
			responseObject = JSON.parse(reponseString)[1].response; 
			responseObject= typeof responseObject == "string" ? JSON.parse(responseObject): responseObject;   
			
			/*delete requestParameter.po_name;
			delete requestParameter.ua_name;
			delete requestParameter.serviceName;
			delete requestParameter.operationName;
			delete requestParameter.useCaseName
			if(requestParameter.clientId)
				delete requestParameter.clientId;*/
			// for data from usecase file
			
			
			delete UCFile.po_name;
			delete UCFile.ua_name
			delete UCFile.serviceName;
			delete UCFile.operationName;
			delete UCFile.useCaseName
			if(UCFile.clientId)
				delete UCFile.clientId;
		}else
		{
			document.getElementById("snackbar").innerHTML = 'Failed to fetch the Response File!';
			fileName="";
			snakebarShow();
			document.getElementById('getResponseDivDialog').style.display='none';
			document.getElementById('fade2').style.display='none';
			return;
		}
		if($.session.get("responseParameterList") == null||$.session.get("responseParameterList") == "null" || $.session.get("responseParameterList") =='undefined' || $.session.get("responseParameterList") == undefined){
			  getResponseParameter();
			  respParameterList = JSON.parse($.session.get("responseParameterList"));
		  }
		  else
		  {
			  respParameterList = JSON.parse($.session.get("responseParameterList"));
		  }
		//--------------FOR CBIC USECASE -----------------//
		var CBIC_objData='';
		if(poId== 26 && $.type(responseObject) == 'object' && ('entityInfo' in responseObject)){
			CBIC_objData = $.extend(true,{},responseObject.entityInfo);
			if( 'boeDtls' in responseObject.entityInfo )
				{				
				responseObject = responseObject.entityInfo.boeDtls;
				delete CBIC_objData.boeDtls;
				
				}
			else if('shippingDtls' in responseObject.entityInfo)
				{
								
				responseObject = responseObject.entityInfo.shippingDtls;
				delete CBIC_objData.shippingDtls;
				}
			else
				responseObject = responseObject;
		}
		
		var e =''; 
		 e = e+"<div>";
		var seq_arr=[];
	    $.each(UCFile, function(b, a) {
	        if (b != "subRequestToken" && b != "operationName" && b != "po_name" && b != "serviceName" && b != "clientId" && b != "ua_name") {
	        	$.each (requestParameterList,function(i,obj){        	
			           if(obj.parameterDescriptionUaId.descriptionId == dId){
			        	   if(obj.requestFileMap ==b){      
			        		   if(obj.requestInputType == 'browse')
			        		   {
			        			   if(a.format == 'jpg' || a.format == 'png' || a.format == 'gif'|| a.format == 'gif')
			        				{
			        				   e =e +'<code>'+ obj.parameterLabel+'</code><br />';
				        			   e =e +'<img style="max-width:100%;max-height:100%;" src="'+"data:image/"+a.format+";base64,"+ a.image+'" ></img>';
			        				}
			        			   if(a.format == 'pdf' || a.format =='doc'||a.format =='docx')
			        				{
			        				   e =e +'<p>'+ obj.parameterLabel+'</p><br />';
			        				   e =e + '<div class=" col-sm-12"><a class="float-right text-primary" download="Request_'+poName.toUpperCase()+'_'+currentSubReqId+'"  href="data:application/ '+a.format+';base64,'+ a.image+'"><span class="mdi mdi-arrow-down-bold-circle text-primary" style="font-size:1.4rem;"></span>Request file</a></div>';
			        				   e =e +'<object  width="100%" height="500px" style="overflow: auto;" type="application/pdf" data="'+"data:application/"+a.format+";base64,"+ a.image+'"></object>';
			        				}
			        		   }else
			        		   {
			        			   if(obj.parameterSeq != null){
			        				   var ob={};
			        			    	ob.key=obj.parameterLabel;
			        			    	ob.value=a;
			        			    	if(seq_arr[obj.parameterSeq]){
			        			    		seq_arr[seq_arr.length]=ob;
			        			    	}
			        			    	else
			        			    	seq_arr[obj.parameterSeq]=ob;
			        			    	
			        			    }
			        			    else{
			        			    	var ob={};
			        			    	ob.key=obj.parameterLabel;
			        			    	ob.value=a;
			        			    	seq_arr.push(ob);
			        			    	 //e =e +'<p>'+ obj.parameterLabel+' - '+a +'</p>';
			        			    }
			        			    
			        		   }
			        		  //e = e + "<code>"+obj.parameterLabel + " - " + a + "</code><br/>"
			        	   }
			           }
			        	     	 
	        	});
	        }
	    });
	    if (seq_arr.length>0){
	 	   for(item in seq_arr){
	 		   if(seq_arr[item] != undefined && seq_arr[item] != 'undefined'){
	 			   e =e +'<p>'+ seq_arr[item].key+' - '+ seq_arr[item].value +'</p>';
	 		   }
	 	   }
	    }
	  e = e + "</div>";
	  // e = e.slice(0, -1);
	// e.replace(/\n/g, "<br />");
		$("#responedDate").text(response.responseInitiationDate);
	  $("#usecaselabelResponseTitle").text(dlabel);
	$("#requestRaisedResponseTitle").empty();
   $("#requestRaisedResponseTitle").append(e);
  // $('#requesterName').text(user_details.firstName +" "+user_details.lastName);
   //$("#requesterRole").text(user_details.roleName);
   $("#responseTitle").text(poName.toUpperCase());
  // $("#poName").text(f.subRequestList[0].poName);
   //$("#createdBy").text(f.subRequestList[0].createdByName);
   //$("#createdAt").text(f.subRequestList[0].createdAt);
   $("#subRequestIdResponseTitle").text(currentSubReqId);
		var columnsList = [];
		var sortField = null;
		var sortOrder = null;
		var selectionMode = null;
		var isErrorShouldAdd= true;
		var checkTypeOfData;
		for(var i=0; i< respParameterList.length; i++ )
		{
		
			if(poId == respParameterList[i].responseParameterId.poId.orgId && responseObject != null && 
					responseObject+respParameterList[i].responseParameterId.rootElement !=null){
				for(var z=0; z < respParameterList[i].responseParameterId.uaResParamUseCaseMappingList.length;z++)
				{
					if(response.descriptionId.descriptionId == respParameterList[i].responseParameterId.uaResParamUseCaseMappingList[z].descriptionId.descriptionId
							&&  respParameterList[i].responseParameterId.uaResParamUseCaseMappingList[z].isActive ==1)
					{
						if(respParameterList[i].responseParameterId.rootElement != '')
						{
							
							/*if(respParameterList[i].responseParameterId.rootElement.includes('.')){
								jsonParsedString=getValue(responseObject, respParameterList[i].responseParameterId.rootElement);
							
							}
							else */
							if(responseObject.length > 0 )
							{
								jsonParsedString = responseObject;
							}else
							{
								if(responseObject.hasOwnProperty(respParameterList[i].responseParameterId.rootElement )|| respParameterList[i].responseParameterId.rootElement.includes('.')){								
								 if(getValue(responseObject, respParameterList[i].responseParameterId.rootElement) != null)
									jsonParsedString=getValue(responseObject, respParameterList[i].responseParameterId.rootElement);
								}
								//jsonParsedString = responseObject[respParameterList[i].responseParameterId.rootElement];
						
							}
						}else
						{
							jsonParsedString = responseObject;
						}
						
					//uidev-------------------------------------------------
					/*for (var key in requestParameter){ 
							if(jsonParsedString != null)
							jsonParsedString[key]=requestParameter[key];
						}
					debugger;*/
						
					
					/*	if(jsonParsedArray.length == 0){
							jsonParsedArray = [];
							checkTypeOfData=jsonParsedString;
							if($.type(jsonParsedString) == 'object' && $.isEmptyObject(jsonParsedString)==false)
								jsonParsedArray.push(jsonParsedString);
							if($.type(jsonParsedString) == 'array' && jsonParsedString.length !== 0)
								jsonParsedArray.push(jsonParsedString);
							isErrorShouldAdd= true;
						}
						else{*/
							if(respParameterList[i].responseParameterId.headerText.toLowerCase().includes('err') || respParameterList[i].responseParameterId.headerText.toLowerCase().includes('message'))
							{
								if(jsonParsedString.length !== 0)
								{
								
									//if(($.type(jsonParsedString) == 'array' && respParameterList[i].responseParameterId.parameterField in jsonParsedString[0] && jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] != respParameterList[i].responseParameterId.sortField)||($.type(jsonParsedString) == 'object' && respParameterList[i].responseParameterId.parameterField in jsonParsedString && jsonParsedString[respParameterList[i].responseParameterId.parameterField] != respParameterList[i].responseParameterId.sortField && respParameterList[i].responseParameterId.sortField != null && respParameterList[i].responseParameterId.sortField != 'null'))
						if(($.type(jsonParsedString) == 'array' && respParameterList[i].responseParameterId.parameterField in jsonParsedString[0] && jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] != respParameterList[i].responseParameterId.sortField && 	jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] != null && jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] !='null' )
											||
							($.type(jsonParsedString) == 'object' && respParameterList[i].responseParameterId.parameterField in jsonParsedString && jsonParsedString[respParameterList[i].responseParameterId.parameterField] != respParameterList[i].responseParameterId.sortField  && jsonParsedString[respParameterList[i].responseParameterId.parameterField] != null && jsonParsedString[respParameterList[i].responseParameterId.parameterField] !='null'))
									{
										isErrorShouldAdd= true;
										checkTypeOfData=jsonParsedString;
										jsonParsedArray=[];
										if($.type(jsonParsedString) == 'object' && $.isEmptyObject(jsonParsedString)==false)
											jsonParsedArray.push(jsonParsedString);
										if($.type(jsonParsedString) == 'array' && jsonParsedString.length !== 0)
											jsonParsedArray.push(jsonParsedString);	
										}
									else if(($.type(jsonParsedString) == 'array' && respParameterList[i].responseParameterId.parameterField in jsonParsedString[0] == false) || ($.type(jsonParsedString) == 'object' && respParameterList[i].responseParameterId.parameterField in jsonParsedString == false))
										isErrorShouldAdd= false;
									else if(($.type(jsonParsedString) == 'array' && respParameterList[i].responseParameterId.parameterField in jsonParsedString[0] && jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] == respParameterList[i].responseParameterId.sortField) ||($.type(jsonParsedString) == 'object' && respParameterList[i].responseParameterId.parameterField in jsonParsedString && jsonParsedString[respParameterList[i].responseParameterId.parameterField] == respParameterList[i].responseParameterId.sortField))
										isErrorShouldAdd= false;
									else if ($.type(jsonParsedString) == 'array' && respParameterList[i].responseParameterId.parameterField in jsonParsedString[0] && (jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] == null|| jsonParsedString[0][respParameterList[i].responseParameterId.parameterField] == 'null' ) || $.type(jsonParsedString) == 'object' && respParameterList[i].responseParameterId.parameterField in jsonParsedString && (jsonParsedString[respParameterList[i].responseParameterId.parameterField] == null || jsonParsedString[respParameterList[i].responseParameterId.parameterField] == 'null'))
										isErrorShouldAdd= false;
								}
							}
							else{
									jsonParsedArray = [];
									checkTypeOfData=jsonParsedString;
									if($.type(jsonParsedString) == 'object' && $.isEmptyObject(jsonParsedString)==false)
										jsonParsedArray.push(jsonParsedString);
									if($.type(jsonParsedString) == 'array' && jsonParsedString.length !== 0)
										jsonParsedArray.push(jsonParsedString);
									isErrorShouldAdd= true;
							}
						
	  					
	  					var propertiesMap = {};
	  					sortField =respParameterList[i].responseParameterId.sortField;
	  					sortOrder = respParameterList[i].responseParameterId.sortOrder;
	  					selectionMode = respParameterList[i].responseParameterId.selectionMode;
	  					/*if(respParameterList[i].responseParameterId.parameterField.includes('|'))
	  					{
	  						propertiesMap['field']= respParameterList[i].responseParameterId.parameterField.split('|')[0];
	  						var mergeField =respParameterList[i].responseParameterId.parameterField.split('|');
	  						propertiesMap['content']= function(rowData, fieldName, fieldElement)
  							{ 
	  							var data='';
	  							for (var ii in mergeField){
	  								data+=rowData[mergeField[ii]] +"  " 
	  							}
	  							
	  						  return data;
  							}
	  					
	  					}
	  					else{*/
	  					propertiesMap['field']= respParameterList[i].responseParameterId.parameterField;
	  					//}
	  					propertiesMap['headerText']= respParameterList[i].responseParameterId.headerText;
	  					propertiesMap['headerStyle']= respParameterList[i].responseParameterId.headerStyle;
	  					propertiesMap['bodyStyle']= respParameterList[i].responseParameterId.bodyStyle;
	  					propertiesMap['sortable']= respParameterList[i].responseParameterId.sortable == "true" ? true : false;		        	  					
	  					propertiesMap['responseFormat']=respParameterList[i].responseParameterId.responseTypeFormat;
	  					propertiesMap['DateFormat']=respParameterList[i].responseParameterId.formatDate;
	  					if(respParameterList[i].responseParameterId.responseTypeFormat == 'date' &&(respParameterList[i].responseParameterId.formatDate !== null || respParameterList[i].responseParameterId.formatDate != 'null'))
	  					{
	  						
	  						var format=respParameterList[i].responseParameterId.formatDate;
	  						propertiesMap['content']= function(rowData, fieldName, fieldElement)
  							{ 
	  							var data = rowData[fieldName.field];
	  							try{
	  								data= $.datepicker.formatDate( 'dd-mm-yy',$.datepicker.parseDate(format,data));
	  							}
	  							catch(e)
	  							{
	  								data=data;
	  							}
	  						  return data;
  							}
		
	  						
	  					}
	  					
	  					propertiesMap['show_if_value_otherthen']=respParameterList[i].responseParameterId.sortField;
	  					var elements = respParameterList[i].responseParameterId.parameterField.split(".");
	  					if(elements.length > 1 )
	  					{

	  						
	  						propertiesMap['content']= function(rowData, fieldName, fieldElement)
  							{
		
									var resultString = '';
									var rowDataElement = rowData[fieldName.field.split(".")[0]];
									var rowDataKeys=fieldName.field.split(".")[1];
									var nestedKeyHeaders='';
									if(rowDataKeys.includes('{')){
										nestedKeyHeaders=JSON.parse(rowDataKeys);
									}
									else{
										rowDataKeys = null;
									}
	  							for(var item in rowDataElement)
	  							{
	  								if($.type(rowDataElement[item]) == "array")
	  								{
	  									var element1 = rowDataElement[item];
	  									for(var item1 in element1)
        	  							{
	  										if($.type(element1[item1]) == "array")
	  										{//****************
	  											var element2 = element1[item1];
	  											$.each(element2,function (ke,va){
	  												if($.type(va) == 'object'){
	    	  											  htmlUIObj='';
	  													var nestedKeys=null;
	        	  										  if(rowDataKeys != null){
	        	  											  nestedKeys=nestedKeyHeaders[ke];
	        	  										  }
        	  											resultString =resultString + extractObjectValue1(va,rowDataKeys,nestedKeys);
			        	  								
	  												}
	  												else if($.type(va) == 'array'){
	  													htmlUIArray='';
	    	  											htmlUIObj='';
	  													var nestedKeys=null;
	        	  										  if(rowDataKeys != null){
	        	  											  nestedKeys=nestedKeyHeaders[ke];
	        	  										  }
	        	  										resultString= resultString +"<div style='text-indent:1%;display:block;border:1px solid white;'>";
        	  											resultString =resultString + checkTypeAndAppendHTML(va,rowDataKeys,nestedKeys);
        	  											resultString= resultString +"</div>";
	  												}
	  												else{
	  													if(rowDataKeys != null){
	        	  											if(nestedKeyHeaders.hasOwnProperty(key))
	        	  												{
	        	  												resultString = resultString+"<span style='display:none;'>\n</span>" + nestedKeyHeaders[key] +" : " + value +"<br />"
	        	  												}
	        	  										}
	        	  										else
	        	  										resultString = resultString+"<span style='display:none;'>\n</span>" + key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +" : " + value +"<br />"
	        	  										
	  												}
	  											});
	  											
	  										}else // object
	  										{
	  											resultString =resultString +"<div style='border-bottom:1px solid black'>";
	  											if($.type(element1[item1]) == 'object')
        	  									{
	  												$.each(element1[item1], function(key,value){
	        	  										if(rowDataKeys != null){
	        	  											if(nestedKeyHeaders.hasOwnProperty(key))
	        	  												{
	        	  												resultString = resultString +"<span style='display:none;'>\n</span>"+ nestedKeyHeaders[key] +" : " + value +"<br />"
	        	  												}
	        	  										}
	        	  										else								        	  											
	        	  										  resultString = resultString+"<span style='display:none;'>\n</span>" + key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +" : " + value +"<br />"
	        	  										
	        	  									});
        	  									}else
        	  									{
        	  										resultString = resultString +"<span style='display:none;'>\n</span>" + item1 +" : " + element1[item1] +"<br />"
        	  									}
        	  									resultString = resultString+"</div>";
	  										}
    	  									
        	  							}//for loop
	  								}else // main object
	  								{
	  									
	  									if($.type(rowDataElement[item]) == 'object')
	  									{
	  										resultString =resultString +"<div style='border-bottom:1px solid black'>";
    	  									$.each(rowDataElement[item], function(key,value)
    	  										{
        	  										if($.type(value) != 'object' && $.type(value) != 'array')
        	  										{
        	  											if(rowDataKeys != null){
		        	  											if(nestedKeyHeaders.hasOwnProperty(key))
		        	  												{
		        	  												resultString = resultString +"<span style='display:none;'>\n</span>"+ nestedKeyHeaders[key] +" : " + value +"<br />" ;
		        	  												}
		        	  										}
		        	  										else
		        	  											resultString = resultString +"<span style='display:none;'>\n</span>"+ key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +" : " + value +"<br />";
		        	  									
        	  										}
    	  										if($.type(value) == 'array'){
    	  											var nestedKeys=null;
    	  											htmlUIArray='';
  	  											    htmlUIObj='';
    	  										  if(rowDataKeys != null){
    	  											  nestedKeys=nestedKeyHeaders[key];
    	  										  }
    	  										resultString= resultString +"<div style='text-indent:1%;display:block;border:1px solid white;'>";
    	  											resultString =resultString+checkTypeAndAppendHTML(value,rowDataKeys,nestedKeys)
    	  											resultString= resultString +"</div>";
    	  										}//array
    	  										if($.type(value) == 'object'){
    	  											resultString =resultString +"<div style='border-bottom:1px solid black'>";
    	  											var nestedKeys=null;
  	  											    htmlUIObj='';
        	  										  if(rowDataKeys != null){
        	  											  nestedKeys=nestedKeyHeaders[key];
        	  										  }
    	  											resultString =resultString + extractObjectValue1(value,rowDataKeys,nestedKeys);
		        	  									
    	  										}
    	  									});
    	  									resultString = resultString+"</div>";
	  									}else
	  									{
	  										if(rowDataKeys != null){
	  											if(nestedKeyHeaders.hasOwnProperty(item))
	  												{
	  												resultString = resultString +"<span style='display:none;'>\n</span>"+ nestedKeyHeaders[item] +" : " + rowDataElement[item]+"<br />";
	  												}
	  										}
	  										else
	  										resultString = resultString +"<span style='display:none;'>\n</span>"+ item +" : " + rowDataElement[item] +"<br />"
	  									}
	  									//resultString = resultString+"</div>";
	  								}//end of main object
	  								
	  							}//for loop
  							return resultString;
  								}	//function content	
	  						}	//>1
	  					if(isErrorShouldAdd)
	  					 columnsList.push(propertiesMap);
					}//matching the description id with resonseParameter list
				}
			}
		}
		//uidev-------------------------------------------------

		
		$("#tol").text('');
		$("#getResponseDiv").css("max-height","unset");	
		$(".ui-paginator").css("width","auto");
		$("#paginationDD").css("display","none");
	/*	$.each(columnsList,function(key ,value){
			 if(jsonParsedArray != null){
				if(!(value.field in jsonParsedArray[0])){
					jsonParsedString[value.field]="No Data";
					
				}
				
			 }
						
		});*/ 
		
		if($.type(checkTypeOfData) == "array" && checkTypeOfData.length > 1 ){
			jsonParsedArray = checkTypeOfData;
			paginatorVal ={};
			paginatorVal.rows = 10;
		}
		else if($.type(checkTypeOfData) == "array" && checkTypeOfData.length == 1 ){
			jsonParsedArray[0] = checkTypeOfData[0];
			paginatorVal=null;
		}
		else {
			if($.type(checkTypeOfData) == 'object' && $.isEmptyObject(checkTypeOfData)==false)
				jsonParsedArray[0] = checkTypeOfData;
			if($.type(checkTypeOfData) == 'array' && checkTypeOfData.length !== 0)
				jsonParsedArray[0] = checkTypeOfData;
				paginatorVal=null;
		}
	//uidev-------------------------------------------------
		$("#getResponseDiv").css("height","auto");
		if(jsonParsedArray.length != 0)
		{
			fileName=poName+"_"+requestId+"_"+currentSubReqId;
			PO_NAME=poName;
			$("#getResponseDiv").prepend('<div id="resposeTableDiv" style="max-height:1500px;"></div>');
			 if(paginatorVal==null){
				 if(response.descriptionId.responseTypeFormat != null && (response.descriptionId.responseTypeFormat.toLowerCase() == 'image' || response.descriptionId.responseTypeFormat.toLowerCase() == 'pdf' || response.descriptionId.responseTypeFormat.toLowerCase() == 'tiff'))
				 {  							
					 var htmlUI='';
					  htmlUI=htmlUI+'<div>';
					  $.each(jsonParsedArray, function (idx) {			
						  $.each(jsonParsedArray[idx],function(key,value){	
							 var found;
							  var foundIdx;
							  $.map(columnsList, function(val,idx) {
				   					 if(val.field.toLowerCase()==key.toLowerCase()){
				   						 found=true;foundIdx=idx};
									});
							  if(found){
								  if(columnsList[foundIdx].responseFormat != null && (columnsList[foundIdx].responseFormat.toLowerCase() ==  'image' || columnsList[foundIdx].responseFormat.toLowerCase() ==  'pdf'))
								  {
									
									  if(jsonParsedArray[idx].image != null)
									  {
									  	//htmlUI=htmlUI+'<img src="'+"data:image/jpeg;base64,"+ jsonParsedArray[idx].image+'" />';
									  	if(jsonParsedArray[idx].format == 'jpg' || jsonParsedArray[idx].format == 'png' || jsonParsedArray[idx].format == 'gif'|| jsonParsedArray[idx].format == 'gif')
				        				{isImageData='image';
											htmlUI=htmlUI+'<img style="max-width: 100%;" src="'+"data:image/jpeg;base64,"+ jsonParsedArray[idx].image+'" />';
				        				}
				        			   if(jsonParsedArray[idx].format == 'pdf' )
				        				{
				        				    isImageData='pdf';
				        					htmlUI=htmlUI+'<div class="col-sm-12"><a class="float-right text-primary" download="Response_'+poName.toUpperCase()+'_'+currentSubReqId+'"  href="data:application/ '+jsonParsedArray[idx].format+';base64,'+ jsonParsedArray[idx].image+'"><span class="mdi mdi-arrow-down-bold-circle text-primary" style="font-size:1.4rem;"></span>Response file</a></div>';
				        					htmlUI=htmlUI+'<object width="100%" height="500px" style="overflow: auto;" type="application/pdf" data="'+"data:application/"+jsonParsedArray[idx].format+";base64,"+ jsonParsedArray[idx].image+'"></object>';
				        				}
				        			   if(jsonParsedArray[idx].format =='doc'||jsonParsedArray[idx].format =='docx' || jsonParsedArray[idx].format =='txt' || jsonParsedArray[idx].format == 'xls' || jsonParsedArray[idx].format =='xlsx')
				        				{
				        					isImageData='pdf';
				        					htmlUI=htmlUI+'<div class="col-sm-12" style="overflow:hidden;"><a class="text-primary" download="Response_'+poName.toUpperCase()+'_'+currentSubReqId+"."+jsonParsedArray[idx].format+'"  href="data:application/vnd.ms-'+jsonParsedArray[idx].format+';base64,'+ jsonParsedArray[idx].image+'"><span class="mdi mdi-arrow-down-bold-circle text-primary" style="font-size:2rem;padding:5px;"></span>DOWNLOAD RESPONSE</a></div>';
					        			}
				        			  
									  }
									  
									else{
                                            //added on 10 june 2020
										isImageData ='image'
                                            var imageBase64String =jsonParsedArray[idx][columnsList[foundIdx].field];
                                            if(imageBase64String != '')
                                                htmlUI=htmlUI+'<img src="'+"data:image/jpeg;base64,"+ imageBase64String+'" />';
                                        }
                               

								}
						  		else if(columnsList[foundIdx].responseFormat != null && columnsList[foundIdx].responseFormat.toLowerCase() == "tiff"){
						  		isImageData='image';
						  				var imgWidth=$("#getResponseDivDialog").innerWidth();
							  		    var dataURL=getTiffImageUrl(value);
							  	        htmlUI=htmlUI+'<img src="'+dataURL+'" style="padding:0px 20px;width:'+imgWidth+'px"/>';
						  	 		}
						  		else{
						  			isImageData ='image'
						  			if(isImageData =='')
						  		       isImageData='';
						  			  htmlUI= htmlUI +'<p>'+columnsList[foundIdx].headerText+"- <code  style='white-space: normal;'>"+value+'</code>'+'</p>';
								  }
							  }
							 });
							});// each of jsonParsedArray
					  htmlUI=htmlUI+'</div>';
					  $("#resposeTableDiv").html(htmlUI);
				 }
				 else{
					 	isImageData='';			
						renderResponseUIHTML2(jsonParsedArray,columnsList);
				 }
				//renderResponseUI(jsonParsedArray,columnsList);
				
			}
			else{ 
				isImageData='Table';
				scrollToTop();
		/*	if(poId == 8){
				ComplexUI(jsonParsedArray,columnsList)
			}*/
			//else{
				dataShown=jsonParsedArray;
				if(poId== 26 && CBIC_objData !==''){
					var htmld='';
					htmlUIObj='';
					if(CBIC_objData.hasOwnProperty("addressLine1") && CBIC_objData.hasOwnProperty("addressLine2")){
						CBIC_objData['address']= CBIC_objData["addressLine1"] +CBIC_objData["addressLine2"];
						delete CBIC_objData["addressLine1"];
						delete CBIC_objData["addressLine2"];
					}
					htmld=extractObjectValue1(CBIC_objData);
					
					$("#dataaboveTable").append(htmld);
				}
				$("#resposeTableDiv").customdatatable(
		           		{
		  	           		columns : columnsList,
		  	           		paginator:{rows : jsonParsedArray.length},
		  	           	   // scrollable: true,
		  	           		scrollHeight:'300',/*
		  	           		scrollWidth:'100%',*/
			  	          	//sortField : sortField,
			  	          	sortOrder : sortOrder,
			  	            stickyHeader:true,			  	          
			  	          	selectionMode: selectionMode,
			  	          	datasource : jsonParsedArray	
		           		});
						
						//if($("#getResponseDiv").next().attr('id') != "tol")
				 $("#getResponseDiv").on("scroll",function(e){
					  $(".ui-datatable >.ui-datatable-sticky").scrollLeft($("#getResponseDiv").scrollLeft());
				  })
						$('#tol').text("Total Records : "+jsonParsedArray.length);
						$(".ui-paginator").css("width",$("#resposeTableDiv")[0].scrollWidth);
						
						   $("#getResponseDiv").css("max-height","550px");
						
						$("#paginationDropdown").empty();
						var selectDroDown='<option value="'+jsonParsedArray.length+'">All</option>';
						if(jsonParsedArray.length>200){
							$("#paginationDD").css("display","block");
							var tlength=jsonParsedArray.length;
							var remainder = tlength % 100;
							var loopNum=tlength-remainder;
							var i=100;
							selectDroDown= selectDroDown +'<option value="'+i+'">'+i+'</option>';
							while (i< loopNum) {
							i=i+200;
							if(i < tlength)
								selectDroDown= selectDroDown +'<option value="'+i+'">'+i+'</option>';
							
							}
							
							$("#paginationDropdown").append(selectDroDown);
						}
						else{
							$("#paginationDD").css("display","none");
							$("#paginationDropdown").empty();
						}
						
						//$("#totalRecords").css("display","block");
						//$("#totalRecords").text("Total records : "+jsonParsedArray.length);
						
				//}
			}
		}
		else{ //jsonParsedArray is 0
			$("#dataaboveTable").empty();
			var  err= '<p>'+response.messageForNullRecord+'</p>';
			  
			$("#dataaboveTable").append(err);
			
		}
		if(isImageData =='image'){
				$("#jsonBtn").css("display","none");
				$("#csvBtn").css("display","none");
				$("#txtBtn").css("display","none");
				$("#xlsBtn").css("display","none");
				$("#docBtn").css("display","none");     					
				$("#pdfBtn").css("display","flex"); 
			}
			else if(isImageData =='pdf'){
				$("#jsonBtn").css("display","none");
				$("#csvBtn").css("display","none");
				$("#txtBtn").css("display","none");
				$("#xlsBtn").css("display","none");
				$("#docBtn").css("display","none");
				$("#pdfBtn").css("display","none");  
			}
			else if(isImageData == 'Table')
				{
					$("#jsonBtn").css("display","flex");
					$("#csvBtn").css("display","flex");
					$("#txtBtn").css("display","flex");
					$("#xlsBtn").css("display","flex");
					$("#docBtn").css("display","flex");     					
					$("#pdfBtn").css("display","none");
					
				}
			else{
				$("#jsonBtn").css("display","flex");
				$("#csvBtn").css("display","flex");
				$("#txtBtn").css("display","flex");
				$("#xlsBtn").css("display","flex");
				$("#docBtn").css("display","flex"); 
				$("#pdfBtn").css("display","flex"); 
			}
		}
}
function getTiffImageUrl(value){
	var myCanvas = document.createElement('canvas');
	    const tiff = new Tiff({ buffer: value });
  	const raster = tiff.readRGBAImage();
  	const width = tiff.width();
  	const height = tiff.height();
  	const context = myCanvas.getContext('2d');
  	myCanvas.width = width; // optional if never change
 	 	myCanvas.height = height; // optional if never change
  	const imageData = context.createImageData(width, height);
  	imageData.data.set( new Uint8Array(raster), 0, 0);
  	context.putImageData(imageData, 0, 0);
  	tiff.close(); 
  	var dataURL = myCanvas.toDataURL("image/jpeg");
		dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
		return dataURL;
}
function ComplexUI(array,propertiesMap){
	 var htmlUI='';
		
	  $.each(array, function (i) {	
		 // htmlUI=  htmlUI+'<hr/>';
		  htmlUI=htmlUI+'<table class="table table-striped" style= "border: 2px double black;margin-bottom:15px;">';
		 // htmlUI=htmlUI+'<thead class="" style="background:transparent;border-bottom:2px solid gray;">';
		  htmlUI=htmlUI+'<tr style="background:black;color:white;">';
		  htmlUI=htmlUI+'<td colspan="2">'+(i+1)+'</td>  </tr>';
		  htmlUI=htmlUI+'<tbody>';
		 
			  $.each(array[i],function(key,value){						
				  
	
				  var found;
				  var foundIdx;
				  $.map(propertiesMap, function(val,idx) {
	   					 if(val.field.split(".")[0]==key){ found=true;foundIdx=idx};
						});
				  if(found){
					  htmlUI=htmlUI+'<tr>';
					  //htmlUI=htmlUI+'<td class="font-weight-bold text-uppercase">'+propertiesMap[foundIdx].headerText+'</td>'; 
					  if(value !=null && value !=''){
							if($.type(value)=="object")
							{//first obj
								htmlUI= htmlUI +"<td>";
								htmlUI= htmlUI +propertiesMap[foundIdx].headerText;
								  $.each(value,function(key,value){	
									  if($.type(value)=="object"){
										  htmlUIObj='';
										  htmlUI= htmlUI + extractObjectValue1(value);
									 	
									  }
									  else{
									  htmlUI= htmlUI +"<div style='display:block;'>";
									  if(value != null && value!= ''&& $.isEmptyObject(value) ==false)
									  htmlUI= htmlUI +'<p>'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code  style='white-space: normal;'>"+value+"    "+'</code>'+'</p>';
									  htmlUI= htmlUI +"</div>";
									  }
								  });		
								  htmlUI= htmlUI +"</td>";
							}
							else if($.type(value)=="array"){
								htmlUI= htmlUI +"<tr>";
								 htmlUI= htmlUI + "<td colspan='2'><b>"+propertiesMap[foundIdx].headerText+"</b></td>";
								for(var item in value){
									
									  if($.type(value[item])=="object"){
										  $.each(value[item],function (kname,vname){
											if($.type(vname) == "object"){
												 htmlUI=htmlUI+'<tr><td colspan="2">';
												 htmlUIObj='';
												  htmlUI= htmlUI + extractObjectValue1(vname);
												  htmlUI=htmlUI+'</td></tr>';
												 
											  } 
											else if($.type(vname)=="array" && vname.length >0){
												
												 htmlUI=htmlUI+'<tr><td colspan="2">';
												
												htmlUI=htmlUI+"<h5 style='font-weight:bold;'>"+kname.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +': </h5>';
												htmlUI=htmlUI+'<table class="table table-bordered table-striped" style="display:block;max-width:1000px;overflow:auto;">';
												//htmlUI=htmlUI+'<thead class="thead-dark">';
												htmlUI=htmlUI+'<tr style="background:black;color:white;">';						        
													$.each(vname[0], function(k,v){
														htmlUI=htmlUI+'<td >'+k.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +'</td>';
													});
													htmlUI=htmlUI+  '</tr>';
													//'</thead>';
													//htmlUI= htmlUI+'<tbody>';
													for(var item2 in vname)
					  							{
														htmlUI =htmlUI +'<tr>';
													$.each(vname[item2], function(ke,val){
														htmlUI =htmlUI +'<td style="word-wrap: break-word;white-space: pre-wrap;">';
														htmlUI =htmlUI + val ;
														htmlUI =htmlUI +'</td>';
													});
													htmlUI =htmlUI +'</tr>';
					  							}
														
													//htmlUI=htmlUI+'</tbody>';
													htmlUI = htmlUI +'</table>';
													 htmlUI=htmlUI+'</td></tr>';
											}
											else{
												
												 htmlUI=htmlUI+'<tr>';
												 htmlUI= htmlUI +'<td>'+kname.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+" - "+vname+'</td>';
												 htmlUI=htmlUI+'</tr>';
											}
										  });//itearate object
										  htmlUI= htmlUI +"</td>";
									  }//object
									  else{
										  //if not object
										  
												htmlUI=htmlUI+'<table class="table table-bordered table-striped">';
												htmlUI=htmlUI+'<tr style="background:black;color:white;">';						        
													$.each(value[item][0], function(k,v){
														htmlUI=htmlUI+'<td>'+k.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase() +'</td>';
													});
													htmlUI=htmlUI+  '</tr>';
													htmlUI= htmlUI+'<tbody>';
													for(var item2 in value[item])
					  							{
														htmlUI =htmlUI +'<tr>';
													$.each(value[item][item2], function(ke,val){
														htmlUI =htmlUI +'<td style="word-wrap: break-word;white-space: pre-wrap;">';
														htmlUI =htmlUI + val ;
														htmlUI =htmlUI +'</td>';
													});
													htmlUI =htmlUI +'</tr>';
					  							}
														
													htmlUI=htmlUI+'</tbody>';
													htmlUI = htmlUI +'</table>';
										}
								}//for for value
								htmlUI= htmlUI +"</tr>";
							}//array main
							else{	htmlUI=htmlUI+'<td>'+"<b>"+propertiesMap[foundIdx].headerText+"</b> - "+value+'</td>';}
						}
						
						 else
							 htmlUI=htmlUI+'<td>'+"No Data"+'</td>';
					  
					  htmlUI=htmlUI+'</tr>';
				  }
						 
				
						
				
			  });//array[i]
			  htmlUI=htmlUI+'</tbody>';
			  htmlUI=htmlUI+'</table>';
			
	  });//array
	  
$("#resposeTableDiv").html(htmlUI);
}


var htmlUIArray ='';
var htmlUIObj='';
var fullArry=[];
var dataKeys=null;
var nestedKeyHeaders='';

function renderResponseUIHTML2(array,propertiesMap)
{
	$('#resposeTableDiv').scrollTop(0);
	  var htmlUI='';
	
	  htmlUI=htmlUI+'<table class="table table-bordered table-striped">';
	  htmlUI=htmlUI+'<thead class="thead-dark">';
	//  htmlUI=htmlUI+'<tr>';
	  htmlUI=htmlUI+'<th>Parameter</th>  <th>Value</th> </tr> </thead>';
	  htmlUI=htmlUI+'<tbody>';
	  
	  
	  for (var item in propertiesMap){
	
	  $.each(array, function (i) {			
			  $.each(array[i],function(key,value){						
				  
				  if(key == propertiesMap[item].field.split(".")[0]){
					  
					  if((propertiesMap[item].field.split(".")[0]).toLowerCase().includes("err"))
						{						
						if(propertiesMap[item].show_if_value_otherthen !== null && value != null && value.trim() == propertiesMap[item].show_if_value_otherthen.trim())					
							{
								return;
							}
						}
					  if (propertiesMap[item].field.includes('.')){
					   dataKeys=propertiesMap[item].field.split(".")[1];
					   /*
					   var temp=propertiesMap[item].field.split("."); 
						  var temp2=[]; temp2.push(temp.shift());temp2.push(temp.join('.'));
					   dataKeys=temp2[1];//propertiesMap[item].field.split(".")[1];						
						*/					   
					   
						if(dataKeys.includes('{')){
							nestedKeyHeaders=JSON.parse(dataKeys);
						}
						else{
							dataKeys = null;
						} 
					  }
					  htmlUI=htmlUI+'<tr>';
					  htmlUI=htmlUI+'<td class="font-weight-bold">'+propertiesMap[item].headerText+'</td>'; 
					  if(value !=null && value !=''){
		//object		
						  if($.type(value)=="object")
							{
								htmlUI= htmlUI +"<td>";
								  $.each(value,function(key,value){	
									  if($.type(value)=="object"){
										  htmlUIObj='';
										  var nestedKeys=null;
										  if(dataKeys != null){
											  nestedKeys=nestedKeyHeaders[key];
										  }
										  htmlUI= htmlUI + extractObjectValue1(value,dataKeys,nestedKeys);
										
									  }
									  else if($.type(value)=='array'){													 
										  htmlUIArray='';
										  htmlUIObj='';
										  var nestedKeys=null;
										  if(dataKeys != null){
											  nestedKeys=nestedKeyHeaders[key];
										  }
										  htmlUI= htmlUI +"<div style='text-indent:1%;display:block;border:1px solid white;'>";
										  htmlUI= htmlUI + checkTypeAndAppendHTML(value,dataKeys,nestedKeys);
										  htmlUI= htmlUI +"</div>";
									  }
									  else{  
										  if(propertiesMap[item].responseFormat == 'date' && propertiesMap[item].DateFormat != null )
										  {
											  try{
												  value= $.datepicker.formatDate( 'dd-mm-yy', $.datepicker.parseDate(propertiesMap[item].DateFormat,value));
											  }
											  catch(e)
											  	{ value=value;}
										  }
											  htmlUI= htmlUI +"<div style='display:block;'>";
											  if(value != null && value!= ''&& $.isEmptyObject(value) ==false)
												  {
												  if(dataKeys != null){
			  											if(nestedKeyHeaders.hasOwnProperty(key))
			  												{
			  												htmlUI= htmlUI+"<span style='display:none;'>\n</span>"+'<p style="max-width: 1100px;white-space: pre-wrap;">'+ nestedKeyHeaders[key] +" : " + value+'</p>'
			  												}
			  										}
												  else
													  htmlUI= htmlUI +"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code  style='white-space: normal;'>"+value+"    "+'</code>'+'</p>';
												  }
											  else{
												  if($.type(value) == 'number')
													  htmlUI= htmlUI +"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code  style='white-space: normal;'>"+value+"    "+'</code>'+'</p>';
											  }
											  htmlUI= htmlUI +"</div>";
									  }
								  });		
								  htmlUI= htmlUI +"</td>";
							}
	//array
						  else if($.type(value)=="array"){
							
								var higherArr=false;
								htmlUI= htmlUI +"<td>";
								 htmlUI= htmlUI +"<div id='arrayBlock' style='background: transparent;'>";
								var n=100;
								 var itr=1;
								 //fullArry=value;
							   /*if(value.length> n){
								   higherArr = true; 
								   value = value.slice(0,n);
							   }*/
								 $.each(value, function (k) {
									// htmlUI= htmlUI+"<p>"+k+"</p>";
									 if($.type(value[k])=="object"){
										 htmlUI= htmlUI +"<div  style='background: transparent;display:block;line-height:1rem;border-bottom:1px solid gray;'>";
										 
										  $.each(value[k],function(key,value){	
											 
											  if(value != null && value!= '' && $.isEmptyObject(value) ==false){
												  if($.type(value)=='array'){													 
													  htmlUIArray='';
													  htmlUIObj='';
													  var nestedKeys=null;
													  if(dataKeys != null){
														  nestedKeys=nestedKeyHeaders[key];
													  }
													  htmlUI= htmlUI+"<div style='text-indent:1%;display:block;border:1px solid white;white-space: pre-wrap;'>";
													  htmlUI= htmlUI + checkTypeAndAppendHTML(value,dataKeys,nestedKeys);
													  htmlUI= htmlUI +"</div>";
												  }
												  else if($.type(value)=='object'){
													  htmlUIObj='';
													  var nestedKeys=null;
													  if(dataKeys != null){
														  nestedKeys=nestedKeyHeaders[key];
													  }
													  htmlUI= htmlUI + extractObjectValue1(value,dataKeys,nestedKeys);
												  }
												else{
													  if(propertiesMap[item].responseFormat == 'date' && propertiesMap[item].DateFormat != null )
														  {
															  try{
																  value= $.datepicker.formatDate( 'dd-mm-yy', $.datepicker.parseDate(propertiesMap[item].DateFormat,value));
															  	}
															  catch(e){
																  value=value;
															  }
														  }
													 
													  if(dataKeys != null){
				  											if(nestedKeyHeaders.hasOwnProperty(key))
				  												{
				  												htmlUI= htmlUI+"<span style='display:none;'>\n</span>"+'<p style="max-width: 1100px;white-space: pre-wrap;">'+ nestedKeyHeaders[key] +" : " + value +'</p>';
				  												}
				  										}
													 else
													  htmlUI= htmlUI+"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code style='white-space: normal;'>"+value+"    "+'</code></p>';
												  }
											  }
											  else{
												  if($.type(value)=='number')
													  htmlUI= htmlUI+"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code style='white-space: normal;'>"+value+"    "+'</code></p>';
												 
											  }
											  
											 
										  });	
										  htmlUI= htmlUI +"</div>";
										
									 }
									 else if($.type(value[k])=="array"){
									 }
									 else{	
										  if(propertiesMap[item].responseFormat == 'date' && propertiesMap[item].DateFormat != null )
											  {
											  try{
											  	value[k]= $.datepicker.formatDate( 'dd-mm-yy', $.datepicker.parseDate(propertiesMap[item].DateFormat,value[k]));
											  	}
											  catch(e){
													value[k]=	value[k];
											  		}
											  }
										 
											 htmlUI= htmlUI+"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+"<code style='white-space: normal;'>"+value[k]+"    "+'</code></p>';
									 }
								 });
								 
								 //if(higherArr)
									// htmlUI= htmlUI +"<a id='loadBtn"+itr+"' href='javascript:onclick=loadmore("+itr+");' label class='badge badge-info1'>load more ...</a>"
									 htmlUI= htmlUI +"</div>"; 
								htmlUI= htmlUI +"</td>";
							}
			//string
						  else{
							  
							  if(propertiesMap[item].responseFormat == 'date' && propertiesMap[item].DateFormat != null )
								  {
									  try{
										  value= $.datepicker.formatDate( 'dd-mm-yy', $.datepicker.parseDate(propertiesMap[item].DateFormat,value));
									  }
									  catch(e)
									  {value=value;}
								  }
							 
							  htmlUI=htmlUI+'<td>'+value+'</td>';
						  }
						}
						
						 else
							 htmlUI=htmlUI+'<td>'+"No Data"+'</td>';
				  }
						 
				htmlUI=htmlUI+'</tr>';
						
				
			  });//array[i]
	 
	  });//array
	  }//for loop of propertyMap
	  htmlUI=htmlUI+'</tbody>';
	  htmlUI=htmlUI+'</table>';
	  
$("#resposeTableDiv").html(htmlUI);
}	
function loadmore(itr){
	var getBtnID='#'+"loadBtn"+itr;
	$(getBtnID).css("display","none");
	itr= itr+1;
	var htmlUImore=''; 
	var n = 100;
	var hideLoadBtn= true;
	var value;
	var startingIndex=[itr-1] * n;
	if(n* itr < fullArry.length){
		
		value= fullArry.slice(startingIndex+1,itr * n)
	}
	else{
		hideLoadBtn=false;
		value= fullArry.slice(startingIndex+1, fullArry.length)
	}
	//var value= rest.slice(0,10);
		//var value=value(0,10)		
		 $.each(value, function (k) {
			 htmlUImore= htmlUImore+"<p>"+k+"</p>";
			 htmlUImore= htmlUImore +"<div style='background:red;display:block;line-height:1rem;'>";
				 
				  $.each(value[k],function(key,value){	
					 
					  if(value != null && value!= '' && $.isEmptyObject(value) ==false){
						  if($.type(value)=='array'){													 
							  htmlUIArray='';
							  htmlUIObj='';
							  var nestedKeys=null;
							  if(dataKeys != null){
								  nestedKeys=nestedKeyHeaders[key];
							  }
							  htmlUImore= htmlUImore+"<div style='background:yellow;text-indent:1%;display:block;border:1px solid white;'>";
							  htmlUImore= htmlUImore + checkTypeAndAppendHTML(value,dataKeys,nestedKeys);
							  htmlUImore= htmlUImore +"</div>";
						  }
						  else if($.type(value)=='object'){
							  htmlUIObj='';
							  var nestedKeys=null;
							  if(dataKeys != null){
								  nestedKeys=nestedKeyHeaders[key];
							  }
							  htmlUImore= htmlUImore + extractObjectValue1(value,dataKeys,nestedKeys);
						  }
						else{
								  
							  if(dataKeys != null){
									if(nestedKeyHeaders.hasOwnProperty(key))
										{
										htmlUImore= htmlUImore+"<span style='display:none;'>\n</span>"+'<p style="max-width: 1100px;white-space: pre-wrap;">'+ nestedKeyHeaders[key] +" : " + value +'</p>';
										}
								}
							  else
								  htmlUImore= htmlUImore+"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code style='white-space: normal;'>"+value+"    "+'</code></p>';
						  }					  
					  }				  
					  else{
						  if($.type(value)=='number')
							  htmlUImore= htmlUImore+"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code style='white-space: normal;'>"+value+"    "+'</code></p>';
					  }
				  });	
				  htmlUImore= htmlUImore +"</div>";				
				  
 });
		 if(hideLoadBtn)
			 htmlUImore= htmlUImore +"<a id='loadBtn"+itr+"' href='javascript:onclick=loadmore("+itr+");' label class='badge badge-warning'>load more ...</a>" 
	 $("#arrayBlock").append(htmlUImore);
}
function extractObjectValue1(value,dataKeys,nestedKeyHeaders){
	/*var n=100;
	 var itr=1;
	 fullArry=value;
  if(value.length> n){
	   higherArr = true; 
	   value = value.slice(0,n);
  }*/
	
	$.each(value,function(key,val){
		if($.type(val)=="object"){
			htmlUIObj= htmlUIObj+ extractObjectValue1(val,dataKeys,nestedKeyHeaders[key]);
		}
		else if($.type(val)=="array")
			{
			htmlUIObj= htmlUIObj +"<div style='text-indent:2%;white-space: pre-wrap;display:block;border:1px solid white;'>";
			htmlUIObj=htmlUIObj+ checkTypeAndAppendHTML(val,dataKeys,nestedKeyHeaders[key])
			htmlUIObj=htmlUIObj+"</div>";
			
			}
		else{ /*htmlUIObj= htmlUIObj +"<div style='display:block;'>";*/
		
			  if(val != null && val!= ''&& $.isEmptyObject(val.toString()) == false){
				  if(dataKeys != null){
						if(nestedKeyHeaders.hasOwnProperty(key))
							{
							htmlUIObj= htmlUIObj+"<span style='display:none;'>\n</span>" +'<p style="text-indent: 0%;margin-left: 2%;margin-bottom:0px;">'+ nestedKeyHeaders[key] +" : " + val +"</p>"
							}
					}
				  else{
					  key=key.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase();
					 
					  htmlUIObj= htmlUIObj+"<span style='display:none;'>\n</span>"  +'<p style="text-indent: 0%;margin-left: 2%;margin-bottom:0px;">'+key+"- <code  style='white-space: normal;'>"+val+"    "+'</code>'+'</p>';	
					  }
				 /* htmlUIObj= htmlUIObj +"</div>";*/
			  }
			
		}
			});
	  return htmlUIObj;
}

function checkTypeAndAppendHTML(value,dataKeys,nestedKeyHeaders){
	 		//var htmlUIArray ='';
	
			 $.each(value, function (k) {
				 if($.type(value[k])=="object"){
					 htmlUIObj='';					 
					// htmlUIArray= htmlUIArray +"<div style='text-indent:1rem;display:block;border:1px solid white;'>";
					 htmlUIArray= htmlUIArray + extractObjectValue1(value[k],dataKeys,nestedKeyHeaders) ;
					// htmlUIArray= htmlUIArray +"</div>";
					 
					 htmlUIArray= htmlUIArray +"<span style='display:none;'>\n</span>";
					 htmlUIArray= htmlUIArray +"<hr style='border-color:white;margin:5px !important'/>";
				 }
				 else if($.type(value[k])=="array"){
					 htmlUIArray='';
					 htmlUIArray=htmlUIArray+checkTypeAndAppendHTML(value[k],dataKeys,nestedKeyHeaders);
					
				 }
				 else{
					 
					 htmlUIArray= htmlUIArray +"<span style='display:none;'>\n</span>" +'<p style="max-width: 1100px;white-space: pre-wrap;">'+k.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ').toUpperCase()+"- <code style='white-space: normal;'>"+value[k]+"    "+'</code></p>';
				 }
			 });
			  
	  return htmlUIArray;
}

function arrayBufferToBase64_main(c) {
    var d = $.base64.decode(c);
    return d
}
function adjustLongOption(){
	$('option').each(function () {
		  var text = $(this).text();
		  if (text.length > 50) {
		    text = text.substring(0, 49) + '...';
		    $(this).text(text);
		  }
		});
}


function getAllSecurityQuestion(f) {
    var d = {};
    var e = f;
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
        url: e + "/getSequrityQuestions",
        data: JSON.stringify(d),
        success: function(b) {
            if (b != null) {
            	b = JSON.parse(DOMPurify.sanitize(JSON.stringify(b), {SAFE_FOR_JQUERY: true}));
                securityQuestionList = b.questions;
                var a = '<option value="-1">--Please Select Security Question--</option>';
                for (element in securityQuestionList) {
                    a = a + '<option value="' + securityQuestionList[element].questionID + '">' + securityQuestionList[element].question + "</option>"
                }
                $("#subject").append(a);
                $("#category").append(a);
                $("#feedbackType").append(a)
            }
        },
        error: function(a, c, b) {
            var b = "Internal Server Error";
            if (a.responseJSON != null && a.responseJSON != "undefined" && a.responseJSON.message != null && a.responseJSON.message != "undefined") {
                b = a.responseJSON.message;
                if (b == "<%=Constant.SESSION_INVALID_ERR_CODE%>") {
                    window.location.href = "sessionInvalid"
                }
            }
            document.getElementById("snackbar").innerHTML = b;
            snakebarShow()
        }
    })
}
window.animatedSearchCall = function(b) {
    $(".search-btn").on("click", function() {
        $(".search-input").toggleClass("active").focus;
        $(this).toggleClass("animate");
        $("#Filter").val("")
    })
};
var storedValue = null;
if(window.location.hash != "")
var interval = setInterval(getNotificationData, 300000);//5min

function getNotificationData() {
    $.LoadingOverlay("hide");
    $("button.navbar-toggler").click(function() {
        $("#navbarNavDropdown").toggle()
    });
    var d = $.session.get("userData");
    if (d != null && d != "undefined") {
        var e = JSON.parse(d);
        var f = $.session.get("appUrl");
        data = {           
           
        };
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: false,
            global: false,
            contentType: "application/json",
            headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
            url: f + "/getnotifications",
            data: JSON.stringify(data),
            success: function(b) {
                if (b != null) {
                	b = JSON.parse(DOMPurify.sanitize(JSON.stringify(b), {SAFE_FOR_JQUERY: true}));
                    $("#notificationCount").text(b.allNotif.length);
                    $("#statement").text("You have " + b.allNotif.length + " new notifications");
                    $("#notificationCount_ua").text(b.allNotif.length);
                    $("#statement_ua").text("You have " + b.allNotif.length + " new notifications");
                    $("#notificationCount_ap").text(b.allNotif.length);
                    $("#statement_ap").text("You have " + b.allNotif.length + " new notifications");
                    if (JSON.stringify(storedValue) != JSON.stringify(b.allNotif)) {
                        var a = null;
                        a = b.allNotif;
                        setNotification(a);
                        storedValue = a
                    }
                    if ($("#notification").css("display") == "block") {
                        viewNotificationUpdate()
                    }
                } else {
                    document.getElementById("snackbar").innerHTML = "Failed to fetch the data!";
                    snakebarShow()
                }
            },
            error: function(a, c, b) {
                var b = "Internal Server Error";
                if (a.responseJSON != null && a.responseJSON != "undefined" && a.responseJSON.message != null && a.responseJSON.message != "undefined") {
                    b = a.responseJSON.message;
                    if (b == window.sessionInvalidCode) {
                       // window.location.href = "sessionInvalid"
                    }
                }
                document.getElementById("snackbar").innerHTML = b;
                snakebarShow()
            }
        })
    }
}

function setNotification(k) {
    clearInterval(interval);
    loadViewNotificationStructure();
    var m = "";
    var j = ["mdi mdi-alert-circle-outline mx-0", "mdi mdi-comment-text-outline mx-0", "mdi mdi-email-outline mx-0", "mdi mdi-gamepad mx-0", "mdi  mdi-leaf mx-0", "mdi mdi-tab mx-0", "mdi mdi-multiplication-box mx-0"];
    var n = [];
    var l = {};
    for (var h = 0; h < k.length; h++) {
        if ($.inArray(k[h].notificationType, n) == -1) {
            l[k[h].notificationType] = []
        }
        l[k[h].notificationType].push(k[h]);
        n.push(k[h].notificationType)
    }
    window.notiArray = l;
    var o = 0;
    $.each(l, function(a, c) {
    	
        var b = '<a class="dropdown-item preview-item" href="javascript:onclick=viewNotification(&quot;' + a + '&quot;)">';
        b = b + '<div class="preview-thumbnail"><div class="preview-icon bg-success"><i class="' + j[o] + '"></i>';
        b = b + "</div></div>";
        b = b + '<div class="preview-item-content">';
        b = b + '<h6 class="preview-subject font-weight-medium text-light">' + a + "</h6>";
        b = b + '<p class="font-weight-light small-text" style="text-shadow:none;color:#ffff;">Notification Count: <b>' + c.length + "</b>";
        b = b + " </p></div> </a>";
        b = b + '<div class="dropdown-divider"></div>';
        m = m + b;
        o++
    });
    $("#notificationList").empty();
    $("#notificationList").html(m);
    $("#notificationList_ua").empty();
    $("#notificationList_ua").html(m);
    $("#notificationList_ap").empty();
    $("#notificationList_ap").html(m)
}
$(document).on("click", ".navbar-collapse.show", function(b) {
    $(this).collapse("hide")
});
var viewNotiArray;
var roleID;
function viewNotification(f) {
    var d = $.session.get("userData");
    if (d != null && d != "undefined") {
        var e = JSON.parse(d);
        roleID=e.roleId;
        /*$("#actionNoti").css("display", "block")
        if (e.roleId == 2) {
            $("#actionNoti").css("display", "block")
        } else {
            $("#actionNoti").css("display", "none");
        }*/
    }
    $("#viewTitle").text(f);
    $("#cancel").click(function(a) {
        $("#notification").css("display", "none");
        $("#notefade").css("display", "none");
        updateNotification(viewNotiArray);
        a.preventDefault()
    });
    $("#notification").css("display", "block");
    $("#notefade").css("display", "block");
    $.each(window.notiArray, function(b, a) {
        if (b == f) {
            $("#viewNotification").customdatatable("option", "datasource", a);
            viewNotiArray = a
        }
    })
}

function viewNotificationUpdate() {
    $.each(window.notiArray, function(d, c) {
        if (d == $("#viewTitle").text()) {
            $("#viewNotification").customdatatable("option", "datasource", c);
            viewNotiArray = c
        }
    })
}

window.downloadJasper=function() {
    var b = document.createElement("a");
    b.href = "downloadJasper";
    document.body.appendChild(b);
    b.click()
}
window.updateNotification = function(k) {
    var n = $.session.get("userData");
    if (n != null && n != "undefined") {
        var j = JSON.parse(n);
        var l = {
            notifications: [],
            userId: j.userId
        };
        var o = [];
        for (i = 0; i < k.length; i++) {
            var h = {};
            h.notificationId = k[i].notificationId;
            h.isRead = "Y";
            h.readtAt = new Date();
            o.push(h)
        }
        if (o.length > 0) {
            l.notifications = o;
            var m = $.session.get("appUrl");
            $.ajax({
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
                url: m + "/updatenotifications",
                data: JSON.stringify(l),
                success: function(a) {
                    if (a != null) {
                    	a = JSON.parse(DOMPurify.sanitize(JSON.stringify(a), {SAFE_FOR_JQUERY: true}));
                        getNotificationData()
                    }
                },
                error: function(a, c, b) {
                   /* var b = "Internal Server Error";
                    if (a.responseJSON != null && a.responseJSON != "undefined" && a.responseJSON.message != null && a.responseJSON.message != "undefined") {
                        b = a.responseJSON.message;
                        if (b == window.sessionInvalidCode) {
                           // window.location.href = "sessionInvalid"
                        }
                    }
                    document.getElementById("snackbar").innerHTML = b;
                    snakebarShow();*/
                }
            })
        }
    }
};
$("#actionNoti").click(function(b) {
    $("#notification").css("display", "none");
    $("#notefade").css("display", "none");
 
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("notificationValues", JSON.stringify(viewNotiArray))
    }
    if (viewNotiArray[0].notificationType.includes("Assigned")) {
        $("#main-content-wrapper").load("assign_case");
        window.location.hash = "assign_case"
    } 
   
    else {
        if (viewNotiArray[0].notificationType.includes("Revoked")) {
            $("#main-content-wrapper").load("revoke_user");
            window.location.hash = "revoke_user"
        } else {
            if (viewNotiArray[0].notificationType.includes("Transfer Initiated")) {
                $("#main-content-wrapper").load("transfer");
                window.location.hash = "transfer"
            }
        }
    }
    updateNotification(viewNotiArray)
});
$(document).ajaxStart(function() {
    $.LoadingOverlay("show")
});
$(document).ajaxComplete(function() {
    $.LoadingOverlay("hide")
});

function loadViewNotificationStructure() {
    $("#viewNotification").customdatatable({
        paginator: {
            rows: 10
        },
        columns: [{
            field: "sno",
            headerText: "S.No.",
            headerStyle: "width:30px",
            bodyStyle: "word-wrap: break-word;text-align:center;",
            content: function(b) {
                return this.data.indexOf(b) + 1
            }
        }, {
            field: "referenceId",
            headerText: "Detail",
            headerStyle: "width:100px",
            bodyStyle: "word-wrap: break-word;text-align:center;",
            content: function(b) {
            	var ref_id;
            	var obj = JSON.stringify(b);
            	if(b.referenceName != null)
            	ref_id= "<a style='text-decoration:underline !important;color:#308ee0' href='javascript:onclick=goForAction("+obj+");'>"+b.referenceName + "-" + b.referenceId +"</a>";
				else            			
            	ref_id="<a style='text-decoration:underline !important;color:#308ee0' href='javascript:onclick=goForAction("+obj+");'>"+"Reference Id : " + b.referenceId +"</a>";
            	return ref_id;
            }
        }, {
            field: "createdBy",
            headerText: "Created By",
            headerStyle: "width:85px",
            bodyStyle: "word-wrap: break-word;text-align:center;",
            sortable: true
        }, {
            field: "createdAt",
            headerText: "Time",
            headerStyle: "width:85px",
            bodyStyle: "word-wrap: break-word;text-align:center;",
            sortable: true
        }, {
            field: "message",
            headerText: "Message",
            headerStyle: "width:100px",
            bodyStyle: "word-wrap: break-word;",
            sortable: true
        }, {
            field: "notifcationCatagory",
            headerText: "Catagory",
            headerStyle: "width:85px",
            bodyStyle: "word-wrap: break-word;text-align:center;",
            sortable: true
        }, {
            field: "notificationDescription",
            headerText: "Description",
            headerStyle: "width:100px",
            bodyStyle: "word-wrap: break-word;",
            sortable: true
        }
        ],
        datasource: []
    })
}

//redirect for user action on notification
function goForAction(obj){
	
	 $("#notification").css("display", "none");
     $("#notefade").css("display", "none");
     updateNotification(viewNotiArray);
	 var d = $.session.get("userData");
	 var user_details = JSON.parse(d);
	 var role_id= user_details.roleId;
	 
	 if (obj.notificationType.toLowerCase().includes("password change")) {
	    	if(role_id ==2){
	    		 $("#main-content-wrapper").load("change_user_password");
	    	        window.location.hash = "change_user_password";
	    	}
	    	else if (role_id == 5){
	    		 $("#main-content-wrapper").load("change_user_password_approver");
	    	        window.location.hash = "change_user_password_approver";
	    	}
	    	else{
	    		 $("#main-content-wrapper").load("change_user_password_ua");
	    	        window.location.hash = "change_user_password_ua";
	    	}
	       
	    }
	 if(obj.notificationType.toLowerCase().includes("feedback")){
		 $("#main-content-wrapper").load("feedback_view");
	        window.location.hash = "feedback_view";
	 }
	 if (obj.notificationType.toLowerCase().includes("request") && role_id == 3) {

		 sessionStorage.setItem("notificationRequestID",  obj.referenceId);
		 $("#main-content-wrapper").load("search_request_ua");
	        window.location.hash = "search_request_ua";
	 }
	 if ((obj.notificationType.toLowerCase().includes("case") || obj.notificationType.toLowerCase().includes("transfer approved"))&& role_id==3) {
		 $("#main-content-wrapper").load("case_view_dynamic_ui");
	        window.location.hash = "case_view_dynamic_ui";
	 }
	 if (obj.notificationType.toLowerCase().includes("closing") && role_id==2) {
		 $("#main-content-wrapper").load("case_view");
	        window.location.hash = "case_view";
	 }
	 if (obj.notificationType.toLowerCase().includes("transfer initiated") && role_id == 2) {
		 
		 	sessionStorage.setItem("notificationCaseID",  obj.referenceId);
		     $("#main-content-wrapper").load("transfer");
             window.location.hash = "transfer";
	 }
	 if (obj.notificationType.toLowerCase().includes("approver mapping") && role_id == 5) {
		 	
	 }
	 if (obj.notificationType.toLowerCase().includes("approval pending") && role_id == 5) {
		 sessionStorage.setItem("notificationCaseID",  obj.referenceId);
	     $("#main-content-wrapper").load("approval_page");
         window.location.hash = "approval_page";
 	
	 }
	
}
function getActionView(f, d, e) {
    if (e.includes("Assigned")) {
        window.pageNavigation = "notification";
        window.location.href = "assign_case"
    }
}

function validateField(c, d) {
    validateFieldWithElement($("#" + c), d)
}

function validateFieldWithElement(m, o) {
    var j = true;
    var k = $(m);
    if (k.attr("required")) {
        if (k.val().length == 0) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".required"
            });
            return false
        }
    } else {
        if (k.val().length == 0) {
            return j
        }
    }
    if (k.attr("maxlength")) {
        var h = k.attr("maxlength");
        if (k.val().length > Number(h)) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".maxlength"
            });
            j = false
        }
    }
    var l = false;
    if (k.attr("isDouble")) {
        if (!/^-?(\d*\.)?\d*$/.test(k.val())) {
            l = true
        }
    }
    if (k.attr("isNumber")) {
        if (!/^\d+$/.test(k.val())) {
            l = true
        }
    }
    if (k.attr("isEmail")) {
        if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(k.val())) {
            l = true
        }
    }
    if (k.attr("isHHMM12")) {
        if (!/^(0?[1-9]|1[012])(:[0-5]\d)$/.test(k.val())) {
            l = true
        }
    }
    if (!k.attr("isChinese")) {
        if (/[\u4E00-\u9FA5]+/.test(k.val())) {
            l = true
        }
    }
    if (k.attr("isLogin")) {
        if (!/^[a-z0-9A-Z]+$/.test(k.val())) {
            l = true
        }
    }
    if (k.attr("isDateTime")) {
        if (!/^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$/.test(k.val())) {
            l = true
        }
    }
    if (l) {
        o.push({
            summary: "",
            detail: k.attr("id") + ".format"
        });
        j = false
    }
    if (k.attr("isPassword")) {
        if (k.val().length < 8) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".format.minlen"
            });
            j = false
        }
        if (!/[a-z]+/.test(k.val())) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".format.lowercase"
            });
            j = false
        }
        if (!/[A-Z]+/.test(k.val())) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".format.uppercase"
            });
            j = false
        }
        if (!/\d+/.test(k.val())) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".format.digit"
            });
            j = false
        }
        if (!/[!@#$%^&*]+/.test(k.val())) {
            o.push({
                summary: "",
                detail: k.attr("id") + ".format.symbol"
            });
            j = false
        }
    }
    var n = false;
    if (k.attr("isPositiveInteger")) {
        if (!(/^\d+$/.test(k.val()) && k.val() > 0)) {
            n = true
        }
    }
    if (k.attr("isWithinOne")) {
        if (!(k.val() <= 1 && k.val() >= -1)) {
            n = true
        }
    }
    if (n) {
        o.push({
            summary: "",
            detail: k.attr("id") + ".valueformat"
        });
        j = false
    }
    return j
}

function validateEnglishOnly(k, l) {
    var h = true;
    var j = $("#" + k);
    var g = false;
    var m = /[^\w\s\-(\])\\~!@#$%^&*()_+{}:"|<>?`=[;',./]+/;
    if (m.test(j.val())) {
        g = true
    }
    if (g) {
        l.push({
            summary: "",
            detail: j.attr("id") + ".format"
        });
        h = false
    }
    return h
}

function validateYearWithElement(A, v) {
    var p = true;
    var y = $("#" + A);
    var r = false;
    if (y.attr("isTypeInDate")) {
        var u = new Date().getFullYear();
        var w = y.val().split(/-|\s|:/);
        var q = new Date(w[1] + "-" + w[0] + "-" + w[2] + " " + w[3] + ":" + w[4]);
        var t = new Date();
        var x = new Date(t.setYear(t.getFullYear() + 10));
        var C = new Date();
        var s = new Date(C.setYear(C.getFullYear() - 10));
        var B = x - q;
        var z = s - q;
        if (B < 0 || z > 0) {
            r = true
        }
    }
    if (r) {
        v.push({
            summary: "",
            detail: y.attr("id") + ".time"
        });
        p = false
    }
}

function scrollToTop() {
    $("html, body").animate({
        scrollTop: 0
    }, 10)
}

function scrollToElement(b) {
    $("html, body").animate({
        scrollTop: $(b).offset().top
    }, 10)
}

function getDefaultJSDate(e) {
    var f = e.split("-");
    var d = f[2].split(" ");
    return d[0] + "-" + f[1] + "-" + f[0] + " " + d[1]
}

function clearHighlightedElments(b) {
    $(b).css("border", "1px solid #c5dbec")
}

function highlightElments(b) {
    $(b).css("border", "1px solid #FF0000")
}

function setPuiDialogAutoSizing(e, d, f) {
    $("#" + e).css({
        height: d,
        width: f
    });
    $("#" + e + " .ui-dialog-content").css({
        height: "93%",
        width: "100%",
        padding: "0 0 0 0"
    })
}
$(document).keydown(function(b) {
    if (b.keyCode == 8) {
        if ($(b.target).is("input, textarea")) {
            if (!$(b.target).prop("readonly") && !$(b.target).prop("disabled")) {
                return
            }
        }
        b.preventDefault()
    }
    if (b.keyCode === 27) {
        if ($("#UserDetailDlg").length) {
            if ($("#UserDetailDlg").is(":visible")) {
                cancelUserDetailDialog()
            }
        }
        if ($("#emailContactEditDlg").length) {
            if ($("#emailContactEditDlg").is(":visible")) {
                cancelEmailContactDialog()
            }
        }
        if ($("#FaxContactEditDlg").length) {
            if ($("#FaxContactEditDlg").is(":visible")) {
                cancelFaxContactDialog()
            }
        }
        if ($("#landmarkEditDlg").length) {
            if ($("#landmarkEditDlg").is(":visible")) {
                cancelLandmarkDialog()
            }
        }
        if ($("#cctvLocationEditDlg").length) {
            if ($("#cctvLocationEditDlg").is(":visible")) {
                cancelCctvLocationDialog()
            }
        }
        if ($("#PtiContactEditDlg").length) {
            if ($("#PtiContactEditDlg").is(":visible")) {
                cancelPtiContactDialog()
            }
        }
        if ($("#SmsContactEditDlg").length) {
            if ($("#SmsContactEditDlg").is(":visible")) {
                cancelSmsContactDialog()
            }
        }
        if ($("#UserEditDlg").length) {
            if ($("#UserEditDlg").is(":visible")) {
                cancelUserDialog()
            }
        }
        if ($("#ipPhoneTrunkEditDlg").length) {
            if ($("#ipPhoneTrunkEditDlg").is(":visible")) {
                cancelIpPhoneTrunkDialog()
            }
        }
        if ($("#ipPhoneDevicePcMappingEditDlg").length) {
            if ($("#ipPhoneDevicePcMappingEditDlg").is(":visible")) {
                cancelIpPhoneDevicePcMappingDialog()
            }
        }
        if ($("#desHkpfCodeEditDlg").length) {
            if ($("#desHkpfCodeEditDlg").is(":visible")) {
                cancelDesHkpfCodeDialog()
            }
        }
        if ($("#desFsdCodeEditDlg").length) {
            if ($("#desFsdCodeEditDlg").is(":visible")) {
                cancelDesFsdCodeDialog()
            }
        }
        if ($("#ipPhoneContactEditDlg").length) {
            if ($("#ipPhoneContactEditDlg").is(":visible")) {
                cancelIpPhoneContactDialog()
            }
        }
        if ($("#ipPhoneContactGroupEditDlg").length) {
            if ($("#ipPhoneContactGroupEditDlg").is(":visible")) {
                cancelIpPhoneContactGroupDialog()
            }
        }
    }
});

function nowDay() {
    var e = new Date();
    var f = e.getDate();
    var h = e.getMonth() + 1;
    var g = e.getFullYear();
    if (f < 10) {
        f = "0" + f
    }
    if (h < 10) {
        h = "0" + h
    }
    e = f + "-" + h + "-" + g;
    return e
}

function dayFormatDDMMYYYY(d) {
    d = d.split("-");
    var c = new Date(d[2], d[1] - 1, d[0]);
    return c
}

function nowDayTime() {
    var b = new Date();
    return b
}

function dayTimeFormatDDMMYYYY(d) {
    d = d.split(/\D/);
    var c = new Date(d[2], d[1] - 1, d[0], d[3], d[4]);
    return c
}

function currentDate() {
    today = new Date();
    datetime = lpadZero(today.getDate()) + "-" + lpadZero((today.getMonth() + 1)) + "-" + today.getFullYear();
    return datetime
}

function currentTime() {
    today = new Date();
    datetime = lpadZero(today.getHours()) + ":" + lpadZero(today.getMinutes());
    return datetime
}

function currentDateAndTime() {
    datetime = currentDate() + " " + currentTime();
    return datetime
}

function lpadZero(b) {
    return (b < 10 ? "0" : "") + b
}

function moveSearchTabToLeft() {
    $("#imPanelLeft").append($("#searchTabView").detach())
}

function moveSearchTabToRight() {
    $("#imPanelRight").append($("#searchTabView").detach())
}

function reloadIPPhoneContactSuggestion(b) {
    ipPhonePanel.reloadSuggestionTable(b)
}

function updateGisIncidentIdByIncidentId(u, s, n, r, q, t, l, m, o, p) {
    url = "im/incident/imIncident/updateGisInformationIncidentId/" + s + "/" + u + "?locationEn=" + n + "&locationChi=" + r + "&nearLandmarkEn=" + q + "&nearLandmarkChi=" + t + "&district=" + l + "&routeType=" + m + "&routeId=" + o + "&incidentSource=" + p;
    $.ajax({
        url: url,
        dataType: "json",
        type: "POST",
        error: function(a) {
            showMsg("error", "Error", '<spring:message code="error.00100"/>');
            gisPanel.deleteLocationChangeFromIM(u)
        },
        success: function(a) {
        	a = JSON.parse(DOMPurify.sanitize(JSON.stringify(a), {SAFE_FOR_JQUERY: true}));
            if (a.result == 0) {
                if ($('input[name="updateUser"]').length > 0) {
                    $('input[name="updateUser"]').val(a.lastUpdBy)
                }
                if ($('input[name="updateDateStr"]').length > 0) {
                    $('input[name="updateDateStr"]').val(a.lastUpdDate)
                }
                if ($('input[name="gisIncidentId"]').length > 0) {
                    $('input[name="gisIncidentId"]').val(u)
                }
                if ($("#hasGisCoordinateLabel").length > 0) {
                    $("#hasGisCoordinateLabel").text("Yes")
                }
            } else {
                showMsg("error", "Error", '<spring:message code="error.00100"/>');
                gisPanel.deleteLocationChangeFromIM(u)
            }
        }
    })
}

function kbestOn() {
    $("#trKbestSeverity").show();
    $("#btnKbestTcss").show();
    $("#btnKbestVms").show();
    $("#btnKbestBbi").show();
    $("#btnEditSuggestion").show();
    $("#btnKbestDiversion").show();
    $("#editSuggestionBN").show();
    $("#editSuggestionVMS").show();
    gisPanel.kbestDiversionSuggestionOn();
    gisPanel.kbestProjectedQueueSuggestionOn();
    ipPhonePanel.kbestAtcSuggestionOn()
}

function kbestPartial() {
    $("#trKbestSeverity").show();
    $("#btnKbestTcss").hide();
    $("#btnKbestVms").hide();
    $("#btnKbestBbi").hide();
    $("#btnEditSuggestion").hide();
    $("#btnKbestDiversion").hide();
    $("#editSuggestionBN").hide();
    $("#editSuggestionVMS").hide();
    gisPanel.kbestDiversionSuggestionOff();
    gisPanel.kbestProjectedQueueSuggestionOff();
    ipPhonePanel.kbestAtcSuggestionOff()
}

function kbestOff() {
    $("#trKbestSeverity").hide();
    $("#btnKbestTcss").hide();
    $("#btnKbestVms").hide();
    $("#btnKbestBbi").hide();
    $("#btnEditSuggestion").hide();
    $("#btnKbestDiversion").hide();
    $("#editSuggestionBN").hide();
    $("#editSuggestionVMS").hide();
    gisPanel.kbestDiversionSuggestionOff();
    gisPanel.kbestProjectedQueueSuggestionOff();
    ipPhonePanel.kbestAtcSuggestionOff()
}

function showNoRecordMessage(c, d) {
    $("#" + d).addClass("noResultMessageDiv");
    $("#" + d).append("<span class='pui-messages-summary'>" + c + "</span>")
}

function loadRightPanel(b) {
    $("#imPanelRight").load(b)
}

function validateAidSpecialChar(k, l) {
    var h = true;
    var j = $("#" + k);
    var g = false;
    var m = /[#%]/;
    if (m.test(j.val())) {
        g = true
    }
    if (g) {
        l.push({
            summary: "",
            detail: j.attr("id") + ".format"
        });
        h = false
    }
    return h
}

function getDateWithTimeStamp(d) {
    var e = new Date(Date.now());
    var f = e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    return (d + " " + f)
}

function getDateWithTimeStampFrom(date)
{ 	//var now = new Date(Date.now());
   var dt = date.split('-')[2] + "-" + date.split('-')[1] + "-" + date.split('-')[0];
	var formatted ="00:00:00"; //now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();	
	return (dt +" "+formatted);
}
function getDateWithTimeStampTo(date)
{   var dt = date.split('-')[2] + "-" + date.split('-')[1] + "-" + date.split('-')[0];
	//var now = new Date(Date.now());
	var formatted = "23:59:59";//now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();	
	return (dt +" "+formatted);

}

function getMasterTableData(baseUrl,type) {
    var g = [];
    var h = {
        masterType: type
    };

    $.ajax({
        type: "POST",
        dataType: "json",
        async:false,
        contentType: "application/json",
        headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
        url: baseUrl + "/getMasterData",
        data: JSON.stringify(h),
        success: function(a) {
            if (a != null) {
            	a = JSON.parse(DOMPurify.sanitize(JSON.stringify(a), {SAFE_FOR_JQUERY: true}));
                g = a.resultObject
            }
        },
        error: function(a, c, b) {
            /*var b = "Internal Server Error";
            if (a.responseJSON != null && a.responseJSON != "undefined" && a.responseJSON.message != null && a.responseJSON.message != "undefined") {
                b = a.responseJSON.message;
                if (b == 9999) {
                    window.location.href = "sessionInvalid"
                }
                g = null
            }
            modalShow(b)*/
        }
    });
    return g
}

function modalShow(f) {
    $("#myModalBody1").html("");
    $("#myModalBody1").html(f);
    var d = $("#myModal");
    var e = $("span.close");
    e.click(function() {
        d.css("display", "none")
    });
    $("#modalClose").click(function() {
        d.css("display", "none");
        $("#myModalBody1").html("")
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}

function modalwithResubmitOption(msg){
	   $("#reBody").html("");
	    $("#reBody").html(msg);
	    var d = $("#reModal");
	    var e = $("span.close");
	    e.click(function() {
	        d.css("display", "none")
	    });
	    $("#reClose").click(function() {
	        d.css("display", "none");
	        $("#reBody").html("")
	    });
	    d.css("display", "block");
	    window.onclick = function(a) {
	        if (a.target == d) {
	            d.style.display = "none"
	        }
	    }
}
function exportLimitModal() {
    //$("#dontShow").prop("checked",false);
    var d = $("#msgExportLimit");
    var e = $("span.close");
    e.click(function() {
        d.css("display", "none")
    });
    $("#msgExportLimitClose").click(function() {
        d.css("display", "none");
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}
function validationShow(msg){
	 $("#validationModalBody").html("");
    $("#validationModalBody").html(msg);
    var d = $("#validationModal");
    var e = $("span.close");
    e.click(function() {
        d.css("display", "none")
    });
    $("#validationModalClose").click(function() {
        d.css("display", "none");
        $("#validationModalBody").html("")
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}

$("#previewRequestCreation_modalCancelbtn").click(function(b) {
    $(".modal").modal("hide")
});

function resultModalShow(f) {
    $("#resultModalBody").html("");
    $("#resultModalBody").html(f);
    var d = $("#ResultModal");
    var e = $("#resultSpanClose");
    e.click(function() {
        $(".modal").modal("hide");
        d.css("display", "none")
    });
    $("#modalClose").click(function() {
        $('.modal').modal('hide') // closes all active pop ups.
        $('.modal-backdrop').remove();// removes the grey overlay.
        d.css("display", "none");
        $("#resultModalBody").html("")
    });
    $("#resultModalClose").click(function() {
        $(".modal").modal("hide");
        d.css("display", "none")
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}

function saveModalShow(c) {
    $("#saveModalBody").html("");
    $("#saveModalBody").html(c);
    var d = $("#saveModal");
    $("#saveModalClose").click(function() {
        d.css("display", "none");
        $("#saveModalBody").html("")
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}

function deleteRequestModalShow(msg) {
    $("#deleteRequestModalBody").html("");
    $("#deleteRequestModalBody").html(msg);
    var deleteModal = $("#deleteRequest");
    $("#deleteModalClose").click(function() {
    	deleteModal.css("display", "none");
        $("#deleteRequestModalBody").html("")
    });
    deleteModal.css("display", "block");
    window.onclick = function(a) {
        if (a.target == deleteModal) {
        	deleteModal.style.display = "none"
        }
    }
}
function helpFaqs() {
    var b = $("#helpFaqsModal");
    $("#helpFaqsModalClose").click(function() {
        b.css("display", "none")
    });
    $("#usermanual,#faqs").click(function() {
        b.css("display", "none");
        //document.getElementById("snackbar").innerHTML = "Please wait file is downloading.";
        //snakebarShow();
    });
    b.css("display", "block");
    window.onclick = function(a) {
        if (a.target == b) {
            b.style.display = "none"
        }
    }
}

function contactUs() {
    var b = $("#CUModal");
    $("#CUModalClose").click(function() {
        b.css("display", "none")
    });
   
    b.css("display", "block");
    window.onclick = function(a) {
        if (a.target == b) {
            b.style.display = "none"
        }
    }
}

function selectIOforAssignmentModal(){
	 
    var modal= $("#selectIOforAssignment");
   
    $("#caseMappingClose").click(function() {
    	modal.css("display", "none");
      
    });
    modal.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
        	modal.style.display = "none"
        }
    }
}

function viewSubRequestDlg() {
   /* document.getElementById("viewSubRequestDlg").style.display = "block";
    document.getElementById("fade2").style.display = "block"*/
	
	    var e = $("#viewSubRequestDlg");
	  
	    $("#modalCancel,span.close").click(function() {
	        e.css("display", "none")
	    });
	   
	    e.css("display", "block");
	    window.onclick = function(a) {
	        if (a.target == e) {
	            e.style.display = "none"
	        }
	    }
}
function feedbackModal(){
	 var modal = $('#viewFeedbackModal');
	 modal.css("display","block")
	 $("#closeFeedback").click(function(){
			//$("#myModalTwoParagraph").html('');
		 modal.css("display","none");
		});
	window.onclick = function(event) {
	    if (event.target == modal) {
	    	modal.style.display = "none";
	    }
	}
}

function modalShowTwo(f) {
    $("#myModalTwoParagraph").text("");
    $("#myModalTwoParagraph").text(f);
    var e = $("#myModalTwo");
    var d = $("span.close");
    d.click(function() {
        e.css("display", "none")
    });
    $("#modalCancel").click(function() {
        $("#myModalTwoParagraph").html("");
        e.css("display", "none")
    });
    e.css("display", "block");
    window.onclick = function(a) {
        if (a.target == e) {
            e.style.display = "none"
        }
    }
}

function myModalRequest(f) {
    $("#myModalRequestParagraph").text("");
    $("#myModalRequestParagraph").text(f);
    var e = $("#myModalRequest");
    var d = $("span.close");
    d.click(function() {
        e.css("display", "none")
    });
    e.css("display", "block");
    window.onclick = function(a) {
        if (a.target == e) {
            e.style.display = "none"
        }
    }
}

function reportConfirmModal() {
    var d;
    d = $("#reportModal");
    var c = $("span.close");
    c.click(function() {
        d.css("display", "none")
    });
    $("#modalCancel").click(function() {
        d.css("display", "none")
    });
    d.css("display", "block");
    window.onclick = function(a) {
        if (a.target == d) {
            d.style.display = "none"
        }
    }
}

function modalShowYesNo(f) {
    $("#content").text(f);
    var e = $("#yesNoModal");
    var d = $("span.close");
    d.click(function() {
        e.css("display", "none")
    });
    $("#modalNo").click(function() {
        e.css("display", "none")
    });
    e.css("display", "block");
    window.onclick = function(a) {
        if (a.target == e) {}
    }
}

/*function openAgreementModal(){
	
   var d = $("#agreementModal");   
   $("#agreeCancel").click(function() {
       d.css("display", "none");
   });
   d.css("display", "block");
   window.onclick = function(a) {
       if (a.target == d) {
           d.style.display = "none"
       }
   }
}*/
function onlyAlphanumericSpaceDot(value){
	var regValidation= new RegExp(/^[a-zA-Z0-9\s.]*$/);
	 var result = regValidation.test(value);
	return (!result);
}
function checkNotAllowedCharacters(b) {
	 if (b) {
    	//b.indexOf("@") >= 0 ||b.indexOf("@") >= 0 |||| b.indexOf("#") >= 0 
		
        if ( b.indexOf("!") >= 0 ||b.indexOf("$") >= 0 || b.indexOf("^") >= 0||b.indexOf("<") >= 0 || b.indexOf(">") >= 0 || b.indexOf("\\") >= 0 || b.indexOf("%") >= 0 || b.indexOf("(") >= 0 || b.indexOf(")") >= 0 || b.indexOf("&") >= 0 || b.indexOf("+") >= 0) {
            return true
        } else {
            return false
        }
    }
}

function checkNotAllowedCharactersWithPlus(b) {
	var regValidation= new RegExp(/^[a-zA-Z0-9\s.+]*$/);
	 var result = regValidation.test(b);
	return (!result);
 if (b) {
        if (b.indexOf("@") >= 0 || b.indexOf("*") >= 0 || b.indexOf("!") >= 0 ||b.indexOf("$") >= 0 || b.indexOf("^") >= 0||b.indexOf("<") >= 0 || b.indexOf(">") >= 0 || b.indexOf("\\") >= 0 || b.indexOf("%") >= 0 || b.indexOf("(") >= 0 || b.indexOf(")") >= 0 || b.indexOf("&") >= 0) {
            return true
        } else {
            return false
        }
    }
}

function tableIntoPDF2(k, o, l) {

    var quotes = document.getElementById(k);

    html2canvas(quotes, {
        onrendered: function(canvas) {

        //! MAKE YOUR PDF
        var pdf = new jsPDF('p', 'pt', 'letter');

        for (var i = 0; i <= quotes.clientHeight/980; i++) {
            //! This is all just html2canvas stuff
            var srcImg  = canvas;
            var sX      = 0;
            var sY      = 980*i; // start 980 pixels down for every new page
            var sWidth  = 900;
            var sHeight = 980;
            var dX      = 0;
            var dY      = 0;
            var dWidth  = 900;
            var dHeight = 980;

            window.onePageCanvas = document.createElement("canvas");
            onePageCanvas.setAttribute('width', 900);
            onePageCanvas.setAttribute('height', 980);
            var ctx = onePageCanvas.getContext('2d');
            // details on this usage of this function: 
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

            // document.body.appendChild(canvas);
            var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

            var width         = onePageCanvas.width;
            var height        = onePageCanvas.clientHeight;

            //! If we're on anything other than the first page,
            // add another page
            if (i > 0) {
                pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
            }
            //! now we declare that we're working on that page
            pdf.setPage(i+1);
            //! now we add content to that page!
            pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save('test.pdf');
    }
  });
}
function tableIntoPDF(k, o, l) {
    var j = new jsPDF("p", "pt", "letter");    
    var n = o + ".pdf";
    var h = $("#" + k)[0];
    var m = document.createElement("div");
    m = h;
    j.setFontSize(8);
    $("#"+k).css("font-size","10px");
    specialElementHandlers = {
        "#ignore": function(b, a) {
            return true
        },
    ".close": function(b, a) {
        	return true
    	}
    };
    margins = {
            top: 20,
            bottom: 20,
            left: 40,
            width: 800
        };

	   //j.setFont('ARIALUNI');
	   j.fromHTML(m, margins.left, margins.top, {
	        width: margins.width,
	        elementHandlers: specialElementHandlers
	    }, function(a) {
	        j.save(n)
	    }, margins)

}


var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getFormattedDate(c) {
    var d = new Date(c);
    return d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear()
}

function getPageName() {
    var d = window.location.href.lastIndexOf("/") + 1,
        f = window.location.href.substr(d),
        e = f.split(".")[0];
    if (e == "change_user_password" || e == "change_user_password_ua" || e == "about_page" || e == "case_mgmt") {
        $("#extendedFooter").show();
        document.getElementById("extendedFooter").style.display = "block"
    }
}
var sidebar_selected;

function getSideBar(b) {
    if (b == 2) {
        sidebar_selected = "sidebar_no"
    } else {
        if (b == 5) {
            sidebar_selected = "sidebar_approver"
        } else {
            sidebar_selected = "sidebar_ua"
        }
    }
}
function sortByDate(a,b){
	 var value1 =Date.parse(a.split(" ")[0].split("-")[1] +"/"+a.split(" ")[0].split("-")[0]+"/"+a.split(" ")[0].split("-")[2] +" " +a.split(" ")[1]);
	 var value2 =Date.parse(b.split(" ")[0].split("-")[1] +"/"+b.split(" ")[0].split("-")[0]+"/"+b.split(" ")[0].split("-")[2]  +" " +b.split(" ")[1]);
	 return value2 - value1;

}

function getSideBarToggleHandler() {
    $("#sdbar").on("click", function() {
        var b = "#" + sidebar_selected;
        $(b).toggleClass("active");
        $(b).css("position", "absolute");
        if ($(b).hasClass("active")) {
            $(b).show();
            document.getElementById("fade").style.display = "block"
        } else {
            $(b).hide();
            document.getElementById("fade").style.display = "none"
        }
    })
}

function userDownloadedResponseFile(d) {
    var c = {};
    c.isDownLoaded = "Y";
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        headers:{"X-XSRF-TOKEN":getCSRFToken("XSRF-TOKEN")},
        url: d + "/updateresponse",
        data: JSON.stringify(c),
        success: function(a) {}
    })
}
$(window).scroll(function() {
    var b = $(window).scrollTop();
    if (document.getElementById("scrollTop") != null) {
        if (b > 20) {
            $("#scrollTop").fadeIn()
        } else {
            $("#scrollTop").fadeOut()
        }
    }
});

$(document).ready(function(){
	
    if (document.getElementById("scrollTop") != null) {
        $("#scrollTop").click(function(b) {
            b.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false
        })
    }
   // $.ajaxSetup({ cache: false });
});

function myLoadFunction() {
    $.LoadingOverlay("show")
}

function onClickOnLogout() {
    $("#logout").modal()
}

function onClickLogoutCancel() {
    document.getElementById("logoutDivDialog").style.display = "none";
    document.getElementById("fade_logout").style.display = "none"
}

function getAllowedCaseStatus(status){
	var valid =false;
	if (status =="under investigation" || status =="transfer requested" || status =="closed"){
		valid = true;
	}
	else{
		valid =false;
	}
	return valid;
}
function checkdoubleExt(name){
	var ext= name.split(".");
	var doubleEx = false;
	if(ext.length > 2)
		doubleEx =true;
	else
		doubleEx =false;
	return doubleEx ;
}
function snakebarShow() {
    var b = document.getElementById("snackbar");
    b.className = "show";
    setTimeout(function() {
        b.className = b.className.replace("show", "")
    }, 1000)
}
window.history.forward();

function noBack() {
    if (navigator.appName == "NAT GRID") {
        window.history.forward(1)
    } else {
        window.history.forward(-1)
    }
}
function hideBodyScroll(){
	 var body = document.body;
	  body.style.height = '100vh';
	  body.style.overflowY = 'hidden';
}
function showBodyScrollAgain(){
	var body = document.body;
	  var scrollY = body.style.top;
	  body.style.position = '';
	  body.style.top = '';
	  body.style.height = '';
	  body.style.overflowY = '';
	  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}
history.pushState(null, null, $(location).attr("href"));
window.addEventListener("popstate", function() {
    history.pushState(null, null, $(location).attr("href"))
});

var LRUNode= function(key) {
	  this.key = key;
	  this.next = this.prev = null;
	}

	// -----------------------------------------

	// doubly-linked list based LRUCache
//	    set(key, value)
//	    get(key)
//	    bubbleUp(key)
	var LRUCache = function(capacity) {  
	  this.capacity = capacity;
	  this.head = this.tail = null;
	  this.length = 0;
	  this.data = {};
	  this.nodeRefs = {};
	}

	// set the value, if it already exists, bubble up the key.
	// if it doesn't exist, set the key to the head.
	// if it reaches capacity, remove the tail to make room.
	// time complexity: O(1)
	LRUCache.prototype.set = function(key, value) {
	  // check to see if data exists.
	  if (this.data[key]) {
	    // bubble up the key
	    this.bubbleUp(key);
	    
	    // update existing value
	    this.data[key] = value;
	  } else {
	    // data doesn't exist, update new head
	    var head = new LRUNode(key);
	    
	    // build key linked list
	    if (this.head === null && this.tail === null) {
	      this.head = head;
	      this.tail = head;
	      
	      this.head.next = this.tail;
	      this.tail.prev = this.head;
	    } else {
	      this.head.prev = head;
	      head.next = this.head;
	      this.head = head;
	    }
	    
	    // save a reference to the node for faster bubbleUp
	    this.nodeRefs[head.key] = head;
	    
	    // increment size
	    this.length += 1;
	    
	    // check capacity
	    if (this.length > this.capacity) {
	      // remove tail
	      var tail = this.tail;
	      this.tail = tail.prev;
	      this.length -= 1;
	      
	      // delete data and refs
	      delete this.data[tail.key];
	      delete this.nodeRefs[tail.key];
	    }
	    
	    // set new data
	    this.data[key] = value;
	  }
	};

	// get the value. since the value is used,
	// we bubble up the key to the head.
	// time complexity: O(1)
	LRUCache.prototype.get = function(key) {
	  // check to see if data exists.
	  if (this.data[key]) {
	    // bubble up the key
	    this.bubbleUp(key);
	    
	    // return data
	    return this.data[key];
	  }
	  
	  return null;
	};

	// bubble up the key to the front.
	// time complexity: O(1)
	LRUCache.prototype.bubbleUp = function(key) {
	  // make sure the ref exists, and is not the head node
	  if (this.nodeRefs[key] && this.nodeRefs[key] !== this.head) {
	    var prefRef = this.nodeRefs[key].prev;
	    var nextRef = this.nodeRefs[key].next;
	    
	    prefRef.next = nextRef;
	    nextRef.prev = prefRef;
	    
	    this.head.prev = this.nodeRefs[key];
	    this.nodeRefs[key].next = this.head;
	    this.head = this.nodeRefs[key];
	  }
	};
	
	
