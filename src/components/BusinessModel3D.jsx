// src/components/BusinessModel3D.jsx
import React, { useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Line,
  MeshDistortMaterial,
  Edges,
  Float,
} from "@react-three/drei";

/* ---------- Copy (EN + VI) ---------- */
const COPY = {
  en: {
    title: "Business model",
    items: {
      store: {
        label: "AI Store Creation",
        bullets: [
          "Spin up a store in ~60s",
          "Drag & drop products, social sync",
          "Data-driven conversion optimization",
        ],
      },
      ads: {
        label: "Smart Ad Network",
        bullets: [
          "C-Net screens to instant QR purchase",
          "Contextual creative + dynamic pricing",
          "Attribution across online ↔ offline",
        ],
      },
      delivery: {
        label: "Automated Delivery",
        bullets: [
          "Routing & batching automation",
          "Courier marketplace integration",
          "Real-time tracking & SLA alerts",
        ],
      },
      cai: {
        label: "CAI • internal finance",
        bullets: [
          "Seller payouts & receivables",
          "Credit scoring with device data",
          "Future AIcoin rails ready",
        ],
      },
    },
  },
  vi: {
    title: "Mô hình kinh doanh",
    items: {
      store: {
        label: "Tạo Cửa hàng AI",
        bullets: [
          "Khởi tạo cửa hàng trong ~60s",
          "Kéo-thả sản phẩm, đồng bộ MXH",
          "Tối ưu chuyển đổi theo dữ liệu",
        ],
      },
      ads: {
        label: "Mạng quảng cáo thông minh",
        bullets: [
          "Màn hình C-Net → mua QR tức thì",
          "Sáng tạo theo ngữ cảnh & giá linh hoạt",
          "Attribution online ↔ offline",
        ],
      },
      delivery: {
        label: "Giao nhận tự động",
        bullets: [
          "Tự động định tuyến & gom đơn",
          "Tích hợp sàn shipper",
          "Theo dõi thời gian thực & SLA",
        ],
      },
      cai: {
        label: "CAI • tài chính nội bộ",
        bullets: [
          "Chi trả & công nợ cho seller",
          "Chấm điểm tín dụng từ dữ liệu thiết bị",
          "Sẵn sàng hạ tầng AIcoin",
        ],
      },
    },
  },
};

/* ---------- Visual constants ---------- */
const COLORS = {
  core: "#7C3AED",
  store: "#22d3ee",
  ads: "#f59e0b",
  delivery: "#10b981",
  cai: "#8b5cf6",
};

/* ---------- Central “AI brain” hologram ---------- */
function HoloCore({ position = [0, 0, 0], scale = 1, color = COLORS.core }) {
  // very gentle idle wobble on the brain
  const coreRef = useRef();
  useFrame((_, dt) => {
    if (!coreRef.current) return;
    coreRef.current.rotation.y += dt * 0.35;
  });

  return (
    <group position={position} scale={scale}>
      {/* Pedestal chip */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.9, 0.06, 0.62]} />
        <meshPhysicalMaterial color="#1b2540" roughness={0.6} metalness={0.25} />
      </mesh>

      {/* Brain core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.22, 1]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.35}
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Hologram screen */}
      <mesh position={[0.04, 0.03, 0.12]} rotation={[0, 0.2, 0]}>
        <planeGeometry args={[0.58, 0.42]} />
        <meshPhysicalMaterial
          color="#9ecbff"
          transparent
          opacity={0.1}
          roughness={0}
          metalness={0}
        />
        <Edges color="#9ecbff" threshold={15} />
      </mesh>

      {/* Neon rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.007, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[0.28, 0.007, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* ---------- Orbit helpers ---------- */
function circlePoints(radius, segments = 64) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push([Math.cos(t) * radius, 0, Math.sin(t) * radius]);
  }
  return pts;
}

function OrbitPath({ radius, color = "rgba(255,255,255,0.15)" }) {
  return <Line points={circlePoints(radius)} color={color} dashed dashSize={0.25} gapSize={0.15} />;
}

