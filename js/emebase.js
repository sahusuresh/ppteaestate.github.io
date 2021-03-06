function owlCarouselBanner(element, args){
	if( $(element).length>0 ){
		$(element).owlCarousel(args);
	}
}

function googleTranslateElementInit() {

	var json = $("#google_translate_data").val(); 
	translate_data = JSON.parse(json);

	var gaEnabled = false;

	if(translate_data.gaId){ gaEnabled=true; }

	new google.translate.TranslateElement( {layout: google.translate.TranslateElement.InlineLayout.SIMPLE , pageLanguage: translate_data.pageLanguage, includedLanguages: translate_data.includedLanguages.toString() ,  gaTrack: gaEnabled, gaId: translate_data.gaId.toString()}, 'google_translate_element');

}

/*if (google.maps){
		alert('LOADED');
	}else{
		alert('NOT LOADED');
	}*/

	//Load Google map for Contact oage
function loadGoogleMap( args ){

    var mapTitle            = args['map_title'];
    var mapLatitude         = args['map_latitude'];
    var mapLongitude        = args['map_longitude'];
    var mapZoomLevel        = args['map_zoom_level'];
    var mapType             = args['map_type'];
    var mapStyleCode        = args['map_style_code'];
    var mapMaker            = args['map_maker'];
    var mapInfoWindow       = args['map_info_window'];
    var mapMultLoc          = args['map_mult_loc'];
    var mapCanvasLocation   = args['map_canvas_location'];
    var mapAvailability     = args['map_availability'];
    var themeDir = $('#themeDir').val();    
    var blog_name = "EME Base Site";

    var stockholm   = new google.maps.LatLng(mapLatitude, mapLongitude);
    var parliament  = new google.maps.LatLng(mapLatitude, mapLongitude);
    var marker;
    var map;
    var infowindow  = new google.maps.InfoWindow({ content: mapInfoWindow });
/*    var contentString;*/
    var icon = mapMaker;

    function initialize() {

        // Create an array of styles.
        var styles = eval(mapStyleCode);

        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles,{name: mapTitle});

        var mapOptions = {
            zoom: parseInt(mapZoomLevel),
            scrollwheel: false,
            panControl: true,
            zoomControl: true,
            scaleControl: true,
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.mapType, 'map_style']
            },
            center: stockholm
        };

        /*infowindow = new google.maps.InfoWindow({
            content: contentString
        });*/

        map = new google.maps.Map(document.getElementById(mapCanvasLocation),mapOptions);  

        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        marker = new google.maps.Marker({
            map:map,
            draggable:false,
            scrollwheel: false,
            animation: google.maps.Animation.DROP,
            position: parliament,
            icon:  icon
        });
        google.maps.event.addListener(marker, 'click', toggleBounce);

        //If infoWindow is available
        if( mapInfoWindow ){
            google.maps.event.addListener(marker, 'click', function() { 
                infowindow.open(map,marker);
            });
        }

        setMarkers(map);


    }

    google.maps.event.addDomListener(window, 'load', initialize);


    //If infoWindow is available
    if( mapInfoWindow ){
        google.maps.event.addDomListener(window, 'load', function() { 
            infowindow.open(map,marker);
        });
    }

    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
    });




    // Data for the markers consisting of a name, a LatLng and a zIndex for the
    // order in which these markers should display on top of each other.
    var locations = eval('['+mapMultLoc+']');

    function setMarkers(map) {
      // Adds markers to the map.

      // Marker sizes are expressed as a Size of X,Y where the origin of the image
      // (0,0) is located in the top left of the image.

      // Origins, anchor positions and coordinates of the marker increase in the X
      // direction to the right and in the Y direction down.
      var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
      };
      // Shapes define the clickable region of the icon. The type defines an HTML
      // <area> element 'poly' which traces out a polygon as a series of X,Y points.
      // The final coordinate closes the poly by connecting to the first coordinate.
      var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
      };
      for (var i = 0; i < locations.length; i++) {
        var imageSel = '';
        var location = locations[i];

        if( location[4]!='' ){ imageSel = themeDir+'/images/map/'+location[4]; }else{ imageSel=image; } console.log(imageSel);

        var marker = new google.maps.Marker({
          position: {lat: location[1], lng: location[2]},
          map: map,
          icon: imageSel,
          shape: shape,
          title: location[0],
          zIndex: location[3]
        });
      }
    }



    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

};

