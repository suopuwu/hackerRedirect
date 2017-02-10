$(document).ready(function() {//TODO add support for choosing the presentation num
    var data = $.getJSON('json/links.json', (function () {
        data = data.responseJSON;
        var link = data.links[data.links.length - 1];
        var messages = data.messages;
        var url = link.link;
        //the ids of the messages to be used
        var messageNums = link.messages;
        //translates message numbers into ints
        $.each(messageNums, function (index, val) {
            messageNums[index] = parseInt(val);
        });
        //filters out the messages that are not needed by setting to null
        $.each(messages, function (index, value) {
            var isOne = false;
            $.each(messageNums, function (idx, val) {
                if(val === index) isOne = true;});
            if(isOne === false) messages[index] = null;
        });
        //removes null messages
        $.each(messages, function (index, val) {
            if(val === null) {messages.splice(index, 1);}});
        $('#bar').css('animation-duration', link.duration / messages.length + 's');

        function changeMessage(message) {
            $('#text').html(message);
            $('#bar').removeClass('bar-anim');
            //below is necessary for some reason to reset the animation
            void $('#bar')[0].offsetWidth;
            $('#bar').addClass('bar-anim');
        }
        //changes the message according to time
        $.each(messages, function (index, val) {
            setTimeout(changeMessage, (index) * ((link.duration * 1000) / messages.length), val);
        });
        function goToLink() {
            // window.location = url;
        }
        setTimeout(goToLink, link.duration * 1000);
    }));
});
