import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Logo from "../header/Logo";
import NavigationItemsList from "../header/NavigationItemsList";
import ProfileButton from "../header/ProfileButton";

const styles = ({ palette, breakpoints, spacing }: Theme) => createStyles({
    navigationBar: {
        flexGrow: 1,
        padding: spacing.unit * 0.5,
        [breakpoints.down('sm')]: {
            display: "none",
        },
    },
    mobileNavigationBar: {
        [breakpoints.up('md')]: {
            display: "none"
        },
        padding: "0px"
    },
    dropdownMenu: {
        width: "100%",
        backgroundColor: palette.primary.main
    },
    dropdownMenuItems: {
        padding: spacing.unit,
        width: "100%",
        flexDirection: "column"
    }
});

export interface Props extends WithStyles<typeof styles> { }

export interface State{
    isMobileMenuOpen: boolean;
}


class Header extends React.Component<Props> {
    state: State = {
        isMobileMenuOpen: false
    };

    onMobileMenuClick = () => {
        this.setState((previousState: State) => ({
            isMobileMenuOpen: !previousState.isMobileMenuOpen
        }));
    }

    closeMobileMenu = () => {
        this.setState({
            isMobileMenuOpen: false
        });
    }

    render() {
        const { classes } = this.props;

        const navigationBar = (
            <Toolbar className={classes.navigationBar}>
                <Logo />
                <NavigationItemsList />
                <ProfileButton />
            </Toolbar>
        );

        const mobileNavigtionBar = (
            <Toolbar className={classes.mobileNavigationBar}>
                <ExpansionPanel expanded={this.state.isMobileMenuOpen} className={classes.dropdownMenu}>
                    <ExpansionPanelSummary onClick={this.onMobileMenuClick} expandIcon={<ExpandMoreIcon />}>
                        <Logo />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails onClick={this.closeMobileMenu} className={classes.dropdownMenuItems}>
                        <NavigationItemsList />
                        <ProfileButton />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Toolbar>
        );

        return (
            <AppBar position="fixed">
                { navigationBar }
                { mobileNavigtionBar }
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);