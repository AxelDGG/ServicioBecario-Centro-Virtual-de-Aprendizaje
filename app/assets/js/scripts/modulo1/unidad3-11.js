function getPreguntas() {
    $("#ejercicio").on("submit", function(event) {
        event.preventDefault();
        
        // Get pregunta1
        let p1 = [];
        $("input[type=checkbox][name=pregunta1]:checked").each(function() {
            p1.push($(this).attr("value"));
        });

        if (p1.length == 2 && p1[0] == 'Reunir datos del usuario' && p1[1] == 'Investigar las soluciones primero' || p1.length == 2 && p1[0] == 'Investigar las soluciones primero' && p1[1] == 'Reunir datos del usuario') {
            $("#ans1").css("color", "green")
            $("#ans1").text("¡Correcto!").show();
            
        }
        else {
            $("#ans1").css("color", "red")
            $("#ans1").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta2
        let p2 = [];
        $("input[type=checkbox][name=pregunta2]:checked").each(function() {
            p2.push($(this).attr("value"));
        });

        if (p2.length == 2 && p2[0] == 'Probar las resoluciones rápidas de primero' && p2[1] == 'Reunir soluciones con otros usuarios' || p2.length == 2 && p2[0] == 'Reunir soluciones con otros usuarios' && p2[1] == 'Probar las resoluciones rápidas de primero') {
            $("#ans2").css("color", "green")
            $("#ans2").text("¡Correcto!").show();
            
        }
        else {
            $("#ans2").css("color", "red")
            $("#ans2").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta3
        let p3 = [];
        $("input[type=checkbox][name=pregunta3]:checked").each(function() {
            p3.push($(this).attr("value"));
        });

        if (p3.length == 2 && p3[0] == 'Verificar las cuestiones obvias' && p3[1] == 'Reunir datos de la computadora' || p3.length == 2 && p3[0] == 'Reunir datos de la computadora' && p3[1] == 'Verificar las cuestiones obvias') {
            $("#ans3").css("color", "green")
            $("#ans3").text("¡Correcto!").show();
            
        }
        else {
            $("#ans3").css("color", "red")
            $("#ans3").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta4
        let p4 = [];
        $("input[type=checkbox][name=pregunta4]:checked").each(function() {
            p4.push($(this).attr("value"));
        });

        if (p4.length == 2 && p4[0] == 'Reunir información de fuentes externas' && p4[1] == 'Evaluar el problema e implementar la solución' || p4.length == 2 && p4[0] == 'Evaluar el problema e implementar la solución' && p4[1] == 'Reunir información de fuentes externas') {
            $("#ans4").css("color", "green")
            $("#ans4").text("¡Correcto!").show();
            
        }
        else {
            $("#ans4").css("color", "red")
            $("#ans4").text("Incorrecto, intenta de nuevo.").show();
        }
    })
}

function watchForm() {
    for (let i = 1; i <= 4; i++) {
        $(`input[type=checkbox][name=pregunta${i}]`).on("change", function(event){
            $(`#ans${i}`).hide();
        });
    }
}

function init() {
    getPreguntas();
    watchForm();
}

init();