/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */

class Client {
    Id: number;
    Categorie: string;
    Prefixe: string = "M.";
    Nom: string;
    Etat: string = "Actif";
    Code: string;
    Statut: string;
    Tel: string;
    Mobile_1: string;
    Mobile_2: string;
    Fax: string;
    Type: string;
    Email: string;
    Site: string;
    Numero: string;
    Interlocuteurs: Array<Interlocuteur>;
    AdresseDevis: Adresse;
    AdresseFacture: Adresse;
    Solde: number;
    Comment: string;

    constructor(o: Client) {
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

    isCategorieClient(): boolean {
        return this.Categorie === "Client";
    }

    isSoldeNegatif(): boolean {
        return this.Solde < 0;
    }

    isInactif(): boolean {
        return this.Etat === "Inactif";
    }

    isSelected(client:Client): boolean {
        return client.Id == this.Id;
    }
}

class Interlocuteur {
    Id: number;
    Nom: string;
    Prenom: string;
    Fonction: string;
    Service: string;
    Telephone: string;
}

class Adresse {
    Id: number;
    Adresse_1: string;
    Adresse_2: string;
    Adresse_3: string;
    CodePostal: string;
    Ville: string;
    Pays: string;
}

/** 
 * Service permettant d'échanger des données des clients avec le backend du module
 */
class ClientService {

    static listeClient: Array<Client> = [];
    static client: Client;
    static urlGetListClientAPI: string = "/api/Client";
    static urlDeleteClientAPI: string = "/api/Client";
    static urlGetClientAPI: string = "/api/Client";
    static urlPutClientAPI: string = "/api/Client";

    /**
     * Méthode qui récupère la liste des clients dans la base via l'API Client
     * @return Array<Client> 
     */
    static getListClient(): Promise<any> {
        return fetch(this.urlGetListClientAPI).then((response) => response.json());
    }

    /**
     * Méthode qui appelle API pour supprimer un Client sur le serveur
     * @param id : Id du client à supprimer
     */
    static deleteClient(id: number): Promise<any> {
        return fetch(`${this.urlDeleteClientAPI}/${id}`, { method: 'DELETE' }).then((response) => response.json());
    }
    
    /**
     * Retirer de la liste un client
     * @param id : Id du client à retirer
     */
    static retirerClient(id: number) {
        this.listeClient = this.listeClient.filter((client) => client.Id != id);
    }

    /**
     * Méthode qui récupère le client dans la base via l'API Client
     * @param id : Id du client à récuperer
     */
    static getClient(id: number): Promise<any> {
        return fetch(`${this.urlGetClientAPI}/${id}`).then((response) => response.json());
    }

    static putClient(): Promise<any> {
        return fetch(`${this.urlPutClientAPI}/${this.client.Id}`, {
            method: "PUT",
            body: JSON.stringify(this.client),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        });
    }
}