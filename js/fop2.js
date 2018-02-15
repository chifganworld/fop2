var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(b, c, d) {
  b instanceof String && (b = String(b));
  for (var e = b.length, f = 0; f < e; f++) {
    var g = b[f];
    if (c.call(d, g, f, b)) {
      return {
        i: f,
        v: g
      }
    }
  }
  return {
    i: -1,
    v: void 0
  }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, c, d) {
  b != Array.prototype && b != Object.prototype && (b[c] = d.value)
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, c, d, e) {
  if (c) {
    d = $jscomp.global;
    b = b.split(".");
    for (e = 0; e < b.length - 1; e++) {
      var f = b[e];
      f in d || (d[f] = {});
      d = d[f]
    }
    b = b[b.length - 1];
    e = d[b];
    c = c(e);
    c != e && null != c && $jscomp.defineProperty(d, b, {
      configurable: !0,
      writable: !0,
      value: c
    })
  }
};
$jscomp.polyfill("Array.prototype.find", function(b) {
  return b ? b : function(b, d) {
    return $jscomp.findInternal(this, b, d).v
  }
}, "es6-impl", "es3");
var validez = 365,
  caduca = new Date;
caduca.setTime(caduca.getTime() + 864E5 * validez);
var return_from_reg_result = 0,
  isMac = -1 !== navigator.platform.toUpperCase().indexOf("MAC"),
  audioWav = !(!document.createElement("audio").canPlayType || !document.createElement("audio").canPlayType('audio/wav; codecs="1"').replace(/no/, "")),
  grid, grid_serialized = "",
  cellheight, preauth = 0,
  finalerror = 0,
  resizinggrid = 0,
  fopexit = 0,
  authorized = 0,
  cuantosBotones = 0,
  myposition = 0,
  lostConnection = 0,
  demora_conexion = 0,
  attempt = 1,
  conectado = 0,
  enable_ping = 0,
  tlscert = 0,
  notiChatTitle = 0,
  sms_enabled = 0,
  sms_messagesend = 0,
  chatadm_enabled = 0,
  ping = 30,
  pingcount = 0,
  wsconnect = 0,
  wsdowngrade = 0,
  xmlsocketdowngrade = 0,
  chatFocus = 0,
  flashSuccess = 0,
  port = 4445,
  host = "",
  lastkey = "",
  secret = "",
  myextension = "",
  entered_secret = "",
  entered_extension = "",
  currentrelease = "",
  currentrlicense = "",
  voicemailpath = "",
  queuedcommand = "",
  currentpresence = "",
  demoversion = -1,
  licenselevel = 1,
  timerID, ws, smstimer, globalselected = void 0,
  execute = new commandCenter,
  executeMenu = new menuCommandCenter,
  plugins = {},
  saveGridPos = {},
  savedTitle = document.title,
  wsproto = "ws://",
  wsprotook = "",
  unableToSetAuthSession = 1,
  buttontype = [],
  mypreferences = [],
  botonitos = [],
  membercache = {},
  dict_queue = [],
  deferredSetVar = [],
  postponedSetVar = [],
  printy_queue = {},
  printy_queue_r = {},
  extenlistGroup = [],
  queuelistGroup = [],
  extennumber = [],
  chanvars = [],
  extenpos = [],
  extenlabel = [],
  extengroup = [],
  extencontext = [],
  extenchan = [],
  extenmail = [],
  externalnumber = [],
  extencss = [],
  extentags = [],
  availablequeues = [],
  waitingCalls = [],
  numAgentes = [],
  ringclidnum = [],
  ringfromqueue = [],
  ringfromqueuenmr = [],
  ringclidname = [],
  permisos = [],
  displaygroups = [],
  doingatxfer = {},
  lastlink = {},
  lastchat = {},
  lastmechat = {},
  myplaceholder = {},
  tiempos = {},
  tiemposdirection = {},
  tiemposformat = {},
  queueindex = {},
  permisosbtn = {},
  restrictqueue = {},
  openchats = {},
  animado = {},
  sonido = {},
  disableActionBtn = {},
  curVmailPage = {},
  pluginParam = {},
  ringingchan = {},
  getExten = gup("exten"),
  getPass = gup("pass"),
  getQueuechannel = gup("queuechannel"),
  getChannel = gup("channel"),
  getPopupUrl = gup("popupurl"),
  rtime, rtimeout = !1,
  rdelta = 200;
$(window).resize(function() {
  rtime = new Date;
  !1 === rtimeout && (rtimeout = !0, setTimeout(resizeend, rdelta))
});

function resizeend() {
  if (new Date - rtime < rdelta) {
    setTimeout(resizeend, rdelta)
  } else {
    rtimeout = !1;
    var b = $("#head").height();
    $("body").css("paddingTop", b + 5)
  }
}
"undefined" == typeof consoleDebug && (consoleDebug = !0);
isSecure() && (wsproto = "wss://");
"undefined" === typeof context && (context = gup("context"));
"undefined" === typeof context && (context = "");
"" === context ? (context = "general", setSessionVariable("context", "", 1)) : setSessionVariable("context", context, 1);
"undefined" == typeof voicemailFormat && (voicemailFormat = "wav");
"undefined" == typeof enableDragTransfer && (enableDragTransfer = !0);
"undefined" == typeof showLines && (showLines = 2, debug("show lines " + showLines));
"undefined" == typeof disableWebSocket && (disableWebSocket = !1);
"undefined" == typeof desktopNotify && (desktopNotify = !0);
"undefined" == typeof disablePresenceOther && (disablePresenceOther = !1);
"undefined" == typeof disablePresence && (disablePresence = !1);
"undefined" == typeof disableQueueFilter && (disableQueueFilter = !1);
"undefined" == typeof hideUnregistered && (hideUnregistered = !1);
"undefined" == typeof consoleDebug && (consoleDebug = !1);
$(window).on("beforeunload ", function(b) {
  debug(b);
  if (0 === fopexit && !1 !== warnClose && 1 == conectado) {
    var c = lang.areyousure;
    "undefined" == typeof b && (b = window.event);
    b && (b.returnValue = c);
    return c
  }
});
var refreshTime = 300000;
window.setInterval(function() {
  $.ajax({
    cache: !1,
    type: "GET",
    data: "refresh=1",
    url: "setvar.php",
    success: function(b) {}
  })
}, refreshTime);

