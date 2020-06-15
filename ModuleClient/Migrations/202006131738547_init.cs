namespace ModuleClient.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Prefixe = c.String(),
                        Nom = c.String(nullable: false),
                        Solde = c.Int(nullable: false),
                        Categorie = c.String(),
                        Etat = c.String(),
                        Code = c.String(nullable: false),
                        Statut = c.String(),
                        Tel = c.String(),
                        Mobile_1 = c.String(),
                        Mobile_2 = c.String(),
                        Fax = c.String(),
                        Type = c.String(),
                        Email = c.String(),
                        Site = c.String(),
                        Numero = c.String(),
                        Comment = c.String(),
                        AdresseDevis_Id = c.Int(),
                        AdresseFacture_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Adresses", t => t.AdresseDevis_Id)
                .ForeignKey("dbo.Adresses", t => t.AdresseFacture_Id)
                .Index(t => t.AdresseDevis_Id)
                .Index(t => t.AdresseFacture_Id);
            
            CreateTable(
                "dbo.Adresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Adresse_1 = c.String(),
                        Adresse_2 = c.String(),
                        Adresse_3 = c.String(),
                        CodePostal = c.String(),
                        Ville = c.String(),
                        Pays = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Interlocuteurs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nom = c.String(),
                        Prenom = c.String(),
                        Fonction = c.String(),
                        Service = c.String(),
                        Telephone = c.String(),
                        Client_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clients", t => t.Client_Id)
                .Index(t => t.Client_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Interlocuteurs", "Client_Id", "dbo.Clients");
            DropForeignKey("dbo.Clients", "AdresseFacture_Id", "dbo.Adresses");
            DropForeignKey("dbo.Clients", "AdresseDevis_Id", "dbo.Adresses");
            DropIndex("dbo.Interlocuteurs", new[] { "Client_Id" });
            DropIndex("dbo.Clients", new[] { "AdresseFacture_Id" });
            DropIndex("dbo.Clients", new[] { "AdresseDevis_Id" });
            DropTable("dbo.Interlocuteurs");
            DropTable("dbo.Adresses");
            DropTable("dbo.Clients");
        }
    }
}
