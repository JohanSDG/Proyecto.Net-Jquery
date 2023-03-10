using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EstudioPabloEjemplo.Controllers
{
    public class TipoDocumentoController : Controller
    {
        // GET: TipoDocumento
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost] 
        public JsonResult IngresarTipoDocumento(string nombre)
            //Ingresar persona tiene Var Nombre tipo string, el controlador lo recibe y le concatena el texto.
            // y lo devuelve a traves de un json por JS
        {
            string mensaje = "", codigo = "";
            try
            {
                mensaje = "El nombre es:" + nombre;
            }
            catch (Exception err)
            {
                mensaje = "Comuniquese con el administrador del sistema";
                if (err.Message.ToString().IndexOf("\n") >= 0)
                    mensaje = mensaje + err.Message.ToString().Replace("\"", " ").Substring(0, err.Message.ToString().IndexOf("\n"));

                else
                    mensaje = "Comuniquese con el administrador del sistema.<br>Error:" + err.Message.ToString().Replace("'", "'");
                return Json(new { codigo = codigo, resultado = mensaje }, JsonRequestBehavior.AllowGet);

            }
            return Json(new { codigo = codigo, resultado = mensaje });
    }   }
}