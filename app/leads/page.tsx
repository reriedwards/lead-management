"use client";

import LeadList from "../../components/LeadList";
import { Box } from "@mui/material";
import LeadSidePanel from "@/components/LeadSidePanel";

export default function LeadsPage() {
  return (
    <Box display="flex" minHeight="100vh">
      <LeadSidePanel />
      <LeadList />;
    </Box>
  );
}
