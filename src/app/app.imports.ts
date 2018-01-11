// Pipes
import { MomentPipe } from '../pipes/moment.pipe';
import { TemperaturePipe } from '../pipes/temperature.pipe';
import { OrderByPipe } from '../pipes/orderby.pipe';
import { ShortenStringPipe } from '../pipes/shorten.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';


export const PIPES = [
  TemperaturePipe,
  MomentPipe,
  OrderByPipe,
  CapitalizePipe,
  ShortenStringPipe
];
 