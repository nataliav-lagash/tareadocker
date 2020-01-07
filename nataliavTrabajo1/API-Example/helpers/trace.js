const appInsights = require("applicationinsights");
var config = require('../settings/appsettings.secrets.json');

let client;
const { APPLICATION_INSIGHTS_INSTRUMENTATION_KEY } = config;

const init = async function () {
  try {
    if (client !== undefined) {
      return client;
    }

    //const config = await secrets.commonConfig();
    const instrumentationKey = APPLICATION_INSIGHTS_INSTRUMENTATION_KEY;
    //const instrumentationKey = config.instrumentationKey;

    appInsights.setup(instrumentationKey)
      .setAutoDependencyCorrelation(true)
      .setAutoCollectRequests(true)
      .setAutoCollectPerformance(true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true)
      .setUseDiskRetryCaching(true)
      .start();

    appInsights.defaultClient.commonProperties = {
      environment: process.env.APPLICATION_ENV,
      appVersion: process.env.APP_VERSION
    };

    client = appInsights.defaultClient;
    return client;
  } catch (e) {
    throw e;
  }
}

const trackEvent = function (nameCustomEvent, customProperty) {
  if (customProperty === undefined) {
    customProperty = {};
  }
  init().then(() => {
    console.log(`nameCustomEvent: ${nameCustomEvent}  customProperty: ${JSON.stringify(customProperty)}`)
    client.trackEvent({ name: nameCustomEvent, properties: customProperty });
  });
}

const trackException = function (exception) {
  init().then(() => {
    if (exception && exception.stack && exception.message) {
      console.log(exception.message);
      client.trackException({ exception });
      return this;
    }

    if (exception) {
      console.log(exception);
      client.trackException({ exception: new Error(exception) });
    }
  });
}

const trackMetric = function (customName, customValue) {
  init().then(() => {
    console.log(`customName: ${customName}  customValue: ${String(customValue)}`);
    client.trackMetric({ name: customName, value: customValue });
  });
}

const trackTrace = function (customMessage) {
  init().then(() => {
    console.log(`customMessage: ${customMessage}`);
    client.trackTrace({ message: customMessage });
  });
}

const trackRequest = function (customName, url, duration, resultCode, success) {
  init().then(() => {
    console.log(`customName: ${customName}  url: ${url}  duration: ${String(duration)}  resultCode: ${String(resultCode)}  success: ${String(success)}`);
    client.trackRequest({
      name: customName, url, duration, resultCode, success
    });
  });
}

module.exports = {
  trackEvent, trackException, trackMetric, trackTrace, trackRequest
};
