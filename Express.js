const fs = require('fs');
const path = require('path');

// Charger les données existantes du fichier JSON
function chargerDonnees(nomFichier) {
  const cheminFichier = path.join(__dirname, nomFichier);
  if (fs.existsSync(cheminFichier)) {
    const data = fs.readFileSync(cheminFichier, 'utf8');
    return JSON.parse(data);
  } else {
    return { users: [], messages: [] };
  }
}

// Enregistrer les données dans le fichier JSON
function enregistrerDonnees(donnees, nomFichier) {
  const cheminFichier = path.join(__dirname, nomFichier);
  const jsonData = JSON.stringify(donnees, null, 2);
  fs.writeFileSync(cheminFichier, jsonData, 'utf8');
}

// Définir une fonction pour ajouter un nouvel utilisateur
function ajouterUtilisateur(email, nom, prenom) {
  const nouvelUtilisateur = {
    id: donnees.users.length + 1,
    email: email,
    nom: nom,
    prenom: prenom,
    photo_profil: "default.jpg",
    messages: [],
    notifications: []
  };
  donnees.users.push(nouvelUtilisateur);
}

// Définir une fonction pour ajouter un nouveau message et générer une notification
function ajouterMessage(senderId, receiverId, content) {
  const nouveauMessage = {
    senderId: senderId,
    receiverId: receiverId,
    content: content
  };
  donnees.messages.push(nouveauMessage);

  // Générer une notification pour le destinataire du message
  const destinataire = donnees.users.find(user => user.id === receiverId);
  const notification = {
    type: "message",
    content: `Vous avez reçu un nouveau message de ${nouveauMessage.senderId}`,
    messageId: donnees.messages.length - 1
  };
  destinataire.notifications.push(notification);
}

// Définir une fonction pour afficher les notifications
function afficherNotifications(utilisateurId) {
  const utilisateur = donnees.users.find(user => user.id === utilisateurId);
  const notifications = utilisateur.notifications;
  if (notifications.length > 0) {
    console.log("Notifications:");
    notifications.forEach(notification => {
      console.log(notification.content);
    });
  } else {
    console.log("Pas de nouvelles notifications");
  }
}

// Initialisation des données
const nomFichier = 'donnees.json';
const donnees = chargerDonnees(nomFichier);

// Ajouter un nouvel utilisateur
ajouterUtilisateur("nouvel_utilisateur@example.com", "NouveauNom", "NouveauPrenom");

// Ajouter un nouveau message
ajouterMessage(1, 2, "Bonjour Jane, comment vas-tu ?");

// Afficher les notifications pour l'utilisateur avec l'ID 2
afficherNotifications(2);

// Enregistrer les modifications dans le fichier
enregistrerDonnees(donnees, nomFichier);
