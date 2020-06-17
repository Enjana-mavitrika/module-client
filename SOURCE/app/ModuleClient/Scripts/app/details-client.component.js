/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */
;
/** Classe permettant de gérer l'affichage  */
var DetailsClientComponent = /** @class */ (function () {
    function DetailsClientComponent() {
    }
    /** detecte et gère le mode d'affichage  */
    DetailsClientComponent.prototype.onLoadDetailsClient = function () {
        var _this = this;
        var mode = document.getElementById("section-details-client").getAttribute("data-mode");
        var idClient = parseInt(document.getElementById("section-details-client").getAttribute("data-idClient"));
        ClientService.getClient(idClient)
            .then(function (data) {
            var clientData = data;
            ClientService.client = new Client(clientData);
            _this.renderDetails(mode);
        });
    };
    DetailsClientComponent.prototype.onAfficheInfos = function () {
        this.renderDetails("Affichage");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-infos").classList.add("active");
    };
    DetailsClientComponent.prototype.onAfficheListeInterlocuteur = function () {
        this.renderDetails("Affichage-interlocuteurs");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-interlocuteurs").classList.add("active");
    };
    DetailsClientComponent.prototype.onAfficheCommentaire = function () {
        this.renderDetails("Affichage-commentaire");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-commentaire").classList.add("active");
        this.configJodit();
        // desactiver l'édition de l'éditeur de texte
        this.editor.setReadOnly(true);
        // ajouter les actions sur les bouttons
        document.getElementById("btn-modifier-commentaire").addEventListener("click", function () {
            detailsClientComponent.onModificationCommentaire();
        });
        document.getElementById("btn-valider-commentaire").addEventListener("click", function () {
            detailsClientComponent.onValiderModificationCommentaire();
        });
        // cacher le bouton valider
        document.getElementById("btn-valider-commentaire").style.display = "none";
        // afficher le bouton modifier
        document.getElementById("btn-modifier-commentaire").style.display = "inline";
    };
    DetailsClientComponent.prototype.onModificationCommentaire = function () {
        // activer l'édition de l'éditeur de texte
        this.editor.setReadOnly(false);
        // focus sur l'editeur
        document.querySelector("div[class=jodit_wysiwyg]").id = "content-editor";
        document.getElementById("content-editor").focus();
        // cacher le bouton modifier
        document.getElementById("btn-modifier-commentaire").style.display = "none";
        // afficher le bouton valider
        document.getElementById("btn-valider-commentaire").style.display = "inline";
    };
    DetailsClientComponent.prototype.onValiderModificationCommentaire = function () {
        var _this = this;
        // recuperer le commentaire 
        var comment = this.editor.getEditorValue(true);
        ClientService.client.Comment = comment;
        this.renderDetails("EnCours");
        // mettre à jour le client
        ClientService.putClient()
            .then(function () {
            _this.onAfficheCommentaire();
        })
            .catch(function () {
            // gérer en cas d'erreur de mise à jour
            _this.renderDetails("Failure");
        });
    };
    DetailsClientComponent.prototype.configJodit = function () {
        this.editor = new Jodit("#area_editor", {
            spellcheck: true,
            uploader: {
                "insertImageAsBase64URI": true
            },
            height: 500,
            language: "fr",
            buttons: "bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,paragraph,|,image,table,link,|,align,undo,redo,selectall,cut,copy,paste,copyformat,|,hr,symbol,fullsize"
        });
        // ajouter le commentaire sur le client dans l'editeur
        var comment = (ClientService.client.Comment !== null) ? ClientService.client.Comment : "";
        this.editor.setEditorValue(comment);
        this.editor.setReadOnly(true);
    };
    DetailsClientComponent.prototype.desactiverToutBoutons = function () {
        document.getElementById("btn-afficher-infos").classList.remove("active");
        document.getElementById("btn-afficher-interlocuteurs").classList.remove("active");
        document.getElementById("btn-afficher-commentaire").classList.remove("active");
    };
    /**
     * gère l'affichage dynamique des détails du client
     * @param mode : Mode d'affichage Modification ou Affichage ou Affichage-interlocuteurs ou Affichage-commentaire ou EnCours ou Failure
     */
    DetailsClientComponent.prototype.renderDetails = function (mode) {
        var template = document.getElementById("template-informations-general").innerHTML;
        var rendered = Mustache.render(template, {
            client: ClientService.listeClient,
            estModeModification: mode === "Modification",
            estModeAffichage: mode === "Affichage",
            estModeAffichageListeInterlocuteur: mode === "Affichage-interlocuteurs",
            estModeAffichageCommentaire: mode === "Affichage-commentaire",
            estEnCours: mode == "EnCours",
            erreur: mode == "Failure"
        });
        document.getElementById("informations-general").innerHTML = rendered;
    };
    return DetailsClientComponent;
}());
var detailsClientComponent = new DetailsClientComponent();
// affiché les informations générale après le chargement de la page
detailsClientComponent.onLoadDetailsClient();
document.getElementById("btn-afficher-interlocuteurs").addEventListener("click", function () {
    detailsClientComponent.onAfficheListeInterlocuteur();
});
document.getElementById("btn-afficher-commentaire").addEventListener("click", function () {
    detailsClientComponent.onAfficheCommentaire();
});
document.getElementById("btn-afficher-infos").addEventListener("click", function () {
    detailsClientComponent.onAfficheInfos();
});
//# sourceMappingURL=details-client.component.js.map