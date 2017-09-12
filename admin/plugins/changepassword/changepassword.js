plugins['changepassword'] = (function() {

    var forcechange = parseInt(pluginconfig['changepassword']['force_change_if_password_is_equal_to_extension']['']);

    return { 

        loadLang: function(values) {
            var hash = hex_md5(secret+lastkey);
            queuedcommand = "<msg data=\"" + myposition + "|pluginlang|" + language + "~changepassword" + "|" + hash + "\" />";
            sendcommand();
        },

        setLang: function() {
            // This method is used to apply a language strings to html elements
            $('.changepasswordtitle').html(lang.change_password);
            $('#currentpasswordlabel').html(lang.current_password);
            $('#newpasswordlabel').html(lang.new_password);
            $('#newpasswordverifylabel').html(lang.verify_newpassword);
            $('#changepassworddialog .butAccept').html(lang.accept);
            $('#changepassworddialog .butCancel').html(lang.cancel);

        },
        showform:  function() {
            debug('show modal');
            $('#changepasswordnotice').html('').addClass('hidden');
            $('#changepassworddialog').modal('show');
        },
        callback_zbuttons: function(nro,texto,slot) {
            var oldclient=0;

            if ($('#box_asternicTagbox').length > 0) {
                oldclient=1;
            }

            if (oldclient==0) {
                if($('#changepassworddialog').length<=0) {
                   // fop2 bootstrap version
                   debug('changepassword meto ventana nueva en widget grid ');

                   var newklon = $('<div id="changepassworddialog" class="modal fade" role="dialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h3 class="modal-title changepasswordtitle">Change Password</h3> </div> <div class="modal-body"> <div class="container-fluid"> <div id="changepasswordnotice" class="alert alert-danger hidden"></div><div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="currentpassword" id="currentpasswordlabel">Current Password</label> <input class="form-control" id="currentpassword" name="currentpassword" tabindex="1" type="password" value="" autofocus> </div> <div class="form-group"> <label for="newpassword" id="newpasswordlabel">New Password:</label> <input class="form-control" id="newpassword" name="newpassword" tabindex="2" type="password" value=""> </div> <div class="form-group"> <label for="newpasswordverify" id="newpasswordverifylabel">Verify New Password:</label> <input class="form-control" id="newpasswordverify" name="newpasswordverify" tabindex="3" type="password" value=""> <span id="changepasswordverifynotice" class="help-block hidden"></span></div> </div> </div> <div class="row"> <div class="col-md-12"> <button class="btn btn-warning butCancel" id="changepasswordcancel" data-dismiss="modal">Cancel</button> <button class="btn btn-primary butAccept" id="changepasswordaccept">Accept</button> </div> </div> </div> </div> </div> </div> </div>');
                $('body').append(newklon);

                $(document).ready(function(){
                    $('#newpasswordverify').focusout(function(){
                        var pass  = $('#newpassword').val();
                        var pass2 = $('#newpasswordverify').val();
                        if(pass != pass2){
                            changepassworderror=lang.password_mismatch;
                            $('#newpasswordverify').parent().addClass('has-warning');
                            $('#changepasswordverifynotice').html(changepassworderror).removeClass('hidden');
                        }
                    });
                });

                $('#changepasswordaccept').on('click',function() {

                    passwordmatch=1;
                    $('#newpasswordverify').parent().removeClass('has-warning');
                    $('#changepasswordverifynotice').html('').addClass('hidden');

                    var oldpass = $('#currentpassword').val();
                    var pass  = $('#newpassword').val();
                    var pass2 = $('#newpasswordverify').val();

                    if(pass != pass2) {
                        passwordmatch=0;
                        changepassworderror=lang.password_mismatch;
                    }
                    if(oldpass == pass) {
                        passwordmatch=0;
                        changepassworderror=lang.password_notsame;
                    }
                    if(pass2.length == 0) {
                        passwordmatch=0;
                        changepassworderror=lang.password_empty;
                    } else
                    if(pass2.length < 4) {
                        passwordmatch=0;
                        changepassworderror=lang.password_short;
                    }
 
                    if(passwordmatch==0) {
                        $('#newpasswordverify').parent().addClass('has-warning');
                        $('#newpasswordverify').focus();
                        $('#changepasswordverifynotice').html(changepassworderror).removeClass('hidden');
                    } else {
                        // ok, hago ajax submit
                        $('#newpasswordverify').parent().removeClass('has-warning');
                        $('#changepasswordverifynotice').html('').addClass('hidden');


                        var pars = {};
                        pars['currentpassword'] = $('#currentpassword').val();
                        pars['newpassword'] = $('#newpassword').val();

                        jQuery.ajax({
                          type: 'POST',
                          url: 'admin/plugins/changepassword/changepassword.php',
                          data: pars,
                          success: function(output, status) {
                               if(output=='ERROR') {
                                   $('#changepasswordnotice').html(lang.bad_credentials).removeClass('hidden');
                               } else {
                                   $('#changepasswordnotice').html('').addClass('hidden');
                                   $('#currentpassword').val('');
                                   $('#newpassword').val('');
                                   $('#newpasswordverify').val('');
                                   $('#changepassworddialog').modal('hide');
                                   entered_secret = pass2;
                               }
                          }
                        });

                    }
                });

 
              }

              if(myextension==entered_secret && forcechange==1) {
                  plugins['changepassword'].showform();
              }
 
          }
        },
        init: function() {
            debug("init de changepassword plugin");

            if($('#changepasswordmenu').length==0) {
                $("#usermenu li:last").prev().before('<li id="changepasswordmenu" role="presentation"><a role="menuitem"><i class="fa fa-key"></i> <span class="changepasswordtitle">Change Password<span></span></a></li>');
            }
            $('#changepasswordmenu').on('click',function() {
                plugins['changepassword'].showform();
            });

        }
    }
}());
