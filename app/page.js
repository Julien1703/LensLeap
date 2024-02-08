"use client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { supabase } from "@/lib/superbaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconButton } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Home() {
  const [filteredPost, setFilteredPost] = useState([]);
  const [post, setPost] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data: fetchData, error } = await supabase
          .from("post")
          .select(
            `location, id, date, images, details, user(firstName, lastName, image)`
          );

        if (error) {
          throw new Error("Fehler beim Abrufen der Daten:", error);
        } else {
          setPost(fetchData);
          setFilteredPost(fetchData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const filteredPost = post.filter((item) =>
      item.location.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPost(filteredPost);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className="bg-[#2d3748] shadow-none border-b border-[#4a90e2]"
      >
        <Toolbar className="justify-between">
          <div className="flex items-center w-full">
            <InputBase
              placeholder="Search anything"
              onChange={handleSearch}
              classes={{
                root: "text-white",
                input: "rounded-lg pl-10 pr-3 py-2 w-full bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.25)]",
              }}
              startAdornment={<SearchIcon className="text-white mr-3 absolute left-3" />}
              className="relative"
            />
          </div>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleLogout} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          pt: "64px",
          pb: "56px",
          minHeight: "100vh",
          background: "linear-gradient(to right, #1a202c, #2d3748)", // Dunkler Verlauf
        }}
      >
        
        <Grid container spacing={3} className="p-4">
          {filteredPost.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <div className="bg-white shadow-lg rounded-md overflow-hidden relative transform transition duration-300 hover:scale-105">
              <div className="flex flex-row items-center pl-5 gap-5 my-2">
                  <Avatar>
                    <AvatarImage src={item?.user?.image} />
                    <AvatarFallback>{item?.user?.firstName}</AvatarFallback>
                  </Avatar>
                  <p>{item?.user?.firstName + " " + item?.user?.lastName}</p>
                </div>
                <div className="h-60 w-full relative">
                  <img
                    src={item.images}
                    alt={item.location}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 text-gray-800">
                  
                  <Typography variant="h6" className="mb-2">
                    {item.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-4"
                  >
                    {item.date}
                  </Typography>
                  <div className="bg-white p-2 mb-4">
                    <Typography variant="body1" color="textPrimary">
                      {item.details}
                    </Typography>
                  </div>
                  <div className="mt-4">
                    <Link href={`/${item.id}`} key={item.slug}>
                      <Button variant="outlined" color="primary">
                        Mehr Infos
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
