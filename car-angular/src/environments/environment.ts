// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
  apiEndpointMS1:"http://localhost:7601/car/api/admin",
  apiEndpointMS1Common:"http://localhost:7601/car/api/",
  apiEndpointMS1User:"http://localhost:7601/car/api/user",
  apiEndpointMS2:"http://localhost:7602/car/api/admin",
  placeHolderImage:'http://res.cloudinary.com/dlhkpit1h/image/upload/v1569584744/ukbck5dsrgmedia7ggkz.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
