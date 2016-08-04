// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
 'firebase': 'vendor/firebase/firebase.js',
 'angularfire2': 'vendor/angularfire2',
 'ng2-bootstrap': 'vendor/ng2-bootstrap',
 '@angular2-material': 'vendor/@angular2-material',
 'moment': 'vendor/moment/moment.js'

};

/** User packages configuration. */
const packages: any = {
 angularfire2: {
   defaultExtension: 'js',
   main: 'angularfire2.js'
 },
 'ng2-bootstrap': {
   format: 'cjs',
   defaultExtension: 'js',
   main: 'ng2-bootstrap.js'
 },
 'moment':{
   format: 'cjs'
 }

};
const materialPkgs:string[] = [
 'core',
 'toolbar',
 'icon',
 'button',
 'sidenav',
 'list',
 'card',
 'input',
 'checkbox',
 'list',
 'progress-circle',
 'progress-bar',
 'radio',
 'sidenav',
 'toolbar',
 'tabs',
 'icon'
];

materialPkgs.forEach((pkg) => {
 packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/input-bar',
  'app/flexchat-message',
  'app/login',
  'app/chat',
  'app/wait',
  'app/formone',
  'app/formtwo',
  'app/success',
  'app/chat-two',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