function loadClock( element ) {
	//Clock
    $("#"+element).clock({
        "format": "12",
        "calendar": "false",
        "seconds":"false"
    });
}

function loadDatepickersIbe(){
	var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = $("#param_ibe_checkin").datepicker({
        format : "dd-mm-yyyy",
        onRender: function(date) {
            return date.valueOf() < now.valueOf() ? "disabled" : "";
        }
    }).on("changeDate", function(ev) {
        if (ev.date.valueOf() >= checkout.date.valueOf()) {
            var newDate = new Date(ev.date);
            newDate.setDate(newDate.getDate() + 1);
            checkout.setValue(newDate);
        }
        checkin.hide();
        $("#param_ibe_nights").val( pad('1') );
        $("#param_ibe_checkout")[0].focus();
    }).data("datepicker");

    
    var checkout = $("#param_ibe_checkout").datepicker({
        format : "dd-mm-yyyy",
        onRender: function(date) { 
            return date.valueOf() < checkin.date.valueOf() ? "disabled" : "";
        }
    }).on("changeDate", function(ev) {
    	var ciDate 	= $("#param_ibe_checkin").val();
    	var coDate 	= ev.date;
    	
    	var nigts = daydiff(parseDate( ciDate ), coDate);

    	$("#param_ibe_nights").val( pad(nigts) );

        checkout.hide();
    }).data("datepicker");

    $("#param_ibe_nights").keyup(function() {
    	var nights = $(this).val();
    	if (nights == 0) {
    		nights = 1;
    		$("#param_ibe_nights").mouseout(function() {
    			var nights;
    			if ($("#param_ibe_nights").val() > 1) {
    				nights = pad($("#param_ibe_nights").val())
    			} else {
    				nights = "01"
    			}
    			$("#param_ibe_nights").val(nights)
    		})
    	}

    	if (nights != "") {
    		var ciDate	= $("#param_ibe_checkin").val();
    		var coDate	= $("#param_ibe_checkout").val();

    		if( ciDate!='' ){ 

				var newDate = parseDate(ciDate);
				newDate.setDate(newDate.getDate() + parseInt(nights) );
				checkout.setValue(newDate);
    
    		}
    		checkin.hide();
    	}
    });
}




//Show a leading zero if a number is less than 10
function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

//get the number of days between two dates
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}

