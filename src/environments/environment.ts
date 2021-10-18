// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// This environment file is not used in production env.

export const environment = {
  production: false,
  Setting: {
    BaseAPIUrl: 'https://cloud-staging-icewebapi.c2m.net/api/',
    AppKey: "cxsr5nuDjC1PhvVgL5RR4IpHUDRvBx14", 
    AppSecret: "C2M",
    FromEmail: "E-Saleyard@landmark.com.au",
    ADMIN_USERNAME: "henrydejo8",
    ADMIN_USER_PASSWORD: "Plasma1!",
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
