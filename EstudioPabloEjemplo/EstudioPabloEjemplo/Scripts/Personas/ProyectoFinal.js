//evento inicial del JS
$(document).ready(function () {
    
    //evento de inicializacion
    modulo_Encuestas.init();   //aqui estoy llamandola funcion init del modulo
});


//Aqui estoy definiendo el modulo
var modulo_Encuestas = (function () {  //inicio del modulo

    var IdActualizarInformacion = 0;
    var $ddlDepartamentos, $ddlMunicipio, $ddlPersona, $ddlMedicamentos,  $btnGuardar, tablaDatos;
    //inicio del programa en JavaScript
    var init = function init() {

        $btnNuevo = $("#btnNuevo");
        $btnGuardar = $("#btnGuardar");
        $ddlDepartamentos = $("#ddlDepartamentos");
        $ddlMunicipio = $("#ddlMunicipio");
        $ddlPersona = $("#ddlPersona");
        $ddlMedicamentos = $("#ddlMedicamentos");

        
        CargarListaDepartamentos();
        CargarListaPersonas();
        CargarListaMedicamentos();
        CargarListaMunicipio();

        $btnNuevo.click(eventoBotonNuevo);//asigna un evento clic sobre el boton. en este caso ejecuta la funcion eventoBotonNuevo
        $btnGuardar.click(GuardarInformacion);

        LlenarDatosTabla();
    
    }

    //**************************************************


    //funcion que muestra un mensaje en pantalla
    function eventoBotonNuevo()
    {       
        IdActualizarInformacion = 0;  //indico que es un nuevo registro
        //abre el modal llamado myModal
        $('#myModal').modal("show");
    }

    function GuardarInformacion() {
        
        //FUNCION QUE ENVIA LOS DATOS AL CONTROLADOR Persona AL METODO IngresarPersona
        EnviarAControlador($ddlDepartamentos.val(), $ddlMunicipio.val(), $ddlPersona.val(), $ddlMedicamentos.val());

    };

    function EnviarAControlador(Departamento, Municipio, Persona, Medicamento) {


        //int id, string DatoDepartamento, string DatoMunicipio, string Usuario, string DatoMedicamento

        
        $.ajax(
            {
                type: 'POST',
                dataType: 'json',
                data:
                {
                    id: IdActualizarInformacion,
                    DatoDepartamento: Departamento,
                    DatoMunicipio: Municipio,
                    Usuario: Persona,
                    DatoMedicamento: Medicamento
                    
                },
                url: '/ProyectoFinal/IngresarInfoModalProyectoFinal',
                success:
                    function (jqXHR, textStatus, errorThrown) {
                        if (jqXHR.codigo == "1") {
                            $('#myModal').modal("hide"); //cierra el modal

                            //imprime en la consola, la respuesta del controlador
                            console.log(jqXHR);
                            tablaDatos.ajax.reload(); //actualiza la tabla
                            alert("Se grabo la informacion");
                        } else {
                            alert("ERROR:" + jqXHR.resultado);
                        }
                    }

            });
    }


    //Esta funcion debe retornar los datos a visualizar en la tabla (significa que aqui solo hay una consulta SELECT * from tabla)


    function CargarListaDepartamentos() {
        var URL = '/ProyectoFinal/ConsultarDepartamentos';
                 //Controlador// Metodo o funcion!
        $.ajax(
            {
                type: 'post',
                data: null,  //paramtros
                dataType: 'json',
                url: URL,
                success: function (data) {
                    
                    $.each(data, function (index, optionData) {
                        $("#ddlDepartamentos").append("<option value='" + optionData.Id + "'>" + optionData.NombreDepartamento + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("ERROR EN CARGAR PRESENTACION " + error);
                    //
                    
                    alert(error.responseText);
                }
            });
    }

    function CargarListaMunicipio() {
        var URL = '/ProyectoFinal/ConsultarMunicipio';
        //Controlador// Metodo o funcion!
        $.ajax(
            {
                type: 'post',
                data: null,  //paramtros
                dataType: 'json',
                url: URL,
                success: function (data) {
                    
                    $.each(data, function (index, optionData) {
                        $("#ddlMunicipio").append("<option value='" + optionData.Id + "'>" + optionData.NombreMunicipio + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("ERROR EN CARGAR PRESENTACION " + error);
                    //
                    
                    alert(error.responseText);
                }
            });
    }

    function CargarListaPersonas() {
        var URL = '/ProyectoFinal/ConsultarPersonas';
                   //Controlador// Metodo o funcion!
        $.ajax(
            {
                type: 'post',
                data: null,  //paramtros
                dataType: 'json',
                url: URL,
                success: function (data) {
                    
                    $.each(data, function (index, optionData) {
                        $("#ddlPersona").append("<option value='" + optionData.Id + "'>" + optionData.Nombres + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("ERROR EN CARGAR PRESENTACION " + error);
                    //
                    
                    alert(error.responseText);
                }
            });
    }

    function CargarListaMedicamentos() {
        var URL = '/ProyectoFinal/ConsultarMedicamentos';
        //Controlador// Metodo o funcion!
        $.ajax(
            {
                type: 'post',
                data: null,  //paramtros
                dataType: 'json',
                url: URL,
                success: function (data) {
                    
                    $.each(data, function (index, optionData) {
                        $("#ddlMedicamentos").append("<option value='" + optionData.Id + "'>" + optionData.NombreMedicamento + "</option>");
                    });
                },
                error: function (error) {
                    //
                    console.log("ERROR EN CARGAR PRESENTACION " + error);
                    //
                    
                    alert(error.responseText);
                }
            });
    }

    //inicializa el control DataTable
    function LlenarDatosTabla()
    {
        debugger;
        var URL = "/ProyectoFinal/ConsultarEncuestas"

        tablaDatos = $('#tblvisualDeDatos').DataTable({

            deferRender: true,
            // scrollX: true,
            // scrollY: 200,
            scrollCollapse: true,
            scroller: true,
            searching: false,
            paging: true,
            info: false,
            pageLength: 20,
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": true,
                },
            ],

            'responsive': true,
            'buttons': [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],

            'ajax': {
                'type': "POST",
                'datatype': "Json",
                'data': function (d) {

                },
                'url': URL,
                "dataSrc": function (d) {
                    debugger;
                    return d;
                }
            },

            "columns": [
                //{
                //    //"className": 'dt-control',
                //    "orderable": false,
                //    "data": null,
                //    "defaultContent": ''
                //},

                {
                    title: ".",
                    "data": null,
                    "defaultContent": "",
                    "className": "dt-center",
                    "orderable": false,
                    "render": function (data, type, row) {
                        return '\
                        <span>\
                            \
                            <div>\
                            \
                                <input type="checkbox" class="btn btn-primary float-center btn-xs chkSel">\
                                 \
                                \
                            </div>\
                        </span> ';
                    }
                },
                { title: "ID", "data": "Id" },
                { title: "Nombre Departamento", "data": "NombreDepartamento", 'visible': true },
                { title: "Nombre Municipio", "data": "NombreMunicipio", 'visible': true },
                { title: "Nombre Persona", "data": "Nombres", 'visible': true },
                { title: "Medicamento", "data": "NombreMedicamento", 'visible': true },

                { title: "IdDepartamento", "data": "IdDepartamento", 'visible': false },
                { title: "IdMunicipio", "data": "IdMunicipio", 'visible': false },
                { title: "IdPersona", "data": "IdPersona", 'visible': false },
                { title: "IdMedicamento", "data": "IdMedicamento", 'visible': false },                

                {
                    title: "Accion",
                    "data": null,
                    "defaultContent": "",
                    "className": "dt-center",
                    "orderable": false,
                    "render": function (data, type, row) {
                        return '\
                        <span>\
                            \
                            <div>\
                                <button type = "button" class= "dropdown-btn btn btn-success float-center editarRegistro"  href="#"><i class="la la - save"></i>Editar</a>\
                                \
                                \
                            </div>\
                        </span> ';
                    }

                },

                //  <input type="checkbox" id="cbox1" value="first_checkbox">

            ],

            columnDefs: [
                {
                    render: function (data, type, full, meta) {
                        return "<div class='text-wrap width-200'>" + data + "</div>";
                    },
                    targets: 2
                }
            ],

            "oLanguage": {
                "sSearch": "Búsqueda rápida:",
                "sLengthMenu": "Listar MENU  registros",
                "sInfo": "Listando START a END de TOTAL Registros",
                "sEmptyTable": "No se encontraron datos con el criterio de consulta suministrado",
                "sInfoEmpty": "Sin registros para mostrar",
                "sInfoFiltered": " (filtrando de MAX registros)",
                "sProcessing": "Realizando la consulta",
                "sZeroRecords": "No hay registros coincidentes con el filtro suministrado"
            },
            //"order": [[1, 'asc']]
        });

        // Add event listener for opening and closing details
        $('#tblBusquedaSolicitud tbody').on('click', 'td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = tablaCriterios.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });

        tablaDatos.on('click', '.editarRegistro', EditarRegistro);

    }

    function EditarRegistro(e) {
        debugger;
        e.preventDefault();
        var datos = tablaDatos.row($(this).parents('tr')).data();

        $('#myModal').modal("show");

        $ddlDepartamentos.val(datos.IdDepartamento);
        //$ddlMunicipio.val(),
        $ddlPersona.val(datos.IdPersona);
        $ddlMedicamentos.val(datos.IdMedicamento);

        IdActualizarInformacion = datos.Id; //establezco que estoy editando

       // alert(datos.NombreDepartamento);
    }


    //exponer las funciones hacia el exterior del modulo
    return {
        init: init
    };
})();  //fin de modulo modulo_Medicamentos
