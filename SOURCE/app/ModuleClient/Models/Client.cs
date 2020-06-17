using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ModuleClient.Models
{
    public class Client
    {
        public Client()
        {
            Interlocuteurs = new List<Interlocuteur>();
        }
        public int Id { get; set; }
        public string Prefixe { get; set; }
        [Required]
        [Display(Name = "Nom*")]
        public string Nom { get; set; }
        public int Solde { get; set; }
        public string Categorie { get; set; }
        public string Etat { get; set; }
        [Required]
        [Display(Name = "Code*")]
        public string Code { get; set; }
        public string Statut { get; set; }
        [Phone]
        [Display(Name = "Tél")]
        public string Tel { get; set; }
        [Phone]
        [Display(Name = "Mobile 1")]
        public string Mobile_1 { get; set; }
        [Phone]
        [Display(Name = "Mobile 2")]
        public string Mobile_2 { get; set; }
        [Phone]
        public string Fax { get; set; }
        public string Type { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Url]
        [Display(Name = "Site Web")]
        public string Site { get; set; }
        [Phone]
        [Display(Name = "Numéro")]
        public string Numero { get; set; }
        public string Comment { get; set; }
        public virtual ICollection<Interlocuteur> Interlocuteurs { get; set; }
        public virtual Adresse AdresseDevis { get; set; }
        public virtual Adresse AdresseFacture { get; set; }
    }
}