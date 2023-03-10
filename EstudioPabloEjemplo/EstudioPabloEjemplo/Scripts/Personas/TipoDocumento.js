$().ready(function () {
    //Evento inicial
    
});



function clicBoton() {
    Swal.fire(
        alert("El texto digitado fue:") + txtNombreDocumento.val());


    EnviarAlControlador(txtNombreDocumento.val());

}

function EnviarAlControlador()
{
    $.ajax(
        {
            type: 'POST',
            dataType: 'json',
            data:
            {
                nombre: ElNombre
            },
            url: '/TipoDocumento/IngresarTipoDocumento', //IngresarTipoDocumento se encuentra en el controlador
            success:
                function (jqXHR, textStatus, errorThrown) {

                    console.log(jqXHR);
                }


        });
}