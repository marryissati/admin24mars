import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';


import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import Router from "next/router";


import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { Avatar, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiPaper-root": {
      background: "var(--primary-color) !important",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    width: "100%",
    height: "100%",
    marginTop: "5rem",
  },
  userInfo: {
    padding: "0.55rem 0.5rem",
  },
  newBtn: {
    background: "#eee",
    outline: "none",
    border: "none",
    borderRadius: "25px",
    fontSize: "14px",
    width: "100%",
    margin: "auto",
    padding: "0.8rem 0",
    cursor: "pointer",
    fontWeight: "bold",
  },
}));

export function ResponsiveDrawer(props) {
  const { window, user } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Grid container className={classes.userInfo} justify="center">
        <Grid item xs={2}>
          <Avatar src={user.picture} />
        </Grid>
        <Grid item xs={8} style={{ marginLeft: "5px" }}>
          <Typography
            style={{
              color: "#fff",
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "20px"
            }}
          >
            {user.name}
          </Typography>
          <Typography style={{ color: "#ccc", fontWeight: "bold" }} variant="body2">
            User
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <div style={{ padding: "1rem 1rem 0 1rem" }}>

      </div>

      <List style={{ color: "#fff", }}>
        {["Dashboard"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon style={{ color: "#fff" }} />
                ) : (
                  <MailIcon style={{ color: "#fff" }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div >
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{ height: "50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", }}>
          <span></span>
          <span onClick={() => Router.push("/api/logout")}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-around", cursor: "pointer", fontWeight: "600", width: "110px", }}>
            Log Out
             <ExitToAppIcon style={{ color: "white" }} />
          </span>
        </div>

        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
