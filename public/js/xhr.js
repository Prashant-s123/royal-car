var body = document.body

body.onmousemove = (
    function () {
        var executed = false;
        return function () {
            if (!executed) {
                executed = true;
                apiCallOnScroll("./populate.html", "first-div")
            }
        };

    }
)();
function apiCallOnScroll(urlInfo, divId) {
    // create an XHR object
    var xhr = new XMLHttpRequest();
    // specify the URL of the HTML file to fetch
    var url = urlInfo;

    // specify the type of request to make and the URL to fetch
    xhr.open("GET", url, true);


    // set the responseType property to "document" to receive the HTML file as a DOM object
    xhr.responseType = "document";

    // set up an event listener to handle the response when it arrives
    xhr.onload = function () {
        if (xhr.status === 200) {

            // the response has arrived successfully
            // access the HTML file as a DOM object using the responseXML property
            var html = xhr.responseXML;

            // get the element to insert before
            var divElement = document.getElementById(divId);

            // get the content to insert
            var content = html.getElementById("dynamic-content");

            // insert the content before the specified element
            // beforeElement.previousElementSibling.insertAdjacentHTML("afterend", content.innerHTML);
            divElement.innerHTML = content.innerHTML;
        } else {
            // an error occurred while fetching the HTML file
            console.error("Error fetching HTML file: " + xhr.status);
        }
    };

    // send the request
    xhr.send();

    // Remove Event Listiner
    window.removeEventListener("mousemove", apiCallOnScroll);
}