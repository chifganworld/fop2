plugins['clock'] = (function() {

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~clock" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {
            // This method is used to apply a language strings to html elements
        },

        updateClock: function() {

            var currentTime = new Date ( );

            var currentHours = currentTime.getHours ( );
            var currentMinutes = currentTime.getMinutes ( );
            var currentSeconds = currentTime.getSeconds ( );

            // Pad the minutes and seconds with leading zeros, if required
            currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
            currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

            // Choose either "AM" or "PM" as appropriate
            var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

            // Convert the hours component to 12-hour format if needed
            currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

            // Convert an hours component of "0" to "12"
            currentHours = ( currentHours == 0 ) ? 12 : currentHours;

            // Compose the string for display
            var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

            // Update the time display
            document.getElementById("clock").firstChild.nodeValue = currentTimeString;

        },
        callback_zbuttons: function() {
            debug('clock zbuttons');
            window.clearInterval(window.clocktimer);
            window.clocktimer = window.setInterval(function(){
                plugins['clock'].updateClock();
            }, 1000);
            var largo1 = $('#actionbar').find(':visible').length;
            var largo2 = $('#custombar').find(':visible').length;
            var hayvisibles = largo1 + largo2;
            if(hayvisibles == 0) {
                // hacemos un pull de el filter dial porque  no hay acciones
                $('#dialfilterbar').removeClass('col-md-pull-5');
                $('#dialfilterbar').removeClass('col-lg-pull-5');
                $('#dialfilterbar').addClass('col-md-pull-4');
                $('#dialfilterbar').addClass('col-lg-pull-4');
            } 

        },
        init: function() {
            if($('#clock').length==0) {
                if($('#secondtoolbar').length>0) {
                    // pre 2.30 version
                    $( "#secondtoolbar" ).before( "<span id='clock'>&nbsp;</span>" );
                } else {
                    // post 2.30 version
                    $( "#custombar" ).after( "<span id='clock' class='hidden-sm hidden-xs hidden-md'>&nbsp;</span>" );
                }
            }
        }
    }
}());
