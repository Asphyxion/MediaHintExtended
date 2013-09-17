var MediaHintStatus = {
	TurnOn: function() {
			chrome.proxy.settings.set({
				value: {
					mode: "pac_script",
					pacScript: {
						url: "https://mediahint.com/default.pac"
					}
				}, scope: "regular"
			});
			
			localStorage["turnedon"] = true;
			MediaHintStatus.SetStatus();

	},
	
	TurnOff: function() {
		chrome.proxy.settings.clear({
			scope: 'regular'
		}, function() {});
		localStorage["turnedon"] = false;
		MediaHintStatus.SetStatus();
	},
	
	Switch: function() {
		if (!toBool(localStorage["turnedon"])) 
		{
			MediaHintStatus.TurnOn();
		}
		else 
		{
			MediaHintStatus.TurnOff();
		}
	},
	
	SetStatus: function() {
		if (toBool(localStorage["turnedon"])) 
		{
			imagewrapper.className = "sprite-check-icon";
			//chrome.browserAction.setIcon({path: 'icon_128_ok.png'})
			textwrapper.innerHTML = "MediaHint is active.";
		}
		else 
		{
			imagewrapper.className = "sprite-delete-icon";
			//chrome.browserAction.setIcon({path: 'icon_128.png'})
			textwrapper.innerHTML = "MediaHint is inactive.";
		}
	}
};

function toBool(str)
{
   if ("false" === str)
      return false;
   else 
      return str;
}

var imagewrapper;
var textwrapper;

document.addEventListener('DOMContentLoaded', function() {
    imagewrapper = document.getElementById('statusimagewrapper');
	textwrapper = document.getElementById('statustextwrapper');
    // onClick's logic below:
    imagewrapper.addEventListener('click', function() {
        MediaHintStatus.Switch();
    });
	
	MediaHintStatus.SetStatus();
});
