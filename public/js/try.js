$('#abcd').click(function() { 

        $.ajax({
            url: '/results',
            type: 'POST',
            data: {'results':  $('#text').text()}, // An object with the key 'submit' and value 'true;
			error: function(req, err){ console.log('my message' + err); }
        });

 window.location.replace('/results');
});
