export default function Logo() {
  return (
    <svg className="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#14b8a6"/><stop offset="1" stopColor="#0d4f55"/></linearGradient></defs>
      <rect width="48" height="48" rx="14" fill="url(#lg)"/>
      <path className="lh" d="M24 38C10 29 8 19 14.500 15.500 19 13.200 22.500 15.500 24 18.500 25.500 15.500 29 13.200 33.500 15.500 40 19 38 29 24 38Z" fill="#fff"/>
      <path className="ecg" d="M7 26H16L19.500 19.500 24 32 27.500 22 29.500 26H41" fill="none" stroke="#d62839" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>)
}
