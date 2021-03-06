// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

/**
 * Boolean to indicate whether the current build environment is production or development. API calls
 * will be incepted and mocked out for development.
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Directory in which the API calls reside. Development calls will be routed to a different place to
 * avoid naming conflicts, in case both directories are deployed to the same domain.
 */
const directory = isProduction ? 'api' : 'api-dev';

/**
 * Path to the environment configuration file, relative to the server root.
 */
export const EnvironmentConfigPath = `/${directory}/environment`;

/**
 * Path to the service that enables users to log in. Their details will be send here in a POST
 * request, and a JSON response is expected.
 */
export const UserLoginPath = `/${directory}/login`;

/**
 * @see https://material-ui.com/customization/themes/
 */
export const AppTheme = {
    palette: {
        primary: {
            main: '#1565c0'
        }
    },
    typography: {
        useNextVariants: true,
    },
};

/**
 * Proxy to the fetch() function that can be mocked when in development.
 *
 * @param input The string or Request object that should be fetched.
 * @param init Configuration with which the fetch should be initialized. (Optional.)
 * @return Promise that will resolve with a Response when the fetch is successful, or reject with
 *         an exception if the fetch could not be completed.
 */
export function mockableFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    if (!isProduction) {
        // Replace the |init| RequestInit for non-GET requests. This is necessary because the
        // WebpackDevServer included with react-scripts cannot deal with non-GET requests.
        if (init && init.method !== 'GET')
            return fetch(input);
    }

    return fetch(input, init);
}
