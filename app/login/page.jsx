"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/htest";
import React, { useState } from "react";
import { supabase } from "@/lib/superbaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log('User logged in:', user);
      // Weiterleitung oder weitere Aktionen für eingeloggte Benutzer durchführen
    } catch (error) {
      console.error('Login error:', error.message);
      setLoginStatus("Fehler beim Einloggen. Bitte überprüfen Sie Ihre Anmeldeinformationen.");
      // Fehlerbehandlung hier, z.B. Fehlermeldung anzeigen
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow" style={{ backgroundImage: 'url("/images/bild1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <div className="w-11/12 md:w-3/4 lg:w-2/4 bg-opacity-80 bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-white">Astrofotografie-Anmeldung</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">E-Mail</Label>
              <Input
                type="email"
                id="email"
                placeholder="E-Mail eingeben"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">Passwort</Label>
              <Input
                type="password"
                id="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Anmelden</Button>
          </form>
          {loginStatus && (
            <p className="text-center text-red-400 mt-4">{loginStatus}</p>
          )}
        </div>
      </div>
      <footer className="bg-opacity-80 bg-zinc-900 text-center py-4 text-gray-300">
        © {new Date().getFullYear()} Astrofotografie | Alle Rechte vorbehalten
      </footer>
    </div>
  );
}
