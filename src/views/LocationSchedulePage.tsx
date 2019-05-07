// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import React from 'react';

import Clock from '../app/Clock';
import { Floor } from '../app/Floor';
import { Location } from '../app/Location';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) =>
    createStyles({
        // TODO: Define the styles for this element.
    });

/**
 * Properties accepted by the <LocationSchedulePage> element.
 */
interface Properties {
    /**
     * Clock used to determine the active and upcoming sessions for this page.
     */
    clock: Clock;

    /**
     * The location for which this page is being rendered.
     */
    location: Location;
}

/**
 * The location page displays an overview of a particular location, focused on the events that will
 * take place in that location.
 */
class LocationSchedulePage extends React.Component<Properties & WithStyles<typeof styles>> {
    /**
     * Returns a textual description of the given |floor|.
     */
    private getFloorIdentifier(floor: Floor): string {
        const ordinalIndicators = ['st', 'nd', 'rd'];

        let floorIndicator = null;
        switch (floor.id) {
            case 0:
                floorIndicator = 'ground';
                break;
            default:
                // https://community.shopify.com/c/Shopify-Design/Ordinal-Number-in-javascript-1st-2nd-3rd-4th/m-p/72156
                floorIndicator =
                    floor.id + ordinalIndicators[((floor.id + 90) % 100 - 10) % 10 - 1] || 'th';
                break;
        }

        return floor.label + ' (' + floorIndicator + ' floor)';
    }

    render() {
        const { classes, location } = this.props;

        const title = location.label;
        const description =
            this.getFloorIdentifier(location.floor) + ' — ' + location.sessions.length + ' sessions';

        return (
            <React.Fragment>

                <Paper square>
                    <List>
                        <ListItem>
                            { location.floor.icon &&
                              <Avatar>
                                  <SvgIcon>
                                      <use xlinkHref={location.floor.icon} />
                                  </SvgIcon>
                              </Avatar> }
                            <ListItemText primary={title} secondary={description} />
                        </ListItem>
                    </List>
                </Paper>


            </React.Fragment>
        );
    }
}

const StyledLocationSchedulePage = withStyles(styles)(LocationSchedulePage);
export { StyledLocationSchedulePage as LocationSchedulePage };