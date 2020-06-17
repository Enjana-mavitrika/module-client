using ModuleClient.Models;
using ModuleClient.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
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

        [HttpGet]
        public ActionResult DetailsClient(int? id, string mode = "Affichage")
        {
            ViewBag.Mode = mode;

            if (id != null)
            {
                Client client = db.Clients.Find(id);
                if (client != null)
                {
                    return View(client);
                }
            }

            return HttpNotFound("Nous n'avons pas trouvé le client que vous avez demandez");
        }

        [HttpPost]
        public ActionResult DetailsClient(Client client)
        {
            Client updatedClient = db.Clients.Find(client.Id);
            ViewBag.Mode = "Affichage";
            if (updatedClient == null)
            {
                return HttpNotFound("Vous essayé de modifier un client qui n'existes pas");
            }
            if (ModelState.IsValid)
            {
                updatedClient.Categorie = client.Categorie;
                updatedClient.Prefixe = client.Prefixe;
                updatedClient.Nom = client.Nom;
                updatedClient.Mobile_1 = client.Mobile_1;
                updatedClient.Mobile_2 = client.Mobile_2;
                updatedClient.Site = client.Site;
                updatedClient.Statut = client.Statut;
                updatedClient.Tel = client.Tel;
                updatedClient.Type = client.Type;
                // updatedClient.Solde = client.Solde; ne pas modifier la solde
                updatedClient.Email = client.Email;
                // updatedClient.Comment = client.Comment; ne pas modifier le commentaire
                updatedClient.Code = client.Code;
                updatedClient.Etat = client.Etat;
                updatedClient.Fax = client.Fax;
                updatedClient.Numero = client.Numero;
                updatedClient.Interlocuteurs = client.Interlocuteurs;
                updatedClient.AdresseFacture = client.AdresseFacture;
                updatedClient.AdresseDevis = client.AdresseDevis;
                db.Clients.AddOrUpdate(updatedClient);
                db.SaveChanges();
            } else
            {
                ViewBag.Mode = "Modification";
            }
            return View(updatedClient);

        }
    }
}
