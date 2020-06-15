using ModuleClient.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ModuleClient.ViewModels
{
    public class ClientViewModel
    {
        public Client NewClient { get; set; }

        public bool EstClient { get; set; } = true;

        public string Prefixe { get; set; }

        public List<SelectListItem> Prefixes { get; } = new List<SelectListItem>
        {
            new SelectListItem { Value = "M.", Text = "M." },
            new SelectListItem { Value = "Mme", Text = "Mme" },
            new SelectListItem { Value = "Mlle", Text = "Mlle" },
            new SelectListItem { Value = "M. et Mme", Text = "M. et Mme" },
            new SelectListItem { Value = "SA", Text = "SA" },
        };

        public List<SelectListItem> Etats { get; } = new List<SelectListItem>
        {
            new SelectListItem { Value = "Actif", Text = "Actif" },
            new SelectListItem { Value = "Inactif", Text = "Inactif" },
        }; 
        
        public List<SelectListItem> Statuts { get; } = new List<SelectListItem>
        {
            new SelectListItem { Value = "Particulier", Text = "Particulier" },
            new SelectListItem { Value = "Société", Text = "Société" },
        };

        public List<SelectListItem> Types { get; } = new List<SelectListItem>
        {
            new SelectListItem { Value = "Administration", Text = "Administration" },
            new SelectListItem { Value = "Architecte", Text = "Architecte" },
            new SelectListItem { Value = "Commerçant", Text = "Commerçant" },
            new SelectListItem { Value = "Conseil", Text = "Conseil" },
            new SelectListItem { Value = "Education nationale", Text = "Education nationale" },
            new SelectListItem { Value = "Hôtelier", Text = "Hôtelier" },
            new SelectListItem { Value = "Industriel", Text = "Industriel" },
            new SelectListItem { Value = "Mairie", Text = "Mairie" },
            new SelectListItem { Value = "Particulier", Text = "Particulier" },
            new SelectListItem { Value = "Promoteur", Text = "Promoteur" },
            new SelectListItem { Value = "Régie d'immeuble", Text = "Régie d'immeuble" },
            new SelectListItem { Value = "Restaurant", Text = "Restaurant" },
            new SelectListItem { Value = "Société", Text = "Société" },
        };

        public List<SelectListItem> Pays { get; } = new List<SelectListItem>
        {
            new SelectListItem { Value = "France", Text = "France" },
            new SelectListItem { Value = "Espagne", Text = "Espagne" },
            new SelectListItem { Value = "Italie", Text = "Italie" },
            new SelectListItem { Value = "Portugal", Text = "Portugal" },
            new SelectListItem { Value = "Royaume-Unis", Text = "Royaume-Unis" },
            new SelectListItem { Value = "Suisse", Text = "Suisse" },
        };
    }
}