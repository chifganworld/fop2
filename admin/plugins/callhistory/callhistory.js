plugins['callhistory'] = (function() {

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~callhistory" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {

            if (!(jQuery.inArray('callhistory', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('no callhistory allowed');
                return;
            }
 
            // This method is used to apply a language strings to html elements
            $('#callhistoryTitle').html(lang.callhistory);
            $('#incomingTag').html(lang.incoming);
            $('#outgoingTag').html(lang.outgoing);
            $('#box_callhistorybox .langcollapse').attr('data-original-title',lang.collapse);
            $('#box_callhistorybox .langlockunlock').attr('data-original-title',lang.toggle_lock);
        },
        callback_refreshcallhistory: function(nro,texto,slot) {

            if (!(jQuery.inArray('callhistory', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('no callhistory allowed');
                return;
            }

            if(nro==myposition) {
               if ($('#box_asternicTagbox').length > 0) {
                   filecontent = 'callhistory.php';
                   $('#callhistory').load('admin/plugins/callhistory/'+filecontent);
               } else {
                   filecontent = 'callhistorybs.php';
                   $('#callhistorylist').load('admin/plugins/callhistory/'+filecontent);
               }
            }

        },
        callback_zbuttons: function(nro,texto,slot) {

            if (!(jQuery.inArray('callhistory', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('no callhistory allowed');
                return;
            }
   
            var oldclient=0;
            if ($('#box_asternicTagbox').length > 0) {
                oldclient=1;
            }

            if($('#box_callhistorybox').length<=0) {
               if (oldclient==1) {
                   var klon = $( '#box_asternicTagbox' );
                   var newklon = klon.clone().attr( { id: 'box_callhistorybox' }).css({display: 'block'}).insertBefore( klon );
                   newklon.find('*').each(function() {
                      if(typeof $(this).attr('id') == 'undefined') {
                      } else {
                          if($(this).attr('id')=='tagcall') { $(this).attr('id','callhistoryTitle').html(lang.callhistory); }
                          if($(this).attr('id')=='toggle-asternicTag') { $(this).attr('id','toggle-callhistory'); }
                          if($(this).attr('id')=='asternicTag') { $(this).attr('id','callhistory').css('text-align','center'); }
                      }
                   });
                   $('#callhistory').load('admin/plugins/callhistory/callhistory.php');
               } else {
                   // fop2 bootstrap version
                   debug('callhistory meto ventana nueva en widget grid ');

                   var newklon = $('<div class="grid-stack-item" id="box_callhistorybox" ><div class="grid-stack-item-content boxstyle"><div id="callhistorycontent" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"><i class="fa fa-caret-square-o-up"></i></a><a class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Lock/Unlock"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="callhistoryTitle">Call History</span></h3></header><div class="widgetscroll" id="callhistorylist"><div id="callhistory" class="text-center" style="padding-top:5px;"></div></div></div></div></div>');
                   grid = $('.grid-stack').data('gridstack');
                   window.resizinggrid=1;
                   if(parseInt(currentrelease.replace(/\./g,''))>23101) {
                       grid.addWidget(newklon,0,0,5,8,true);
                   } else {
                       grid.add_widget(newklon,0,0,5,8,true);
                   }
                   $('#callhistorylist').load('admin/plugins/callhistory/callhistorybs.php', function() { $('#callhistorybox').css('display','block'); });
                   $('#box_callhistorybox [data-toggle="tooltip"]').tooltip({container:'body'});
                   //restoreGrid(Base64.decode(mypreferences.grid));
                   window.resizinggrid=0;
              }
            }
            if(oldclient==1) {
                makeSortable('right');

                if(typeof(mypreferences.rightColumnOrder)=='string') {
                    ordenarDiv('right_column',mypreferences.rightColumnOrder);
                }
            } else {
               window.resizinggrid=1;
               debug('reordeno call history '+resizinggrid);
               var jsongrid = Base64.decode(mypreferences.grid);
               if(jsongrid.length>0) {
                   try {
                       var data = JSON.parse(jsongrid);
                       for (var item in data) {
                           if(data[item].id=='box_callhistorybox') {
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
        init: function() {
            // This method is called on the fop2 initilization, and is used to initialize the plugin itself
            // like for adding page elements, or menu items.
            // initialization function

            if (!(jQuery.inArray('callhistory', permisos) >= 0 || jQuery.inArray('all', permisos) >= 0)) {
                debug('no callhistory allowed');
                return;
            }

            debug("init de callhistory plugin");

            if($('#box_callhistorybox').length>0) {
                $('#box_callhistorybox').show();
            }
        }
    }
}());
