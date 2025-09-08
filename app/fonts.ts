import localFont from "next/font/local";

export const futuraHeavyOblique = localFont({
  src: [
    {
      path: "../public/fonts/FuturaHeavyOblique.otf",
      weight: "700",
      style: "oblique",
    },
  ],
  variable: "--font-futura-heavy-oblique",
});

export const gestura = localFont({
  src: [
    { path: "../public/fonts/GesturaTextTRIAL-Black.otf", weight: "900" },
    { path: "../public/fonts/GesturaTextTRIAL-Bold.otf", weight: "700" },
    { path: "../public/fonts/GesturaTextTRIAL-Semibold.otf", weight: "600" },
    { path: "../public/fonts/GesturaTextTRIAL-Regular.otf", weight: "400" },
    { path: "../public/fonts/GesturaTextTRIAL-Light.otf", weight: "300" },
    { path: "../public/fonts/GesturaTextTRIAL-Thin.otf", weight: "100" },
  ],
  variable: "--font-gestura",
});