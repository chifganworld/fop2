plugins['timeralarm'] = (function() {

    var seconds_alarm_global = pluginconfig['timeralarm']['seconds_to_alarm'][''];
    var seconds_alarm_global_idle = pluginconfig['timeralarm']['seconds_to_alarm_idle'][''];
    var alarm_threshold  = pluginconfig['timeralarm']['alarm_threshold'][''];
    var timeridtimer;

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~timeralarm" + "|" + hash + "\" />";
            sendcommand();
        },
        checkAlarm: function() {
            window.clearTimeout(timeridtimer);

            $(".timer").each(function() { 
                partes = this.id.split('_'); 
                nroboton = partes[1];
                slot     = partes[0].substr(4);
                boton    = $('#boton'+nroboton);
                if(typeof(botonitos[nroboton])!='undefined') {
                    extension = botonitos[nroboton]['EXTENSION'];
                    if(boton.hasClass('free')) {
                        timealarma = parseInt(seconds_alarm_global_idle);
                    } else {
                        timealarma = parseInt(seconds_alarm_global);
                    }
                    
                    valor = $(this).html();
                    if(valor.indexOf(':')>0) {
                        partes = valor.split(":");
                        tiemposegundos = parseInt(partes[0]) * 60 * 60 + parseInt(partes[1]) * 60 + parseInt(partes[2]);
                        percentalarm = tiemposegundos * 100 / timealarma;
                        if(percentalarm>100) { percentalarm=100; }
                        if(alarm_threshold>100) { alarm_threshold=100; }
                        
                        if(percentalarm > alarm_threshold) {

                          var startalarm = alarm_threshold * timealarma / 100;
                          var endalarm = timealarma;
                          var totalsteps = endalarm - startalarm;
                          var multiplier = 100 / totalsteps;
                          var valoractual = (tiemposegundos - totalsteps) * multiplier;
                          if(valoractual>100) { valoractual=100; }

                          var yellow = {r:255, g:255, b:0};
                          var red = {r:255, g:0, b:0};
                          var newColor = plugins['timeralarm'].makeGradientColor(yellow, red, valoractual);
                          boton.css('borderColor',newColor.cssColor);
                        }  
                    } 
                }  
            });
            timeridtimer = setTimeout(function () { plugins['timeralarm'].checkAlarm(); }, 1000);
        },
        callback_settimer(nro,texto,slot) {
            debug('settimer '+texto);
            $('#boton'+nro).css('borderColor','#999');
        },
        makeGradientColor: function(color1,color2,percent) {
            var newColor = {};

            function makeChannel(a, b) {
                return(a + Math.round((b-a)*(percent/100)));
            }

            function makeColorPiece(num) {
                num = Math.min(num, 255);   // not more than 255
                num = Math.max(num, 0);     // not less than 0
                var str = num.toString(16);
                if (str.length < 2) {
                    str = "0" + str;
                }
                return(str);
            }

            newColor.r = makeChannel(color1.r, color2.r);
            newColor.g = makeChannel(color1.g, color2.g);
            newColor.b = makeChannel(color1.b, color2.b);
            newColor.cssColor = "#" + makeColorPiece(newColor.r) + makeColorPiece(newColor.g) + makeColorPiece(newColor.b);
            return(newColor);
        },
        setLang: function() {
        },
        init: function() {
            // initialization function
            debug(plugins['timeralarm']);
            timeridtimer = setTimeout(function () { plugins['timeralarm'].checkAlarm(); }, 1000);
        }
    }
}());
