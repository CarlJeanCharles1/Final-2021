var form  = document.getElementById('form')

// Asks the user to confirm if he/she is ready to submit their form
function contactInfo(){
    var elem = document.getElementById('form');
    var box = document.getElementById('name');
    var box2 = document.getElementById('phone');

    if (box.value === "") {
        alert("Please enter a name.");
        box.focus();
        box.style.border="solid 3px red";
        return false;
    }else{
         box.style.border="none";
    }

    if (box.value.length < 5) {
        alert("Please enter at least 5 characters for name.");
        box.focus();
        box.style.border="solid 3px red";
        return false;
    }else{
         box2.style.border="none";
    }

    // Validates the phone number using this format: 401-999-9999
    if (box2.value.length < 12 || box2.value.length > 12 || box2.value === " ") {
        alert("Please enter a valid number.");
        box2.focus();
        box2.style.border="solid 3px red";
        return false;
    }else{
         box2.style.border="none";
    }



    if(!confirm("Are you sure you want to submit?")){
	   event.preventDefault();
       return;
	}
	document.body.innerHTML = 'Thank you! <a href="index.html">Back to Home</a>';
    event.target.style.background = 'white';

}


function changeBackground(row) {
    row.style.color = "red";

}

function backToNormal(row) {
    row.style.color = "black";
}

function changeColumnColor(column) {
    column.style.color = "white";
    column.style.backgroundColor = "red";

}

function returnColumnColor(column) {
    column.style.color = "black";
    column.style.backgroundColor = "white";

}
