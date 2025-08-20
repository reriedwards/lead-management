import { Box, Typography } from "@mui/material";

export default function LeadHeader() {
  return (
    <Box textAlign="center" my={8}>
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
      <Typography variant="h6" component="h1" gutterBottom>
        Want to understand your visa options?
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals.
      </Typography>
    </Box>
  );
}
