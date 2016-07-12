/**
 * Created by GiangDH on 7/9/16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import { KShareRoutes } from './routes/kshare.routes';
import { AdminRoutes } from './routes/admin.routes';

export const routes: RouterConfig = [
  ...KShareRoutes,
  ...AdminRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
