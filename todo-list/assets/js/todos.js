// check off items by clicking
// need to use 'on' here so that new li elements will also have click listeners
    // if only use 'click' event on all li elements, the new ones will not have click listeners
$("ul").on("click", "li", function() {
    // // when compare colors need to be careful to use RGB version
    // if ($(this).css("color") === "rgb(128, 128, 128)") {
    //     // but its ok to set colors using names
    //     $(this).css({color: "black",
    //         textDecoration: "none"
    //     });
    // } else {
    //     $(this).css({color: "gray",
    //         textDecoration: "line-through"
    //     });
    // }

    // much better way is to add 'completed' css class, and just toggle it on and off
        // black text with no strikethrough is default anyways!
    $(this).toggleClass("completed");
}); 

// removes completed todos when click on delete symbol
$("span").click(function(e) {
    // want to remove the entire list element that contains the span, so get parent
        // add fadeout, and in fadeout callback, remove the element (when fadeout is finished)
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    })
    // stop event bubbling through ancestor elements
    e.stopPropagation;
});

// when user enters new todo, have it be dynamically updated to the list
$("input[type='text']").keypress(function(event) {
    // enter key has code 13
    if (event.which === 13) {
        var todoText = $(this).val();
        // empty the text box
        $(this).val("");
        $("ul").append(`<li><span><i class="fas fa-trash-alt"></i></span> ${todoText}</li>`);
    }
});

$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
})