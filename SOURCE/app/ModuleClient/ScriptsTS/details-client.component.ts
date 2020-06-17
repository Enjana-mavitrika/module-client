/**
 * @author S.RABONARIJAONA
 * @version 1.0.0
 */ 

// declaration classe Jodit de la librairie jodit-3.3.24
declare class Jodit {
    constructor(id: string, config: any)
    setEditorValue(value: string): void
    getEditorValue(removeSelectionMarkers: boolean): string
    setReadOnly(value: boolean): void
};

/** Classe permettant de gérer l'affichage  */
class DetailsClientComponent {

    editor: Jodit;

    /** detecte et gère le mode d'affichage  */
    public onLoadDetailsClient() : void {
        const mode = document.getElementById("section-details-client").getAttribute("data-mode");
        const idClient = parseInt(document.getElementById("section-details-client").getAttribute("data-idClient"));
        ClientService.getClient(idClient)
            .then((data) => {
                const clientData = data as Client;
                ClientService.client = new Client(clientData);
                this.renderDetails(mode);
            })
    }

    public onAfficheInfos(): void {
        this.renderDetails("Affichage");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-infos").classList.add("active");

    }

    public onAfficheListeInterlocuteur(): void {
        this.renderDetails("Affichage-interlocuteurs");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-interlocuteurs").classList.add("active");
    }

    public onAfficheCommentaire(): void {
        this.renderDetails("Affichage-commentaire");
        this.desactiverToutBoutons();
        document.getElementById("btn-afficher-commentaire").classList.add("active");
        this.configJodit();
        // desactiver l'édition de l'éditeur de texte
        this.editor.setReadOnly(true);
        // ajouter les actions sur les bouttons
        document.getElementById("btn-modifier-commentaire").addEventListener("click", () => {
            detailsClientComponent.onModificationCommentaire();
        });

        document.getElementById("btn-valider-commentaire").addEventListener("click", () => {
            detailsClientComponent.onValiderModificationCommentaire();
        });
        // cacher le bouton valider
        document.getElementById("btn-valider-commentaire").style.display = "none";
        // afficher le bouton modifier
        document.getElementById("btn-modifier-commentaire").style.display = "inline";
    }

    public onModificationCommentaire(): void {
        // activer l'édition de l'éditeur de texte
        this.editor.setReadOnly(false);
        // focus sur l'editeur
        document.querySelector("div[class=jodit_wysiwyg]").id = "content-editor";
        document.getElementById("content-editor").focus();
        // cacher le bouton modifier
        document.getElementById("btn-modifier-commentaire").style.display = "none";
        // afficher le bouton valider
        document.getElementById("btn-valider-commentaire").style.display = "inline";
    }

    public onValiderModificationCommentaire(): void {
        // recuperer le commentaire 
        const comment = this.editor.getEditorValue(true);
        ClientService.client.Comment = comment;
        this.renderDetails("EnCours");
        // mettre à jour le client
        ClientService.putClient()
            .then(() => {
                this.onAfficheCommentaire();
            })
            .catch(() => {
                // gérer en cas d'erreur de mise à jour
                this.renderDetails("Failure");
            });
       
    }

    private configJodit(): void {
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
        const comment = (ClientService.client.Comment !== null) ? ClientService.client.Comment : "";
        this.editor.setEditorValue(comment);
        this.editor.setReadOnly(true);

    }

    private desactiverToutBoutons(): void {
        document.getElementById("btn-afficher-infos").classList.remove("active");
        document.getElementById("btn-afficher-interlocuteurs").classList.remove("active");
        document.getElementById("btn-afficher-commentaire").classList.remove("active");
    }

    /**
     * gère l'affichage dynamique des détails du client
     * @param mode : Mode d'affichage Modification ou Affichage ou Affichage-interlocuteurs ou Affichage-commentaire ou EnCours ou Failure
     */
    private renderDetails(mode: string) : void {
        const template = document.getElementById("template-informations-general").innerHTML;
        const rendered = Mustache.render(template, {
            client: ClientService.listeClient,
            estModeModification: mode === "Modification",
            estModeAffichage: mode === "Affichage",
            estModeAffichageListeInterlocuteur: mode === "Affichage-interlocuteurs",
            estModeAffichageCommentaire: mode === "Affichage-commentaire",
            estEnCours: mode == "EnCours",
            erreur: mode == "Failure"
        });
        document.getElementById("informations-general").innerHTML = rendered;
    }
} 


const detailsClientComponent = new DetailsClientComponent();

// affiché les informations générale après le chargement de la page
detailsClientComponent.onLoadDetailsClient();

document.getElementById("btn-afficher-interlocuteurs").addEventListener("click", () => {
    detailsClientComponent.onAfficheListeInterlocuteur();
});

document.getElementById("btn-afficher-commentaire").addEventListener("click", () => {
    detailsClientComponent.onAfficheCommentaire();
});

document.getElementById("btn-afficher-infos").addEventListener("click", () => {
    detailsClientComponent.onAfficheInfos();
});