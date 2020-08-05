$(document).ready(function(){
    $("[placeholder]").each(function(){
        var placeholderValue = $(this).attr("placeholder");
        $(this).focus(function(){
            $(this).attr("placeholder"," ");
        }).blur(function(){
            $(this).attr("placeholder",placeholderValue);
        })
    })
    
});