plugins['softphone'] = (function () {

  return {

    loadLang: function (values) {
      var hash = hex_md5(secret + lastkey);
      queuedcommand = '<msg data="' + myposition + '|pluginlang|' + language + '~clock' + '|' + hash + '" />';
      sendcommand();
    },

    setLang: function () {
      // This method is used to apply a language strings to html elements
    },
    callback_zbuttons: function () {

      console.log('Not sure what this function is supposed to do.');

    },
    init: function () {

      if ($('#clock').length == 0) {
        if ($('#secondtoolbar').length > 0) {
          // pre 2.30 version
          $('#secondtoolbar').before('<span id=\'clock\'>&nbsp;</span>');
        } else {
          // post 2.30 version
          $('#custombar').after('<span id=\'clock\' style=\'background-color:red;\' class=\'hidden-sm hidden-xs hidden-md\'>&nbsp;</span>');

          $('#clock').html('<button type="button" class="btn btn-primary">Composer un numéro</button>');
        }
      }

      // Add Widget

      var newklon = $('<div class="grid-stack-item" id="box_widgetdemoboxx" ><div class="grid-stack-item-content boxstyle boxstylebg"><div id="widgetdemocontent" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Collapse"><i class="fa fa-caret-square-o-up"></i></a><a class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="Lock/Unlock"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="widgetcountTitle">Widget Demo</span></h3></header><div class="widgetscroll" id="widgetdemolist"><div id="widgetdemo" class="text-center" style="padding-top:5px;"><h1>On affiche ce qu\'on veut ici</h1></div><div id="widgetdemograph" style="width:100%; height:150px;"></div></div></div></div>');
      grid = $('.grid-stack').data('gridstack');

      window.resizinggrid = 1;
      if (parseInt(currentrelease.replace(/\./g, '')) > 23101) {
        grid.addWidget(newklon, 0, 0, 3, 6, true);
      } else {
        grid.add_widget(newklon, 0, 0, 3, 6, true);
      }
      window.resizinggrid = 0;

    }
  };
}());
