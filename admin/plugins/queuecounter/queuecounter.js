plugins['queuecounter'] = (function() {

    var speechtexto        = "";
    var speechstring       = pluginconfig['queuecounter']['announcement_text'][''];
    var speechstringfailed = pluginconfig['queuecounter']['failed_announcement_text'][''];
    var enable_announce    = parseInt(pluginconfig['queuecounter']['enable_spoken_announcement']['']);
    var enable_f_announce  = parseInt(pluginconfig['queuecounter']['enable_failed_spoken_announcement']['']);
    var langu              = pluginconfig['queuecounter']['language'][''];

    clearInterval(window.queuecounterinterval);
    window.queuecounterinterval=setInterval(function(){plugins['queuecounter'].updategraph();},500);

    if(typeof window.dataqueuecounter == 'undefined') {
        window.dataqueuecounter = new Array();
    }
 
    var waitingcalls = 0;
    var plot;
    var maxy = 5;
    var lastsecond = -1;

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~queuecounter" + "|" + hash + "\" />";
            sendcommand();
        },
        setLang: function() {
            if($('#queuecountTitle').length>0) {
                debug('set lang queuecounter');
                $('#queuecountTitle').html(lang.queuecallcounter);
                $('#box_queuecounterbox .langcollapse').attr('data-original-title',lang.collapse);
                $('#box_queuecounterbox .langlockunlock').attr('data-original-title',lang.toggle_lock);
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
            if(dif>20) { waitingcalls++; } else if(dif>10) { waitingcalls--; }
            if(waitingcalls<0) { waitingcalls=0; }
            if(waitingcalls>20) { waitingcalls=20; }
            $('#queuecounter').html('<h1>'+waitingcalls+'</h1>');
            /* end of demo */
            

            if(typeof plot != 'undefined') {
                if ($('#queuecountergraph').length > 0) {

                    var d = new Date();
                    var n = d.getSeconds();
                    if(n==lastsecond) {
                        lastsecond=n;
                        return;
                    }
                    lastsecond=n;

                    window.dataqueuecounter.shift();
                    window.dataqueuecounter.push(waitingcalls);
                    var res = [];
                    max=0;
                    for (var i = 0; i < window.dataqueuecounter.length; ++i) {
                        res.push([i, window.dataqueuecounter[i]]);
                        if(window.dataqueuecounter[i]>max) { max = window.dataqueuecounter[i]; }
                    }
                    if(max > maxy) {
                        maxy+=10;
                        plot = $.plot("#queuecountergraph", [ res ], {
                            series: { shadowSize:0, lines: { show: true, fill: true, fillColor: { colors:[{ opacity: 0.9},{opacity: 0.1}]}} },
                            colors: ['#57889c'],
                            yaxis: { 'min': 0, 'max': maxy },
                            xaxis: { ticks: [[0,'5 min'],[60,'4 min'],[120,'3 min'],[180,'2 min'],[240,'1 min']], show: true }
                        });
                    } else if(max < (maxy - 10)) {
                        maxy-=10;
                        plot = $.plot("#queuecountergraph", [ res ], {
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

                if(window.dataqueuecounter.length == 0) {
                    for(a=0;a<300;a++) {
                       window.dataqueuecounter[a]=0;
                    }
                }
                var res = [];
                for (var i = 0; i < window.dataqueuecounter.length; ++i) {
                  res.push([i, window.dataqueuecounter[i]])
                }

                if ($('#queuecountergraph').length > 0) {
                    plot = $.plot("#queuecountergraph", [ res ], {
                        series: { shadowSize:0, lines: { show: true, fill: true, fillColor: { colors:[{ opacity: 0.9},{opacity: 0.1}]}} },
                        colors: ['#57889c'],
                        yaxis: { 'min': 0, 'max': maxy },
                        xaxis: { ticks: [[0,'5 min'],[60,'4 min'],[120,'3 min'],[180,'2 min'],[240,'1 min']], show: true }
                    });

                    $("#queuecountergraph").resizable({});
                }
            }
        },
        callback_zbuttons: function() {

            var oldclient=0;
            if ($('#box_asternicTagbox').length > 0) {
                oldclient=1;
            }

            if($('#box_queuecounterbox').length<=0) {
               if (oldclient==1) {
                    var klon = $( '#box_asternicTagbox' );
                    var newklon = klon.clone().attr( { id: 'box_queuecounterbox' }).css({display: 'block'}).insertBefore( klon );
                    newklon.find('*').each(function() {
                       if(typeof $(this).attr('id') == 'undefined') {
                       } else {
                           if($(this).attr('id')=='tagcall') { $(this).attr('id','queuecountTitle').html(lang.queuecallcounter); }
                           if($(this).attr('id')=='toggle-asternicTag') { $(this).attr('id','toggle-queuecounter'); }
                           if($(this).attr('id')=='asternicTag') { $(this).attr('id','queuecounter').css('text-align','center'); }
                       }
                    });
                } else {
                   // New bootstrap client
                   var newklon = $('<div class="grid-stack-item" id="box_queuecounterbox" ><div class="grid-stack-item-content boxstyle boxstylebg"><div id="queuecountercontent" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"><i class="fa fa-caret-square-o-up"></i></a><a class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Lock/Unlock"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="queuecountTitle">Calls Waiting</span></h3></header><div class="widgetscroll" id="queuecounterlist"><div id="queuecounter" class="text-center" style="padding-top:5px;"><h1>0</h1></div><div id="queuecountergraph" style="width:100%; height:150px;"></div></div></div></div>');
                   grid = $('.grid-stack').data('gridstack');

                   window.resizinggrid=1;
                   if(parseInt(currentrelease.replace(/\./g,''))>23101) {
                       grid.addWidget(newklon,0,0,3,6,true);
                   } else {
                       grid.add_widget(newklon,0,0,3,6,true);
                   }
                   window.resizinggrid=0;
           
                   $('#box_queuecounterbox [data-toggle="tooltip"]').tooltip({container:'body'});
               }
            }

            if (oldclient==1) {
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
                           if(dita[item].id=='box_queuecounterbox') {
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
        callback_waitingcalls: function(nro,texto,slot) {
            debug('state en queuecounter');
            waitingcalls = $('#queuelist').find('.qentrylabel').length;
            jQuery.each(queuelistGroup,function(index,item) { waitingcalls+=$('#'+item).find('.qentrylabel').length; });
            $('#queuecounter').html('<h1>'+waitingcalls+'</h1>');
            var queue_label = botonitos[nro]['LABEL'];
            var calls_waiting = texto;
            speechtexto = speechstring;
            debug(speechtexto);
            var reemplazo1 = speechtexto.replace("#{COUNT}",calls_waiting);
            var reemplazo2 = reemplazo1.replace("#{QUEUE}",queue_label);
            speechtexto = reemplazo2;
            debug(speechtexto);
        },
        callback_soundjoin: function(nro,texto,slot) {
            debug(speechtexto);
            if ('speechSynthesis' in window) {
                if(enable_announce==1) {
                    var msg = new SpeechSynthesisUtterance(speechtexto);
                    msg.lang = langu;
                    if(mypreferences.soundQueue == "") {
                    } else {
                        window.speechSynthesis.speak(msg);
                    }
                }
            }
        },
        callback_noanswersound: function(nro,texto,slot) {
             var textodecode = Base64.decode(texto);
             var partes      = textodecode.split('^');
             var agent       = partes[0];
             var queue       = partes[1];
             var queuename   = queue;

             if ('speechSynthesis' in window) {
                 if(enable_f_announce==1) {

                     for (var s = 0; s < botonitos.length; s++) {
                        for (var i in botonitos[s]) {
                            if (botonitos[s].hasOwnProperty(i)) {
                                 if (i == "TYPE") {
                                     if(botonitos[s]['TYPE']=='queue') {
                                         if(botonitos[s]['EXTENSION']==queue) {
                                             queuename = botonitos[s]['LABEL'];
                                             break;
                                         }
                                     }
                                 }
                             }
                         }
                     }
   
                     var reemplazo1 = speechstringfailed.replace("#{AGENT}",agent);
                     var reemplazo2 = reemplazo1.replace("#{QUEUE}",queuename);
    
                     debug('About to say no answer phrase: ' +reemplazo2);
    
                     var msg = new SpeechSynthesisUtterance(reemplazo2);
                     if(mypreferences.soundQueue == "") {
                     } else {
                         window.speechSynthesis.speak(msg);
                     }
                 }
             }
        },
        callback_queueentry: function(nro,texto,slot) {
            currenthold = $('#queuecounter').text();
            currenthold = parseInt(currenthold);
            nexthold = currenthold + 1;
            $('#queuecounter').html('<h1>'+nexthold+'</h1>');
        },
        callback_clearentries: function(nro,texto,slot) {
            debug('state en queuecounter');
            waitingcalls = $('#queuelist').find('.qentrylabel').length;
            jQuery.each(queuelistGroup,function(index,item) { waitingcalls+=$('#'+item).find('.qentrylabel').length; });
            $('#queuecounter').html('<h1>'+waitingcalls+'</h1>');
        }
    }
}());
