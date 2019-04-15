// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Environment from './Environment';
import FatalError from '../layouts/FatalError';

// Main runtime of the volunteer portal. Constructed on pageload. Initialisation
// may happen asynchronously as part of the initialize() method.
class Application {
    // Container in which the application should be rendered.
    container: Element;

    // Environment under which the application is running—a single deployment of
    // the volunteer portal is able to service multiple groups of volunteers.
    environment: Environment;

    constructor(container : Element) {
        this.container = container;
        this.environment = new Environment();
    }

    async initialize() {
        await this.environment.initialize();

        // The environment must be fully available in order to determine the
        // next steps in routing to the appropriate page.
        if (!this.environment.isAvailable()) {
            ReactDOM.render(<FatalError />, this.container);
            return;
        }

        // TODO: Render and enforce the login page.
        // TODO: Render the volunteer portal.
    }
}

export default Application;