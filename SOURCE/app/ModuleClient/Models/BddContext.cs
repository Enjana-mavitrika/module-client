using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ModuleClient.Models
{
    public class BddContext : DbContext
    {

        public BddContext(): base("BddContext")
        {
            // Database.SetInitializer(new MigrateDatabaseToLatestVersion<BddContext, ModuleClient.Migrations.Configuration>());
            /*IDatabaseInitializer<BddContext> init = new DropCreateDatabaseAlways<BddContext>();
            Database.SetInitializer(init);*/
        }


        public DbSet<Client> Clients { get; set; }
        public DbSet<Interlocuteur> Interlocuteurs { get; set; }
        public DbSet<Adresse> Adresses { get; set; }
    }
}