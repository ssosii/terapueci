const Encore = require('@symfony/webpack-encore');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('common', './assets/frontend/common/index.js')

    .addEntry('index', './assets/frontend/views/index/index.js')
    .addEntry('auth', './assets/frontend/views/auth/index.js')
    .addEntry('appointment-info', './assets/frontend/views/appointment-info/index.js')

    .addEntry('pages-work-with-us', './assets/frontend/views/pages/work-with-us/index.js')
    .addEntry('appointment-order', './assets/frontend/views/apointment-order.js')

    // .addEntry('service', './assets/frontend/views/service/index.js')
    // .addEntry('donor', './assets/frontend/views/donor/index.js')
    // .addEntry('blog', './assets/frontend/views/blog/index.js')
    // .addEntry('blog-single', './assets/frontend/views/blog-single/index.js')
    // .addEntry('patient', './assets/frontend/views/patient/index.js')
    // .addEntry('page', './assets/frontend/views/page/index.js')
    // .addEntry('security', './assets/frontend/views/security/index.js')


    .addEntry('panel-specialist', './assets/frontend/views/panel/specialist/index.js')

    .addEntry('panel-patient', './assets/frontend/views/panel/patient/index.js')
    .addEntry('patient-profile', './assets/frontend/views/patient/profile/index.js')

    .addEntry('doctor-order', './assets/frontend/views/doctor/order/index.js')
    .addEntry('doctor-list', './assets/frontend/views/doctor/list/index.js')
    .addEntry('pages', './assets/frontend/views/pages/index.js')
    .addEntry('pages-faq', './assets/frontend/views/pages/faq.js')




    .addEntry('admin-common', './assets/admin/common/index.js')
    .addEntry('admin-index', './assets/admin/views/index/index.js')
    .addEntry('admin-list', './assets/admin/views/common/list.js')
    .addEntry('admin-doctor-edit', './assets/admin/views/doctor/edit.js')

    .addEntry('admin-promo-code-create', './assets/admin/views/promo-code/create.js')


    .addEntry('admin-create-doctor', './assets/admin/views/doctor/create.js')
    .addEntry('admin-edit-doctor', './assets/admin/views/doctor/edit.js')
    .addEntry('admin-create-promo-code', './assets/admin/views/promo-code/create.js')

    .addEntry('admin-create-category', './assets/admin/views/category/create.js')
    .addEntry('admin-edit-category', './assets/admin/views/category/edit.js')

    .addEntry('admin-langue-create', './assets/admin/views/langue/create.js')
    .addEntry('admin-langue-edit', './assets/admin/views/langue/edit.js')
    
    .addEntry('admin-cms-homepage', './assets/admin/views/cms/homepage.js')
    .addEntry('admin-cms-work-with-us', './assets/admin/views/cms/workWithUs.js')
    .addEntry('admin-cms-for-company', './assets/admin/views/cms/for-company.js')
    .addEntry('admin-cms-pricing', './assets/admin/views/cms/pricing.js')
    .addEntry('admin-cms-faq', './assets/admin/views/cms/faq.js')
    .addEntry('admin-newsletter', './assets/admin/views/newsletter/index.js')
    
    


    // .addEntry('admin-page-setting', './assets/admin/views/page-setting/index.js')
    // .addEntry('admin-page-home', './assets/admin/views/page-home/index.js')
    // .addEntry('admin-blog', ['regenerator-runtime/runtime', './assets/admin/views/blog/index.js'])
    // .addEntry('admin-page-about', './assets/admin/views/page-about/index.js')
    // .addEntry('admin-page-price', './assets/admin/views/page-price/index.js')
    // .addEntry('admin-page-patient', './assets/admin/views/page-patient/index.js')
    // .addEntry('admin-page-donor', './assets/admin/views/page-donor/index.js')

    // .addEntry('admin-user-list', './assets/admin/views/user/list.js')
    // .addEntry('admin-user-single', './assets/admin/views/user-single/index.js')

    // .addEntry('admin-education-list', './assets/admin/views/education-list/index.js')
    // .addEntry('admin-advice-list', './assets/admin/views/advice-list/index.js')
    // .addEntry('admin-message-list', './assets/admin/views/message-list/index.js')


    // .addEntry('admin-recording', './assets/admin/views/recording/index.js')


    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    // .enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    // .splitEntryChunks()

    // .enableVersioning()
    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .copyFiles([
        {
            from: './assets/frontend/images',
            to: 'images/[path][name].[hash:8].[ext]'
        },
        {
            from: './assets/admin/images',
            to: 'images/[path][name].[hash:8].[ext]'
        },
        {
            from: './assets/frontend/fonts',
            to: 'fonts/[path][name].[ext]'
        }
    ])

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()
    //#todo
    // .enablePostCssLoader()

    .enablePreactPreset()

    // .addPlugin(
    //     new MiniCssExtractPlugin({
    //         ignoreOrder: true
    //     })
    // )

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
    ;

const config = Encore.getWebpackConfig();

config.resolve.alias['react'] = 'preact/compat';
config.resolve.alias['react-dom'] = 'preact/compat';
module.exports = config;

// module.exports = Encore.getWebpackConfig();
