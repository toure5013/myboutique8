//GET USER INFORMATION FROM MESSENGER
conversation.shared_memory.first_name = input.user_data.first_name //messenger_user.first_name; //
conversation.shared_memory.last_name = messenger_user.last_name;
var welcome_image = "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1623250346742.png";
conversation.shared_memory.welcome_image = welcome_image;
conversation.shared_memory.goto_query_reply = { "text": `[goto:simplemenuutiliserpourgoto]` }
var username = "";
if (conversation.shared_memory.first_name != "anonymous") {
    username = conversation.shared_memory.first_name;
}
//USER PHONE NUMBER AND SVA CODE
conversation.shared_memory.phoneNumber = "";
conversation.shared_memory.smsCode = "";
conversation.shared_memory.response = {};
conversation.shared_memory.previousQuery = input.text;
conversation.shared_memory.response.defaultplateform = "api"; //we will use this to send or no the is_typing
conversation.shared_memory.response.plateform_logique = true;

if (input.platform != "messenger") {
    conversation.shared_memory.first_name = "";
}

if (1) {
    conversation.shared_memory.response.typingbulb = {
        "text": `[is_typing:1000]`
    };
} else {
    conversation.shared_memory.response.typingbulb = {
        "text": ``
    };
}

//REQUEST INFO FOR METRICS
var config = "prod"
var voice = false;
conversation.shared_memory.config = {};
if (config == "dev") {
    conversation.shared_memory.config.app = "test1592499168238";
    conversation.shared_memory.config.path = "/convbot";
    conversation.shared_memory.config.url = "https://io.datasync.orange.com/datasync/v2/" + conversation.shared_memory.config.app + "/data/" + conversation.shared_memory.config.path;
    conversation.shared_memory.config.WEBCOM_APP_SVA = "sva-information"
    conversation.shared_memory.config.WEBCOM_PATH_SVA = "convbot"
    conversation.shared_memory.config.WEBCOM_PATH_USER_SVA = "usersva1";
    conversation.shared_memory.config.WEBCOM_URL_SVA = `https://io.datasync.orange.com/datasync/v2/${conversation.shared_memory.config.WEBCOM_APP_SVA}/data/${conversation.shared_memory.config.WEBCOM_PATH_SVA}`;
    conversation.shared_memory.config.WEBCOM_URL_USER_SVA = `https://io.datasync.orange.com/datasync/v2/${conversation.shared_memory.config.WEBCOM_APP_SVA}/data/${conversation.shared_memory.config.WEBCOM_PATH_USER_SVA}`;
} else {
    conversation.shared_memory.config.app = "test1592499168238" //"djingooci" //base de donnée changé à cause des problème avec le precedant;
    conversation.shared_memory.config.path = "/prod-bot";
    conversation.shared_memory.config.url = "https://io.datasync.orange.com/datasync/v2/" + conversation.shared_memory.config.app + "/data/" + conversation.shared_memory.config.path;
    conversation.shared_memory.config.WEBCOM_APP_SVA = "sva-information"
    conversation.shared_memory.config.WEBCOM_PATH_SVA = "convbot"
    conversation.shared_memory.config.WEBCOM_PATH_USER_SVA = "usersva";
    conversation.shared_memory.config.WEBCOM_URL_SVA = `https://io.datasync.orange.com/datasync/v2/${conversation.shared_memory.config.WEBCOM_APP_SVA}/data/${conversation.shared_memory.config.WEBCOM_PATH_SVA}`;
    conversation.shared_memory.config.WEBCOM_URL_USER_SVA = `https://io.datasync.orange.com/datasync/v2/${conversation.shared_memory.config.WEBCOM_APP_SVA}/data/${conversation.shared_memory.config.WEBCOM_PATH_USER_SVA}`;
}
//REQUEST API CALL TO WRITE AND READ METRICS
conversation.shared_memory.config.write = `
 function write(data){
 const request = require('request');
     request.post(conversation.shared_memory.config.url, {json: data}, (error, res, body) => {
         if (error) {
             console.error(error)
             return
         }
         callback(output)
 })
 }
 `;
conversation.shared_memory.config.read = `
 function read(url) {
     const request = require('request');
         request(url, {json: true}, (err, res, body) => {
             if (err) {
                 return console.log(err);
             }
             console.log(body)
             resolve(body)
         });
 }`;
//BOT RESPONSES

//MASTER BOT RESPONSES
conversation.shared_memory.response.master = {
    "WelcomeMessage": [
        {
            "text": `Bienvenue ${conversation.shared_memory.first_name}! Je suis Djingo, l’assistant virtuel d’Orange.`
        },
        {
            "text": "Sur quels sujets puis-je vous aider ? A tout moment, vous pouvez revenir sur cette liste en ecrivant :  Menu"
        },
        {
            "attachment": {
                "payload": {
                    "elements": [{
                        "default_action": {
                            "fallback_url": "facebook.com",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true,
                            "url": "",
                            "type": "web_url"
                        },
                        "buttons": [{
                            "payload": "Orange Money",
                            "title": "Orange Money",
                            "type": "postback"
                        },
                        {
                            "payload": "Pass et profils",
                            "title": "Pass et profils",
                            "type": "postback"
                        },
                        {
                            "payload": "aide",
                            "title": "Besoin d'aide",
                            "type": "postback"
                        }
                        ],
                        "image_url": welcome_image,//"https://smartly-image-stage.s3.us-west-2.amazonaws.com/1596535438194.png", //"https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602685436171.png",
                        "subtitle": "",
                        "title": "MENU"
                    }],
                    "template_type": "generic"
                },
                "type": "template"
            }
        },
        {
            "text": "Ou 👇",
            "quick_replies": [
                {
                    "payload": "Passez de 8 à 10 chiffres",
                    "title": 'Passez de 8 à 10 chiffres',
                    "content_type": 'text',
                    "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608046417573.png"
                },
                {
                    "payload": 'internet orange',
                    "title": 'Internet Orange',
                    "content_type": 'text',
                    "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608046417573.png"
                },
                {

                    "payload": 'Autres services',
                    "title": 'Autres services',
                    "content_type": 'text',
                    "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1596204511411.png"
                }
            ]
        }
    ],
    "reformulation": {
        "text": `.Je suis désolé, je n'ai pas pu vous comprendre. Vous pouvez taper \"Orange money\", \"Internet\", \"Profil et avantage\" ou \"Besoin d'aide\".`
    }
};

