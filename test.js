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
    conversation.shared_memory.config.app = "test1592499168238" //"djingooci" //base de donn??e chang?? ?? cause des probl??me avec le precedant;
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
            "text": `Bienvenue ${conversation.shared_memory.first_name}! Je suis Djingo, l???assistant virtuel d???Orange.`
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
            "text": "Ou ????",
            "quick_replies": [
                {
                    "payload": "Passez de 8 ?? 10 chiffres",
                    "title": 'Passez de 8 ?? 10 chiffres',
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
        "text": `.Je suis d??sol??, je n'ai pas pu vous comprendre. Vous pouvez taper \"Orange money\", \"Internet\", \"Profil et avantage\" ou \"Besoin d'aide\".`
    }
};

//ORANGEMONEY MICROBOT RESPONSES
conversation.shared_memory.response.orangeMoney = {
    "WelcomeMessage1": {
        "text": `Posez-moi votre question sur Orange Money, en utilisant peu de mots, par ex. : transfert d???argent ?? l?????tranger ? Comment payer chez un marchand ?`
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
        "text": `Votre transfert d'argent est r??alis?? en temps r??el.`
    }],
    "Faire_une_operation_om_avec_le_telephone_dun_autreComment faire un transfert avec le mobile de quelqu'un d'autre ?": [{
        "text": `Oui, vous pouvez utiliser le terminal mobile de quelqu???un d???autre mais exclusivement avec votre carte SIM ?? laquelle votre compte Orange Money est li??.`
    },
    {
        "text": `Car votre compte Orange Money est li?? ?? votre num??ro de t??l??phone mobile Orange et non au terminal mobile.`
    },
    {
        "text": `Vous ??tes automatiquement identifi?? quand vous ??tes connect?? via le code court, via la s??quence USSD et via l'application Orange Money.`
    },
    {
        "text": "Pour confirmer votre demande, vous devez la valider en saisissant votre code secret."
    }
    ],
    "codeLorsOperationOm": [{
        "text": `Oui, vous devez saisir votre code secret ?? chaque transfert OM. Vous aurez besoin de ce code secret pour toutes vos transactions.`
    },
    {
        "text": `Ne le communiquez pas et composez le discr??tement, il doit rester confidentiel !`
    },
    {
        "text": `Le code secret permet de valider toutes les transactions et de les s??curiser en se prot??geant contre toute utilisation frauduleuse.`
    }
    ],
    "PayerFacture": [
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Vous pouvez r??gler toutes vos factures TV Orange, CIE, SODECI, CANAL+, Startimes sur l'Appli Orange Money en vous laissant guider pour le choix de la facture.",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "?????? Orange Money-IOS",
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
        "text": `Pour d??bloquer votre compte Orange money, composez  sur votre mobile  #144*93#.Ensuite r??pondez 5 questions suivantes:`,
    },
    {
        "text": `Nom
Pr??noms
Date de naissance
Num??ro de la pi??ce d???identit??
Le solde du compte Orange Money`,
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si vous voulez plus d'information, cliquez sur le bouton????",
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
                "text": "En cas de non r??ception de la notification de transaction par SMS, vous pouvez consulter vos derni??res transactions sur l'application Orange Money Afrique.",
                "buttons": [{
                    "type": "web_url",
                    "title": "?????? Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "?????? Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    {
        "text": `Veuillez ??galement signaler ce fait au service client (0707) pour une r??gularisation.`
    }
    ],
    "Comment_bloquer_mon_compte_orange_money": [{
        "text": ` Vous pouvez appeler le service client au 0707. Le t??l??conseiller vous posera une s??rie de questions pour s'assurer que vous ??tes bien le titulaire du compte avant de bloquer.`
    }, {
        "text": ` Ou vous rendre dans une agence Orange muni de votre pi??ce d'identit?? pour effectuer cette demande de blocage de votre compte Orange Money.`
    },
    {
        "text": "Ou tout simplement saisissez ou cliquer sur conseiller ????"
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
        "text": `Oui. Pour le cas o?? votre b??n??ficiaire ne poss??de pas de compte Orange Money, ou est abonn?? ?? un autre op??rateur Mobile Money,`
    },
    {
        "text": `il recevra un SMS avec un code qui lui sera n??cessaire pour le retrait de l'argent dans une agence ou point service Orange.`
    }
    ],
    "Notification_de_mise_a_jour_de_mon_compte_orange_money": [{
        "text": `Vous recevez un SMS r??capitulant votre demande et informant que votre demande de mise ?? jour de votre compte a ??t?? r??alis??e.`
    }],
    "Modifier_mes_info_orange_money": [{
        "text": `Vous pouvez modifier vos informations personnelles en vous rendant dans une agence Orange ou dans un point service Orange.`,
    },
    {
        "text": `Vous devrez dans ce cas vous munir de votre nouvelle pi??ce d???identit??.`
    }
    ],
    "Admin_compte_om": [{
        "text": `Rendez-vous sur l???application Orange Money Afrique????`
    }],
    "Modifier_mon_Profil": [{
        "text": `Il y a deux profils sur orange money (Jeune et femme) et deux types de compte :
Lite : seuil limit?? ?? 200.000 F
Full ou Classique: solde journalier maximum ?? 1.500.000 F`
    },
    {
        "text": `- Vous pouvez consulter votre profil Orange Money au #144*67#.
- Vous pouvez changer le profil de (Femme ?? Full ou de Jeune ?? Full)`
    },
    {
        "text": `- Vous pouvez faire la demande en agence pour modifier le profil d'un compte Orange Money Lite en Full.
- Vous pouvez modifier votre compte, en vous rendant en agence ou dans un point service Orange muni d'une pi??ce d'identit?? valide.`
    },
    ],
    "Comment_ouvrir_un_compte_orange_money": [{
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour ouvrir votre compte, composez  sur votre mobile le #144*71#. Vous pouvez aussi le faire via le web ?? l'adresse https://espaceclient.orange.ci. N'oubliez pas de vous munir d'une pi??ce d'identit?? valide. Pour connaitre tous les d??tails, cliquez ici :",
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
        "text": `Il y a deux profils sur orange money (Jeune et femme) et deux types de compte : Lite : seuil limit?? ?? 200.000 F Full: solde journalier maximum ?? 1.500.000 F \n- Vous pouvez consulter votre profil Orange Money au #144*67#. \n- Vous pouvez changer le profil de (Femme ?? Full ou de Jeune ?? Full)`
    },
    {
        "text": "- Vous pouvez modifier votre compte, en vous rendant en agence ou dans un point service Orange muni d'une pi??ce d'identit?? valide.\n-Vous pouvez faire la demande en agence pour modifier le profil d'un compte Orange Money Lite en Full."
    }
    ],
    "Comment_fermer_mon_compte_orange_money": {
        "text": "Pour fermer un compte Orange Money, rendez-vous en agence avec votre pi??ce d'identit??."
    },
    "Conditions_ouverture_de_compte_orange_money": [{
        "text": `Les conditions pour ouvrir un compte Orange Money sont :
??? Avoir un num??ro de mobile Orange,
??? Avoir au moins 21 ans. Pour les mineurs, avoir au moins 16 ans et b??n??ficier d'une autorisation parentale,
??? Avoir une pi??ce d'identit?? valide`
    },
    {
        "text": `Les pi??ces d'identit?? valides sont :
??? Pour les nationaux : CNI / Passeport / Attestation d'identit?? d??livr?? par l'ONI ou le commissariat
??? Pour les ??trangers : Passeport / Carte de r??fugi?? ou titre de s??jour / Carte nationale d'identit?? / Cartes professionnelles des repr??sentants des forces ONUCI, FFCI, CEDEA.`
    }
    ],
    "Solde_orange_money": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour consulter le solde, vous pouvez :\n- soit t??l??charger l'application Orange Money Afrique et vous rendre dans la rubrique 'Mon solde',\n- soit composer le #144*81# et obtenir le solde ?? l'aide du code secret ?? quatre chiffres.",
                "buttons": [{
                    "type": "web_url",
                    "title": "?????? Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "?????? Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    "Gerer_son_code_secret_orange_money": [{
        "text": `Le code secret Orange Money est demand?? pour confirmer et s??curiser toutes vos transactions.\nIl doit bien rester secret.`,
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Si vous l'avez perdu, il est possible d'en cr??er un nouveau. Pour cela, t??l??charger l'application Orange Money Afrique  ???? et rendez-vous dans la rubrique 'Plus', puis choississez 'Code secret'.",
                "buttons": [{
                    "type": "web_url",
                    "title": "?????? Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "?????? Orange Money-IOS",
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
                "text": "Le paiement avec Orange Money est possible chez les marchands qui affichent ?? ici paiement par Orange Money ?? sur la vitrine ou la porte.\nLa liste des marchands est ici ???? ",
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
        "text": `Pour payer, demandez le code ?? 6 chiffres au marchand.\nCe code se trouve g??n??ralement pr??s de la caisse.`
    },
    "TextOrVideo_Orange_Money": {
        "text": "D??couvrez les explications en vid??o ou en texte ????",
        "quick_replies": [{
            "content_type": "text",
            "title": "Vid??o",
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
            "text": `Le paiement chez le marchand doit ??tre valid?? avec l'application Orange Money.`
        },
        {
            "text": "La vid??o suivante vous explique comment faire :"
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
            "text": `Une fois que le marchand initialise la demande de paiement, vous pouvez la valider dans l???application Orange Money.`
        },
        {
            "text": `En ouvrant l???application, vous trouverez une notification avec les d??tails du paiement ?? valider avec votre code secret. Vous pouvez ensuite le voir dans les derni??res transactions.`
        }
        ],
    },
    "SP_RechargerMonCompte_Orange_Money": {
        "SP_textResponseOrangeMoney": [{
            "text": `Pour recharger votre compte via Orange Money, faites ?? Recharger mon num??ro ??.`
        },
        {
            "text": `Choisissez ou d??finissez le montant et faites ?? Recharger ??.\n-Entrez votre code secret pour confirmer`
        },
        {
            "text": `La confirmation du montant choisit ainsi que votre nouveau solde vous est pr??sent??.`
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
            "text": `Pour recharger le compte d???un tiers via Orange Money, faites ?? Recharger un autre num??ro ??.`
        },
        {
            "text": `-Rentrez le nom de votre contact ou son num??ro de t??l??phone.\n-Choisissez ou d??finissez le montant et faite ?? Recharger ??,\n-Entrez votre code secret pour confirmer.`
        },
        {
            "text": `La confirmation du montant choisit ainsi que le nouveau solde de votre ami vous est pr??sent??.`
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
        "text": `Le saviez-vous ? Avec Orange Money vous pouvez acheter du cr??dit t??l??phonique pour vous ou pour un proche directement depuis votre mobile.`
    },
    "CreditTelephonique_AC_Orange_Money": {
        "text": `Avant votre achat de cr??dit, v??rifiez votre solde car vous devez disposer d'une somme suffisante sur le compte.\nL'achat de cr??dit t??l??phonique via Orange Money est gratuit.`
    },
    "CreditTelephonique_BC_Orange_Money": {
        "text": `Des SMS sont r??guli??rement envoy??s pour vous informer des bonus. Consultez votre cagnotte de bonus sur le ""compte bonus"".\nVous pouvez ??galement retrouver toutes les actualit??s bonus sur notre page Facebook.`
    },
    "savoir_mon_plafond_orange_money": {
        "text": `Le montant ?? d??poser ne doit pas exc??der le plafond maximum autoris?? (1 500 000 FCFA).\nUn SMS de confirmation vous est envoy?? par Orange.`
    },
    "Devices_accepter_pour_sur_orange_money": {
        "text": `Pour le moment vous ne pouvez faire vos op??rations qu'en Francs CFA`
    },
    "foreignTransfertOm": {
        "depot": [{
            "text": `Pour transf??rer de l'argent ?? l'??tranger, assurez-vous que le b??n??ficiaire dispose d'un compte Orange Money C??te d'ivoire`
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, S??n??gal, Niger, Guin??e Bissau).`
        }
        ],
        "retrait": {
            "text": `Vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'??tranger.`
        },
        "transfert": [{
            "text": `Pour transf??rer de l'argent ?? l'??tranger, assurez-vous que le b??n??ficiaire dispose d'un compte Orange Money C??te d'ivoire `
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, S??n??gal, Niger, Guin??e Bissau).`
        }
        ],
        'default': [{
            "text": `Si vous ??tes le receveur, vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'??tranger.`
        },
        {
            "text": `Par contre pour transf??rer de l'argent ?? l'??tranger, vous devez vous assurer que le b??n??ficiaire dispose d'un compte Orange Money C??te d'ivoire`
        },
        {
            "text": `ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, S??n??gal, Niger, Guin??e Bissau).`
        }, {
            "text": `Combien ??a co??te ?
???500 - 50 000: 1 000F
???50 005 - 200 000: 3 000F
???200 005 - 400 000: 5 000F
???400 005 - 1 000 000: 9 000F`
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
            "text": `Afin que je calcule vos frais, ??crivez le montant que vous souhaitez transf??rer svp.\nLe montant des frais pour un transfert de [500] FCFA depuis votre mobile est de [55] FCFA.`
        },
        "Jeune": {
            "text": `Afin que je calcule vos frais, ??crivez le montant que vous souhaitez transf??rer svp.\nLe montant des frais pour un transfert de [500] FCFA depuis votre mobile est de [50] FCFA.`
        },
        "TransfertMontant": {
            "text": `Avec Orange Money, vous pouvez effectuer des op??rations allant jusqu'?? 1 500 000 FCFA.`
        },
        "Transfert_Remboursement": {
            "text": `Une erreur de transfert ? Obtenez le remboursement en contactant le service client.`
        },
        "Default": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": "Pour effectuer un transfert ?? partir de votre mobile, veuillez composer le #144*1# ou s??lectionner l'onglet \"transfert d'argent\" via l'App Orange Money.",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "?????? Orange Money-IOS",
                        "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                        "webview_height_ratio": "full"
                    }
                    ]
                }
            }
        },
    },
    "Choix_du_beneficiaires_dune_operation_orange_money": {
        "text": `3 possibilit??s pour choisir le b??n??ficiare d'un transfert s'offrent ?? vous :\n1. Saisir directement le num??ro de votre correspondant\n2. Choisir votre b??n??ficiaire dans votre r??pertoire Orange Money\n3. Choisir votre b??n??ficiaire dans votre r??pertoire de contacts.`
    },
    "Savoir_si_mon_transfert_est_valide": {
        "text": `Apr??s chaque transfert r??ussi, un messages d'Orange contenant les d??tails de la transaction (le num??ro du destinataire, le montant d??bit??, votre nouveau solde) vous est envoy??.\nLe b??n??ficiaire re??oit ??galement un message l'informant qu'il a re??u de l'argent de votre part.`
    },
    "Historique_operation_orange_money": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `L???historique des derni??res transactions (transfert, r??ception de transfert, d??p??t???) est consultable sur l'application Orange Money, rubrique "Derni??res transactions".'`,
                "buttons": [{
                    "type": "web_url",
                    "title": "?????? Orange Money-Android",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "?????? Orange Money-IOS",
                    "url": "https://apps.apple.com/fr/app/orange-money-afrique/id1313536959",
                    "webview_height_ratio": "full"
                }
                ]
            }
        }
    },
    "Comment_annuler_une_operation_orange_money": {
        "text": `Il n'est pas possible d'annuler une transaction qui a ??t?? valid??e.\nCependant, vous pouvez soumettre votre demande dans une agence ou un point service Orange. Un formulaire de r??clamation vous sera remis.\nVous pouvez ??galement contacter le service client pour geler le montant.`
    },
    "securityDepotTransfert": [{
        "text": `Vos [operation] sont s??curis??s gr??ce ?? votre num??ro de t??l??phone unique et votre code secret. Quand ?? vos transfert ils  sont s??curis??s gr??ce ?? votre code secret.`
    },
    {
        "text": `Votre code secret doit rester confidentiel : composez-le ?? l'abri des regards indiscrets.`
    }
    ],
    "depot": {
        "DepotBonAvoir": {
            "text": `Pour profiter imm??diatement d'Orange Money, Orange vous recommande de d??poser de l'argent ?? l'ouverture du compte (d??p??t gratuit) ! Pour cela, il suffit de vous munir de votre num??ro de mobile Orange et d'??tre le titulaire du compte Orange Money.`
        },
        "DepotFaireDepot": {
            "text": `Faire un d??p??t avec Orange Money`
        },
        "marcheASuivre": {
            "text": `Vous pouvez d??poser de l'argent sur votre compte dans tous les points de vente o?? figure le logo Orange Money.\nLe montant ?? d??poser ne doit pas exc??der le plafond maximum autoris?? (1 500 000 FCFA).\nUn SMS de confirmation vous est envoy?? par Orange.`
        },
        "DepotEnCasErreur": {
            "text": `En cas d'erreur, je vous invite ?? contacter le service client.`
        },
    },
    "limitAmountTransfert": [{
        "text": `Avec Orange Money vous pouvez effectuer des op??rations jusqu'?? 1 500 000 FCFA.`
    },
    {
        "text": `Si votre compte n???est pas correctement identifi?? vous avez une restriction d???usage de 200 000 FCFA.`
    }
    ],
    "retrait": {
        "RetraitFaireUnRetrait": {
            "text": `Vous souhaitez faire un retrait avec Orange Money ?`
        },
        "Retraietranger": {
            "text": `Vous pouvez composer le #144*13# pour retirer de l'argent en provenance de l'??tranger.`
        },
        "Fraisetplafond": {
            "text": `Tout savoir sur :`
        },
        "tarifTransfertRetrait": {
            "text": `pour connaitre les montants des frais de transfert d'argent, composes le #144*9*1*2#`
        },
        "PlafondOM": {
            "text": `Avec Orange Money vous pouvez effectuer des op??rations jusqu'?? 1 500 000 FCFA.\nSi votre compte n???est pas correctement identifi?? vous avez une restriction d???usage de 200 000 FCFA.`
        },
    },
    "Lieu_ou_faire_une_operation_orange_money": {
        "text": "Vous pouvez [operation] de l???argent depuis votre compte Orange Money dans tous les points de vente Orange Money (boutiques, kiosques, distributeurs automatiques???) o?? figure la mention ?? Orange Money ??.\nVous pouvez consulter la liste des points de vente sur l'appli Orange Money.",
    },
    "generalRetraitTransfertDepot": {
        "text": `Avec Orange Money, vous pouvez transf??rer, recevoir de l'argent et payer depuis votre mobile.`
    },
    "retraitGeneral": {
        "text": `Rendez-vous en point de vente Orange Money avec votre mobile.\nCommuniquez au vendeur le montant ?? retirer de votre compte\nValidez la demande de retrait initi??e par le vendeur au #120#  ou dans l'appli Orange Money Afrique en saisissant votre code secret ?? l'abri des regards indiscrets.`
    },
    "depotGeneral": {
        "text": `Vous pouvez d??poser de l'argent sur votre compte dans tous les points de vente o?? figure le logo Orange Money.\nLe montant ?? d??poser ne doit pas exc??der le plafond maximum autoris?? (1 500 000 FCFA).\nUn SMS de confirmation vous est envoy?? par Orange.`
    },
    "SP_tranfertGeneral": {
        "text": `Pour transf??rer de l'argent ?? l'??tranger, assurez-vous que le b??n??ficiaire dispose d'un compte Orange Money C??te d'ivoire ou d'un compte Orange Money d'un pays partenaire (Mali, Burkina Faso, S??n??gal, Niger, Guin??e Bissau).`
    },
    "SP_simulerFraisTransfert_OM": {
        "text": "Quel est votre type de profil Orange Money ?"
    },
    "assitance_besoin_d_aide_orange_money": [{
        "text": `Vous pouvez directement saisir ou cliquer sur ???? "Conseiller", pour une prise en charge.`,
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
        "text": `Vous pouvez directement saisir ou cliquer sur ???? "Conseiller", pour une prise en charge. Attention, 2 ??l??ments sont importants :
???ID de transaction ;
???montant de la transaction.`,
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
        "text": `Vous pouvez directement saisir ou cliquer sur ???? "Conseiller", pour une prise en charge. Attention, 2 ??l??ments sont importants :
???ID de transaction;
???montant de la transaction.`,
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
    }], //"text": `Veuillez contacter imm??diatement le service client pour faire suspendre votre compte Orange Money.  Votre code secret reste valable et le solde de votre compte est s??curis??.`
    "reclamation_besoin_d_aide_orange_money": [{
        "text": "Lorsque la demande est r??solue, vous recevez un sms de cl??ture de la demande. Pour certains cas le service Orange Money vous contacte pour information."
    }],
    "reclamation_contester_solde_besoin_d_aide_orange_money": [{
        "text": "Vous avez la possibilit?? de contester votre solde en contactant le service client Orange Money (au 0707 ou en messagerie priv??e de la page facebook d'Orange CI)."
    },
    {
        "text": "Aussi, il est conseill?? de v??rifier au pr??alable l'historique de vos transactions via le #144*63# ou sur l'appli Orange Money Afrique."
    }
    ],
    "reclamation_erreur_debit_besoin_d_aide_orange_money": [{
        "text": "Votre requ??te peut ??tre prise en compte pour des v??rifications par le service client Orange Money."
    }],
    "reclamation_modifier_coordonnees_besoin_d_aide_orange_money": [{
        "text": "Pour modifier vos coordonn??es, rendez-vous dans une agence ou un point service Orange Money avec votre nouvelle pi??ce d'identit??."
    }],
    "reclamation_suivre_demande_besoin_d_aide_orange_money": [{
        "text": "Orange vous envoie un SMS lorsque la demande est r??solue. Dans certains cas, le service client vous contacte pour plus d'informations."
    }]
    /*
    "erreurTransactionOm": {
      "text": `Veuillez contacter imm??diatement le service client pour faire suspendre votre compte Orange Money.  Votre code secret reste valable et le solde de votre compte est s??curis??.`
    },*/
};

