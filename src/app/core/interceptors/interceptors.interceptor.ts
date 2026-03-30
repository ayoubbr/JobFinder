import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorsInterceptor: HttpInterceptorFn = (req, next) => {


  req + '?apikey=twbtdbsatvbstbsm';
  
  return next(req);
};
