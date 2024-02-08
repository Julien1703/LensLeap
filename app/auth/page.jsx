"use client";
import React from "react";
import { supabase } from "@/lib/superbaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          router.push("/");
        }
      }
    );
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex-grow flex justify-center items-center"
        style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
      >
        
        <div
          className="w-11/12 md:w-3/4 lg:w-1/3 p-8 rounded-lg shadow-xl"
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Wilkommen
          </h1>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: {
                ...ThemeSupa,
                inputStyles: { ...ThemeSupa.inputStyles, color: "white" },
              },
            }}
            providers={[]}
            redirectTo="http://localhost:3000/"
          />
        </div>
      </div>
    </div>
  );
}
