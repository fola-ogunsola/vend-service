import { devEnv, prodEnv, testEnv } from './env/index';

const { PROJECT_NODE_ENV } = process.env;

const config = PROJECT_NODE_ENV === 'development' ? devEnv
  : PROJECT_NODE_ENV === 'production' ? prodEnv
    : testEnv;

export default config;
