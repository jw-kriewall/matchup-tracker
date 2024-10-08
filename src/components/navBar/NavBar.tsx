import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import LoginButton from "../login/LoginButton";
import { useCookies } from "react-cookie";
import { handleTwitterClick } from "../shared/navigateToX";
import { Chip, ListItemIcon } from "@mui/material";
import XIcon from "@mui/icons-material/X";
import { ProfileDropdown } from "../profileDropdown/ProfileDropdown";
import { GoogleDataJson } from "../../types/GoogleDataJson";

export default function NavBar() {
  const [userCookies] = useCookies(["user"]);
  const user: string = userCookies["user"];
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [cookies] = useCookies(["format"]);
  const navigate = useNavigate();

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const list = () => (
    <Box
  sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}
  role="presentation"
  onClick={toggleDrawer(false)}
  onKeyDown={toggleDrawer(false)}
>
  <Box sx={{ overflow: 'auto' }}>
    <List>
      {/* Your ListItems */}
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation("/")}>
          <ListItemText primary="Input" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation("/data")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton onClick={() => handleNavigation("/simulator")}>
          <ListItemText primary="Simulator" />
        </ListItemButton>
      </ListItem>
      {/* Add more ListItems here for additional pages */}
    </List>
  </Box>
  <Box sx={{ flexGrow: 1 }}></Box> {/* Spacer */}
  <List>
    <ListItem disablePadding>
      <ListItemButton onClick={handleTwitterClick}>
        <ListItemIcon>
          <XIcon />counterplay.gg
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  </List>
</Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'center', display: 'flex' }}>
          <Box sx={{ position: 'absolute', left: 16 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </Box>
  
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            counterplay.gg BETA
          </Typography>
  
          <Box sx={{ position: 'absolute', right: 16 }}>
            {!user ? (
              <LoginButton />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Chip label={cookies.format} color="info" sx={{ display: { xs: 'none', sm: 'flex' } }}/>
                <ProfileDropdown />
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
