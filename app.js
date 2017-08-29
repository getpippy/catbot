$(document).ready(function(){
	$("#transcript").append('<div class="msg bot first">Welcome to WebChat!<div class="whobot who">Us</div></div><br class="clear"/>');
});

function send()
{
	var q = $("#q").val();
	if(q == "")
	{
		return 0;
		$("#q").focus();
	}
	$("#q").val("");
	$($("#transcript").find(".msg")[$("#transcript").find(".msg").length-1]).removeClass("bottom");
	$("#transcript").append('<div class="msg user">'+q+'<div class="whouser who">You</div></div><br class="clear"/>');
	var url = "api.php?q="+encodeURI(q);
	$("#transcript").append('<div class="msg bot loader bottom"><span id="loadergif"></span><div class="whobot who">Us</div></div><br class="clear"/>');
	hideSuggestions();
	var div = $('#transcript');
	div.scrollTop(div.get(0).scrollHeight);
	$.getJSON(url, function(data){
		var msg = "";
		if(data.length == 0 && q.length > 4)
		{
			msg = "WebChat was unable to handle your request";
		} 
		else
		{
			msg = data['speech'];
		}
		if(typeof data['suggestions'] !== 'undefined' && data['suggestions'].length != 0)
		{
			var suggestionsHTML = "";
			for(var i = 0; i < data['suggestions'].length; i++)
			{
				suggestionsHTML = suggestionsHTML+'<div class="suggestion" onclick="sendSuggestion(this)">'+data['suggestions'][i]+'</div>';
			}
			$("#suggestionsParent").html(suggestionsHTML);
			showSuggestions();
		}
      	$($("#transcript").find(".msg")[$("#transcript").find(".msg").length-1]).html(msg+'<div class="whobot who">Us</div>');
      	$($("#transcript").find(".msg")[$("#transcript").find(".msg").length-1]).removeClass("loader");
      	$($("#transcript").find(".msg")[$("#transcript").find(".msg").length-1]).addClass("bottom");
		var div = $('#transcript');
		div.scrollTop(div.get(0).scrollHeight);
		$(".loader").hide();
    });
}

function detectEnter(e){
    if(e.keyCode === 13){
        e.preventDefault(); 
        send();
    }
}

function hideSuggestions(){
	$("#suggestionOverlay").animate({"bottom":"-50px","opacity":"0"},function(){
		$("#suggestionOverlay").css({"display":"none"});
	});
}

function showSuggestions(){
	$("#suggestionOverlay").stop().css({"display":"block"}).queue(function() {
		$("#suggestionOverlay").animate({"bottom":"50px","opacity":"1"});
	   $(this).dequeue();
	});
}

function sendSuggestion(obj){
	$("#q").val($(obj).text());
	send();
}

function closeWindow(){
	self.close();
}

function newSession(){
	window.location.reload(false); 
}