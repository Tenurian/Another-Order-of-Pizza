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
    //    $("#innerList").addClass("hidden");
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
        content += "</select><br>";

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
    var list = document.getElementById("innerList"),
        listTotal = document.getElementById("listTotal"),
        content = "<h3>Toppings:</h3><br><ul>",
        count = 0,
        total = 0,
        i, cost;
    console.log("topping was changed");
    $.each($(".topping"), function (index, value) {
        console.log(value.value);
        if (value.value !== "none") {
            count++;
            console.log(value.name);
            for (i = 0; i < my_JSON_object.toppings.length; i++) {
                if (capitalizeFirstLetter(my_JSON_object.toppings[i].name) === value.name) {
                    cost = my_JSON_object.toppings[i].price;
                    i = my_JSON_object.toppings.length + 1;
                }
            }
            content += "<li>" + value.name + "<span>$" + cost + "</span></li>";
            total += parseFloat(cost);
        }
    });

    content += "</ul>";

    list.innerHTML = content;
});

/* FIRST TOPPING IS FREE */
//total -= 1;
//
//if (count >= 5) {
//    total -= 1;
//    $("#specialDeal").removeClass("hidden");
//} else {
//    $("#specialDeal").addClass("hidden");
//}
//
//content += "</ul>";
//
//list.innerHTML = content;
//
//listTotal.innerHTML = "<p>Total: $" + total + "</p>"
//});