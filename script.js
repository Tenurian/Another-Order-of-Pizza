/*jslint browser: true*/
/*global $, jQuery, alert*/

var console = window.console,
    request = new XMLHttpRequest();

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

request.open("GET", "jsonfile.json", false);
request.send(null);
var my_JSON_object = JSON.parse(request.responseText);
console.log(my_JSON_object);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addTheSauce() {
    console.log($('[name=radio2]:checked').val());
//    alert($("input[name=q12_3]:checked").val());
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
        console.log(value.value);
        if (value.value !== "none") {
            count++;
            console.log(value.name);
            for (i = 0; i < my_JSON_object.toppings.length; i++) {
                if (capitalizeFirstLetter(my_JSON_object.toppings[i].name) === value.name) {
                    cost = my_JSON_object.toppings[i].price;
                    total += parseFloat(cost);
                    images.concat(my_JSON_object.toppings[i].image);

                    if (/[a-z]*3/.test(value.value.toString())) {
                        console.log("value was full");
                        ctx.drawImage(document.getElementById(value.name + "Image"), 10, 10, canvas.width - 20, canvas.height - 20);
                    } else if (/[a-z]*1/.test(value.value.toString())) {
                        //left
                        console.log(value.value);
                        ctx.drawImage(document.getElementById(value.name + "HalfImage"), 10, 10, canvas.width - 20, canvas.height - 20);
                    } else {
                        ctx.save();
                        ctx.translate(canvas.width, canvas.height); // change origin
                        ctx.rotate(Math.PI);
                        //                            ctx.drawImage(link, x, y, 20, 20); // draws a chain link or dagger
                        //                            ctx.restore();
                        //                        context.clearRect(0, 0, canvas.width, canvas.height);
                        //
                        //                        // save the unrotated context of the canvas so we can restore it later
                        //                        // the alternative is to untranslate & unrotate after drawing
                        //                        context.save();
                        //
                        //                        // move to the center of the canvas
                        //                        context.translate(canvas.width / 2, canvas.height / 2);
                        //
                        //                        // rotate the canvas to the specified degrees
                        //                        context.rotate(degrees * Math.PI / 180);
                        //
                        //                        // draw the image
                        //                        // since the context is rotated, the image will be rotated also
                        //                        context.drawImage(image, -image.width / 2, -image.width / 2);
                        //
                        //                        // we’re done with the rotating so restore the unrotated context
                        //                        context.restore();


                        ctx.drawImage(document.getElementById(value.name + "HalfImage"), 10, 10, canvas.width - 20, canvas.height - 20);
                        ctx.restore()
                    }

                    i = my_JSON_object.toppings.length + 1;
                }
            }
            content += "<li>" + value.name + "<span>$" + cost + "</span></li>";


            /* FIRST TOPPING IS FREE */
            total -= 1;

            if (count >= 5) {
                total -= 1;
                $("#specialDeal").removeClass("hidden");
            } else {
                $("#specialDeal").addClass("hidden");
            }

            content += "</ul>";

            list.innerHTML = content;

            listTotal.innerHTML = "<p>Total: $" + total + "</p>"
            total += parseFloat(cost);
        }
    });

    content += "</ul>";

    list.innerHTML = content;
}

(function (data) {
    //    $("#innerList").addClass("hidden");
    console.log("JSON: ");
    console.log(data);
    var i, content = "",
        imgs = "",
        topName;
    for (i = 0; i < data.toppings.length; i++) {
        topName = capitalizeFirstLetter(data.toppings[i].name);
        content = "<label for '" + topName + "'>" + topName + ":</label>";
        content += "<select name='" + topName + "' id='" + topName + "' class='topping'>";
        content += "<option value='none'>none</option>";
        content += "<option value='" + data.toppings[i].name + "1'>left</option>";
        content += "<option value='" + data.toppings[i].name + "2'>right</option>";
        content += "<option value='" + data.toppings[i].name + "3'>full</option>";
        content += "</select><br>";

        imgs = "<img id='" + topName + "Image' src='" + data.toppings[i].image + "' />";
        imgs += "<img id='" + topName + "HalfImage' src='" + data.toppings[i].imageHalf + "' />";

        if (i % 2 === 0) {
            //            console.log("topping goes on the left");
            $("#pt1").append(content);
        } else {
            //            console.log("topping goes on the right");
            $("#pt2").append(content);
        }

        $("#images").append(imgs);
    }

    $("#images").hide();
}(my_JSON_object));

$(".topping").change(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addTheSauce();
    addTheToppings();
    console.log("topping was changed");
});


//
//function img_create(src, answer, id) {
//    if (answer === 'keep') {
//        var elem = document.createElement("img");
//        elem.src = src;
//        elem.setAttribute("height", "410");
//        elem.setAttribute("width", "375");
//        elem.setAttribute('class', 'images');
//        elem.setAttribute('id', id)
//        document.getElementById("kindaCanvas").appendChild(elem);
//    }
//
//}

function next() {
    location.href = "www.yoursite.com";
}

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