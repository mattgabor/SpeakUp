/**
 * Created by coreyching on 4/4/15.
 */
function dataTransfer () {

    analysis();

}

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