//INTERNET MICROBOT RESPONSES
conversation.shared_memory.response.internet = {
    "WelcomeMessage1": {
        "text": `Internet n'a pas de secret pour moi : je suis l?? pour vous en renseigner. :)`
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
                 "payload": 'D??bloquer votre mobile',
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
          "text": `Pour tester votre ??ligibilit?? veuillez cliquer sur le lien ????`,
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
        "text": "Je suis d??sol??, je n'ai pas pu vous comprendre. Si vous voulez v??rifier votres transferts, dites \"Quels sont les frais de transfert ?\"  ou si vous voulez voir votre d??p??t, dites \"Comment faire un d??pot ?\""
    },
    "EligibiliteFibre": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": `Pour tester votre ??ligibilit?? veuillez cliquer sur le lien ????`,
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
        "text": "Dites-moi en quelques mots quel est votre probl??me ?"
    },
    /*
    "WelcomeMessage2": {
      "text": "Posez votre question en quelques mots, par ex : changer mot de passe wifi ? Obtenir mon code PUK ?"
    },*/
    "Reformulation_Aide": {
        "text": "Je suis d??sol??, je n'ai pas pu vous comprendre. Si vous avez besoin d'aide, d??tes \"J'ai besoin d'aide pour Orange Money\" ou si vous voulez faire une r??clamation, d??tes \"Comment faire une r??clamation ?\""
    },
    "assistance_perte_de_credit_telephonique": {
        /*
        "text": `Bonjour ${conversation.shared_memory.first_name} , voyons ensemble comment je peux vous aider. Pour commencer, pourriez-vous me donner le num??ro de t??l??phone concern?? par le probl??me ?`
           */
        "text": `Pour vous r??pondre avec plus de pr??cisions, quel est votre num??ro de mobile, s???il vous plait ?`
    },
    "SMSCode_Aide": {
        "text": "Vous avez souscris l???offre [Nom Offre], qui vous permet [description offre]."
    },
    "UserPhoneNumber_Aide": {
        "text": "J???ai not?? le : [Phone]. Est-ce exact ?"
    },
    "NumberIncorrect_Aide": {
        "text": "Dans ce cas, pourriez-vous ressaisir le num??ro, s???il vous pla??t ?"
    },
    "NumberConfirmation_Aide": [
        //  {
        //    "text": `C???est not??, merci. Pour continuer, pourriez-vous me pr??ciser le num??ro ??metteur ou bien le nom du service de la facturation. Il s???agit du num??ro ou du nom qui figure en haut de la notification SMS que vous avez re??ue, comme le montre l'exemple, ci-dessous.`
        //  },
        {
            "text": "Tr??s bien. Maintenant quel est le num??ro ??metteur, ou bien le nom du service de facturation ?"
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
        "text": "D??sol??, je n???arrive pas ?? identifier ce service."
    },
    {
        "text": "Pouvez-vous me donner ?? nouveau le num??ro ??metteur ou le nom du service ?"
    }
    ],
    /*
    "CodePUK": [
        {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"button",
                    "text": `Pour avoir votre code PUK veuillez envoyer "puk" suivi du "num??ro" convern??" par sms au 0707 ?? partir d'un autre num??ro orange, ou composer le #123*64#. Pour plus d'infos consulter le lien ci-dessous ???`,
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
        { "text": `En panne de cr??dit ou de datas ?  Plus de soucis ?? vous faire, Orange vous donne la possibilit?? d???emprunter jusqu????? 2000 F de cr??dit de communication. Composez #170#` },
    ],
    "CodePUK": [
        {
            "text": "Pour quel num??ro de mobile, voulez-vous conna??tre le code PUK ?",
            "quick_replies": [{
                "payload": 'Mon num??ro',
                "title": 'Mon num??ro',
                "content_type": 'text',
            },
            {
                "payload": 'un autre numero',
                "title": 'Un autre num??ro',
                "content_type": 'text',
            }
                /* {
                     "payload": 'D??bloquer votre mobile',
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
        "text": "Dans le SMS, ??crivez :\nPUK suivi d???un espace puis le num??ro du mobile pour lequel vous avez besoin du code PUK."
    },
    {
        "text": "Sachez que vous pouvez retrouver le code PUK sur le support de votre carte SIM."
    },
    /*
     {
       "text": "Vous pouvez aussi retrouver le code PUK sur le support de votre carte SIM"
     },
     {
       "text": "Ou Envoyez par sms depuis un autre t??l??phone??le mot ??PUK?? suivi d???un espace puis du num??ro pour lequel l???on souhaite avoir le PUK?? au??0707."
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
          "text": "Vous pouvez retrouver le code PUK en envoyant par sms ??au??0707 le mot ??PUK?? suivi d???un espace puis du num??ro pour lequel l???on souhaite avoir le PUK."
        }*/
        {
            "text": "Pour recevoir le code PUK, envoyer un SMS au 0707."
        },
        {
            "text": "Dans le SMS, ??crivez:\nPUK suivi d???un espace puis le num??ro du mobile pour lequel vous avez besoin du code PUK."
        }
    ],
    "codePukSupportSim": [{
        "text": "Pour obtenir le code PUK depuis le support, veuillez regarder l???exemple ci-dessous, la partie surligner en orange est votre code PUK."
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
        "text": "La carte SIM de votre mobile est d??bloqu??e, et votre code PIN est modifi??."
    },
    {
        "text": "Attention : Apr??s 10 saisies erron??es de votre code PUK, votre carte SIM sera grill??e et deviendra inutilisable. Pour acc??der aux service Orange depuis votre mobile, un renouvellement de la carte SIM sera n??cessaire."
    }
    ],
    "codePukOrangeMobile": [{
        "text": `-Entrer dans le menu ??Messages?? de son mobile.\n-Saisir ??PUK?? suivi d???un espace puis du num??ro pour lequel l???on souhaite avoir le PUK et Envoyer pas SMS au 0707. \n-Ou composez le #124*61# et suivez les instructions\nL???on re??oit le code PUK par SMS dans les secondes qui suivent`
    }],
    "COCIDCIEprepaye": [{
        "text": `L???envoi du code CIE par SMS peut prendre quelques minutes`
    },
    {
        "text": `Si au bout de 10 minutes, vous n???avez toujours pas re??u de SMS de confirmation, vous pouvez verifier que le paiement a bien ??t?? pris en compte, en composant le #144*41183# ou le #144*4118# puis en tapant l???option 3`
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
                "text": "Si malgr?? cela, vous ne retrouvez toujours pas votre dernier paiement, contactez un conseiller, en cliquant sur le bouton ci-dessous",
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
        "text": "Je peux vous renseigner sur la TV d???Orange, les ??quipements, et vous partager des astuces."
    },
    "WelcomeMessage2": {
        "text": "Posez votre question en quelques mots, par ex : Puis-je avoir le programme de la t??l??vision Orange ? Comment retrouver le code puk ?",
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
    //   "text": "Posez votre question en quelques mots, par ex : Puis-je avoir le programme de la t??l??vision Orange ? Comment retrouver le code puk ?"
    // },
    "Reformulation_Autres_Services": {
        "text": "Je suis d??sol??, je n'ai pas pu vous comprendre. Si vous voulez faire un paiement marchand, d??tes \"Comment payer chez un marchand ?\" "
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
            "text": "Vous pouvez aussi t??l??charger ???? l'application Orange Tv",
            "quick_replies": [{
                "content_type": "text",
                "title": "T??l??charger",
                "payload": "T??l??charger Orange TV"
            },]
        },
    ],
    "telechargerOrangeTv": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Pour t??l??charger cliquer playstore pour android et applestore pour iphone!",
                "buttons": [{
                    "type": "web_url",
                    "title": "?????? Playstore store",
                    "url": "https://play.google.com/store/apps/details?id=com.orange.ic.orangetv", //"https://espace-client.orange.fr/page-accueil",
                    "webview_height_ratio": "full"
                },
                {
                    "type": "web_url",
                    "title": "?????? Apple store",
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
                    "text": "Pour t??l??charger cliquer playstore pour android et applestore pour iphone! ????",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? Playstore",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.ic.orangetv", //"https://espace-client.orange.fr/page-accueil",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "?????? Apple store",
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
                    "text": "Vous pouvez t??l??charger l'application Orange & moi juste ici ???? en cliquant sur playstore pour android et applestore pour iphone! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? Orange&Moi-Play Store",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.myorange.oci&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "?????? Orange&Moi-Apple Store",
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
                    "text": "Vous pouvez t??l??chargez l'application Orange Money Afrique juste ici en cliquant sur playstore pour android et applestore pour iphone! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? Orange Money-Android",
                        "url": "https://play.google.com/store/apps/details?id=com.orange.orangemoneyafrique&hl=fr",
                        "webview_height_ratio": "full"
                    },
                    {
                        "type": "web_url",
                        "title": "?????? Orange Money-IOS",
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
                    "text": "Vous pouvez t??l??chargez toutes les applications Orange en cliquant sur t??l??chargement ????! ",
                    "buttons": [{
                        "type": "web_url",
                        "title": "?????? T??l??chargement",
                        "url": "https://www.orange.ci/fr/assistance/applications.html",
                        "webview_height_ratio": "compact"
                    }
                    ]
                }
            }
        },
        /*{
          "text": 'Pouvez-vous preciser l\'application que vous souhaitez t??l??charger (Orange & Moi, Orange Tv, Orange money Afrique)',
          "quick_replies": [
            {
              "payload": "tel??charger orange & moi",
              "title": 'Orange & Moi',
              "content_type": 'text'
            },
            {
              "payload": "t??l??charger orangetv",
              "title": 'Orange Tv',
              "content_type": 'text'
            },
            {
              "payload": "t??l??charger orangemoney",
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
                        "title": "Vous pouvez consulter votre solde sur l'application Orange & Moi ou sur l'espace client ????,"
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
                                "title": "Conso Unit??s",
                                "url": "https://www.orange.ci/fr/assistance-mobile/suivre-votre-consommation.html", //"https://espace-client.orange.fr/page-accueil",
                                "webview_height_ratio": "full"
                            },

                        ],
                        "image_url": "https://smartly-image-stage.s3.us-west-2.amazonaws.com/1608812024168.png",
                        "subtitle": "",
                        "title": "Vous voulez, avoir les informations de vos cliquer sur conso unit??s ou sur conso data ????,"
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
                "text": "Pour conna??tre les bonus en cours associ??s ?? votre profil, rendez-vous dans votre espace client, en cliquant sur le boutton ????",
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
          "text": "Enfin, composez le #111# et suivez les intructions (voir copie d?????cran)"
    
    
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
        "text": `Rendez-vous sur l???application ???Orange & Moi??????? pour conna??tre les avantages en cours associ??s ?? votre pass (voir capture d'??cran) et/ou souscrire ?? une autre offre pass,`
    },
    // {
    //   "text": "Rendez-vous sur l???application ???Orange & Moi???????. Autrement, vous pouvez vous rendre sur l\'Espace Client ????,"
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
                    "title": ". Autrement, vous pouvez vous rendre sur l'Espace Client ????,"
                }],
                "template_type": "generic"
            },
            "type": "template"
        }
    }
    ],
    "AvantagePassProfil": [{
        "text": "Pour conna??tre les avantages associ??s ?? votre profil, rendez-vous sur l???application Orange & Moi, disponible en suivant ce lien"
    },
    {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": 'Autrement, vous pouvez ??galement vous rendre dans l\'"Espace Client", en cliquant sur le lien suivant ????',
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
                "text": "Vous pouvez g??rer vos num??ros pr??f??r??s depuis l'application Orange et moi ou depuis votre espace client.",
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
            "text": `Novamix est un profil simplifi?? par une tarification ?? la seconde et adapt?? aux clients ayant une consommation mensuelle entre 2500 FCFA et 7500 FCFA.`
            },
            {
            "text": `Avec un bonus multiusage (appels, SMS et internet) conditionn?? aussi bien par la consommation TELCO qu'aux usages Orange Money`
            }
            */
            {
                "text": "Novamix est le profil adress?? au grand public qui permet d'avoir un tarif unique ?? la seconde vers tous les r??seaux,  des bonus en fin de mois et des avantages Orange Money."
            }
        ],
        "novamixplus": [
            /*
                         {
                         "text": `Novamix Plus est un profil simplifi?? par une tarification ?? la seconde et adapt?? aux clients ayant une forte consommation mensuelle.`
                         },
                         {
                         "text": `La consommation de 10 000 FCFA d??clenche le bonus mensuel.`
                         },
                         {
                         "text": `Ce bonus multiusage (appels, SMS et internet) conditionn?? aussi bien par la consommation TELCO que par les transactions Orange money`
                         },*/
            {
                "text": "Novamix Plus est un profil adapt?? aux clients ayant une conso mensuelle moyenne sup??rieure ?? 10.000F, qui offre un traficication simplifi??e et des avantages pour les utilisateurs Orange Money."
            }
        ],
        "togotogo": [{
            "text": `Togo Togo est une offre jeune qui permet de construire librement son pass ?? partir d???une combinaison de services qui sont propos??s ?? un tarif accessible`
        }],
        "basic6": [{
            "text": `Basic 6 est une offre fixe rechargeable avec le paiement d???un montant fixe pour 6 mois ?? l???avance`
        },],
        "basic12": [{
            "text": `Basic 12 est une offre fixe rechargeable avec le paiement d???un montant fixe pour 12 mois ?? l???avance`
        },],
        "dauphin": [{
            "text": `Dauphin est une offre con??ue pour les jeunes qui ont plein de choses ?? partager et qui souhaitent vivre de nouvelles exp??riences avec leurs amis !`,
        },],
        "aigle": [{
            "text": `L???offre Aigle est d??di??e ??  tous nos clients qui appellent sans compter en national et ?? l???international, et qui sont friands d???internet???`,
        },],
        "tigre": [{
            "text": `Tigre est une offre qui r??pond aux attentes de ceux qui communiquent ??norm??ment par SMS et qui se connectent tr??s souvent ?? Internet.`,
        },],
        "colibri": [{
            "text": `Colibri est une offre sp??cialement con??ue pour ceux qui ??mettent des appels de courtes dur??es et qui recherchent une offre simple avec des tarifs ?? la seconde.`
        },],
        "rubis": [{
            "text": `Rubis est une offre rechargeable fixe dont les avantages d'appels sont d??clench??s ?? partir d'un montant fixe mensuel`
        },],
        "emeraude": [{
            "text": `Emeraude est une offre rechargeable fixe dont les avantages d'appels sont d??clench??s ?? partir d'un montant fixe mensuel`
        },],
        "intensestandard": [{
            "text": `Le profil postpay?? est un compte t??l??phonique associ?? ?? une ligne fixe post pay??e.`
        },
        {
            "text": `C???est donc un service t??l??phonique pour lequel le client est redevable d???une facture et de frais d???abonnement et d???entretien mensuels.`
        },
        ],
        "diamant": [{
            "text": `Diamant est un compte t??l??phonique associ?? ?? une ligne fixe post pay??e.`
        },
        {
            "text": `C???est donc un service t??l??phonique pour lequel le client est redevable d???une facture et de frais d???abonnement et d???entretien mensuel.`
        },
        ]
    },
    "avantages": {
        "novamix": [{
            "text": `Avec Novamix on peut profiter de nombreux avantages :\n- Bonus tout usage (Voix, SMS & Data) ?? partir de 1500F de consommation mensuelle\n- Bonus cr??dits sur les usages OM du mois \n- L'iilimit?? vers les num??ros pr??f??r??s pour une consommation sup??rieure ou ??gale ?? 10 000 FCFA`
        },
        {
            "text": `Veuillez composer le #121# et suivre les instructions pour plus de d??tails sur les avantages du profil`
        },
        ],
        "novamixplus": [{
            "text": `Avec Novamix Plus on peut profiter de nombreux avantages :\n- Bonus tout usage (Voix, SMS & Data) ?? partir de 10000F de consommation mensuelle\n- Bonus cr??dits sur les transactions OM du mois \n- L'iilimit?? vers les num??ros pr??f??r??s pour une consommation sup??rieure ou ??gale ?? 10 000 FCFA`
        },
        {
            "text": `Veuillez composer le #121# et suivre les instructions pour plus de d??tails sur les avantages du profil`
        }
        ],
        "togotogo": [{
            "text": `La consommation (500F) d??clenche des avantages suivants les paliers de consommation:\n-500F - 999F ?????? 50Mo,\n-1000F - 1499F ?????? 100 Mo,\n-Plus de 1500 ?????? 200 Mo,\n`
        },
        {
            "text": `Ces bonus hebdomadaires (Volume Internet) sont valables 5 jours non cumulables et d??pos??s dans la nuit du dimanche au lundi ?? partir de 00h00 prenant en compte la consommation S-1 (lundi au dimanche).`
        }
        ],
        "basic6": [{
            "text": `Les avantages du profil Basic 6 sont:\n-la ma??trise du budget par le paiement d???un montant fixe pour 6 mois ?? l???avance\n-la r??ception d???appel en illimit??`
        },
        {
            "text": `-L'inscription ?? un annuaire Mobile Pro pour les clients Pro\n-pas de suspension de la ligne sur la p??riode d???engagement\n-possibilit?? de se recharger pour ??mettre des appels`
        },
        ],
        "basic12": [{
            "text": `Les avantages du profil Basic 12 sont:\n-la ma??trise du budget par le paiement d???un montant fixe pour 12 mois ?? l???avance\n-la r??ception d???appel en illimit??`
        },
        {
            "text": `-l'inscription ?? un annuaire Mobile Pro pour les clients Pro\n-pas de suspension de la ligne sur la p??riode d???engagement\n-possibilit?? de se recharger pour ??mettre des appels`
        }
        ],
        "orangemoney": [{
            "text": `Ouvrez votre compte gratuitement en quelques minutes et vous pourrez recevoir, envoyer de l'argent et payer vos biens et services depuis votre mobile 24h/24, 7j/7`
        },],
        "dauphin": [{
            "text": `Avec le profil Dauphin vous profitez :\n- D???appels illimit?? ?? 0F intra- Dauphin de 22H ?? 7H\n- De 500 SMS gratuits par jour ?? raison de 100F le 1er et ?? partir de 2 000 F de consommation le mois pr??c??dent \n- De SMS tous-r??seaux\n- De volume Internet offert`,
        },
        {
            "text": `Vous aurez plus de d??tails sur les avantages du profil Dauphin en composant le #121# et en suivant les instructions`
        }
        ],
        "aigle": [{
            "text": `Avec Aigle, pour ses consommations mensuelles sup??rieures ?? 10000F on b??n??ficie de minutes nationales et internationales, de SMS et de volume Internet chaque debut de mois. En plus les appels vers les num??ros pr??f??r??s sont gratuits tout le mois.`,
        },
        {
            "text": `Vous aurez plus de d??tails sur les avantages du profil Aigle en composant le #121# et en suivant les instructions`,
        }
        ],
        "tigre": [{
            "text": `Avec l'offre Tigre le client b??n??ficie d'un bonus (minutes d'appels, SMS, Internet) tous les mois ?? partir d'une consommation mensuelle de 3000F et m??me de la gratuit?? vers 5 num??ros pr??f??r??s pour une conso sup??rieure ?? 10000F.`,
        },
        {
            "text": `Vous aurez plus de d??tails sur les avantages du profil Tigre en composant le #121# et en suivant les instructions`,
        }
        ],
        "colibri": [{
            "text": `Avec Colibri, on profite d'un bonus (minutes d'appels, SMS) tous les mois ?? partir d'une consommation mensuelle de 2000F.`
        },
        {
            "text": `Vous aurez plus de d??tails sur les avantages du profil Colibri en composant le #121# et en suivant les instructions`
        },
        ],
        "rubis": [{
            "text": `Les avantages du profil Rubis sont:\n-600 minutes vers les fixes de OCI\n-60 minutes vers les mobiles Orange\n-Illimit?? les soirs et week-end`
        },],
        "emeraude": [{
            "text": `Les avantages du profil Emeraude sont:\n-60 minutes vers les mobiles Orange\n-Illimit?? vers les fixes OCI`
        },],
        "intensestandard": [{
            "text": `Un service t??l??phonique pour lequel le client est redevable d???une facture et de frais d???abonnement et d???entretien mensuels.`
        },
        {
            "text": `Dans le d??tail:\n-appels illimit??s vers les fixes Orange de 18h ?? 7h soir et week end \n-30 mn de communication gratuites vers les mobiles Orange`
        },
        ],
        "diamant": [{
            "text": `"Les avantages du profil Diamant sont:\n-la r??ception d'appel 24H/24H\n-30 minutes vers Orange\n-0F Illimit?? Soir et Week-end vers les fixes`
        }],
        "passprofil": [{
            "text": "Pour conna??tre les avantages associ??s ?? votre profil, rendez-vous sur l???application Orange & Moi, disponible en suivant ce lien"
        },
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": 'Autrement, vous pouvez ??galement vous rendre dans l\'"Espace Client", en cliquant sur le lien suivant ????',
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
            "text": `Nos tarifs :\n-Appel tous r??seaux national : 1,75 F/s\n-Appel vers les num??ros pr??f??r??s : 1F/s \n-SMS en local : 40 F/sms`
        },],
        "novamixplus": [{
            "text": `Nos tarifs :\n-Appel tous r??seaux national : 1,75 F/s\n-Appel vers les num??ros pr??f??r??s : 1F/s \n-SMS en local : 40 F/sms`
        },],
        "togotogo": [{
            "text": `Tarifs:\n-1,75F/s tous r??seaux\n-1F/s vers les num??ros pr??f??r??s`
        },],
        "basic6": [{
            "text": `La tarification est en minutes indivisibles`
        },
        {
            "text": `Les appels locaux:\n-vers les fixes OCI 62 F/ min\n-vers les autres fixes et r??seaux locaux 88 F/ min\n-vers la France 82 F/ min\nLes appels internationaux:\n- zone 1*: 206 F/ min\n- zone 2*: 546f /min`
        },
        ],
        "basic12": [{
            "text": `La tarification est en minutes indivisibles`
        },
        {
            "text": `Les appels locaux:\n-vers les fixes OCI 62 F/ min\n-vers les autres fixes et r??seaux locaux 88 F/ min\n-vers la France 82 F/ min\nLes appels internationaux:\n- zone 1*: 206 F/ min\n- zone 2*: 546f /min`
        },
        ],
        "dauphin": [{
            "text": `Appel:\n- Appel vers les num??ros Orange et tous les r??seaux | 1,6 F/seconde\n- vers les num??ros ayant le profil Dauphin : 1,3F/s \n- vers les num??ros pr??f??r??s : 1,3F/s`,
        },
        {
            "text": `SMS :\n- le 1er SMS de la journ??e co??te 100F et d??clenche la gratuit?? des 499 SMS qui suivent\n- tous r??seaux national : 42 F/sms`,
        },
        ],
        "aigle": [{
            "text": `Appel:\n- tous r??seaux national : 82 F/min indivisible\n- vers les num??ros pr??f??r??s : 37F/min indivisible`,
        },
        {
            "text": `SMS :\n- tous r??seaux national : 42 F/sms`,
        },
        ],
        "tigre": [{
            "text": `Appel:\n- Vers les num??ros Orange et tous les r??seaux | 82 F/mn indivisible\n- Vers les num??ros pr??f??r??s : 37F/min indivisible`,
        },
        {
            "text": `SMS :\n- tous r??seaux national : 42 F/sms`,
        },
        ],
        "colibri": [{
            "text": `Appels:\n- tous r??seaux national : 1,6 F/s\n- vers les num??ros pr??f??r??s : 1,3F/s`
        },
        {
            "text": `SMS \n- tous r??seaux national : 42 F/sms`
        },
        ],
        "rubis": [{
            "text": `Les appels sont ?? : \n- 62 F TTC/min vers les fixes OCI de 7h ?? 18h\n- 88 F TTC/min vers les mobiles et autres r??seaux nationaux`
        },],
        "emeraude": [{
            "text": `Les appels sont ?? : \n- 62 F TTC/min vers les fixes OCI de 7h ?? 18h\n- 88 F TTC/min vers les mobiles et autres r??seaux nationaux`
        },],
        "intensestandard": [{
            "text": `Intense Standard Tarifs`
        },],
        "diamant": [{
            "text": `Les appels sont ?? : \n- 62 F TTC/min vers les fixes OCI de 7h ?? 18h\n- 88 F TTC/min vers les mobiles et autres r??seaux nationaux`
        }]
    },
    "migrations": {
        "novamix": [{
            "text": `Pour souscrire veuillez migrer sans condition gratuitement en composant le #121# .
Cependant, vous avez droit ?? 3 migrations par mois.`
        },],
        "novamixplus": [{
            "text": `Pour souscrire veuillez migrer en composant le #121#.\nLa condition est d'avoir une consommation de 8000 FCFA au moins le mois pr??c??dant.\nCependant, vous avez droit ?? 3 migrations par mois.`
        },],
        "togotogo": [{
            "text": `La migration vers ce profil n???est pas possible pour l???instant!`
        },],
        "dauphin": [{
            "text": `La migration se fait sans condition et  gratuitement en composant le #121#. Cependant, vous avez droit ?? 3 migrations par Mois`
        }],
        "aigle": [{
            "text": `La migration se fait gratuitement en composant le #121# ?? condition d'avoir la consommation sup??rieure ou ??gale ?? 8 000 FCFA le mois pr??c??dent. Cependant, vous avez droit ?? 3 migrations par Mois`
        },],
        "tigre": [{
            "text": `La migration se fait gratuitement en composant le #121#  et ?? condition d'avoir la consommation du mois pr??c??dent sup??rieure ou ??gale ?? 2500 FCFA. Cependant, vous avez droit ?? 3 migrations par Mois`
        }],
        "colibri": [{
            "text": `La migration se fait sans condition et  gratuitement en composant le #121#. Cependant, vous avez droit ?? 3 migrations par Mois`
        },],
        "basic6": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pi??ce d'identit?? et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant fixe pour 6 mois (10 300 FCFA)`
        },],
        "basic12": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pi??ce d'identit?? et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant fixe pour 12 mois (15 450 FCFA)`
        },],
        "rubis": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pi??ce d'identit?? et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant de rechargement (5 000 FCFA)`
        },],
        "emeraude": [{
            "text": `La souscription se fait en agence avec :\n-les documents de souscription (pi??ce d'identit?? et plan de localisation)\n-le paiement des frais d'installation (10 000 FCFA) et du montant de rechargement (10 000 FCFA)`
        },],
        "intensestandard": [{
            "text": `10 000f pour les frais d???installation de la ligne t??l??phonique 7 080f de frais d???entretien mensuels`
        },
        {
            "text": `Rendez-vous dans votre agence, pour renseignez la fiche de souscription.`
        }
        ],
        "diamant": [{
            "text": `Pour la souscription ?? la ligne Diamant (postpaid) veuillez :\n-vous rendre agence\n-renseigner la fiche de souscription\n-pr??senter la carte national d'identit?? \n-donner le plan de localisation\n-payer des frais d'installation (10 000 FCFA)\n+ 7292 FCFA de frais d???entretien mensuel`
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
        "text": `Le profil postpay?? est un compte t??l??phonique associ?? ?? une ligne fixe post pay??e. C???est donc un service t??l??phonique pour lequel le client est redevable d???une facture et de frais d???abonnement et d???entretien mensuels.`
    },
    "avantageInfo": {
        "text": `Vous avez dit avantage, mais je n'es pas compris l'??l??ment, pour lequel vous souhaitez connaitre les avantages :).`
    }
};

