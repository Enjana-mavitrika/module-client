using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModuleClient.Models
{
    public class Adresse
    {
        public int Id { get; set; }
        public string Adresse_1 { get; set; }
        public string Adresse_2 { get; set; }
        public string Adresse_3 { get; set; }
        public string CodePostal { get; set; }
        public string Ville { get; set; }
        public string Pays { get; set; }

    }
}