'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            FACTS: [
                'Donald Trumps middle name is John.',
                'Donald Trump was born June 14, 1946 in Queens.',
                'In 1971, he took charge of Elizabeth Trump and Son, later renamed The Trump Organization.',
                'Donald Trump owned the Miss USA and Miss Universe beauty pageants from 1996 to 2015.',
                'From 2004 to 2015, Donald Trump hosted The Apprentice.',
                'At age 13 Donald Trump was enrolled in the New York Military Academy. His parents thought he needed more discipline.',
                'Donald Trump was paid $375,000 per episode of The Apprentice.',
                'Because his brother was an alcoholic and died because of an addiction in 1982, Donald Trump does not drink alcohol.',
                'In 2007, Trump became the 2,327th star on the Hollywood Walk of Fame.',
                'Donald Trump, before winning the 2016 Presidential Election, told President Obama that if he ended his term early, he was welcome to frequent any of the Trump golf courses.',
                'Trump has 5 children: Barron, Tiffany, Ivanka, Eric, and Don Junior.',
                'On June 16, 2015, Donald Trump announced his candidacy for President of the United States.',
                'Then Indiana Governor Mike Pence was officially named Trumps then Vice President pick on July 16, 2016.',
                'Donald Trump has had three wives: Ivana Trump, Marla Maples and current spouse, Melania Trump.',
                'Donald Trump stands tall at 6 feet and 3 inches.',
                'A bottle of mineral water from the mini bar at the Trump International Hotel & Tower in Chicago will cost you $25.',
                'Donald Trump sends approximately 372 Tweets a month.',
                'President Trump owns 16 high-end golf courses around the world.',
                'Donald Trump owned 14,000 apartments by the time he was 27.',
                'Trump has said that he has $400 million in spendable, liquid assets, annually.',
                'The real estate mogul and President Donald Trump had his own board game, Trump The Game.',
            ],
            SKILL_NAME: 'Donald Trump Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me something about President Trump, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
