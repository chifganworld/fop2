plugins['queuealarm'] = (function() {

    var seconds_alarm_global = pluginconfig['queuealarm']['seconds_to_alarm'][''];
    var enable_sound_global  = pluginconfig['queuealarm']['enable_sound'][''];
    var flash_screen_global  = pluginconfig['queuealarm']['flash_screen'][''];
    var enable_desktop_notifications_global  = pluginconfig['queuealarm']['enable_desktop_notifications'][''];
    var use_sla_time         = pluginconfig['queuealarm']['use_sla_time'][''];
    var timerid;
    var notification_message = pluginconfig['queuealarm']['notification_message'][''];

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~queuealarm" + "|" + hash + "\" />";
            sendcommand();
        },
        checkAlarm: function() {
            window.clearTimeout(timerid);
            $(".qentrytimer").each(function() { 
                partes = this.id.split('_'); 
                nroboton = partes[1];
                slot     = partes[0].substr(4);
                extension = botonitos[nroboton]['EXTENSION'];
                label     = Base64._utf8_decode(botonitos[nroboton]['LABEL']); 
                if(pluginconfig['queuealarm']['seconds_to_alarm'][extension] == undefined) {
                    timealarma = seconds_alarm_global;
                } else {
                    timealarma = pluginconfig['queuealarm']['seconds_to_alarm'][extension];
                }
                if(pluginconfig['queuealarm']['enable_sound'][extension] == undefined) {
                    enable_sound = enable_sound_global;
                } else {
                    enable_sound = pluginconfig['queuealarm']['enable_sound'][extension];
                }
                if(pluginconfig['queuealarm']['flash_screen'][extension] == undefined) {
                    flash_screen = flash_screen_global;
                } else {
                    flash_screen = pluginconfig['queuealarm']['flash_screen'][extension];
                }
                if(pluginconfig['queuealarm']['enable_desktop_notifications'][extension] == undefined) {
                    enable_desktop_notifications = enable_desktop_notifications_global;
                } else {
                    enable_desktop_notifications = pluginconfig['queuealarm']['enable_desktop_notifications'][extension];
                }
 
                valor = $(this).html();
                partes = valor.split(":");
                tiemposegundos = parseInt(partes[0]) * 60 * 60 + parseInt(partes[1]) * 60 + parseInt(partes[2]);
                timealarma = parseInt(timealarma);
                if(tiemposegundos > timealarma) {
                    elem2 = 'tick'+slot+'_'+nroboton;
                    $('#'+elem2).effect("highlight", {color: "#f26767"}, 1000);
                    if(flash_screen==1) {
                        $('#container').effect("highlight", {color: "#f26767"}, 1000);
                        $('#head').effect("highlight", {color: "#f26767"}, 1000); 
                    }
                    if(enable_sound==1) { aud.play(); }
                }  
                if(tiemposegundos == timealarma) {
                    if(enable_desktop_notifications==1) {  plugins['queuealarm'].desktopNotify(label); }
                }
            });
            timerid = setTimeout(function () { plugins['queuealarm'].checkAlarm(); }, 1000);
        },
        desktopNotify: function(queuelabel) {

              var title = notification_message.replace("#{queuename}",queuelabel);

              if (!("Notification" in window)) {
                debug("This browser does not support desktop notification");
              }
              else if (Notification.permission === "granted") {
                var notification = new Notification(title,{ requireInteraction: true, icon: 'admin/plugins/queuealarm/alarm.png'});
              }
              else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                  if (permission === "granted") {
                    var notification = new Notification(title,{ requireInteraction: true, icon: 'admin/plugins/queuealarm/alarm.png'});
                  }
                });
              }

        },
        callback_stats: function(nro,texto,slot) {
            decoded = Base64.decode(texto);
            if(decoded.length>0) {
               if(use_sla_time==1) {
                   try {
                       var dita = JSON.parse(decoded);
                       extension = botonitos[nro]['EXTENSION'];
                       pluginconfig['queuealarm']['seconds_to_alarm'][extension]=dita['SERVICELEVEL'];
                       console.log('service level para boton '+nro+' es igual a'+dita['SERVICELEVEL']);
                   } catch(e) {};
               }
            }
        },
        setLang: function() {
        },
        init: function() {
            // initialization function
            debug(plugins['queuealarm']);
            timerid = setTimeout(function () { plugins['queuealarm'].checkAlarm(); }, 1000);
            aud = new Audio('admin/plugins/queuealarm/alarm.wav');
            if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {});
            }
        }
    }
}());
