yana-windows
============

Interface vocale et visuelle windows pour le [serveur domotique Y.A.N.A](https://github.com/ldleman/yana-server)
Permet la reconnaissance vocale de commande (yana vous écoute), la synthèse vocale (yana peux répondre) et la simulation de
personnalité à l'aide d'une interface style k2000 

Pré-requis
============

- PC windows vista minimum
- Installation de [Yana-server](https://github.com/ldleman/yana-server) sur votre raspberry PI ou autre carte ordinateur ayant des GPIO

Installation
============

- [Téléchargez](https://github.com/ldleman/yana4all-binaires/archive/master.zip) et décompressez l'archive de yana4all
- Executez le fichier bin/launcher.exe
- Suivez le guide de configuration qui vous permettra de configurer l'adresse de votre serveur yana, la voix à utiliser, votre code d'acces etc...
```Nb :le 'token' de sécurité demandé est situé sur la page principale de votre yana-serveur (en haut à gauche, en dessous de votre nom/prenom)```
- Une fois la configuration faite, trois icones s'affiche pour lancer l'écoute, la synhèse vocale et l'interface graphique.

Utilisation est tests
============

- Sur yana-server vérifiez dans Configuration->Plugins que le plugin "Informations vocales" est bien activé, si ce n'est pas le cas, activez le et
relancer yana windows.
- Parlez au micro a voie clair et intelligible et lancez la commande "Yana, quelle heure est il ?"
- Si yana vous réponds, tout fonctionne, dans le cas contraire, signalez le dans [la section issue](https://github.com/ldleman/yana-windows/issues)
