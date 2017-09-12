# The perl part of a plugin will execute commands on the server side.
# As such, this commands will apply to any user, regardless if the plugin
# is assigned to any user (plugin assignment only affects the client side
# part, or .js files)

# AMI_Event_Handler lets you intercept AMI events and add your own actions/code
# The first parameter is a hash with the key=>value paris as received
#
# The function should return an array with valid AMI cmmands/actions to send
# If you want to see the possible AMI events, you can start fop2_server in debug
# level 1.
#

