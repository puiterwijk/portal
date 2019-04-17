// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import indigo from '@material-ui/core/colors/indigo';

const root = process.env.PUBLIC_URL;

// Path to the environment configuration file, relative to the server root.
export const EnvironmentConfigPath = root + '/data/environment.json';

// Documentation: https://material-ui.com/customization/themes/
export const AppTheme = {
    palette: {
        primary: indigo,
    },
    typography: {
        useNextVariants: true,
    },
};
