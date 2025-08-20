import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { sentenceCase } from "change-case";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const WIDTH = 300;

export default function LeadSidePanel() {
  const router = useRouter();
  const pathname = usePathname();
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setLoggedInUser(user);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: WIDTH,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Top navigation items */}
      <Box>
        <Box
          sx={{
            position: "relative",
            top: "0",
            right: "0",
            height: "200px",
            backgroundImage: 'url("/alma.png")',
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />
        <List>
          <ListItemButton component={Link} href="/leads">
            <ListItemText
              primary={
                <Typography
                  fontWeight={pathname === "/leads" ? "bold" : "normal"}
                >
                  Leads
                </Typography>
              }
            />
          </ListItemButton>
          <ListItemButton component={Link} href="/leads">
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Box>

      {/* Bottom logged-in user. Hard coded to simu */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        {/* Gray circle */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: (theme) => theme.palette.grey[400],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {loggedInUser.charAt(0).toUpperCase()}
        </Box>

        {/* User name */}
        <Typography variant="body2">{sentenceCase(loggedInUser)}</Typography>
        <IconButton onClick={handleLogout} color="inherit">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
}
