plugins['changepresence'] = (function() {

    // Private variables

    var menuOption = {
        "setpresence":    { name: 'Set Presence', icon: 'presence', items: { } }
    }

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~changepresence" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {
            debug('change presence setlang');
            // change language strings
            menuOption['setpresence']['name'] = lang.setpresence;

            // adding presence options to the context menu
            var cont=0;
            for (var item in presence) {
                if (presence.hasOwnProperty(item)) {
                    if(item==="") {
                       itemPrint = lang['available'];
                    } else {
                        if(lang.hasOwnProperty(item)) {
                            itemPrint = lang[item];
                        } else {
                            itemPrint = item;
                        }
                    }
                    menuOption["setpresence"]["items"]["setPresence^"+cont] = { name: itemPrint };
                    cont++;
                }
            }

            if (typeof(disablePresenceOther) == "undefined") {
                disablePresenceOther = true;
            }

            if (disablePresenceOther === false) {
                // Do not show the other option in presence box if disabled
                presenceOtherIndex=cont;
                menuOption["setpresence"]["items"]["setPresence^"+cont] = { name: lang.other };
            } else {
                presenceOtherIndex=-1;
            }

        },
        setExtensionMenu: function(items) {
            // called from build extension menu as callback
            jQuery.extend(items,menuOption);
            return items;
        },
        setPresence: function(target,source) {

            debug("set presence target "+target+" source "+source);
            var thisexten = botonitos[source]['EXTENSION'];
            var cont=0;
            var value=''
            for (var item in presence) {
                if(cont == target) {
                    value = item;
                    debug('puso presencia en '+value);
                }
                cont++;
            }
            if(presenceOtherIndex==target) { value='!'; }

            if(jQuery.inArray('0',permisosbtn['presencemanager'])>=0 || jQuery.inArray('0',permisosbtn['all'])>=0 || jQuery.inArray(source,permisosbtn['presencemanager'])>=0) {

                if(value == '!') {
                // var val = prompt(lang['enter_state'], '');
                alertify.set({
                    labels: {
                        ok: lang.accept,
                        cancel: lang.cancel
                    }
                });
                alertify.prompt(lang['enter_state'], function(e, str) {
                    // str is the input text
                    if (e) {
                        plugins['changepresence'].setInfo(source,thisexten,str);
                    } else {
                        // user clicked "cancel"
                    }
                }, "");
                } else {
                        plugins['changepresence'].setInfo(source,thisexten,value);
                }


            }

        },
        setInfo: function(source,thisexten,value) {
                var hash = hex_md5(secret+lastkey);
                var value64 = Base64.encode(value);
                queuedcommand = "<msg data=\""+source+"|setastdb|fop2state~"+thisexten+"~"+value64+"|"+hash+"\" />";
                sendcommand();
        },
        init: function() {
            // initialization function
            debug('change presence init');
        }
    }
}());
