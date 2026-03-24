function getPreguntas() {
    $("#ejercicio").on("submit", function(event) {
        event.preventDefault();
        
        // Get pregunta1
        let p1 = [];
        $("input[type=radio][name=pregunta1]:checked").each(function() {
            p1.push($(this).attr("value"));
        });

        if (p1.length == 1 && p1[0] == 'Herramientas de acceso rápido') {
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

        if (p2.length == 1 && p2[0] == 'Barra de desplazamiento') {
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

        if (p3.length == 1 && p3[0] == 'Barra de estado') {
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

        if (p4.length == 1 && p4[0] == 'Botón de zoom' ) {
            $("#ans4").css("color", "green")
            $("#ans4").text("¡Correcto!").show();
            
        }
        else {
            $("#ans4").css("color", "red")
            $("#ans4").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta5
        let p5 = [];
        $("input[type=radio][name=pregunta5]:checked").each(function() {
            p5.push($(this).attr("value"));
        });

        if (p5.length == 1 && p5[0] == 'Ayuda') {
            $("#ans5").css("color", "green")
            $("#ans5").text("¡Correcto!").show();
            
        }
        else {
            $("#ans5").css("color", "red")
            $("#ans5").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta6
        let p6 = [];
        $("input[type=radio][name=pregunta6]:checked").each(function() {
            p6.push($(this).attr("value"));
        });

        if (p6.length == 1 && p6[0] == 'Menú inicio') {
            $("#ans6").css("color", "green")
            $("#ans6").text("¡Correcto!").show();
            
        }
        else {
            $("#ans6").css("color", "red")
            $("#ans6").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta7
        let p7 = [];
        $("input[type=radio][name=pregunta7]:checked").each(function() {
            p7.push($(this).attr("value"));
        });

        if (p7.length == 1 && p7[0] == 'Menú diseño página') {
            $("#ans7").css("color", "green")
            $("#ans7").text("¡Correcto!").show();
            
        }
        else {
            $("#ans7").css("color", "red")
            $("#ans7").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta8
        let p8 = [];
        $("input[type=radio][name=pregunta8]:checked").each(function() {
            p8.push($(this).attr("value"));
        });

        if (p8.length == 1 && p8[0] == 'Menú vistas') {
            $("#ans8").css("color", "green")
            $("#ans8").text("¡Correcto!").show();
            
        }
        else {
            $("#ans8").css("color", "red")
            $("#ans8").text("Incorrecto, intenta de nuevo.").show();
        }

        // Get pregunta9
        let p9 = [];
        $("input[type=radio][name=pregunta9]:checked").each(function() {
            p9.push($(this).attr("value"));
        });

        if (p9.length == 1 && p9[0] == 'Menú revisar') {
            $("#ans9").css("color", "green")
            $("#ans9").text("¡Correcto!").show();
            
        }
        else {
            $("#ans9").css("color", "red")
            $("#ans9").text("Incorrecto, intenta de nuevo.").show();
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
