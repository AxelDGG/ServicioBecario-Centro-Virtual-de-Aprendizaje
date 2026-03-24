function getPreguntas() {
    $("#ejercicio").on("submit", function(event) {
        event.preventDefault();
        
        // Get pregunta1
        let p1 = [];
        $("input[type=radio][name=pregunta1]:checked").each(function() {
            p1.push($(this).attr("value"));
        });

        if (p1.length == 1 && p1[0] == 'Guardar Documento') {
            $("#ans1").css("color", "green")
            $("#ans1").text("¡Correcto!").show();
            
        }
        else {
            $("#ans1").css("color", "red")
            $("#ans1").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta2
        let p2 = [];
        $("input[type=radio][name=pregunta2]:checked").each(function() {
            p2.push($(this).attr("value"));
        });

        if (p2.length == 2 && p2[0] == 'Cerrar Documento' && p2[1] == 'Guardar Documento') {
            $("#ans2").css("color", "green")
            $("#ans2").text("¡Correcto!").show();
            
        }
        else {
            $("#ans2").css("color", "red")
            $("#ans2").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta3
        let p3 = [];
        $("input[type=radio][name=pregunta3]:checked").each(function() {
            p3.push($(this).attr("value"));
        });

        if (p3.length == 1 && p3[0] == 'Abrir Documento') {
            $("#ans3").css("color", "green")
            $("#ans3").text("¡Correcto!").show();
            
        }
        else {
            $("#ans3").css("color", "red")
            $("#ans3").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta4
        let p4 = [];
        $("input[type=radio][name=pregunta4]:checked").each(function() {
            p4.push($(this).attr("value"));
        });

        if (p4.length == 1 && p4[0] == 'Nuevo' ) {
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
        $(`input[type=radio][name=pregunta${i}]`).on("change", function(event){
            $(`#ans${i}`).hide();
        });
    }
}

function init() {
    getPreguntas();
    watchForm();
}

init();
