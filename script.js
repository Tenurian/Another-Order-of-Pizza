/*jslint browser: true*/
/*global $, jQuery, alert*/

var console = window.console;

var request = new XMLHttpRequest();
request.open("GET", "jsonfile.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
console.log(my_JSON_object);

$('.topping').on('click', function () {
    console.log("something happened");
    if (this.checked) {
        //        console.log($(this).val());
        //here is where we'd put the toppings on the image and load them into the list
        var lst = "";
        if (document.getElementById("list").innerHTML.toString() === "") {
            console.log("list is empty");
        } else {
            $.getJSON("yourjsonfile.json", function (data) {
                console.log("JSON Data: " + data);
                $.each(data, function (key, val) {
                    console.log(key + "value:: " + val);
                });
            });
            console.log(document.getElementById("list").innerHTML.toString());
            lst = document.getElementById("list").innerHTML.toString();
        }
        lst += "<p id='list_" + $(this).val() + "'>" + $(this).val() + "</p>";
        document.getElementById("list").innerHTML = lst;
        console.log(lst);
    } else {
        console.log("unclicked");
        document.getElementById("list").removeChild(document.getElementById("list_" + $(this).val()));
    }
});