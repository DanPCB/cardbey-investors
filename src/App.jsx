// src/App.jsx
import Investors from "./pages/Investors";
import CayaChatWidget from "./components/CayaChatWidget";
import { SoundProvider } from "@/lib/sound";


export default function App() {
  return (
    <SoundProvider>
      <Investors />
      <CayaChatWidget />
    </SoundProvider>
  );
}
