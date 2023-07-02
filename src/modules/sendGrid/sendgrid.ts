import { setApiKey, send } from '@sendgrid/mail';
import config from '../../config/config';

setApiKey(config.sendGrid);

export default send;
