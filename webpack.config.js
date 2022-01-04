var Encore = require('@symfony/webpack-encore');
const path = require('path');
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath(path.resolve(__dirname, '_site/build'))

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    .setManifestKeyPrefix('')

    // will create _site/build/app.js and _site/build/app.css
    .addEntry('app', './resources/js/app.js')

    .enablePostCssLoader()
    .enableVueLoader(() => {}, { version: 3, runtimeCompilerBuild: false })
    .enableSourceMaps(!Encore.isProduction())
    .cleanupOutputBeforeBuild()

    // show OS notifications when builds finish/fail
    .enableBuildNotifications()

    .configureBabel()

    .enableSingleRuntimeChunk()
;

const config = Encore.getWebpackConfig();


// export the final configuration
module.exports = config;