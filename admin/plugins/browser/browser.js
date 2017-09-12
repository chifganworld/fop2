plugins['browser'] = (function() {

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~browser" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {

            if (!(jQuery.inArray('browser', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('User does not have browser permissions!');
                return;
            }
 
            // This method is used to apply a language strings to html elements
            $('#box_browserbox .langcollapse').attr('data-original-title',lang.collapse);
            $('#box_browserbox .langlockunlock').attr('data-original-title',lang.toggle_lock);
        },
        callback_refreshbrowser: function(nro,texto,slot) {

            if (!(jQuery.inArray('browser', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('User does not have browser permissions!');
                return;
            }

            if(nro==myposition) {
               if ($('#box_asternicTagbox').length > 0) {
                   filecontent = 'browser.php';
               } else {
                   filecontent = 'browserbs.php';
               }
               $('#browser').load('admin/plugins/browser/'+filecontent);
            }

        },
        callback_zbuttons: function(nro,texto,slot) {

           if (!(jQuery.inArray('browser', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
               debug('User does not have browser permissions!');
               return;
           }

           var oldclient=0;
           if ($('#box_asternicTagbox').length > 0) {
               oldclient=1;
           }

           if($('#box_browserbox').length<=0) {
               if (oldclient==1) {
               } else {
                   // fop2 bootstrap version
                   debug('browser meto ventana nueva en widget grid ');

                   for ( var section in pluginconfig['browser']['initial_url']) { 

                       var initial_url = pluginconfig['browser']['initial_url'][section];
                       var show_controls = pluginconfig['browser']['show_controls'][section];


                       var patt1 = /#\{[^\}]*\}/g;
                       var coinciden = initial_url.match(patt1);

                       if (coinciden !== null) {
                           for (var a = 0; a < coinciden.length; a++) {
                               var vari = coinciden[a].substr(2, coinciden[a].length - 3);
                               var valor = '';
                               if (vari == 'EXTEN') {
                                   valor = myextension;
                                   initial_url = plugins['browser'].replace(initial_url, coinciden[a], valor);
                               } 
                           }
                       }

                       var hiddenclass="";
                       if(show_controls==0) { hiddenclass='hidden'; }
                       var newklon = $('<div class="grid-stack-item" id="box_browserbox'+section+'" ><div class="grid-stack-item-content boxstyle"><div id="browsercontent'+section+'" class="widgetcontent widget widget-color"><header role="heading"><div class="pull-left" style="padding-left:4px;"><span class="handle widget-icon"><i class="fa fa-bars"></i></span></div><div role="menu" class="widget-ctrls browser '+hiddenclass+'" style="float:left;"><a onclick="window.history.back(-1);" class="button-icon"><i class="fa fa-chevron-left"></i></a> <a onclick="window.history.forward();" class="button-icon"><i class="fa fa-chevron-right"></i></a> <a onclick="document.getElementById(\'browseriframe'+section+'\').src = document.getElementById(\'browseriframe'+section+'\').src;" class="button-icon"><i class="fa fa-refresh"></i></a> </div><div class="widget-toolbar pull-left" role="menu"> <div class="btn-group"><input type="text" style="height:20px; line-height:1em; color:#000; width:300px;" id="urlbar'+section+'" class="urlbar browser form-control '+hiddenclass+'"></div></div><div class="widget-ctrls" role="menu"><a class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"><i class="fa fa-caret-square-o-up"></i></a><a class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Lock/Unlock"><i class="fa fa-unlock-alt"></i></a></div></header><div class="widgetscroll" id="browserlist'+section+'"><iframe id="browseriframe'+section+'" src="'+initial_url+'" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%; height:100%; border:0; overflow-y: auto;"></iframe></div></div></div></div>');

                       grid = $('.grid-stack').data('gridstack');
                       window.resizinggrid=1;
                       if(parseInt(currentrelease.replace(/\./g,''))>23101) {
                           grid.addWidget(newklon,0,0,5,8,true);
                       } else {
                           grid.add_widget(newklon,0,0,5,8,true);
                       }
                       window.resizinggrid=0;
                       $('#box_browserbox'+section+' [data-toggle="tooltip"]').tooltip({container:'body'});

                       $('iframe#browseriframe'+section).load(function() {
                               var section = $(this).attr('id').substr(13);
                               $('#urlbar'+section).val($(this).attr('src'));
                               });

                       jQuery(document).on('keydown', 'input.urlbar'+section, function(ev) { if(ev.which === 13) { var section = $(this).attr('id').substr(6); url = $(this).val(); if(url.indexOf('http')<0) { url = 'http://'+url; } $('#browseriframe'+section).attr('src',url); return false; } });

                   }
               }
           }
           if(oldclient==1) {
           } else {
               window.resizinggrid=1;
               debug('reorganizing browser '+resizinggrid);
               var jsongrid = Base64.decode(mypreferences.grid);
               if(jsongrid.length>0) {
                   try {
                       var data = JSON.parse(jsongrid);
                       for (var item in data) {
                           debug(data[item].id.substr(0,14));
                           if(data[item].id.substr(0,14)=='box_browserbox') {
                               grid.update($('#'+data[item].id),data[item].x,data[item].y,data[item].width,data[item].height);
                           }
                       }
                   } catch(e) {
                       debug("Invalid JSON in grid preferences");
                   }
               }
               window.resizinggrid=0;
           }
        },
        replace: function(string, text, by) {
            // Replaces text with by in string
            var strLength = string.length,
            txtLength = text.length;
            if ((strLength === 0) || (txtLength === 0)) {
                return string;
            }

            var i = string.indexOf(text);
            if ((!i) && (text != string.substring(0, txtLength))) {
                return string;
            }
            if (i == -1) {
                return string;
            }

            var newstr = string.substring(0, i) + by;
        
            if (i + txtLength < strLength) {
                newstr += replace(string.substring(i + txtLength, strLength), text, by);
            }

            return newstr;
        },
        init: function() {
            // This method is called on the fop2 initilization, and is used to initialize the plugin itself
            // like for adding page elements, or menu items.
            // initialization function

            if (!(jQuery.inArray('browser', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('User does not have browser permissions!');
                return;
            }

            debug("Initializing browser plugin");

            if($('#box_browserbox').length>0) {
                $('#box_browserbox').show();
            }
        }
    }
}());
