$(document).ready(function() {


$('#chgbtn').click(function(event) {
    var position,
        start,
        end,
        dot,
        doty,
        xrddata = '',
        text =$("#input").val(),
        arr = text.split('\n'),
        dataline = arr.indexOf('[Data]') + 2;
    start = arr[dataline].split(',')[0].trim();
    for (var i = dataline; i < arr.length; i++) {
        dot = arr[i].split(',');
        doty = dot[1];
        if (doty) {
            xrddata += doty.trim() + ' ';
            end = dot[0].trim();
        };
    };

    var omega1 = Number(start),
        omega2 = Number(end);

    if ($("input[type='radio']:checked").val() == 'to') {
        omega1 /= 2;
        omega2 /= 2;
    };

    var theta1 = omega1 * 2,
        theta2 = omega2 * 2;

    var template = '\
<?xml version="1.0" encoding="UTF-8"?>\n\
<xrdMeasurements xmlns="http://www.xrdml.com/XRDMeasurement/1.3" \n\
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \n\
    xsi:schemaLocation="http://www.xrdml.com/XRDMeasurement/1.3 http://www.xrdml.com/XRDMeasurement/1.3/XRDMeasurement.xsd" status="Completed">\n\
    <xrdMeasurement measurementType="Scan" status="Completed" sampleMode="Reflection">\n\
        <scan appendNumber="0" mode="Continuous" scanAxis="Omega-2Theta" status="Completed">\n\
            <header>\n\
                <startTimeStamp>2007-05-25T10:30:25+08:00</startTimeStamp>\n\
                <endTimeStamp>2007-05-25T10:34:52+08:00</endTimeStamp>\n\
                <author>\n\
                    <name>Nanjing University</name>\n\
                </author>\n\
                <source>\n\
                    <applicationSoftware version="2.2">X\'Pert Data Collector</applicationSoftware>\n\
                    <instrumentControlSoftware version="1.7 ">XPERT-PRO</instrumentControlSoftware>\n\
                    <instrumentID>0000000011013526</instrumentID>\n\
                </source>\n\
            </header>\n\
            <scanAxisCenter>\n\
                <position axis="2Theta" unit="deg">' + (theta1 + theta2)/2 + '</position>\n\
                <position axis="Omega" unit="deg">' + (omega1 + omega2)/2 + '</position>\n\
            </scanAxisCenter>\n\
            <dataPoints>\n\
                <positions axis="2Theta" unit="deg">\n\
                    <startPosition>' + theta1 + '</startPosition>\n\
                    <endPosition>' + theta2 + '</endPosition>\n\
                </positions>\n\
                <positions axis="Omega" unit="deg">\n\
                    <startPosition>' + omega1 + '</startPosition>\n\
                    <endPosition>' + omega2 + '</endPosition>\n\
                </positions>\n\
                <commonCountingTime unit="seconds">0.40</commonCountingTime>\n\
                <intensities unit="counts">' + xrddata.trim() +'</intensities>\n\
            </dataPoints>\n\
        </scan>\n\
    </xrdMeasurement>\n\
</xrdMeasurements>';

    $('#result').val(template);
});


$('#clrbtn').click(function(event) {
    $("textarea").val('');
});

});