/* ---------- Orbiting clickable node ---------- */
function OrbitingNode({ id, color, radius, speed, offset, label, selected, setSelected }) {
  const ref = useRef();
  const angle0 = useMemo(() => offset, [offset]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + angle0;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y = t;
  });

  const active = selected === id;

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelected(id);
        }}
        scale={active ? 1.15 : 1}
      >
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.9 : 0.5} />
      </mesh>

      {/* Floating pill label */}
      <Html center distanceFactor={6} transform sprite zIndexRange={[1, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelected(id);
          }}
          style={{
            padding: "6px 10px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.9)",
            color: "#0f172a",
            border: "1px solid rgba(0,0,0,.1)",
            boxShadow: active ? "0 8px 24px rgba(0,0,0,.25)" : "0 4px 12px rgba(0,0,0,.15)",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            transform: `translateY(${active ? "-4px" : "0"})`,
            transition: "transform 120ms ease",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

/* ---------- Component ---------- */
export default function BusinessModel3D({
  lang = "en",
  accent = COLORS.core,
  height = 380,
}) {
  const c = COPY[lang] ?? COPY.en;
  const [selected, setSelected] = useState("store");

  const items = useMemo(
    () => [
      { id: "store", color: COLORS.store, radius: 3.2, speed: 0.35, offset: 0.0, label: c.items.store.label },
      { id: "ads", color: COLORS.ads, radius: 3.2, speed: 0.28, offset: 1.9, label: c.items.ads.label },
      { id: "delivery", color: COLORS.delivery, radius: 3.2, speed: 0.24, offset: 3.1, label: c.items.delivery.label },
      { id: "cai", color: COLORS.cai, radius: 3.2, speed: 0.31, offset: 4.5, label: c.items.cai.label },
    ],
    [c]
  );

  const sideBullets =
    {
      store: c.items.store.bullets,
      ads: c.items.ads.bullets,
      delivery: c.items.delivery.bullets,
      cai: c.items.cai.bullets,
    }[selected] || [];

  return (
    <div
      className="bm-wrap"
      style={{
        position: "relative",
        borderRadius: 18,
        // Transparent so it blends with your hero background
        background: "transparent",
        border: "none",
      }}
    >
      <div className="bm-title" style={{ fontWeight: 800, fontSize: 20, marginBottom: 12 }}>
        {c.title}
      </div>

      <div
        className="bm-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(260px,1fr) 360px",
          gap: 20,
          padding: 0,
        }}
      >
        {/* Canvas */}
        <div style={{ height, borderRadius: 14, overflow: "hidden" }}>
          <Canvas camera={{ position: [0, 4.2, 7.2], fov: 50 }}>
            <ambientLight intensity={0.55} />
            <pointLight position={[5, 8, 5]} intensity={1.2} />
            <Suspense fallback={null}>
              {/* Central hologram core with a gentle float */}
              <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
                <HoloCore position={[0.1, 0.06, 0.35]} scale={1} color={accent} />
              </Float>

              {/* Orbit paths (dotted circles) */}
              <OrbitPath radius={3.2} />
              {/* Nodes */}
              <group position={[0, 0, 0]}>
                {items.map((n) => (
                  <OrbitingNode key={n.id} {...n} selected={selected} setSelected={setSelected} />
                ))}
              </group>
            </Suspense>

            <OrbitControls enablePan={false} minDistance={5} maxDistance={10} />
          </Canvas>
        </div>

        {/* Side panel */}
        <div
          className="bm-panel"
          style={{
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,.06)",
            background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
            padding: 16,
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            {items.find((i) => i.id === selected)?.label}
          </div>

          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.6 }}>
            {sideBullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          {/* Quick chips to switch */}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {items.map((i) => {
              const active = selected === i.id;
              return (
                <button
                  key={i.id}
                  onClick={() => setSelected(i.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 9999,
                    border: `1px solid rgba(255,255,255,${active ? 0.25 : 0.12})`,
                    background: active ? i.color : "transparent",
                    color: active ? "#0b1220" : "#e6edf7",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {i.label}
                </button>
              );
            })}
          </div>

          {/* Metric pill (only for the store tab) */}
          <div
            style={{
              marginTop: 14,
              alignSelf: "end",
              justifySelf: "end",
              borderRadius: 12,
              padding: 12,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(124,58,237,.12)",
              color: "#e6e1ff",
              fontWeight: 800,
              display: selected === "store" ? "inline-flex" : "none",
            }}
          >
            <div style={{ opacity: 0.8, fontSize: 12, marginRight: 10 }}>Time-to-store</div>
            <div>~60s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
