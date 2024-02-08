"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/superbaseClient";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

export default function PostForm() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [aperture, setAperture] = useState("");
  const [exposureTime, setExposureTime] = useState("");
  const [focalLength, setFocalLength] = useState("");
  const [iso, setIso] = useState("");
  const [bundesland, setBundesland] = useState("");
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  async function handleSubmit() {
    const userId = (await supabase.auth.getUser())?.data?.user?.id ?? "";
    console.log("User ID:", userId);

    const postImageName = new Date().toISOString() + "-" + images.name;

    try {
      const { data, error } = await supabase.storage
        .from("fotos")
        .upload("public/" + postImageName, images);

      if (error) {
        throw error;
      }

      const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/fotos/${data.path}`;

      const dataToSave = {
        location,
        date,
        images: imageURL,
        details,
        description,
        camera,
        lens,
        aperture,
        exposureTime,
        focalLength,
        iso,
        bundesland,
        user: userId,
      };

      console.log("Daten zum Speichern:", dataToSave);

      const { data: postData, error: postError } = await supabase
        .from("post")
        .insert([dataToSave]);

      if (postError) {
        throw postError;
      }

      console.log("Daten erfolgreich gespeichert:", postData);

      // Zurücksetzen der Eingabefelder nach erfolgreicher Speicherung
      setLocation("");
      setImages("");
      setBundesland("");
      setDate("");
      setDetails("");
      setDescription("");
      setCamera("");
      setLens("");
      setAperture("");
      setExposureTime("");
      setFocalLength("");
      setIso("");

      setOpenSuccessSnackbar(true);
      setSnackbarMessage("Daten erfolgreich gespeichert!");
    } catch (error) {
      console.error("Fehler beim Speichern der Daten:", error.message);
      setOpenErrorSnackbar(true);
      setSnackbarMessage("Fehler beim Speichern der Daten");
    }
  }

  const bundeslaender = [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  return (
    <Box className="flex-grow" sx={{ pt: "75px" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "#2d3748",
          boxShadow: "none",
          borderBottom: "1px solid #4a90e2",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            LensLeap
          </Typography>
        </Toolbar>
      </AppBar>

      <Card elevation={3} className="m-4">
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              color: "#black", 
              mb: 2,
              fontWeight: 400,
              letterSpacing: 0.5,
              borderBottom: "1px solid #FFFFFF", 
              paddingBottom: 2,
            }}
          >
            Post erstellen
          </Typography>
          <Box className="flex flex-col">
            <TextField
              id="location"
              label="Stadt eingeben"
              variant="standard"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <FormControl className="w-full mb-8">
              <InputLabel id="bundesland-label">
                Bundesland auswählen
              </InputLabel>
              <Select
                labelId="bundesland-label"
                id="bundesland-select"
                value={bundesland}
                onChange={(e) => setBundesland(e.target.value)}
                label="Bundesland auswählen"
                variant="standard"
              >
                {bundeslaender.map((bundesland, index) => (
                  <MenuItem key={index} value={bundesland}>
                    {bundesland}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="date"
              label="Datum eingeben"
              variant="standard"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="details"
              label="Überschrift eingeben"
              variant="standard"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
              multiline
              rows={2}
            />
            <TextField
              id="description"
              label="Beschreibung eingeben"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
              multiline
              rows={3}
            />
            <TextField
              id="camera"
              label="Kamera eingeben"
              variant="standard"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="lens"
              label="Objektiv eingeben"
              variant="standard"
              value={lens}
              onChange={(e) => setLens(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="aperture"
              label="Blende eingeben"
              variant="standard"
              value={aperture}
              onChange={(e) => setAperture(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="exposureTime"
              label="Belichtungszeit eingeben"
              variant="standard"
              value={exposureTime}
              onChange={(e) => setExposureTime(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="focalLength"
              label="Brennweite eingeben"
              variant="standard"
              value={focalLength}
              onChange={(e) => setFocalLength(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <TextField
              id="iso"
              label="ISO eingeben"
              variant="standard"
              value={iso}
              onChange={(e) => setIso(e.target.value)}
              className="w-full mb-8 border-b-2 border-black"
            />
            <label htmlFor="picture" className="text-lg font-regular mb-2">
              Bild hochladen
            </label>
            <input
              id="picture"
              type="file"
              onChange={(e) => setImages(e.target.files[0])}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
            />
            <label htmlFor="picture" className="cursor-pointer">
              <Button variant="outlined" component="span">
                Datei auswählen
              </Button>
            </label>
            {images && (
              <div className="relative w-full h-32 mb-8 overflow-hidden rounded-lg">
                <img
                  src={URL.createObjectURL(images)}
                  className="w-full h-full object-cover object-center"
                  alt="uploaded"
                />
              </div>
            )}

            <Button
              onClick={handleSubmit}
              className="self-center text-white bg-blue-500 py-3 px-6 font-bold shadow-md mt-8 mb-9"
            >
              Posten
            </Button>
          </Box>

          <Snackbar
            open={openSuccessSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSuccessSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenSuccessSnackbar(false)}
              severity="success"
              className="w-full bg-green-500"
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenErrorSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setOpenErrorSnackbar(false)}
              severity="error"
              className="w-full bg-red-500"
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
}
