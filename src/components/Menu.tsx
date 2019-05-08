// Copyright 2019 Peter Beverloo. All rights reserved.
// Use of this source code is governed by the MIT license, a copy of which can
// be found in the LICENSE file.

import React from 'react';

import Event from '../app/Event';
import { Floor } from '../app/Floor';
import MenuListItem from './MenuListItem';
import MenuSessionIndicator from './MenuSessionIndicator';
import slug from '../app/util/Slug';

import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsIcon from '@material-ui/icons/Settings';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * Properties accepted by the <Menu> element.
 */
interface Properties {
    /**
     * Setting on whether debug mode should be enabled for this user.
     */
    enableDebug: boolean;

    /**
     * The event for which the menu is being displayed.
     */
    event: Event;

    /**
     * Event listener that will be called when something in the menu has been clicked upon.
     */
    onClick: () => void;
}

/**
 * The <Menu> element represents the primary navigation for the volunteer portal. It provides access
 * to each of the primary pages and contains a live display of on-going events for areas.
 */
class Menu extends React.Component<Properties> {
    render() {
        const { event } = this.props;

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

        const floors = event.getFloors();
        const volunteer = event.getCurrentVolunteer();

        // Determine name to for the Volunteers menu item
        // Only show as Volunteers if you have access to more than one group.
        const volunteerGroups = Array.from(event.getVolunteerGroups());
        const volunteerGroupName = volunteerGroups.length > 1 ?
            'Volunteers' : volunteerGroups[0].label;

        // Link to the page that contains the schedule of the volunteer that's currently logged in,
        // if the user is associated with a volunteer.
        const volunteerScheduleLink = volunteer ? '/volunteers/' + slug(volunteer.name)
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
                        <ListItemText primary={volunteerGroupName} />
                    </MenuListItem>

                </List>

                <Divider />

                <List>

                    { Array.from(floors).map((floor: Floor) => {
                        const destination = '/schedule/floors/' + floor.id + '/' + slug(floor.label);

                        return (
                            <MenuListItem
                                key={floor.id}
                                to={destination}
                                onClick={this.props.onClick}>

                                { floor.icon && <ListItemIcon>
                                                    <SvgIcon nativeColor={floor.iconColor}>
                                                        <use xlinkHref={floor.icon} />
                                                    </SvgIcon>
                                                </ListItemIcon> }

                                <ListItemText primary={floor.label} />

                                { /* TODO: Include a count of active sessions in this location. */ }
                                <MenuSessionIndicator color={floor.iconColor} count={0} />

                            </MenuListItem>
                        );
                    }) }

                </List>

                {debugOptions}

            </div>
        );
    }
}

export default Menu;
