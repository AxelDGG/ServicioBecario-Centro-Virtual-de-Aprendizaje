function getPreguntas() {
    $("#ejercicio").on("submit", function(event) {
        event.preventDefault();
        
        // Get pregunta1
        let p1 = [];
        $("input[type=checkbox][name=pregunta1]:checked").each(function() {
            p1.push($(this).attr("value"));
        });

        if (p1.length == 2 && p1[0] == '1' && p1[1] == '3' || p1.length == 2 && p1[0] == '3' && p1[1] == '1') {
            if ($("#ans1 .feedback").length === 0) $("#ans1").append('<span class="feedback"></span>');
            $("#ans1 .feedback").css("color", "green");
            $("#ans1 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans1 .feedback").length === 0) $("#ans1").append('<span class="feedback"></span>');
            $("#ans1 .feedback").css("color", "red");
            $("#ans1 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta2
        let p2 = [];
        $("input[type=checkbox][name=pregunta2]:checked").each(function() {
            p2.push($(this).attr("value"));
        });

        if (p2.length == 2 && p2[0] == '2' && p2[1] == '6' || p2.length == 2 && p2[0] == '6' && p2[1] == '2') {
            if ($("#ans2 .feedback").length === 0) $("#ans2").append('<span class="feedback"></span>');
            $("#ans2 .feedback").css("color", "green");
            $("#ans2 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans2 .feedback").length === 0) $("#ans2").append('<span class="feedback"></span>');
            $("#ans2 .feedback").css("color", "red");
            $("#ans2 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta3
        let p3 = [];
        $("input[type=checkbox][name=pregunta3]:checked").each(function() {
            p3.push($(this).attr("value"));
        });

        if (p3.length == 2 && p3[0] == '4' && p3[1] == '5' || p3.length == 2 && p3[0] == '5' && p3[1] == '4') {
            if ($("#ans3 .feedback").length === 0) $("#ans3").append('<span class="feedback"></span>');
            $("#ans3 .feedback").css("color", "green");
            $("#ans3 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans3 .feedback").length === 0) $("#ans3").append('<span class="feedback"></span>');
            $("#ans3 .feedback").css("color", "red");
            $("#ans3 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }
    })
}

function init() {
    getPreguntas();
}

init();