//ORANGEMONEY MICROBOT RESPONSES
conversation.shared_memory.response.orangeMoney = {
    "WelcomeMessage1": {
        "text": `Posez-moi votre question sur Orange Money, en utilisant peu de mots, par ex. : transfert d’argent à l’étranger ? Comment payer chez un marchand ?`
    },
    "WelcomeMessage2": {
        "text": "Ou, choisissez une de ces propositions :",
        "quick_replies": [{
            "content_type": "text",
            "title": "Ouvrir un compte",
            "payload": "Ouvrir un compte"
        },
        {
            "content_type": "text",
            "title": "Code secret perdu",
            "payload": "Code secret Orange Money"
        },
        {
            "content_type": "text",
            "title": "Simuler des frais",
            "payload": "simuler frais de transfert"
        },
        {
            "payload": 'erreur de transaction Orange money',
            "title": 'Erreur transaction',
            "content_type": 'text',
        }
        ]
    },
    "DureeOprationOm": [{
        "text": `Votre transfert d'argent est réalisé en temps réel.`
    }],
    "Faire_une_operation_om_avec_le_telephone_dun_autreComment faire un transfert avec le mobile de quelqu'un d'autre ?": [{
        "text": `Oui, vous pouvez utiliser le terminal mobile de quelqu’un d’autre mais exclusivement avec votre carte SIM à laquelle votre compte Orange Money est lié.`
    },
    {
        "text": `Car votre compte Orange Money est lié à votre numéro de téléphone mobile Orange et non au terminal mobile.`
    },
    {
        "text": `Vous êtes automatiquement identifié quand vous êtes connecté via le code court, via la séquence USSD et via l'application Orange Money.`
    },
    {
        "text": "Pour confirmer votre demande, vous devez la valider en saisissant votre code secret."
    }
    ],
    "codeLorsOperationOm": [{
        "text": `Oui, vous devez saisir votre code secret à chaque transfert OM. Vous aurez besoin de ce code secret pour toutes vos transactions.`
    },
    {
        "text": `Ne le communiquez pas et composez le discrètement, il doit rester confidentiel !`
    },
    {
        "text": `Le code secret permet de valider toutes les transactions et de les sécuriser en se protégeant contre toute utilisation frauduleuse.`
    }
    ],
    "PayerFacture": [
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vous pouvez régler toutes vos factures TV Orange, CIE, SODECI, CANAL+, Startimes sur l'Appli Orange Money en vous laissant guider pour le choix de la facture.",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "⬇️ Orange Money-IOS",
                        "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }

        }
    ],
    "PayementPartiel": [{
        "text": `Le paiement partiel est possible uniquement avec les factures CIE et SODECI.`
    }],
    "Comment_debloquer_mon_compte_orange_money": [{
        "text": `Pour débloquer votre compte Orange money, composez  sur votre mobile  #144*93#.Ensuite répondez 5 questions suivantes:`,
    },
    {
        "text": `Nom
Prénoms
Date de naissance
Numéro de la pièce d’identité
Le solde du compte Orange Money`,
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si vous voulez plus d'information, cliquez sur le bouton👇",
                "buttons": [{
                    "type": "web_url",
                    "title": "Plus d'informations",
                    "url": "https://www.orange.ci/fr/debloquer_mon_compte-om.html",
                    "webview_height_ratio": "full"
                }]
            }
        }
    },
    ],
    "Obtention_de_confirmation_operation_orange_money": [{
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "En cas de non réception de la notification de transaction par SMS, vous pouvez consulter vos dernières transactions sur l'application Orange Money Afrique.",
                "buttons": [{
                    "type": "web_url",
                    "title": "⬇️ Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "⬇️ Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    {
        "text": `Veuillez également signaler ce fait au service client (0707) pour une régularisation.`
    }
    ],
    "Comment_bloquer_mon_compte_orange_money": [{
        "text": ` Vous pouvez appeler le service client au 0707. Le téléconseiller vous posera une série de questions pour s'assurer que vous êtes bien le titulaire du compte avant de bloquer.`
    }, {
        "text": ` Ou vous rendre dans une agence Orange muni de votre pièce d'identité pour effectuer cette demande de blocage de votre compte Orange Money.`
    },
    {
        "text": "Ou tout simplement saisissez ou cliquer sur conseiller 👇"
    },
    {
        "quick_replies": [{
            "content_type": "text",
            "title": "Conseiller",
            "payload": "conseiller"
        }]
    }
    ],
    "Faire_une_operation_orange_money_sans_avoir_de_compte_orange_money": [{
        "text": `Oui. Pour le cas où votre bénéficiaire ne possède pas de compte Orange Money, ou est abonné à un autre opérateur Mobile Money,`
    },
    {
        "text": `il recevra un SMS avec un code qui lui sera nécessaire pour le retrait de l'argent dans une agence ou point service Orange.`
    }
    ],
    "Notification_de_mise_a_jour_de_mon_compte_orange_money": [{
        "text": `Vous recevez un SMS récapitulant votre demande et informant que votre demande de mise à jour de votre compte a été réalisée.`
    }],
    "Modifier_mes_info_orange_money": [{
        "text": `Vous pouvez modifier vos informations personnelles en vous rendant dans une agence Orange ou dans un point service Orange.`,
    },
    {
        "text": `Vous devrez dans ce cas vous munir de votre nouvelle pièce d’identité.`
    }
    ],
    "Admin_compte_om": [{
        "text": `Rendez-vous sur l’application Orange Money Afrique👇`
    }],
    "Modifier_mon_Profil": [{
        "text": `Il y a deux profils sur orange money (Jeune et femme) et deux types de compte :
Lite : seuil limité à 200.000 F
Full ou Classique: solde journalier maximum à 1.500.000 F`
    },
    {
        "text": `- Vous pouvez consulter votre profil Orange Money au #144*67#.
- Vous pouvez changer le profil de (Femme à Full ou de Jeune à Full)`
    },
    {
        "text": `- Vous pouvez faire la demande en agence pour modifier le profil d'un compte Orange Money Lite en Full.
- Vous pouvez modifier votre compte, en vous rendant en agence ou dans un point service Orange muni d'une pièce d'identité valide.`
    },
    ],
    "Comment_ouvrir_un_compte_orange_money": [{
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour ouvrir votre compte, composez  sur votre mobile le #144*71#. Vous pouvez aussi le faire via le web à l'adresse https://espaceclient.orange.ci. N'oubliez pas de vous munir d'une pièce d'identité valide. Pour connaitre tous les détails, cliquez ici :",
                "buttons": [
                    {
                        "type": "web_url",
                        "title": "Compte OM",
                        "url": "https://www.orange.ci/fr/ouvrir-un-compte-orange-money.html", //"https://www.orange.ci/fr/les-profils-mobile.html",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Compte Marchand",
                        "url": "https://business.orange.ci/fr/sous-distributions.html",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "B2B",
                        "url": "https://business.orange.ci/fr/presentation-orange-money-n.html",
                        "webview_height_ratio": "full"
                    },
                ]
            }
        }
    }],
    "SP_Gestion_Orange_Money": [{
        "text": `Il y a deux profils sur orange money (Jeune et femme) et deux types de compte : Lite : seuil limité à 200.000 F Full: solde journalier maximum à 1.500.000 F \n- Vous pouvez consulter votre profil Orange Money au #144*67#. \n- Vous pouvez changer le profil de (Femme à Full ou de Jeune à Full)`
    },
    {
        "text": "- Vous pouvez modifier votre compte, en vous rendant en agence ou dans un point service Orange muni d'une pièce d'identité valide.\n-Vous pouvez faire la demande en agence pour modifier le profil d'un compte Orange Money Lite en Full."
    }
    ],
    "Comment_fermer_mon_compte_orange_money": {
        "text": "Pour fermer un compte Orange Money, rendez-vous en agence avec votre pièce d'identité."
    },
    "Conditions_ouverture_de_compte_orange_money": [{
        "text": `Les conditions pour ouvrir un compte Orange Money sont :
• Avoir un numéro de mobile Orange,
• Avoir au moins 21 ans. Pour les mineurs, avoir au moins 16 ans et bénéficier d'une autorisation parentale,
• Avoir une pièce d'identité valide`
    },
    {
        "text": `Les pièces d'identité valides sont :
• Pour les nationaux : CNI / Passeport / Attestation d'identité délivré par l'ONI ou le commissariat
• Pour les étrangers : Passeport / Carte de réfugié ou titre de séjour / Carte nationale d'identité / Cartes professionnelles des représentants des forces ONUCI, FFCI, CEDEA.`
    }
    ],
    "Solde_orange_money": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour consulter le solde, vous pouvez :\n- soit télécharger l'application Orange Money Afrique et vous rendre dans la rubrique 'Mon solde',\n- soit composer le #144*81# et obtenir le solde à l'aide du code secret à quatre chiffres.",
                "buttons": [{
                    "type": "web_url",
                    "title": "⬇️ Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "⬇️ Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    "Gerer_son_code_secret_orange_money": [{
        "text": `Le code secret Orange Money est demandé pour confirmer et sécuriser toutes vos transactions.\nIl doit bien rester secret.`,
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si vous l'avez perdu, il est possible d'en créer un nouveau. Pour cela, télécharger l'application Orange Money Afrique  👇 et rendez-vous dans la rubrique 'Plus', puis choississez 'Code secret'.",
                "buttons": [{
                    "type": "web_url",
                    "title": "⬇️ Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "⬇️ Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    }
    ],
    "Les_marchands_acceptant_orange_money": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Le paiement avec Orange Money est possible chez les marchands qui affichent « ici paiement par Orange Money » sur la vitrine ou la porte.\nLa liste des marchands est ici 👇 ",
                "buttons": [{
                    "type": "web_url",
                    "title": "Liste des marchands",
                    "url": "https://www.orange.ci/fr/les-principaux-partenaires-e-commerce.html",
                    "webview_height_ratio": "full"
                }]
            }
        }
    },
    "Comment_trouver_le_code_dun_marchand": {
        "text": `Pour payer, demandez le code à 6 chiffres au marchand.\nCe code se trouve généralement près de la caisse.`
    },
    "TextOrVideo_Orange_Money": {
        "text": "Découvrez les explications en vidéo ou en texte 👇",
        "quick_replies": [{
            "content_type": "text",
            "title": "Vidéo",
            "payload": "video"
        },
        {
            "content_type": "text",
            "title": "Texte",
            "payload": "Comment Payer Texte"
        }
        ]
    },
    "Comment_faire_un_payement_sur_orange_money": {
        "SP_VIDEORESPONSE": [{
            "text": `Le paiement chez le marchand doit être validé avec l'application Orange Money.`
        },
        {
            "text": "La vidéo suivante vous explique comment faire :"
        },
        {
            "attachment": {
                "type": "video",
                "payload": {
                    //"attachment_id": 2779730048911682 //812299809544439
                    "url": "https://smartly-video-stage.s3.amazonaws.com/1601286232048"
                }
            }
        }
        ],
        "SP_textResponseOrangeMoney": [{
            "text": `Une fois que le marchand initialise la demande de paiement, vous pouvez la valider dans l’application Orange Money.`
        },
        {
            "text": `En ouvrant l’application, vous trouverez une notification avec les détails du paiement à valider avec votre code secret. Vous pouvez ensuite le voir dans les dernières transactions.`
        }
        ],
    },
    "SP_RechargerMonCompte_Orange_Money": {
        "SP_textResponseOrangeMoney": [{
            "text": `Pour recharger votre compte via Orange Money, faites « Recharger mon numéro ».`
        },
        {
            "text": `Choisissez ou définissez le montant et faites « Recharger ».\n-Entrez votre code secret pour confirmer`
        },
        {
            "text": `La confirmation du montant choisit ainsi que votre nouveau solde vous est présenté.`
        }
        ],
        "SP_VIDEORESPONSE": [{
            "text": `Voici comment recharger votre compte via Orange Money:`
        },
        {
            "attachment": {
                "type": "video",
                "payload": {
                    //"attachment_id": 790715511482298
                    "url": "https://smartly-video-stage.s3.us-west-2.amazonaws.com/1560261079736"
                }
            }
        }
        ]
    },
    "SP_RechargerOtherCompte_Orange_Money": {
        "SP_textResponseOrangeMoney": [{
            "text": `Pour recharger le compte d’un tiers via Orange Money, faites « Recharger un autre numéro ».`
        },
        {
            "text": `-Rentrez le nom de votre contact ou son numéro de téléphone.\n-Choisissez ou définissez le montant et faite « Recharger »,\n-Entrez votre code secret pour confirmer.`
        },
        {
            "text": `La confirmation du montant choisit ainsi que le nouveau solde de votre ami vous est présenté.`
        }
        ],
        "SP_VIDEORESPONSE": [{
            "text": `Voici comment recharger le compte d'un tiers via Orange Money :`
        }, ,
        {
            "attachment": {
                "type": "video",
                "payload": {
                    //"attachment_id": 2372220486419476
                    "url": "https://smartly-video-stage.s3.amazonaws.com/1560261092667"
                }
            }
        }
        ]
    },
    "CreditTelephonique_Orange_Money": {
        "text": `Le saviez-vous ? Avec Orange Money vous pouvez acheter du crédit téléphonique pour vous ou pour un proche directement depuis votre mobile.`
    },
    "CreditTelephonique_AC_Orange_Money": {
        "text": `Avant votre achat de crédit, vérifiez votre solde car vous devez disposer d'une somme suffisante sur le compte.\nL'achat de crédit téléphonique via Orange Money est gratuit.`
    },
    "CreditTelephonique_BC_Orange_Money": {
        "text": `Des SMS sont régulièrement envoyés pour vous informer des bonus. Consultez votre cagnotte de bonus sur le ""compte bonus"".\nVous pouvez également retrouver toutes les actualités bonus sur notre page Facebook.`
    },
    "savoir_mon_plafond_orange_money": {
        "text": `Le montant à déposer ne doit pas excéder le plafond maximum autorisé (1 500 000 FCFA).\nUn SMS de confirmation vous est envoyé par Orange.`
    },
    "Devices_accepter_pour_sur_orange_money": {
        "text": `Pour le moment vous ne pouvez faire vos opérations qu'en Francs CFA`
    },
    "foreignTransfertOm": {
        "depot": [{
            "text": `Pour transférer de l'argent à l'étranger, assurez-vous que le bénéficiaire dispose d'un compte Orange Money Côte d'ivoire`
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, Sénégal, Niger, Guinée Bissau).`
        }
        ],
        "retrait": {
            "text": `Vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'étranger.`
        },
        "transfert": [{
            "text": `Pour transférer de l'argent à l'étranger, assurez-vous que le bénéficiaire dispose d'un compte Orange Money Côte d'ivoire `
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, Sénégal, Niger, Guinée Bissau).`
        }
        ],
        'default': [{
            "text": `Si vous êtes le receveur, vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'étranger.`
        },
        {
            "text": `Par contre pour transférer de l'argent à l'étranger, vous devez vous assurer que le bénéficiaire dispose d'un compte Orange Money Côte d'ivoire`
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, Sénégal, Niger, Guinée Bissau).`
        }, {
            "text": `Combien ça coûte ?
•500 - 50 000: 1 000F
•50 005 - 200 000: 3 000F
•200 005 - 400 000: 5 000F
•400 005 - 1 000 000: 9 000F`
        }
        ]
    },
    "transfert": {
        "Full": {
            "text": `Pour connaitre les montants des frais de transfert d'argent, composes le #144*9*1*1#`
        },
        "Lite": {
            "text": `Pour connaitre les montants des frais de transfert d'argent, composes le #144*9*1*1#`
        },
        "Femme": {
            "text": `Afin que je calcule vos frais, écrivez le montant que vous souhaitez transférer svp.\nLe montant des frais pour un transfert de [500] FCFA depuis votre mobile est de [55] FCFA.`
        },
        "Jeune": {
            "text": `Afin que je calcule vos frais, écrivez le montant que vous souhaitez transférer svp.\nLe montant des frais pour un transfert de [500] FCFA depuis votre mobile est de [50] FCFA.`
        },
        "TransfertMontant": {
            "text": `Avec Orange Money, vous pouvez effectuer des opérations allant jusqu'à 1 500 000 FCFA.`
        },
        "Transfert_Remboursement": {
            "text": `Une erreur de transfert ? Obtenez le remboursement en contactant le service client.`
        },
        "Default": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Pour effectuer un transfert à partir de votre mobile, veuillez composer le #144*1# ou sélectionner l'onglet \"transfert d'argent\" via l'App Orange Money.",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "⬇️ Orange Money-IOS",
                        "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
    },
    "Choix_du_beneficiaires_dune_operation_orange_money": {
        "text": `3 possibilités pour choisir le bénéficiare d'un transfert s'offrent à vous :\n1. Saisir directement le numéro de votre correspondant\n2. Choisir votre bénéficiaire dans votre répertoire Orange Money\n3. Choisir votre bénéficiaire dans votre répertoire de contacts.`
    },
    "Savoir_si_mon_transfert_est_valide": {
        "text": `Après chaque transfert réussi, un messages d'Orange contenant les détails de la transaction (le numéro du destinataire, le montant débité, votre nouveau solde) vous est envoyé.\nLe bénéficiaire reçoit également un message l'informant qu'il a reçu de l'argent de votre part.`
    },
    "Historique_operation_orange_money": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `L’historique des dernières transactions (transfert, réception de transfert, dépôt…) est consultable sur l'application Orange Money, rubrique "Dernières transactions".'`,
                "buttons": [{
                    "type": "web_url",
                    "title": "⬇️ Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "⬇️ Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    "Comment_annuler_une_operation_orange_money": {
        "text": `Il n'est pas possible d'annuler une transaction qui a été validée.\nCependant, vous pouvez soumettre votre demande dans une agence ou un point service Orange. Un formulaire de réclamation vous sera remis.\nVous pouvez également contacter le service client pour geler le montant.`
    },
    "securityDepotTransfert": [{
        "text": `Vos [operation] sont sécurisés grâce à votre numéro de téléphone unique et votre code secret. Quand à vos transfert ils  sont sécurisés grâce à votre code secret.`
    },
    {
        "text": `Votre code secret doit rester confidentiel : composez-le à l'abri des regards indiscrets.`
    }
    ],
    "depot": {
        "DepotBonAvoir": {
            "text": `Pour profiter immédiatement d'Orange Money, Orange vous recommande de déposer de l'argent à l'ouverture du compte (dépôt gratuit) ! Pour cela, il suffit de vous munir de votre numéro de mobile Orange et d'être le titulaire du compte Orange Money.`
        },
        "DepotFaireDepot": {
            "text": `Faire un dépôt avec Orange Money`
        },
        "marcheASuivre": {
            "text": `Vous pouvez déposer de l'argent sur votre compte dans tous les points de vente où figure le logo Orange Money.\nLe montant à déposer ne doit pas excéder le plafond maximum autorisé (1 500 000 FCFA).\nUn SMS de confirmation vous est envoyé par Orange.`
        },
        "DepotEnCasErreur": {
            "text": `En cas d'erreur, je vous invite à contacter le service client.`
        },
    },
    "limitAmountTransfert": [{
        "text": `Avec Orange Money vous pouvez effectuer des opérations jusqu'à 1 500 000 FCFA.`
    },
    {
        "text": `Si votre compte n’est pas correctement identifié vous avez une restriction d’usage de 200 000 FCFA.`
    }
    ],
    "retrait": {
        "RetraitFaireUnRetrait": {
            "text": `Vous souhaitez faire un retrait avec Orange Money ?`
        },
        "Retraietranger": {
            "text": `Vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'étranger.`
        },
        "Fraisetplafond": {
            "text": `Tout savoir sur :`
        },
        "tarifTransfertRetrait": {
            "text": `pour connaitre les montants des frais de transfert d'argent, composes le #144*9*1*2#`
        },
        "PlafondOM": {
            "text": `Avec Orange Money vous pouvez effectuer des opérations jusqu'à 1 500 000 FCFA.\nSi votre compte n’est pas correctement identifié vous avez une restriction d’usage de 200 000 FCFA.`
        },
    },
    "Lieu_ou_faire_une_operation_orange_money": {
        "text": "Vous pouvez [operation] de l’argent depuis votre compte Orange Money dans tous les points de vente Orange Money (boutiques, kiosques, distributeurs automatiques…) où figure la mention « Orange Money ».\nVous pouvez consulter la liste des points de vente sur l'appli Orange Money.",
    },
    "generalRetraitTransfertDepot": {
        "text": `Avec Orange Money, vous pouvez transférer, recevoir de l'argent et payer depuis votre mobile.`
    },
    "retraitGeneral": {
        "text": `Rendez-vous en point de vente Orange Money avec votre mobile.\nCommuniquez au vendeur le montant à retirer de votre compte\nValidez la demande de retrait initiée par le vendeur au #120#  ou dans l'appli Orange Money Afrique en saisissant votre code secret à l'abri des regards indiscrets.`
    },
    "depotGeneral": {
        "text": `Vous pouvez déposer de l'argent sur votre compte dans tous les points de vente où figure le logo Orange Money.\nLe montant à déposer ne doit pas excéder le plafond maximum autorisé (1 500 000 FCFA).\nUn SMS de confirmation vous est envoyé par Orange.`
    },
    "SP_tranfertGeneral": {
        "text": `Pour transférer de l'argent à l'étranger, assurez-vous que le bénéficiaire dispose d'un compte Orange Money Côte d'ivoire ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, Sénégal, Niger, Guinée Bissau).`
    },
    "SP_simulerFraisTransfert_OM": {
        "text": "Quel est votre type de profil Orange Money ?"
    },
    "assitance_besoin_d_aide_orange_money": [{
        "text": `Vous pouvez directement saisir ou cliquer sur 👇 "Conseiller", pour une prise en charge.`,
        "quick_replies": [{
            "content_type": "text",
            "title": "Conseiller",
            "payload": "Web conseiller"
        },
        {
            "content_type": "text",
            "title": "Menu principal",
            "payload": "Menu principal"
        }
        ]
    }],
    "SP_FraudeArnaqueOm": [{
        "text": `Vous pouvez directement saisir ou cliquer sur 👇 "Conseiller", pour une prise en charge. Attention, 2 éléments sont importants :
•ID de transaction ;
•montant de la transaction.`,
        "quick_replies": [{
            "content_type": "text",
            "title": "Conseiller",
            "payload": "Web conseiller"
        },
        {
            "content_type": "text",
            "title": "Menu principal",
            "payload": "Menu principal"
        }
        ]
    }],
    "SP_ErreurOperationOm": [{
        "text": `Vous pouvez directement saisir ou cliquer sur 👇 "Conseiller", pour une prise en charge. Attention, 2 éléments sont importants :
•ID de transaction;
•montant de la transaction.`,
        "quick_replies": [{
            "content_type": "text",
            "title": "Conseiller",
            "payload": "Web conseiller"
        },
        {
            "content_type": "text",
            "title": "Menu principal",
            "payload": "Menu principal"
        }
        ]
    }], //"text": `Veuillez contacter immédiatement le service client pour faire suspendre votre compte Orange Money.  Votre code secret reste valable et le solde de votre compte est sécurisé.`
    "reclamation_besoin_d_aide_orange_money": [{
        "text": "Lorsque la demande est résolue, vous recevez un sms de clôture de la demande. Pour certains cas le service Orange Money vous contacte pour information."
    }],
    "reclamation_contester_solde_besoin_d_aide_orange_money": [{
        "text": "Vous avez la possibilité de contester votre solde en contactant le service client Orange Money (au 0707 ou en messagerie privée de la page facebook d'Orange CI)."
    },
    {
        "text": "Aussi, il est conseillé de vérifier au préalable l'historique de vos transactions via le #144*63# ou sur l'appli Orange Money Afrique."
    }
    ],
    "reclamation_erreur_debit_besoin_d_aide_orange_money": [{
        "text": "Votre requête peut être prise en compte pour des vérifications par le service client Orange Money."
    }],
    "reclamation_modifier_coordonnees_besoin_d_aide_orange_money": [{
        "text": "Pour modifier vos coordonnées, rendez-vous dans une agence ou un point service Orange Money avec votre nouvelle pièce d'identité."
    }],
    "reclamation_suivre_demande_besoin_d_aide_orange_money": [{
        "text": "Orange vous envoie un SMS lorsque la demande est résolue. Dans certains cas, le service client vous contacte pour plus d'informations."
    }]
    /*
    "erreurTransactionOm": {
      "text": `Veuillez contacter immédiatement le service client pour faire suspendre votre compte Orange Money.  Votre code secret reste valable et le solde de votre compte est sécurisé.`
    },*/
};

//INTERNET MICROBOT RESPONSES
conversation.shared_memory.response.internet = {
    "WelcomeMessage1": {
        "text": `Internet n'a pas de secret pour moi : je suis là pour vous en renseigner. :)`
    },
    "WelcomeMessage2": {
        "text": `ADSL, fibre, 4G, Pass ou  Bonus : interrogez-moi ! ;)`,
        "quick_replies": [{
            "payload": 'Pass internet',
            "title": 'Pass internet',
            "content_type": 'text',
        },
        {
            "payload": 'Offre internet',
            "title": 'Offre internet',
            "content_type": 'text',
        },
        {
            "payload": 'Configuration',
            "title": 'configuration',
            "content_type": 'text',
        }
            /* "WelcomeMessage3": {
                 "payload": 'Débloquer votre mobile',
                 "title": 'Comment entrer le code puk ?',
                 "content_type": 'text',
             }*/
        ]
    },
    /*{
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": `Pour tester votre éligibilité veuillez cliquer sur le lien 👇`,
          "buttons": [
            {
              "type": "web_url",
              "title": "Pass internet",
              "url": "https://www.orange.ci/fr/pass.html",
              "webview_height_ratio": "full"
            },
            {
              "type": "web_url",
              "title": "Offre internet",
              "url": "https://www.orange.ci/fr/internet-adsl-fibre-et-ligne-fixe-orange.html",
              "webview_height_ratio": "full"
            },
            {
              "type": "postback",
              "title": "Configuration",
              "payload": "configuration"
            }
        ]
        }
      }
    },*/
    "Reformulation_Internet": {
        "text": "Je suis désolé, je n'ai pas pu vous comprendre. Si vous voulez vérifier votres transferts, dites \"Quels sont les frais de transfert ?\"  ou si vous voulez voir votre dépôt, dites \"Comment faire un dépot ?\""
    },
    "EligibiliteFibre": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `Pour tester votre éligibilité veuillez cliquer sur le lien 👇`,
                "buttons": [{
                    "type": "web_url",
                    "title": "Tester",
                    "url": "https://laboutique.orange.ci/internet/eligibilite",
                    "webview_height_ratio": "full"
                }]
            }
        }
    }
};
//AIDE MICROBOT RESPONSES
conversation.shared_memory.response.aide = {
    "WelcomeMessage1": {
        "text": "Dites-moi en quelques mots quel est votre problème ?"
    },
    /*
    "WelcomeMessage2": {
      "text": "Posez votre question en quelques mots, par ex : changer mot de passe wifi ? Obtenir mon code PUK ?"
    },*/
    "Reformulation_Aide": {
        "text": "Je suis désolé, je n'ai pas pu vous comprendre. Si vous avez besoin d'aide, dîtes \"J'ai besoin d'aide pour Orange Money\" ou si vous voulez faire une réclamation, dîtes \"Comment faire une réclamation ?\""
    },
    "assistance_perte_de_credit_telephonique": {
        /*
        "text": `Bonjour ${conversation.shared_memory.first_name} , voyons ensemble comment je peux vous aider. Pour commencer, pourriez-vous me donner le numéro de téléphone concerné par le problème ?`
           */
        "text": `Pour vous répondre avec plus de précisions, quel est votre numéro de mobile, s’il vous plait ?`
    },
    "SMSCode_Aide": {
        "text": "Vous avez souscris l’offre [Nom Offre], qui vous permet [description offre]."
    },
    "UserPhoneNumber_Aide": {
        "text": "J’ai noté le : [Phone]. Est-ce exact ?"
    },
    "NumberIncorrect_Aide": {
        "text": "Dans ce cas, pourriez-vous ressaisir le numéro, s’il vous plaît ?"
    },
    "NumberConfirmation_Aide": [
        //  {
        //    "text": `C’est noté, merci. Pour continuer, pourriez-vous me préciser le numéro émetteur ou bien le nom du service de la facturation. Il s’agit du numéro ou du nom qui figure en haut de la notification SMS que vous avez reçue, comme le montre l'exemple, ci-dessous.`
        //  },
        {
            "text": "Très bien. Maintenant quel est le numéro émetteur, ou bien le nom du service de facturation ?"
        },
        {
            "text": "Ces informations se trouvent en haut du SMS de confirmation. Voici un exemple :"
        },
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599150671653.jpg" //"attachment_id": "632479047700421" //
                }
            }
        }
    ],
    "MessageRetourCreditCommunication_Aide": {
        /* "attachment":{
         "type": "image",
         "payload": {
             "attachment_id": "349322022869623" //https://smartly-image-stage.s3.us-west-2.amazonaws.com/1597318451946.jpeg
             }
         }*/
        "attachment": {
            "type": "image",
            "payload": {
                //"attachment_id" : "",
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599150671653.jpg",
                "is_reusable": true
            }
        }
    },
    "SvaInexistantMessage_Aide": [{
        "text": "Désolé, je n’arrive pas à identifier ce service."
    },
    {
        "text": "Pouvez-vous me donner à nouveau le numéro émetteur ou le nom du service ?"
    }
    ],
    /*
    "CodePUK": [
        {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text": `Pour avoir votre code PUK veuillez envoyer "puk" suivi du "numéro" converné" par sms au 0707 à partir d'un autre numéro orange, ou composer le #123*64#. Pour plus d'infos consulter le lien ci-dessous ⬇`,
                    "buttons": [
                        {
                            "type": "web_url",
                            "title": "Code PUK",
                            "url": "https://www.orange.ci/fr/1/9881/recuperer-code-puk-103664.html",
                            "webview_height_ratio": "full"
                        }
                    ]
                }
            }
        }
    ]*/
    "SOS_data_credit": [
        { "text": `En panne de crédit ou de datas ?  Plus de soucis à vous faire, Orange vous donne la possibilité d’emprunter jusqu’à 2000 F de crédit de communication. Composez #170#` },
    ],
    "CodePUK": [
        {
            "text": "Pour quel numéro de mobile, voulez-vous connaître le code PUK ?",
            "quick_replies": [{
                "payload": 'Mon numéro',
                "title": 'Mon numéro',
                "content_type": 'text',
            },
            {
                "payload": 'un autre numero',
                "title": 'Un autre numéro',
                "content_type": 'text',
            }
                /* {
                     "payload": 'Débloquer votre mobile',
                     "title": 'Comment entrer le code puk ?',
                     "content_type": 'text',
                 }*/
            ]
        }

    ],
    "CodePUK_pour_mon_propre_numero": [{
        "text": "Pour recevoir votre code PUK par SMS. Utilisez un autre mobile que le votre.  Envoyez un SMS au 0707."
    },
    {
        "text": "Dans le SMS, écrivez :\nPUK suivi d’un espace puis le numéro du mobile pour lequel vous avez besoin du code PUK."
    },
    {
        "text": "Sachez que vous pouvez retrouver le code PUK sur le support de votre carte SIM."
    },
    /*
     {
       "text": "Vous pouvez aussi retrouver le code PUK sur le support de votre carte SIM"
     },
     {
       "text": "Ou Envoyez par sms depuis un autre téléphone le mot «PUK» suivi d’un espace puis du numéro pour lequel l’on souhaite avoir le PUK  au 0707."
     },*/
    {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599221546460.png " //https://smartly-image-stage.s3.us-west-2.amazonaws.com/1597318451946.jpeg
            }
        }
    }
    ],
    "CodePUK_pour_un_autre_numero": [
        /*{
          "text": "Vous pouvez retrouver le code PUK en envoyant par sms  au 0707 le mot «PUK» suivi d’un espace puis du numéro pour lequel l’on souhaite avoir le PUK."
        }*/
        {
            "text": "Pour recevoir le code PUK, envoyer un SMS au 0707."
        },
        {
            "text": "Dans le SMS, écrivez:\nPUK suivi d’un espace puis le numéro du mobile pour lequel vous avez besoin du code PUK."
        }
    ],
    "codePukSupportSim": [{
        "text": "Pour obtenir le code PUK depuis le support, veuillez regarder l’exemple ci-dessous, la partie surligner en orange est votre code PUK."
    },
    {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599221546460.png " //https://smartly-image-stage.s3.us-west-2.amazonaws.com/1597318451946.jpeg
            }
        }
    }
    ],
    "comment_utiliser_le_code_puk": [{
        "text": "Si votre mobile affiche PUK :\n-Saisissez directement le code PUK puis valider.\n-Saisissez un nouveau code PIN (entre 4 et 8 chiffres) et valider.\n-Confirmez votre nouveau code PIN en le saisissant une seconde fois puis valider."
    },
    {
        "text": "La carte SIM de votre mobile est débloquée, et votre code PIN est modifié."
    },
    {
        "text": "Attention : Après 10 saisies erronées de votre code PUK, votre carte SIM sera grillée et deviendra inutilisable. Pour accéder aux service Orange depuis votre mobile, un renouvellement de la carte SIM sera nécessaire."
    }
    ],
    "codePukOrangeMobile": [{
        "text": `-Entrer dans le menu «Messages» de son mobile.\n-Saisir «PUK» suivi d’un espace puis du numéro pour lequel l’on souhaite avoir le PUK et Envoyer pas SMS au 0707. \n-Ou composez le #124*61# et suivez les instructions\nL’on reçoit le code PUK par SMS dans les secondes qui suivent`
    }],
    "COCIDCIEprepaye": [{
        "text": `L’envoi du code CIE par SMS peut prendre quelques minutes`
    },
    {
        "text": `Si au bout de 10 minutes, vous n’avez toujours pas reçu de SMS de confirmation, vous pouvez verifier que le paiement a bien été pris en compte, en composant le #144*41183# ou le #144*4118# puis en tapant l’option 3`
    },
    {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599562459761.png"
            }
        }
    },
    {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1599562465869.png"
            }
        }
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si malgré cela, vous ne retrouvez toujours pas votre dernier paiement, contactez un conseiller, en cliquant sur le bouton ci-dessous",
                "buttons": [{
                    "type": "postback",
                    "title": "Contacter un conseiller",
                    "payload": "web conseiller"
                }]
            }
        }
    }
    ]
};

