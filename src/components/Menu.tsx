// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import React from 'react';

import MenuListItem from './MenuListItem';
import { Volunteer } from '../app/Volunteer';
import slug from '../app/util/Slug';

import BookIcon from '@material-ui/icons/BookOutlined';
import BubbleChartIcon from '@material-ui/icons/BubbleChartOutlined'
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/MovieOutlined';
import PanoramaHorizontalIcon from '@material-ui/icons/PanoramaHorizontalOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) =>
    createStyles({
        debug: {
            padding: theme.spacing.unit * 2,
            paddingTop: theme.spacing.unit
        }
    });

/**
 * Properties accepted by the <Menu> element.
 */
interface Properties {
    /**
     * Setting on whether debug mode should be enabled for this user.
     */
    enableDebug: boolean;

    /**
     * The volunteer for whom the portal is being displayed, if any.
     */
    volunteer?: Volunteer;

    /**
     * Event listener that will be called when something in the menu has been clicked upon.
     */
    onClick: () => void;
}

/**
 * The <Menu> element represents the primary navigation for the volunteer portal. It provides access
 * to each of the primary pages and contains a live display of on-going events for areas.
 */
class Menu extends React.Component<Properties & WithStyles<typeof styles>> {
    render() {
        let debugOptions: JSX.Element | null = null;

        // Users for whom the debug mode is enabled get a number of additional options in the menu
        // that enable them to control and adjust various parts of the application.
        if (this.props.enableDebug) {
            debugOptions = (
                <div>
                    <Divider />

                    <List>

                        <MenuListItem to="/internals" onClick={this.props.onClick}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Internals" />
                        </MenuListItem>

                    </List>
                </div>
            );
        }

        // Link to the page that contains the schedule of the volunteer that's currently logged in,
        // if the user is associated with a volunteer.
        const volunteerScheduleLink =
            this.props.volunteer ? '/volunteers/' + slug(this.props.volunteer.name)
                                 : null;

        return (
            <div>
                <List>

                    <MenuListItem to="/" exact onClick={this.props.onClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overview" />
                    </MenuListItem>

                    { volunteerScheduleLink &&
                        <MenuListItem to={volunteerScheduleLink} exact onClick={this.props.onClick}>
                            <ListItemIcon>
                                <ScheduleIcon />
                            </ListItemIcon>
                            <ListItemText primary="My schedule" />
                        </MenuListItem>
                    }

                </List>

                <Divider />

                <List>

                    <MenuListItem to="/volunteers" exact onClick={this.props.onClick}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Volunteers" />
                    </MenuListItem>

                </List>

                <Divider />

                {/* TODO: It'd be great to specify these in the program JSON.. not quite sure how
                          that would interact with WebPack and included SVGs, however. */}
                <List>

                    <MenuListItem to="/schedule/floor/0" onClick={this.props.onClick}>
                        <ListItemIcon>
                            <BubbleChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Halls" />
                    </MenuListItem>

                    <MenuListItem to="/schedule/floor/1" onClick={this.props.onClick}>
                        <ListItemIcon>
                            <BookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ports" />
                    </MenuListItem>

                    <MenuListItem to="/schedule/floor/2" onClick={this.props.onClick}>
                        <ListItemIcon>
                            <PanoramaHorizontalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Conference" />
                    </MenuListItem>

                    <MenuListItem to="/schedule/floor/3" onClick={this.props.onClick}>
                        <ListItemIcon>
                            <MovieIcon />
                        </ListItemIcon>
                        <ListItemText primary="Docks" />
                    </MenuListItem>

                </List>

                {debugOptions}

            </div>
        );
    }
}

export default withStyles(styles)(Menu);
