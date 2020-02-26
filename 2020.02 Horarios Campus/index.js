// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const API = require('./apiUtil.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a Horarios Campus. Puedes preguntarme cual es el horario, a que hora cierra o abre puntos de interes dentro del campus monterrey.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const horarioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'horario';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        // const place = handlerInput.attributesManager.nombrelugar;
        let speakOutput = '';
        
        if(answerSlot){
            speakOutput = await API.findHorario(answerSlot);
        }
        
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
         
        }
};
// const horarioIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'horario';
//     },
//     handle(handlerInput) {
//         const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
//         const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
//         let speakOutput = '';

//         if (answerSlot === 'TecStore'){
//             speakOutput = 'Tec store tiene un horario de Lunes a Viernes de 8  a 1  y 2:30  5:30.  su telefono es 81 1599 8634 y la página para comprar el línea es store punto tec punto mx';
//         }
//         else if (answerSlot === 'Cafeteria') {
//             speakOutput = 'Los horarios de cafeterias y restaurantes varian, por ejemplo, Centrales de 7:30 a 7 de la tarde. Jubileo de 7:00 a 5:30 y Starbucks de biblioteca de 8:30 a 10:00 de la noche';
//         }
//         else if (answerSlot === 'BiblioTec') {
//             speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana.';
//         }
//         else if (answerSlot === 'PuntoAzul') {
//             speakOutput = 'Punto Azul abre de 8 de la mañana a 6 de la tarde de lunes a viernes.';
//         }
//         else if (answerSlot === 'Gym') {
//             speakOutput = 'La sala de pesas está abierto de lunes a viernes de 6 de la mañana a 9 de la noche y los sábados abren de 8 de la mañana a 3 de la tarde. De 4 y media a 5 de la tarde se cierra por limpieza';
//         }
//         // else if (answerSlot === 'CIMA') {
//         //     speakOutput = '';
//         // }
//         else if (answerSlot === 'Locatec') {
//             speakOutput = 'Entre semana, Locatec abre a las 8 de la mañana y cierra a las 8 de la noche. Los sábados abren de 8 de la mañana a 1 de la tarde.';
//         }
//         else if (answerSlot === 'TimHortons') {
//              speakOutput = 'El horario de Tim Hortons es de 6 de la mañana a 10 de la noche de lunes a viernes. El sábado abre de 9 de la mañana a 6 de la tarde y el domingo abre de 11 de la mañana a 9 de la noche.';
//         }        
//         else if (answerSlot === 'Oxxo') {
//             speakOutput = 'El oxxo de Centrales abre las 24 horas, los 7 días de la semana. El oxxo de Aulas 4 está abierto de 7 de la mañana a 10 de la noche de lunes a viernes y los sábados de 7 de la mañana a 6 de la tarde';
//         }        
//         else if (answerSlot === 'Panem') {
//             speakOutput = 'Panem abre a las 7:30 de la mañana y cierra a las 9:30 de la noche a excepción del sábado, que cierran a las 5:00 de la tarde. Los domingos no abren.';
//         }
//         else if (answerSlot === 'BBVA') {
//             speakOutput = 'El banco BBVA abre de 8:30 de la mañana a 5 de la tarde. No abre en sábado y domingo.';
//         }
//         else if (answerSlot === 'Santander') {
//             speakOutput = 'Santander se encuentra abierto de 9 de la mañana a 4 de la tarde. No abre en sábado y domingo.';
//         }        
//         // else if (answerSlot === 'Enfermeria') {
//         //     speakOutput = '';
//         // }

//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt('¿Te puedo ayudar con otra cosa?')
//             .getResponse();
//     }
// };

const aperturaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'apertura';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        // const place = handlerInput.attributesManager.nombrelugar;
        let speakOutput = '';
        
        if(answerSlot){
            speakOutput = await API.findApertura(answerSlot);
        }
 
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};
// const aperturaIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'apertura';
//     },
//     handle(handlerInput) {
//         const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
//         const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
//         let speakOutput = '';
        
