/*jslint browser: true*/
/*global $, jQuery, alert*/

var console = window.console,
    request = new XMLHttpRequest();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

request.open("GET", "jsonfile.json", false);
request.send(null);
var my_JSON_object = JSON.parse(request.responseText);
//console.log(my_JSON_object);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addTheSauce() {
    var valu = $('[name=radio2]:checked').val();
    if (parseFloat(valu) !== 3) {
        if (parseFloat(valu) === 1) {
            //BBQ
            ctx.drawImage(document.getElementById("BBQ"), 10, 10, canvas.width - 20, canvas.height - 20);
        } else {
            //Reg
            ctx.drawImage(document.getElementById("REG"), 10, 10, canvas.width - 20, canvas.height - 20);
        }
    }
}

function addTheToppings() {
    var list = document.getElementById("innerList"),
        listTotal = document.getElementById("listTotal"),
        content = "<h3>Toppings:</h3><br><ul>",
        count = 0,
        total = 0,
        images = [],
        i,
        cost;
    $.each($(".topping"), function (index, value) {
        //console.log(value.value);
        if (value.value !== "none") {
            count++;
            //console.log(value.name);
            for (i = 0; i < my_JSON_object.toppings.length; i++) {
                if (capitalizeFirstLetter(my_JSON_object.toppings[i].name) === value.name) {
                    cost = my_JSON_object.toppings[i].price;
                    total += parseFloat(cost);
                    images.concat(my_JSON_object.toppings[i].image);

                    if (/[a-z]*3/.test(value.value.toString())) {
                        //console.log("value was full");
                        ctx.drawImage(document.getElementById(value.name + "Image"), 10, 10, canvas.width - 20, canvas.height - 20);
                    } else if (/[a-z]*1/.test(value.value.toString())) {
                        //left
                        //console.log(value.value);
                        ctx.drawImage(document.getElementById(value.name + "HalfImage"), 10, 10, canvas.width - 20, canvas.height - 20);
                    } else {
                        ctx.save();
                        ctx.translate(canvas.width, canvas.height); // change origin
                        ctx.rotate(Math.PI);
                        ctx.drawImage(document.getElementById(value.name + "HalfImage"), 10, 10, canvas.width - 20, canvas.height - 20);
                        ctx.restore()
                    }

                    i = my_JSON_object.toppings.length + 1;
                }
            }
            content += "<li>" + value.name + "<span id='span1'>$" + cost + "</span></li><br>";
        }
    });


    /* FIRST TOPPING IS FREE */
    if (count > 0)
        total -= 1;

    if (count >= 5) {
        total -= 1;
        $("#specialDeal").removeClass("hidden");
    } else {
        $("#specialDeal").addClass("hidden");
    }

    content += "</ul>";

    console.log(content);

    list.innerHTML = content;

    listTotal.innerHTML = "<p>Total: $" + total + "</p>"
    total += parseFloat(cost);

    list.innerHTML = content;
}

(function (data) {
    //    $("#innerList").addClass("hidden");
    //console.log("JSON: ");
    //console.log(data);
    var i, content = "",
        imgs = "",
        topName;
    for (i = 0; i < data.toppings.length; i++) {
        topName = capitalizeFirstLetter(data.toppings[i].name);
        content = "<label for '" + topName + "'>" + topName + ":</label>";
        content += "<select name='" + topName + "' id='" + topName.replace(/ /g, '') + "' class='topping'>";
        content += "<option value='none'>none</option>";
        content += "<option value='" + data.toppings[i].name + "1'>left</option>";
        content += "<option value='" + data.toppings[i].name + "2'>right</option>";
        content += "<option value='" + data.toppings[i].name + "3'>full</option>";
        content += "</select><br>";

        imgs = "<img id='" + topName + "Image' src='" + data.toppings[i].image + "' />";
        imgs += "<img id='" + topName + "HalfImage' src='" + data.toppings[i].imageHalf + "' />";

        if (i % 2 === 0) {
            //            //console.log("topping goes on the left");
            $("#pt1").append(content);
        } else {
            //            //console.log("topping goes on the right");
            $("#pt2").append(content);
        }

        $("#images").append(imgs);
    }

    $("#images").hide();
}(my_JSON_object));

