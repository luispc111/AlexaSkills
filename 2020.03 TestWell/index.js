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
        sessionAttributes.queTest = 0;
        /*
            test 0 = Fisica
            test 1 = ...
        */
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        let speakOutput = 'Bienvenido, TestWell te ayudara a conocer tus fortalezas y debilidades en diferentes dimensiones de Salud y Bienestar.';
        speakOutput += 'Para comenzar, necesito que me digas que test quieres tomar, existe el test físico, y otros... .';
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
        
        // TEST DE FÍSICA
        if(sessionAttributes.queTest === 0){
            switch(sessionAttributes.turn){
                case 0:
                    speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5... Pregunta numero 1. Responde: ';
                    sessionAttributes.turn++;
                    break;
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta 2, responde:';
                    sessionAttributes.turn++;
                    break;
                
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta 3, responde: ';
                    sessionAttributes.turn++;
                    break;
                    
                case 3:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.result += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Obtuviste un total de ' + sessionAttributes.result;
                    // if(sessionAttributes.result < 4){
                    //     speakOutput = 'resultados finales' + sessionAttributes.result;
                    // }
                    // else if(sessionAttributes.result < 9){
                    //     speakOutput = 'resultados finales' + sessionAttributes.result;
                    // }
                    sessionAttributes.turn = 0;
                    break;
            }
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// const HelloWorldIntentHandler = {
//     canHandle(handlerInput) {
//         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
//             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
//     },
//     handle(handlerInput) {
//         const speakOutput = '"Hello there!"';
//         return handlerInput.responseBuilder
//             .speak(speakOutput)
//             // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
//             .getResponse();
//     }
// };

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