//         if (answerSlot === 'TecStore'){
//             speakOutput = 'Tec store abre de Lunes a Viernes en dos horarios, el primero a las 8 de la mañana y por la tarde a las 2:30, en línea el servicio es las 24 horas en store punto tec punto mx';
//         }
//         else if (answerSlot === 'Cafeteria') {
//             speakOutput = 'en Centrales te podemos dar servicio a partir de las 7:30 de la mañana. En Jubileo te recibimos desde las 7:00 de la mañana y Starbucks de biblioteca desde las 8:30';
//         }
//         else if (answerSlot === 'BiblioTec') {
//             speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
//         }
//         else if (answerSlot === 'PuntoAzul') {
//             speakOutput = 'Punto Azul abre a las 8 de la mañana de lunes a viernes.';
//         }
//         else if (answerSlot === 'Gym') {
//           speakOutput = 'La sala de pesas se abre a las 6 de la mañana de lunes a viernes y los sábados abren a las 8 de la mañana. De 4 y media a 5 de la tarde se cierra por limpieza.';
//         }
//         // else if (answerSlot === 'CIMA') {
//         // speakOutput = 'Cima abre ';
//         // }
//         else if (answerSlot === 'Locatec') {
//             speakOutput = 'Locatec abre a las 8 de la mañana de lunes a sábado.';
//         }
//         else if (answerSlot === 'TimHortons') {
//             speakOutput = 'Entre semana, Tim Hortons abre a las 6 de la mañana. El sábado abre a las de 9 de la mañana y el domingo abre de 11 de la mañana.';
//         }        
//         else if (answerSlot === 'Oxxo') {
//             speakOutput = 'El oxxo de Centrales abre las 24 horas, los 7 días de la semana. El oxxo de Aulas 4 está abre a las 7 de la mañana de lunes a sábado';
//         }
//         else if (answerSlot === 'Panem') {
//             speakOutput = 'Panem abre a las 7:30 de la mañana de lunes a sábado. Los domingos no abren.';
//         }
//         else if (answerSlot === 'BBVA') {
//             speakOutput = 'El banco BBVA abre a las 8:30 de la mañana. No abre en sábado y domingo.';
//         }
//         // else if (answerSlot === 'Enfermeria') {
//         //   speakOutput = 'La enfermeria abre';
//         // }
//         else if (answerSlot === 'Santander') {
//             speakOutput = 'Santander abre 9 de la mañana. No abre en sábado y domingo.';
//         }
        
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt('¿Te puedo ayudar con otra cosa?')
//             .getResponse();
//     }
// };

const cierreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cierre';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        // const place = handlerInput.attributesManager.nombrelugar;
        let speakOutput = '';
        
        if(answerSlot){
            speakOutput = await API.findCierre(answerSlot);
        }
 
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};
// const cierreIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cierre';
//     },
//     handle(handlerInput) {
//         const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
//         const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
//         let speakOutput = '';
        
//         if (answerSlot === 'TecStore'){
//             speakOutput = 'En Tec store cerramos a la 1 de la tarde, regresamos a las 2:30 y nos vamos a las 5:30 de la tarde. En línea el servicio es las 24 horas en store punto tec punto mx';
//         }
//         else if (answerSlot === 'Cafeteria') {
//             speakOutput = 'Centrales cierra a las 7 de la tarde. Jubileo a las 5:30 y Starbucks de biblioteca te atiende hasta las 10:00 de la noche';
//         }
//         else if (answerSlot === 'BiblioTec') {
//             speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
//         }    
//         else if (answerSlot === 'PuntoAzul') {
//             speakOutput = 'Punto Azul cierra a las 6 de la tarde de lunes a viernes.';
//         }
//         else if (answerSlot === 'Gym') {
//             speakOutput = 'La sala de pesas cierra a las 9 de la noche entre semana y los sábados cierran a las 3 de la tarde. De 4 y media a 5 de la tarde se cierra por limpieza ';
//         }
//         // else if (answerSlot === 'CIMA') {
//         //     speakOutput = 'Cima cierra ';
//         // }
//         else if (answerSlot === 'Locatec') {
//             speakOutput = 'Locatec cierra a las 8 de la noche de lunes a viernes. Los sábados cierran a l 1 de la tarde.';
//         }
//         else if (answerSlot === 'TimHortons') {
//             speakOutput = 'Entre semana, Tim Hortons cierra a las 10 de la noche. El sábado cierra a las 6 de la tarde y el domingo cierra a las 9 de la noche.';
//         }        
//         else if (answerSlot === 'Oxxo') {
//              speakOutput = 'El oxxo de Centrales abre las 24 horas, los 7 días de la semana. El oxxo de Aulas 4 cierra a las 10 de la noche de lunes a viernes. Los sábados cierran a las 6 de la tarde';
//         }        
//         else if (answerSlot === 'Panem') {
//             speakOutput = 'Panem cierra a las 9:30 de la noche. Los sábados cierran a las 5:00 de la tarde y los domingos no abren.';
//         }
//         else if (answerSlot === 'BBVA') {
//             speakOutput = 'El banco BBVA cierra a las 5 de la tarde. No abre en sábado y domingo.';
//         }
//         // else if (answerSlot === 'Enfermeria') {
//         //     speakOutput = 'La enfermeria cierra';
//         // }
//         else if (answerSlot === 'Santander') {
//             speakOutput = 'Santander cierra a las 4 de la tarde. No abre en sábado y domingo.';
//         }
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt('¿Te puedo ayudar con otra cosa?')
//             .getResponse();
//     }
//};

const dondePuedoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dondePuedo';
    },
    handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'acciones');
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.acciones.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        if (answerSlot === 'idImprimir'){ 
            speakOutput = 'Se puede imprimir en los centros de impresión CIMA.';
        }
        else if (answerSlot === 'idComer'){
            speakOutput = 'Hay distintos lugares para comer dentro del campus, entre ellos las cafeterias Centrales y Jubileo.';
        }        
        else if (answerSlot === 'idTramites'){
            speakOutput = 'Se pueden realizar tramites directamente en Punto Azul.';
        }
        else if (answerSlot === 'idPagar'){
            speakOutput = 'Puedes hacerlo a través de mitec.itesm.mx o directamente en Punto Azul.';
        }
        else if (answerSlot === 'idLost'){
            speakOutput = 'Puedes buscar cosas perdidas en Locatec.'
        }
        else if (answerSlot === 'idCoffee'){
            speakOutput = 'Puedes encontrar café en distintos puntos dentro del campus, los más comunes son Starbucks, Tim Hortons y Panem.';
        }
        else if (answerSlot === 'idEstacionarse'){
            speakOutput = 'Los estudiantes se pueden estacionar en el E1, E2, E3 y Pabellon Tec si pagaron, si no a partir de las 6 pueden entrar a los estacionamientos dentro del Tec. En Fines de Semana a cualquier hora.'
        }
        else if (answerSlot === 'idChecarme') {
            speakOutput = 'Si te sientes mal, puedes ir a checarte a la enfermería, ubicada entre la cafeteria Centrales y Panem.';
        }
        else if (answerSlot === 'idDepositar') {
            speakOutput = 'Dentro del campus se encuentra un banco B B V A y Santander.';
        }
        else if (answerSlot === 'idTomarElCircuito') {
            speakOutput = 'La parada que tienen en común todas las rutas de circuito tec está en la parte trasera de Cetec, muy cerca de Rectoría.';
        }
        
        
        if(answerSlot === "idPagar" || answerSlot === 'idTramites'){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y abre punto azul".';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const dondeQuedaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dondeQueda';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        // const place = handlerInput.attributesManager.nombrelugar;
        let speakOutput = '';
        
        if(answerSlot){
            speakOutput = await API.findLugares(answerSlot);
        }
 
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};
// const dondeQuedaIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dondeQueda';
//     },
//     handle(handlerInput) {
//         const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
//         const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
//         let speakOutput = '';
//         if (answerSlot === 'PuntoAzul'){
//             speakOutput = 'Punto Azul se encuentra en el sotano de Cetec, conocido también como el servilletero.';
//         }
//         else if (answerSlot === 'Gym'){
//             speakOutput = 'El gimnasio se encuentra debajo de Centro de Congresos, a un lado de la cafeteria Jubileo.';
//         }        
//         else if (answerSlot === 'TecStore'){
//             speakOutput = 'La Tec Store se encuentra en BiblioTec primer piso, conectada a Tim Hortons.';
//         }
//         else if (answerSlot === 'BiblioTec'){
//             speakOutput = 'La BiblioTec se encuentra al centro del campus, a un lado del Jardín de Carreras.';
//         }
//         else if (answerSlot === 'Locatec'){
//             speakOutput = 'Locatec se encuentra en el primer piso de aulas 1.'
//         }
//         // else if (answerSlot === 'CanchasEscamilla'){
//         //     speakOutput = '.';
//         // }
//         else if (answerSlot === 'CIMA'){
//              speakOutput = 'CIMA tiene distintas ubicaciones, una se encuentra debajo de Centrales, otra debajo de Aulas 4 y otra dentro de Arizona.';
//         }
//         else if (answerSlot === 'TimHortons') {
//             speakOutput = 'Tim Hortons se encuentra en el primer piso de BiblioTec.';
//         }        
//         else if (answerSlot === 'Oxxo') {
//             speakOutput = 'Un Oxxo queda junto a la cafeteria Centrales y otro a un costado de Aulas 4.';
//         }        
//         else if (answerSlot === 'Panem') {
//             speakOutput = 'Panem se encuentra entre Aulas 1 y Aulas 2. Bastante cerca de Rectoría y de la cafeteria Centrales.';
//         }
//         else if (answerSlot === 'Enfermeria') {
//             speakOutput = 'La enfermería se encuentra entre la cafeteria Centrales y Panem.';
//         }
//         else if (answerSlot === 'Santander') {
//           speakOutput = 'Santander se encuentra entre aulas 1 y centro estudiantil. A un lado de B B V A.';
//         }
//         else if (answerSlot === 'BBVA') {
//             speakOutput = 'BBVA se encuentra entre aulas 1 y centro estudiantil. A un lado de Santander';
//         }
//         else if (answerSlot === 'Circuito') {
//             speakOutput = 'La parada que tienen en común todas las rutas de circuito tec está en la parte trasera de Cetec, muy cerca de Rectoría.';
//         }
        
        
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             .reprompt('¿Te puedo ayudar con otra cosa?')
//             .getResponse();
//     }
// };

const AbrePuntoAzulIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AbrePuntoAzul');
            // && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
            //     || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'La skill está por cerrarse. Para invocar la skill de punto azul, menciona lo siguiente... "Alexa, abre punto azul".';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }

};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Nos vemos.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Disculpa, no pude entender lo que dijiste. Intenta de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        horarioIntentHandler,
        aperturaIntentHandler,
        cierreIntentHandler,
        dondePuedoIntentHandler,
        dondeQuedaIntentHandler,
        AbrePuntoAzulIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
