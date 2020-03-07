// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.result = 0;
        sessionAttributes.turn = 0;
        /*
            turn 0 = first question
            turn 1 = second question
            turn 2 = third question
            turn 3 = results
        */
        sessionAttributes.queTest = 0;
        /*
            test 0 = Fisica
            test 1 = Nutrición
            test 2 = ...
        */
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        let speakOutput = 'Bienvenido, TestWell te ayudara a conocer tus fortalezas y debilidades en diferentes dimensiones de Salud y Bienestar.';
        speakOutput += 'Para comenzar, necesito que me digas que test quieres tomar, existe el test físico, test de nutrición y otros... .';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FisicaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Fisica';
    },
    handle(handlerInput) {
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        let speakOutput = '';
        let a = '';
        
        // input invalido, porfa dame del 1 al 5 jsjsjs
        // if(sessionAttributes.turn === 0 && /* && EL INPUT ES UN NUMERO*/){
        //     // doesn't make sense, try again
        // }
        // guarda en alguna variable que test está tomando
        if(sessionAttributes.turn === 0){
            a = Alexa.getSlot(handlerInput.requestEnvelope, "testInput");
            sessionAttributes.queTest = Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        }
        // else if (sessionAttributes.turn !== 0 /* && EL INPUT NO SE RECONOCE*/){
        //     // dame un numero pofavooo
        // }
        
        // TEST DE FÍSICA
        if(sessionAttributes.queTest === 0){
                
            switch(sessionAttributes.turn){
                case 0:
                    speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';
                    speakOutput += 'Pregunta numero 1. <break time="50ms"/> "Hago ejercicio 3 veces por semana"';
                    sessionAttributes.turn++;
                    break;
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero 2. <break time="50ms"/> "Hago 5 minutos de estiramiento todos los días"';
                    sessionAttributes.turn++;
                    break;
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero 3. <break time="50ms"/> "Mis amigos y familiares me animan a tener una vida activa"';
                    sessionAttributes.turn++;
                    break;
                case 3:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Obtuviste ' + sessionAttributes.result + ' de 15 puntos.';
                    if(sessionAttributes.result <= 7){
                        speakOutput += ' Te fue mal';
                    }
                    else if(sessionAttributes.result <= 11){
                        speakOutput += ' dos tres';
                    }
                    else if(sessionAttributes.result <= 15){
                        speakOutput += ' good';
                    }
                    sessionAttributes.turn = 0;
                    sessionAttributes.result = 0;
                    break;
            }
        }
        else if(sessionAttributes.queTest === 1){
                
            switch(sessionAttributes.turn){
                case 0:
                    speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';
                    speakOutput += 'Pregunta numero 1. <break time="50ms"/> "Como frutas y verduras todos los días"';
                    sessionAttributes.turn++;
                    break;
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero 2. <break time="50ms"/> "Evito comer en restaurantes de comida rápida"';
                    sessionAttributes.turn++;
                    break;
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero 3. <break time="50ms"/> "Soy consciente y mantengo mi peso controlado"';
                    sessionAttributes.turn++;
                    break;
                case 3:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Obtuviste ' + sessionAttributes.result + ' de 15 puntos.';
                    if(sessionAttributes.result <= 7){
                        speakOutput += ' Te fue mal';
                    }
                    else if(sessionAttributes.result <= 11){
                        speakOutput += ' dos tres';
                    }
                    else if(sessionAttributes.result <= 15){
                        speakOutput += ' good';
                    }
                    sessionAttributes.turn = 0;
                    sessionAttributes.result = 0;
                    break;
            }
        }
    
        
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
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
        const speakOutput = 'Goodbye!';
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
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

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
        FisicaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
