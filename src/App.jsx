import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // console.log("efecto");

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      // console.log("move", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    //cleanup
    //cuando el componente se desmont
    //cuando cambia las dependencias, antes de ejecutar
    //
    return () => {
      console.log("cleanup");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  //[] solo se ejecuta una vez cuando se monta el componente
  //[enabled] se ejecuta cuando cambia enabled y cuando se monta el componente
  //undefined se ejecuta cada vez que se renderiza al componente

  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled);

    return () => {
      document.body.classList.remove("no-cursor");
    };
  }, [enabled]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid white",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />

      <h3>Proyecto 3</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} Seguir puntero
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  );
}

export default App;
