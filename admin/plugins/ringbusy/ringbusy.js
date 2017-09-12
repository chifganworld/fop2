plugins['ringbusy'] = (function() {

    return { 

        loadLang: function(values) {
            // This method is called to load language files into the application when the plugin is loaded
            // The language files are located in the lang subdirectory of the plugin folder
            //
            // queuecommand is a string that can be used to send a command from the client to the server
            // the xml format can be seen below, it requires to be autehnticated by hashing a key as shown
            // you must pass fields separated by pipes in the format <msg data='position|command|data|hash' />
            //
            // Finally the sendcommand function will send the queuedcommand to the server for processing
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~ringbusy" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {
            // This method is used to apply a language strings to html elements
        },

        callback_state: function(nro,texto,slot) {
             if(texto=="RINGING") {
             var boton = $('#boton' + nro);
             boton.removeClass("free");
             boton.addClass("busy");
             debug('busy ringing '+texto);
             debug(boton);
             }
        },
        init: function() {
            // This method is called on the fop2 initilization, and is used to initialize the plugin itself
            // like for adding page elements, or menu items.
            // embed elements in page, load style files

        }
    }
}());
