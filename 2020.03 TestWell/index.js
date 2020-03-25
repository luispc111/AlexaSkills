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
        sessionAttributes.counter = 1;
        
        sessionAttributes.resultTotal       = 0;
        sessionAttributes.resultFisico      = 0;
        sessionAttributes.resultNutricion   = 0;
        sessionAttributes.resultCuidado     = 0;
        sessionAttributes.resultEmocional   = 0;
        sessionAttributes.resultIntelectual = 0;
        sessionAttributes.resultEspiritual  = 0;

        sessionAttributes.bigResult = 0;
        sessionAttributes.bigDimension = 0;
        sessionAttributes.smallResult = 0;
        sessionAttributes.smallDimension = 0;

        sessionAttributes.turn = 0;
        /*
            turn 0 = intro + first question
            turn 1 = second question
            turn 2 = third question
            turn 3 = results
        */
        sessionAttributes.queTest = 0;
        /*
            test 1 = Física
            test 2 = Nutrición
            test 3 = Cuidado Personal
            test 4 = Emocional
            test 5 = Intelectual
            test 6 = Espiritual
        */
        sessionAttributes.testCompleto = 0;
        /*
            nope = 0
            testCompleto = 1
        */
        
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        
        let speakOutput = 'Bienvenido, TestWell te ayudara a conocer tus fortalezas y debilidades en diferentes dimensiones de Salud y Bienestar. ';
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
        
        if(sessionAttributes.turn === 0){
            a = Alexa.getSlot(handlerInput.requestEnvelope, "testInput");
            if(sessionAttributes.testCompleto !== 1){
                sessionAttributes.queTest = Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.id);
            }
        }
        
        // Si se eligio el test completo, que empiece desde el inicio
        if(sessionAttributes.queTest === 0){
            sessionAttributes.queTest = 1;
            sessionAttributes.testCompleto = 1;
        }
        
        // TEST DE FÍSICA 1
        if(sessionAttributes.queTest === 1){
                
            switch(sessionAttributes.turn){
                case 0:
                    speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Hago ejercicio 3 veces por semana"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultFisico += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Hago 5 minutos de estiramiento todos los días"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultFisico += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Mis amigos y familiares me animan a tener una vida activa"';
                    
                    if(sessionAttributes.testCompleto === 1){
                        
                        // sessionAttributes.bigResult = sessionAttributes.resultFisico;
                        // sessionAttributes.smallResult = sessionAttributes.resultFisico;
                        // sessionAttributes.bigDimension = 1;
                        // sessionAttributes.smallDimension = 1;


                        sessionAttributes.queTest = 2;
                        sessionAttributes.turn = 0;
                        sessionAttributes.counter++;
                    }
                    else{
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    }
                    break;
                case 3:
                    if(sessionAttributes.testCompleto !== 1){
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultFisico += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultFisico + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultFisico <= 7){
                            speakOutput += 'Aquí hay algo que se puede mejorar. ';
                            if(random === 1){
                                speakOutput += 'Empieza realizando pequeñas actividades físicas, como salir a trotar o estirar por las mañanas. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Empieza a hacer ejercicio de forma más conciente. ¡Hazlo por ti!. ';
                            }
                            else{
                                speakOutput += 'Evita descuidar tu cuerpo, el ejercicio es una gran manera de cuidarlo. ';
                            }
                        }
                        else if(sessionAttributes.resultFisico <= 11){
                            speakOutput += '¡Nada mal! Pero aún puedes mejorar tu estado físico. ';
                            if(random === 1){
                                speakOutput += 'No descuides el ejercicio, ¡tu puedes!. ';
                            }
                            else if(random === 2){
                                speakOutput += 'No dejes de hacer ejercicio, verás que te hará muy bien. ';
                            }
                            else{
                                speakOutput += 'Espero que ya hayas estirado tus cinco minutos de hoy. ';
                            }
                        }
                        else if(sessionAttributes.resultFisico <= 15){
                            speakOutput += '¡Bien! Sigue de la misma forma y tu cuerpo te lo agradecerá. ';
                            if(random === 1){
                                speakOutput += 'Recuerda que un pilar de la dimensión física es conocer tus límites. ';
                            }
                            else if(random === 2){
                                speakOutput += 'La actividad física que hagas el día de hoy puede impactar altamente tu calidad de vida en la vejez. ';
                            }
                            else{
                                speakOutput += 'Tu estado físico es uno de los 6 pilares del bienestar, sigue cuidandolo. '
                            }
                        }
                        speakOutput += 'Para realizar otro test, solo pidelo. ';
                        sessionAttributes.turn = 0;
                        sessionAttributes.resultFisico = 0; 
                    }
                    break;
            }
        }

        // TEST NUTRICIÓN 2
        else if(sessionAttributes.queTest === 2){
                
            switch(sessionAttributes.turn){

                case 0:
                    if(sessionAttributes.testCompleto !== 1){
                        speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';   
                    }
                    else{
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultFisico += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);

                        sessionAttributes.bigResult = sessionAttributes.resultFisico;
                        sessionAttributes.smallResult = sessionAttributes.resultFisico;
                        sessionAttributes.bigDimension = 1;
                        sessionAttributes.smallDimension = 1;
                    }
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Como frutas y verduras todos los días"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultNutricion += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Evito comer en restaurantes de comida rápida"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultNutricion += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Soy consciente y mantengo mi peso controlado"';
                    
                    if(sessionAttributes.testCompleto === 1){
                        
                        sessionAttributes.queTest = 3;
                        sessionAttributes.turn = 0;
                        sessionAttributes.counter++;
                    }
                    else{
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    }
                    break;
                
                case 3:
                    
                    if(sessionAttributes.testCompleto !== 1){
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultNutricion += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultNutricion + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultNutricion <= 7){
                            speakOutput += 'Te fue mal. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultNutricion <= 11){
                            speakOutput += 'dos tres. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultNutricion <= 15){
                            speakOutput += 'good. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        sessionAttributes.turn = 0;
                        sessionAttributes.resultNutricion = 0;
                    }
                    break;
            }
        }

        // TEST CUIDADO PERSONAL 3
        else if(sessionAttributes.queTest === 3){

            switch(sessionAttributes.turn){

                case 0:
                    if(sessionAttributes.testCompleto !== 1){
                        speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';   
                    }
                    else{
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultNutricion += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);

                        if(sessionAttributes.resultNutricion > sessionAttributes.bigResult){
                            sessionAttributes.bigResult = sessionAttributes.resultNutricion;
                            sessionAttributes.bigDimension = 2;
                        }
                        else if(sessionAttributes.resultNutricion < sessionAttributes.smallResult){
                            sessionAttributes.smallResult = sessionAttributes.resultNutricion;
                            sessionAttributes.smallResult = 2;
                        }
                    }
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Evito el uso del tabaco en general"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultCuidado += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Uso protector solar"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultCuidado += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Me limpio los dientes a diario"';
                    
                    if(sessionAttributes.testCompleto === 1){
                        sessionAttributes.queTest = 4;
                        sessionAttributes.turn = 0;
                        sessionAttributes.counter++;
                    }
                    else{
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    }
                    break;
                
                case 3:
                    
                    if(sessionAttributes.testCompleto !== 1){
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultCuidado += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultCuidado + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultCuidado <= 7){
                            speakOutput += 'Te fue mal. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultCuidado <= 11){
                            speakOutput += 'dos tres. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultCuidado <= 15){
                            speakOutput += 'good. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        sessionAttributes.turn = 0;
                        sessionAttributes.resultCuidado = 0;
                    }
                    break;
            }
        }

        // TEST EMOCIONAL 4
        else if(sessionAttributes.queTest === 4){
        
            switch(sessionAttributes.turn){

                case 0:
                    if(sessionAttributes.testCompleto !== 1){
                        speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';   
                    }
                    else{
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultCuidado += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);

                        if(sessionAttributes.resultCuidado > sessionAttributes.bigResult){
                            sessionAttributes.bigResult = sessionAttributes.resultCuidado;
                            sessionAttributes.bigDimension = 3;
                        }
                        else if(sessionAttributes.resultCuidado < sessionAttributes.smallResult){
                            sessionAttributes.smallResult = sessionAttributes.resultCuidado;
                            sessionAttributes.smallResult = 3;
                        }
                    }
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Expreso mis sentimientos y enojos en maneras que no afectan a los demás"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultEmocional += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Establezco objetivos realistas para mi mismo"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultEmocional += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Acepto responsabilidades de mis propios actos"';
                    
                    if(sessionAttributes.testCompleto === 1){
                        sessionAttributes.queTest = 5;
                        sessionAttributes.turn = 0;
                        sessionAttributes.counter++;
                    }
                    else{
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    }
                    break;
                
                case 3:
                    
                    if(sessionAttributes.testCompleto !== 1){
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultEmocional += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultEmocional + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultEmocional <= 7){
                            speakOutput += 'Te fue mal. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultEmocional <= 11){
                            speakOutput += 'dos tres. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultEmocional <= 15){
                            speakOutput += 'good. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        sessionAttributes.turn = 0;
                        sessionAttributes.resultEmocional = 0;
                    }
                    break;
            }
        }

        // TEST INTELECTUAL 5
        else if(sessionAttributes.queTest === 5){
        
            switch(sessionAttributes.turn){

                case 0:
                    if(sessionAttributes.testCompleto !== 1){
                        speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';   
                    }
                    else{
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultEmocional += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);

                        if(sessionAttributes.resultEmocional > sessionAttributes.bigResult){
                            sessionAttributes.bigResult = sessionAttributes.resultEmocional;
                            sessionAttributes.bigDimension = 4;
                        }
                        else if(sessionAttributes.resultEmocional < sessionAttributes.smallResult){
                            sessionAttributes.smallResult = sessionAttributes.resultEmocional;
                            sessionAttributes.smallResult = 4;
                        }
                    }
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Me mantengo informado de Política, Sociedad y temas actuales"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultIntelectual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Busco oportunidades para aprender nuevas cosas"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultIntelectual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Antes de tomar decisiones, busco entender todos los hechos"';
                    
                    if(sessionAttributes.testCompleto === 1){
                        sessionAttributes.queTest = 6;
                        sessionAttributes.turn = 0;
                        sessionAttributes.counter++;
                    }
                    else{
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    }
                    break;
                
                case 3:
                    
                    if(sessionAttributes.testCompleto !== 1){
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultIntelectual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultIntelectual + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultIntelectual <= 7){
                            speakOutput += 'Te fue mal. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultIntelectual <= 11){
                            speakOutput += 'dos tres. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultIntelectual <= 15){
                            speakOutput += 'good. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        sessionAttributes.turn = 0;
                        sessionAttributes.resultIntelectual = 0;
                    }
                    break;
            }
        }

        // TEST ESPIRITUAL 6
        else if(sessionAttributes.queTest === 6){
                
            switch(sessionAttributes.turn){
                case 0:
                    if(sessionAttributes.testCompleto !== 1){
                        speakOutput = 'Te haré una serie de preguntas que tendrás que contestar del 1 al 5, 1 significa en total desacuerdo y 5 significa totalmente de acuerdo. <break time="1s"/>';   
                    }
                    else{
                        a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                        sessionAttributes.resultIntelectual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);

                        if(sessionAttributes.resultIntelectual > sessionAttributes.bigResult){
                            sessionAttributes.bigResult = sessionAttributes.resultIntelectual;
                            sessionAttributes.bigDimension = 5;
                        }
                        else if(sessionAttributes.resultIntelectual < sessionAttributes.smallResult){
                            sessionAttributes.smallResult = sessionAttributes.resultIntelectual;
                            sessionAttributes.smallResult = 5;
                        }
                    }
                    speakOutput += 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Siento que mi vida tiene un propósito positivo"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                case 1:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultEspiritual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Las actividades en mis tiempos libres van de acuerdo a mis valores personales"';
                    sessionAttributes.turn++;
                    sessionAttributes.counter++;
                    break;
                case 2:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultEspiritual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    speakOutput = 'Pregunta numero ' + sessionAttributes.counter + '. <break time="50ms"/> "Soy tolerante a los valores y creencias de los demás"';
                    
                    // if(sessionAttributes.testCompleto === 1){
                    //     sessionAttributes.queTest = 3;
                    //     sessionAttributes.turn = 3;
                    // }
                    // else{
                    // if(sessionAttributes.testCompleto !== 1){
                        sessionAttributes.turn++;
                        sessionAttributes.counter = 1;
                    // }
                    break;
                case 3:
                    a = Alexa.getSlot(handlerInput.requestEnvelope, "numberInput");
                    sessionAttributes.resultEspiritual += Number(a.resolutions.resolutionsPerAuthority[0].values[0].value.name);
                    if(sessionAttributes.testCompleto !== 1){                        
                        speakOutput = 'Obtuviste ' + sessionAttributes.resultEspiritual + ' de 15 puntos. ';
                        let random = Math.floor(Math.random()*(3-1+1)+1);
                        if(sessionAttributes.resultEspiritual <= 7){
                            speakOutput += 'Te fue mal. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultEspiritual <= 11){
                            speakOutput += 'dos tres. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                        else if(sessionAttributes.resultEspiritual <= 15){
                            speakOutput += 'good. ';
                            if(random === 1){
                                speakOutput += 'Fact 1. ';
                            }
                            else if(random === 2){
                                speakOutput += 'Fact 2. ';
                            }
                            else{
                                speakOutput += 'Fact 3. ';
                            }
                        }
                    }
                    else{

                        if(sessionAttributes.resultEspiritual > sessionAttributes.bigResult){
                            sessionAttributes.bigResult = sessionAttributes.resultEspiritual;
                            sessionAttributes.bigDimension = 6;
                        }
                        else if(sessionAttributes.resultEspiritual < sessionAttributes.smallResult){
                            sessionAttributes.smallResult = sessionAttributes.resultEspiritual;
                            sessionAttributes.smallResult = 6;
                        }

                        sessionAttributes.resultTotal = sessionAttributes.resultNutricion + sessionAttributes.resultFisico + sessionAttributes.resultCuidado + sessionAttributes.resultEmocional + sessionAttributes.resultEspiritual + sessionAttributes.resultIntelectual;
                        speakOutput += 'Obtuviste un total de ' + sessionAttributes.resultTotal + ' puntos de 90. ';

                        // speakOutput += 'De los cuales ' + sessionAttributes.resultFisico + ' puntos fueron del test físico, ';
                        // speakOutput += sessionAttributes.resultNutricion + ' puntos fueron del test de nutrición, ';
                        // speakOutput += sessionAttributes.resultCuidado + ' puntos fueron del test de cuidado personal, ';
                        // speakOutput += sessionAttributes.resultEmocional + ' puntos fueron del test de cuidado emocional, ';
                        // speakOutput += sessionAttributes.resultIntelectual + ' puntos fueron del test intelectual y ';
                        // speakOutput += sessionAttributes.resultEspiritual + ' puntos fueron del test espiritual. ';
                        speakOutput += 'La dimensión más fuerte fue ';
                        switch(sessionAttributes.bigDimension){
                            case 1:
                                speakOutput += 'la física ';
                                break;
                            case 2:
                                speakOutput += 'la nutricional ';
                                break;
                            case 3:
                                speakOutput += 'la del cuidado personal ';
                                break;
                            case 4:
                                speakOutput += 'la emocional ';
                                break;
                            case 5:
                                speakOutput += 'la intelectual ';
                                break;
                            case 6:
                                speakOutput += 'la espiritual ';
                                break;
                        }
                        speakOutput += 'con ' + sessionAttributes.bigResult + ' de 15 puntos. ';
                        speakOutput += 'La dimensión más debil fue ';
                        switch(sessionAttributes.smallDimension){
                            case 1:
                                speakOutput += 'la física ';
                                break;
                            case 2:
                                speakOutput += 'la nutricional ';
                                break;
                            case 3:
                                speakOutput += 'la del cuidado personal ';
                                break;
                            case 4:
                                speakOutput += 'la emocional ';
                                break;
                            case 5:
                                speakOutput += 'la intelectual ';
                                break;
                            case 6:
                                speakOutput += 'la espiritual ';
                                break;
                        }
                        speakOutput += 'con ' + sessionAttributes.smallResult + ' de 15 puntos. ';
                    }

                    // restart scores
                    sessionAttributes.resultFisico = 0;
                    sessionAttributes.resultNutricion = 0;
                    sessionAttributes.resultCuidado = 0;
                    sessionAttributes.resultEmocional = 0;
                    sessionAttributes.resultIntelectual = 0;
                    sessionAttributes.resultEspiritual = 0;
                    sessionAttributes.resultTotal = 0;

                    sessionAttributes.bigResult = 0;
                    sessionAttributes.bigDimension = 0;
                    sessionAttributes.smallResult = 0;
                    sessionAttributes.smallDimension = 0;

                    sessionAttributes.turn = 0;
                    sessionAttributes.testCompleto = 0;
                    sessionAttributes.counter = 1;
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
