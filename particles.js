tsParticles.load("particles", {
        fullScreen: {
        enable: true,
        zIndex: -1
        },
        background: {
        color: "transparent"
        },
        particles: {
        number: { value: 80 },
        color: { value: "#0b1f3a" },
        shape: { type: "circle" },
        opacity: { value: 0.4 },
        size: { value: 2.5 },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: "out"
        }
        },
        interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 100 } }
        }
    });