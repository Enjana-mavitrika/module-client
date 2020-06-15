function renderHello() {
  var template = document.getElementById('template').innerHTML;
  var listeNom = ["solofo", "toto", "titi", "tata"];
  var rendered = Mustache.render(template, { name: listeNom[0] });
  document.getElementById('target').innerHTML = rendered;
}

function renderListeNom(id) {
    var listeNomTemplate = document.getElementById('liste-nom').innerHTML;
    var listeNom = ["solofo", "toto", "titi", "tata"];
    var renderedListeNom = Mustache.render(listeNomTemplate, { listeNom: listeNom[id] });
    document.getElementById('target-liste-nom').innerHTML = renderedListeNom;
}