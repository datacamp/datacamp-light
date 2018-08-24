const env = process.env.NODE_ENV;
const ecsEnv = process.env.ECS_ENV || "development";

export default {
  ecsEnv,
  env,
  isDevelopmentDomain: () => ecsEnv === "development" || ecsEnv === "dev",
  isProductionDomain: () => ecsEnv === "production",
  isProductionMode: () => env === "production",
  urls: (e => {
    switch (e) {
      case "dev":
      case "development":
        return {
          assets: "https://assets.datacamp.com",
          datacamp: "https://dev.datacamp.com/",
          imb: "https://imb.datacamp-dev.com",
          multiplexer: "https://multiplexer.datacamp-dev.com",
          projector: "https://projector-dev.herokuapp.com",
          rdoc: "https://dev.rdocumentation.org",
          slackNotifierUrl:
            "https://5s1ofv9y84.execute-api.us-east-1.amazonaws.com/dev/rstudio",
          teach: "https://dev.datacamp.com/teach/",
          timetracker: "https://dc-timetracker-staging.herokuapp.com/timetrack",
        };
      case "staging":
        return {
          assets: "https://assets.datacamp.com",
          datacamp: "https://staging.datacamp.com/",
          imb: "https://imb.datacamp-staging.com",
          multiplexer: "https://multiplexer.datacamp-staging.com",
          projector: "https://projector-staging.herokuapp.com",
          rdoc: "https://staging.rdocumentation.org",
          slackNotifierUrl:
            "https://5s1ofv9y84.execute-api.us-east-1.amazonaws.com/dev/rstudio",
          teach: "https://staging.datacamp.com/teach/",
          timetracker: "https://dc-timetracker-staging.herokuapp.com/timetrack",
        };
      default:
        return {
          assets: "https://assets.datacamp.com",
          betaMultiplexer: "https://multiplexer-beta.datacamp.com",
          datacamp: "https://www.datacamp.com/",
          imb: "https://imb.datacamp.com",
          multiplexer: "https://multiplexer-prod.datacamp.com",
          projector: "https://projector-prod.herokuapp.com",
          rdoc: "https://www.rdocumentation.org",
          slackNotifierUrl:
            "https://5s1ofv9y84.execute-api.us-east-1.amazonaws.com/dev/rstudio",
          teach: "https://www.datacamp.com/teach/",
          timetracker: "https://dc-timetracker.herokuapp.com/timetrack",
        };
    }
  })(ecsEnv),
};
