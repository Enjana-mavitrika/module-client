using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModuleClient.Models
{
    public class Interlocuteur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Fonction { get; set; }
        public string Service { get; set; }
        public string Telephone { get; set; }


    }
}