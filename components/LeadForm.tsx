"use client";

import { useState, useEffect } from "react";
import { getNames } from "country-list";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { StatusType, visaOptions, VisaType } from "@/types/lead";
import axios from "axios";
import LeadHeader from "./LeadHeader";
import LeadBanner from "./LeadBanner";

type FormData = {
  file: any;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  visas: VisaType[];
  notes?: string;
  status: StatusType;
};

export default function LeadForm() {
  const router = useRouter();
  const [countries, setCountries] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { visas: [], country: "", status: "pending" },
  });

  useEffect(() => {
    setCountries(getNames());
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const payload: FormData = { ...data };

      await axios.post("/api/leads", payload, {
        headers: { "Content-Type": "application/json" },
      });

      router.push("/thank-you");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 650,
        mx: "auto",
        border: "1px solid #ddd",
        borderBottomLeftRadius: "2px",
        borderBottomRightRadius: "2px",
        pb: "50px",
      }}
    >
      <LeadBanner />
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <LeadHeader />

        {/* First Name */}
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          {...register("firstName", { required: "First name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        {/* Last Name */}
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          {...register("lastName", { required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* LinkedIn / Website */}
        <TextField
          label="LinkedIn / Personal Website URL"
          fullWidth
          margin="normal"
          {...register("linkedin", { required: "LinkedIn is required" })}
          error={!!errors.linkedin}
          helperText={errors.linkedin?.message}
        />

        {/* Country of Citizenship */}
        <Controller
          name="country"
          control={control}
          rules={{ required: "Please select country of Citizenship" }}
          render={({ field }) => (
            <FormControl fullWidth margin="normal" error={!!errors.country}>
              <Select
                {...field}
                displayEmpty
                input={<OutlinedInput />}
                renderValue={(selected) =>
                  selected == null || selected === ""
                    ? "Country of Citizenship"
                    : selected
                }
              >
                {countries.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
              {errors.country && (
                <FormHelperText>{errors.country.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Visas Categories of Interest */}
        <FormControl
          component="fieldset"
          margin="normal"
          error={!!errors.visas}
          fullWidth
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
                backgroundImage: 'url("/dice.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Visas Categories of Interest
            </Typography>
          </Box>
          <FormGroup>
            {visaOptions.map((v) => (
              <Controller
                key={v}
                name="visas"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value.includes(v)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, v]);
                          } else {
                            field.onChange(
                              field.value.filter((val) => val !== v)
                            );
                          }
                        }}
                      />
                    }
                    label={v}
                  />
                )}
              />
            ))}
          </FormGroup>
          {errors.visas && (
            <FormHelperText>{errors.visas.message}</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundImage: 'url("/heart.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
          <Typography variant="h6" gutterBottom>
            How can we help you?
          </Typography>
        </Box>

        {/* Additional Notes */}
        <TextField
          label="Additional Notes"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          {...register("notes")}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
