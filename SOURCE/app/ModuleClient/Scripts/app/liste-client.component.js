/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */
/** Composant qui gère l'affichage de la liste des clients sur la page d'index */
var ListeClientComponent = /** @class */ (function () {
    function ListeClientComponent() {
        this.timeout = 2000;
    }
    /**
     * récupère la liste des clients au chargement des données
     */
    ListeClientComponent.prototype.onLoadListeClient = function () {
        var _this = this;
        // load data
        ClientService.getListClient()
            .then(function (data) {
            var listeClientData = data;
            // ok
            // convert liste client Data to list client Object
            ClientService.listeClient = listeClientData.map(function (c) { return new Client(c); });
            _this.renderListeClient(true);
        })
            .catch(function () {
            // ko
            _this.renderListeClient(false);
        });
    };
    ListeClientComponent.prototype.renderNotifAjoutClient = function () {
        var notif = document.getElementById("notif-ajout");
        if (notif) {
            // efface le message de notif après un timeout 
            setTimeout(function () {
                notif.style.display = "none";
            }, this.timeout);
        }
    };
    ListeClientComponent.prototype.renderListeClient = function (success) {
        var template = document.getElementById("template-clients").innerHTML;
        var rendered = Mustache.render(template, { success: success, clients: ClientService.listeClient });
        document.getElementById("clients").innerHTML = rendered;
        configurerDataTables();
    };
    /**
     * Affichage de l'apercu lors de la selection d'un client
     * @param eltId: Attribut id de l'élément séléctionné
     */
    ListeClientComponent.prototype.onSelectClient = function (eltId) {
        // parser l'id du client séléctionné
        var id = parseInt(eltId.split("-")[1]);
        if (this.selectedClient) {
            this.deselectionnerClient(this.selectedClient.Id);
        }
        this.selectionnerClient(id);
        this.renderApercuClient();
        this.renderDeleteClientModal();
    };
    /**
     * Supprime le client et affiche la notification après la confirmation
     * */
    ListeClientComponent.prototype.onConfirmDeleteClient = function () {
        var _this = this;
        closeModal("modal-1");
        this.renderNotification(false, false, true); // notif en cours
        ClientService.deleteClient(this.selectedClient.Id)
            .then(function () {
            console.log("SUCCES !!");
            ClientService.retirerClient(_this.selectedClient.Id);
            _this.deselectCurrentClient();
            _this.renderNotification(true, false, false); // notif success
            _this.renderListeClient(true);
            _this.renderApercuClient();
            setTimeout(function () {
                _this.renderNotification(false, false, false);
            }, _this.timeout);
        })
            .catch(function () {
            console.log("ERREUR !!");
            //this.deselectionnerClient(this.selectedClient.Id);
            _this.renderNotification(false, true, false); // notif failure
            _this.renderListeClient(true);
            _this.renderApercuClient();
            setTimeout(function () {
                _this.renderNotification(false, false, false);
            }, _this.timeout);
        });
    };
    ListeClientComponent.prototype.renderNotification = function (success, fail, enCours) {
        var template = document.getElementById("template-notif-suppression").innerHTML;
        var rendered = Mustache.render(template, { success: success, fail: fail, enCours: enCours });
        document.getElementById("notif-suppression").innerHTML = rendered;
    };
    ListeClientComponent.prototype.deselectionnerClient = function (id) {
        this.selectedClient = null;
        // retirer couleur de fond à l'élément contenant le client
        var clientElt = document.getElementById("client-" + id);
        if (clientElt) {
            clientElt.classList.remove("bg-info");
        }
    };
    /** deselectionne le client selectionné */
    ListeClientComponent.prototype.deselectCurrentClient = function () {
        if (this.selectedClient) {
            this.deselectionnerClient(this.selectedClient.Id);
            this.renderApercuClient();
        }
    };
    ListeClientComponent.prototype.selectionnerClient = function (id) {
        // recuperer le premier client identifié par id
        this.selectedClient = ClientService.listeClient.filter(function (client) { return client.Id === id; })[0];
        // ajouter couleur de fond à l'élément contenant le client
        var clientElt = document.getElementById("client-" + id);
        if (clientElt) {
            clientElt.classList.add("bg-info");
        }
    };
    ListeClientComponent.prototype.renderApercuClient = function () {
        var template = document.getElementById("template-apercu-client").innerHTML;
        var rendered = Mustache.render(template, { client: this.selectedClient });
        document.getElementById("apercu-client").innerHTML = rendered;
    };
    ListeClientComponent.prototype.renderDeleteClientModal = function () {
        var template = document.getElementById("template-delete-client-modal").innerHTML;
        var rendered = Mustache.render(template, { client: this.selectedClient });
        document.getElementById("delete-client-modal").innerHTML = rendered;
        initMicromodal();
    };
    return ListeClientComponent;
}());
var listeClientComponent = new ListeClientComponent();
// après le chargement de la page
listeClientComponent.onLoadListeClient();
listeClientComponent.renderNotifAjoutClient();
// deselectionne le client séléctionné lorsque l'user click en dehors du tableaux dans la section list-client
document.getElementById("section-list-client").addEventListener("click", function () {
    listeClientComponent.deselectCurrentClient();
}, true);
//# sourceMappingURL=liste-client.component.js.map