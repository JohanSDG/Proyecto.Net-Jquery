

var modulo_Personas = (function () {

    var $btnNuevo, $txtNombre;

    var init = function init() {

        //Obtengo la referencia del control en la variable $btnNuevo
        $btnNuevo = $("#btnNuevo");

        //Referencia a la caja de texto llamado txtNombre
        $txtNombre = $("#txtNombre");

        $btnNuevo.click(clicBoton);

        //$btnGrabar = $("#btnGrabar"); //vinculo el control btnGrabar con la variable $btnGrabar
    };

    function clicBoton() {
        Swal.fire(
            "El texto digitado fue:" + $txtNombre.val(),
            
        );
        //alert("El texto digitado es:"+ $txtNombre.val());
    }


    return {
        init: init
    };


})();
