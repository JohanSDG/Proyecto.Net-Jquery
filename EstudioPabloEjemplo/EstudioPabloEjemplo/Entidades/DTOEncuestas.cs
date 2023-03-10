using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EstudioPabloEjemplo.Entidades
{
    //Estructura de intervcambio de informacio = DTO
    public class DTOEncuestas
    {
        public string NombreDepartamento { get; set; }
        public string NombreMunicipio { get; set; }
        public string Nombres { get; set; }
        public string NombreMedicamento { get; set; }

        public int IdDepartamento { get; set; }
        public int IdMunicipio { get; set; }
        public int IdPersona { get; set; }
        public int IdMedicamento { get; set; }

        public int Id { get; set; }
        

    }
}