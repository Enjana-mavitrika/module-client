using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ModuleClient.Models
{
    public class Adresse
    {
        public int Id { get; set; }
        [Display(Name = "Adresse 1")]
        public string Adresse_1 { get; set; }
        [Display(Name = "Adresse 2")]
        public string Adresse_2 { get; set; }
        [Display(Name = "Adresse 3")]
        public string Adresse_3 { get; set; }
        [Display(Name = "Code Postal")]
        public string CodePostal { get; set; }
        public string Ville { get; set; }
        public string Pays { get; set; }

    }
}