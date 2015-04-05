/**
 * Created by coreyching on 4/4/15.
 */
console.log("hello2'");
function dataTransfer () {

    var data = document.getElementById("text");
    changePage();
    console.log(data);

}

function changePage( callback) {
    window.location='/results';
    callback();
}