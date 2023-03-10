using EstudioPabloEjemplo.Entidades;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EstudioPabloEjemplo.Controllers
{
    public class ProyectoFinalController : Controller
    {
        // GET: ProyectoFinal
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult IngresarInfoModalProyectoFinal(int id, string DatoDepartamento, string DatoMunicipio, string Usuario, string DatoMedicamento)
        {
            string mensaje = "", codigo = "";
            try
            {

                if (id == 0)
                {
                    InsertarDatosModalProyectoFinal(DatoDepartamento, DatoMunicipio, Usuario, DatoMedicamento);
                    codigo = "1";
                    mensaje = "Informacion creada correctamente";
                }
                else
                {
                    ActualizarDatos(id, DatoDepartamento, DatoMunicipio, Usuario, DatoMedicamento);
                    codigo = "1";
                    mensaje = "Informacion actualizada correctamente";
                }
            }
            catch (Exception err)
            {
                codigo = "-1";
                mensaje = "Comuniquise con el administrador del sistema.<br>Error: ";
                if (err.Message.ToString().IndexOf("\n") >= 0)
                    mensaje = mensaje + err.Message.ToString().Replace("\"", " ").Substring(0, err.Message.ToString().IndexOf("\n"));
                else
                    mensaje = "Comuníquese con el administrador del Sistema.<br>Error: " + err.Message.ToString().Replace("'", "");
                return Json(new { codigo = codigo, resultado = mensaje }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { codigo = codigo, resultado = mensaje });

        }

        private bool InsertarDatosModalProyectoFinal(string DatoDepartamento, string DatoMunicipio, string Usuario, string DatoMedicamento)
        {
            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;

            String query = "INSERT INTO dbo.EncuestasProyectoFinal(IdDepartamento,IdMunicipio,IdPersona,IdMedicamento) VALUES (@IdDepartamento, @IdMunicipio, @IdPersona, @IdMedicamento)";

            using (SqlConnection connection = new SqlConnection(CadenaConexion))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.Add("@IdDepartamento", SqlDbType.VarChar).Value = DatoDepartamento;
                command.Parameters.Add("@IdMunicipio", SqlDbType.Int).Value = DatoMunicipio;
                command.Parameters.Add("@IdPersona", SqlDbType.Int).Value = Usuario;
                command.Parameters.Add("@IdMedicamento", SqlDbType.Int).Value = DatoMedicamento;


                connection.Open();
                command.ExecuteNonQuery();
            }




            return true;
        }


        [HttpPost]
        public JsonResult ConsultarDepartamentos()
        {
            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            DataTable dataTable = new DataTable();
            string query = "select * from Departamentos";
            //La tabla de la base de datos adonde quiero referenciar.

            SqlConnection conn = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();

            // create data adapter
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            // this will query your database and return the result to your datatable
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();

            List<Departamentos> datos = Utilitario.ConvertTo<Departamentos>(dataTable);
            return Json(datos);
        }

        [HttpPost]
        public JsonResult ConsultarMunicipio()
        {

            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            DataTable dataTable = new DataTable();
            string query = "select * from Municipios";
            //La tabla de la base de datos adonde quiero referenciar.

            SqlConnection conn = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();

            // create data adapter
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            // this will query your database and return the result to your datatable
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();

            List<Municipios> datos = Utilitario.ConvertTo<Municipios>(dataTable);
            return Json(datos);
        }

        [HttpPost]

        public JsonResult ConsultarPersonas()
        {

            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            DataTable dataTable = new DataTable();
            string query = "select * from Personas";
            //La tabla de la base de datos adonde quiero referenciar.

            SqlConnection conn = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();

            // create data adapter
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            // this will query your database and return the result to your datatable
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();

            List<Personas> datos = Utilitario.ConvertTo<Personas>(dataTable);
            return Json(datos);
        }

        [HttpPost]
        public JsonResult ConsultarMedicamentos()
        {

            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            DataTable dataTable = new DataTable();
            string query = "select * from Medicamentos";
            //La tabla de la base de datos adonde quiero referenciar.

            SqlConnection conn = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();

            // create data adapter
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            // this will query your database and return the result to your datatable
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();

            List<Medicamentos> datos = Utilitario.ConvertTo<Medicamentos>(dataTable);
            return Json(datos);
        }


        [HttpPost]
        public JsonResult ConsultarEncuestas()
        {
            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
            DataTable dataTable = new DataTable();
            string query = "select D.NombreDepartamento, m.NombreMunicipio, p.Nombres, ME.NombreMedicamento " +
                            " , E.IdDepartamento, E.IdMunicipio, E.IdPersona, E.IdMedicamento, E.Id" +
                            " from EncuestasProyectoFinal E " +
                            " inner join Departamentos D on d.id = e.IdDepartamento " +
                            " inner join Municipios M on m.id = e.IdMunicipio " +
                            " inner join Personas P on p.id = e.IdPersona " +
                            " inner join Medicamentos ME on me.id = e.IdMedicamento ORDER BY E.Id";

            //La tabla de la base de datos adonde quiero referenciar.

            SqlConnection conn = new SqlConnection(CadenaConexion);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();

            // create data adapter
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            // this will query your database and return the result to your datatable
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();

            List<DTOEncuestas> informacion = Utilitario.ConvertTo<DTOEncuestas>(dataTable);
            return Json(informacion);
        }

        private bool ActualizarDatos(int id, string DatoDepartamento, string DatoMunicipio, string Usuario, string DatoMedicamento)
        {
            string CadenaConexion = System.Configuration.ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;

            String query = "UPDATE dbo.EncuestasProyectoFinal SET IdDepartamento =  @IdDepartamento, IdMunicipio = @IdMunicipio, IdPersona = @IdPersona, IdMedicamento = @IdMedicamento  WHERE Id = @id";

            using (SqlConnection connection = new SqlConnection(CadenaConexion))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.Add("@IdDepartamento", SqlDbType.Int).Value = DatoDepartamento;
                command.Parameters.Add("@IdMunicipio", SqlDbType.Int).Value = DatoMunicipio;
                command.Parameters.Add("@IdPersona", SqlDbType.Int).Value = Usuario;
                command.Parameters.Add("@IdMedicamento", SqlDbType.Int).Value = DatoMedicamento;
                command.Parameters.Add("@Id", SqlDbType.Int).Value = id;


                connection.Open();
                command.ExecuteNonQuery();
            }




            return true;
        }

    }

}