//AUTRES SERVICES MICROBOT RESPONSES
conversation.shared_memory.response.autresServices = {
    "WelcomeMessage1": {
        "text": "Je peux vous renseigner sur la TV d’Orange, les équipements, et vous partager des astuces."
    },
    "WelcomeMessage2": {
        "text": "Posez votre question en quelques mots, par ex : Puis-je avoir le programme de la télévision Orange ? Comment retrouver le code puk ?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Programme de la tv Orange",
                "payload": "Programme de la tv Orange"
            },
            {
                "content_type": "text",
                "title": "Comment retrouver le code puk ?",
                "payload": "Comment retrouver le code puk ?"
            },
        ]
    },
    // {
    //   "text": "Posez votre question en quelques mots, par ex : Puis-je avoir le programme de la télévision Orange ? Comment retrouver le code puk ?"
    // },
    "Reformulation_Autres_Services": {
        "text": "Je suis désolé, je n'ai pas pu vous comprendre. Si vous voulez faire un paiement marchand, dîtes \"Comment payer chez un marchand ?\" "
    },
    "chicpapo": {
        "sva": "sva.png",
        "pass_profil": "passprofil.png"
    },
    "TvOrange": [
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Avec l'appli Orange, trouvez des bons moments de detente!",
                    "buttons": [{
                        "type": "web_url",
                        "title": "Ouvrir un compte",
                        "url": "https://www.orange.ci/fr/assistance-telecharger-application-tv.html", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Les chaines",
                        "url": "https://www.orange.ci/fr/les-chaines-orange-tv.html", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Les Pass",
                        "url": "https://www.orange.ci/fr/pass-tv-orange.html", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
        {
            "text": "Vous pouvez aussi télécharger 🤳 l'application Orange Tv",
            "quick_replies": [{
                "content_type": "text",
                "title": "Télécharger",
                "payload": "Télécharger Orange TV"
            },]
        },
    ],
    "telechargerOrangeTv": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour télécharger cliquer playstore pour android et applestore pour iphone!",
                "buttons": [{
                    "type": "web_url",
                    "title": "⬇️ Playstore store",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.ic.orangetv", //"https://espace-client.orange.fr/page-accueil",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "⬇️ Apple store",
                    "url": "https://apps.apple.com/fr/app/tv-dorange-c%C3%B4te-divoire/id1176454597", //"https://espace-client.orange.fr/page-accueil",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    "telechargerApplication": {
        "orangetv": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Pour télécharger cliquer playstore pour android et applestore pour iphone! 👇",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Playstore",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.ic.orangetv", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "⬇️ Apple store",
                        "url": "https://apps.apple.com/fr/app/tv-dorange-c%C3%B4te-divoire/id1176454597", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
        "orangemoi": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vous pouvez télécharger l'application Orange & moi juste ici 👇 en cliquant sur playstore pour android et applestore pour iphone! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Orange&Moi-Play Store",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.myorange.oci&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "⬇️ Orange&Moi-Apple Store",
                        "url": "https://apps.apple.com/fr/app/orange-et-moi-c%C3%B4te-divoire/id1061120855",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
        "orangemoneyafrique": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vous pouvez téléchargez l'application Orange Money Afrique juste ici en cliquant sur playstore pour android et applestore pour iphone! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "⬇️ Orange Money-IOS",
                        "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
        "Default": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vous pouvez téléchargez toutes les applications Orange en cliquant sur téléchargement 👇! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "⬇️ Téléchargement",
                        "url": "https://www.orange.ci/fr/assistance/applications.html",
                        "webview_height_ratio": "compact"
                    }
                    ]
                }
            }
        },
        /*{
          "text": 'Pouvez-vous preciser l\'application que vous souhaitez télécharger (Orange & Moi, Orange Tv, Orange money Afrique)',
          "quick_replies": [
            {
              "payload": "telécharger orange & moi",
              "title": 'Orange & Moi',
              "content_type": 'text'
            },
            {
              "payload": "télécharger orangetv",
              "title": 'Orange Tv',
              "content_type": 'text'
            },
            {
              "payload": "télécharger orangemoney",
              "title": 'Orange Money',
              "content_type": 'text'
            }
          ]
        }*/
    }
};

