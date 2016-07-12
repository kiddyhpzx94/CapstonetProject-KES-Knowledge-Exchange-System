/**
 * Created by GiangDH on 6/8/16.
 */
import 'core-js/es6';
import 'reflect-metadata';
import 'zone.js/dist/zone';
//if (process.env.ENV === 'production') {
//  // Production
//} else {
//  // Development
  Error['stackTraceLimit'] = Infinity;
  require ('zone.js/dist/long-stack-trace-zone');
//}
