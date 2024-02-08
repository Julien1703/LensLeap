"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/superbaseClient";
import Link from "next/link";
import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material";

import CameraIcon from "@mui/icons-material/Camera";
import LensIcon from "@mui/icons-material/Lens";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Divider from "@mui/material/Divider";

export default function DetailPage({ params }) {
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    async function fetchPostDetails() {
      if (params.slug) {
        try {
          const { data, error } = await supabase
            .from("post")
            .select("*")
            .eq("id", params.slug)
            .single();

          if (error) {
            throw new Error("Fehler beim Abrufen der Daten:", error);
          }

          if (data) {
            setPostDetails(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchPostDetails();
  }, [params.slug]);
  console.log(params.slug);

  return (
    <Box className="min-h-screen relative pb-20 overflow-hidden">
      
      <Box className="absolute"></Box>

      <Link href="/">
        <ArrowBackIosNewRoundedIcon
          sx={{
            position: "absolute",
            top: 20,
            left: 30,
            zIndex: 20, // Ensure the icon is above the gradient background
            color: "white",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        />
      </Link>

      <img
        src={postDetails.images || "postDetails.images"}
        alt="Platzhalterbild"
        className="w-full object-cover z-15" // Ensure z-index is less than the ArrowBackIosNewRoundedIcon
      />

      <Box className="p-4 relative inset-0">
        <Typography variant="h6" gutterBottom className="text-white">
          {postDetails.details || "Details"}
        </Typography>
        <Typography variant="h6" className="text-white mt-5">
          {postDetails.location || "Stadt"}
        </Typography>
        <Typography variant="subtitle2" gutterBottom className="text-blue-100">
          {postDetails.date || "Datum"}
        </Typography>
        <Typography variant="h6" gutterBottom className="text-white mt-4">
          Beschreibung
        </Typography>
        <Typography paragraph className="text-blue-100">
          {postDetails.description}
        </Typography>
        <Box p={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                display="block"
                className="text-blue-300"
              >
                <CameraIcon />
              </Typography>
              <Typography variant="body2" className="text-white">
                {postDetails.camera}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                display="block"
                className="text-blue-300"
              >
                <LensIcon />
              </Typography>
              <Typography variant="body2" className="text-white">
                {postDetails.lens}
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                display="block"
                className="text-blue-300"
              >
                <DateRangeIcon />
              </Typography>
              <Typography variant="body2" className="text-white">
                {postDetails.date}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="h5" className="mb-4 text-gray-300" >
          Weitere Details
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              label: "Aperture",
              icon: <CameraIcon />,
              data: postDetails.aperture,
            },
            {
              label: "Exposure Time",
              icon: <LensIcon />,
              data: postDetails.exposureTime,
            },
            {
              label: "Focal Length",
              icon: <DateRangeIcon />,
              data: postDetails.focalLength,
            },
            { label: "ISO", icon: <CameraIcon />, data: postDetails.iso },
          ].map((detail, index) => (
            <Grid item xs={6} sm={6} md={9} lg={3} key={index}>
              <Card raised>
                <CardContent>
                  <Typography variant="subtitle1" color="textSecondary">
                    {detail.label}
                  </Typography>
                  <Chip
                    icon={detail.icon}
                    label={detail.data || "N/A"}
                    variant="outlined"

                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
