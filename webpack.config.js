const webpack = require( 'webpack' );
const path = require( 'path' );
const autoprefixer = require( 'autoprefixer' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// If there's an error, the console will beep
const SystemBellPlugin = require('system-bell-webpack-plugin');

const config = {
	source:{},
	output:{}
};

// Full path of main files that need to be ran through the bundler.
config.source.scss           = './_src/scss/main.scss';
config.source.js             = './_src/js/main.js';
config.source.auth_js        = './_src/js/auth.js';

// Path where the scss & js should be compiled to.
config.output.scssDirectory  = 'public/css/';       // No trailing slash.
config.output.jsDirectory    = 'public/js/';        // No trailing slash.

// File names of the compiled scss & js.
config.output.scssFileName   = 'asaana-main.min.css';
config.output.jsFileName     = 'asaana-main.min.js';
config.output.authJsFileName = 'asaana-auth.min.js';

var scssConfig = Object.assign( {}, {
	entry: config.source.scss,
	output: {
		filename: config.output.scssFileName,
		path: path.resolve(__dirname, config.output.scssDirectory)
	},
	module: {
		rules: [
			{
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
					]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'file-loader', // Instructs webpack to emit the required object as file and to return its public URL.
					options: {
						name: '[name].[ext]',
						outputPath: config.output.imagesDirectory
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader', // Instructs webpack to emit the required object as file and to return its public URL.
					options: {
						name: '[name].[ext]',
						outputPath: config.output.fontsDirectory
					}
				}
			}
		]
	},
    devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin(config.output.scssFileName),
        new SystemBellPlugin()
	],
    watchOptions: {
        poll: 500
    }
});

var jsConfig = Object.assign( {}, {
	entry: config.source.js,
	output: {
		filename: config.output.jsFileName,
		path: path.resolve(__dirname, config.output.jsDirectory)
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                /*use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }*/
            }
        ]
    },
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin(config.output.jsFileName),
        new SystemBellPlugin(),
	]
} );

var authJsConfig = Object.assign( {}, {
	entry: config.source.auth_js,
	output: {
		filename: config.output.authJsFileName,
		path: path.resolve(__dirname, config.output.jsDirectory)
	},
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                /*use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
				}*/
            }
        ]
    },
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin(config.output.authJsFileName),
        new SystemBellPlugin(),
	]
} );


// Export configuration.
module.exports = [ jsConfig, scssConfig, authJsConfig ];