//RESPONSES FOR ALL BOTS
conversation.shared_memory.response.autre = {
    "repromptObj": {
        "text": "D??sol??, je n'ai pas compris : pourriez-vous reformuler en quelques mots. ;)"
    },
    "queryValidation": {
        "text": "Ai-je bien r??pondu ?? votre question ? :)",
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
        "text": "Oups, je suis confus... sachez que je m'am??liore gr??ce ?? vous ! :)"
    },
    "webConseiller": {
        "text": "Voulez-vous que je transf??re la conversation ?? un conseiller ou voulez-vous aller au menu principal ?",
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
        "text": "Je vous ??coute. :)"
    },
    "autresQuestionsNon": {
        "text": "Tr??s bien. Je reste ?? votre disposition, si besoin. ;)",
        "quick_replies": [{
            "content_type": "text",
            "title": "Retour au menu principal",
            "payload": "Menu Principal"
        }]
    },
    "OuiNonResponse": {
        "text": "D??sol??, tu ne peux pas utilis?? Oui/Non dans cette section"
    },
    "handover": {
        "text": "Handover, Bient??t actif"
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
        "text": 'Si ces rubriques ne vous conviennent pas, vous pouvez aller dans ?? Internet??  ou ?? Autres services ??.',
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
        "text": `Votre texte est trop long, s'il vous plait reformulez en moins de mots ????!`
    },
    "LeaveComment": {
        "text": `Donnez moi votre avis, cela m???aidera ?? m???am??liorer.`
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
        "text": "Au revoir, je reste disponible au moindre besoin ! ????",
        "quick_replies": [{
            "content_type": "text",
            "title": "Menu Principal",
            "payload": "Menu Principal"
        }]
    },
    "commentCaVa": {
        "text": "Je vais tr??s bien, merci ! ????"
    },
    "quelEstTonNom": {
        "text": "Je suis Djingo l'assistant virtuel, mais ??a tu le sais d??j?? ! ????"
    },
    "quelAgeAsTu": {
        "text": "On m'a cr???? en 2020 ????"
    },
    "esTuUnRobot": {
        "text": "Je suis votre guide virtuel d'informations Orange Money ????"
    },
    "esTuLa": {
        "text": "Je suis toujours l?? ????"
    },
    "merci": {
        "text": "Tout le plaisir est pour moi ????",
    },
    "insulte": {
        "text": "Sympathique... ????"
    },
    "mdr": {
        "text": "????"
    },
    "demanderHeure": {
        "text": "Il est [hours]:[minutes] en C??te d'Ivoire."
    },
    "test": {
        "text": "Je vous en prie, testez-moi ????"
    },
    "quelEstTonTravail": {
        "text": "Je suis votre guide virtuel d'informations Orange Money ????"
    },
    "bisous": {
        "text": "Bisous ????"
    },
    "jeTaime": {
        "text": "C'est r??ciproque ????"
    },
    "anniversaire": {
        "text": "Joyeux anniversaire ! ????????"
    },
    "tuParlesQuellesLangues": {
        "text": "Pour l'instant, je ne parle que le fran??ais ????"
    },
    "compris": {
        "text": "Super ????"
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