//PASS ET PROFILS MICROBOT RESPONSES
conversation.shared_memory.response.passetprofils = {
    "PassProfile": [
        {
            "text": "Posez votre question en quelques mots, par ex : quels sont mes avantages ? Quels sont mes bonus ?"
        },
    ],
    "Quel_mon_solde": [

        {
            "attachment": {
                "payload": {
                    "elements": [{
                        "default_action": {
                            "fallback_url": "facebook.com",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true,
                            "url": "",
                            "type": "web_url"
                        },
                        "buttons": [{
                            "type": "web_url",
                            "title": "Orange&Moi-Play Store",
                            "url": "https://play.google.com/store/apps/details?id=com.orange.myorange.oci&hl=fr",
                            "webview_height_ratio": "full"
                        },
                        {
                            "type": "web_url",
                            "title": "Orange&Moi-Apple Store",
                            "url": "https://apps.apple.com/fr/app/orange-et-moi-c%C3%B4te-divoire/id1061120855",
                            "webview_height_ratio": "full"
                        },
                        {
                            "type": "web_url",
                            "title": "Espace Client",
                            "url": "https://espaceclient.orange.ci/", //"https://espace-client.orange.fr/page-accueil",
                            "webview_height_ratio": "full"
                        },

                        ],
                        "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608812024168.png",
                        "subtitle": "",
                        "title": "Vous pouvez consulter votre solde sur l'application Orange & Moi ou sur l'espace client 👇,"
                    }],
                    "template_type": "generic"
                },
                "type": "template"
            }
        }
    ],
    "Suivi_conso": [

        {
            "attachment": {
                "payload": {
                    "elements": [{
                        "default_action": {
                            "fallback_url": "facebook.com",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true,
                            "url": "",
                            "type": "web_url"
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "title": "Conso Data",
                                "url": "https://www.orange.ci/fr/assistance-mobile/comment-recharger-ma-flybox-orange-et-suivre-ma-consommation.html",
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "web_url",
                                "title": "Conso Unités",
                                "url": "https://www.orange.ci/fr/assistance-mobile/suivre-votre-consommation.html", //"https://espace-client.orange.fr/page-accueil",
                                "webview_height_ratio": "full"
                            },

                        ],
                        "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608812024168.png",
                        "subtitle": "",
                        "title": "Vous voulez, avoir les informations de vos cliquer sur conso unités ou sur conso data 👇,"
                    }],
                    "template_type": "generic"
                },
                "type": "template"
            }
        }
    ],
    "BonusPassProfil": [{
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour connaître les bonus en cours associés à votre profil, rendez-vous dans votre espace client, en cliquant sur le boutton 👇",
                "buttons": [{
                    "type": "web_url",
                    "title": "Espace Client",
                    "url": "https://espaceclient.orange.ci/",
                    "webview_height_ratio": "full"
                }]
            }
        }
    }
        /*,
        {
          "text": "Enfin, composez le #111# et suivez les intructions (voir copie d’écran)"
    
    
        },
        {
          "attachment": {
            "type": "image",
            "payload": {
              "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1598020712277.png",
              "is_reusable": true
            }
          }
    
    
        }
        */
    ],
    "BeneficePassProfil": [{
        "text": `Rendez-vous sur l’application “Orange & Moi”👇 pour connaître les avantages en cours associés à votre pass (voir capture d'écran) et/ou souscrire à une autre offre pass,`
    },
    // {
    //   "text": "Rendez-vous sur l’application “Orange & Moi”👇. Autrement, vous pouvez vous rendre sur l\'Espace Client 👇,"
    // },
    {
        "attachment": {
            "payload": {
                "elements": [{
                    "default_action": {
                        "fallback_url": "facebook.com",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true,
                        "url": "",
                        "type": "web_url"
                    },
                    "buttons": [{
                        "type": "web_url",
                        "title": "Orange&Moi-Play Store",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.myorange.oci&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Orange&Moi-Apple Store",
                        "url": "https://apps.apple.com/fr/app/orange-et-moi-c%C3%B4te-divoire/id1061120855",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "Espace Client",
                        "url": "https://espaceclient.orange.ci/", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    },

                    ],
                    "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1607426346606.png",
                    "subtitle": "",
                    "title": ". Autrement, vous pouvez vous rendre sur l'Espace Client 👇,"
                }],
                "template_type": "generic"
            },
            "type": "template"
        }
    }
    ],
    "AvantagePassProfil": [{
        "text": "Pour connaître les avantages associés à votre profil, rendez-vous sur l’application Orange & Moi, disponible en suivant ce lien"
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": 'Autrement, vous pouvez également vous rendre dans l\'"Espace Client", en cliquant sur le lien suivant 👇',
                "buttons": [{
                    "type": "web_url",
                    "title": "Espace Client",
                    "url": "https://espaceclient.orange.ci/", //"https://www.orange.ci/fr/les-profils-mobile.html",
                    "webview_height_ratio": "full"
                }]
            }
        }
    },
    ],
    "NumerosPreferes": [{
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Vous pouvez gérer vos numéros préférés depuis l'application Orange et moi ou depuis votre espace client.",
                "buttons": [{
                    "type": "web_url",
                    "title": "Orange&Moi-Play Store",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.myorange.oci&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "Orange&Moi-Apple Store",
                    "url": "https://apps.apple.com/fr/app/orange-et-moi-c%C3%B4te-divoire/id1061120855",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "Espace Client",
                    "url": "https://espaceclient.orange.ci/", //"https://espace-client.orange.fr/page-accueil",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    }],
    "descriptions": {
        "novamix": [
            /*
            {
            "text": `Novamix est un profil simplifié par une tarification à la seconde et adapté aux clients ayant une consommation mensuelle entre 2500 FCFA et 7500 FCFA.`
            },
            {
            "text": `Avec un bonus multiusage (appels, SMS et internet) conditionné aussi bien par la consommation TELCO qu'aux usages Orange Money`
            }
            */
            {
                "text": "Novamix est le profil adressé au grand public qui permet d'avoir un tarif unique à la seconde vers tous les réseaux,  des bonus en fin de mois et des avantages Orange Money."
            }
        ],
        "novamixplus": [
            /*
                         {
                         "text": `Novamix Plus est un profil simplifié par une tarification à la seconde et adapté aux clients ayant une forte consommation mensuelle.`
                         },
                         {
                         "text": `La consommation de 10 000 FCFA déclenche le bonus mensuel.`
                         },
                         {
                         "text": `Ce bonus multiusage (appels, SMS et internet) conditionné aussi bien par la consommation TELCO que par les transactions Orange money`
                         },*/
            {
                "text": "Novamix Plus est un profil adapté aux clients ayant une conso mensuelle moyenne supérieure à 10.000F, qui offre un traficication simplifiée et des avantages pour les utilisateurs Orange Money."
            }
        ],
        "togotogo": [{
            "text": `Togo Togo est une offre jeune qui permet de construire librement son pass à partir d’une combinaison de services qui sont proposés à un tarif accessible`
        }],
        "basic6": [{
            "text": `Basic 6 est une offre fixe rechargeable avec le paiement d’un montant fixe pour 6 mois à l’avance`
        },],
        "basic12": [{
            "text": `Basic 12 est une offre fixe rechargeable avec le paiement d’un montant fixe pour 12 mois à l’avance`
        },],
        "dauphin": [{
            "text": `Dauphin est une offre conçue pour les jeunes qui ont plein de choses à partager et qui souhaitent vivre de nouvelles expériences avec leurs amis !`,
        },],
        "aigle": [{
            "text": `L’offre Aigle est dédiée à  tous nos clients qui appellent sans compter en national et à l’international, et qui sont friands d’internet…`,
        },],
        "tigre": [{
            "text": `Tigre est une offre qui répond aux attentes de ceux qui communiquent énormément par SMS et qui se connectent très souvent à Internet.`,
        },],
        "colibri": [{
            "text": `Colibri est une offre spécialement conçue pour ceux qui émettent des appels de courtes durées et qui recherchent une offre simple avec des tarifs à la seconde.`
        },],
        "rubis": [{
            "text": `Rubis est une offre rechargeable fixe dont les avantages d'appels sont déclenchés à partir d'un montant fixe mensuel`
        },],
        "emeraude": [{
            "text": `Emeraude est une offre rechargeable fixe dont les avantages d'appels sont déclenchés à partir d'un montant fixe mensuel`
        },],
        "intensestandard": [{
            "text": `Le profil postpayé est un compte téléphonique associé à une ligne fixe post payée.`
        },
        {
            "text": `C’est donc un service téléphonique pour lequel le client est redevable d’une facture et de frais d’abonnement et d’entretien mensuels.`
        },
        ],
        "diamant": [{
            "text": `Diamant est un compte téléphonique associé à une ligne fixe post payée.`
        },
        {
            "text": `C’est donc un service téléphonique pour lequel le client est redevable d’une facture et de frais d’abonnement et d’entretien mensuel.`
        },
        ]
    },
    "avantages": {
        "novamix": [{
            "text": `Avec Novamix on peut profiter de nombreux avantages :\n- Bonus tout usage (Voix, SMS & Data) à partir de 1500F de consommation mensuelle\n- Bonus crédits sur les usages OM du mois \n- L'iilimité vers les numéros préférés pour une consommation supérieure ou égale à 10 000 FCFA`
        },
        {
            "text": `Veuillez composer le #121# et suivre les instructions pour plus de détails sur les avantages du profil`
        },
        ],
        "novamixplus": [{
            "text": `Avec Novamix Plus on peut profiter de nombreux avantages :\n- Bonus tout usage (Voix, SMS & Data) à partir de 10000F de consommation mensuelle\n- Bonus crédits sur les transactions OM du mois \n- L'iilimité vers les numéros préférés pour une consommation supérieure ou égale à 10 000 FCFA`
        },
        {
            "text": `Veuillez composer le #121# et suivre les instructions pour plus de détails sur les avantages du profil`
        }
        ],
        "togotogo": [{
            "text": `La consommation (500F) déclenche des avantages suivants les paliers de consommation:\n-500F - 999F ➡️ 50Mo,\n-1000F - 1499F ➡️ 100 Mo,\n-Plus de 1500 ➡️ 200 Mo,\n`
        },
        {
            "text": `Ces bonus hebdomadaires (Volume Internet) sont valables 5 jours non cumulables et déposés dans la nuit du dimanche au lundi à partir de 00h00 prenant en compte la consommation S-1 (lundi au dimanche).`
        }
        ],
        "basic6": [{
            "text": `Les avantages du profil Basic 6 sont:\n-la maîtrise du budget par le paiement d’un montant fixe pour 6 mois à l’avance\n-la réception d’appel en illimité`
        },
        {
            "text": `-L'inscription à un annuaire Mobile Pro pour les clients Pro\n-pas de suspension de la ligne sur la période d’engagement\n-possibilité de se recharger pour émettre des appels`
        },
        ],
        "basic12": [{
            "text": `Les avantages du profil Basic 12 sont:\n-la maîtrise du budget par le paiement d’un montant fixe pour 12 mois à l’avance\n-la réception d’appel en illimité`
        },
        {
            "text": `-l'inscription à un annuaire Mobile Pro pour les clients Pro\n-pas de suspension de la ligne sur la période d’engagement\n-possibilité de se recharger pour émettre des appels`
        }
        ],
        "orangemoney": [{
            "text": `Ouvrez votre compte gratuitement en quelques minutes et vous pourrez recevoir, envoyer de l'argent et payer vos biens et services depuis votre mobile 24h/24, 7j/7`
        },],
        "dauphin": [{
            "text": `Avec le profil Dauphin vous profitez :\n- D’appels illimité à 0F intra- Dauphin de 22H à 7H\n- De 500 SMS gratuits par jour à raison de 100F le 1er et à partir de 2 000 F de consommation le mois précédent \n- De SMS tous-réseaux\n- De volume Internet offert`,
        },
        {
            "text": `Vous aurez plus de détails sur les avantages du profil Dauphin en composant le #121# et en suivant les instructions`
        }
        ],
        "aigle": [{
            "text": `Avec Aigle, pour ses consommations mensuelles supérieures à 10000F on bénéficie de minutes nationales et internationales, de SMS et de volume Internet chaque debut de mois. En plus les appels vers les numéros préférés sont gratuits tout le mois.`,
        },
        {
            "text": `Vous aurez plus de détails sur les avantages du profil Aigle en composant le #121# et en suivant les instructions`,
        }
        ],
        "tigre": [{
            "text": `Avec l'offre Tigre le client bénéficie d'un bonus (minutes d'appels, SMS, Internet) tous les mois à partir d'une consommation mensuelle de 3000F et même de la gratuité vers 5 numéros préférés pour une conso supérieure à 10000F.`,
        },
        {
            "text": `Vous aurez plus de détails sur les avantages du profil Tigre en composant le #121# et en suivant les instructions`,
        }
        ],
        "colibri": [{
            "text": `Avec Colibri, on profite d'un bonus (minutes d'appels, SMS) tous les mois à partir d'une consommation mensuelle de 2000F.`
        },
        {
            "text": `Vous aurez plus de détails sur les avantages du profil Colibri en composant le #121# et en suivant les instructions`
        },
        ],
        "rubis": [{
            "text": `Les avantages du profil Rubis sont:\n-600 minutes vers les fixes de OCI\n-60 minutes vers les mobiles Orange\n-Illimité les soirs et week-end`
        },],
        "emeraude": [{
            "text": `Les avantages du profil Emeraude sont:\n-60 minutes vers les mobiles Orange\n-Illimité vers les fixes OCI`
        },],
        "intensestandard": [{
            "text": `Un service téléphonique pour lequel le client est redevable d’une facture et de frais d’abonnement et d’entretien mensuels.`
        },
        {
            "text": `Dans le détail:\n-appels illimités vers les fixes Orange de 18h à 7h soir et week end \n-30 mn de communication gratuites vers les mobiles Orange`
        },
        ],
        "diamant": [{
            "text": `"Les avantages du profil Diamant sont:\n-la réception d'appel 24H/24H\n-30 minutes vers Orange\n-0F Illimité Soir et Week-end vers les fixes`
        }],
        "passprofil": [{
            "text": "Pour connaître les avantages associés à votre profil, rendez-vous sur l’application Orange & Moi, disponible en suivant ce lien"
        },
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": 'Autrement, vous pouvez également vous rendre dans l\'"Espace Client", en cliquant sur le lien suivant 👇',
                    "buttons": [{
                        "type": "web_url",
                        "title": "Espace Client",
                        "url": "https://espaceclient.orange.ci/", //"https://www.orange.ci/fr/les-profils-mobile.html",
                        "webview_height_ratio": "full"
                    }]
                }
            }
        },
        ]
    },
    "tarifs": {
        "novamix": [{
            "text": `Nos tarifs :\n-Appel tous réseaux national : 1,75 F/s\n-Appel vers les numéros préférés : 1F/s \n-SMS en local : 40 F/sms`
        },],
        "novamixplus": [{
            "text": `Nos tarifs :\n-Appel tous réseaux national : 1,75 F/s\n-Appel vers les numéros préférés : 1F/s \n-SMS en local : 40 F/sms`
        },],
        "togotogo": [{
            "text": `Tarifs:\n-1,75F/s tous réseaux\n-1F/s vers les numéros préférés`
        },],
        "basic6": [{
            "text": `La tarification est en minutes indivisibles`
        },
        {
            "text": `Les appels locaux:\n-vers les fixes OCI 62 F/ min\n-vers les autres fixes et réseaux locaux 88 F/ min\n-vers la France 82 F/ min\nLes appels internationaux:\n- zone 1*: 206 F/ min\n- zone 2*: 546f /min`
        },
        ],
        "basic12": [{
            "text": `La tarification est en minutes indivisibles`
        },
        {
            "text": `Les appels locaux:\n-vers les fixes OCI 62 F/ min\n-vers les autres fixes et réseaux locaux 88 F/ min\n-vers la France 82 F/ min\nLes appels internationaux:\n- zone 1*: 206 F/ min\n- zone 2*: 546f /min`
        },
        ],
        "dauphin": [{
            "text": `Appel:\n- Appel vers les numéros Orange et tous les réseaux | 1,6 F/seconde\n- vers les numéros ayant le profil Dauphin : 1,3F/s \n- vers les numéros préférés : 1,3F/s`,
        },
        {
            "text": `SMS :\n- le 1er SMS de la journée coûte 100F et déclenche la gratuité des 499 SMS qui suivent\n- tous réseaux national : 42 F/sms`,
        },
        ],
        "aigle": [{
            "text": `Appel:\n- tous réseaux national : 82 F/min indivisible\n- vers les numéros préférés : 37F/min indivisible`,
        },
        {
            "text": `SMS :\n- tous réseaux national : 42 F/sms`,
        },
        ],
        "tigre": [{
            "text": `Appel:\n- Vers les numéros Orange et tous les réseaux | 82 F/mn indivisible\n- Vers les numéros préférés : 37F/min indivisible`,
        },
        {
            "text": `SMS :\n- tous réseaux national : 42 F/sms`,
        },
        ],
        "colibri": [{
            "text": `Appels:\n- tous réseaux national : 1,6 F/s\n- vers les numéros préférés : 1,3F/s`
        },
        {
            "text": `SMS \n- tous réseaux national : 42 F/sms`
        },
        ],
        "rubis": [{
            "text": `Les appels sont à : \n- 62 F TTC/min vers les fixes OCI de 7h à 18h\n- 88 F TTC/min vers les mobiles et autres réseaux nationaux`
        },],
        "emeraude": [{
            "text": `Les appels sont à : \n- 62 F TTC/min vers les fixes OCI de 7h à 18h\n- 88 F TTC/min vers les mobiles et autres réseaux nationaux`
        },],
        "intensestandard": [{
            "text": `Intense Standard Tarifs`
        },],
        "diamant": [{
            "text": `Les appels sont à : \n- 62 F TTC/min vers les fixes OCI de 7h à 18h\n- 88 F TTC/min vers les mobiles et autres réseaux nationaux`
        }]
    },
    "migrations": {
        "novamix": [{
            "text": `Pour souscrire veuillez migrer sans condition gratuitement en composant le #121# .
Cependant, vous avez droit à 3 migrations par mois.`
        },],
        "novamixplus": [{
            "text": `Pour souscrire veuillez migrer en composant le #121#.\nLa condition est d'avoir une consommation de 8000 FCFA au moins le mois précédant.\nCependant, vous avez droit à 3 migrations par mois.`
        },],
        "togotogo": [{
            "text": `La migration vers ce profil n’est pas possible pour l’instant!`
        },],
        "dauphin": [{
            "text": `La migration se fait sans condition et  gratuitement en composant le #121#. Cependant, vous avez droit à 3 migrations par Mois`
        }],
        "aigle": [{
            "text": `La migration se fait gratuitement en composant le #121# à condition d'avoir la consommation supérieure ou égale à 8 000 FCFA le mois précédent. Cependant, vous avez droit à 3 migrations par Mois`
        },],
        "tigre": [{
            "text": `La migration se fait gratuitement en composant le #121#  et à condition d'avoir la consommation du mois précédent supérieure ou égale à 2500 FCFA. Cependant, vous avez droit à 3 migrations par Mois`
        }],
        "colibri": [{
            "text": `La migration se fait sans condition et  gratuitement en composant le #121#. Cependant, vous avez droit à 3 migrations par Mois`
        },],
        "basic6": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pièce d'identité et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant fixe pour 6 mois (10 300 FCFA)`
        },],
        "basic12": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pièce d'identité et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant fixe pour 12 mois (15 450 FCFA)`
        },],
        "rubis": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pièce d'identité et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant de rechargement (5 000 FCFA)`
        },],
        "emeraude": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pièce d'identité et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant de rechargement (10 000 FCFA)`
        },],
        "intensestandard": [{
            "text": `10 000f pour les frais d’installation de la ligne téléphonique 7 080f de frais d’entretien mensuels`
        },
        {
            "text": `Rendez-vous dans votre agence, pour renseignez la fiche de souscription.`
        }
        ],
        "diamant": [{
            "text": `Pour la souscription à la ligne Diamant (postpaid) veuillez :\n-vous rendre agence\n-renseigner la fiche de souscription\n-présenter la carte national d'identité \n-donner le plan de localisation\n-payer des frais d'installation (10 000 FCFA)\n+ 7292 FCFA de frais d’entretien mensuel`
        }]
    },
    "profilsMobilesFixe": [{
        "text": `Orange propose plusieurs types de profils : \nPour les clients mobiles, vous avez, novamix, novamix plus, colibri, tigre, dauphin et aigle.`
    },
    {
        "text": `Pour les clients fixes, vous avez, le profil basic 6, basic 12, rubis, emeraude, intense standard.`
    },
    ],
    "profilsmobiles": [{
        "text": `Orange propose plusieurs types de profils : \nPour les clients mobiles, vous avez, novamix, novamix plus, colibri, tigre, dauphin et aigle.`
    }],
    "profilsfix": [{
        "text": `Orange propose plusieurs types de profils: Pour les clients fixes, vous avez, le profil basic 6, basic 12, rubis, emeraude, intense standard.`
    }],
    "profilsIntense": {
        "text": `Pour les profils intenses, Orange vous proposes, le profil rubis et le profil emeraude.`
    },
    "profilsPostpayes": {
        "text": `Le profil postpayé est un compte téléphonique associé à une ligne fixe post payée. C’est donc un service téléphonique pour lequel le client est redevable d’une facture et de frais d’abonnement et d’entretien mensuels.`
    },
    "avantageInfo": {
        "text": `Vous avez dit avantage, mais je n'es pas compris l'élément, pour lequel vous souhaitez connaitre les avantages :).`
    }
};

