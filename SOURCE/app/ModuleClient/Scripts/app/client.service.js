/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */
var Client = /** @class */ (function () {
    function Client(o) {
        this.Prefixe = "M.";
        this.Etat = "Actif";
        this.Id = o.Id;
        this.Categorie = o.Categorie;
        this.Prefixe = o.Prefixe;
        this.Nom = o.Nom;
        this.Etat = o.Etat;
        this.Code = o.Code;
        this.Statut = o.Statut;
        this.Tel = o.Tel;
        this.Mobile_1 = o.Mobile_1;
        this.Mobile_2 = o.Mobile_2;
        this.Fax = o.Fax;
        this.Type = o.Type;
        this.Email = o.Email;
        this.Site = o.Site;
        this.Numero = o.Numero;
        this.Interlocuteurs = o.Interlocuteurs;
        this.AdresseDevis = o.AdresseDevis;
        this.AdresseFacture = o.AdresseFacture;
        this.Solde = o.Solde;
        this.Comment = o.Comment;
    }
    Client.prototype.isCategorieClient = function () {
        return this.Categorie === "Client";
    };
    Client.prototype.isSoldeNegatif = function () {
        return this.Solde < 0;
    };
    Client.prototype.isInactif = function () {
        return this.Etat === "Inactif";
    };
    Client.prototype.isSelected = function (client) {
        return client.Id == this.Id;
    };
    return Client;
}());
var Interlocuteur = /** @class */ (function () {
    function Interlocuteur() {
    }
    return Interlocuteur;
}());
var Adresse = /** @class */ (function () {
    function Adresse() {
    }
    return Adresse;
}());
/**
 * Service permettant d'échanger des données des clients avec le backend du module
 */
var ClientService = /** @class */ (function () {
    function ClientService() {
    }
    /**
     * Méthode qui récupère la liste des clients dans la base via l'API Client
     * @return Array<Client>
     */
    ClientService.getListClient = function () {
        return fetch(this.urlGetListClientAPI).then(function (response) { return response.json(); });
    };
    /**
     * Méthode qui appelle API pour supprimer un Client sur le serveur
     * @param id : Id du client à supprimer
     */
    ClientService.deleteClient = function (id) {
        return fetch(this.urlDeleteClientAPI + "/" + id, { method: 'DELETE' }).then(function (response) { return response.json(); });
    };
    /**
     * Retirer de la liste un client
     * @param id : Id du client à retirer
     */
    ClientService.retirerClient = function (id) {
        this.listeClient = this.listeClient.filter(function (client) { return client.Id != id; });
    };
    ClientService.listeClient = [];
    ClientService.urlGetListClientAPI = "/api/Client";
    ClientService.urlDeleteClientAPI = "/api/Client";
    return ClientService;
}());
//# sourceMappingURL=client.service.js.map