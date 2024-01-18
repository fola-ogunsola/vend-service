import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;

export const VALIDATE_AUTH_TOKEN_MIDDLEWARE = 'AuthMiddleware::checkSecurityCode';

export const VALIDATE_UNIQUE_REFERENCE_ID = 'AuthMiddleware::checkUniqueRefNum';

export const VALIDATE_UNIQUE_CREDENTIALS = 'Controller::processVendingRequest';

export const VALIDATE_DATA_MIDDLEWARE = 'Middleware::validateData'

export const COMPARE_ACCECC_KEY_MIDDLEWARE = 'UserAuthMiddleware::compareAccessKey';
