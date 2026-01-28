"use client";

import { Box, IconButton } from "@mui/material";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import iconZ from "@/public/icon-zalo.png";
import iconM from "@/public/icon-mess.png";
export default function FloatingChat() {
  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: 80, md: 32 },
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {/* ZALO */}
      <IconButton
        component="a"
        href="https://zalo.me/0869154692"
        target="_blank"
        rel="noopener"
        sx={{
          width: 56,
          height: 56,
          bgcolor: "#0068FF",
          animation: "pulse 1.8s infinite", // 👈 BƯỚC 6
          "@keyframes pulse": {
            "0%": {
              boxShadow: "0 0 0 0 rgba(0,104,255,0.6)",
            },
            "70%": {
              boxShadow: "0 0 0 14px rgba(0,104,255,0)",
            },
            "100%": {
              boxShadow: "0 0 0 0 rgba(0,104,255,0)",
            },
          },
          "&:hover": {
            transform: "scale(1.08)",
          },
          transition: "all 0.25s ease",
        }}
      >
        <Image src={iconZ} alt="Chat Zalo" width={40} height={40} />
      </IconButton>

      {/* FACEBOOK MESSENGER */}
      <IconButton
        component="a"
        href="https://m.me/YOUR_PAGE_ID"
        target="_blank"
        rel="noopener"
        sx={{
          width: 56,
          height: 56,
          bgcolor: "#0068FF",
          animation: "pulse 1.8s infinite", // 👈 BƯỚC 6
          "@keyframes pulse": {
            "0%": {
              boxShadow: "0 0 0 0 rgba(0,104,255,0.6)",
            },
            "70%": {
              boxShadow: "0 0 0 14px rgba(0,104,255,0)",
            },
            "100%": {
              boxShadow: "0 0 0 0 rgba(0,104,255,0)",
            },
          },
          "&:hover": {
            transform: "scale(1.08)",
          },
          transition: "all 0.25s ease",
        }}
      >
        <Image src={iconM} alt="Chat Zalo" width={40} height={40} />
      </IconButton>
    </Box>
  );
}