//RESPONSES FOR ALL BOTS
conversation.shared_memory.response.autre = {
    "repromptObj": {
        "text": "Désolé, je n'ai pas compris : pourriez-vous reformuler en quelques mots. ;)"
    },
    "queryValidation": {
        "text": "Ai-je bien répondu à votre question ? :)",
        "quick_replies": [{
            "content_type": "text",
            "title": "Oui",
            "payload": "Oui"
        },
        {
            "content_type": "text",
            "title": "Non",
            "payload": "Non"
        }
            ,
        {
            "content_type": "text",
            "title": "Menu",
            "payload": "Menu"
        }
        ]
    },
    "autresQuestions": {
        "text": "Parfait, avez-vous d'autres questions ?",
        "quick_replies": [{
            "content_type": "text",
            "title": "Oui",
            "payload": "Oui"
        },
        {
            "content_type": "text",
            "title": "Non",
            "payload": "Non"
        }
        ]
    },
    "wrongResponse1": {
        "text": "Oups, je suis confus... sachez que je m'améliore grâce à vous ! :)"
    },
    "webConseiller": {
        "text": "Voulez-vous que je transfère la conversation à un conseiller ou voulez-vous aller au menu principal ?",
        "quick_replies": [{
            "content_type": "text",
            "title": "Web Conseiller",
            "payload": "Web Conseiller"
        },
        {
            "content_type": "text",
            "title": "Menu Principal",
            "payload": "Menu Principal"
        }
        ]
    },
    "autresQuestionsOui": {
        "text": "Je vous écoute. :)"
    },
    "autresQuestionsNon": {
        "text": "Très bien. Je reste à votre disposition, si besoin. ;)",
        "quick_replies": [{
            "content_type": "text",
            "title": "Retour au menu principal",
            "payload": "Menu Principal"
        }]
    },
    "OuiNonResponse": {
        "text": "Désolé, tu ne peux pas utilisé Oui/Non dans cette section"
    },
    "handover": {
        "text": "Handover, Bientôt actif"
    },
    "autresQuestionsAlternative": [{
        "text": "Merci. Vous pouvez donner votre niveau de satisfaction ici, en cliquant sur le lien suivant : https://msurvey.orange.com/Sondage_Djingo"
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Puis-je vous aider sur un autre sujet ?",
                "buttons": [{
                    "type": "postback",
                    "title": "Orange Money",
                    "payload": "Orange Money"
                },
                {
                    "type": "postback",
                    "title": "Pass et profils",
                    "payload": "Pass et profile"
                },
                {
                    "type": "postback",
                    "title": "Besoin d'aide",
                    "payload": "aide"
                },
                ]
            }
        }
    },
    {
        "text": 'Si ces rubriques ne vous conviennent pas, vous pouvez aller dans « Internet»  ou « Autres services ».',
        "quick_replies": [{
            "payload": 'internet',
            "title": 'Internet',
            "content_type": 'text',
            "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608046417573.png"
        },
        {

            "payload": 'Autres services',
            "title": 'Autres services',
            "content_type": 'text',
            "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1596204511411.png"
        }
        ]
    }
    ],
    "tooLong": {
        "text": `Votre texte est trop long, s'il vous plait reformulez en moins de mots 😅!`
    },
    "LeaveComment": {
        "text": `Donnez moi votre avis, cela m’aidera à m’améliorer.`
    },
    "AfterComment": {
        "text": `Merci pour vos commentaires.`,
        "quick_replies": [{
            "payload": 'accueil',
            "title": 'Accueil',
            "content_type": 'text',
        }]
    },
};

