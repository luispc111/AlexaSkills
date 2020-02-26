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
        let speakOutput = '';
        
        // Si el answerSlot existe, buscalo en la base de datos
        if(answerSlot){
            speakOutput = await API.findHorario(answerSlot);
        }
        
        // Si estamos hablando de punto azul, añade esto a speakOutput
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
        }
};

const aperturaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'apertura';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        
        // Si el answerSlot existe, buscalo en la base de datos
        if(answerSlot){
            speakOutput = await API.findApertura(answerSlot);
        }
 
        // Si estamos hablando de punto azul, añade esto a speakOutput
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const cierreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cierre';
    },
    async handle(handlerInput) {
        
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        
        // Si el answerSlot existe, buscalo en la base de datos
        if(answerSlot){
            speakOutput = await API.findCierre(answerSlot);
        }
 
        // Si estamos hablando de punto azul, añade esto a speakOutput
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

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
        let speakOutput = '';
        
        // Si el answerSlot existe, buscalo en la base de datos
        if(answerSlot){
            speakOutput = await API.findLugares(answerSlot);
        }
 
        // Si estamos hablando de punto azul, añade esto a speakOutput
        if(answerSlot === "PuntoAzul"){
            speakOutput += ' Si te interesa abrir la skill de punto azul para dudas más específicas, dí: "Cierra la skill y vamos a punto azul"..., si no, solo realiza otra pregunta.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const AbrePuntoAzulIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AbrePuntoAzul');
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
