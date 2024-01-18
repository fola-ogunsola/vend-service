import { devEnv, prodEnv, testEnv } from './env/index';

const { AWAKE_NODE_ENV } = process.env;

const config = AWAKE_NODE_ENV === 'development' ? devEnv
  : AWAKE_NODE_ENV === 'production' ? prodEnv
    : testEnv;

export default config;
