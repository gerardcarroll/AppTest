$(document).ready(function() {
	
	//var apiUrl = 'http://api-selectunes.azurewebsites.net/api/';
	//var apiUrl = 'http://localhost:51887/api/';
	var apiUrl = 'http://selectunes-api.azurewebsites.net/api/';
	var value = 0;
	
		
	trac = {Id:"", Name:"",Logo:"",Artist:"",LastPlayed:""};
	owner = {Id:"",Name:""};
	
	var lastSelections = [];
	
	/*$(function(){
		setTimeout(hideSplash,2500);
	});
	
	function hideSplash(){
		$.mobile.changePage("#page", "fade");
	}*/
	
	/*$(function(){
		setTimeout(getVenueList,3000);
	});*/
	getVenueList();
	
	function getVenueList(){
		
		$.mobile.loading( 'show', {
			text: 'Loading Available Venues',
			textVisible: true,
			theme: 'a',
			html: ""
		});
		
		
		$.getJSON(apiUrl + 'venue/')
            .done(function (data) {
				$.each(data, function (index, data) {
					owner.Id = data.ownerID;
					owner.Name = data.ownerName;
					
                    $('<li id=' + owner.Id + '><a><img src="css/images/nightlife.jpg" class="ui-li-thumb"><h2 id="ownerVenueName" class="ui-li-heading">' + owner.Name + '</h2><p class="ui-li-desc">More Info Here</p></a></li>').appendTo($('#venueview'));										
					$.mobile.hidePageLoadingMsg();
					$('#venueview').listview('refresh');								
                });    				          
			});
	}
/*
	//When a venue is selected	
		$("#venueview").on('click', 'li', function() {     
		
		$("#playing").empty();		
				
		$('<li style="font-size:16px">Now Playing</li>').appendTo($('#playing'));	   
		
		owner.Id = $(this).attr('id');
		owner.Name = $("#ownerVenueName").text();
		
		$("#venueName").text(owner.Name);	
		
		$.mobile.changePage("#page2", "pop");
		
		$("#ownerInfo").text("Welcome to our venue");
		$("#ownerInstruct").text("Tap record below to Select!");
				
		
		$(function(){
			
			setTimeout(getNowPlaying,0);
			
			});
                
                function getNowPlaying(){
                        
              		$.getJSON(apiUrl + 'playing?ownerid=' + owner.Id)
                    	.done(function (data){
                        $.each(data, function (index, data) {
                        trac = {Id : data.Id, Name : data.Name, Artist : data.Artist, LastPlayed : data.TimeSincePlayed }
												
						var displayTime = getTimeDiff(trac.LastPlayed);
                        $('<li id =' + trac.Id + '><h3>' + trac.Name + '</h3><p> ' + trac.Artist + '</p><p><strong>' + displayTime + '</strong></p></li>').appendTo($('#playing'));
                                        
                        $('#playing').listview('refresh');                
                        });
                   	});					
					
					//get selected tracks
					$.getJSON(apiUrl + 'SelectTracks?ownerid=' + owner.Id)
                    	.done(function (data){
							
						for( i = 0; i < data.length; i++)
						{
							lastSelections.push(data[i].Id);							
						}						
							
                        $.each(data, function (index, data) {
                        selectTrac = {Id : data.Id, Name : data.Name, Artist : data.Artist }
						
                        $('<li id =' + selectTrac.Id + '>' + selectTrac.Name + '</li>').appendTo($('#nextTracks'));
                                        
                        $('#nextTracks').listview('refresh');                
                        });
                   	});
                }        
				
		getAllArtists();
		
		getAllTracks();
		
		});//end of venue selected
		
		nowPlaying();	
		
		function nowPlaying(){
			
			var lastTrack = trac.Id;
			var flag = false;
			
			$.getJSON(apiUrl + 'playing?ownerid=' + owner.Id)
				.done(function (data){
					/*if(data.length = 0)
					{
						$("#nextTracks").empty();	
					}*/
/*	
					$.each(data, function (index, data) {						
						trac = {Id : data.Id, Name : data.Name, Artist : data.Artist, LastPlayed : data.TimeSincePlayed }
						
							var displayTime = getTimeDiff(trac.LastPlayed);
							$("#playing").empty();									
							$('<li style="font-size:16px">Now Playing</li>').appendTo($('#playing'));
							$('<li id =' + trac.Id + '><h3>' + trac.Name + '</h3><p> ' + trac.Artist + '</p><p><strong>' + displayTime + '</strong></p></li>').appendTo($('#playing'));
							
							$('#playing').listview('refresh');
						/*}//end if*/
/*					});
					
					
			//get selected tracks
					$.getJSON(apiUrl + 'SelectTracks?ownerid=' + owner.Id)
                    	.done(function (data){
							//alert(data.length);
							if(data.length < 1)
							{
								//alert("got here");
								$("#nextTracks").empty();	
							}
							for(i = 0; i < data.length; i++)
							{	
								t = {Id : data[i].Id}
														
								if(t.Id != lastSelections[i])
								{
									flag = true;	
									$("#nextTracks").empty();									
								}
							}
                        $.each(data, function (index, data) {
							
							if(flag)
							{																
								selectTrac = {Id : data.Id, Name : data.Name, Artist : data.Artist }
								$('<li id =' + selectTrac.Id + '>' + selectTrac.Name + '</li>').appendTo($('#nextTracks'));
							}
							
							$('#nextTracks').listview('refresh');
						                                        
                        });
						
                   	});
					
				});

    		setTimeout(nowPlaying, 20000);
		}			
		
		function getTimeDiff(startTime){
			
			var starttime  = startTime
			var currentdate = new Date(); 
			
			var displayTime = "";
			
			var endtime = currentdate;
			
				starttime = new Date(starttime);
				endtime = new Date(endtime);
			
				var diff = endtime - starttime;

				var diffSeconds = diff/1000;
				//alert(diffSeconds)			
				var mins = diffSeconds/60;
				
				/*if(mins > 10)
				{
					//alert("got here");
					$("#playingText").text("Last Played");
					$("#playing").listview('refresh');
				}*/
				
/*				if(mins > 1440)
				{
					var days = Math.floor(mins/1440);
					return days + ' d ago';					
				}
				else if(mins > 59)
				{
					var hrs = Math.floor(mins/60);
					return hrs + ' h ago';					
				}
				else
				{   
					mins = Math.floor(mins)
					if(mins < 1)
					{
						return '< 1m ago';						
					}
					else
					{
						return mins + ' m ago';	
					}					
    			}						
			
		}
		
		
		$("#nextTrackList").on('click', 'li', function() {
			
			$("#nextTrackList").empty();
			$('<li style="font-size:16px"><a id="upNext">Selected Upcoming Tracks<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">Show</span></a></li>').appendTo($('#nextTrackList'));
						
			$.getJSON(apiUrl + 'playing?ownerid=' + owner.Id)
				.done(function (data){
					$.each(data, function (index, data) {
						trac = {Id : data.Id, Name : data.Name, Artist : data.Artist}
						
						$('<li id =' + trac.Id + ' class="ui-li ui-li-static ui-btn-up-c ui-li-has-thumb"><img id=' + trac.Logo + ' src="css/images/nightlife.jpg" class="ui-li-thumb"><h2 class="ui-li-heading">' + trac.Name + '</h2><p class="ui-li-desc"> ' + trac.Artist + '</p></li>').appendTo($('#nextTrackList'));
						
						$('#nextTrackList').listview('refresh');		
					});
				});
					
			
		});//end of upcoming track show
		
		
		$("#selectTrack").on('click', this, function() {
			
			$("#venueName2").text(owner.Name);
			
			$.mobile.changePage("#page3", "pop");
			
			$("#tracks").removeClass("ui-disabled");
			$("#artists").addClass("ui-disabled");
						
			$("#listView").css("display", "none");					
			
			$("#artistView").css("display","block");
			
			$("#artistView").listview('refresh');
						
			
		}); // end of selectTrack click
		
		
		$("#artists").on('click', this, function() {
			
			$("#tracks").removeClass("ui-disabled");
			$("#artists").addClass("ui-disabled");			
						
			$("#listView").css("display","none");
			
			$("#artistView").css("display","block");
			
			$("#artistView").listview('refresh');		
						
			
		});//end of artist click
		
		$("#tracks").on('click', this, function() {
			
			$("#tracks").addClass("ui-disabled");
			$("#artists").removeClass("ui-disabled");
			
			$("#artistView").css("display","none");
			$("#artistList").empty();
			
			$("#listView").css("display","block");			
			
			$('#listView').listview('refresh');
						
		});
		
		function getAllArtists(){	
				
				$.getJSON(apiUrl + 'artist/' + owner.Id)
				.done(function (data) {						
					renderArtistItems(data);  
				});	
		}
		
		function renderArtistItems(artists){	
			
			$("#artistView").empty();
			
			if(!artists)		
			{
				$("#artistView").html('<p> No Data Found </p>');
				return;
			}
			
			(function looper2(i) {
			
			art = {Id : artists[i].Id, Name : artists[i].Name, Tracks : artists[i].TrackCount}
			
			$('<li id=' + art.Id + '><a>' + art.Name + '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">Tracks ' + art.Tracks + ' </span></a></li>').appendTo($('#artistView'));
			
			setTimeout(function () {
			  if (++i < artists.length)
			  {				  			  	
				//when not yet the last item, repeat
				looper2(i);
			  }
			  else
			  {	
				$('#artistView').listview('refresh');				
			  }
			}, 5);
		
			//start with index 0
		  }(0));
			
		}
		
		
		
		function getAllTracks(){
				$.getJSON(apiUrl + 'trackingtracks/' + owner.Id)
				.done(function (data) {
					renderTrackItems(data);
									          
				});			
			
		}
		
		function renderTrackItems(tracks){
			$("#listView").empty();
			
			if (!tracks) {
				
				$("#listView").html('<p> No Data Found </p>');
				return;
			  }			 			  			  		
			  
			(function looper(i) {
			
			trac = {Id : tracks[i].Id, Name : tracks[i].Name, Artist : tracks[i].Artist}
			
			$('<li id=' + trac.Id + '><a><h4>' + trac.Name + '</h4><p>' + trac.Artist + '</p></a></li>').appendTo($('#listView'));
			
			
			setTimeout(function () {
			  if (++i < tracks.length)
			  {				  			  	
				//when not yet the last item, repeat
				looper(i);
			  }
			  else
			  {				
				$('#listView').listview('refresh');				
			  }
			}, 5);
		
			//start with index 0
		  }(0));
		  
			$("#selectTrack").attr('src', 'css/images/recordSpinner.gif');
			
		}
			
			
		//When a track is selected	
		$("#listView").on('click', 'li', function() {            
		
		track = {
			Id: $(this).attr('id'),
			Name: $(this).text()       			    
        };		
			var x = track.Id;
			var aID = '' + x + 'a';
			
		$('#listview').listview('refresh');
		
		$.support.cors = true;       
        //Post the track id to API
        $.ajax({
            url: (apiUrl + 'selecttracks/'),
            type: 'POST',
            data: JSON.stringify('='+track.Id.toString()), 
			dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
							
				alert("Your Track will play Shortly");
            },
            error: function (data, err) {
				//alert(data);
				alert("Failed");
            },
			
        });			
			
	});
	
	
	$("#artistView").on('click', 'li', function (){
		
		$("#artistView").css("display","none");
		
		$("#artistList").empty();		
		
		$("#artistList").css("display","block");		
		
		$.mobile.loading( 'show', {
			text: 'Loading Tracks',
			textVisible: true,
			theme: 'a',
			html: ""
		});
		
		artist = {
			Id: $(this).attr('id')			     			    
        };
		
		$.getJSON(apiUrl + 'artist?ownerid=' + owner.Id + '&artistid=' + artist.Id)
				.done(function (data) {						
					$.each(data, function (index, track) {
						trac = {Id : track.Id, Name : track.Name}						
						$('<li id=' + trac.Id + '><a id=' + trac.Id +'a>' + trac.Name + '</a></li>').appendTo($('#artistList'));										
						$.mobile.hidePageLoadingMsg();
						$('#artistList').listview('refresh');
						});    										          
				});		
		
	});	
	
	//When a track is selected	
		$("#artistList").on('click', 'li', function() {            
		
		track = {
			Id: $(this).attr('id'),
			Name: $(this).text()       			    
        };		
			var x = track.Id;
			var aID = '' + x + 'a';
			
		$('#artistList').listview('refresh');
		
		$.support.cors = true;       
        //Post the track id to API
        $.ajax({
            url: (apiUrl + 'selecttracks/'),
            type: 'POST',
            data: JSON.stringify('='+track.Id.toString()), 
			dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
							
				alert("Your Track will play Shortly");
            },
            error: function (data, err) {
				//alert(data);
				alert("Failed");
            },
			
        });			
			
	});
	
*/			
});//end document.ready()