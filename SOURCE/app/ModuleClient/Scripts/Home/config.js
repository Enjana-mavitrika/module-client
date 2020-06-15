
function configurerDataTables() {
    $('#liste-client').DataTable({
        language: {
            processing: "Traitement en cours...",
            search: '<i class="fas fa-search text-success" style="font-size: 20px;"></i>',
            lengthMenu: "_MENU_",
            info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            infoPostFix: "",
            loadingRecords: "Chargement en cours...",
            zeroRecords: '<p class="text-danger text-center">Aucun client ne correspond &agrave; votre recherche</p>',
            emptyTable: "Aucun client disponible",
            paginate: {
                first: "Premier",
                previous: "Pr&eacute;c&eacute;dent",
                next: "Suivant",
                last: "Dernier"
            },
            aria: {
                sortAscending: ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        }
    });
    // ajouter le placeholder : "Votre recherche" à l'input de recherche
    document.querySelector("input[type='search']").setAttribute("placeholder", "Votre recherche...");
}

// configurer MicroModal
function initMicromodal() {
    MicroModal.init({
        openTrigger: 'data-custom-open', // [3]
        closeTrigger: 'data-custom-close', // [4]
        openClass: 'is-open', // [5]
        disableScroll: true, // [6]
        disableFocus: false, // [7]
        awaitOpenAnimation: true, // [8]
        awaitCloseAnimation: true, // [9]
        debugMode: false // [10]
    });
}
function closeModal(id) {
    MicroModal.close(id);
}


// Configurer Split
Split(['#section-list-client', '#section-details-client'], {
    sizes: [70, 30],
    gutterAlign: 'end',
    gutterSize: 12,
    elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
    }),
    gutterStyle: (dimension, gutterSize) => ({
        'flex-basis': `${gutterSize}px`,
    }),
})