//get the number of days between two dates
function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function ibeSubmit(){

    $(document).find("#ibe-submit").click(function(e){
        // Prevents the browser from submiting the form
        e.preventDefault();

        var param = '?';
        var ibePromo = ibeNat = '';
        var ibeNationality = errcount = 0;

        var ibe_type    = document.getElementById("ibe-submit").getAttribute("data-ibe-type");
        var ibe_action  = document.getElementById("ibe-submit").getAttribute("data-ibe-action"); 
        var ibe_lang    = document.getElementById("ibe-submit").getAttribute("data-ibe-lang"); 

        //Retrive Values
        if( $('#param_ibe_hotel').length>0 ){ var ibeId = $('#param_ibe_hotel').val().trim(); }
        if( $('#param_ibe_nights').length>0 ){ var ibeNights = $('#param_ibe_nights').val().trim(); }
        if( $('#param_ibe_promo').length>0 ){ var ibePromo = $('#param_ibe_promo').val().trim(); }
        if( $('#param_ibe_adults').length>0 ){ var ibeAdults = $('#param_ibe_adults').val().trim(); }
        if( $('input:radio[name=param_ibe_nationality]').length>0 ){ var ibeNat = $('input:radio[name=param_ibe_nationality]:checked').val().trim(); }

        if( $('#param_ibe_checkin').length>0 ){ 
            var ibeIn = $('#param_ibe_checkin').val().trim(); 
            var ibeInArr = ibeIn.split('-');
        }
        if( $('#param_ibe_checkout').length>0 ){ 
            var ibeOut = $('#param_ibe_checkout').val().trim(); 
            var ibeOutArr = ibeOut.split('-');
        }

        //Nights Calculation     
        var ibeNights = daydiff(parseDate( ibeIn ), parseDate( ibeOut ) );

        //Form Validation 
        if (ibeId == "-1") {
            ibeNotify("#param_ibe_hotel", "Please Select a Hotel");
            ++errcount;
        }

        if (ibeIn == "") {
            ibeNotify("#param_ibe_checkin", "Check Your Input");
            ++errcount;
        }
        if (ibeOut == "") {
            ibeNotify("#param_ibe_checkout", "Check Your Input");
            ++errcount;
        }
        console.log(errcount);
        if (errcount == 0) {

            if( ibe_type=='bookingeye' ){
                //BookingEye
                param += 'pr='+ibeId+'&ci='+ibeIn+'&co='+ibeOut;

                if( ibePromo ){ 
                    param += '&promo='+ibePromo; 
                }

                if( ibeNat ){
                    if( ibeNat=='local' ){
                        var ibeNationality = 1;
                    }
                    param += '&islocal='+parseInt(ibeNationality); 
                }

            }else if( ibe_type=='ihotellier' ){
                //iHotellier
                ibeInFormatted  = ibeInArr[1]+'/'+ibeInArr[0]+'/'+ibeInArr[2];
                ibeOutFormatted = ibeOutArr[1]+'/'+ibeOutArr[0]+'/'+ibeOutArr[2];

                param += 'hotelId='+ibeId+'&dateIn='+ibeInFormatted+'&dateOut='+ibeOutFormatted+'&length='+ibeNights;

                if( ibeAdults ){ 
                    param += '&adults='+parseInt(ibeAdults)+'&children=0'; 
                }

                param += '&languageID='+ibe_lang+'&locale=EN&rooms=1';

            }else if( ibe_type=='res_req' ){ 
                $(this).closest("form").submit();
            }

            var target = ibe_action+param;
            return window.open(target, "_blank"), !1   

        } 
    });
}


/* error Message*/
/* if select input use "_hdn" after the ID */
function ibeNotify(input_id, displaytxt) {
    $(input_id).next(".error").html(displaytxt).fadeIn(200).delay(5000).fadeOut(200);
}

function loadQr(element, dataset){

    var cont_nm     = removeSpan(dataset.cont_nm);
    var cont_ad1    = removeSpan(dataset.cont_ad1);
    var cont_ad2    = removeSpan(dataset.cont_ad2);
    var cont_ad3    = removeSpan(dataset.cont_ad3);
    var cont_ad4    = removeSpan(dataset.cont_ad4);
    var cont_phn    = removeSpan(dataset.cont_phn);
    var cont_email  = removeSpan(dataset.cont_email);
    var cont_fax    = removeSpan(dataset.cont_fax);
    var cont_cordi  = dataset.cont_cordi;
  
    var cordi       = cont_cordi.split(',');

    $('#qr').ClassyQR({
        create: true, // signals the library to create the image tag inside the container div.
        type: 'contact', // text/url/sms/email/call/locatithe text to encode in the QR. on/wifi/contact, default is TEXT
        name: cont_nm,
        address: cont_ad1+cont_ad2+cont_ad3+cont_ad4,
        number: cont_phn,
        email: cont_email,
        size:150,
        latitude: cordi[0],
        longitude: cordi[1],
        note:'Welcome to '+cont_nm+'!!'
    });
}

function removeSpan(str){
    var element = $(str);//convert string to JQuery element
    element.find("span, a").each(function(index) {
        var text = $(this).text();//get span content
        $(this).replaceWith(text);//replace all span with just content
    });
    return element.html();//get back new string
}

function loadPagination(){
    $('.pagi').change(function(e){
        var url = location.protocol + '//' + location.host + location.pathname;
        var urlCustom = url + $(this).val();
        window.location.href = urlCustom;
    });
}