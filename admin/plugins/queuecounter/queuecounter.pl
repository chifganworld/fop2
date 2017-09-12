$AMI_Event_Handler{'queuecounter'}{'AGENTRINGNOANSWER'} = sub {

    my $event = shift;
    my @allreturn;

    # Retrieve config data as set in the plugin ini file
    # my $var1 = $main::pluginconfig{'noanswersound'}{'sampleConfig'}{''};
    # my $var2 = $main::pluginconfig{'noanswersound'}{'sampleConfig'}{'samplesection'};

    # This will print out the complete manager event as received
    #my @keys =  keys %$event;
    #foreach my $key (@keys) {
    #    print "$key = ".${$event}{$key}."\n";
    #}
    #print "\n";

    my $data =  FOP2::utils::encode_base64(${$event}{MemberName}."^".${$event}{Queue});

    $return  = "Action: UserEvent\r\n";
    $return .= "UserEvent: noanswersound\r\n";
    $return .= "Channel: GLOBAL\r\n";
    $return .= "Family: noanswersound\r\n";
    $return .= "Value: $data\r\n";
    $return .= "\r\n";
    push @allreturn, $return;

    #Member = Local/603@from-queue/n
    #Queue = 100
    #Uniqueid = 1418984962.367531
    #MemberName = Agustin
    #RingTime = 15000
    #Event = AgentRingNoAnswer
    #Privilege = agent,all
    #Channel = SIP/609-000581a2

    return @allreturn;
};

