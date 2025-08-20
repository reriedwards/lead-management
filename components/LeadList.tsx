"use client";

import { sentenceCase } from "change-case";
import { format } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ILeadWithId, statusOptions } from "../types/lead";
import debounce from "lodash.debounce";

import {
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Pagination,
  InputAdornment,
  IconButton,
} from "@mui/material";

export default function LeadList() {
  const [leads, setLeads] = useState<ILeadWithId[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  const rowsPerPage = 2;

  const fetchLeads = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/leads?page=${pageNumber}&limit=${rowsPerPage}&search=${search}&status=${statusSearch}`
      );
      setLeads(res.data.leads);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchLeads = useCallback(
    debounce((pageNumber: number) => {
      fetchLeads(pageNumber);
    }, 500),
    [search, statusSearch, rowsPerPage]
  );

  useEffect(() => {
    debouncedFetchLeads(page);
    return () => {
      debouncedFetchLeads.cancel();
    };
  }, [page, search, statusSearch, debouncedFetchLeads]);

  async function markAsReachedOut(leadId: string) {
    try {
      const res = await axios.patch(`/api/leads/${leadId}`, {
        status: "reached out",
      });

      if (res.status === 200) {
        setLeads((prev) =>
          prev.map((row) =>
            row._id === leadId ? { ...row, status: "reached out" } : row
          )
        );
      }
    } catch (err) {}
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 3 }}>
        Leads
      </Typography>

      {/* Top Filters */}
      <Stack direction="row" spacing={2} mb={2} alignItems="center">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={statusSearch}
          onChange={(e) => setStatusSearch(e.target.value)}
          displayEmpty
          size="small"
        >
          <MenuItem value={""}>Status</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {sentenceCase(status)}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {/* Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>
                    {lead.firstName} {lead.lastName}
                  </TableCell>
                  <TableCell>
                    {lead.createdAt
                      ? format(new Date(lead.createdAt), "MM/dd/yyyy, h:mm a")
                      : ""}
                  </TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.country}</TableCell>
                  <TableCell>
                    {lead.status === "pending" && (
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => markAsReachedOut(lead._id)}
                        sx={{
                          p: 0.5,
                          color: "gray",
                          "&:hover": { color: "green" },
                        }}
                        title="Mark as Reached Out"
                      >
                        <CheckCircleOutlineIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Bottom Info and Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
