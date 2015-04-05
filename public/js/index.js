/**
 * Created by coreyching on 4/4/15.
 */
function dataTransfer () {


}

function changePage( callback) {
    window.location='/results';
    callback();
}

function goHome() {
	window.location = '/';
	console.log("going home");
}