conversation.shared_memory.response.smallTalks = {
    "auxSmallTalk": {
        "text": "Comment puis-je vous aider ?"
    },
    "bye_aurevoir": {
        "text": "Au revoir, je reste disponible au moindre besoin ! 😊",
        "quick_replies": [{
            "content_type": "text",
            "title": "Menu Principal",
            "payload": "Menu Principal"
        }]
    },
    "commentCaVa": {
        "text": "Je vais très bien, merci ! 😊"
    },
    "quelEstTonNom": {
        "text": "Je suis Djingo l'assistant virtuel, mais ça tu le sais déjà ! 🙂"
    },
    "quelAgeAsTu": {
        "text": "On m'a créé en 2020 🙂"
    },
    "esTuUnRobot": {
        "text": "Je suis votre guide virtuel d'informations Orange Money 😉"
    },
    "esTuLa": {
        "text": "Je suis toujours là 😉"
    },
    "merci": {
        "text": "Tout le plaisir est pour moi 😉",
    },
    "insulte": {
        "text": "Sympathique... 🤔"
    },
    "mdr": {
        "text": "😂"
    },
    "demanderHeure": {
        "text": "Il est [hours]:[minutes] en Côte d'Ivoire."
    },
    "test": {
        "text": "Je vous en prie, testez-moi 😉"
    },
    "quelEstTonTravail": {
        "text": "Je suis votre guide virtuel d'informations Orange Money 😉"
    },
    "bisous": {
        "text": "Bisous 😘"
    },
    "jeTaime": {
        "text": "C'est réciproque 😍"
    },
    "anniversaire": {
        "text": "Joyeux anniversaire ! 🎉🎁"
    },
    "tuParlesQuellesLangues": {
        "text": "Pour l'instant, je ne parle que le français 🙂"
    },
    "compris": {
        "text": "Super 🙂"
    },
};

