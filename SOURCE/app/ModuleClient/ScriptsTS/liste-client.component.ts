/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */

// déclaration librairie externe Mustache-v.4.0.1
declare class Mustache {
    static render(template: string, object: any): string;
}

// déclaration configuration de DataTables fichier Home/config.js
declare function configurerDataTables();

// déclaration configuration de MicroModal fichier Home/config.js
declare function initMicromodal();
declare function closeModal(id: string);

/** Composant qui gère l'affichage de la liste des clients sur la page d'index */
class ListeClientComponent {

    timeout: number = 2000;
    selectedClient: Client;

    /**
     * récupère la liste des clients au chargement des données
     */
    public onLoadListeClient(): void {
        // load data
        ClientService.getListClient()
            .then((data) => {
                const listeClientData = data as Array<Client>;
                // ok
                // convert liste client Data to list client Object
                ClientService.listeClient = listeClientData.map((c) => new Client(c));
                this.renderListeClient(true);
            })
            .catch(() => {
                // ko
                this.renderListeClient(false);
            });
        
    }

    public renderNotifAjoutClient(): void {
        const notif = document.getElementById("notif-ajout");
        if (notif) {
            // efface le message de notif après un timeout 
            setTimeout(() => {
                notif.style.display = "none";
            }, this.timeout)
        }
    }

    private renderListeClient(success: boolean): void {
        const template = document.getElementById("template-clients").innerHTML;
        const rendered = Mustache.render(template, { success,  clients: ClientService.listeClient });
        document.getElementById("clients").innerHTML = rendered;
        configurerDataTables();
    }

    /**
     * Affichage de l'apercu lors de la selection d'un client
     * @param eltId: Attribut id de l'élément séléctionné
     */
    public onSelectClient(eltId: string): void {
        // parser l'id du client séléctionné
        const id = parseInt(eltId.split("-")[1]);
        if (this.selectedClient) {
            this.deselectionnerClient(this.selectedClient.Id);
        }
        this.selectionnerClient(id);
        this.renderApercuClient();
        this.renderDeleteClientModal();
    }

    /**
     * Supprime le client et affiche la notification après la confirmation
     * */
    public onConfirmDeleteClient(): void {
        closeModal("modal-1");
        this.renderNotification(false, false, true); // notif en cours
        ClientService.deleteClient(this.selectedClient.Id)
            .then(() => {
                console.log("SUCCES !!");
                ClientService.retirerClient(this.selectedClient.Id);
                this.deselectCurrentClient();
                this.renderNotification(true, false, false); // notif success
                this.renderListeClient(true);
                this.renderApercuClient();
                setTimeout(() => {
                    this.renderNotification(false, false, false);
                }, this.timeout);
            })
            .catch(() => {
                console.log("ERREUR !!");
                //this.deselectionnerClient(this.selectedClient.Id);
                this.renderNotification(false, true, false); // notif failure
                this.renderListeClient(true);
                this.renderApercuClient();
                setTimeout(() => {
                    this.renderNotification(false, false, false);
                }, this.timeout);
            });
    }

    private renderNotification(success: boolean, fail: boolean, enCours: boolean) {
        const template = document.getElementById("template-notif-suppression").innerHTML;
        const rendered = Mustache.render(template, { success, fail, enCours });
        document.getElementById("notif-suppression").innerHTML = rendered;
    }

    private deselectionnerClient(id: number): void {
        this.selectedClient = null;
        // retirer couleur de fond à l'élément contenant le client
        const clientElt = document.getElementById("client-" + id);
        if (clientElt) {
            clientElt.classList.remove("bg-info");
        }
    }

    /** deselectionne le client selectionné */
    public deselectCurrentClient() {
        if (this.selectedClient) {
            this.deselectionnerClient(this.selectedClient.Id);
            this.renderApercuClient();
        }
    }

    private selectionnerClient(id: number): void {
        // recuperer le premier client identifié par id
        this.selectedClient = ClientService.listeClient.filter((client) => client.Id === id)[0];

        // ajouter couleur de fond à l'élément contenant le client
        const clientElt = document.getElementById("client-" + id);
        if (clientElt) {
            clientElt.classList.add("bg-info");
        }
    }

    private renderApercuClient() {
        const template = document.getElementById("template-apercu-client").innerHTML;
        const rendered = Mustache.render(template, { client: this.selectedClient });
        document.getElementById("apercu-client").innerHTML = rendered;
    }

    private renderDeleteClientModal() {
        const template = document.getElementById("template-delete-client-modal").innerHTML;
        const rendered = Mustache.render(template, { client: this.selectedClient });
        document.getElementById("delete-client-modal").innerHTML = rendered;
        initMicromodal();
    }
}


const listeClientComponent = new ListeClientComponent();

// après le chargement de la page
listeClientComponent.onLoadListeClient();
listeClientComponent.renderNotifAjoutClient();

// deselectionne le client séléctionné lorsque l'user click en dehors du tableaux dans la section list-client
document.getElementById("section-list-client").addEventListener("click", () => {
    listeClientComponent.deselectCurrentClient();
}, true);
