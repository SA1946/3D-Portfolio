/**
 * App.jsx — minimal entry point
 *
 * Three.js + Canvas is lazy-loaded via ThreeScene so the browser renders
 * the initial HTML instantly (fixing FCP), while the 3D stack downloads
 * in the background as a separate JS chunk.
 */
import { lazy, Suspense } from "react";

// Dynamically imports the entire 3D stack — Three.js, Fiber, Drei, Framer
// Motion 3D are NOT bundled with the initial page load
const ThreeScene = lazy(() => import("./components/ThreeScene"));

// Minimal CSS-only fallback shown while the Three.js chunk downloads
// (typically < 1 second on fast connections)
function InitialLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: "1.5rem",
          fontWeight: "700",
          letterSpacing: "0.05em",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      >
        ✦ Loading
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:1} }`}</style>
    </div>
  );
}

function App() {
  return (
    <div className="h-screen w-screen">
      {/* Suspense catches the lazy() promise — shows InitialLoader until
          the Three.js chunk is downloaded and parsed */}
      <Suspense fallback={<InitialLoader />}>
        <ThreeScene />
      </Suspense>
    </div>
  );
}

export default App;
