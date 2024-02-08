"use client";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icon für Profil
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Icon für Post
import Link from 'next/link';

export default function Footer() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
        width: '100%', 
        position: 'fixed', 
        bottom: 0, 
        borderTop: '1px solid', 
        borderColor: 'divider', 
        zIndex: '100',
        backgroundColor: 'white', 
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)' 
    }}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
      <Link href="/add" passHref>
          <BottomNavigationAction label="Post" icon={<AddCircleOutlineIcon />} />
        </Link>
        <Link href="/" passHref>
          <BottomNavigationAction label="Feed" icon={<HomeIcon />} />
        </Link>
        <Link href="/profile" passHref> 
          <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} />
        </Link>
        
      </BottomNavigation>
    </Box>
  );
}