function isFloat(b) {
  return b === Number(b) && 0 !== b % 1
}
function mathEval(b) {
  var c = !0;
  b = b.replace(/(?:[a-z$_][a-z0-9$_]*)|(?:[;={}\[\]"'!&<>^\\?:])/ig, function(b) {
    if (Math.hasOwnProperty(b)) {
      return "Math." + b
    }
    c = !1
  });
  if (c) {
    try {
      return eval(b)
    } catch (d) {
      return debug("Invalid arithmetic expression"), 0
    }
  } else {
    return debug("Invalid arithmetic expression"), 0
  }
}
dust.helpers.formula = function(b, c, d, e) {
  c = dust.helpers.tap(e.value, b, c);
  c = mathEval(c);
  isNaN(c) && (c = 0);
  isFloat(c) && (c = Math.round(100 * c) / 100);
  return b.write(c)
};
dust.helpers.filter = function(b, c, d, e) {
  var f = dust.helpers.tap(e.type, b, c);
  return b.capture(d.block, c, function(b, c) {
    null != f && (b = dust.filters[f](b));
    c.write(b);
    return c.end()
  })
};
dust.filters.hhmmss = function(b) {
  var c = parseInt(b / 3600, 10),
    d = b - 3600 * c;
  b = parseInt(d / 60, 10);
  d = parseInt(d - 60 * b, 10);
  0 > c && (c = Math.abs(c));
  0 > b && (b = Math.abs(b));
  0 > d && (d = Math.abs(d));
  10 > c && (c = "0" + c);
  10 > b && (b = "0" + b);
  10 > d && (d = "0" + d);
  return "" + c + ":" + b + ":" + d
};
dust.filters.mmss = function(b) {
  "Infinity" == b && (b = 0);
  var c = parseInt(b / 60, 10);
  remaining = b - 60 * c;
  b = parseInt(remaining, 10);
  0 > c && (c = Math.abs(c));
  0 > b && (b = Math.abs(b));
  10 > c && (c = "0" + c);
  10 > b && (b = "0" + b);
  return c + ":" + b
};
dust.filters.piechart = function(b) {
  return "<div class='dustjs easyPieChart chart' data-percent='" + b + "'><span class='percent'>" + b + "</span></div>"
};
dust.filters.ajax = function(b) {
  return $.ajax({
    type: "GET",
    url: b,
    async: !1
  }).responseText
};
Mousetrap.bind("/", function() {
  $("#filtertext").focus();
  return !1
});
Mousetrap.bind(["t", "d"], function() {
  $("#dialtext").focus();
  return !1
});
Mousetrap.bind(["n"], function() {
  $(".dialpad-dropdown").addClass("open");
  return !1
});
Mousetrap.bind("0123456789*#".split(""), function(b, c) {
  $(".dialpad-dropdown").hasClass("open") && sendDtmf(c, 0);
  return !1
});
Mousetrap.bind("esc", function() {
  $("#filtertext").val("");
  $("#dialtext").val("");
  $("#dialtext").typeahead("val", "");
  $(".dialpad-dropdown").removeClass("open");
  filter_list()
});

function gup(b) {
  b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  b = new RegExp("[\\?&]" + b + "=([^&#]*)");
  var c = b.exec(window.location.href);
  return null == c ? (b = b.exec(window.name), null == b ? "" : b[1]) : c[1]
}
function debug(b) {
  void 0 !== window.console && !0 === consoleDebug && console.log(b)
}
function embed_flash() {
  0 == flashSuccess ? (debug("embed flash"), swfobject.embedSWF("fop2.swf", "flashconnector", "1", "1", "9.0.0", "expressInstall.swf", {
    callback: "flashConnect"
  }, {
    allowScriptAccess: "sameDomain"
  }, null, flashStatus)) : (debug("no embed flash, it was already ok"), flashConnect())
}
function menuCommandCenter() {
  this.addmember = function(b, c) {
    b = availablequeues[b];
    do_addmember(b, c)
  };
  this.delmember = function(b, c) {
    b = availablequeues[b];
    do_delmember(b, c)
  };
  this.pause = function(b, c) {
    b = -1 == b ? "" : availablequeues[b];
    qpause(b, c)
  };
  this.pausemember = function(b, c) {
    qpause("", c, b)
  };
  this.pausequeuemember = function(b, c, d) {
    qpause(availablequeues[b], c, d)
  };
  this.unpause = function(b, c) {
    b = -1 == b ? "" : availablequeues[b];
    qunpause(b, c)
  };
  this.sms = function(b, c) {
    void 0 !== externalnumber[c] ? (debug("Send sms to " + externalnumber[c]), sendsms(externalnumber[c], c)) : (debug("Try MessageSend to " + c), sendsms(0, c))
  };
  this.email = function(b, c) {
    void 0 !== extenmail[c] && (fopexit = 1, debug("Send mail to " + extenmail[c]), $("#mailform").get(0).setAttribute("action", "mailto:" + extenmail[c]), $("#mailform").submit(), myClearTime = setTimeout(function() {
      fopexit = 0
    }, 3000))
  };
  this.chat = function(b, c) {
    debug("chat " + b + " con " + c);
    createChat(c, extennumber[c] + " " + extenlabel[c], 0, "")
  };
  this.chatbroadcast = function(b, c) {
    debug("chat broadcast " + b + " con titulo " + c);
    createChat(b, c, 0, "")
  };
  this.notybroadcast = function(b, c) {
    alertify.set({
      labels: {
        ok: lang.accept,
        cancel: lang.cancel
      }
    });
    alertify.prompt(lang.message, function(c, e) {
      if (c) {
        debug("mando un notify broadcast a " + b);
        var f = Base64.encode(e),
          d = hex_md5(secret + lastkey);
        send('<msg data="' + myposition + "|notify|" + b + "!" + f + "|" + d + '" />')
      }
    }, "")
  };
  this.muteall = function(b) {
    do_muteall(b)
  };
  this.lock = function(b) {
    do_meetmeLock(b)
  };
  this.mute = function(b, c, d) {
    do_mute(b, c, d)
  };
  this.kick = function(b, c, d) {
    do_kick(b, c, d)
  };
  this.pickup = function(b) {
    pickupActive(b)
  };
  this.setpenalty = function(b, c, d) {
    qpenalty(availablequeues[b], c, d)
  }
}
function commandCenter() {
  function b(b, c, d) {
    textolabel = !1 === noExtenInLabel ? extennumber[b] + " " + c : c;
    $("#label" + b).html(textolabel);
    $("#label" + b).attr("data-original-title", c);
    botonitos[b].LABEL != c && (botonitos[b].LABEL = c)
  }
  function c(b, c, d) {
    c = c.split("^"); - 1 == c[0] ? "extension" == buttontype[b] ? (maindiv = "extensionbox", contentdiv = "extensioncontent", tagdiv = "extensiontag", listdiv = "extensionlist", bcasttag = "chatbroadcast_Extensions", autoheight = "extension", groupname = lang.extensions) : "queue" == buttontype[b] && (maindiv = "queuebox", contentdiv = "queuecontent", tagdiv = "queuetag", listdiv = "queuelist", bcasttag = "chatbroadcast_Extensions", autoheight = "queue", groupname = lang.queues) : (maindiv = "box_grp" + c[0] + "box", contentdiv = "box_grp" + c[0] + "content", tagdiv = "box_grp" + c[0] + "tag", listdiv = "box_grp" + c[0] + "list", bcasttag = "chatbroadcast_grp" + c[0], autoheight = "box_grp" + c[0], groupname = c[1]);
    0 == $("#" + maindiv).length && ("extension" == buttontype[b] ? (c = $.parseHTML(jQuery.template('<div id="#{maindiv}" data-gs-width="9"><div class="grid-stack-item-content boxstyle boxstylebg"> <div id="#{contentdiv}" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a href="javascript:void(0);" class="myclick button-icon widget-broadcast-btn ctxmenugroup broadcast" id="#{bcasttag}" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{broadcast}"><i class="fa fa-bullhorn "></i></a><a href="javascript:void(0);" class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{langcollapse}"><i class="fa fa-caret-square-o-up"></i></a><a href="javascript:void(0);" class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{lockunlock}"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="#{tagdiv}">#{groupname}</span></h3></header><div class="widgetscroll" id="#{listdiv}"></div></div></div></div>').eval({
      maindiv: maindiv,
      contentdiv: contentdiv,
      tagdiv: tagdiv,
      listdiv: listdiv,
      bcasttag: bcasttag,
      groupname: groupname,
      broadcast: lang.broadcast,
      lockunlock: lang.toggle_lock,
      langcollapse: lang.collapse
    })), grid = $(".grid-stack").data("gridstack"), grid.addWidget(c, 0, 0, 9, 2, !0), extenlistGroup.push(maindiv), hasPerm(0, "broadcast") || hasPerm(0, "all") || $("#" + bcasttag).hide()) : "queue" == buttontype[b] && (c = $.parseHTML(jQuery.template('<div id="#{maindiv}" data-gs-width="9"><div class="grid-stack-item-content boxstyle boxstylebg"> <div id="#{contentdiv}" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a href="javascript:void(0);" class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{langcollapse}"><i class="fa fa-caret-square-o-up"></i></a><a href="javascript:void(0);" class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{lockunlock}"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="#{tagdiv}">#{groupname}</span></h3></header><div class="widgetscroll" id="#{listdiv}"></div></div></div></div>').eval({
        maindiv: maindiv,
        contentdiv: contentdiv,
        tagdiv: tagdiv,
        listdiv: listdiv,
        groupname: groupname,
        broadcast: lang.broadcast,
        lockunlock: lang.toggle_lock,
        langcollapse: lang.collapse
      })), grid = $(".grid-stack").data("gridstack"), grid.addWidget(c, 0, 0, 9, 2, !0), queuelistGroup.push(maindiv)));
    c = $("#boton" + b).parent().parent().parent().parent();
    d = $("#" + listdiv);
    d.find(".clearfix").detach();
    $("#boton" + b).detach().appendTo(d);
    $("<div class='clearfix bottommargin'></div>").appendTo(d);
    grid_auto_height(autoheight);
    0 == c.find('[class*="labelname"]').length && c.detach()
  }
  function d(b, c, d, p) {
    var e = "";
    if ("broadcast" == b) {
      myposition == c && extennumber[c] != extennumber[p] && (textoDecoded = Base64.decode(d), alertify.log(extennumber[p] + ": " + textoDecoded, "", 0))
    } else {
      if (myposition == c && 0 < notifyDuration) {
        if ("" != popupUrl) {
          if ("" != getPopupUrl && (debug("Force AutoPoup as we got popupUrl via get"), AutoPopup = !0), e = Base64.decode(popupUrl), d = e.match(/#\{[^\}]*\}/g), void 0 === chanvars[c] && (chanvars[c] = {}), chanvars[c].CLIDNUM = ringclidnum[c], chanvars[c].CLIDNAME = ringclidname[c], chanvars[c].EXTEN = myextension, void 0 !== ringfromqueue[c] && (chanvars[c].FROMQUEUE = ringfromqueue[c]), void 0 !== ringfromqueuenmr[c] && (chanvars[c].FROMQUEUENUMBER = ringfromqueuenmr[c]), null !== d) {
            for (p = 0; p < d.length; p++) {
              var f = d[p].substr(2, d[p].length - 3),
                g = "",
                g = "CLIDNUM" == f || "CLIDNAME" == f ? Base64.decode(chanvars[c][f]) : chanvars[c][f],
                e = replace(e, d[p], g)
            }
          } else {
            debug("no variable match")
          }
        }
        if (!0 === AutoPopup && "" != e) {
          debug("URL Popup set and Auto Popup set, lets open it! " + e), openNewBackgroundTab(e)
        } else {
          !0 !== AutoPopup && (debug("No autopopup set for this extension"), debug(AutoPopup));
          "" == e && debug("No popup because there is no url set");
          d = "poptype=" + b + "&clidnum=" + ringclidnum[c] + "&clidname=" + ringclidname[c] + "&exten=" + myextension;
          void 0 !== ringfromqueue[c] && (d = d + "&fromqueue=" + Base64.encode(ringfromqueue[c]));
          void 0 !== ringfromqueuenmr[c] && (d = d + "&fromqueuenumber=" + ringfromqueuenmr[c]);
          if (void 0 !== chanvars[c]) {
            for (var n in chanvars[c]) {
              debug(n + " = " + chanvars[c][n]), d = d + "&" + n + "=" + chanvars[c][n]
            }
          }
          "" != e && (d = d + "&url=" + Base64.encode(e));
          titulo = "ringing" == b ? lang.incoming_call : "connect" == b ? lang.call_connected : lang.note;
          var q = jQuery.ajax({
            type: "GET",
            data: d,
            url: "checkdir.php",
            success: function(b, c) {
              var e = jQuery.parseJSON(q.getResponseHeader("X-JSON")),
                f = Base64.decode(e.clidnum),
                d = Base64.decode(e.clidname),
                g = e.picture,
                p = Base64.decode(e.queue),
                h = Base64.decode(e.url),
                g = window.location.protocol + "//" + window.location.host + window.location.pathname.slice(0, window.location.pathname.lastIndexOf("/")) + "/" + g,
                l = f + " " + d,
                f = f + " " + replace(d, "<br/>", "\n");
              "" != p && (l += "<br/>" + lang.from_queue + " " + p, f += "\n" + lang.from_queue + " " + p);
              "" != h && (poptext = lang.hasOwnProperty("Popup") ? lang.Popup : "Popup", l += "<br/><a style='color:#ff0;' href='" + h + "' target='_blank'>" + poptext + "</a>");
              !0 === desktopNotify && window.notifylib.notify({
                title: titulo,
                description: f,
                icon: g,
                timeout: notifyDuration,
                url: e.url
              });
              e = "<div class='container-fluid'><div class='row'><div class='col-xs-12 col-lg-12 nopad notifyTitle'>" + titulo + "</div></div><div class='row'><div class='col-xs-4 col-lg-4 nopad'><img class='img-responsive' src='" + g + "'/></div><div class='col-xs-8 col-lg-8 notifyText'>" + l + "</div></div></div>";
              alertify.set({
                delay: 1000 * notifyDuration
              });
              alertify.log(e)
            },
            error: function(b) {
              debug(b)
            }
          })
        }
      } else {
        debug("my position: " + myposition + " notifyDuration: " + notifyDuration + " no popup!")
      }
    }
  }
  this.key = function(b, c, d) {
    enable_ping = 1;
    lastkey = c;
    "undefined" != typeof secret && sends_auth();
    "" !== getQueuechannel && send('<msg data="GENERAL|qchan|' + getQueuechannel + '|" />');
    "" !== getChannel && send('<msg data="GENERAL|mychan|' + getChannel + '|" />');
    showSecBox()
  };
  this.version = function(b, c, d) {
    b = c.split("!");
    currentrelease = b[0];
    currentlicense = b[1];
    licenselevel = b[2];
    $("#footer").css("visibility", "visible");
    $("#footer").css("display", "block");
    $("#footer").css("background", "#333")
  };
  this.reload = function(b, c, d) {};
  this.getvar = function(b, c, d) {
    b = Base64.decode(c);
    debug("getvar texto = " + b)
  };
  this.incorrect = function(b, c, d) {
    secret = "";
    authorized = 0;
    entered_secret = "";
    window.name = "";
    $("#invalidcredentials").html("<div class='alert alert-danger'>" + lang.invalid_credentials + "</div>");
    showSecBox()
  };
  this.correct = function(b, c, d) {
    setSessionVariableAuth("key", lastkey);
    setSessionVariable("extension", myextension, 1);
    $("#invalidcredentials").html("");
    authorized = 1;
    $("#myextensionnavbar").html(myextension);
    stored_extension = gup("exten");
    "" != entered_extension && entered_extension != stored_extension && (window.name = "", debug("clear window name because entered extension " + entered_extension + " is different than stored " + stored_extension));
    window.name = addUrlParameter(window.name, "exten", myextension);
    window.name = addUrlParameter(window.name, "pass", secret)
  };
  this.preferences = function(b, c, d) {
    b = Base64.decode(c);
    debug("Got stored preferences " + b);
    mypreferences = jQuery.parseJSON(b);
    defaultPreferences();
    void 0 !== mypreferences.language && mypreferences.language != language && (language = mypreferences.language, jQuery.getScript("js/lang_" + mypreferences.language + ".js", function() {
      setLang()
    }))
  };
  this.defaultpreferences = function(b, c, d) {
    b = Base64.decode(c);
    debug("Got default preferences " + b);
    eval(b);
    jQuery.getScript("js/lang_" + language + ".js", function() {
      setLang()
    })
  };
  this.defaultpresence = function(b, c, d) {
    b = Base64.decode(c);
    b = JSON.parse(b);
    presence = {
      "": ""
    };
    for (var e in b) {
      presence[e] = b[e]
    }
    setPresenceOptions()
  };
  this.vmailpath = function(b, c, d) {
    voicemailpath = c;
    setSessionVariable("vpath", c)
  };
  this.permit = function(b, c, d) {
    b = Base64.decode(c);
    debug(b);
    permisos = b.split(",");
    setSessionVariable("permit", b);
    permisosbtn = {};
    hideshowtoolbaricons()
  };
  this.permitbtn = function(b, c, d) {
    c = Base64.decode(c).split("!");
    b = c[0];
    c = c[1];
    permisosbtn[b] = c.split(",");
    debug("permisosbtn (" + b + ")=" + c);
    "all" == b && 0 == c && (debug("Tiene permiso all en general, pongo sesion admin"), setSessionVariable("admin", 1), $(".broadcast").show());
    hideshowtoolbaricons()
  };
  this.restrictq = function(b, c, d) {
    b = Base64.decode(c);
    c = b.split("!");
    restrictqueue[c[0]] = c[1];
    debug("queue restrict " + b)
  };
  this.zbuttons = function(e, d, g) {
    debug("en zbuttons");
    membercache = {};
    e = 0;
    d = Base64.decode(d).split("\n");
    for (g = 0; g < d.length; g++) {
      var f = d[g].split("!"),
        h = f[0].split("@")[0];
      f.shift();
      for (var l = isqueue = isextension = hasgroup = 0; l < f.length; l++) {
        var k = f[l].split("=", 2);
        if ("" !== k[0]) {
          if (void 0 == botonitos[h] && (debug("botonitos de (" + h + ") esta undefined, hay un nuevo botonito!, pongo drawme en 2"), e = 2, botonitos[h] = {}), void 0 !== botonitos[h][k[0]]) {
            if ("MAINCHANNEL" == k[0]) {
              botonitos[h][k[0]] != k[1] ? (e = 10, debug("A different channel for the same button position on " + h + ", we must window.reload, drawme is now = " + e)) : debug("Same channel on position " + h + " = " + k[1])
            } else {
              if ("GROUP" == k[0]) {
                if (hasgroup = 1, botonitos[h][k[0]] != k[1]) {
                  for (0 > jQuery.inArray(k[1], displaygroups) && displaygroups.push(k[1]), i = 0; i < displaygroups.length; i++) {
                    k[1] == displaygroups[i] && ("" == k[1] && (i = -1), c(h, i + "^" + displaygroups[i], 0))
                  }
                }
              } else {
                if ("LABEL" == k[0]) {
                  var n = Base64._utf8_decode(k[1]);
                  botonitos[h][k[0]] != n && (debug("previous label (" + botonitos[h][k[0]] + ") is different that current (" + k[1] + ")"), b(h, n, 0))
                } else {
                  "TYPE" == k[0] ? "extension" == k[1] ? isextension = 1 : "queue" == k[1] && (isqueue = 1) : "TAGS" == k[0] && (extentags[h] = Base64._utf8_decode(k[1]), $("#taggs" + h).html(extentags[h]))
                }
              }
            }
            botonitos[h][k[0]] = k[1]
          } else {
            "LABEL" == k[0] && (k[1] = Base64._utf8_decode(k[1])), botonitos[h][k[0]] = k[1], "EXTENSION" == k[0] && (extenpos[k[1]] = h, k[1] == myextension && (myposition = h))
          }
        }
      }
      0 != hasgroup || 1 != isextension && 1 != isqueue || void 0 === botonitos[h].GROUP || "" == botonitos[h].GROUP || (1 == isextension && c(h, "-1^Extensions", 0), 1 == isqueue && c(h, "-1^Queues", 0), botonitos[h].GROUP = "")
    }
    0 == cuantosBotones && (debug("cuantosBotones is at zero, this is a new connection. Setting drawme = 1 so it draws and does not reload"), e = 1);
    cuantosRecibidosEnZbuttons = d.length;
    --cuantosRecibidosEnZbuttons;
    debug("cuantos recibidos en zbuttons = " + cuantosRecibidosEnZbuttons);
    debug("cuantos botones habia ya = " + cuantosBotones);
    0 < cuantosBotones && (debug("cuantos botones > 0 = " + cuantosBotones), 1 == lostConnection && (lostConnection = 0), cuantosRecibidosEnZbuttons != cuantosBotones ? (e = 2, debug("Received " + cuantosRecibidosEnZbuttons + " buttons, different than " + cuantosBotones + " that we had before, so set drawme to " + e + " forcing a reload")) : debug("Received " + cuantosRecibidosEnZbuttons + " buttons, the same number we had before (" + cuantosBotones + "), and drawme = " + e));
    debug("drawme final value = " + e);
    0 < e && (1 < e ? (debug("we must reload because drawme > 1"), warnClose = !1, fillextension = entered_extension != myextension ? entered_extension : myextension, fillsecret = entered_secret != secret ? entered_secret : secret, window.location.reload()) : (debug("drawme = 1, no need for reload, but we must actually draw buttons/toolbar"), cuantosBotones = cuantosRecibidosEnZbuttons, drawButton()));
    askFirstState();
    setLang();
    grid_auto_height("park");
    grid_auto_height("conference");
    grid_auto_height("trunk");
    grid_auto_height("ringgroup");
    grid_auto_height("queue");
    grid_auto_height("sms");
    grid_auto_height("extension");
    for (i = 0; i < displaygroups.length; i++) {
      grid_auto_height("box_grp" + i), debug("grupo " + displaygroups[i])
    }
    auto = AutoAnswer ? 1 : 0;
    send('<msg data="' + myposition + "|autoanswer|" + auto + '|" />');
    restoreGrid(Base64.decode(mypreferences.grid));
    $(".clid").dblclick(function(b) {
      dblclickFunc(b, this)
    })
  };
  this.demo = function(b, c, d) {
    debug("function demo");
    demoversion = c;
    debug("demo " + demoversion);
    b = findHighestZ();
    debug("high z " + b);
    c = $("#footer");
    c.css("visibility", "visible");
    c.css("display", "block");
    c.css("background", "#AAA");
    c.css("color", "#000");
    c.css("bottom", "0");
    c.css("left", "0");
    c.css("opacity", "0.8");
    c.css("paddingTop", "3px");
    c.css("width", "100%");
    c.css("position", "fixed");
    c.css("zIndex", b)
  };
  this.pong = function(b, c, d) {
    pingcount--; - 1 != demoversion && (b = Base64.decode(c), b = replace(b, "footer", "#footer"), b = replace(b, "new Te", "jQuery.te"), b = replace(b, "evaluate", "eval"), b = replace(b, ', "after"', ""), b = replace(b, "foot.update", "foot.html"), b = replace(b, "foot.style", "//foot.style"), eval(b), foot.css("visibility", "visible"), foot.css("display", "block"), foot.css("background", "#AAA"), foot.css("color", "#000"), foot.css("bottom", "0"), foot.css("left", "0"), foot.css("opacity", "0.8"), foot.css("paddingTop", "3px"), foot.css("width", "100%"), foot.css("position", "fixed"), foot.css("zIndex", zh))
  };
  this.qualify = function(b, c, d) {
    d = $("#boton" + b);
    "notok" == c ? (d.addClass("notregistered"), !0 === hideUnregistered && (b != myposition && d.hide(), hayalguno = 0, d.siblings().each(function() {
      $(this).hasClass("extenbutton") && $(this).is(":visible") && hayalguno++
    }), 0 == hayalguno && d.parent().parent().parent().hide())) : (d.removeClass("notregistered"), !0 === hideUnregistered && (d.show(), d.parent().parent().parent().show()))
  };
  this.voicemail = function(b, c, d) {
    b = $("#mwi" + b);
    "1" == c || "2" == c ? (b.css("visibility", "visible"), "2" == c ? b.addClass("notregistered") : b.removeClass("notregistered")) : b.css("visibility", "hidden")
  };
  this.voicemailcount = function(b, c, d) {
    b = $("#mwi" + b);
    d = c;
    "&" == c.substring(0, 1) && (c = translate(c));
    null !== b && (b.attr("data-original-title", c), b.attr("data-mwi", d));
    debug("voicemail count " + c)
  };
  this.lock = function(b, c, d) {
    b = $("#meetme" + b);
    b.addClass("meetmeLock");
    b.removeClass("meetmeIcon")
  };
  this.unlock = function(b, c, d) {
    b = $("#meetme" + b);
    b.addClass("meetmeIcon");
    b.removeClass("meetmeLock")
  };
  this.astdbcust = function(b, c, d) {
    b = $("#extrainfo" + b);
    b.attr("data-original-title", c);
    "" !== c ? b.addClass("custom") : b.removeClass("custom")
  };
  this.devtype = function(b, c, d) {
    b = $("#boton" + b); - 1 < c.indexOf("adhoc") && b.addClass("adhoc")
  };
  this.fromqueue = function(b, c, d) {
    d = $("#extrainfo" + b);
    var e = c,
      f = c;
    "undefined" !== typeof printy_queue[c] && (e = printy_queue[c]);
    "undefined" !== typeof printy_queue_r[c] && (f = printy_queue_r[c]);
    d.attr("data-original-title", lang.from_queue + " " + e);
    ringfromqueue[b] = e;
    ringfromqueuenmr[b] = f;
    d.addClass("extrainfo");
    debug(d)
  };
  this.queuemember = function(b, c, d) {
    $("#boton" + b);
    b = Base64.decode(c);
    if ("" == b) {
      debug("no hay cambios")
    } else {
      b = jQuery.parseJSON(b);
      for (var e in b) {
        membclass = "busy" == b[e].state || "hold" == b[e].state ? 1 == b[e].paused ? "memberbusypaused" : "memberbusy" : "invalid" == b[e].state || "unavail" == b[e].state ? 1 == b[e].paused ? "memberpaused" : "memberinvalid" : "ringing" == b[e].state ? "memberready animated infinite tada" : 1 == b[e].paused ? "memberpaused" : "memberready";
        c = "";
        "" != b[e].fromqueue && (c = b[e].fromqueue.substring(6, b[e].fromqueue.length), c = ", " + lang.from_queue + " " + dict_queue[c]);
        var f = d = "";
        "" != b[e].reason && (f = lang.reason + ": " + b[e].reason);
        d += lang.penalty + " " + b[e].pty + ", " + lang.calls_taken + " " + b[e].callstaken + c;
        c = "tick_" + b[e].queue + "_" + b[e].loc;
        c = c.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "");
        var g = "qm~" + b[e].queue + "~" + b[e].loc,
          g = g.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "");
        $("#" + g).attr("class", "ctxmenuqueue " + membclass).attr("data-original-title", f).tooltip({
          container: "body",
          html: !0
        });
        $("#title" + g).attr("data-html", !0).attr("data-original-title", d).tooltip({
          container: "body",
          html: !0
        });
        0 < b[e].currentcall ? (d = b[e].now - b[e].currentcall, d = Math.round((new Date).getTime() / 1000) - d, tiempos[c] = 1000 * d, tiemposdirection[c] = "UP") : ($("#" + c).html(""), delete tiempos[c], delete tiemposdirection[c])
      }
    }
  };
  this.queuemembers = function(b, c, d) {
    var e;
    d = $("#boton" + b);
    c = Base64.decode(c);
    c = jQuery.parseJSON(c);
    var f = "";
    "undefined" == typeof window.countqueues && (window.countqueues = 0);
    "undefined" == typeof window.queuesismember && (window.queuesismember = {});
    window.countqueues++;
    largo = availablequeues.length;
    c.sort(function(b, c) {
      var e = parseFloat(b.pty) + 100000 + " " + b.name.toLowerCase(),
        d = parseFloat(c.pty) + 100000 + " " + c.name.toLowerCase();
      return e < d ? -1 : e > d ? 1 : 0
    });
    var g = {},
      k = {};
    window.queuesismember[b] = [];
    for (var n in c) {
      window.queuesismember[b].push(c[n].loc);
      membclass = "busy" == c[n].state || "hold" == c[n].state ? 1 == c[n].paused ? "memberbusypaused" : "memberbusy" : "invalid" == c[n].state || "unavail" == c[n].state ? 1 == c[n].paused ? "memberpaused" : "memberinvalid" : 1 == c[n].paused ? "memberpaused" : "memberready";
      var q = e = "";
      "" != c[n].fromqueue && (e = c[n].fromqueue.substring(6, c[n].fromqueue.length), q = dict_queue[e], e = ", " + lang.from_queue + " " + q);
      var m = q = "";
      "" != c[n].reason && (m = lang.reason + ": " + c[n].reason);
      q += lang.penalty + " " + c[n].pty + ", " + lang.calls_taken + " " + c[n].callstaken + e;
      e = "tick_" + c[n].queue + "_" + c[n].loc;
      e = e.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "");
      var r = "qm~" + c[n].queue + "~" + c[n].loc,
        r = r.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, ""),
        f = f + ("<div class='" + membclass + " ctxmenuqueue' data-channel='qm~" + c[n].queue + "~" + c[n].loc + "'  id='" + r + "' data-toggle='tooltip' data-original-title='" + m + "'></div><span id='title" + r + "' class='qimember' data-toggle='tooltip' data-original-title='" + q + "'>" + c[n].name + "</span><span class='timer' id='" + e + "'></span><br/>");
      0 < c[n].currentcall ? (g[e] = c[n].currentcall, k[e] = c[n].now) : ($("#" + e).html(""), delete tiempos[e], delete tiemposdirection[e])
    }
    n = $("#agententries_" + b);
    if (f == membercache[b]) {
      debug("no hay cambios en la lista de miembros en el boton " + b + ", no cambiamos nada")
    } else {
      n.html(f);
      membercache[b] = f;
      n = Math.round((new Date).getTime() / 1000);
      for (e in g) {
        f = parseInt(k[e]) - parseInt(g[e]), debug("qtimer cada member timer " + e), f = n - f, debug("qtimer finaltime = " + f), tiempos[e] = 1000 * f, tiemposdirection[e] = "UP"
      }
      e = c.length;
      $("#agentsummary_" + b).html(translate("&agents!" + e));
      numAgentes[b] = e;
      d.hasClass("selected") && (d = $("#agententries_" + b).children(), filter_agentes(d));
      $("#agententries_" + b + ' [data-toggle="tooltip"]').tooltip({
        container: "body"
      })
    }
    if (window.countqueues == largo) {
      for (window.countqueues = 0, grid_auto_height("queue"), b = 0; b < queuelistGroup.length; b++) {
        d = queuelistGroup[b].substring(0, queuelistGroup[b].length - 3), grid_auto_height(d)
      }
    }
  };
  this.settext = function(b, c, d) {
    b = $("#clid" + d + "_" + b);
    $(b).trigger("flipflopstop");
    if ("&" == c.substring(0, 1)) {
      c = translate(c), b.html(c), b.removeAttr("data-original-title")
    } else {
      if (b.length) {
        if (1 < c.trim().indexOf(" ")) {
          var e = c.indexOf(" ");
          d = c.substring(0, e);
          e = c.substring(e);
          $(b).flipflop({
            text1: d,
            text2: e
          })
        }
        b.html(c);
        b.attr("data-original-title", c).tooltip({
          container: "body"
        })
      }
    }
  };
  this.usersonline = function(b, c, d) {
    b = Base64.decode(c).split(",");
    for (c = 0; c < b.length; c++) {
      $("#presence" + b[c]).html("\u221a")
    }
  };
  this.xstatus = function(b, c, d) {
    b = $("#extrainfo" + b);
    "unpaused" == c ? (b.removeClass("paused"), b.attr("title", "")) : ("paused" != c ? (reason = void 0 !== lang[c] ? lang[c] : c, b.attr("data-original-title", lang.paused + " (" + reason + ")")) : b.attr("data-original-title", lang.paused), b.addClass("paused"))
  };
  this.presence = function(b, c, d) {
    d = $("#presence" + b);
    c = Base64.decode(c);
    lang.hasOwnProperty(c) ? d.attr("data-original-title", lang[c]) : d.attr("data-original-title", c);
    setThisTip("presence" + b);
    "" === c ? (d.removeClass("presenceOther"), d.css("backgroundColor", "")) : (d.addClass("presenceOther"), "undefined" == typeof presence[c] ? d.css("backgroundColor", "#00d020") : d.css("backgroundColor", presence[c]));
    if (myposition == b) {
      d = b = 0;
      for (var e in presence) {
        e == c && ($("#presence")[0].selectedIndex = d, $(".selectpicker").selectpicker("refresh"), b = 1), d++
      }
      0 === b && "" !== c && ($("#presence")[0].selectedIndex = $("#presence")[0].length - 1, $(".selectpicker").selectpicker("refresh"));
      setSelectedPresenceClass()
    }
  };
  this.ip = function(b, c, d) {
    $("#label" + b).attr("data-original-title", c)
  };
  this.state = function(b, c, d) {
    var e = $("#boton" + b),
      f = $("#presence" + b),
      g = $("#extrainfo" + b);
    $("#phone" + b);
    var k = $("#phone" + d + "_" + b);
    c = c.split("+");
    if (0 <= jQuery.inArray("DOWN", c)) {
      if ("0" == d && (e.removeClass("busy"), e.addClass("free"), f.length && (f.removeClass("presenceBusy"), f.addClass("presenceNormal"), f.removeClass("cassette")), "" != $("#iframecdr").attr("src") && (e = document.getElementById("iframecdr"), e.src = e.src)), "extension" == buttontype[b] && (k.length && (k.removeClass("ringing2"), k.removeClass("entrante"), k.removeClass("saliente"), k.removeClass("hold"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).addClass("invisible"), !0 === enableDragTransfer && k.hasClass("ui-draggable") && k.draggable("destroy")), g.removeClass("extrainfo"), g.hasClass("paused") || g.hasClass("custom") || (g.removeAttr("data-original-title"), g.removeAttr("title"))), void 0 !== ringingchan[b] && delete ringingchan[b][d], void 0 !== chanvars[b]) {
        for (var n in chanvars[b]) {
          debug("delete " + n + " = " + chanvars[b][n]), delete chanvars[b][n]
        }
      }
    } else {
      0 <= jQuery.inArray("HOLD", c) ? k.length && (k.addClass("hold"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).removeClass("invisible")) : 0 <= jQuery.inArray("UP", c) ? (e.addClass("busy"), e.removeClass("free"), f.length && (f.hasClass("presenceNormal") && f.removeClass("presenceNormal"), f.addClass("presenceBusy")), k.length && (!0 === enableDragTransfer && $("#phone" + d + "_" + b).draggable({
        helper: function() {
          return $("<div></div>").addClass("extension").appendTo("body").css({
            zIndex: 5
          })
        },
        revert: !1,
        stop: function(b, c) {
          debug("drag stop")
        }
      }), k.removeClass("hold"), k.removeClass("ringing2"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).removeClass("invisible"))) : 0 <= jQuery.inArray("RINGING", c) ? (debug("esta en ringing"), !0 === enableDragTransfer && $("#phone" + d + "_" + b).draggable({
        helper: function() {
          return $("<div></div>").addClass("extension").appendTo("body").css({
            zIndex: 5
          })
        },
        revert: !1,
        stop: function(b, c) {
          debug("drag stop")
        }
      }), b == myposition && "" !== mypreferences.soundRing && sonido.ring.play(), k.length && (k.addClass("ringing2"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).removeClass("invisible"))) : k.length && (k.removeClass("ringing2"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).removeClass("invisible"))
    }
    delete ringfromqueue[b]
  };
  this.link = function(b, c, d) {
    myposition == b && ($("#dialtext").val(""), $("#dialtext").typeahead("val", ""), $("dialtext").focus(), "undefined" == typeof lastlink[b] && (lastlink[b] = c), lastlink[b] != c && delete doingatxfer[b], lastlink[b] = c)
  };
  this.direction = function(b, c, d) {
    b = $("#phone" + d + "_" + b);
    b.length && ("outbound" == c ? (b.addClass("saliente"), b.removeClass("entrante")) : (b.addClass("entrante"), b.removeClass("saliente")))
  };
  this.settimer = function(b, c, d) {
    var e = c.split("@");
    c = e[0];
    var e = e[1],
      f = "timer_" + b + "_" + d,
      g = new Date;
    if ("UP" == e || "IDLE" == e || "DOWN" == e) {
      tiempos[f] = g.getTime() - 1000 * parseInt(c, 10), tiemposdirection[f] = e
    }
    "STOP" == e && (delete tiempos[f], delete tiemposdirection[f], b = $("#tick" + d + "_" + b), b.length && b.html(""))
  };
  this.rename = b;
  this.changegroup = c;
  this.notionline = function(b, c, d) {
    debug("noti online nro " + b + " y texto " + c);
    if ("" != c) {
      for (var e in openchats) {
        e == c && newChat(e, myposition, "NOWONLINE")
      }
      0 == b && 1 == d && myposition == c || debug(b + " distinto " + myposition);
      $("#presence" + c).html("\u221a")
    }
  };
  this.notioffline = function(b, c, d) {
    debug("noti offline nro " + b + " y texto " + c);
    if ("" != c) {
      for (var e in openchats) {
        e == c && newChat(e, myposition, "NOTONLINE")
      }
      $("#presence" + c).html("")
    }
  };
  this.details = function(b, c, d) {
    d = Base64.decode(c);
    c = $("#trunkentries_" + b);
    if ("" == d) {
      c.html("")
    } else {
      if ("park" == buttontype[b]) {
        d = jQuery.parseJSON(d);
        debug(d);
        var e = "",
          f = 1,
          g;
        for (g in d) {
          e += "<div id='park-park!" + d[g].lot + "!" + d[g].slot + "' class='ctxmenupickup'><div class='saliente parkedcall'></div><div style='float:left; font-style:italic;'>" + d[g].slot + "</div><div style='float:left;'>&nbsp;&nbsp;</div><div style='float:left;'>" + d[g].clidnum + " " + d[g].clidname + "</div></div><div style='float:right;'>(" + d[g].from + ") <div id='tick" + f + "_" + b + "'>" + d[g].timeout + "</div></div><br class='clear' />\n", f++
        }
      } else {
        for (g in d = jQuery.parseJSON(d), f = e = "", d) {
          f = "outbound" == d[g].direction ? "saliente" : "entrante", e += "<div class='" + f + " ctxmenupickup trunkcall' id='trnk-" + d[g].channel + "'></div><div style='float:left;'>" + d[g].channel + "</div><div style='float:right;'>" + d[g].callerid + "</div><br class='clear' />\n"
        }
      }
      c.html(e);
      c.children(".ctxmenupickup").each(function() {
        $(this).draggable({
          helper: function() {
            return $(this).clone().appendTo("body").css({
              zIndex: 5
            })
          },
          revert: !0,
          stop: function(b, c) {
            debug($(this))
          }
        })
      });
      grid_auto_height(buttontype[b])
    }
  };
  this.queueentry = function(b, c, d) {
    var e = $("#queueentries_" + b),
      f = c.split("!"),
      g = f[1],
      k = f[2];
    c = f[3];
    var n = Base64.decode(f[4]),
      f = "timer_" + b + "_" + d,
      q = "tick" + d + "_" + b;
    n == c && (n = "");
    c = d + ". <" + c + "> " + n;
    n = document.createElement("li");
    $(n).addClass("qentrylabel").addClass("ctxmenupickup").attr("id", "qe_" + b + "_" + d).data("channel", g).html(c);
    e.append(n);
    n = document.createElement("li");
    $(n).addClass("qentrytimer").attr("id", q).html("00:00:00");
    e.append(n);
    n = document.createElement("li");
    $(n).addClass("clear").attr("id", "qclear_" + b + "_" + d);
    e.append(n);
    tiempos[f] = (new Date).getTime() - 1000 * parseInt(k, 10);
    e = $("#queueentries_" + b + " li").length;
    e /= 3;
    $("#queuesummary_" + b).html(translate("&calls!" + e));
    !0 === enableDragTransfer && $("#qe_" + b + "_" + d).draggable({
      helper: function() {
        return $(this).clone().appendTo("body").css({
          zIndex: 5
        })
      },
      revert: !0,
      stop: function(b, c) {
        debug("drag stop");
        debug($(this))
      }
    })
  };
  this.waitingcalls = function(b, c, d) {
    waitingCalls[b] = c;
    grid_auto_height("queue");
    for (b = 0; b < queuelistGroup.length; b++) {
      c = queuelistGroup[b].substring(0, queuelistGroup[b].length - 3), grid_auto_height(c)
    }
  };
  this.clearentries = function(b, c, d) {
    $("#queueentries_" + b).children().remove();
    for (var e in tiempos) {
      e.split("_")[1] == b && (delete tiempos[e], delete tiemposdirection[e])
    }
    numCallsWaiting = 0;
    $("#queuesummary_" + b).html(translate("&calls!" + numCallsWaiting));
    waitingCalls[b] = numCallsWaiting;
    debug("cola " + b + " quedo con llamados: " + waitingCalls[b])
  };
  this.members = function(b, c, d) {
    var e = jQuery.parseJSON(Base64.decode(c));
    c = $("#meetmeentries_" + b);
    d = "";
    for (var f in e) {
      var g = "";
      var k = "on" == e[f].ismarked ? "on" == e[f].ismuted ? "meetmeadminmuted" : "meetmeadmin" : "on" == e[f].ismuted ? "meetmemuted" : "meetmeready";
      "on" == e[f].istalking && (g = "meetmetalking");
      var n = e[f].conference.split("/")[1] + "-" + e[f].channel;
      d += "<div class='" + k + " " + g + " ctxmenuparticipant' id='" + n + "'></div><span class='cparticipant'>" + e[f].channel + " - " + e[f].name + "</span><br class='clear'/>"
    }
    f = e.length;
    0 < f ? $("#extrainfo" + b).html("(" + f + ")") : $("#extrainfo" + b).html("");
    c.html(d)
  };
  this.soundjoin = function(b, c, d) {
    "" !== mypreferences.soundQueue && sonido.enterqueue.play()
  };
  this.clidnum = function(b, c, d) {
    myposition == b && (ringclidnum[b] = c)
  };
  this.clidname = function(b, c, d) {
    myposition == b && (ringclidname[b] = c)
  };
  this.setvar = function(b, c, d) {
    c = Base64.decode(c);
    1 <= c.indexOf("=") && (void 0 === chanvars[b] && (chanvars[b] = {}), partes = c.split("="), chanvars[b][partes[0]] = partes[1])
  };
  this.dialingchannel = function(b, c, d) {
    ringingchan[b] || (ringingchan[b] = {});
    ringingchan[b][d] || (ringingchan[b][d] = c)
  };
  this.setZero = function(b, c, d) {
    d = $("#boton" + b);
    var e = $("#presence" + b);
    c = $("#extrainfo" + b);
    $("#phone" + b);
    d.removeClass("busy");
    d.addClass("free");
    e.length && (e.removeClass("presenceBusy"), e.addClass("presenceNormal"), e.removeClass("cassette"));
    if ("extension" == buttontype[b]) {
      for (d = 1; 4 > d; d++) {
        var e = $("#phone" + d + "_" + b),
          f = $("#clid" + d + "_" + b),
          g = "timer_" + b + "_" + d,
          k = $("#tick" + d + "_" + b);
        k.length && k.html("");
        e.length && (delete tiempos[g], delete tiemposdirection[g], f.trigger("flipflopstop"), f.html(translate("&inactive_line!" + d)), e.removeClass("ringing2"), e.removeClass("entrante"), e.removeClass("saliente"), e.removeClass("hold"), "on" == mypreferences.dynamicLineDisplay && $("#acline_" + d + "_" + b).addClass("invisible"), !0 === enableDragTransfer && e.hasClass("ui-draggable") && e.draggable("destroy"))
      }
    }
    c.removeClass("extrainfo");
    c.hasClass("paused") || c.hasClass("custom") || (c.removeAttr("data-original-title"), c.removeAttr("title"))
  };
  this.notifyringing = function(b, c, g) {
    d("ringing", b, c, g)
  };
  this.notifyconnect = function(b, c, g) {
    d("connect", b, c, g)
  };
  this.notifybroadcast = function(b, c, g) {
    d("broadcast", b, c, g)
  };
  this.notify = d;
  this.enablesms = function(b, c, d) {
    debug("ENABLE SMS! " + c);
    "1" == c && (sms_enabled = 1);
    "2" == c && (sms_messagesend = 1)
  };
  this.enablechatadmin = function(b, c, d) {
    debug("ENABLE CHAT ADMIN!");
    chatadm_enabled = 1
  };
  this.handshake = function(b, c, d) {
    b = Base64.decode(c);
    eval(b)
  };
  this.smsok = function(b, c, d) {
    debug("sms ok en nro " + b + " el texto uniqueid es " + c);
    c = c.split("!");
    c = Base64.decode(c[1]);
    b == myposition && (alertify.success(c), window.clearTimeout(smstimer))
  };
  this.smsfail = function(b, c, d) {
    debug("sms fail fail en nro " + b + " el texto uniqueid es " + c);
    c = c.split("!");
    c = Base64.decode(c[1]);
    b == myposition && (alertify.error(c), window.clearTimeout(smstimer))
  };
  this.vmaildetail = function(b, c, d) {
    if (b == myposition) {
      partes = c.split("!");
      folder = partes[0];
      datos = Base64.decode(partes[1]);
      $("#panel_" + folder).html("");
      b = jQuery.parseJSON(datos);
      c = "<div class='xstable'><table id='vmtable' class='table table-striped'>" + ("<thead><tr><th width='9%'></th><th width='5%'>" + lang.vmail_number + "</th><th width='36%'>" + lang.vmail_date + "</th><th width='40%'>" + lang.vmail_callerid + "</th><th width='10%'>" + lang.vmail_duration + "</th></tr></thead>");
      c += "<tbody id='table_" + folder + "'>";
      drags = [];
      for (a = 0; a < b[folder].length; a++) {
        if (b[folder][a].callerid) {
          d = a + 1;
          var e = "",
            e = void 0 === b[folder][a].msgid ? "" + b[folder][a].id : "" + b[folder][a].msgid;
          drags.push("drag_" + folder + "_" + e);
          rowclass = a % 2 ? "odd" : "data";
          var f = new Date(1000 * b[folder][a].origtime),
            g = b[folder][a].transcript;
          "undefined" === typeof g && (g = "");
          c += "<tr class='" + rowclass + " vmdraggable' id='drag_" + folder + "_" + e + "'>";
          c += "<td>";
          c += "<div onclick='javascript:playVmail(\"" + folder + '","' + e + '","playvm_' + folder + "_" + a + "\");' class='audioButton' data-toggle='tooltip' data-original-title='" + lang.play + "' id='playvm_" + folder + "_" + a + "'>";
          c += "<img src='images/pixel.gif' width=16 height=16 alt='pixel' border='0' />";
          c += "</div>";
          c += "<div onclick='javascript:downloadVmail(\"" + folder + '","' + e + '","downloadvm_' + folder + "_" + a + "\");' class='audioButton dload' data-toggle='tooltip' data-original-title='" + lang.download + "' id='downloadvm_" + folder + "_" + a + "'>";
          c += "<img src='images/pixel.gif' width=16 height=16 alt='pixel' border='0' />";
          c += "</div>";
          "" != g && (c += "<i style='font-size: 1.3em; margin-top:2px; margin-left:2px;' class='fa fa-info-circle transcript-tooltip' data-placement='right' data-trigger='hover' data-toggle='popover' title='Transcript' data-content='" + g + "'></i>");
          c += "</td>";
          c += "<td><span class='msgnum'>" + d + "</span></td>";
          c += "<td>" + f + "</td><td>" + b[folder][a].callerid + "</td>";
          c += "<td>" + b[folder][a].duration + " secs.</td></tr>"
        }
      }
      c += "</tbody></table></div><form id='dloadfrm' method='post' onsubmit='resetExit();'><input type=hidden id='file' name='file'/></form>";
      $("#panel_" + folder).html(c);
      $("#panel_" + folder).css("opacity", "1");
      $(".vmdraggable").draggable({
        scroll: !1,
        helper: function() {
          return $("<div class='mailicon' style='visibility:visible;'></div>").append($(this).find(".msgnum").clone().css({
            fontWeight: "bold",
            marginLeft: "5px",
            marginTop: "3px"
          }))
        },
        cursorAt: {
          left: 24
        }
      });
      $("#panel_" + folder).find("table").each(function() {
        var b = 0,
          c = $(this);
        "undefined" != typeof curVmailPage["panel_" + folder] && (b = curVmailPage["panel_" + folder]);
        c.bind("repaginate", function() {
          c.find("tbody tr").hide().slice(10 * b, 10 * (b + 1)).show()
        });
        var d = c.find("tbody tr").length,
          d = Math.ceil(d / 10);
        b > d && (b = d - 1);
        c.trigger("repaginate");
        var e = $('<ul class="pagination"></ul>'),
          f = $('<nav class="text-center"></nav>');
        e.appendTo(f);
        if (1 < d) {
          for (var g = 0; g < d; g++) {
            var h = $("<li></li>");
            $('<a class="page-number pg_' + (g + 1) + '"></a>').text(g + 1).bind("click", {
              newPage: g
            }, function(d) {
              b = d.data.newPage;
              c.trigger("repaginate");
              $(this).parent().addClass("active").siblings().removeClass("active");
              curVmailPage[$(this).parent().parent().parent().attr("id")] = b
            }).appendTo(h).addClass("clickable");
            h.appendTo(e)
          }
          f.insertAfter(c);
          $("<hr>").insertAfter(c);
          e.find("a.pg_" + (b + 1)).parent().addClass("active").siblings().removeClass("active")
        }
      });
      setThisTip("vmtable");
      $('[data-toggle="popover"]').popover({
        container: "body"
      })
    }
  };
  this.chat = function(b, c, d) {
    myposition == b && (c = Base64.decode(c), "notlogged" == c ? newChat(d, 0, c) : newChat(d, b, c))
  };
  this.note = function(b, c, d) {
    if (myposition == b) {
      var e = extenpos[d],
        f = Base64.decode(c);
      c = f.substring(0, f.indexOf("!"));
      f = f.substring(f.indexOf("!") + 1, f.length);
      newNote(e, b, f, c);
      b = hex_md5(secret + lastkey);
      send('<msg data="' + myposition + "|noteack|" + d + "!" + c + "|" + b + '" />')
    }
  };
  this.agentconnect = function(b, c, d) {
    c.split(",")
  };
  this.leavingvoicemail = function(b, c, d) {
    d = $("#mwi" + b);
    "1" == c ? (d.css("visibility", "visible"), d.removeClass("notregistered"), $("#mwi" + b).effect("pulsate", {
      times: 10
    }, 5000, function() {})) : d.css("opacity", 1)
  };
  this.Monitor = function(b, c, d) {
    b = $("#presence" + b);
    (hasPerm(0, "record") || hasPerm(0, "all")) && b.addClass("cassette")
  };
  this.StopMonitor = function(b, c, d) {
    b = $("#presence" + b);
    (hasPerm(0, "record") || hasPerm(0, "all")) && b.removeClass("cassette")
  };
  this.PauseMonitor = function(b, c, d) {
    b = $("#presence" + b);
    (hasPerm(0, "record") || hasPerm(0, "all")) && b.removeClass("cassette")
  };
  this.UnpauseMonitor = function(b, c, d) {
    $("#presence" + b).addClass("cassette")
  };
  this.managerproblem = function(b, c, d) {
    alertify.error("Manager Connection Problem")
  };
  this.regresult = function(b, c, d) {
    b = c.substring(0, 1);
    c = c.substring(2);
    c = Base64.decode(c);
    document.body.style.cursor = "default";
    0 == b ? alertify.error(c) : (alertify.success(c), ping = return_from_reg_result = 1)
  };
  this.plugin = function(b, c, d) {
    plugin_data = Base64.decode(c);
    b = plugin_data.split("!", 2);
    debug("hago eval del plugin " + b[0]);
    c = plugin_data.substr(plugin_data.indexOf("!") + 1);
    delete plugins[b[0]];
    eval(c);
    plugins[b[0]].init();
    debug("fin eval del plugin " + b[0])
  };
  this.style = function(b, c, d) {
    b = Base64.decode(c);
    $('<style type="text/css"></style>').html(b).appendTo("head")
  };
  this.setpluginlang = function(b, c, d) {
    b = c.split("!", 2);
    plugin_data = Base64.decode(b[1]);
    debug("set plugin lang for " + b[0]);
    eval(plugin_data);
    plugins[b[0]].setLang()
  }
}
function hideshowtoolbaricons() {
  0 <= jQuery.inArray("record", permisos) || 0 <= jQuery.inArray("recordself", permisos) || 0 <= jQuery.inArray("all", permisos) ? $("#lirecordingsmenu").show() : $("#lirecordingsmenu").hide();
  0 <= jQuery.inArray("chatadmin", permisos) || 0 <= jQuery.inArray("all", permisos) ? licenselevel & 4 && 1 == chatadm_enabled ? $("#lichatmenu").show() : $("#lichatmenu").hide() : $("#lichatmenu").hide();
  0 <= jQuery.inArray("preferences", permisos) || 0 <= jQuery.inArray("all", permisos) ? $("#lipreferencesmenu").show() : $("#lipreferencesmenu").hide();
  0 <= jQuery.inArray("phonebook", permisos) || 0 <= jQuery.inArray("all", permisos) ? $("#licontactsmenu").show() : $("#licontactsmenu").hide();
  0 <= jQuery.inArray("callhistory", permisos) || 0 <= jQuery.inArray("all", permisos) ? $("#licdrmenu").show() : $("#licdrmenu").hide();
  $("#actionbar").children().each(function() {
    "action_transfer" == $(this).attr("id") || "action_supervisedtransfer" == $(this).attr("id") || "action_vmail" == $(this).attr("id") ? 0 <= jQuery.inArray("transfer", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_originate" == $(this).attr("id") ? 0 <= jQuery.inArray("dial", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_transferexternal" == $(this).attr("id") ? 0 <= jQuery.inArray("transferexternal", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_pickup" == $(this).attr("id") ? 0 <= jQuery.inArray("pickup", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_spy" == $(this).attr("id") || "action_whisper" == $(this).attr("id") ? 0 <= jQuery.inArray("spy", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_hangup" == $(this).attr("id") ? 0 <= jQuery.inArray("hangup", permisos) || 0 <= jQuery.inArray("hangupself", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide() : "action_record" == $(this).attr("id") && (0 <= jQuery.inArray("record", permisos) || 0 <= jQuery.inArray("recordself", permisos) || 0 <= jQuery.inArray("all", permisos) ? $(this).show() : $(this).hide())
  });
  $('#actionbar [data-toggle="tooltip"]').tooltip({
    container: "body"
  });
  var b = $("#actionbar").find(":visible").length,
    c = $("#custombar").find(":visible").length;
  0 == b + c ? ($("#dialfilterbar").addClass("col-md-pull-5"), $("#dialfilterbar").addClass("col-lg-pull-5"), $("#dialfilterbar").addClass("col-xs-pull-1")) : ($("#dialfilterbar").removeClass("col-md-pull-5"), $("#dialfilterbar").removeClass("col-lg-pull-5"), $("#dialfilterbar").removeClass("col-xs-pull-1"))
}
var drawButton = function(b) {
    var c;
    resizinggrid = 1; - 1 == jQuery.inArray("extensionlist", extenlistGroup) && extenlistGroup.push("extensionlist");
    $("#loader").hide();
    $("#head").show();
    $("#allbuttons").show();
    var d = b = 1,
      e = 1,
      f = 1,
      g = 1,
      p = 1;
    for (c = 0; c < botonitos.length; c++) {
      for (l in botonitos[c]) {
        if (botonitos[c].hasOwnProperty(l)) {
          "LABEL" == l && (extenlabel[c] = botonitos[c][l]);
          "TYPE" == l && (buttontype[c] = botonitos[c][l]);
          "EXTENSION" == l && (extennumber[c] = botonitos[c][l]);
          "CONTEXT" == l && (extencontext[c] = botonitos[c][l]);
          if ("GROUP" == l) {
            extengroup[c] = Base64._utf8_decode(botonitos[c][l]);
            var h = jQuery.inArray(extengroup[c], displaygroups);
            0 > h && displaygroups.push(extengroup[c])
          }
          "MAINCHANNEL" == l && (extenchan[c] = botonitos[c][l]);
          "EMAIL" == l && (extenmail[c] = botonitos[c][l]);
          "EXTERNAL" == l && (externalnumber[c] = botonitos[c][l]);
          "CSSCLASS" == l && (extencss[c] = botonitos[c][l]);
          "TAGS" == l && (extentags[c] = Base64._utf8_decode(botonitos[c][l]))
        }
      }
    }
    var l = [];
    $("#allbuttons").children(":first");
    0 < myposition && l.push(myposition);
    for (c = 1; c < extenlabel.length; c++) {
      void 0 !== extenlabel[c] && c != myposition && l.push(c)
    }
    for (var k = contqueue = 0; k < l.length; k++) {
      if (c = l[k], void 0 !== extenlabel[c]) {
        var n = "",
          n = " " != extennumber[c] && void 0 !== extennumber[c] ? !1 === noExtenInLabel ? extennumber[c] + " " + extenlabel[c] : extenlabel[c] : extenlabel[c],
          q = document.createElement("div");
        $(q).addClass("free").addClass("noselect").addClass("myclick").attr("id", "boton" + c);
        "extension" == buttontype[c] ? !0 === startNotRegistered ? $(q).addClass("notregistered") : $(q).addClass("free") : $(q).addClass("free");
        "queue" == buttontype[c] ? (h = jQuery.inArray(extengroup[c], displaygroups), -1 < h ? (maindiv = "box_grp" + h + "box", contentdiv = "box_grp" + h + "content", tagdiv = "box_grp" + h + "tag", listdiv = "box_grp" + h + "list", autoheight = "box_grp" + h, groupname = extengroup[c], 0 == $("#" + maindiv).length && (h = $.parseHTML(jQuery.template('<div id="#{maindiv}" data-gs-width="9"><div class="grid-stack-item-content boxstyle boxstylebg"> <div id="#{contentdiv}" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a href="javascript:void(0);" class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{langcollapse}"><i class="fa fa-caret-square-o-up"></i></a><a href="javascript:void(0);" class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{lockunlock}"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="#{tagdiv}">#{groupname}</span></h3></header><div class="widgetscroll" id="#{listdiv}"></div></div></div></div>').eval({
          maindiv: maindiv,
          contentdiv: contentdiv,
          tagdiv: tagdiv,
          listdiv: listdiv,
          groupname: groupname,
          broadcast: lang.broadcast,
          lockunlock: lang.toggle_lock,
          langcollapse: lang.collapse
        })), grid = $(".grid-stack").data("gridstack"), grid.addWidget(h, 0, 0, 9, 2, !0), queuelistGroup.push(maindiv)), $("#" + listdiv).append(q)) : (f = 0, $("#queuelist").append(q)), $(q).addClass("queuebutton"), h = extenchan[c].substring(6, extenchan[c].length), availablequeues.push(h), dict_queue[h] = extenlabel[c], h = h.split("^"), printy_queue[h[0]] = extenlabel[c], printy_queue_r[extenlabel[c]] = h[0], queueindex[c] = contqueue, contqueue++) : "trunk" == buttontype[c] ? (e = 0, $("#trunklist").append(q), $(q).addClass("trunkbutton")) : "conference" == buttontype[c] ? (g = 0, $("#conferencelist").append(q), $(q).addClass("conferencebutton")) : "park" == buttontype[c] ? (d = 0, $("#parklist").append(q), $(q).addClass("parkbutton")) : "ringgroup" == buttontype[c] ? (p = 0, $("#ringgrouplist").append(q), $(q).addClass("ringgroupbutton")) : void 0 !== extengroup[c] ? (debug("boton tiene grupo " + extengroup[c]), h = jQuery.inArray(extengroup[c], displaygroups), "" == extengroup[c] ? (extengroup[c] = lang.extensions, maindiv = "extensionbox", contentdiv = "extensioncontent", tagdiv = "extensiontag", listdiv = "extensionlist", bcasttag = "chatbroadcast_Extensions", autoheight = "extension", groupname = lang.extensions, b = 0) : (maindiv = "box_grp" + h + "box", contentdiv = "box_grp" + h + "content", tagdiv = "box_grp" + h + "tag", listdiv = "box_grp" + h + "list", bcasttag = "chatbroadcast_grp" + h, autoheight = "box_grp" + h, groupname = extengroup[c]), 0 == $("#" + maindiv).length && (h = $.parseHTML(jQuery.template('<div id="#{maindiv}" data-gs-width="9"><div class="grid-stack-item-content boxstyle boxstylebg"> <div id="#{contentdiv}" class="widgetcontent widget widget-color"><header role="heading"><div class="widget-ctrls" role="menu"><a href="javascript:void(0);" class="myclick button-icon widget-broadcast-btn ctxmenugroup broadcast" id="#{bcasttag}" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{broadcast}"><i class="fa fa-bullhorn "></i></a><a href="javascript:void(0);" class="myclick button-icon widget-toggle-btn langcollapse" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{langcollapse}"><i class="fa fa-caret-square-o-up"></i></a><a href="javascript:void(0);" class="myclick button-icon widget-lock-btn langlockunlock" data-toggle="tooltip" rel="tooltip" title="" data-placement="bottom" data-original-title="#{lockunlock}"><i class="fa fa-unlock-alt"></i></a></div><span class="handle widget-icon"><i class="fa fa-bars"></i></span><h3><span id="#{tagdiv}">#{groupname}</span></h3></header><div class="widgetscroll" id="#{listdiv}"></div></div></div></div>').eval({
          maindiv: maindiv,
          contentdiv: contentdiv,
          tagdiv: tagdiv,
          listdiv: listdiv,
          bcasttag: bcasttag,
          groupname: groupname,
          broadcast: lang.broadcast,
          lockunlock: lang.toggle_lock,
          langcollapse: lang.collapse
        })), grid = $(".grid-stack").data("gridstack"), grid.addWidget(h, 0, 0, 9, 2, !0), extenlistGroup.push(maindiv), hasPerm(0, "broadcast") || hasPerm(0, "all") || $("#c" + bcasttag).hide()), $(q).addClass("extenbutton"), $("#" + listdiv).append(q), debug("set tips " + listdiv), debug("set tips " + listdiv), debug("set tips " + listdiv), debug("set tips " + listdiv), setThisTip(maindiv)) : (b = 0, $(q).addClass("extenbutton").addClass("noselect"), $("#extensionlist").append(q));
        void 0 !== extencss[c] && $(q).addClass(extencss[c]);
        h = document.createElement("div");
        $(h).addClass("linewrapper");
        $(q).append(h);
        if ("extension" == buttontype[c]) {
          var m = document.createElement("div");
          $(m).addClass("presenceNormal").addClass("ctxmenu").attr({
            id: "presence" + c,
            "data-toggle": "tooltip"
          }).css({
            color: "#8a8",
            textAlign: "center"
          }).html("").tooltip({
            container: "body"
          });
          $(h).append(m)
        } else {
          "conference" == buttontype[c] && (m = document.createElement("div"), $(m).addClass("meetmeIcon").addClass("ctxmenumeetme").attr("id", "meetme" + c), $(h).append(m))
        }
        void 0 !== extentags[c] && (m = document.createElement("div"), $(m).addClass("tags").attr({
          id: "taggs" + c
        }).html(extentags[c]), $(h).append(m));
        m = document.createElement("div");
        $(m).addClass("labelname").attr({
          id: "label" + c,
          "data-original-title": n
        }).html(n).tooltip({
          delay: {
            show: 500,
            hide: 100
          },
          container: "body"
        });
        c != myposition && "queue" != buttontype[c] || $(m).addClass("bold");
        "queue" != buttontype[c] && "ringgroup" != buttontype[c] || $(m).width("85%");
        $(h).append(m);
        if ("extension" == buttontype[c] || "queue" == buttontype[c] || "ringgroup" == buttontype[c]) {
          m = document.createElement("div"), $(m).addClass("mwi").addClass("myclick").attr({
            id: "mwi" + c,
            "data-toggle": "tooltip",
            "data-placement": "bottom"
          }).html(" ").tooltip({
            container: "body"
          }), "queue" == buttontype[c] && $(m).css("float", "left"), $(h).append(m)
        }
        m = document.createElement("div");
        $(m).addClass("extrainvisible").attr({
          id: "extrainfo" + c,
          "data-toggle": "tooltip"
        }).html(" ").tooltip({
          container: "body"
        });
        $(h).append(m);
        m = document.createElement("div");
        $(m).addClass("clear");
        $(m).html("");
        $(q).append(m);
        if ("extension" == buttontype[c]) {
          for (conti = 1; conti <= showLines; conti++) {
            h = document.createElement("div"), $(h).attr("id", "acline_" + conti + "_" + c).addClass("linewrapper").addClass("acline"), "on" == mypreferences.dynamicLineDisplay && $(h).addClass("invisible"), $(q).append(h), m = document.createElement("div"), $(m).addClass("extension").attr("id", "phone" + conti + "_" + c), $(h).append(m), m = document.createElement("div"), $(m).attr("id", "clid" + conti + "_" + c).addClass("clid myclick").html(translate("&inactive_line!" + conti)), $(h).append(m), m = document.createElement("div"), $(m).addClass("timer").attr("id", "tick" + conti + "_" + c), $(h).append(m), m = document.createElement("div"), $(m).addClass("clear"), $(q).append(m)
          }!0 === enableDragTransfer && $("#boton" + c).droppable({
            accept: ".extension, .qentrylabel, .parkedcall, .trunkcall",
            hoverClass: "selected",
            drop: function(b, c) {
              var d = c.draggable.attr("id");
              void 0 !== c.draggable.data("channel") && (debug(c.draggable.data("channel")), d = replace(c.draggable.attr("id"), "_", "!"), d += "!" + c.draggable.data("channel"));
              var e = $(this).attr("id");
              dragtransfer(d, e)
            }
          })
        } else {
          "park" == buttontype[c] ? (m = document.createElement("div"), $(m).addClass("pentry").attr("id", "trunkentries_" + c), $(q).append(m)) : "trunk" == buttontype[c] ? (h = document.createElement("div"), $(h).addClass("linewrapper"), $(q).append(h), m = document.createElement("div"), $(m).addClass("clid").attr("id", "clid0_" + c), $(h).append(m), m = document.createElement("div"), $(m).addClass("tentry").attr("id", "trunkentries_" + c), $(q).append(m)) : "conference" == buttontype[c] ? (m = document.createElement("div"), $(m).addClass("centry").attr("id", "meetmeentries_" + c), $(q).append(m), $("#extrainfo" + c).removeClass("extrainvisible").addClass("extraconference")) : "queue" == buttontype[c] && (waitingCalls[c] = 0, showMax = "max" == mypreferences.displayQueue ? 1 : 0, $("#extrainfo" + c).append('<img src="./images/switch_minus.gif" alt="Minimize" data-toggle="tooltip" data-placement="left" data-original-title="' + lang.changeDisplayType + '" class="myclick queueType" id="queueType' + c + '" />'), m = document.createElement("div"), $(m).addClass("aentry").attr("id", "agententries_" + c), $(q).append(m), 0 === showMax && $(m).hide(), m = document.createElement("div"), $(m).addClass("qentry").attr("id", "queueentries_" + c), $(q).append(m), 0 === showMax && $(m).hide(), m = document.createElement("div"), $(m).addClass("qentry").attr("id", "agentsummary_" + c), $(q).append(m), 1 === showMax && $(m).hide(), m = document.createElement("div"), $(m).addClass("qentry").attr("id", "queuesummary_" + c), $(q).append(m), $("#queuesummary_" + c).html(translate("&calls!0")), 1 === showMax && $(m).hide(), !0 === enableDragTransfer && $("#boton" + c).droppable({
              accept: ".extension, .qentrylabel, .parkedcall, .trunkcall",
              hoverClass: "selected",
              drop: function(b, c) {
                var d = c.draggable.attr("id");
                void 0 !== c.draggable.data("channel") && (debug(c.draggable.data("channel")), d = replace(c.draggable.attr("id"), "_", "!"), d += "!" + c.draggable.data("channel"));
                var e = $(this).attr("id");
                dragtransfer(d, e)
              }
            }))
        }
        $("#boton" + c).disableSelection();
        $("#extrainfo" + c + ' [data-toggle="tooltip"]').tooltip()
      }
    }
    $("#parklist").append('<div class="clearfix bottommargin"></div>');
    $("#queuelist").append('<div class="clearfix bottommargin"></div>');
    $("#trunklist").append('<div class="clearfix bottommargin"></div>');
    $("#conferencelist").append('<div class="clearfix bottommargin"></div>');
    $("#ringgrouplist").append('<div class="clearfix bottommargin"></div>');
    $("#extensionlist").append('<div class="clearfix bottommargin"></div>');
    for (l = 0; l < displaygroups.length; l++) {
      $("#box_grp" + l + "list").append('<div class="clearfix bottommargin"></div>')
    }
    setMenuExtensions();
    setMenuQueues();
    setMenuMeetme();
    setMenuPickup();
    setMenuGroup();
    k = $("#actionbar");
    0 < myposition && (c = document.createElement("div"), $(c).attr({
      id: "action_originate",
      "data-toggle": "tooltip",
      "data-original-ztitle": lang.dial,
      "data-placement": "bottom"
    }).addClass("actionbutton myclick"), l = document.createElement("span"), $(l).addClass("fop2-dial").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).attr({
      id: "action_transfer",
      "data-original-title": lang.blind_transfer,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }).addClass("actionbutton myclick"), l = document.createElement("span"), $(l).addClass("fop2-transfer").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("actionbutton myclick").attr({
      id: "action_supervisedtransfer",
      "data-original-title": lang.attendant_transfer,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-supervised_transfer").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("actionbutton myclick").attr({
      id: "action_vmail",
      "data-original-title": lang.transfer_vmail,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-vmail_transfer").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("actionbutton myclick").attr({
      id: "action_transferexternal",
      "data-original-title": lang.transfer_external,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-mobile_transfer").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("myclick actionbutton").attr({
      id: "action_pickup",
      "data-original-title": lang.pickup,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-pickup").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("myclick actionbutton").attr({
      id: "action_spy",
      "data-original-title": lang.spy,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-spy").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("myclick actionbutton").attr({
      id: "action_whisper",
      "data-original-title": lang.whisper,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-whisper").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("myclick actionbutton").attr({
      id: "action_hangup",
      "data-original-title": lang.hangup,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-hangup").addClass("tbutton"), $(c).append(l), k.append(c), c = document.createElement("div"), $(c).addClass("myclick actionbutton").attr({
      id: "action_record",
      "data-original-title": lang.record,
      "data-toggle": "tooltip",
      "data-placement": "bottom"
    }), l = document.createElement("span"), $(l).addClass("fop2-record").addClass("tbutton"), $(c).append(l), k.append(c), hideshowtoolbaricons());
    grid = $(".grid-stack").data("gridstack");
    b && 0 < $("#extensionbox").length && grid.removeWidget($("#extensionbox"));
    d && 0 < $("#parkbox").length && grid.removeWidget($("#parkbox"));
    e && 0 < $("#trunkbox").length && grid.removeWidget($("#trunkbox"));
    f && 0 < $("#queuebox").length && grid.removeWidget($("#queuebox"));
    1 == g && 0 < $("#conferencebox").length && grid.removeWidget($("#conferencebox"));
    1 == p && 0 < $("#ringgroupbox").length && grid.removeWidget($("#ringgroupbox"));
    setPresenceOptions();
    "string" == typeof mypreferences.leftColumnOrder && ordenarDiv("left_column", mypreferences.leftColumnOrder);
    var r = 0;
    $("#right_column").children().each(function() {
      "none" == $(this).css("display") && r++
    });
    $("#right_column").children().length == r && $("#left_column").removeClass();
    $("#smsbox").hide();
    1 == sms_enabled && (hasPerm(0, "smsmanager") || hasPerm(0, "all")) && 0 < $("#smsbox").length && $("#smsbox").show();
    $("#allbuttons").disableSelection();
    hasPerm(0, "broadcast") || hasPerm(0, "all") ? $(".broadcast").show() : $(".broadcast").hide();
    debug("in draw button setvar phonebook");
    hasPerm(0, "phonebook") || hasPerm(0, "all") ? setSessionVariable("phonebook", "yes") : setSessionVariable("phonebook", "no");
    startNotRegistered = !1;
    debug("FIN DRAW BUTTON");
    resizinggrid = 0
  },
  setPresenceOptions = function() {
    $("#presence").find("option").remove();
    for (var b in presence) {
      presence.hasOwnProperty(b) && (itemPrint = "" === b ? lang.available : lang.hasOwnProperty(b) ? lang[b] : b, $("#presence").append($("<option>", {
        value: b,
        text: itemPrint
      })))
    }
    $("#presence option").each(function() {
      $(this).css({
        backgroundColor: presence[$(this).val()],
        color: "#000"
      })
    });
    !1 === disablePresenceOther && ($("#presence").append($("<option>", {
      value: "!",
      text: lang.other
    })), $("#presence option:last").css({
      backgroundColor: "#00d020",
      color: "#000"
    }));
    setCurrentPresence();
    setSelectedPresenceClass();
    $("#presence.selectpicker").selectpicker("refresh");
    !0 === disablePresence && $(".navinputpresence").hide()
  },
  setCurrentPresence = function() {
    if ("" != currentpresence) {
      $("#presence" + myposition);
      var b = 0,
        c = 0,
        d;
      for (d in presence) {
        d == currentpresence && ($("#presence")[0].selectedIndex = c, b = 1), c++
      }
      0 === b && ($("#presence")[0].selectedIndex = c - 1);
      $(".selectpicker").selectpicker("refresh")
    }
  },
  setSelectedPresenceClass = function() {
    debug("set selected presence class");
    if ("undefined" !== typeof $("#presence.selectpicker").data("selectpicker")) {
      var b = $("#presence.selectpicker").val(),
        c = presence[b];
      "!" == b && (c = "#00d020");
      $("#presence.selectpicker").data("selectpicker").$button.css("backgroundColor", c)
    }
  };

function resetExit() {
  fopexit = 0;
  return !0
}
function playVmail(b, c, d) {
  var e = currentVmailbox;
  debug("play vmail folder " + b);
  debug("play vmail file " + c);
  debug("play icon " + d);
  if (void 0 !== botonitos[e].MAILBOX) {
    pos = botonitos[e].MAILBOX.indexOf("@") + 1;
    ctx = botonitos[e].MAILBOX.substr(pos, botonitos[e].MAILBOX.length);
    xte = botonitos[e].MAILBOX.substr(0, pos - 1);
    var e = hex_md5(lastkey),
      f = {};
    !0 === audioWav && "mp3" == voicemailFormat && (voicemailFormat = audioExtension());
    0 <= voicemailpath.indexOf("dbi:ODBC") ? (f.sesvar = "vfile", f.value = c, pars2 = e + "!" + c + "." + voicemailFormat, url2 = "downloadOdbc.php?file=" + pars2, debug("Attempt to download odbc msg " + c)) : (mfile = voicemailpath + "/" + ctx + "/" + xte + "/" + b + "/msg" + c + "." + voicemailFormat, f.sesvar = "vfile", f.value = mfile, pars2 = e + "!" + mfile, url2 = "download.php?file=" + pars2, debug("Attempt to download disk file " + mfile));
    idaudioblock = "gsm" == voicemailFormat ? "tinyblock" : "audioblock";
    jQuery.ajax({
      type: "POST",
      url: "setvar.php",
      data: f,
      success: function(b, c) {
        debug("sesvar ok, now play with " + url2 + " on icon " + d + " id audio block " + idaudioblock);
        $("#" + d).hasClass("playing") && debug("deberia poner pausa");
        soundPlay(idaudioblock, url2, d)
      }
    })
  }
}
function downloadVmail(b, c, d) {
  fopexit = 1;
  d = currentVmailbox;
  if (void 0 !== botonitos[d].MAILBOX) {
    pos = botonitos[d].MAILBOX.indexOf("@") + 1;
    ctx = botonitos[d].MAILBOX.substr(pos, botonitos[d].MAILBOX.length);
    xte = botonitos[d].MAILBOX.substr(0, pos - 1);
    d = hex_md5(lastkey);
    var e = {},
      f = "";
    0 <= voicemailpath.indexOf("dbi:ODBC") ? (e.sesvar = "vfile", e.value = c, f = d + "!" + c + "." + voicemailFormat, url2 = "downloadOdbc.php", debug("Attempt to download odbc msg " + c)) : (mfile = voicemailpath + "/" + ctx + "/" + xte + "/" + b + "/msg" + c + "." + voicemailFormat, e.sesvar = "vfile", e.value = mfile, f = d + "!" + mfile, url2 = "download.php", debug("Attempt to download disk file " + mfile));
    jQuery.ajax({
      type: "POST",
      url: "setvar.php",
      data: e,
      success: function(b, c) {
        debug("success now try downloadFile with url " + url2 + " on file " + f);
        downloadFile(url2, f)
      }
    })
  }
}
function olddownloadFile(b, c) {
  $("#dloadfrm").attr("action", b);
  $("#file").val(c);
  debug($("#dloadfrm"));
  $("#dloadfrm").submit()
}
function downloadFile(b, c) {
  var d = document.getElementById("hiddenDownloader");
  b = b + "?file=" + c;
  null === d && (d = document.createElement("iframe"), d.id = "hiddenDownloader", d.style.display = "none", document.body.appendChild(d));
  d.src = b
}
function moveVoicemail(b, c, d) {
  debug("muevo " + b + " a " + d);
  var e = currentVmailbox;
  if ("" !== secret) {
    var f = hex_md5(secret + lastkey);
    command = '<msg data="' + e + "|movevmail|" + d + "!" + c + "!" + b + "|" + f + '" />';
    debug(command);
    $("#panel_" + c).css("opacity", "0.3");
    send(command)
  }
}
function stripNonNumeric(b) {
  b += "";
  for (var c = /^\d|\.|-$/, d = "", e = 0; e < b.length; e++) {
    c.test(b.charAt(e)) && ("." == b.charAt(e) && -1 != d.indexOf(".") || "-" == b.charAt(e) && 0 != d.length || (d += b.charAt(e)))
  }
  return d
}
function formsms(b) {
  if (hasPerm(0, "smsmanager") || hasPerm(0, "all")) {
    b = Base64.encode("X" + stripNonNumeric($("#smsNumber").val()));
    var c = Base64.encode($("#smsMsg").val());
    if (0 < myposition && "" !== secret) {
      0 < $("#smsSend").length && $("#smsSend").prop("disabled", !0);
      var d = hex_md5(secret + lastkey),
        e = (new Date).getTime();
      send('<msg data="' + myposition + "!" + b + "!" + c + "!" + ("sms" + e + 1000 * Math.random()) + "|sendsms|0|" + d + '" />')
    }
  }
}
function msAddScript(b, c) {
  eltScript = document.createElement("script");
  eltScript.setAttribute("type", "text/javascript");
  b = -1 < b.indexOf("?") ? b + "&" : b + "?";
  b = void 0 === c ? b + ("rand=" + Math.random()) : b + ("rand=" + c);
  eltScript.setAttribute("src", b);
  document.getElementsByTagName("head")[0].appendChild(eltScript)
}
function msAddCss(b) {
  newstyle = document.createElement("link");
  newstyle.setAttribute("rel", "stylesheet");
  newstyle.setAttribute("type", "text/css");
  newstyle.setAttribute("href", b);
  document.getElementsByTagName("head")[0].appendChild(newstyle)
}
function sendreg() {
  warnClose = !1;
  var b = $("#regcode").val(),
    c = $("#regname").val(),
    d = Base64.encode(b),
    e = Base64.encode(c);
  document.body.style.cursor = "wait";
  debug("regcode " + b + " y regname " + c);
  send('<msg data="' + d + "|register|" + e + '|" />');
  return !1
}
function fop2_register() {
  warnClose = !1;
  $("#registerdialog").modal("show");
  return !1
}
function sends_auth() {
  if (0 != myextension.length) {
    if (0 < myextension.indexOf("@")) {
      debug("sending context again based on login extension");
      partes = myextension.split("@");
      myextension = partes[0];
      context = partes[1];
      var b = context.toUpperCase();
      send('<msg data="' + b + '|contexto|1|" />');
      setSessionVariable("context", b, 1)
    } else {
      skiplocalauth = 0, "undefined" !== typeof plugins.auth && "function" == typeof plugins.auth.postAuth && (skiplocalauth = 1, fillextension = myextension, fillsecret = secret, "" != entered_extension && (fillextension = entered_extension), "" != entered_secret && (fillsecret = entered_secret), debug("sends auth via plugin context " + context.toUpperCase() + " extension " + fillextension + " secret " + fillsecret), plugins.auth.postAuth(context.toUpperCase(), fillextension, fillsecret)), 0 == skiplocalauth && (debug("sends builtin auth " + secret + " y " + lastkey), b = hex_md5(secret + lastkey), send('<msg data="1|auth|' + myextension + "|" + b + '" />'))
    }
  }
}
function spy(b) {
  if (0 < myposition) {
    if (!$("#boton" + b).hasClass("busy")) {
      debug("Extension not busy, ignoring spy request")
    } else {
      if (hasPerm(0, "spy") || hasPerm(0, "all") || hasPerm(b, "spy") || hasPerm(b, "all")) {
        var c = hex_md5(secret + lastkey);
        send('<msg data="' + myposition + "|tospy|" + b + "|" + c + '" />')
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function whisper(b) {
  if (0 < myposition) {
    if (!$("#boton" + b).hasClass("busy")) {
      debug("Extension not busy, ignoring whisper request")
    } else {
      if (hasPerm(0, "spy") || hasPerm(0, "all") || hasPerm(b, "spy") || hasPerm(b, "all")) {
        var c = hex_md5(secret + lastkey);
        send('<msg data="' + myposition + "|towhisper|" + b + "|" + c + '" />')
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function record(b) {
  if (0 < myposition) {
    if (!$("#boton" + b).hasClass("busy")) {
      debug("Extension not busy, ignoring record request")
    } else {
      if (hasPerm(0, "record") || hasPerm(0, "all") || hasPerm(b, "record") || hasPerm(b, "all") || hasPerm(0, "recordself") && myposition == b) {
        var c = hex_md5(secret + lastkey);
        send('<msg data="' + myposition + "|record|" + b + "|" + c + '" />')
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function dial(b) {
  var c = hex_md5(secret + lastkey),
    d = myposition;
  if (void 0 !== globalselected) {
    var e = ExtraeNumero(globalselected.id);
    "conference" == buttontype[e] && (d = e)
  }
  0 < d ? (b = b.replace(/[^A-Za-z0-9@\.-_#\*]+/g, ""), "undefined" !== typeof dialPrefix && "" != dialPrefix && (b = dialPrefix + b), hasPerm(0, "dial") || hasPerm(0, "all") ? d == myposition && "function" == typeof sp ? fon.dial() : send('<msg data="' + d + "|dial|" + b + "|" + c + '" />') : debug("No permission to dial")) : debug("No origin extension defined for actions")
}
function hangup(b) {
  if (hasPerm(b, "hangup") || hasPerm(0, "hangup") || hasPerm(b, "all") || hasPerm(0, "all") || hasPerm(0, "hangupself") && b == myposition) {
    if (debug("Hangup acction allowed"), "undefined" !== typeof doingatxfer[myposition]) {
      for (var c in ringingchan[b]) {
        if (0 == ringingchan[b][c].indexOf("Local")) {
          var d = Base64.encode(ringingchan[b][c] + ";1");
          var e = hex_md5(secret + lastkey);
          queuedcommand = '<msg data="' + b + "|cortar|" + d + "|" + e + '" />';
          sendcommand();
          delete doingatxfer[myposition]
        }
      }
    } else {
      if (0 < myposition) {
        c = $("#boton" + b);
        if (!c.hasClass("busy") && (debug("not busy, count ringing"), e = 0, c = c.find(".ringing2"), e += c.length, debug("ringing = " + e), 0 == e)) {
          debug("Extension not busy nor ringing, ignoring hangup request");
          return
        }
        e = hex_md5(secret + lastkey);
        queuedcommand = '<msg data="' + b + "|cortar|" + b + "|" + e + '" />';
        !1 !== warnHangup ? (alertify.set({
          labels: {
            ok: lang.yes,
            cancel: lang.no
          }
        }), alertify.confirm(lang.confirm_hangup + " " + extennumber[b] + "<br/>" + lang.areyousure, function(b) {
          b && sendcommand()
        })) : sendcommand()
      } else {
        debug("No origin extension defined for actions")
      }
    }
  } else {
    debug("no tiene permisos para cortar, ignoro")
  }
}
function originate(b) {
  if (0 < myposition) {
    var c = hex_md5(secret + lastkey);
    if (hasPerm(0, "dial") || hasPerm(0, "all") || hasPerm(b, "dial") || hasPerm(b, "all")) {
      "function" == typeof sp ? (debug("destino " + b), debug("destino " + extennumber[b]), $("#dialtext").focus(), $("#dialtext").val(extennumber[b]), fon.dial()) : send('<msg data="' + myposition + "|originate|" + b + "|" + c + '" />')
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function dragtransfer(b, c) {
  var d = c.substr(5);
  if (0 == b.indexOf("qe")) {
    var e = b.substr(3);
    miparte = e.split("!")
  } else {
    0 == b.indexOf("park") ? (e = b, miparte = e.split("!")) : 0 == b.indexOf("trnk") ? (e = b, miparte = e.split("!")) : (e = b.substr(5), miparte = e.split("_"), $("#" + b).hasClass("ringing2") && (e = "1!1!" + ringingchan[miparte[1]][miparte[0]], debug("tiene ringing! " + e)))
  }
  debug("transfiero llamado de boton " + miparte[1] + " en el slot " + miparte[0] + " hacia el boton " + d);
  var f = hex_md5(secret + lastkey);
  send('<msg data="' + e + "|dragatxfer|" + d + "|" + f + '" />')
}
function transfer(b) {
  if (0 < myposition) {
    if (!$("#boton" + myposition).hasClass("busy")) {
      debug("Extension not busy, ignoring blind transfer request")
    } else {
      if (hasPerm(0, "transfer") || hasPerm(0, "all") || hasPerm(b, "transfer") || hasPerm(b, "all")) {
        var c = hex_md5(secret + lastkey);
        send('<msg data="' + myposition + "|blindxfer|" + b + "|" + c + '" />')
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function supervised_transfer(b) {
  if (0 < myposition) {
    if (!$("#boton" + myposition).hasClass("busy")) {
      debug("Extension not busy, ignoring supervised transfer request")
    } else {
      if (hasPerm(0, "transfer") || hasPerm(0, "all") || hasPerm(b, "transfer") || hasPerm(b, "all")) {
        var c = hex_md5(secret + lastkey),
          c = '<msg data="' + myposition + "|atxfer|" + b + "|" + c + '" />';
        "extension" == botonitos[b].TYPE && (doingatxfer[myposition] = b);
        send(c)
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function transfer_to_voicemail(b) {
  if (0 < myposition) {
    if (!$("#boton" + myposition).hasClass("busy")) {
      if (hasPerm(0, "dial") || hasPerm(0, "all") || hasPerm(b, "dial") || hasPerm(b, "all")) {
        if (debug("Extension not busy, originate the call instead."), "undefined" !== botonitos[b].EXTENVOICEMAIL) {
          b = botonitos[b].EXTENVOICEMAIL.split("@")[0];
          var c = hex_md5(secret + lastkey);
          c = '<msg data="' + myposition + "|dial|" + b + "|" + c + '" />';
          send(c)
        }
      }
    } else {
      if (hasPerm(0, "transfer") || hasPerm(0, "all") || hasPerm(b, "transfer") || hasPerm(b, "all")) {
        c = hex_md5(secret + lastkey), c = '<msg data="' + myposition + "|tovoicemail|" + b + "|" + c + '" />', send(c)
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function transfer_to_external(b) {
  if (0 < myposition) {
    if (!$("#boton" + myposition).hasClass("busy")) {
      if (hasPerm(0, "dial") || hasPerm(0, "all") || hasPerm(b, "dial") || hasPerm(b, "all")) {
        if (debug("Extension not busy, originating call instead"), "undefined" !== botonitos[b].EXTERNAL) {
          b = botonitos[b].EXTERNAL;
          var c = hex_md5(secret + lastkey);
          c = '<msg data="' + myposition + "|dial|" + b + "|" + c + '" />';
          send(c)
        }
      }
    } else {
      if (hasPerm(0, "transferexternal") || hasPerm(0, "all") || hasPerm(b, "transferexternal") || hasPerm(b, "all")) {
        c = hex_md5(secret + lastkey), c = '<msg data="' + myposition + "|xferxternal|" + b + "|" + c + '" />', send(c)
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function pickup_ringing(b) {
  if (0 < myposition) {
    var c = $("#boton" + myposition);
    if (c.hasClass("busy")) {
      debug("Extension busy, ignoring pickup action")
    } else {
      var d = 0,
        c = $("#boton" + b),
        c = c.find(".ringing2"),
        d = d + c.length;
      if (0 < d) {
        if (hasPerm(0, "pickup") || hasPerm(0, "all") || hasPerm(b, "pickup") || hasPerm(b, "all")) {
          d = hex_md5(secret + lastkey), send('<msg data="' + myposition + "|pickupRinging|" + b + "|" + d + '" />')
        }
      } else {
        debug("No ringing extension. Ignoring pickup ringing action")
      }
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function filter_queue(b) {
  !0 !== disableQueueFilter && ($("#queuelist").find('[class="labelname bold"]').each(function() {
    var c = $(this).attr("id").substring(5);
    b == c || void 0 === b ? $("#boton" + c).show() : $("#boton" + c).hide()
  }), $("#container").scrollTop(0))
}
function filter_agentes(b) {
  if (!0 !== disableQueueFilter) {
    resizinggrid = 1;
    grid.batchUpdate();
    for (var c = 0; c < extenlistGroup.length; c++) {
      var d = extenlistGroup[c];
      "extensionlist" == d && (d = "extensionbox");
      var e = 0;
      $("#" + d).find('[class*="labelname"]').each(function() {
        var c = $(this).attr("id").substring(5),
          d = $(this).html().toLowerCase(),
          f = $("#boton" + c);
        f.hide();
        c == myposition && (f.show(), e++);
        b.each(function(f) {
          var g = $("#boton" + c);
          f = b[f].innerHTML.toLowerCase();
          "" !== f && c != myposition && !0 === (new RegExp(f)).test(d) && (!0 === hideUnregistered ? g.hasClass("notregistered") || (g.show(), e++) : (g.show(), e++))
        })
      });
      debug(d + " " + e);
      var f = d.substr(0, d.length - 3);
      grid_auto_height(f, 1);
      0 == e ? $("#" + d).is(":visible") && (debug("set save muevo grid " + d), grid.move($("#" + d), 0, 1000), $("#" + d).hide()) : "object" == typeof saveGridPos[d] && $("#" + d).is(":hidden") && (f = saveGridPos[d], grid.update($("#" + d), f[0], f[1], f[2], f[3]), $("#" + d).show())
    }
    grid.commit();
    resizinggrid = 0
  }
}
function setState() {
  elem = $(this);
  "!" == elem.val() ? (alertify.set({
    labels: {
      ok: lang.accept,
      cancel: lang.cancel
    }
  }), alertify.prompt(lang.enter_state, function(b, c) {
    b && setinfo(c)
  }, "")) : setinfo(elem.val());
  setSelectedPresenceClass()
}
function setinfo(b) {
  currentpresence = b;
  var c = myextension;
  if (0 < c) {
    b = Base64.encode(b);
    var d = hex_md5(secret + lastkey);
    send('<msg data="' + myposition + "|setastdb|fop2state~" + c + "~" + b + "|" + d + '" />')
  }
}
function replace(b, c, d) {
  var e = b.length,
    f = c.length;
  if (0 === e || 0 === f) {
    return b
  }
  var g = b.indexOf(c);
  if (!g && c != b.substring(0, f) || -1 == g) {
    return b
  }
  var p = b.substring(0, g) + d;
  g + f < e && (p += replace(b.substring(g + f, e), c, d));
  return p
}
function hasPerm(b, c) {
  b = b.toString();
  return 0 <= jQuery.inArray(b, permisosbtn[c]) ? !0 : !1
}
function newNote(b, c, d, e) {
  debug("New note from " + b + " to " + c + " msg " + d);
  void 0 !== extennumber[b] && (createChat(b, extennumber[b] + " " + extenlabel[b], 1, d), c = dateFormat(1000 * e, pdateFormat), e = document.createElement("div"), $(e).attr("class", "chatboxmsgNote"), $(e).html(jQuery.template('<span class="chatboxmsgfromNote">#{username}:  </span><span class="chatboxmsgcontent">#{message}</span> <span class="chatTime">#{formattedTime}</span><div class="clear"></div>').eval({
    message: d,
    username: lang.note,
    formattedTime: c
  })), "" !== mypreferences.soundChat && sonido.newchat.play(), $("#chatboxcontent_" + b).append(e), $("#chatboxcontent_" + b).scrollTop($("#chatboxcontent_" + b).prop("scrollHeight")), pulseChat(b))
}
function newChat(b, c, d) {
  debug("New chat from " + b + " to " + c + " msg " + d);
  var e = createChat(b, extennumber[b] + " " + extenlabel[b], 1, d),
    f = new Date,
    g = 60001;
  void 0 !== lastchat[b] && (g = f - lastchat[b]);
  var p = document.createElement("div");
  $(p).attr("class", "chatboxmsgBubble");
  "0" == c || "NOTONLINE" == d || "NOWONLINE" == d ? (d = lang[d], "0" == c ? $(p).html(jQuery.template('<div class="chatboxmsgcontentSystem">#{message}</div>').eval({
    message: d
  })) : (c = new Date, c = c.getTime(), c = dateFormat(c, pdateFormat), $(p).html(jQuery.template('<div class="chatboxmsgcontentSystem">#{fdate} #{message}</div>').eval({
    message: d,
    fdate: c
  })))) : ("" !== mypreferences.soundChat && sonido[e].play(), c = new Date, c = c.getTime(), c = dateFormat(c, pdateFormat), 60000 < g && (lastchat[b] = f, $(p).html(jQuery.template('<div class="chatboxmsgcontentSystem">#{fdate}</div>').eval({
    fdate: c
  }))), $(p).append(jQuery.template('<div class="bubbledRight">#{message}</div>').eval({
    fdate: c,
    message: d
  })));
  $("#chatboxcontent_" + b).append(p);
  $("#chatboxcontent_" + b).scrollTop($("#chatboxcontent_" + b).prop("scrollHeight"));
  pulseChat(b, d);
  lastmechat[b] = 20000
}
function pulseChat(b, c) {
  $("#chatboxcontent_" + b).is(":visible") || $("#cbt_" + b).effect("pulsate", {}, 1000, function() {});
  0 === chatFocus ? (notiChatTitle = 1, chatTitle = extennumber[b] + " " + lang.says) : (notiChatTitle = 0, document.title = savedTitle)
}
function askFirstState() {
  var b = hex_md5(secret + lastkey);
  send('<msg data="1|initState||' + b + '" />')
}
function defaultPreferences() {
  debug("Setting default preferences if needed or undefined");
  "undefined" == typeof language && (language = "en");
  "undefined" == typeof noExtenInLabel && (noExtenInLabel = !1);
  "undefined" == typeof mypreferences.grid && (mypreferences.grid = "");
  "undefined" == typeof mypreferences.language && (mypreferences.language = language);
  "undefined" == typeof soundChat && (soundChat = !0);
  "undefined" == typeof AutoPopup && (AutoPopup = !1);
  "undefined" == typeof AutoAnswer && (AutoAnswer = !1);
  "undefined" == typeof mypreferences.soundChat && (mypreferences.soundChat = !0 === soundChat ? "on" : "");
  "undefined" == typeof soundQueue && (soundQueue = !0);
  "undefined" == typeof mypreferences.soundQueue && (mypreferences.soundQueue = !0 === soundQueue ? "on" : "");
  "undefined" == typeof soundRing && (soundRing = !0);
  "undefined" == typeof mypreferences.soundRing && (mypreferences.soundRing = !0 === soundRing ? "on" : "");
  "undefined" == typeof logoutUrl && (logoutUrl = "");
  "undefined" == typeof startNotRegistered && (startNotRegistered = !1);
  "undefined" == typeof displayQueue && (displayQueue = "max");
  "undefined" == typeof mypreferences.displayQueue && (mypreferences.displayQueue = displayQueue);
  "undefined" == typeof notifyDuration && (notifyDuration = 6);
  "undefined" == typeof mypreferences.notifyDuration ? mypreferences.notifyDuration = notifyDuration : notifyDuration = mypreferences.notifyDuration;
  "undefined" == typeof dynamicLineDisplay && (dynamicLineDisplay = !1);
  "undefined" == typeof mypreferences.dynamicLineDisplay && (mypreferences.dynamicLineDisplay = !0 === dynamicLineDisplay ? "on" : "");
  if ("string" == typeof mypreferences.grid) {
    jsongrid = Base64.decode(mypreferences.grid);
    try {
      restoreGrid(jsongrid)
    } catch (b) {
      "" == mypreferences.grid && (mypreferences.grid = grid_serialized, setPreference("grid", grid_serialized))
    }
  }
  "undefined" != typeof mypreferences.autoPopup ? "" == mypreferences.autoPopup ? AutoPopup = !1 : (mypreferences.autoPopup = "on", AutoPopup = !0) : (mypreferences.autoPopup = "", AutoPopup = !1);
  "undefined" != typeof mypreferences.autoAnswer ? "" == mypreferences.autoAnswer ? AutoAnswer = !1 : (mypreferences.autoAnswer = "on", AutoAnswer = !0) : (mypreferences.autoAnswer = "", AutoAnswer = !1);
  "" == getPopupUrl ? ("undefined" == typeof popupUrl && (popupUrl = ""), "undefined" == typeof mypreferences.popupUrl ? mypreferences.popupUrl = "" : popupUrl = mypreferences.popupUrl) : popupUrl = getPopupUrl;
  debug("End of set default preferences")
}
function flashConnect() {
  debug("Attempt flash xmlsocket connection on port " + port);
  $("#descriptiveMessage").html(lang.connecting_server + ": " + attempt);
  var b = host + "," + port + ",onConnectEvent,onDataEvent,onCloseEvent";
  "undefined" != typeof $("#flashconnector")[0].AttachSocketEvents && $("#flashconnector")[0].AttachSocketEvents(b);
  $("#loader").show();
  $("#slider").slideReveal("hide")
}
function flashStatus(b) {
  !0 === b.success && 9 <= swfobject.getFlashPlayerVersion().major && (flashSuccess = 1);
  1 == flashSuccess ? "" !== getExten && "" !== getPass && (myextension = getExten, secret = getPass, $("#loader").show()) : ($("#fatalmessage").html("Adobe Flash Player Required"), $("#fatalerror").show())
}
function limpiaTodo() {
  debug("limpia todo");
  for (var b in openchats) {
    $("#chatbox_" + b).remove(), delete openchats[b]
  }
  for (var c in tiempos) {
    delete tiempos[c], delete tiemposdirection[c]
  }
  queueindex = {};
  dict_queue = [];
  availablequeues = [];
  botonitos = [];
  cuantosBotones = 0;
  $("#allbuttons").find('div[id^="extensionlist"]').empty();
  for (a = 0; a < displaygroups.length; a++) {
    $("#box_grp" + a + "list").empty()
  }
  $("#queuelist").empty();
  $("#trunklist").empty();
  $("#conferencelist").empty();
  $("#parklist").empty();
  $("#ringgrouplist").empty();
  $("#actionbar").empty();
  $("#presence").empty();
  $("#footer").html("");
  0 < $("#liteversion").length && $("#liteversion").remove();
  $("#actionbar").unbind("click");
  $("#custombar").unbind("click");
  $("#allbuttons").unbind("click");
  debug("termine de limpiar")
}
function sendDtmf(b, c) {
  if (0 < myposition && "" !== secret) {
    if (1 == c && ($("#dialtext").focus(), texto = $("#dialtext").val(), texto += b, $("#dialtext").typeahead("val", texto)), sonido["dtmf" + b].play(), "function" == typeof sp) {
      fon.sendDTMF(b, 2000)
    } else {
      var d = hex_md5(secret + lastkey);
      queuedcommand = '<msg data="' + myposition + "|playdtmf|" + b + "|" + d + '" />';
      sendcommand()
    }
  }
}
function showSecBox() {
  debug("show sec box");
  limpiaTodo();
  "undefined" !== typeof plugins.auth && "function" == typeof plugins.auth.preAuth && 0 == preauth ? (preauth++, plugins.auth.preAuth()) : "" !== myextension && "" !== secret ? (debug("ya tenia user y clave, estoy conectado " + conectado), init()) : $("#logindialog").modal("show")
}
function init() {
  debug("funcion init");
  demora_conexion = 11;
  $("#actionbar").off("click", ".myclick");
  if (0 < $("#actionbar").length) {
    $("#actionbar").on("click", ".myclick", function(b) {
      ElementBehaviors.clicky(this)
    })
  }
  $("#custombar").off("click", ".myclick");
  if (0 < $("#custombar").length) {
    $("#custombar").on("click", ".myclick", function(b) {
      ElementBehaviors.clicky(this)
    })
  }
  $("#allbuttons").off("click", ".myclick");
  $("#allbuttons").on("click", ".myclick", function(b) {
    b.stopPropagation();
    ElementBehaviors.clicky(this)
  });
  $("#fatalerror").hide()
}
function toObject(b) {
  b = b.split("&");
  var c = {};
  for (a = 0; a < b.length; a++) {
    var d = b[a].split("=");
    c[d[0].toLowerCase()] = d[1]
  }
  return c
}
var errFunc = function(b) {
  debug("error function");
  finalerror = 1;
  $("#loader").hide();
  $("#fatalmessage").html(lang.not_available);
  $("#fatalerror").show();
  $("#head").hide();
  $("#allbuttons").hide();
  $("#slider").slideReveal("hide");
  conectado = fopexit = 1;
  timerID && clearTimeout(timerID)
};

function UpdateTimer() {
  if (0 === conectado) {
    if (demora_conexion++, debug(demora_conexion), 10 < demora_conexion && (attempt++, connectXML(), demora_conexion = 1), 15 < attempt) {
      errFunc();
      return
    }
  } else {
    ping++, 0 != return_from_reg_result && 1 == ping % 10 && (window.location = window.location.href), 30 < ping && (ping = 1, pingcount++, 1 == enable_ping && (send('<msg data="1|ping||" />'), debug("envio ping " + pingcount)), 3 < pingcount && (debug("lost connection, lack of pong reply"), onCloseEvent()))
  }
  notiChatTitle && (document.title = document.title == savedTitle ? chatTitle : savedTitle);
  timerID && clearTimeout(timerID);
  for (var b in tiempos) {
    var c = b.split("_"),
      d = c[1],
      e = c[2],
      c = $("#tick" + e + "_" + d),
      f = $("#phone" + e + "_" + d);
    if (0 == c.length && 0 == $("#" + b).length) {
      debug("timer en slot " + e + " para boton " + d + " no esta definido"), delete tiempos[b]
    } else {
      var g = 0,
        g = (new Date).getTime() - tiempos[b];
      "DOWN" == tiemposdirection[b] && ("undefined" !== typeof parkTimeout && "undefined" !== typeof parkTimeout[context] && (g = 1000 * parkTimeout[context] - g), tiempos[b] += 2000);
      f.length && f.hasClass("ringing2") && (0 == animado["phone" + e + "_" + d] || void 0 === animado["phone" + e + "_" + d]) && (animado["phone" + e + "_" + d] = 1, f.effect("pulsate", {}, 1000, function() {
        animado[$(this).attr("id")] = 0
      }));
      d = parseInt(g / 3600000, 10);
      e = g - 3600000 * d;
      g = parseInt(e / 60000, 10);
      e -= 60000 * g;
      e = parseInt(e / 1000, 10);
      0 > d && (d = Math.abs(d));
      0 > g && (g = Math.abs(g));
      0 > e && (e = Math.abs(e));
      var f = parseInt(60 * d + g),
        p = parseInt(60 * f + e);
      10 > d && (d = "0" + d);
      10 > g && (g = "0" + g);
      10 > f && (f = "0" + f);
      10 > e && (e = "0" + e);
      var h = {};
      h.hhmmss = "" + d + ":" + g + ":" + e;
      h.mmss = "" + f + ":" + e;
      h.ss = "" + p;
      "undefined" != typeof tiemposformat[b] ? (timerformat = tiemposformat[b], h.hasOwnProperty(timerformat) || (timerformat = "hhmmss")) : timerformat = "hhmmss";
      0 == c.length ? $("#" + b).html(h[timerformat]) : c.html(h[timerformat])
    }
  }
  timerID = setTimeout("UpdateTimer()", 1000)
}
function connectXML(b) {
  debug("connectxml");
  if ("WebSocket" in window && !1 === disableWebSocket) {
    $("#flashconnector").hide();
    b = wsproto + window.location.hostname + ":" + port;
    debug("intento conectar web socket en " + b);
    $("#descriptiveMessage").html(lang.connecting_server + ": " + attempt);
    try {
      ws = new WebSocket(b)
    } catch (c) {
      onWebsocketError()
    }
    ws.onopen = function() {
      debug("websocket connect ok with proto " + wsproto);
      $("#descriptiveMessage").html(lang.connecting_server + ": 1");
      wsconnect = pingcount = attempt = conectado = 1;
      wsprotook = wsproto;
      timerID = setTimeout("UpdateTimer()", 1000);
      debug("puso timer " + timerID);
      connectContext();
      "function" == typeof mycallback.socketconnect && (debug("Ejecutando Callback onConnect"), mycallback.socketconnect(), debug("Ejecutado Callback onConnect"))
    };
    ws.onmessage = function(b) {
      b = jQuery.parseJSON(b.data);
      appendData(b)
    };
    ws.onclose = function(b) {
      onCloseEvent()
    };
    ws.onerror = function(b) {
      onWebsocketError()
    }
  } else {
    embed_flash()
  }
  "undefined" == typeof timerID && (timerID = setTimeout("UpdateTimer()", 1000))
}
function onWebsocketError() {
  debug("WebSocket Error");
  debug("wsproto = " + wsproto);
  debug("wsprotook = " + wsprotook);
  debug("wsconnect = " + wsconnect);
  "wss://" == wsproto ? "wss://" == wsprotook ? debug("no downgrade to ws as we did wss ok before") : (wsdowngrade++, 2 < wsdowngrade ? (debug("could not connect via wss, attempt downgrade to ws"), wsproto = "ws://") : debug("attempt one more time with wss")) : 0 == wsconnect ? (xmlsocketdowngrade++, 2 < xmlsocketdowngrade ? (debug("could not connect via ws, attempt flash xmlsockets"), disableWebSocket = !0) : debug("attempt one more time with ws")) : debug("what to do here? should I increase attempt with no changing proto?")
}
function onConnectEvent(b) {
  b ? (debug("Connection successful flash xmlsockets " + context), $("#descriptiveMessage").html(lang.connecting_server + ": 1"), connectContext(), conectado = 1, attempt = 0, pingcount = 1, "function" == typeof mycallback.socketconnect && (debug("Ejecutando Callback onConnect"), mycallback.socketconnect())) : debug("Could not connect")
}
function connectContext() {
  if ("" !== context) {
    var b = context.toUpperCase();
    send('<msg data="' + b + '|contexto|1|" />')
  } else {
    send('<msg data="GENERAL|contexto|0|" />')
  }
}
function onCloseEvent() {
  debug("close event " + conectado);
  0 == conectado && 0 == finalerror && $("#loader").show();
  $("#head").hide();
  $("#allbuttons").hide();
  $("#slider").slideReveal("hide");
  $(".modal").modal("hide");
  for (var b in plugins) {
    "function" == typeof plugins[b].callback_onclose && plugins[b].callback_onclose(0, "", 0)
  }
  authorized = conectado = 0;
  lostConnection = 1;
  sms_messagesend = sms_enabled = pingcount = 0;
  limpiaTodo();
  debug("on close reseteo a cero")
}
function onDataEvent(b) {
  b = jQuery.parseJSON(b);
  appendData(b)
}
function appendData(b) {
  var c = b.btn;
  1 <= c.indexOf("@") && (c = c.substring(0, c.indexOf("@")));
  docommand(c, b.cmd, b.data, b.slot)
}
function docommand(b, c, d, e) {
  "status" == c && (c = "xstatus");
  "zbuttons" != c && "pong" != c && "plugin" != c && debug(b + "," + c + "=" + d + " en slot " + e);
  if ("function" == typeof execute[c]) {
    execute[c](b, d, e)
  } else {
    debug("Comando " + c + " no implementado")
  }
  "function" == typeof mycallback[c] && (debug("Ejecutando Callback Comando " + c), mycallback[c](b, d, e));
  for (var f in plugins) {
    if ("function" == typeof plugins[f]["callback_" + c]) {
      plugins[f]["callback_" + c](b, d, e)
    }
  }
}
function sendcommand() {
  "" != queuedcommand ? (send(queuedcommand), queuedcommand = "") : debug("no command in queue")
}
function send(b) {
  0 === wsconnect ? (debug("flash send " + b), $("#flashconnector")[0].envia_comando(b)) : (debug("ws send " + b), ws.send(b))
}
function hideContacts() {
  $("#slider").slideReveal("hide")
}
function setLangContacts() {
  $("#contactsframe").contents().find("#contactstitle").html(lang.contacts);
  $("#contactsframe").contents().find(".closetitle").html(lang.close);
  $("#contactsframe").contents().find("#areyousure").html(lang.areyousure);
  $("#contactsframe").contents().find("#yesstring").html(lang.yes);
  $("#contactsframe").contents().find("#nostring").html(lang.no)
}
function setLang() {
  debug("setLang");
  setLangContacts();
  for (var b in plugins) {
    "function" == typeof plugins[b].loadLang && plugins[b].loadLang()
  }
  $(".broadcast").attr("data-original-title", lang.broadcast);
  $(".langcollapse").attr("data-original-title", lang.collapse);
  $(".langlockunlock").attr("data-original-title", lang.toggle_lock);
  $(".queueType").attr("data-original-title", lang.changeDisplayType);
  $("#filtertext").attr("placeholder", lang.filter);
  $("#dialtext").attr("placeholder", lang.dial);
  $("#filtertext").val("");
  $("#dialtext").val("");
  $("#dialtext").typeahead("val", "");
  for (b = $("#presence")[0].options.length - 1; 0 <= b; b--) {
    "!" == $("#presence")[0].options[b].value ? $("#presence")[0].options[b].text = lang.other : "" == $("#presence")[0].options[b].value ? $("#presence")[0].options[b].text = lang.available : lang.hasOwnProperty($("#presence")[0].options[b].value) && ($("#presence")[0].options[b].text = lang[$("#presence")[0].options[b].value])
  }
  $(".selectpicker").selectpicker("refresh");
  $("#filtertext").blur();
  $("#dialtext").blur();
  $("#descriptiveMessage").html(lang.connecting_server + ": " + attempt);
  $("#loadermessage").html(lang.one_moment);
  $("#queuestag").html(lang.queues);
  $("#ringgrouptag").html(lang.ringgroups);
  $("#extensionstag").html(lang.extensions);
  $("#conferencestag").html(lang.conferences);
  $("#trunkstag").html(lang.trunks);
  $("#parkstag").html(lang.parkingslots);
  $("#vmail_new").html(lang.vmail_new);
  $("#vmail_old").html(lang.vmail_old);
  $("#vmail_work").html(lang.vmail_work);
  $("#vmail_family").html(lang.vmail_family);
  $("#vmail_friends").html(lang.vmail_friends);
  $("#prefSounds").html(lang.prefSounds);
  $(".butReset").html(lang.reset);
  $(".butAccept").html(lang.accept);
  $(".butCancel").html(lang.cancel);
  $("#prefDisplay").html(lang.prefDisplay);
  $("#prefPhone").html(lang.prefPhone);
  $("#prefPopup").html(lang.prefPopup);
  $("#labelSoundChat").html(lang.labelSoundChat);
  $("#labelSoundQueue").html(lang.labelSoundQueue);
  $("#labelSoundRing").html(lang.labelSoundRing);
  $("#labelDisplayQueue").html(lang.labelDisplayQueue);
  $("#labelDisplayDynamicLine").html(lang.labelDisplayDynamicLine);
  $("#labelDisplayNotifyDuration").html(lang.labelDisplayNotifyDuration);
  $("#labelDisplayLanguage").html(lang.labelDisplayLanguage);
  $("#labelAutoPopup").html(lang.labelAutoPopup);
  $("#prefDisplayQueue")[0].options[0].text = lang.summary;
  $("#prefDisplayQueue")[0].options[1].text = lang.detailed;
  $("#regcodelabel").html(lang.reg_code);
  $("#regnamelabel").html(lang.reg_name);
  $("#registration_accept").html(lang.accept);
  $("#registration_cancel").html(lang.cancel);
  $("#enterregcode").html(lang.enter_reg_code);
  $(".preferencestitle").html(lang.preferences);
  $(".contactstitle").html(lang.contacts);
  $(".recordingstitle").html(lang.recordings);
  $(".chattitle").html(lang.chat);
  $(".cdrhistorytitle").html(lang.cdrrecords);
  $(".chathistorytitle").html(lang.chathistory);
  $(".logouttitle").html(lang.logout);
  $("#extenlabel").html(lang.exten);
  $("#secretlabel").html(lang.password);
  $("#enterseccode").html(lang.enter_sec_code);
  $(".sendlabel").html(lang.send);
  0 < $("#voiceinputsms").length && $("#voiceinputsms").attr("lang", language);
  0 < $("#labelSmsNumber").length && $("#labelSmsNumber").html(lang.number);
  0 < $("#labelSmsMsg").length && $("#labelSmsMsg").html(lang.message);
  0 < $("#smstag").length && $("#smstag").html(lang.send_sms);
  0 < $("#btnSendSMS").length && $("#btnSendSMS").html(lang.send_sms);
  0 < $("#action_originate").length && $("#action_originate").attr("data-original-title", lang.dial);
  0 < $("#action_transfer").length && $("#action_transfer").attr("data-original-title", lang.blind_transfer);
  0 < $("#action_supervisedtransfer").length && $("#action_supervisedtransfer").attr("data-original-title", lang.attendant_transfer);
  0 < $("#action_vmail").length && $("#action_vmail").attr("data-original-title", lang.transfer_vmail);
  0 < $("#action_transferexternal").length && $("#action_transferexternal").attr("data-original-title", lang.transfer_external);
  0 < $("#action_pickup").length && $("#action_pickup").attr("data-original-title", lang.pickup);
  0 < $("#action_spy").length && $("#action_spy").attr("data-original-title", lang.spy);
  0 < $("#action_whisper").length && $("#action_whisper").attr("data-original-title", lang.whisper);
  0 < $("#action_hangup").length && $("#action_hangup").attr("data-original-title", lang.hangup);
  0 < $("#action_record").length && $("#action_record").attr("data-original-title", lang.record);
  0 < $("#action_preferences").length && $("#action_preferences").attr("data-original-title", lang.preferences);
  0 < $("#action_phonebook").length && $("#action_phonebook").attr("data-original-title", lang.phonebook);
  0 < $("#action_logout").length && $("#action_logout").attr("data-original-title", lang.logout);
  for (var c in buttontype) {
    if ("extension" == buttontype[c]) {
      for (conti = 1; conti <= showLines; conti++) {
        idx = "timer_" + c + "_" + conti, void 0 === tiempos[idx] && $("#clid" + conti + "_" + c).length && $("#clid" + conti + "_" + c).html(translate("&inactive_line!" + conti))
      }
    } else {
      "queue" == buttontype[c] && ($("#queueType" + c).lenght && $("#queueType" + c).attr("data-original-title", lang.changeDisplayType), $("#queuesummary_" + c).lenght && $("#queuesummary_" + c).html(translate("&calls!" + waitingCalls[c])), $("#agentsummary_" + c).lenght && $("#agentsummary_" + c).html(translate("&agents!" + numAgentes[c])))
    }
  }
  $(".mwi").each(function() {
    texto = $(this).attr("data-mwi");
    void 0 !== texto && "&" == texto.substring(0, 1) && (texto = translate(texto), $(this).attr("data-original-title", texto))
  });
  setSessionVariable("language", language, 1);
  $("abbr.timeago").timeago()
}
function setTips(b) {
  b.tooltip({
    container: "body"
  })
}
function setThisTip(b) {
  debug("set this tip " + b);
  $("#" + b + ' [data-toggle="tooltip"]').tooltip({
    container: "body"
  })
}
jQuery.fn.sortDivs = function() {
  $("> div", this[0]).sort(function(b, c) {
    return $(c).data("sort") < $(b).data("sort") ? 1 : -1
  }).appendTo(this[0])
};

function ordenarDiv(b, c) {
  var d = c.split(",");
  jQuery.each(d, function(b, c) {
    $("#" + c).attr("data-sort", b)
  });
  $("#" + b).sortDivs()
}
function setSessionVariable(b, c, d) {
  "undefined" == typeof d && (d = 0);
  0 == unableToSetAuthSession || 1 == d ? (debug("try setvar " + b + " with value " + c), jQuery.ajaxSetup({
    async: !0
  }), jQuery.ajax({
    type: "POST",
    url: "setvar.php",
    data: {
      sesvar: b,
      value: c
    }
  }).done(function(d) {
    debug("setvar variable " + b + " to value " + c + " returned: (" + d + "), authorized=" + authorized);
    "ok" != d && 1 == authorized ? (debug("setvar not ok for variable " + b + ", lets postpone it"), postponedSetVar[b] = c, clearTimeout(deferredSetVar.key), deferredSetVar.key = setTimeout(function() {
      setSessionVariableAuth("key", lastkey)
    }, 5000)) : "ok" == d ? 1 == authorized ? (debug("setvar variable " + b + " ok (" + d + "), or authorized == 1 (" + authorized + ") so we remove postponedSetVar"), delete postponedSetVar[b]) : debug("setvar variable " + b + " ok (" + d + "), but not authorized? What to do ?") : (debug("setvar variable " + b + " not ok (" + d + "), let it be postponed..."), postponedSetVar[b] = c)
  })) : (debug("skip setvar " + b + " as there is no authenticated key session set yet"), postponedSetVar[b] = c)
}
function setSessionVariableAuth(b, c) {
  debug("try setvar with authentication for variable " + b + " with value " + c);
  var d = hex_md5(secret + c);
  jQuery.ajax({
    type: "POST",
    url: "setvar.php",
    data: {
      sesvar: b,
      value: c,
      exten: myextension,
      pass: d
    }
  }).done(function(d) {
    debug("setvar set session with auth " + b);
    debug("setvar return msg " + d);
    if ("ok" != d) {
      debug("setvar with auth not ok, deferring setvar auth"), clearTimeout(deferredSetVar[b]), deferredSetVar[b] = setTimeout(function() {
        setSessionVariableAuth(b, c)
      }, 5000), unableToSetAuthSession = 1
    } else {
      unableToSetAuthSession = 0;
      debug("setvar with auth ok, do all postponed setvars now");
      for (var e in postponedSetVar) {
        debug(e + " = " + postponedSetVar[e]), setSessionVariable(e, postponedSetVar[e])
      }
    }
  })
}
function translate(b) {
  b = b.substring(1, b.length);
  var c = "";
  b = b.split("!");
  var d = b.shift();
  0 == b.length ? c = lang[d] : 1 == b.length ? c = sprintf(lang[d], b[0]) : 2 == b.length ? c = sprintf(lang[d], b[0], b[1]) : 3 == b.length ? c = sprintf(lang[d], b[0], b[1], b[2]) : 4 == b.length && (c = sprintf(lang[d], b[0], b[1], b[2], b[3]));
  return c
}
function filter_list() {
  $("#container").scrollTop(0);
  for (var b = [], c = $("#filtertext").val(), c = c.toLowerCase(), d = 0; d < extenlistGroup.length; d++) {
    var e = extenlistGroup[d];
    "extensionlist" == e && (e = "extensionbox");
    if ("undefined" == typeof saveGridPos[e]) {
      var f = $("#" + e).data("_gridstack_node");
      "undefined" != typeof f && (saveGridPos[e] = [f.x, f.y, f.width, f.height], debug("set save grid de " + e + " en " + f.x + " y " + f.y + " resizing grid " + resizinggrid))
    }
  }
  grid.batchUpdate();
  resizinggrid = 1;
  for (d = 0; d < extenlistGroup.length; d++) {
    e = extenlistGroup[d];
    "extensionlist" == e && (e = "extensionbox");
    var g = 0;
    $("#" + e).find(".labelname, .tags").each(function() {
      var d = $(this).attr("id").substring(5),
        e = $("#boton" + d);
      if ("" == c) {
        e.show(), !0 === hideUnregistered && e.hasClass("notregistered") && d != myposition && e.hide(), g = 1
      } else {
        if (void 0 === b[d] && e.hide(), 0 <= $(this).html().toLowerCase().indexOf(c) || d == myposition) {
          !0 === hideUnregistered ? e.hasClass("notregistered") && d != myposition ? e.hide() : (e.show(), b[d] = 1, g++) : (e.show(), b[d] = 1, g++)
        }
      }
    });
    f = e.substr(0, e.length - 3);
    grid_auto_height(f, 1);
    0 == g ? $("#" + e).is(":visible") && (debug("set save muevo grid " + e), grid.move($("#" + e), 0, 1000), $("#" + e).hide()) : "object" != typeof saveGridPos[e] || !$("#" + e).is(":hidden") && "" != c || (f = saveGridPos[e], grid.update($("#" + e), f[0], f[1], f[2], f[3]), $("#" + e).show())
  }
  grid.commit();
  resizinggrid = 0
}
function toolBarPrivacy(b) {
  var c = 0;
  void 0 === botonitos[b].PRIVACY || "all" != botonitos[b].PRIVACY && "monitor" != botonitos[b].PRIVACY || (c = 1);
  return c
}
function getVmail(b) {
  if (0 < b && "" !== secret) {
    var c = hex_md5(secret + lastkey);
    command = '<msg data="' + b + "|getvmail|INBOX|" + c + '" />';
    send(command)
  }
}
function showVmail(b) {
  currentVmailbox = b;
  $("#vmailcontainer").modal()
}
function showPref() {
  $("#preferencePane").modal()
}
function showRecordings() {
  if ("" == $("#iframerecordings").attr("src")) {
    $("#iframerecordings").attr("src", "recordings.php")
  } else {
    var b = document.getElementById("iframerecordings");
    b.src = b.src
  }
  $("#recordingscontainer").modal()
}
function showChats() {
  "" == $("#iframechats").attr("src") && $("#iframechats").attr("src", "chatadmin.php");
  $("#chatscontainer").modal()
}
function showCDR() {
  "" == $("#iframecdr").attr("src") && $("#iframecdr").attr("src", "calldetailrecords.php");
  $("#cdrcontainer").modal()
}
function gridDataSerialized() {
  var b = _.map($(".grid-stack .grid-stack-item:visible"), function(b) {
    b = $(b);
    var c = b.data("_gridstack_node");
    saveGridPos[b.attr("id")] = [c.x, c.y, c.width, c.height];
    return {
      id: b.attr("id"),
      x: c.x,
      y: c.y,
      width: c.width,
      height: c.height,
      locked: c.locked
    }
  });
  debug(JSON.stringify(b));
  return grid_serialized = Base64.encode(JSON.stringify(b))
}
function savePreferences() {
  var b = [];
  if (1 == fullyGetPref) {
    debug("save preferences");
    mypreferences.grid = gridDataSerialized();
    b.push("grid!" + mypreferences.grid);
    $("#prefSoundChat").is(":checked") ? (debug("sound chat on"), b.push("soundChat!on"), mypreferences.soundChat = "on") : (debug("sound chat off"), b.push("soundChat!"), mypreferences.soundChat = "");
    $("#prefSoundQueue").is(":checked") ? (mypreferences.soundQueue = "on", b.push("soundQueue!on")) : (b.push("soundQueue!"), mypreferences.soundQueue = "");
    $("#prefSoundRing").is(":checked") ? (mypreferences.soundRing = "on", b.push("soundRing!on")) : (b.push("soundRing!"), mypreferences.soundRing = "");
    if ($("#prefDisplayDynamicLine").is(":checked")) {
      b.push("dynamicLineDisplay!on");
      mypreferences.dynamicLineDisplay = "on";
      $("div.acline").each(function(b) {
        b = $(this);
        "acline" == b.attr("id").substring(0, 6) && b.addClass("invisible")
      });
      for (var c in tiempos) {
        var d = c.split("_"),
          e = d[1],
          d = d[2];
        $("#acline_" + d + "_" + e).length && $("#acline_" + d + "_" + e).removeClass("invisible")
      }
    } else {
      for (b.push("dynamicLineDisplay!off"), mypreferences.dynamicLineDisplay = "", $("div.acline").each(function() {
        fid = $(this);
        "acline" == fid.attr("id").substring(0, 6) && fid.removeClass("invisible")
      }), grid_auto_height("extension"), i = 0; i < displaygroups.length; i++) {
        grid_auto_height("box_grp" + i)
      }
    }
    "min" == $("#prefDisplayQueue")[0].options[$("#prefDisplayQueue")[0].selectedIndex].value ? (b.push("displayQueue!min"), mypreferences.displayQueue = "min", domshow = "summary", domhide = "entries") : (b.push("displayQueue!max"), mypreferences.displayQueue = "max", domhide = "summary", domshow = "entries");
    $("#prefAutoPopup").is(":checked") ? (b.push("autoPopup!on"), mypreferences.autoPopup = "on", AutoPopup = !0) : (b.push("autoPopup!"), mypreferences.autoPopup = "", AutoPopup = !1);
    $("#prefAutoAnswer").is(":checked") ? (b.push("autoAnswer!on"), mypreferences.autoAnswer = "on", AutoAnswer = !0) : (b.push("autoAnswer!"), mypreferences.autoAnswer = "", AutoAnswer = !1);
    auto = AutoAnswer ? 1 : 0;
    send('<msg data="' + myposition + "|autoanswer|" + auto + '|" />');
    "" != $("#prefPopupUrl").val() ? (e = Base64.encode($("#prefPopupUrl").val()), b.push("popupUrl!" + e), mypreferences.popupUrl = e, popupUrl = mypreferences.popupUrl, "" !== getPopupUrl && (popupUrl = getPopupUrl)) : (b.push("popupUrl!"), popupUrl = mypreferences.popupUrl = "");
    for (var f in buttontype) {
      "queue" == buttontype[f] && ($("#queue" + domhide + "_" + f).hide(), $("#agent" + domhide + "_" + f).hide(), $("#queue" + domshow + "_" + f).show(), $("#agent" + domshow + "_" + f).show())
    }
    mypreferences.notifyDuration = $("#prefDisplayNotifyDuration").val();
    notifyDuration = mypreferences.notifyDuration;
    b.push("notifyDuration!" + mypreferences.notifyDuration);
    mypreferences.language = $("#prefDisplayLanguage").val();
    b.push("language!" + mypreferences.language);
    language != mypreferences.language && (debug("Set language as it changed!"), language = mypreferences.language, jQuery.getScript("js/lang_" + mypreferences.language + ".js", function() {
      setLang()
    }));
    f = "soundchat";
    e = "nosoundchat";
    "on" == mypreferences.soundChat && (e = "soundchat", f = "nosoundchat");
    for (c in openchats) {
      $("#icosound_" + c).removeClass(f), $("#icosound_" + c).addClass(e)
    }
    b = b.join("&");
    setFullPreference(b);
    fullyGetPref = 0
  }
}
function getPreferences() {
  debug("get preferences");
  debug(mypreferences);
  "on" == mypreferences.soundChat ? ($("#prefSoundChat").attr("checked", !0), $("#prefSoundChat").bootstrapSwitch("state", !0)) : ($("#prefSoundChat").attr("checked", !1), $("#prefSoundChat").bootstrapSwitch("state", !1));
  "on" == mypreferences.soundQueue ? ($("#prefSoundQueue").attr("checked", !0), $("#prefSoundQueue").bootstrapSwitch("state", !0)) : ($("#prefSoundQueue").attr("checked", !1), $("#prefSoundQueue").bootstrapSwitch("state", !1));
  "on" == mypreferences.soundRing ? ($("#prefSoundRing").attr("checked", !0), $("#prefSoundRing").bootstrapSwitch("state", !0)) : ($("#prefSoundRing").attr("checked", !1), $("#prefSoundRing").bootstrapSwitch("state", !1));
  "on" == mypreferences.dynamicLineDisplay ? ($("#prefDisplayDynamicLine").attr("checked", !0), $("#prefDisplayDynamicLine").bootstrapSwitch("state", !0)) : ($("#prefDisplayDynamicLine").attr("checked", !1), $("#prefDisplayDynamicLine").bootstrapSwitch("state", !1));
  "min" == mypreferences.displayQueue ? $("#prefDisplayQueue")[0].selectedIndex = 0 : $("#prefDisplayQueue")[0].selectedIndex = 1;
  "on" == mypreferences.autoPopup ? ($("#prefAutoPopup").attr("checked", !0), $("#prefAutoPopup").bootstrapSwitch("state", !0), AutoPopup = !0) : ($("#prefAutoPopup").attr("checked", !1), $("#prefAutoPopup").bootstrapSwitch("state", !1), AutoPopup = !1);
  "on" == mypreferences.autoAnswer ? ($("#prefAutoAnswer").attr("checked", !0), $("#prefAutoAnswer").bootstrapSwitch("state", !0), AutoAnswer = !0) : ($("#prefAutoAnswer").attr("checked", !1), $("#prefAutoAnswer").bootstrapSwitch("state", !1), AutoAnswer = !1);
  "undefined" == typeof mypreferences.popupUrl && (mypreferences.popupUrl = "");
  if ("" == mypreferences.popupUrl) {
    $("#prefPopupUrl").val("")
  } else {
    var b = Base64.decode(mypreferences.popupUrl);
    $("#prefPopupUrl").val(b)
  }
  $("#prefDisplayNotifyDuration").val(mypreferences.notifyDuration);
  for (i = $("#prefDisplayLanguage")[0].options.length - 1; 0 <= i; i--) {
    $("#prefDisplayLanguage")[0].options[i].value == mypreferences.language && ($("#prefDisplayLanguage")[0].selectedIndex = i, debug("elijo " + i))
  }
  $(".selectpicker").selectpicker("refresh");
  fullyGetPref = 1;
  $("#prefSounds").html(lang.prefSounds);
  $("#prefDisplay").html(lang.prefDisplay);
  $("#labelSoundChat").html(lang.labelSoundChat);
  $("#labelSoundQueue").html(lang.labelSoundQueue);
  $("#labelSoundRing").html(lang.labelSoundRing);
  $("#labelDisplayQueue").html(lang.labelDisplayQueue);
  $("#labelDisplayDynamicLine").html(lang.labelDisplayDynamicLine);
  $("#labelDisplayNotifyDuration").html(lang.labelDisplayNotifyDuration);
  $("#labelDisplayLanguage").html(lang.labelDisplayLanguage);
  $("#labelAutoPopup").html(lang.labelAutoPopup);
  $("#labelAutoAnswer").html(lang.labelAutoAnswer);
  $("#prefDisplayQueue")[0].options[0].text = lang.summary;
  $("#prefDisplayQueue")[0].options[1].text = lang.detailed
}
ElementBehaviors = {
  clicky: function(b) {
    if ("undefined" == typeof $(b).attr("id")) {
      if (widget_id = $(b).parent().parent().parent().parent().parent().attr("id"), icon = $(b).children("i").eq(0), $(b).tooltip("hide"), $(b).hasClass("widget-toggle-btn")) {
        for (debug("toggle de " + widget_id), widget_strip = widget_id.substring(0, widget_id.length - 3), a = 0; a < grid.grid.nodes.length; a++) {
          grid.grid.nodes[a].el.attr("id") == widget_id && (1 == grid.grid.nodes[a].height ? (grid_auto_height(widget_strip, 0), icon.removeClass("fa-caret-square-o-down").addClass("fa-caret-square-o-up")) : (grid.resize(grid.grid.nodes[a].el, null, 1), icon.removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down")))
        }
      } else {
        if ($(b).hasClass("widget-lock-btn")) {
          debug("lock de " + widget_id);
          widget_strip = widget_id.substring(0, widget_id.length - 3);
          for (a = 0; a < grid.grid.nodes.length; a++) {
            grid.grid.nodes[a].el.attr("id") == widget_id && (1 == grid.grid.nodes[a].locked ? (grid.grid.nodes[a].locked = !1, icon.removeClass("fa-lock").addClass("fa-unlock-alt"), debug("locking " + widget_id)) : (grid.grid.nodes[a].locked = !0, icon.removeClass("fa-unlock-alt").addClass("fa-lock"), debug("unlocking " + widget_id)))
          }
          grid_serialized = gridDataSerialized();
          setPreference("grid", grid_serialized)
        }
      }
    } else {
      if ("action_" == b.id.substr(0, 7)) {
        if ("action_preferences" == b.id) {
          showPref()
        } else {
          if ("action_hangup" == b.id || "action_record" == b.id) {
            var c = $(b).css("opacity");
            var d = void 0 !== globalselected ? ExtraeNumero(globalselected.id) : myposition;
            0 < d && ("action_hangup" == b.id ? 0.7 <= c && hangup(d) : "action_record" == b.id && 0.7 <= c && record(d))
          } else {
            if ("action_logout" == b.id || "menulogout" == b.id) {
              alertify.set({
                labels: {
                  ok: lang.yes,
                  cancel: lang.no
                }
              }), alertify.confirm('<span style="font-size:1.5em;">' + lang.logout + "</span><br/>" + lang.areyousure, function(b) {
                b && foplogout()
              })
            } else {
              void 0 !== globalselected && (d = ExtraeNumero(globalselected.id), c = $(b).css("opacity"), "action_originate" == b.id ? 0.7 <= c && originate(d) : "action_transfer" == b.id ? 0.7 <= c && transfer(d) : "action_supervisedtransfer" == b.id ? 0.7 <= c && supervised_transfer(d) : "action_vmail" == b.id ? 0.7 <= c && transfer_to_voicemail(d) : "action_transferexternal" == b.id ? 0.7 <= c && transfer_to_external(d) : "action_pickup" == b.id ? 0.7 <= c && pickup_ringing(d) : "action_spy" == b.id ? 0.7 <= c && spy(d) : "action_whisper" == b.id && 0.7 <= c && whisper(d));
              for (var e in plugins) {
                if ("function" == typeof plugins[e][b.id]) {
                  plugins[e][b.id](d)
                }
              }
            }
          }
        }
      } else {
        "queueType" == b.id.substr(0, 9) ? (c = b.id.substring(9, b.id.length), togleColaDisplay(c)) : "mwi" == b.id.substr(0, 3) ? licenselevel & 2 && (c = b.id.substring(3, b.id.length), c == myposition ? void 0 !== botonitos[myposition].MAILBOX && !0 !== disableVoicemail && showVmail(myposition) : hasPerm("0", "all") ? (debug("tiene all global, lo dejo!"), void 0 !== botonitos[c].MAILBOX && !0 !== disableVoicemail && showVmail(c)) : void 0 !== permisosbtn.voicemailadmin && (hasPerm(c, "voicemailadmin") || hasPerm(0, "voicemailadmin")) && (debug("tiene voicemailadmin o coincide la posicion " + c), void 0 !== botonitos[c].MAILBOX && !0 !== disableVoicemail && showVmail(c))) : "clid" == b.id.substr(0, 4) && (selectText(b.id), b = b.id.substr(6), b = $("#boton" + b)[0])
      }
      if ("boton" == b.id.substr(0, 5)) {
        c = b.id.substring(5);
        if (void 0 !== globalselected && b != globalselected) {
          for (elm in $(globalselected).removeClass("selected"), disableActionBtn) {
            $("#" + elm).is(":visible") && $("#" + elm).fadeTo("fast", 1)
          }
        }
        if ($(b).hasClass("selected")) {
          $(b).removeClass("selected");
          for (elm in disableActionBtn) {
            $("#" + elm).is(":visible") && $("#" + elm).fadeTo("fast", 1)
          }
          globalselected = void 0;
          "queue" == buttontype[c] && (debug("desfiltro"), filter_list(), filter_queue())
        } else {
          for (elm in disableActionBtn.action_transferexternal = 0, disableActionBtn.action_supervisedtransfer = 0, disableActionBtn.action_transfer = 0, disableActionBtn.action_originate = 0, disableActionBtn.action_vmail = 0, disableActionBtn.action_pickup = 0, disableActionBtn.action_spy = 0, disableActionBtn.action_whisper = 0, disableActionBtn.action_record = 0, disableActionBtn.action_hangup = 0, $(b).addClass("selected"), globalselected = b, "queue" == buttontype[c] && (b = $("#agententries_" + c).children(".qimember"), filter_agentes(b), filter_queue(c), $("#container").scrollTop(0)), void 0 !== permisosbtn.spy ? (disableActionBtn.action_spy = 0, hasPerm(c, "spy") || hasPerm(0, "spy") ? (disableActionBtn.action_spy = 0, disableActionBtn.action_spy = toolBarPrivacy(c), disableActionBtn.action_whisper = 0, disableActionBtn.action_whisper = toolBarPrivacy(c)) : (disableActionBtn.action_spy = 1, disableActionBtn.action_whisper = 1)) : (disableActionBtn.action_spy = 1, disableActionBtn.action_whisper = 1), void 0 !== permisosbtn.record ? (disableActionBtn.action_record = 0, hasPerm(c, "record") || hasPerm(0, "record") ? (disableActionBtn.action_record = 0, disableActionBtn.action_record = toolBarPrivacy(c)) : void 0 !== permisosbtn.recordself ? c == myposition ? (disableActionBtn.action_record = 0, disableActionBtn.action_record = toolBarPrivacy(c)) : disableActionBtn.action_record = 1 : c != myposition && (disableActionBtn.action_record = 1)) : void 0 !== permisosbtn.recordself ? c == myposition ? (disableActionBtn.action_record = 0, disableActionBtn.action_record = toolBarPrivacy(c)) : disableActionBtn.action_record = 1 : disableActionBtn.action_record = 1, void 0 !== permisosbtn.hangup ? (disableActionBtn.action_hangup = 0, hasPerm(c, "hangup") || hasPerm(0, "hangup") ? disableActionBtn.action_hangup = 0 : void 0 !== permisosbtn.hangupself ? disableActionBtn.action_hangup = c == myposition ? 0 : 1 : c != myposition && (disableActionBtn.action_hangup = 1)) : disableActionBtn.action_hangup = 1, 1 == disableActionBtn.action_hangup && void 0 !== permisosbtn.hangupself && c == myposition && (disableActionBtn.action_hangup = 0), void 0 !== permisosbtn.transfer ? (disableActionBtn.action_supervisedtransfer = 0, disableActionBtn.action_transfer = 0, disableActionBtn.action_vmail = 0, hasPerm(c, "transfer") || hasPerm(0, "transfer") ? (disableActionBtn.action_transfer = 0, void 0 !== botonitos[c].EXTENVOICEMAIL && (disableActionBtn.action_vmail = 0)) : (disableActionBtn.action_supervisedtransfer = 1, disableActionBtn.action_transfer = 1, disableActionBtn.action_vmail = 1)) : (disableActionBtn.action_supervisedtransfer = 1, disableActionBtn.action_transfer = 1, disableActionBtn.action_vmail = 1), void 0 !== permisosbtn.transferexternal ? (disableActionBtn.action_transferexternal = 0, hasPerm(c, "transferexternal") || hasPerm(0, "transferexternal") ? disableActionBtn.action_transferexternal = void 0 !== botonitos[c].EXTERNAL ? 0 : 1 : disableActionBtn.action_transferexternal = 1) : disableActionBtn.action_transferexternal = 1, void 0 !== permisosbtn.pickup ? (disableActionBtn.action_pickup = 0, hasPerm(c, "pickup") || hasPerm(0, "pickup") ? disableActionBtn.action_pickup = 0 : disableActionBtn.action_pickup = 1) : disableActionBtn.action_pickup = 1, void 0 !== permisosbtn.dial ? (disableActionBtn.action_originate = 0, hasPerm(c, "dial") || hasPerm(0, "dial") ? disableActionBtn.action_originate = 0 : disableActionBtn.action_originate = 1) : disableActionBtn.action_originate = 1, void 0 !== permisosbtn.all && (hasPerm(c, "all") || hasPerm(0, "all")) && (disableActionBtn.action_spy = toolBarPrivacy(c), disableActionBtn.action_whisper = toolBarPrivacy(c), disableActionBtn.action_record = toolBarPrivacy(c), disableActionBtn.action_originate = 0, disableActionBtn.action_pickup = 0, disableActionBtn.action_transfer = 0, disableActionBtn.action_supervisedtransfer = 0, disableActionBtn.action_transferexternal = 0, disableActionBtn.action_vmail = 0, disableActionBtn.action_hangup = 0, disableActionBtn.action_vmail = void 0 !== botonitos[c].EXTENVOICEMAIL ? 0 : 1, disableActionBtn.action_transferexternal = void 0 !== botonitos[c].EXTERNAL ? 0 : 1), disableActionBtn) {
            null !== $(elm) && (c = $(elm).css("opacity"), void 0 === c && (c = 1), $("#" + elm).is(":visible") && (1 == disableActionBtn[elm] ? 0.5 < c && $("#" + elm).fadeTo("fast", 0.5) : 1 > c && $("#" + elm).fadeTo("fast", 1)))
          }
        }
      }
    }
  }
};

function showAgenda() {
  (hasPerm(0, "all") || hasPerm(0, "phonebook")) && $("#slider").slideReveal("show")
}
function ExtraeNumero(b) {
  for (var c = "", d = 0; d < b.length; d++) {
    var e = b.charAt(d);
    "0" > e || "9" < e || (c = c + "" + e);
    "." == e && (c = "")
  }
  return c
}
function togleColaDisplay(b) {
  $("#queuesummary_" + b).is(":visible") ? ($("#queuesummary_" + b).hide(), $("#agentsummary_" + b).hide(), $("#queueentries_" + b).show(), $("#agententries_" + b).show()) : ($("#queuesummary_" + b).show(), $("#agentsummary_" + b).show(), $("#queueentries_" + b).hide(), $("#agententries_" + b).hide())
}
function removeUrlParameter(b, c) {
  if ("" == b) {
    return b
  } - 1 == b.indexOf("?") && (b = "?" + b);
  var d = b.split("?");
  if (2 <= d.length) {
    for (var e = d.shift(), f = d.join("?"), d = encodeURIComponent(c) + "=", f = f.split(/[&;]/g), g = f.length; 0 < g--;) {
      -1 !== f[g].lastIndexOf(d, 0) && f.splice(g, 1)
    }
    len = f.length;
    for (g = 0; g < len; g++) {
      f[g] && f.push(f[g])
    }
    f.splice(0, len);
    b = e + "?" + f.join("&")
  }
  return b
}
function addUrlParameter(b, c, d) {
  b = removeUrlParameter(b, c);
  "" == b && (b = "?");
  return b += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(d)
}
function confirmlogout() {
  alertify.set({
    labels: {
      ok: lang.yes,
      cancel: lang.no
    }
  });
  alertify.confirm('<span style="font-size:1.5em;">' + lang.logout + "</span><br/>" + lang.areyousure, function(b) {
    b && foplogout()
  })
}
function foplogout() {
  var b = hex_md5(secret + lastkey);
  command = '<msg data="' + myposition + "|close||" + b + '" />';
  send(command);
  unableToSetAuthSession = 1;
  "WebSocket" in window && !1 === disableWebSocket && ws.close();
  fopexit = 1;
  "" != logoutUrl ? urlfinal = logoutUrl : (urlfinal = window.location.href.split("?")[0].split("#")[0], "general" != context && (urlfinal = urlfinal + "?context=" + context));
  window.name = "";
  $("#myextension").val("");
  $("#securitycode").val("");
  entered_extension = entered_secret = secret = myextension = "";
  jQuery.ajaxSetup({
    async: !0
  });
  jQuery.ajax({
    type: "POST",
    url: "setvar.php",
    data: {
      sesvar: "logout",
      value: "yes"
    }
  }).done(function(b) {
    debug("ajax complete");
    window.location.href != urlfinal ? window.location.href = urlfinal : location.reload()
  })
}
function escapeHTML(b) {
  var c = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;"
  };
  return ("" + b).replace(/[<>"']/g, function(b) {
    return c[b]
  })
}
function broomChatBox(b) {
  debug("broom chat " + b);
  $("#chatboxcontent_" + b).html("");
  $("#chatboxtextarea_" + b).focus()
}
function replaceURL(b) {
  var c = /(((https?|ftp|file):\/\/)?[A-Za-z0-9-_]+\.[A-Za-z0-9-_%&\?\/=]+[A-Za-z0-9-_%&\?\/.=]+)/ig,
    d = (new RegExp(c)).exec(b),
    e = "";
  null !== d && void 0 === d[2] && (e = "http://");
  return b.replace(c, "<a href='" + e + "$1' target='_blank'>$1</a>")
}
function replaceNUMBER(b) {
  return b.replace(/(\d\d\d\d+)/ig, "<a href='#' onclick='dial(\"$1\");'>$1</a>")
}
function checkChatInput(b, c, d) {
  if (13 == b.keyCode && 0 == b.shiftKey) {
    b = escapeHTML(c.value);
    b = replace(b, "[b]", "<strong>");
    b = replace(b, "[/b]", "</strong>");
    b = replace(b, "[i]", "<i>");
    b = replace(b, "[/i]", "</i>");
    b = replaceNUMBER(b);
    b = replaceURL(b);
    var e = document.createElement("div");
    $(e).attr("class", "chatboxmsgBubble");
    var f = new Date,
      g = 60001;
    void 0 !== lastchat[d] && (g = f - lastchat[d]);
    debug(g);
    var p = (new Date).getTime(),
      p = dateFormat(p, pdateFormat);
    60000 < g && (lastchat[d] = f, $(e).html(jQuery.template('<div class="chatboxmsgcontentSystem">#{fdate}</div>').eval({
      fdate: p
    })));
    $(e).append(jQuery.template('<div class="bubbledLeft">#{message}</div>').eval({
      message: b,
      fdate: p
    }));
    $("#chatboxcontent_" + d).append(e);
    c.value = "";
    $("#chatboxcontent_" + d).scrollTop($("#chatboxcontent_" + d).prop("scrollHeight"));
    c = hex_md5(secret + lastkey);
    b = Base64.encode(b);
    e = '<msg data="' + myposition + "|chat!" + b + "|" + d + "|" + c + '" />';
    0 == d.indexOf("chatbroadcast") && (d = d.split("_", 2), e = '<msg data="' + myposition + "|chat!" + b + "|bcast!" + d[1] + "|" + c + '" />');
    send(e);
    "" !== mypreferences.soundChat && sonido.newchat.play();
    return !1
  }
}
function createChat(b, c, d, e) {
  var f = hex_md5(secret + lastkey),
    g = "";
  openchats[b] = 1;
  if (0 < $("#chatbox_" + b).length) {
    if (!$("#chatbox_" + b).is(":visible")) {
      $("#chatbox_" + b).css("display", "block");
      $("#chatboxcontent_" + b).scrollTop($("#chatboxcontent_" + b).prop("scrollHeight"));
      reacomodaChat();
      if (1 == d) {
        return "notlogged" != e && "NOTONLINE" != e && "NOWONLINE" != e && !0 === desktopNotify && window.notifylib.notify({
          title: lang.chat + " " + c,
          description: e,
          timeout: notifyDuration
        }), "blip"
      }
      0 < $("#chatboxtextarea_" + b).length && !1 !== $("#chatboxcontent_" + b).is(":visible") && !1 !== $("#chatbox_" + b).is(":visible") && $("#chatboxtextarea_" + b).focus()
    }
    if (1 == d) {
      return "newchat"
    }
    g = '<msg data="' + myposition + "|checkonline|" + b + "|" + f + '" />';
    send(g);
    debug("chequeo si el usuario esta conectado " + b)
  } else {
    1 == d ? (debug("set windows notify"), "notlogged" != e && "NOTONLINE" != e && "NOWONLINE" != e && !0 === desktopNotify && window.notifylib.notify({
      title: lang.chat + " " + c,
      description: e,
      timeout: notifyDuration
    })) : (debug("not set windows notify because not remote"), g = '<msg data="' + myposition + "|checkonline|" + b + "|" + f + '" />', send(g), debug("chequeo si el usuario esta conectado " + b));
    e = "soundchat";
    "" === mypreferences.soundChat && (e = "nosoundchat");
    var p = c.split(" ", 2);
    jQuery.ajax({
      type: "GET",
      data: {
        image: p[0]
      },
      url: "vphonebook.php",
      success: function(b, c) {
        "" != b && $("#pict_" + p[0]).attr("src", "uploads/" + b)
      }
    });
    debug("creo un nuevo div para chat");
    f = document.createElement("div");
    $(f).attr("class", "chatbox");
    $(f).attr("id", "chatbox_" + b);
    document.body.appendChild(f);
    $("#chatbox_" + b).html(jQuery.template('<div class="chatboxhead" onClick="javascript:daleFoco(\'#{chatboxid}\');"><img id="pict_#{extension}" class="chatpicture" src="images/person.png"><div id="cbt_#{chatboxid}" class="chatboxtitle">#{chatboxtitle}</div><div class="chatboxoptions"><div id="cbmin_#{chatboxid}" class="minimizechat" onclick="javascript:toggleChat(\'#{chatboxid}\')"></div><div class="closechat" onclick="javascript:closeChatBox(\'#{chatboxid}\')"></div></div><br clear="all"/></div><div id="chatboxcontent_#{chatboxid}" class="chatboxcontent" onClick="javascript:daleFoco(\'#{chatboxid}\');"></div><div id="chatboxinput_#{chatboxid}" class="chatboxinput"><div class="chaticons"><div class="broomchat" title="#{clearlegend}" onclick="javascript:broomChatBox(\'#{chatboxid}\')"></div><div class="#{clasesound}" title="#{togglesound}" onclick="javascript:toggleChatSound(\'#{chatboxid}\')" id="icosound_#{chatboxid}"></div></div><textarea id="chatboxtextarea_#{chatboxid}" class="chatboxtextarea" onkeydown="javascript:return checkChatInput(event,this,\'#{chatboxid}\');" onFocus="javascript:chatHasFocus();" onBlur="javascript:chatLostFocus()"></textarea><div class="clear"></div></div>').eval({
      chatboxtitle: c,
      chatboxid: b,
      clearlegend: lang.clearchat,
      togglesound: lang.toggle_sound,
      clasesound: e,
      extension: p[0]
    }));
    $("#footer").is(":visible") ? $("#chatbox_" + b).css("bottom", "5px") : $("#chatbox_" + b).css("bottom", "0px");
    visibleChats = 0;
    for (var h in openchats) {
      $("#chatbox_" + h).is(":visible") ? visibleChats++ : debug("chat " + h + " no estaba visible ")
    }
    0 === visibleChats ? $("#chatbox_" + b).css("right", "1px") : (width = 232 * visibleChats + 1, $("#chatbox_" + b).css("right", width + "px"));
    openchats[b] = 1;
    c = findHighestZ();
    $("#chatbox_" + b).css("display", "block");
    $("#chatbox_" + b).css("zIndex", c);
    if (0 === d) {
      $("#chatboxtextarea_" + b).focus()
    } else {
      return "blip"
    }
  }
}
function daleFoco(b) {
  !1 !== $("#chatboxcontent_" + b).is(":visible") && !1 !== $("#chatbox_" + b).is(":visible") && $("#chatboxtextarea_" + b).focus()
}
function chatHasFocus() {
  chatFocus = 1;
  notiChatTitle = 0;
  document.title = savedTitle
}
function chatLostFocus() {
  chatFocus = 0
}
function toggleChatSound(b) {
  debug(mypreferences.soundChat);
  mypreferences.soundChat = "" !== mypreferences.soundChat ? "" : "on";
  $("#chatboxtextarea_" + b).focus();
  b = "soundchat";
  var c = "nosoundchat";
  "on" == mypreferences.soundChat ? (c = "soundchat", b = "nosoundchat", setPreference("soundChat", "on"), $("#prefSoundChat").attr("checked", !0), $("#prefSoundChat").next().toggleClass("checked").children(":first").html(lang.yes)) : (setPreference("soundChat", ""), $("#prefSoundChat").attr("checked", !1), $("#prefSoundChat").next().toggleClass("checked").children(":first").html(lang.no));
  for (var d in openchats) {
    $("#icosound_" + d).removeClass(b), $("#icosound_" + d).addClass(c)
  }
}
function toggleChat(b) {
  debug("toggleChat");
  $("#chatboxcontent_" + b).toggle();
  $("#chatboxinput_" + b).toggle();
  $("#chatboxcontent_" + b).scrollTop($("#chatboxcontent_" + b).prop("scrollHeight"));
  !1 === $("#chatboxcontent_" + b).is(":visible") ? ($("#cbmin_" + b).addClass("maximizechat"), $("#cbmin_" + b).removeClass("minimizechat"), debug("minimize")) : ($("#cbmin_" + b).removeClass("maximizechat"), $("#cbmin_" + b).addClass("minimizechat"), $("#chatboxtextarea_" + b).focus(), document.title = savedTitle)
}
function closeChatBox(b) {
  $("#chatbox_" + b).hide();
  delete openchats[b];
  notiChatTitle = 0;
  document.title = savedTitle;
  reacomodaChat()
}
function reacomodaChat() {
  align = 0;
  var b = findHighestZ(),
    c;
  for (c in openchats) {
    $("#chatbox_" + c).is(":visible") && (0 === align ? $("#chatbox_" + c).css("right", "20px") : (width = 232 * align + 20, $("#chatbox_" + c).css("right", width + "px")), $("#chatbox_" + c).css("zIndex", b), align++)
  }
}
function getCookie(b) {
  b += "=";
  var c = document.cookie;
  return 0 < c.length && (begin = c.indexOf(b), -1 != begin) ? (begin += b.length, end = c.indexOf(";", begin), -1 == end && (end = c.length), unescape(c.substring(begin, end))) : null
}
function setCookie(b, c, d, e, f, g) {
  document.cookie = b + "=" + escape(c) + (void 0 === d ? "" : "; expires=" + d.toGMTString()) + (void 0 === e ? "" : "; path=" + e) + (void 0 === f ? "" : "; domain=" + f) + (void 0 === g ? "" : "; secure")
}
function makeSortable(b) {}
function setPreference(b, c) {
  if ("grid" != b || 1 != resizinggrid) {
    var d = hex_md5(secret + lastkey);
    send('<msg data="' + myposition + "|setpref|" + b + "!" + c + "|" + d + '" />')
  }
}
function setFullPreference(b) {
  var c = hex_md5(secret + lastkey);
  send('<msg data="' + myposition + "|setpref|" + b + "|" + c + '" />')
}
function findHighestZ() {
  return Math.max(0, Math.max.apply(null, $.map($.makeArray(document.getElementsByTagName("*")), function(b) {
    return $(b).hasClass("chatbox") ? 0 : parseFloat($(b).css("z-index")) || null
  })))
}
function getFirefoxVersion() {
  var b = 0;
  /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && (b = new Number(RegExp.$1));
  return b
}
function isIE(b) {
  var c = this.isIE,
    d = c.version,
    d = c.version = void 0 !== d ? d : function() {
      var b = 3,
        c;
      if (eval("/*@cc_on!@*/false") && 10 === document.documentMode) {
        return 10
      }
      var d = document.createElement("div");
      for (c = d.getElementsByTagName("i"); d.innerHTML = "\x3c!--[if gt IE " + ++b + "]><i></i><![endif]--\x3e", c[0];) {}
      return 4 < b ? b : !1
    }();
  return b ? b === d : d
}
function isSecure() {
  return "https:" == location.protocol
}
function openNewBackgroundTab(b) {
  debug("open new background tab");
  if (0 < $("#browseriframe").length) {
    $("#browseriframe").attr("src", b), $("#urlbar").val(b)
  } else {
    if (0 != getFirefoxVersion() || isIE()) {
      debug("Automatic popup window.open for firefox or IE"), window.open(b, "_blank"), window.focus()
    } else {
      debug("Automatic popup chrome/safari ctrl/cmd click");
      0 < $("#apopup").length && $("#apopup").remove();
      var c = document.createElement("a");
      $(c).attr("href", b);
      $(c).attr("id", "apopup");
      $(c).attr("target", "_blank");
      $(c).css("display", "none");
      $("#head").append(c);
      b = document.createEvent("MouseEvents");
      isMac ? (debug("is mac simulate click"), b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !0, !1, !1, !0, 0, null)) : (debug("is not mac simulate click"), b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !0, !1, !1, !1, 0, null));
      c.dispatchEvent(b)
    }
  }
}
var getHiddenOffsetWidth = function(b) {
  b = $(b).clone().appendTo("body");
  var c = b.outerWidth();
  b.remove();
  return c
};

function setMenuExtensions() {
  debug("set menu for extensions");
  var b = {};
  $("#allbuttons").contextMenu({
    selector: ".ctxmenu",
    trigger: "left",
    build: function(c, d) {
      debug("removemos items para " + c.attr("id"));
      b = {
        chat: {
          name: lang.chat,
          icon: "chat"
        },
        email: {
          name: lang.email_user,
          icon: "email"
        },
        sms: {
          name: lang.send_sms,
          icon: "sms"
        },
        pause: {
          name: lang.pause_member,
          icon: "pause"
        },
        unpause: {
          name: lang.unpause_member,
          icon: "unpause"
        },
        add: {
          icon: "addto",
          name: lang.add_member,
          items: {}
        },
        remove: {
          icon: "removefrom",
          name: lang.remove_member_from,
          items: {}
        }
      };
      for (var e = 0; e < availablequeues.length; e++) {
        b.add.items["addmember^" + e] = {
          name: dict_queue[availablequeues[e]]
        }, b.remove.items["delmember^" + e] = {
          name: dict_queue[availablequeues[e]]
        }
      }
      if ("undefined" != typeof pauseReasons) {
        var e = 0,
          f;
        for (f in pauseReasons) {
          pauseReasons.hasOwnProperty(f) && e++
        }
        if (0 < e) {
          b.pause.items = {};
          for (var g in pauseReasons) {
            b.pause.items["pausemember^" + g] = {
              name: g
            }
          }
        }
      }
      items = disableMenuItems(b, c.attr("id"));
      for (var p in plugins) {
        "function" == typeof plugins[p].setExtensionMenu && (items = plugins[p].setExtensionMenu(items, c.attr("id")))
      }
      return {
        callback: function(b, c) {
          var d = -1,
            e = $(this).attr("id").substring(8);
          debug("clicked: " + b + " on " + e); - 1 < b.indexOf("^") && (d = b.split("^"), b = d[0], d = d[1]);
          if ("function" == typeof executeMenu[b]) {
            executeMenu[b](d, e)
          } else {
            debug("context menu action " + b + " not implemented, try plugins");
            for (var f in plugins) {
              if ("function" == typeof plugins[f][b]) {
                plugins[f][b](d, e)
              }
            }
          }
        },
        items: items
      }
    }
  })
}
function setMenuQueues() {
  $("#allbuttons").contextMenu({
    selector: ".ctxmenuqueue",
    trigger: "left",
    build: function(b, c) {
      debug("removemos items para " + b.attr("id"));
      var d = b.data("channel").split("~")[2],
        e = b.parent().attr("id").substring(13),
        f = queueindex[e];
      menuitems = {
        pause: {
          name: lang.pause_member,
          icon: "pause"
        },
        unpause: {
          name: lang.unpause_member,
          icon: "unpause"
        },
        delmember: {
          name: lang.remove_member,
          icon: "removefrom"
        }
      };
      if ("undefined" != typeof pauseReasons) {
        var g = 0,
          p;
        for (p in pauseReasons) {
          pauseReasons.hasOwnProperty(p) && g++
        }
        if (0 < g) {
          menuitems.pause.items = {};
          for (var h in pauseReasons) {
            menuitems.pause.items["pausequeuemember^" + h] = {
              name: h
            }
          }
        }
      }
      if ("undefined" != typeof queuePenalties) {
        menuitems.setpenalty = {
          name: lang.set_penalty,
          icon: "info"
        };
        var g = 0,
          l;
        for (l in queuePenalties) {
          queuePenalties.hasOwnProperty(l) && g++
        }
        if (0 < g) {
          for (h in menuitems.setpenalty.items = {}, queuePenalties) {
            menuitems.setpenalty.items["setpenalty^" + queuePenalties[h]] = {
              name: h
            }
          }
        }
      }
      if (hasPerm(e, "queuemanager") || hasPerm(0, "queuemanager") || hasPerm(e, "all") || hasPerm(0, "all")) {
        items = menuitems
      } else {
        return items = {}, debug("no tiene permisos"), !1
      }
      return {
        callback: function(b, c) {
          reason = "";
          if (-1 < b.indexOf("^")) {
            var e = b.split("^");
            b = e[0];
            reason = e[1]
          }
          executeMenu[b](f, d, reason)
        },
        items: items
      }
    }
  })
}
function setMenuMeetme() {
  $("#allbuttons").contextMenu({
    selector: ".ctxmenumeetme",
    trigger: "left",
    build: function(b, c) {
      var d = b.attr("id").substring(6);
      if (!$("#boton" + d).hasClass("busy")) {
        return debug("No active conferences, do not show menu"), !1
      }
      debug("meetme menu boton " + d);
      menuitems = {
        muteall: {
          name: lang.toggle_muteall,
          icon: "mute"
        },
        lock: {
          name: lang.toggle_lock,
          icon: "lock"
        }
      };
      if (hasPerm(d, "meetme") || hasPerm(0, "meetme") || hasPerm(d, "all") || hasPerm(0, "all")) {
        items = menuitems
      } else {
        return debug("No tiene permisos meetme"), !1
      }
      return {
        callback: function(b, c) {
          executeMenu[b](d)
        },
        items: items
      }
    }
  });
  $("#allbuttons").contextMenu({
    selector: ".ctxmenuparticipant",
    trigger: "left",
    build: function(b, c) {
      var d = b.attr("id"),
        e = d.split("-"),
        f = e.pop(),
        g = e.join("-"),
        e = b.parent().attr("id").substring(14);
      debug("meetme menu " + g + " user num " + f + " button number " + e);
      menuitems = {
        mute: {
          name: lang.toggle_mute,
          icon: "mute"
        },
        kick: {
          name: lang.kick,
          icon: "kick"
        }
      };
      if (hasPerm(e, "meetme") || hasPerm(0, "meetme") || hasPerm(e, "all") || hasPerm(0, "all")) {
        items = menuitems
      } else {
        return debug("No tiene permisos meetme"), !1
      }
      return {
        callback: function(b, c) {
          executeMenu[b]("CONFERENCE/" + g, f, d)
        },
        items: items
      }
    }
  })
}
function setMenuPickup() {
  $("#allbuttons").contextMenu({
    selector: ".ctxmenupickup",
    trigger: "left",
    build: function(b, c) {
      var d = "",
        e = b.attr("id"),
        f = b.parent().attr("id");
      var g = f.split("_");
      var p = g[1]; - 1 < f.indexOf("queueentries") ? (g = e.split("!"), d = g[3], d = b.data("channel")) : -1 < f.indexOf("trunkentries") && (d = e.substring(5));
      debug("parent id " + f);
      debug("this id " + e);
      menuitems = {
        pickup: {
          name: lang.pickup_call,
          icon: "addto"
        }
      };
      if (hasPerm(p, "pickup") || hasPerm(0, "pickup") || hasPerm(p, "all") || hasPerm(0, "all")) {
        items = menuitems
      } else {
        return debug("No tiene permisos pickup"), !1
      }
      return {
        callback: function(b, c) {
          executeMenu[b](d)
        },
        items: items
      }
    }
  })
}
function setMenuGroup() {
  $("#allbuttons").contextMenu({
    selector: ".ctxmenugroup",
    trigger: "left",
    build: function(b, c) {
      var d = b.attr("id");
      $(b).tooltip("hide");
      var e = d.split("_", 2);
      if (0 == e[1].indexOf("grp")) {
        var f = e[1].substring(3);
        e[1] = displaygroups[f]
      }
      var g = "To " + e[1];
      menuitems = licenselevel & 4 ? {
        chatbroadcast: {
          name: lang.chat,
          icon: "chat"
        },
        notybroadcast: {
          name: lang.note,
          icon: "info"
        }
      } : {
        notybroadcast: {
          name: lang.note,
          icon: "info"
        }
      };
      if (hasPerm(0, "broadcast") || hasPerm(0, "all")) {
        items = menuitems
      } else {
        return debug("No tiene permisos chat"), !1
      }
      return {
        callback: function(b, c) {
          executeMenu[b](d, g)
        },
        items: items
      }
    }
  })
}
function disableMenuItems(b, c) {
  var d;
  void 0 === permisosbtn.chat && (permisosbtn.chat = []);
  void 0 === permisosbtn.sms && (permisosbtn.sms = []);
  void 0 === permisosbtn.queuemanager && (permisosbtn.queuemanager = []);
  void 0 === permisosbtn.queueagent && (permisosbtn.queueagent = []);
  var e = c.substring(8);
  void 0 === extenmail[e] && (b.email.disabled = !0);
  licenselevel & 4 ? hasPerm(e, "chat") || hasPerm(0, "chat") || hasPerm(e, "all") || hasPerm(0, "all") ? b.chat.disabled = !1 : b.chat.disabled = !0 : delete b.chat;
  var f = d = 0;
  if (1 == sms_enabled && void 0 !== botonitos[e].EXTERNAL) {
    if (hasPerm(e, "sms") || hasPerm(0, "sms") || hasPerm(e, "all") || hasPerm(0, "all")) {
      b.sms.disabled = !1, d = 1
    }
  } else {
    if (1 == sms_messagesend) {
      if (hasPerm(e, "sms") || hasPerm(0, "sms") || hasPerm(e, "all") || hasPerm(0, "all")) {
        b.sms.disabled = !1, d = 1
      }
    } else {
      f = 1
    }
  }
  0 == d && (b.sms.disabled = !0, 1 == f && delete b.sms);
  if (myposition == e) {
    if (hasPerm(e, "queueagent") || hasPerm(0, "queueagent") || hasPerm(e, "queuemanager") || hasPerm(0, "queuemanager") || hasPerm(e, "all") || hasPerm(0, "all")) {
      for (b.pause.disabled = !1, b.unpause.disabled = !1, i = 0; i < availablequeues.length; i++) {
        d = availablequeues[i].split("^")[0], void 0 !== restrictqueue[d] && -1 == jQuery.inArray(e, restrictqueue[d].split(",")) && (delete b.add.items["addmember^" + i], delete b.remove.items["delmember^" + i])
      }
    } else {
      b.pause.disabled = !0, b.unpause.disabled = !0, delete b.add, delete b.remove
    }
  } else {
    if (hasPerm(e, "queuemanager") || hasPerm(0, "queuemanager") || hasPerm(e, "all") || hasPerm(0, "all")) {
      for (b.pause.disabled = !1, b.unpause.disabled = !1, i = 0; i < availablequeues.length; i++) {
        d = availablequeues[i].split("^")[0], void 0 !== restrictqueue[d] && -1 == jQuery.inArray(e, restrictqueue[d].split(",")) && (delete b.add.items["addmember^" + i], delete b.remove.items["delmember^" + i])
      }
    } else {
      b.pause.disabled = !0, b.unpause.disabled = !0, delete b.add, delete b.remove
    }
  }
  0 == availablequeues.length && (delete b.pause, delete b.unpause, delete b.add, delete b.remove);
  return b
}
function sendsms(b, c) {
  var d = 0;
  hasPerm(0, "all") ? d = 1 : void 0 !== permisosbtn.sms && (hasPerm(c, "sms") || hasPerm(0, "sms")) && (d = 1);
  if (1 == d) {
    debug("mando un sms a " + b + " porque esta autorizado=" + d);
    var e = Base64.encode(c);
    alertify.set({
      labels: {
        ok: lang.accept,
        cancel: lang.cancel
      },
      buttonFocus: "ok"
    });
    alertify.prompt(lang.message, function(b, d) {
      if (b) {
        var f = Base64.encode(d);
        if (0 < myposition && 0 < d.length && "" !== secret) {
          0 < $("#smsSend").length && ($("#smsSend").prop("disabled", !0), smstimer = window.setTimeout(function() {
            $("#dialtext").val("");
            $("#dialtext").typeahead("val", "");
            $("#dialtext").trigger("blur")
          }, 20000));
          var g = hex_md5(secret + lastkey),
            l = (new Date).getTime();
          send('<msg data="' + myposition + "!" + e + "!" + f + "!" + ("sms" + l + 1000 * Math.random()) + "|sendsms|" + c + "|" + g + '" />')
        }
      } else {
        debug("sms cancelado")
      }
    }, "")
  } else {
    debug("No mando SMS porque no tiene permiso")
  }
}
function do_mute(b, c, d) {
  var e = hex_md5(secret + lastkey);
  d = $("#" + d).hasClass("meetmemuted") || $("#" + d).hasClass("meetmeadminmuted") ? "unmute" : "mute";
  send('<msg data="' + b + "|" + d + "|" + c + "|" + e + '" />')
}
function do_kick(b, c, d) {
  d = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|kick|" + c + "|" + d + '" />')
}
function do_muteall(b) {
  var c = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|muteall|" + b + "|" + c + '" />')
}
function do_meetmeLock(b) {
  var c = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|meetmelock|" + b + "|" + c + '" />')
}
function do_addmember(b, c) {
  var d = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|queueadd|" + c + "-" + myposition + "|" + d + '" />')
}
function do_delmember(b, c) {
  var d = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|queuelogout|" + c + "|" + d + '" />')
}
function qpause(b, c, d) {
  var e = hex_md5(secret + lastkey);
  debug(d);
  void 0 !== d && (c += "!" + d);
  debug("qpause " + c);
  send('<msg data="' + b + "|queuepause|" + c + "|" + e + '" />')
}
function qpenalty(b, c, d) {
  var e = hex_md5(secret + lastkey);
  void 0 !== d && (c += "!" + d, debug("qpenalty member " + c), send('<msg data="' + b + "|queuepenalty|" + c + "|" + e + '" />'))
}
function qunpause(b, c) {
  var d = hex_md5(secret + lastkey);
  send('<msg data="' + b + "|queueunpause|" + c + "|" + d + '" />')
}
function pickupActive(b) {
  if (0 < myposition) {
    if ($("#boton" + myposition).hasClass("busy")) {
      debug("Extension busy, ignoring pickup action")
    } else {
      var c = hex_md5(secret + lastkey);
      send('<msg data="' + myposition + "|pickupActive|" + b + "|" + c + '" />')
    }
  } else {
    debug("No origin extension defined for actions")
  }
}
function updateCountdown() {
  var b = 160 - jQuery("#smsMsg").val().length;
  jQuery("#countdown").text(b)
}
function pre_init() {
  debug("pre init");
  "WebSocket" in window && !1 === disableWebSocket ? (debug("Client has HTML5 web sockets!"), "" !== getExten && "" !== getPass && (myextension = getExten, secret = getPass, $("#loader").show())) : debug("Websocket no habilitado");
  connectXML()
}
function selectText(b) {
  if (document.selection) {
    var c = document.body.createTextRange();
    c.moveToElementText(document.getElementById(b));
    c.select()
  } else {
    c = document.createRange(), c.setStartBefore(document.getElementById(b)), c.setEndAfter(document.getElementById(b)), window.getSelection().addRange(c)
  }
}
jQuery.fn.flipflop = function(b) {
  function c() {
    !1 === b.stop && (1 === e ? (d.text(b.text2), e = 2) : (d.text(b.text1), e = 1), setTimeout(c, b.speed))
  }
  var d = $(this),
    e = 2;
  b = $.extend(!0, {
    speed: 3000,
    stop: !1,
    text1: "",
    text2: ""
  }, b);
  var f = $.Deferred();
  (function() {
    d.bind("flipflopstop", function() {
      b.stop = !0;
      delete d.flipflop;
      d.flipflop = null
    })
  })();
  c();
  return f.promise()
};

function grid_auto_height(b, c) {
  grid = $(".grid-stack").data("gridstack");
  original_resizinggrid = resizinggrid;
  origtype = b;
  0 == b.indexOf("box_") && (b = b.substring(4));
  "undefined" == typeof c && (c = 1);
  for (a = locked = 0; a < grid.grid.nodes.length; a++) {
    grid.grid.nodes[a].el.attr("id") == b + "box" && 1 == grid.grid.nodes[a].locked && (locked = 1)
  }
  if (0 < $("#" + b + "content").length || 0 < $("#" + origtype + "content").length) {
    actualcontent = 0 < $("#" + b + "content").length ? $("#" + b + "content") : $("#" + origtype + "content");
    0 < $("#" + b + "list").length && (actualcontent = $("#" + b + "list"));
    0 < $("#" + origtype + "list").length && (actualcontent = $("#" + origtype + "list"));
    cellheight = grid.cellHeight();
    actualcontent.css("height", "initial");
    var d = actualcontent[0].scrollHeight;
    actualcontent.css("height", "100%");
    rowheight = Math.ceil((d + 7) / (cellheight + 10));
    resizinggrid = c;
    1 == c && 1 == locked || grid.resize($("#" + origtype + "box"), null, rowheight);
    resizinggrid = original_resizinggrid
  } else {
    debug("pref no existe grid auto height " + b + " o bien esta locked")
  }
}
function loadFrames() {
  (0 <= jQuery.inArray("phonebook", permisos) || 0 <= jQuery.inArray("all", permisos)) && $("#contactsframe").attr("src", "contacts.php")
}
function restoreGrid(b) {
  debug("restoring Grid");
  grid.batchUpdate();
  if (0 < b.length) {
    resizinggrid = 1;
    grid = $(".grid-stack").data("gridstack");
    try {
      var c = JSON.parse(b),
        d;
      for (d in c) {
        grid.update($("#" + c[d].id), c[d].x, c[d].y, c[d].width, c[d].height), saveGridPos[c[d].id] = [c[d].x, c[d].y, c[d].width, c[d].height], 1 == c[d].height && $("#" + c[d].id).find(".widget-toggle-btn").children("i").eq(0).addClass("fa-caret-square-o-down").removeClass("fa-caret-square-o-up"), 1 == c[d].locked && (grid.locked($("#" + c[d].id), !0), $("#" + c[d].id).find(".widget-lock-btn").children("i").eq(0).addClass("fa-lock").removeClass("fa-unlock-alt"))
      }
    } catch (e) {
      debug("Invalid JSON in grid setting")
    }
    resizinggrid = 0
  }
  grid.commit()
}
function copyTextToClipboard(b) {
  var c = document.createElement("textarea");
  c.style.position = "fixed";
  c.style.top = 0;
  c.style.left = 0;
  c.style.width = "2em";
  c.style.height = "2em";
  c.style.padding = 0;
  c.style.border = "none";
  c.style.outline = "none";
  c.style.boxShadow = "none";
  c.style.background = "transparent";
  c.value = b;
  document.body.appendChild(c);
  c.select();
  try {
    var d = document.execCommand("copy");
    debug("Copying text command was " + (d ? "successful" : "unsuccessful"))
  } catch (e) {
    debug("Oops, unable to copy")
  }
  document.body.removeChild(c)
}
function dblclickFunc(b, c) {
  var d = $(c).attr("data-original-title");
  copyTextToClipboard(d)
}
function serialize_widget_map(b) {
  debug("serialize widget save preferences " + resizinggrid);
  0 == resizinggrid ? (fullyGetPref = 1, grid_serialized = gridDataSerialized(), mypreferences.grid = grid_serialized, setPreference("grid", grid_serialized)) : debug("save preferences skip serialize save as it is just auto resizing")
}
jQuery(document).ready(function(b) {
  debug("ready");
  b('#allbuttons [data-toggle="tooltip"]').tooltip({
    container: "body"
  });
  b("#menupreferences").click(function(b) {
    showPref()
  });
  b("#menurecordings").click(function(b) {
    showRecordings()
  });
  b("#menuchats").click(function(b) {
    showChats()
  });
  b("#menucdr").click(function(b) {
    showCDR()
  });
  b("#menulogout").click(function(b) {
    confirmlogout()
  });
  b("#tabnav a").click(function(c) {
    c.preventDefault();
    b(this).tab("show")
  });
  b("#slider").slideReveal({
    position: "right",
    push: !1,
    trigger: b("#menucontacts"),
    show: function() {
      debug("slide shown");
      "" == b("#contactsframe").attr("src") && b("#contactsframe").attr("src", "contacts.php")
    }
  });
  b("#vmailcontainer").on("show.bs.modal", function() {
    getVmail(currentVmailbox);
    b("#tabnav .tab").droppable({
      hoverClass: "tabhover",
      drop: function(c, e) {
        debug(e.draggable[0].id + " dropped on " + b(this).attr("id"));
        partesElement = e.draggable[0].id.split("_");
        partesDest = b(this).attr("id").split("_");
        partesElement[1] != partesDest[1] && (debug("Muevo mensaje " + partesElement[2] + " a carpeta " + partesDest[1]), moveVoicemail("" + partesElement[2], partesElement[1], partesDest[1]))
      }
    });
    b("#vmail_trash").droppable({
      hoverClass: "trashfullicon",
      drop: function(c, e) {
        debug(e.draggable[0].id + " dropped on " + b(this).attr("id"));
        partesElement = e.draggable[0].id.split("_");
        partesDest = b(this).attr("id").split("_");
        partesElement[1] != partesDest[1] && (debug("Muevo mensaje " + partesElement[2] + " a carpeta " + partesDest[1]), moveVoicemail("" + partesElement[2], partesElement[1], ""))
      }
    })
  });
  b("#registrationaccept").on("click", function(c) {
    b("#registerdialog").modal("hide");
    sendreg()
  });
  b("#registrationcancel").click(function(c) {
    b("#registerdialog").modal("hide")
  });
  b("#prefbuttonaccept").on("click", function(c) {
    b("#preferencePane").modal("hide")
  });
  b("#preferencePane").on("show.bs.modal", function(b) {
    getPreferences()
  });
  b("#preferencePane").on("hidden.bs.modal", function(b) {
    savePreferences()
  });
  b("#logindialogaccept").on("click", function(c) {
    b("#logindialog").modal("hide")
  });
  b("#logindialog").on("shown.bs.modal", function(c) {
    b("#loader").hide();
    b("#head").hide();
    b("#allbuttons").hide();
    b("#myextension").focus();
    fopexit = 1;
    fillextension = myextension;
    "" != myextension && "" != entered_extension ? (fillextension = entered_extension != myextension ? entered_extension : myextension, b("#myextension").val(fillextension), b("#securitycode").focus()) : b("#myextension").focus()
  });
  b("#logindialog").on("hidden.bs.modal", function(c) {
    secret = b("#securitycode").val();
    myextension = b("#myextension").val();
    entered_secret = b("#securitycode").val();
    entered_extension = b("#myextension").val();
    fopexit = 0;
    init();
    b("#loader").show();
    1 == conectado && sends_auth()
  });
  b(function() {
    b(".grid-stack").gridstack({
      cellHeight: 40,
      verticalMargin: 10,
      alwaysShowResizeHandle: !1,
      animate: !0,
      draggable: {
        handle: ".handle"
      }
    })
  });
  b(".grid-stack").on("change", function(b, c) {
    debug("change on grid stack class");
    debug(b);
    debug(b.target.id);
    "" == b.target.id && serialize_widget_map(c)
  });
  b("#extenlabel").html(lang.exten);
  b("#secretlabel").html(lang.password);
  b("#enterseccode").html(lang.enter_sec_code);
  b(".preferencestitle").html(lang.preferences);
  b(".contactstitle").html(lang.contacts);
  b(".recordingstitle").html(lang.recordings);
  b(".chattitle").html(lang.chat);
  b(".cdrhistorytitle").html(lang.cdrrecords);
  b(".chathistorytitle").html(lang.chathistory);
  b(".logouttitle").html(lang.logout);
  b(".butAccept").html(lang.accept);
  b(".butReset").html(lang.reset);
  b(".butCancel").html(lang.cancel);
  b("#descriptiveMessage").html(lang.connecting_server + ": " + attempt);
  b("#loadermessage").html(lang.one_moment);
  0 < b("#btnSendSMS").length && b("#btnSendSMS").html(lang.send_sms);
  b("#container").show();
  b("#head").hide();
  b("#allbuttons").hide();
  b("#fatalerror").hide();
  b("#flashconnector").show();
  if (!0 === enableDragTransfer) {
    b(".noselect").on("selectstart dragstart", function(b) {
      b.preventDefault();
      return !1
    })
  }
  b("audio").each(function() {
    var c = b(this).attr("id");
    "audioblock" != c && (sonido[c] = new MediaElement(c, {
      success: function(b) {}
    }))
  });
  b("#filtertext").keyup(function(c) {
    27 == c.keyCode ? (b("#filtertext").val(""), b("#dialtext").val(""), b("#dialtext").typeahead("val", ""), filter_list(), b("#filtertext").blur(), b("#dialtext").blur()) : filter_list()
  });
  b("#dialtext").keyup(function(c) {
    27 == c.keyCode ? (b("#dialtext").val(""), b("#dialtext").typeahead("val", ""), b("#dialtext").blur()) : 13 == c.keyCode && (0 === b("#dialtext").val().indexOf("http") ? (window.open(b("#dialtext").val(), "_blank"), b("#dialtext").val(""), b("#dialtext").typeahead("val", "")) : "" !== b("#dialtext").val() && (dial(b("#dialtext").val()), window.setTimeout(function() {
          b("#dialtext").val("");
          b("#dialtext").typeahead("val", "")
        }, 2000)))
  });
  b("#regcode").keyup(function(b) {
    13 == b.keyCode && sendreg()
  });
  b("#regname").keyup(function(b) {
    13 == b.keyCode && sendreg()
  });
  b("#myextension").keyup(function(c) {
    13 == c.keyCode && b("#secretlabel").focus()
  });
  b("#securitycode").keyup(function(c) {
    13 == c.keyCode && b("#logindialog").modal("hide")
  });
  for (var c in availLang) {
    itemPrint = availLang[c], b("#prefDisplayLanguage").append(b("<option>", {
      value: c,
      text: itemPrint
    }).attr({
      "data-content": '<i class="flag flag-' + c + '"></i> ' + itemPrint
    }))
  }
  b("#smsMsg").on("input", updateCountdown);
  b("#presence").on("change", setState);
  b("a.sphoneDtmfButton").click(function(c) {
    c.preventDefault();
    sendDtmf(b(this).text(), 1)
  });
  b("a.sphoneSendButton").click(function(c) {
    c.preventDefault();
    b(function() {
      var c = b.Event("keyup");
      c.keyCode = 13;
      b("#dialtext").trigger(c)
    })
  });
  b("#smsSend").submit(function(b) {
    b.preventDefault();
    formsms()
  });
  b("#preferences").submit(function(b) {
    b.preventDefault()
  });
  c = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "vphonebook.php?term=%QUERY",
      wildcard: "%QUERY"
    }
  });
  c.initialize();
  b("#dialtext").typeahead({
    minLength: 3,
    highlight: !0
  }, {
    name: "results",
    displayKey: "value",
    source: c.ttAdapter(),
    limit: 100,
    templates: {
      empty: ['<div class="container">', lang.no_results, "</div>"].join("\n"),
      suggestion: function(b) {
        return "<div><strong>" + b.name + "</strong>: " + b.value + "</div>"
      }
    }
  });
  b("#dialtextx").autocomplete({
    source: "vphonebook.php",
    minLength: 3,
    messages: {
      noResults: "",
      results: function() {}
    },
    focus: function(c, e) {
      b("#dialtext").val(e.item.value);
      return !1
    },
    select: function(c, e) {
      b("#dialtext").val(e.item.value);
      return !1
    },
    open: function() {
      var c = b(this).autocomplete("widget");
      c.css("top", parseFloat(c.css("top")) + 7 + "px");
      c.css("left", parseFloat(c.css("left")) - 7 + "px");
      c.css("width", parseFloat(c.css("width")) + 10 + "px")
    }
  });
  if ("undefined" != typeof loadPlugin) {
    for (i = 0; i < loadPlugin.length; i++) {
      jQuery.getScript(loadPlugin[i], function() {
        plugins[this.url.split("/").pop().split(".").shift()].init()
      })
    }
  }
  jQuery.ajaxSetup({
    async: !1
  });
  jQuery.get("fop2-variables" + context.toUpperCase() + ".txt", function(b) {
    b = toObject(b);
    for (var c in b) {
      if (0 === c.indexOf("port")) {
        port = b[c];
        var d = context.toUpperCase();
        debug("Will use port " + port + " as read from fop2-variables" + d + ".txt")
      } else {
        0 === c.indexOf("tlscert") && (tlscert = b[c], debug("TLS Cert = " + tlscert), isSecure() && 0 == tlscert && (11 <= getFirefoxVersion() ? (debug("Using https, no TLSCert configured in server and Firefox!, reverting to flash xmlsockets"), disableWebSocket = !0) : (debug("Using https but no TLSCert configured in server, reverting to ws"), wsproto = "ws://")))
      }
    }
    debug("antes de preinit ok fop2variables");
    pre_init();
    conectado = 0
  }).error(function() {
    jQuery.get("uploads/fop2-variables" + context.toUpperCase() + ".txt", function(b) {
      b = toObject(b);
      for (var c in b) {
        if (0 === c.indexOf("port")) {
          port = b[c];
          var d = context.toUpperCase();
          debug("Will use port " + port + " as read from uploads/fop2-variables" + d + ".txt")
        } else {
          0 === c.indexOf("tlscert") && (tlscert = b[c], debug("TLS Cert = " + tlscert), isSecure() && 0 == tlscert && (11 <= getFirefoxVersion() ? (debug("Using https, no TLSCert configured in server and Firefox!, reverting to flash xmlsockets"), disableWebSocket = !0) : (debug("Using https but no TLSCert configured in server, reverting to ws"), wsproto = "ws://")))
        }
      }
      debug("antes de preinit ok fop2variables");
      pre_init();
      conectado = 0
    }).error(function() {
      port = 4445;
      conectado = tlscert = 0;
      debug("fail fop2-variables, default to port 4445 wit no TLS");
      debug("antes de preinit fail fop2variables");
      pre_init()
    })
  });
  jQuery.ajaxSetup({
    async: !0
  });
  b("#preferencePane input[type=checkbox]").each(function() {
    b(this).bootstrapSwitch({
      size: "small",
      offColor: "warning"
    })
  });
  b("#head").bootstrapDropdownOnHover();
  b("li.dropdown.dialpad-dropdown a").on("click", function(c) {
    b(this).parent().addClass("open")
  });
  b("body").on("click", function(c) {
    b("li.dropdown.dialpad-dropdown").is(c.target) || 0 !== b("li.dropdown.dialpad-dropdown").has(c.target).length || 0 !== b(".open").has(c.target).length || b("li.dropdown.dialpad-dropdown").removeClass("open");
    "contactsmenu" != c.target.id && b("#slider").slideReveal("hide")
  })
});