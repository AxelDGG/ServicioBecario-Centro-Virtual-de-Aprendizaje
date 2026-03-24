function getPreguntas() {
    $("#ejercicio").on("submit", function(event) {
        event.preventDefault();
        
        // Get pregunta1
        let p1 = [];
        $("input[type=radio][name=pregunta1]:checked").each(function() {
            p1.push($(this).attr("value"));
        });

        if (p1.length == 1 && p1[0] == '5') {
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
        $("input[type=radio][name=pregunta2]:checked").each(function() {
            p2.push($(this).attr("value"));
        });

        if (p2.length == 1 && p2[0] == '4') {
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
        $("input[type=radio][name=pregunta3]:checked").each(function() {
            p3.push($(this).attr("value"));
        });

        if (p3.length == 1 && p3[0] == '2') {
            if ($("#ans3 .feedback").length === 0) $("#ans3").append('<span class="feedback"></span>');
            $("#ans3 .feedback").css("color", "green");
            $("#ans3 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans3 .feedback").length === 0) $("#ans3").append('<span class="feedback"></span>');
            $("#ans3 .feedback").css("color", "red");
            $("#ans3 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta4
        let p4 = [];
        $("input[type=radio][name=pregunta4]:checked").each(function() {
            p4.push($(this).attr("value"));
        });

        if (p4.length == 1 && p4[0] == '3') {
            if ($("#ans4 .feedback").length === 0) $("#ans4").append('<span class="feedback"></span>');
            $("#ans4 .feedback").css("color", "green");
            $("#ans4 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans4 .feedback").length === 0) $("#ans4").append('<span class="feedback"></span>');
            $("#ans4 .feedback").css("color", "red");
            $("#ans4 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta5
        let p5 = [];
        $("input[type=radio][name=pregunta5]:checked").each(function() {
            p5.push($(this).attr("value"));
        });

        if (p5.length == 1 && p5[0] == '1') {
            if ($("#ans5 .feedback").length === 0) $("#ans5").append('<span class="feedback"></span>');
            $("#ans5 .feedback").css("color", "green");
            $("#ans5 .feedback").text("¡Correcto!").show();
            
        }
        else {
            if ($("#ans5 .feedback").length === 0) $("#ans5").append('<span class="feedback"></span>');
            $("#ans5 .feedback").css("color", "red");
            $("#ans5 .feedback").text("Incorrecto, intenta de nuevo.").show();
        }
    })
}

function init() {
    getPreguntas();
}

init();