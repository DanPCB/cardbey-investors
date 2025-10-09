// src/App.jsx
import Investors from "./pages/Investors";

import { SoundProvider } from "@/lib/sound";


export default function App() {
  return (
    <SoundProvider>
      <Investors />
      
    </SoundProvider>
  );
}
