import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    SEND_GRID_API_KEY: Joi.string().required(),
    CLIENT_ID: Joi.string().required(),
    BROKER: Joi.string().required(),
    AUTH_TOKEN: Joi.string().required(),
    ACCOUNT_SID: Joi.string().required(),
    TWILIO_PHONE_NUMBER: Joi.number().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  sendGrid: envVars.SEND_GRID_API_KEY,
  clientId: envVars.CLIENT_ID,
  broker: envVars.BROKER,
  sid: envVars.ACCOUNT_SID,
  token: envVars.AUTH_TOKEN,
  phoneNumber: envVars.TWILIO_PHONE_NUMBER,
};

export default config;
