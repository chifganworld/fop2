plugins['busycounter'] = (function() {

    //var rotate = parseInt(pluginconfig['busycounter']['rotateTime']['']) * 1000;
    clearInterval(window.busycounterinterval);
    window.busycounterinterval=setInterval(function(){plugins['busycounter'].updategraph();},500);
    if(typeof window.databusycounter == 'undefined') {
        window.databusycounter = new Array();
    }
    var countbusy = 0;
    var maxy = 5;
    var plot;
    var lastsecond = -1;

    return { 

        loadLang: function(values) {
            debug('load lang busycounter');
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~busycounter" + "|" + hash + "\" />";
            sendcommand();
        },
        setLang: function() {
            debug('set lang busycounter');
            if($('#busycountTitle').length>0) {
                $('#busycountTitle').html(lang.busycallcounter);
                $('#box_busycounterbox .langcollapse').attr('data-original-title',lang.collapse);
                $('#box_busycounterbox .langlockunlock').attr('data-original-title',lang.toggle_lock);
            }
        },
        init: function() {
            // initialization function
        },
        updategraph: function() {

            if ($('#box_asternicTagbox').length > 0) {
                return;
            }
            /* For demo Samples 
            dif = Math.floor(Math.random() * 30) + 1; 
            if(dif>20) { countbusy++; } else if(dif>10) { countbusy--; }
            if(countbusy<0) { countbusy=0; }
            $('#busycounter').html('<h1>'+countbusy+'</h1>');
            /* end of demo */

            if(typeof plot != 'undefined') {
                if ($('#busycountergraph').length > 0) {

                    var d = new Date();
                    var n = d.getSeconds();
                    if(n==lastsecond) {
                        lastsecond=n;
                        return;
                    }
                    lastsecond=n;

                    /* using simple array and converted to data points */
                    window.databusycounter.shift();
                    window.databusycounter.push(countbusy);
                    var res = [];
                    max=0;
                    for (var i = 0; i < window.databusycounter.length; ++i) {
                        res.push([i, window.databusycounter[i]])
                        if(window.databusycounter[i]>max) { max = window.databusycounter[i]; }
                    }
                    if(max > maxy) { 
                        maxy+=10; 
                        plot = $.plot("#busycountergraph", [ res ], {
                            series: { shadowSize:0, lines: { show: true, fill: true, fillColor: { colors:[{ opacity: 0.9},{opacity: 0.1}]}} },
                            colors: ['#57889c'],
                            yaxis: { 'min': 0, 'max': maxy },
                            xaxis: { ticks: [[0,'5 min'],[60,'4 min'],[120,'3 min'],[180,'2 min'],[240,'1 min']], show: true }
                        });


                    } else if(max < (maxy - 10)) {
                        maxy-=10; 
                        plot = $.plot("#busycountergraph", [ res ], {
                            series: { shadowSize:0, lines: { show: true, fill: true, fillColor: { colors:[{ opacity: 0.9},{opacity: 0.1}]}} },
                            colors: ['#57889c'],
                            yaxis: { 'min': 0, 'max': maxy },
                            xaxis: { ticks: [[0,'5 min'],[60,'4 min'],[120,'3 min'],[180,'2 min'],[240,'1 min']], show: true }
                        });
                    } else {
                        plot.setData([res]);
                        plot.draw(); 
                    }

                }
            } else {
                if(window.databusycounter.length == 0) {
                    for(a=0;a<300;a++) {
                       window.databusycounter[a]=0;
                    }
                }
                var res = [];
                for (var i = 0; i < window.databusycounter.length; ++i) {
                  res.push([i, window.databusycounter[i]])
                }

                if ($('#busycountergraph').length > 0) {
                    plot = $.plot("#busycountergraph", [ res ], {
                        series: { shadowSize:0, lines: { show: true, fill: true, fillColor: { colors:[{ opacity: 0.9},{opacity: 0.1}]}} },
                        colors: ['#57889c'],
                        yaxis: { 'min': 0, 'max': maxy },
                        xaxis: { ticks: [[0,'5 min'],[60,'4 min'],[120,'3 min'],[180,'2 min'],[240,'1 min']], show: true }
                    });

                    $("#busycountergraph").resizable({});
                }
            }

        },
        callback_zbuttons: function() {

            var oldclient=0;
            if ($('#box_asternicTagbox').length > 0) {
                oldclient=1;
            }

            if($('#box_busycounterbox').length<=0) {
               if (oldclient==1) {
                   var klon = $( '#box_asternicTagbox' );
                   var newklon = klon.clone().attr( { id: 'box_busycounterbox' }).css({display: 'block'}).insertBefore( klon );
                   newklon.find('*').each(function() {
                      if(typeof $(this).attr('id') == 'undefined') {
                      } else {
                          if($(this).attr('id')=='tagcall') { $(this).attr('id','busycountTitle').html(lang.busycallcounter); }
                          if($(this).attr('id')=='toggle-asternicTag') { $(this).attr('id','toggle-busycounter'); }
                          if($(this).attr('id')=='asternicTag') { $(this).attr('id','busycounter').css('text-align','center'); }
                      }
                   });

               } else {
                   // New bootstrap client
                   var newklon = $('<div class="grid-stack-item" id="box_busycounterbox" ><div class="grid-stack-item-content boxstyle boxstylebg"><div id="busycountercontent" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"><i class="fa fa-caret-square-o-up"></i></a><a class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Lock/Unlock"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="busycountTitle">Extensions in Use</span></h3></header><div class="widgetscroll" id="busycounterlist"><div id="busycounter" class="text-center" style="padding-top:5px;"><h1>0</h1></div><div id="busycountergraph" style="width:100%; height:150px;"></div></div></div></div>');
                   grid = $('.grid-stack').data('gridstack');

                   window.resizinggrid=1;
                   if(parseInt(currentrelease.replace(/\./g,''))>23101) {
                       grid.addWidget(newklon,0,0,3,6,true);
                   } else {
                       grid.add_widget(newklon,0,0,3,6,true);
                   }
                   window.resizinggrid=0;
                   $('#box_busycounterbox [data-toggle="tooltip"]').tooltip({container:'body'});

               }
           }
           if(oldclient==1) {
               makeSortable('right');
               if(typeof(mypreferences.rightColumnOrder)=='string') {
                   ordenarDiv('right_column',mypreferences.rightColumnOrder);
               }
           } else {
               window.resizinggrid=1;
               var jsongrid = Base64.decode(mypreferences.grid);
               if(jsongrid.length>0) {
                   try {
                       var dita = JSON.parse(jsongrid);
                       for (var item in dita) {
                           if(dita[item].id=='box_busycounterbox') {
                               grid.update($('#'+dita[item].id),dita[item].x,dita[item].y,dita[item].width,dita[item].height);
                           }
                       }
                   } catch(e) {
                       debug('Invalid JSON in grid pref');
                   }
               }
               window.resizinggrid=0;
           } 
        },
        callback_state: function(nro,texto,slot) {
            //countbusy=$('#left_column .busy').length;
            countbusy=document.getElementsByClassName('extenbutton busy').length;
            $('#busycounter').html('<h1>'+countbusy+'</h1>');
        }
    }
}());
