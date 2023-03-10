using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EstudioPabloEjemplo.Controllers
{
    public class PersonasController : Controller
    {
        // GET: Personas
        public ActionResult Index()  //Esta es la accion en este caso la palabra Index
        {
            return View();
        }


    }
}