conversation.shared_memory.response.baseUrlChicpapo = {};
conversation.shared_memory.response.baseUrlChicpapo.url = "https://67146abf0413.ngrok.io/chicpapo/";
conversation.shared_memory.response.baseUrlChicpapo = {
    "covid": [
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312247237.png", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                    "is_reusable": true
                }
            }
        },
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312254442.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                    "is_reusable": true
                }
            }
        },
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312255826.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                    "is_reusable": true
                }
            }
        },
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312259808.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                    "is_reusable": true
                }
            }
        },
        {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312270767.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                    "is_reusable": true
                }
            }
        },
    ],
    "general": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1611312270767.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                "is_reusable": true
            }
        }
    },
    "sva": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602674376824.jpg", // conversation.shared_memory.response.baseUrlChicpapo.url + "sva.png",
                "is_reusable": true
            }
        }
    },
    "passetprofil": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602674376824.jpg", //conversation.shared_memory.response.baseUrlChicpapo.url + "passetprofil.png",
                "is_reusable": true
            }
        }
    },
    "internet": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602674930860.jpg", //conversation.shared_memory.response.baseUrlChicpapo.url + "internet.png",
                "is_reusable": true
            }
        }
    },
    "orangemoney": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602674986623.png", //conversation.shared_memory.response.baseUrlChicpapo.url + "orangemoney.png",
                "is_reusable": true
            }
        }
    },
    "aide": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1602674248739.jpg", //conversation.shared_memory.response.baseUrlChicpapo.url + "aide.png",
                "is_reusable": true
            }
        }
    },
    "otherservices": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": conversation.shared_memory.response.baseUrlChicpapo.url + "otherservices.png",
                "is_reusable": true
            }
        }
    },
    "passpartout": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": conversation.shared_memory.response.baseUrlChicpapo.url + "passpartout.png",
                "is_reusable": true
            }
        }
    },
    "facture": {
        "attachment": {
            "type": "image",
            "payload": {
                "url": conversation.shared_memory.response.baseUrlChicpapo.url + "facture.png",
                "is_reusable": true
            }
        }
    }
}

