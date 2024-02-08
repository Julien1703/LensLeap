"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/superbaseClient";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";

export default function ProfileEditPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    async function fetchInitialProfileData() {
      const userId = (await supabase.auth.getUser())?.data?.user?.id ?? "";

      if (userId === "") return;

      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userId);

      if (error || data.length === 0) return;

      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setImage(data[0].image);

      setIsUpdateMode(true);
    }

    fetchInitialProfileData();
  }, []);

  async function handleSubmit() {
    const userId = (await supabase.auth.getUser())?.data?.user?.id ?? "";

    let imageURL = image;
    if (isImageUpdated) {
      const userImage = new Date().toISOString() + "-" + image.name;

      const { data, error } = await supabase.storage
        .from("fotos")
        .upload("user/" + userImage, image);

      imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/fotos/${data.path}`;
    }

    if (isUpdateMode) {
      update(userId, firstName, lastName, imageURL);
    } else {
      insert(userId, firstName, lastName, imageURL);
    }
  }

  async function insert(userId, firstName, lastName, imageURL) {
    try {
      await supabase.from("profile").upsert([
        {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          image: imageURL,
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  async function update(userId, firstName, lastName, imageURL) {
    try {
      await supabase.from("profile").upsert([
        {
          id: userId,
          firstName: firstName,
          lastName: lastName,
          image: imageURL,
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #1a202c, #2d3748)",
      padding: "20px",
    }}
  >
    <AppBar position="fixed" sx={{ background: '#2d3748', boxShadow: 'none', borderBottom: '1px solid #4a90e2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          LensLeap
        </Typography>
      </Toolbar>
    </AppBar>
      <Card
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: '50px', 
      }}
    >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              color: "#black", // Helle Schriftfarbe für den Titel
              mb: 4,
              fontWeight: 400,
              letterSpacing: 0.5,
              borderBottom: "1px solid #FFFFFF", // Helle Unterstreichung
              paddingBottom: 2,
            }}
          >
            Dein Profil
          </Typography>

          <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
            <Avatar
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              sx={{ width: 90, height: 90, mx: "auto", mb: 2 }}
              alt="Profile Picture"
            />
            <Typography variant="h6" sx={{ fontWeight: "medium" }}>
              {firstName} {lastName}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}></Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Vorname"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nachname"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <input
              accept="image/*"
              id="profile-image-upload"
              type="file"
              hidden
              onChange={(e) => {
                setIsImageUpdated(true);
                setImage(e.target.files[0]);
              }}
            />
            <label htmlFor="profile-image-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ mb: 2 }}
              >
                Profilbild ändern
              </Button>
            </label>
          </Box>
          <Button
            variant="outlined"
            component="span"
            fullWidth
            onClick={handleSubmit}
            sx={{
              color: "white",
              bgcolor: "#0078d4",
            }}
          >
            Speichern
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
