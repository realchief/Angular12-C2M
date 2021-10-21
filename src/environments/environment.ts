// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// This environment file is not used in production env.

export const environment = {
  production: false,
  Setting: {
    dateFormat: 'dd/MM/yyyy',
    dateUsFormat: 'MM/dd/yyyy',
    dateTimeFormat: 'dd/MM/yyyy hh:mm:ss',
    dateTimeFormatmin: 'MM/dd/yyyy hh:mm a',
    dateTimeFormat1: 'MM/dd/yyyy HH:mm:ss',
    dateTimeFormat2: 'dd/MM/yyyy hh:mm:ss a',
    dateTimeFormatNoSeconds: 'dd/MM/yyyy hh:mm a',
    BaseAPIUrl: 'https://cloud-staging-icewebapi.c2m.net/api',
    AppKey: "cxsr5nuDjC1PhvVgL5RR4IpHUDRvBx14", 
    AppSecret: "C2M",
    FromEmail: "E-Saleyard@landmark.com.au",
    ADMIN_USERNAME: "henrydejo8",
    ADMIN_USER_PASSWORD: "Plasma1!",
    ADMIN_USER_APIKey: "Y@MWDENW9U@3F6@U0BoT@9EBF/7i1u",
    SuperAdmin:false
  },
  regex: {
    phone: '^[+]?[6][1](?:\\s?\\d){9}$|^[(][0][1-9][)](?:\\s?\\d){8}$|^[0][1-9](?:\\s?\\d){8}$',
    password: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    email: /([-!#-*+/-9=?A-Z^-~]+(\.[-!#-*+/-9=?A-Z^-~]+)*|([]!#-[^-~ \t]|(\\[\t -~]))+)@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * 
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
