const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "junit",

  reporterOptions: {
    mochaFile: "tests/test-output-[hash].xml",
    toConsole: true,
    attachments: true,
  },

  video: false,
  viewportHeight: 720,
  viewportWidth: 1300,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