$(".sauceButton").change(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addTheSauce();
    addTheToppings();
});

$(".topping").change(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addTheSauce();
    addTheToppings();
    //console.log("topping was changed");
});

$(".specialty").on('click', function () {
    console.log(this.id);
    switch (this.id) {
    case "bbqChickenPizza":
        $("input[name=radio2][value=" + 1 + "]").prop('checked', true);
        $("#Cheese").prop('selectedIndex', 3);
        $("#Pepperoni").prop('selectedIndex', 0);
        $("#Sausage").prop('selectedIndex', 0);
        $("#Pineapple").prop('selectedIndex', 0);
        $("#Bacon").prop('selectedIndex', 0);
        $("#Blackolives").prop('selectedIndex', 0);
        $("#Mushrooms").prop('selectedIndex', 0);
        $("#Greenpeppers").prop('selectedIndex', 0);
        $("#Onions").prop('selectedIndex', 0);
        $("#Chicken").prop('selectedIndex', 3);
        break;
    case "spicyItalian":
        $("input[name=radio2][value=" + 2 + "]").prop('checked', true);
        $("#Cheese").prop('selectedIndex', 3);
        $("#Pepperoni").prop('selectedIndex', 3);
        $("#Sausage").prop('selectedIndex', 3);
        $("#Pineapple").prop('selectedIndex', 0);
        $("#Bacon").prop('selectedIndex', 0);
        $("#Blackolives").prop('selectedIndex', 0);
        $("#Mushrooms").prop('selectedIndex', 0);
        $("#Greenpeppers").prop('selectedIndex', 0);
        $("#Onions").prop('selectedIndex', 0);
        $("#Chicken").prop('selectedIndex', 0);
        break;
    case "worksPizza":
        $("input[name=radio2][value=" + 2 + "]").prop('checked', true);
        $("#Cheese").prop('selectedIndex', 3);
        $("#Pepperoni").prop('selectedIndex', 3);
        $("#Sausage").prop('selectedIndex', 3);
        $("#Pineapple").prop('selectedIndex', 3);
        $("#Bacon").prop('selectedIndex', 3);
        $("#Blackolives").prop('selectedIndex', 3);
        $("#Mushrooms").prop('selectedIndex', 3);
        $("#Greenpeppers").prop('selectedIndex', 3);
        $("#Onions").prop('selectedIndex', 3);
        $("#Chicken").prop('selectedIndex', 3);
        break;
    case "veggiePizza":
        $("input[name=radio2][value=" + 2 + "]").prop('checked', true);
        $("#Cheese").prop('selectedIndex', 3);
        $("#Pepperoni").prop('selectedIndex', 0);
        $("#Sausage").prop('selectedIndex', 0);
        $("#Pineapple").prop('selectedIndex', 3);
        $("#Bacon").prop('selectedIndex', 0);
        $("#Blackolives").prop('selectedIndex', 3);
        $("#Mushrooms").prop('selectedIndex', 3);
        $("#Greenpeppers").prop('selectedIndex', 3);
        $("#Onions").prop('selectedIndex', 3);
        $("#Chicken").prop('selectedIndex', 0);
        break;
    case "meatLoverPizza":
        $("input[name=radio2][value=" + 2 + "]").prop('checked', true);
        $("#Cheese").prop('selectedIndex', 3);
        $("#Pepperoni").prop('selectedIndex', 3);
        $("#Sausage").prop('selectedIndex', 3);
        $("#Pineapple").prop('selectedIndex', 0);
        $("#Bacon").prop('selectedIndex', 3);
        $("#Blackolives").prop('selectedIndex', 0);
        $("#Mushrooms").prop('selectedIndex', 0);
        $("#Greenpeppers").prop('selectedIndex', 0);
        $("#Onions").prop('selectedIndex', 0);
        $("#Chicken").prop('selectedIndex', 3);
        break;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addTheSauce();
    addTheToppings();
});


function next() {
    location.href = "http://www.whistlerwag.com/wp-content/uploads/2015/03/thank-you-clothesline-752x483.jpg";
}