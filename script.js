/*jslint browser: true*/
/*global $, jQuery, alert*/

var console = window.console;

var request = new XMLHttpRequest();
request.open("GET", "jsonfile.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
console.log(my_JSON_object);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

(function (data) {
    console.log("JSON: ");
    console.log(data);
    var i, content = "",
        topName;
    for (i = 0; i < data.toppings.length; i++) {
        //        console.log(data.toppings[i].name);
        topName = capitalizeFirstLetter(data.toppings[i].name);
        content = "<label for '" + topName + "'>" + topName + ":</label>";
        content += "<select name='" + topName + "' id='" + topName + "' class='topping'>";
        content += "<option value='none'>none</option>";
        content += "<option value='left'>left</option>";
        content += "<option value='right'>right</option>";
        content += "<option value='full'>full</option>";
        content += "</select>";

        if (i % 2 === 0) {
            //            console.log("topping goes on the left");
            $("#pt1").append(content);
        } else {
            //            console.log("topping goes on the right");
            $("#pt2").append(content);
        }
    }
}(my_JSON_object));

$(".topping").change(function () {
    var list = document.getElementById("list"),
        content = "<ul>";
    console.log("topping was changed");
    $.each($(".topping"), function(index, value){
        console.log(value.value);
        if(value.value !== "none"){
            console.log(value.name);
            content += "<li>" + value.name + "</li>";
        }
    });
    
    content += "</ul>";
    
    list.innerHTML = content;
});