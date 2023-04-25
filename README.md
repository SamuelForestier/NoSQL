# NoSQL

## Base de données

Lorsque vous récupérez l'API, vous devez vous assurer que vous avez les identifiants pour accéder à votre instance MongoDB Atlas. Ces identifiants devraient être placés dans un fichier de configuration, comme nodemon.js ou un fichier .env.

Une fois que vous avez les identifiants pour accéder à votre instance MongoDB Atlas, vous pouvez lancer l'API. Cela va lancer l'API et la connecter à votre instance MongoDB Atlas.

L'API va maintenant utiliser la base de données MongoDB Atlas pour stocker et récupérer les données, donc vous n'aurez pas besoin d'une base de données MongoDB locale pour utiliser l'API.

## Installation de l'API

Voici les étapes pour installer les dépendances et lancer l'API à l'aide de NPM :  
* Ouvrez un terminal dans le répertoire racine du projet que vous avez récupéré.
* Exécutez la commande ```npm install``` pour installer toutes les dépendances du projet. Cela peut prendre quelques minutes en fonction de la taille du projet et du nombre de dépendances. 
* Une fois l'installation terminée, exécutez la commande ```npm start``` pour lancer l'API. Cette commande démarre le script de démarrage spécifié dans le fichier package.json du projet.
* Si tout se passe bien, vous devriez voir des messages dans le terminal indiquant que l'API est en cours d'exécution et prête à être utilisée. 

## Réponses HTTP 

Dans le contexte d'une API RESTful, il est courant que chaque requête renvoie une réponse HTTP pour informer le client du résultat de l'opération.  

Ces réponses peuvent inclure des informations sur la ressource nouvellement créée ou sur la ressource qui vient d'être supprimée, afin que le client puisse facilement effectuer des opérations ultérieures sur ces ressources. Cela peut également inclure une recommandation pour effectuer une requête ultérieure pour obtenir des informations plus détaillées sur la ressource.  

Par exemple, lorsqu'un client effectue une requête POST pour créer une nouvelle ressource (par exemple, un nouveau produit), l'API peut inclure dans la réponse une recommandation pour effectuer une requête GET pour récupérer les détails de ce nouveau produit. Cette recommandation peut être présentée sous la forme d'un objet JSON, comme dans l'exemple que vous avez fourni :
```js
request: {
    type: 'GET',
    url: 'http://localhost:3000/products/' + document._id
}
```

De même, lorsqu'un client effectue une requête DELETE pour supprimer une ressource existante (par exemple, un produit), l'API peut inclure dans la réponse une recommandation pour créer une nouvelle ressource (par exemple, un nouveau produit). Cette recommandation peut inclure des informations sur la manière de créer la nouvelle ressource, telles que l'URL à utiliser ou les paramètres à fournir.  


## Routes disponibles 

```GET /products/```  
Cette route gère les demandes GET pour récupérer tous les produits enregistrés dans la base de données. Elle est gérée par la méthode ProductsController.get_all().

```POST /products/```  
Cette route gère les demandes POST pour créer un nouveau produit dans la base de données. Elle est gérée par la méthode ProductsController.create_product().

```GET /products/:productId```  
Cette route gère les demandes GET pour récupérer les détails d'un produit spécifique en fonction de son identifiant (productId). Elle est gérée par la méthode ProductsController.get_product().

```PUT /products/:productId```  
Cette route gère les demandes PUT pour remplacer les détails d'un produit spécifique en fonction de son identifiant (productId). Elle est gérée par la méthode ProductsController.update_product().

```DELETE /products/:productId```  
Cette route gère les demandes DELETE pour supprimer un produit spécifique en fonction de son identifiant (productId). Elle est gérée par la méthode ProductsController.delete_product().

```GET /orders/```  
Cette route gère les demandes GET pour récupérer toutes les commandes enregistrées dans la base de données. Elle est gérée par la méthode OrdersController.get_all().

```POST /orders/```  
Cette route gère les demandes POST pour créer une nouvelle commande dans la base de données. Elle est gérée par la méthode OrdersController.create_order().

```GET /orders/:orderId```  
Cette route gère les demandes GET pour récupérer les détails d'une commande spécifique en fonction de son identifiant (orderId). Elle est gérée par la méthode OrdersController.get_order().

```DELETE /orders/:orderId```  
Cette route gère les demandes DELETE pour supprimer une commande spécifique en fonction de son identifiant (orderId). Elle est gérée par la méthode OrdersController.delete_order().
