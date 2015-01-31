'use strict';


requirejs.config({
    paths: {}
});


require([/* Dependencies */], function () {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});


$(".nav a").on("click", function(){

   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});