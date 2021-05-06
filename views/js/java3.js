
//add event listener for search term submit button
document.getElementById("searchSubmit").addEventListener("click", 
	function(){ getImages(document.getElementById("searchTerm").value) });


function hideKeySetup() {
  //get rid of text and inputs
  document.getElementById("keySetup").remove();
  //show gallery text and inputs
  document.getElementById("gallerySetup").style.visibility = "visible";
}



/* TO DO */
function getImages(term) {
	var api_key = "flEDAwf8r_NJON9inPZV4xoKL0EFfQ3RimYuhGLHSfk";
  var url ="https://api.unsplash.com/search/photos/?client_id="+api_key+"&query="+term+"&page=1&per_page=15";
 console.log(url); //this would be a movie search but ya boi aint got time. :)
 
 fetch(url).then(function(result){
 	return result.json();
 }).then(function(json){
 	displayImages(json);
 });
  //do request for images using UNSPLASH API. Use the SEARCH PHOTOS endpoint, the api key, and the term, ask for 1 page and 15 photos per page
  //key: flEDAwf8r_NJON9inPZV4xoKL0EFfQ3RimYuhGLHSfk
}

/* TO DO */
function displayImages(json) {
console.log("hello");
 const gallery = document.getElementById("gallery");
 gallery.innerHTML="";
 var num= json.results.length;
 if (num==0){
 gallery.innerHTML = "No Images Found :(";

 }
 else{
   for (var i = 0; i < num; i++){
     var image = document.createElement("img");
     image.src = json.results[i].urls.small;
     image.alt = json.results[i].alt_description;
     document.getElementById("gallery").appendChild(image);
   }
 }
	//check in the response how many results you got 
  //iterate through the correct number of results and create a new image for each result-- use the small url as src and the alt_description as the alt
}
