using ModuleClient.Models;
using ModuleClient.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ModuleClient.Controllers
{
    public class HomeController : Controller
    {

        private BddContext db = new BddContext();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [HttpGet]
        public ActionResult AjouterClient()
        {
            ViewBag.Title = "Ajout Client";
            Client client = new Client();
            client.AdresseDevis = new Adresse();
            client.AdresseFacture = new Adresse();
            return View(client);
        }

        [HttpPost]
        public ActionResult AjouterClient(Client client)
        {
            ViewBag.Title = "Ajout Client";
            if (ModelState.IsValid)
            {
                TempData["AjoutClientSuccess"] = "Nouveau client ajouté avec succés";

                // ajout client à la base de donnée
                db.Clients.Add(client);
                db.SaveChanges();

                return RedirectToAction("Index");
            }
            return View(client);
        }
    }
}
