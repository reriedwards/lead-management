import Box from "@mui/material/Box";

export default function LeadBanner() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        backgroundImage: 'url("/banner.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