//CURRENT DATE
conversation.shared_memory.date =
    `
 function getDate(){
     var currentDate = new Date()
     var day = currentDate.getDate()
     var month = currentDate.getMonth() + 1
     var year = currentDate.getFullYear()
     var hours = currentDate.getHours()
     var minutes = currentDate.getMinutes()
     return day + "/" + month + "/" + year + " " + hours + ":" + minutes
 }
 `
conversation.shared_memory.conversationLong =
    `
    function isConversationTooLong(){
        let aux = input.text.split(" ");
        console.log(aux)
        let res = false;
        if(aux.length > 15){
            res = true;
        }
        return res;
    }
`
conversation.shared_memory.notUnderstood = 0;
conversation.shared_memory.previousIntent = "WelcomeIntent";

const GENERATED = [
    // HINT: the content of GENERATED should be the value of the rich_text property (or field) in the API output tab.
    conversation.shared_memory.response.master.WelcomeMessage,
];

//---------------------A NE PAS MODIFIER--------------------

let ref = false;
eval(conversation.shared_memory.conversationLong)
if (isConversationTooLong()) {
    messenger_answer.push(conversation.shared_memory.response.autre.tooLong);
    eval(conversation.shared_memory.payloadResponses)
    generateTooLongResponse();
} else {
    if (input.understood) {
        conversation.shared_memory.notUnderstood = 0;
        var is_conversation_from_bothub = eval(conversation.shared_memory.response.plateform_logique);

        GENERATED.forEach(msg => {
            if (msg.length > 1 || Array.isArray(msg)) {
                for (let i = 0; i < msg.length; i++) {

                    if (is_conversation_from_bothub) {
                        messenger_answer.push(conversation.shared_memory.response.typingbulb);
                    }
                    messenger_answer.push(msg[i]);

                }
            } else {
                if (is_conversation_from_bothub) {
                    messenger_answer.push(conversation.shared_memory.response.typingbulb);
                }
                messenger_answer.push(msg);
            }
        });

        //when making demo I want to show the previous menu, for that I need to don't send generatePayloadResponse
        //voice == true ? generatePayloadResponse() : null;
    } else {
        if (input.intent == "YesIntent" || input.intent == "NoIntent") {
            messenger_answer.push(conversation.shared_memory.response.autre.OuiNonResponse);
        } else {
            eval(conversation.shared_memory.payloadResponses)
            if (conversation.shared_memory.notUnderstood == 1) {
                generateSecondNotUnderstood();
                ref = true;
                messenger_answer.push(conversation.shared_memory.response.master.reformulation);
            } else if (conversation.shared_memory.notUnderstood == 2) {
                conversation.shared_memory.notUnderstood = 0;
                generateHandoverResponse();
                messenger_answer.push(conversation.shared_memory.response.autre.webConseiller);
            } else {
                generateFirstNotUnderstood();
                conversation.shared_memory.notUnderstood++;
                messenger_answer.push(conversation.shared_memory.response.autre.repromptObj);
            }
        }
    }
}
//SEND METRICS INFO
if (input.user_data.input_type == "voice" || input.user_data.input_type == "text") {
    conversation.shared_memory.input_mode = input.user_data.input_type
} else if (input.user_data.input_mode == "" || input.user_data.input_mode == null) {
    conversation.shared_memory.input_mode = "text";
}
eval(conversation.shared_memory.date)
eval(conversation.shared_memory.config.write)
let data = {
    "input": input.text || "GET_STARTED_PAYLOAD",
    "confidence_threshold": input.confidence,
    "understood": input.understood,
    "user_id": input.user_id,
    "conversation_url": conversation.short_term_memory.conversation_url,
    "date": getDate(),
    "timestamp": Date.now(),
    "intent": "WelcomeIntent",
    "platform": input.platform,
    "user": input.user_data,
    "context": conversation.shared_memory.previousIntent,
    "input_type": input.user_data.input_type,
    "input_mode": conversation.shared_memory.input_mode,
    "response_chatbot": messenger_answer,
    "other": []
}
if (ref) {
    data.other.push({
        ref: "true"
    })
}

write(data);
