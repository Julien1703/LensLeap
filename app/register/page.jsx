"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/htest";
import { supabase } from "@/lib/superbaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const { data: existingUsers, error: fetchError } = await supabase
        .from("user")
        .select("*")
        .eq("email", email);

      if (fetchError) {
        throw fetchError;
      }

      if (existingUsers && existingUsers.length > 0) {
        setRegistrationStatus("Die E-Mail existiert bereits.");
        return;
      }

      const { user, error } = await supabase.auth.signUp({
        email,
        password: pwd,
      });

      if (error) {
        throw error;
      }

      const { data, insertError } = await supabase.from("user").insert([
        { email, pwd },
      ]);

      if (insertError) {
        throw insertError;
      }

      console.log("User registered:", user);
      console.log("Additional data stored in users table:", data);

      setRegistrationStatus("Registrierung erfolgreich!");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex-grow"
        style={{
          backgroundImage: 'url("/images/bild1.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div className="w-11/12 md:w-3/4 lg:w-2/4 bg-opacity-80 bg-zinc-900 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center text-white">
            Astrofotografie-Registrierung
          </h1>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <Label
                htmlFor="email"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                E-Mail
              </Label>
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
              <Label
                htmlFor="password"
                className="block text-gray-200 text-sm font-bold mb-2"
              >
                Passwort
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Passwort eingeben"
                value={pwd}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Registrieren
            </Button>
          </form>
          {registrationStatus && (
            <p className="text-center text-white mt-4">{registrationStatus}</p>
          )}
        </div>
      </div>
      <footer className="bg-opacity-80 bg-zinc-900 text-center py-4 text-gray-300">
        © {new Date().getFullYear()} Astrofotografie | Alle Rechte vorbehalten
      </footer>
    </div>
  );
}
