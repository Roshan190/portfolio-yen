import type { ReactNode } from 'react'

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg className="toy" viewBox="0 0 200 200" aria-hidden="true">
      <ellipse cx="100" cy="178" rx="54" ry="11" fill="rgb(0 0 0 / 0.16)" />
      {children}
    </svg>
  )
}

const ink = '#141414'

function Iso({
  top,
  left,
  right,
  label,
  labelFill = ink,
}: {
  top: string
  left: string
  right: string
  label?: string
  labelFill?: string
}) {
  return (
    <Frame>
      <polygon points="100,34 168,70 100,106 32,70" fill={top} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="32,70 100,106 100,162 32,126" fill={left} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="168,70 100,106 100,162 168,126" fill={right} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="100,34 140,55 100,76 60,55" fill="#fff" opacity="0.35" />
      {label ? (
        <text
          x="78"
          y="128"
          textAnchor="middle"
          fill={labelFill}
          fontSize="26"
          fontWeight="800"
          fontFamily="Arial Narrow, Impact, sans-serif"
        >
          {label}
        </text>
      ) : null}
    </Frame>
  )
}

function Chai() {
  return (
    <Frame>
      <path d="M58 78h70l8 78H50z" fill="#F3D7B0" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M62 96h62l4 44H58z" fill="#6B3A1F" />
      <ellipse cx="93" cy="78" rx="36" ry="12" fill="#FFF6EA" stroke={ink} strokeWidth="3" />
      <path d="M128 96c18 2 26 14 24 28-2 12-14 16-24 12" fill="none" stroke={ink} strokeWidth="3" />
      <path d="M70 70c6-16 14-16 18 0M90 66c6-18 16-18 20 2" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </Frame>
  )
}

function Keycap() {
  return (
    <Frame>
      <rect x="46" y="48" width="108" height="108" rx="22" fill="#F4EFE6" stroke={ink} strokeWidth="3" />
      <rect x="58" y="60" width="84" height="72" rx="14" fill="#FFD23F" stroke={ink} strokeWidth="3" />
      <text x="100" y="106" textAnchor="middle" fontSize="28" fontWeight="800" fill={ink} fontFamily="ui-monospace, monospace">
        {'</>'}
      </text>
    </Frame>
  )
}

function GemMark() {
  return (
    <Frame>
      <polygon points="100,28 162,78 100,172 38,78" fill="#FF4A1C" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="100,28 162,78 100,96 38,78" fill="#FFD23F" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="100,28 100,96 38,78" fill="#FFF1A8" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="100,96 162,78 100,172" fill="#C4310E" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
    </Frame>
  )
}

function WindowToy() {
  return (
    <Frame>
      <rect x="28" y="40" width="144" height="112" rx="16" fill="#F7F4EE" stroke={ink} strokeWidth="3" />
      <path d="M28 64h144" stroke={ink} strokeWidth="3" />
      <circle cx="48" cy="52" r="5" fill="#FF4A1C" />
      <circle cx="66" cy="52" r="5" fill="#FFD23F" />
      <circle cx="84" cy="52" r="5" fill="#3DDC84" />
      <rect x="44" y="80" width="70" height="10" rx="5" fill="#0C1B3A" />
      <rect x="44" y="100" width="112" height="8" rx="4" fill="#C5D4F5" />
      <rect x="44" y="116" width="86" height="8" rx="4" fill="#C5D4F5" />
    </Frame>
  )
}

function Spark() {
  return (
    <Frame>
      <path
        d="M100 24l14 46 48 8-38 30 12 48-36-26-36 26 12-48-38-30 48-8z"
        fill="#F0B429"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="96" r="14" fill="#fff" stroke={ink} strokeWidth="3" />
    </Frame>
  )
}

function CardToy() {
  return (
    <Frame>
      <rect x="40" y="48" width="120" height="104" rx="14" fill="#F4EFE6" stroke={ink} strokeWidth="3" transform="rotate(-8 100 100)" />
      <rect x="56" y="66" width="36" height="26" rx="6" fill="#F0B429" stroke={ink} strokeWidth="3" transform="rotate(-8 100 100)" />
      <path d="M58 118h78M58 132h54" stroke={ink} strokeWidth="3" strokeLinecap="round" transform="rotate(-8 100 100)" />
    </Frame>
  )
}

function Megaphone() {
  return (
    <Frame>
      <path d="M48 88h36l62-32v92L84 116H48z" fill="#FF4A1C" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 88v28c0 14 10 22 22 18" fill="#FFD23F" stroke={ink} strokeWidth="3" />
      <path d="M156 62c12 10 12 70 0 80" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  )
}

function Stack() {
  return (
    <Frame>
      <rect x="46" y="108" width="108" height="36" rx="8" fill="#FF4A1C" stroke={ink} strokeWidth="3" />
      <rect x="38" y="78" width="108" height="36" rx="8" fill="#141414" stroke={ink} strokeWidth="3" />
      <rect x="54" y="48" width="108" height="36" rx="8" fill="#FFE14A" stroke={ink} strokeWidth="3" />
      <path d="M70 66h48" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  )
}

function Badge() {
  return (
    <Frame>
      <rect x="48" y="36" width="104" height="132" rx="16" fill="#F4EFE6" stroke={ink} strokeWidth="3" />
      <circle cx="100" cy="84" r="26" fill="#FFE14A" stroke={ink} strokeWidth="3" />
      <path d="M70 128h60M78 144h44" stroke={ink} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  )
}

