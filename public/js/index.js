/**
 * Created by coreyching on 4/4/15.
 */

function changePage( callback) {
    window.location='/results';
    callback();
}

function goHome() {
	window.location = '/';
	console.log("going home");
}

function analysis() {

    document.getElementById("analyze").click(); // Click on the checkbox

}

$('#abcd').click(function() {

    $.ajax({
        url: '/results',
        type: 'POST',
        data: {'results':  $('#text').text()}, // An object with the key 'submit' and value 'true;
        error: function(req, err){ console.log('my message' + err); }
    });
    window.location.replace('/results');
    analysis();

});