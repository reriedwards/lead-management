"use client";

import { Box, Button, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LeadThankYou() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundImage: 'url("/info.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => router.push("/")}
        >
          Go Back to Homepage
        </Button>
      </Paper>
    </Box>
  );
}