function PathToy() {
  return (
    <Frame>
      <path d="M40 140C70 140 70 60 110 60s40 80 60 40" fill="none" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="40" cy="140" r="14" fill="#FF4A1C" stroke={ink} strokeWidth="3" />
      <circle cx="110" cy="60" r="14" fill="#FFE14A" stroke={ink} strokeWidth="3" />
      <circle cx="166" cy="100" r="14" fill="#fff" stroke={ink} strokeWidth="3" />
    </Frame>
  )
}

function Plug() {
  return (
    <Frame>
      <rect x="70" y="78" width="60" height="70" rx="12" fill="#141414" stroke={ink} strokeWidth="3" />
      <rect x="86" y="40" width="10" height="42" rx="3" fill="#FFE14A" stroke={ink} strokeWidth="3" />
      <rect x="106" y="40" width="10" height="42" rx="3" fill="#FFE14A" stroke={ink} strokeWidth="3" />
      <rect x="88" y="104" width="24" height="10" rx="3" fill="#FF4A1C" />
    </Frame>
  )
}

function Terminal() {
  return (
    <Frame>
      <rect x="28" y="44" width="144" height="112" rx="16" fill="#062E2A" stroke={ink} strokeWidth="3" />
      <path d="M28 70h144" stroke={ink} strokeWidth="3" />
      <path d="M48 100l18 14-18 14" fill="none" stroke="#D9F6EF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M84 128h40" stroke="#0E8F7E" strokeWidth="4" strokeLinecap="round" />
    </Frame>
  )
}

function Gear() {
  return (
    <Frame>
      <path
        d="M100 36l10 8 14-4 6 14 12 8-4 14 8 12-8 12 4 14-12 8-6 14-14-4-10 8-10-8-14 4-6-14-12-8 4-14-8-12 8-12-4-14 12-8 6-14 14 4z"
        fill="#0E8F7E"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="104" r="22" fill="#D9F6EF" stroke={ink} strokeWidth="3" />
    </Frame>
  )
}

function Brackets() {
  return (
    <Frame>
      <rect x="36" y="48" width="128" height="104" rx="18" fill="#F4EFE6" stroke={ink} strokeWidth="3" />
      <text x="100" y="118" textAnchor="middle" fontSize="48" fontWeight="800" fill="#062E2A" fontFamily="ui-monospace, monospace">
        {'{ }'}
      </text>
    </Frame>
  )
}

function Pin() {
  return (
    <Frame>
      <path d="M100 28c28 0 46 20 46 46 0 34-46 78-46 78S54 108 54 74c0-26 18-46 46-46z" fill="#FF4A1C" stroke={ink} strokeWidth="3" />
      <circle cx="100" cy="74" r="16" fill="#F4EFE6" stroke={ink} strokeWidth="3" />
    </Frame>
  )
}

function Shield() {
  return (
    <Frame>
      <path
        d="M100 28l58 18v48c0 36-24 58-58 74-34-16-58-38-58-74V46z"
        fill="#0E8F7E"
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M100 58v70M74 86h52" stroke="#F4EFE6" strokeWidth="8" strokeLinecap="round" />
    </Frame>
  )
}

function FormToy() {
  return (
    <Frame>
      <rect x="36" y="36" width="128" height="132" rx="16" fill="#F4EFE6" stroke={ink} strokeWidth="3" />
      <rect x="52" y="56" width="96" height="22" rx="8" fill="#fff" stroke={ink} strokeWidth="3" />
      <rect x="52" y="88" width="96" height="22" rx="8" fill="#fff" stroke={ink} strokeWidth="3" />
      <rect x="52" y="124" width="64" height="22" rx="11" fill="#141414" />
    </Frame>
  )
}

function Monogram({ label = 'RS' }: { label?: string }) {
  return (
    <Iso top="#FFD23F" left="#FF4A1C" right="#C4310E" label={label} labelFill="#fff" />
  )
}

const MONO: Record<string, { top: string; left: string; right: string; label: string; fill?: string }> = {
  IFB: { top: '#fff', left: '#FF8FB1', right: '#E45B86', label: 'IFB' },
  'India First Life': { top: '#fff', left: '#C8A8FF', right: '#8B6AD6', label: 'IFL', fill: '#fff' },
  Palfinger: { top: '#fff', left: '#7CE0FF', right: '#2E9EC4', label: 'PAL' },
  MumbaiFilter: { top: '#fff', left: '#FFD23F', right: '#E0A800', label: 'MF' },
}

export function ToyArt({ id, label }: { id: string; label?: string }) {
  if (id === 'mono') {
    const spec = (label && MONO[label]) || { top: '#fff', left: '#FFD23F', right: '#E0A800', label: label?.slice(0, 3).toUpperCase() || 'RS' }
    return <Iso top={spec.top} left={spec.left} right={spec.right} label={spec.label} labelFill={spec.fill ?? ink} />
  }
  switch (id) {
    case 'chai':
      return <Chai />
    case 'keycap':
      return <Keycap />
    case 'gem':
      return <GemMark />
    case 'window':
      return <WindowToy />
    case 'spark':
      return <Spark />
    case 'card':
      return <CardToy />
    case 'megaphone':
      return <Megaphone />
    case 'stack':
      return <Stack />
    case 'badge':
      return <Badge />
    case 'path':
      return <PathToy />
    case 'plug':
      return <Plug />
    case 'terminal':
      return <Terminal />
    case 'gear':
      return <Gear />
    case 'brackets':
      return <Brackets />
    case 'pin':
      return <Pin />
    case 'shield':
      return <Shield />
    case 'form':
      return <FormToy />
    default:
      return <Monogram label={label} />
  }
}
