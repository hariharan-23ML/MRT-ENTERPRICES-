import os

os.makedirs('frontend/public/images/products', exist_ok=True)

# Define accurate vector SVG templates for every medical equipment category & type
# ViewBox is 320 x 240, rounded corners 16, consistent professional aesthetic

def make_svg(sku, name, cat_id, bg_c1, bg_c2, icon_svg):
    safe_name = name.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
    short_title = safe_name[:28] + ('...' if len(safe_name) > 28 else '')
    clean_sku_id = sku.replace('-', '_').lower()

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" fill="none">
  <defs>
    <linearGradient id="bg_{clean_sku_id}" x1="0" y1="0" x2="320" y2="240" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f8fafc"/>
    </linearGradient>
    <radialGradient id="glow_{clean_sku_id}" cx="50%" cy="40%" r="55%">
      <stop stop-color="{bg_c1}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="{bg_c2}" stop-opacity="0.01"/>
    </radialGradient>
  </defs>

  <!-- Background Base & Subtle Glow -->
  <rect width="320" height="240" rx="16" fill="url(#bg_{clean_sku_id})"/>
  <rect width="320" height="240" rx="16" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="160" cy="95" r="85" fill="url(#glow_{clean_sku_id})"/>

  <!-- Category Pill Badge -->
  <rect x="14" y="12" width="76" height="20" rx="10" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <text x="52" y="26" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9" font-weight="700" fill="{bg_c1}" text-anchor="middle">{cat_id}</text>

  <!-- Product Silhouette Vector Graphic -->
  <g id="illustration">
    {icon_svg}
  </g>

  <!-- Bottom SKU Bar -->
  <rect x="12" y="196" width="296" height="34" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="22" y="217" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="10.5" font-weight="700" fill="#0f172a">{short_title}</text>
  <text x="298" y="217" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="9.5" font-weight="600" fill="#64748b" text-anchor="end">{sku}</text>
</svg>'''

# 60 bespoke illustrations mapping each product SKU to its authentic visual
illustrations = {
  # ------------------ CAT-01: PATIENT MONITORING ------------------
  "MED-PM-001": '''<!-- Multiparameter Patient Monitor -->
    <rect x="85" y="38" width="150" height="115" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="3.5"/>
    <rect x="96" y="48" width="128" height="92" rx="6" fill="#1e293b"/>
    <path d="M102 75 L115 75 L122 55 L130 95 L138 68 L145 78 L152 75 L215 75" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M102 105 L130 105 L138 98 L145 112 L152 105 L215 105" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
    <text x="195" y="66" font-family="sans-serif" font-size="11" font-weight="bold" fill="#22c55e">78</text>
    <text x="195" y="96" font-family="sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">99%</text>
    <path d="M160 153 V180 M130 180 H190" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>''',

  "MED-PM-002": '''<!-- Portable Patient Monitor with Handle -->
    <path d="M125 36 C125 24 195 24 195 36" fill="none" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
    <rect x="95" y="36" width="130" height="118" rx="12" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
    <rect x="105" y="46" width="110" height="82" rx="6" fill="#1e293b"/>
    <path d="M112 85 L128 85 L135 68 L143 100 L150 78 L157 88 L164 85 L205 85" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="120" cy="140" r="4" fill="#38bdf8"/>
    <circle cx="134" cy="140" r="4" fill="#64748b"/>
    <circle cx="148" cy="140" r="4" fill="#64748b"/>
    <path d="M110 162 H210" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>''',

  "MED-PM-003": '''<!-- Fetal & Maternal Monitor with Dual Transducers -->
    <rect x="90" y="40" width="140" height="105" rx="8" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
    <rect x="100" y="48" width="120" height="72" rx="4" fill="#1e293b"/>
    <path d="M106 72 Q125 60 145 72 T185 72 T210 72" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
    <path d="M106 98 Q130 85 160 98 T210 98" fill="none" stroke="#38bdf8" stroke-width="2"/>
    <text x="180" y="65" font-family="sans-serif" font-size="10" font-weight="bold" fill="#f43f5e">FHR 142</text>
    <circle cx="70" cy="155" r="14" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
    <path d="M84 155 Q100 160 110 145" fill="none" stroke="#64748b" stroke-width="2.5"/>
    <circle cx="250" cy="155" r="14" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
    <path d="M236 155 Q220 160 210 145" fill="none" stroke="#64748b" stroke-width="2.5"/>''',

  "MED-PM-004": '''<!-- 12-Channel ECG Machine -->
    <polygon points="65,145 255,145 240,65 80,65" fill="#f1f5f9" stroke="#0284c7" stroke-width="3"/>
    <rect x="90" y="72" width="85" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <path d="M96 95 L106 95 L111 82 L116 108 L122 88 L127 98 L133 95 L168 95" fill="none" stroke="#22c55e" stroke-width="2"/>
    <rect x="185" y="75" width="45" height="42" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <path d="M188 88 H225 M188 95 H225 M188 102 H225" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
    <circle cx="100" cy="132" r="3" fill="#64748b"/>
    <circle cx="112" cy="132" r="3" fill="#64748b"/>
    <circle cx="124" cy="132" r="3" fill="#64748b"/>
    <rect x="140" y="128" width="85" height="9" rx="2" fill="#cbd5e1"/>''',

  "MED-PM-005": '''<!-- Handheld Pulse Oximeter -->
    <rect x="120" y="38" width="80" height="130" rx="16" fill="#0f172a" stroke="#0284c7" stroke-width="3"/>
    <rect x="132" y="52" width="56" height="58" rx="6" fill="#1e293b"/>
    <text x="142" y="76" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8">98</text>
    <text x="164" y="70" font-family="sans-serif" font-size="8" fill="#94a3b8">%SpO2</text>
    <text x="144" y="98" font-family="sans-serif" font-size="13" font-weight="bold" fill="#22c55e">72</text>
    <text x="166" y="93" font-family="sans-serif" font-size="8" fill="#94a3b8">BPM</text>
    <circle cx="160" cy="135" r="10" fill="#0284c7"/>
    <path d="M160 38 Q160 20 180 20 T200 45" fill="none" stroke="#64748b" stroke-width="3"/>
    <rect x="195" y="45" width="22" height="16" rx="4" fill="#334155" stroke="#0284c7" stroke-width="2"/>''',

  # ------------------ CAT-02: DIAGNOSTIC IMAGING ------------------
  "MED-DI-001": '''<!-- Portable Ultrasound Scanner with Probe -->
    <rect x="80" y="45" width="110" height="85" rx="6" fill="#0f172a" stroke="#4f46e5" stroke-width="3"/>
    <ellipse cx="135" cy="88" rx="35" ry="25" fill="#1e1b4b" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 2"/>
    <path d="M70 130 H200 L210 148 H60 Z" fill="#cbd5e1" stroke="#4f46e5" stroke-width="2.5"/>
    <path d="M195 138 C220 138 235 155 235 120 V85" fill="none" stroke="#64748b" stroke-width="3.5"/>
    <rect x="228" y="60" width="15" height="26" rx="4" fill="#4f46e5" stroke="#818cf8" stroke-width="2"/>
    <path d="M228 64 H243" stroke="#ffffff" stroke-width="3"/>''',

  "MED-DI-002": '''<!-- Digital X-Ray System -->
    <path d="M100 35 H220 V50 H100 Z" fill="#334155"/>
    <rect x="145" y="50" width="30" height="40" rx="4" fill="#4f46e5" stroke="#818cf8" stroke-width="2.5"/>
    <polygon points="140,90 180,90 170,105 150,105" fill="#94a3b8"/>
    <rect x="110" y="145" width="100" height="12" rx="4" fill="#0f172a"/>
    <path d="M160 105 L120 145 M160 105 L200 145" stroke="#818cf8" stroke-width="2" stroke-dasharray="4 3"/>
    <rect x="80" y="157" width="160" height="14" rx="4" fill="#475569"/>''',

  "MED-DI-003": '''<!-- Mobile C-Arm Fluoroscopy System -->
    <circle cx="160" cy="110" r="55" fill="none" stroke="#4f46e5" stroke-width="12" stroke-dasharray="210 100"/>
    <rect x="145" y="42" width="35" height="22" rx="4" fill="#0f172a" stroke="#818cf8" stroke-width="2"/>
    <circle cx="160" cy="170" r="16" fill="#1e1b4b" stroke="#818cf8" stroke-width="2.5"/>
    <rect x="95" y="165" width="45" height="20" rx="4" fill="#334155"/>
    <circle cx="105" cy="188" r="5" fill="#0f172a"/>
    <circle cx="130" cy="188" r="5" fill="#0f172a"/>''',

  "MED-DI-004": '''<!-- Veterinary Ultrasound Scanner -->
    <rect x="90" y="48" width="120" height="90" rx="8" fill="#1e1b4b" stroke="#4f46e5" stroke-width="3"/>
    <rect x="100" y="58" width="100" height="70" rx="4" fill="#0f172a"/>
    <path d="M130 92 Q150 75 170 92" stroke="#38bdf8" stroke-width="3" fill="none"/>
    <ellipse cx="150" cy="95" rx="18" ry="12" fill="#4f46e5" opacity="0.4"/>
    <path d="M210 138 C230 138 245 125 245 100" fill="none" stroke="#64748b" stroke-width="3"/>
    <rect x="238" y="75" width="14" height="26" rx="4" fill="#4f46e5"/>''',

  "MED-DI-005": '''<!-- Portable Dental X-Ray Unit -->
    <rect x="100" y="70" width="85" height="60" rx="8" fill="#0f172a" stroke="#4f46e5" stroke-width="3"/>
    <polygon points="185,82 245,68 245,118 185,104" fill="#334155" stroke="#4f46e5" stroke-width="2"/>
    <circle cx="245" cy="93" r="14" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
    <path d="M125 130 V165 H145 V130" fill="#475569" stroke="#334155" stroke-width="2"/>''',

  # ------------------ CAT-03: CRITICAL CARE & RESPIRATORY ------------------
  "MED-CC-001": '''<!-- ICU Ventilator -->
    <rect x="110" y="35" width="100" height="85" rx="8" fill="#0f172a" stroke="#db2777" stroke-width="3"/>
    <rect x="120" y="45" width="80" height="65" rx="4" fill="#1e293b"/>
    <path d="M128 75 Q145 60 160 75 T192 75" stroke="#38bdf8" stroke-width="3" fill="none"/>
    <path d="M128 92 Q145 80 160 92 T192 92" stroke="#4ade80" stroke-width="2.5" fill="none"/>
    <path d="M160 120 V175 M125 175 H195" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
    <path d="M130 115 C100 115 100 155 120 165" fill="none" stroke="#cbd5e1" stroke-width="4"/>
    <circle cx="125" cy="182" r="6" fill="#334155"/>
    <circle cx="195" cy="182" r="6" fill="#334155"/>''',

  "MED-CC-002": '''<!-- Transport Ventilator -->
    <rect x="95" y="55" width="130" height="90" rx="10" fill="#1e1b4b" stroke="#db2777" stroke-width="3.5"/>
    <path d="M125 55 V42 C125 36 195 36 195 42 V55" fill="none" stroke="#db2777" stroke-width="4"/>
    <rect x="108" y="70" width="65" height="60" rx="4" fill="#0f172a"/>
    <path d="M115 100 Q130 85 140 100 T165 100" stroke="#22d3ee" stroke-width="2.5" fill="none"/>
    <circle cx="192" cy="85" r="10" fill="#334155" stroke="#f472b6" stroke-width="2"/>
    <circle cx="192" cy="115" r="8" fill="#334155" stroke="#94a3b8" stroke-width="2"/>''',

  "MED-CC-003": '''<!-- BiPAP Therapy Device -->
    <rect x="90" y="65" width="140" height="75" rx="12" fill="#0f172a" stroke="#db2777" stroke-width="3"/>
    <rect x="102" y="78" width="60" height="48" rx="4" fill="#1e293b"/>
    <text x="115" y="105" font-family="sans-serif" font-size="12" font-weight="bold" fill="#38bdf8">14.0</text>
    <text x="115" y="118" font-family="sans-serif" font-size="7" fill="#94a3b8">cmH2O</text>
    <rect x="172" y="75" width="45" height="55" rx="6" fill="#0284c7" opacity="0.3" stroke="#38bdf8" stroke-width="2"/>
    <path d="M217 95 C240 95 240 140 220 155" fill="none" stroke="#cbd5e1" stroke-width="4"/>''',

  "MED-CC-004": '''<!-- Oxygen Concentrator 5 LPM -->
    <rect x="110" y="42" width="100" height="135" rx="10" fill="#f1f5f9" stroke="#db2777" stroke-width="3.5"/>
    <rect x="125" y="55" width="70" height="25" rx="4" fill="#0f172a"/>
    <text x="160" y="72" font-family="sans-serif" font-size="12" font-weight="bold" fill="#22c55e" text-anchor="middle">95.4%</text>
    <rect x="135" y="92" width="16" height="35" rx="3" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
    <circle cx="143" cy="115" r="4" fill="#ef4444"/>
    <circle cx="180" cy="105" r="8" fill="#0f172a"/>
    <circle cx="125" cy="180" r="5" fill="#334155"/>
    <circle cx="195" cy="180" r="5" fill="#334155"/>''',

  "MED-CC-005": '''<!-- Portable Suction Machine -->
    <rect x="85" y="70" width="75" height="85" rx="8" fill="#1e1b4b" stroke="#db2777" stroke-width="3"/>
    <circle cx="122" cy="105" r="14" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
    <path d="M122 105 L129 98" stroke="#ef4444" stroke-width="2"/>
    <rect x="170" y="60" width="55" height="95" rx="8" fill="#38bdf8" opacity="0.25" stroke="#0284c7" stroke-width="2.5"/>
    <rect x="165" y="52" width="65" height="12" rx="3" fill="#475569"/>
    <path d="M150 78 C160 65 175 65 185 70" fill="none" stroke="#cbd5e1" stroke-width="3.5"/>''',

  # ------------------ CAT-04: SURGICAL & OPERATION THEATRE ------------------
  "MED-SU-001": '''<!-- Electrosurgical Unit (ESU) -->
    <rect x="80" y="55" width="160" height="95" rx="8" fill="#0f172a" stroke="#0d9488" stroke-width="3"/>
    <rect x="95" y="70" width="45" height="28" rx="3" fill="#facc15" opacity="0.2" stroke="#eab308" stroke-width="1.5"/>
    <text x="110" y="88" font-family="sans-serif" font-size="11" font-weight="bold" fill="#facc15">300W</text>
    <rect x="150" y="70" width="45" height="28" rx="3" fill="#38bdf8" opacity="0.2" stroke="#0284c7" stroke-width="1.5"/>
    <text x="165" y="88" font-family="sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">120W</text>
    <circle cx="108" cy="125" r="6" fill="#334155" stroke="#eab308" stroke-width="2"/>
    <circle cx="132" cy="125" r="6" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="156" cy="125" r="6" fill="#334155" stroke="#94a3b8" stroke-width="2"/>''',

  "MED-SU-002": '''<!-- LED Surgical Light -->
    <path d="M160 25 V60" stroke="#64748b" stroke-width="6"/>
    <path d="M160 60 L120 85 M160 60 L200 85" stroke="#64748b" stroke-width="5"/>
    <ellipse cx="110" cy="95" rx="32" ry="14" fill="#0f172a" stroke="#0d9488" stroke-width="3"/>
    <circle cx="100" cy="95" r="4" fill="#fef08a"/>
    <circle cx="110" cy="95" r="4" fill="#fef08a"/>
    <circle cx="120" cy="95" r="4" fill="#fef08a"/>
    <ellipse cx="210" cy="95" rx="32" ry="14" fill="#0f172a" stroke="#0d9488" stroke-width="3"/>
    <circle cx="200" cy="95" r="4" fill="#fef08a"/>
    <circle cx="210" cy="95" r="4" fill="#fef08a"/>
    <circle cx="220" cy="95" r="4" fill="#fef08a"/>
    <path d="M90 109 L70 160 M130 109 L150 160" stroke="#fef08a" stroke-width="1.5" stroke-dasharray="3 3"/>''',

  "MED-SU-003": '''<!-- Hydraulic Operating Table -->
    <rect x="75" y="80" width="170" height="16" rx="4" fill="#0d9488" stroke="#115e59" stroke-width="2"/>
    <rect x="80" y="70" width="40" height="10" rx="3" fill="#cbd5e1"/>
    <rect x="125" y="70" width="70" height="10" rx="3" fill="#cbd5e1"/>
    <rect x="200" y="70" width="40" height="10" rx="3" fill="#cbd5e1"/>
    <path d="M160 96 V155 M135 155 H185" stroke="#475569" stroke-width="12" stroke-linecap="round"/>
    <rect x="115" y="155" width="90" height="16" rx="4" fill="#0f172a"/>''',

  "MED-SU-004": '''<!-- Anaesthesia Workstation -->
    <rect x="95" y="40" width="130" height="125" rx="8" fill="#1e293b" stroke="#0d9488" stroke-width="3"/>
    <rect x="108" y="52" width="65" height="35" rx="3" fill="#0f172a"/>
    <rect x="180" y="52" width="35" height="45" rx="4" fill="#0d9488" stroke="#2dd4bf" stroke-width="2"/>
    <rect x="110" y="98" width="8" height="30" fill="#facc15"/>
    <rect x="125" y="98" width="8" height="30" fill="#38bdf8"/>
    <rect x="140" y="98" width="8" height="30" fill="#ffffff"/>
    <circle cx="110" cy="172" r="6" fill="#0f172a"/>
    <circle cx="210" cy="172" r="6" fill="#0f172a"/>''',

  "MED-SU-005": '''<!-- Flexible Video Endoscope System -->
    <rect x="85" y="45" width="85" height="110" rx="6" fill="#0f172a" stroke="#0d9488" stroke-width="3"/>
    <rect x="95" y="55" width="65" height="42" rx="3" fill="#1e293b"/>
    <circle cx="127" cy="76" r="10" fill="#0d9488" opacity="0.6"/>
    <path d="M170 100 C200 100 230 130 200 160 C170 190 230 180 240 140" fill="none" stroke="#2dd4bf" stroke-width="4.5" stroke-linecap="round"/>''',

  # ------------------ CAT-05: LABORATORY & DIAGNOSTIC ------------------
  "MED-LB-001": '''<!-- Automated Hematology Analyzer -->
    <rect x="85" y="45" width="150" height="115" rx="8" fill="#f8fafc" stroke="#7c3aed" stroke-width="3"/>
    <rect x="100" y="58" width="70" height="50" rx="4" fill="#0f172a"/>
    <path d="M108 85 L120 70 L135 95 L155 80" stroke="#a78bfa" stroke-width="2" fill="none"/>
    <rect x="185" y="65" width="35" height="65" rx="4" fill="#ede9fe" stroke="#7c3aed" stroke-width="1.5"/>
    <line x1="202" y1="80" x2="202" y2="120" stroke="#7c3aed" stroke-width="3" stroke-linecap="round"/>''',

  "MED-LB-002": '''<!-- Semi-Automatic Biochemistry Analyzer -->
    <polygon points="75,145 245,145 230,65 90,65" fill="#f1f5f9" stroke="#7c3aed" stroke-width="3"/>
    <rect x="100" y="75" width="65" height="45" rx="4" fill="#0f172a"/>
    <text x="110" y="98" font-family="sans-serif" font-size="10" fill="#a78bfa">Abs 0.421</text>
    <circle cx="190" cy="88" r="12" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
    <circle cx="190" cy="88" r="4" fill="#7c3aed"/>
    <path d="M180 125 H215" stroke="#64748b" stroke-width="3"/>''',

  "MED-LB-003": '''<!-- Laboratory Centrifuge -->
    <ellipse cx="160" cy="85" rx="65" ry="32" fill="#f1f5f9" stroke="#7c3aed" stroke-width="3"/>
    <ellipse cx="160" cy="85" rx="45" ry="20" fill="#0f172a"/>
    <circle cx="160" cy="85" r="8" fill="#7c3aed"/>
    <path d="M160 85 L135 75 M160 85 L185 95 M160 85 L180 75 M160 85 L140 95" stroke="#a78bfa" stroke-width="3"/>
    <rect x="95" y="85" width="130" height="55" rx="6" fill="#f8fafc" stroke="#7c3aed" stroke-width="3"/>
    <rect x="130" y="105" width="60" height="20" rx="3" fill="#0f172a"/>
    <text x="160" y="119" font-family="sans-serif" font-size="9" fill="#22c55e" text-anchor="middle">4000 RPM</text>''',

  "MED-LB-004": '''<!-- Binocular Laboratory Microscope -->
    <path d="M145 40 L135 65 M175 40 L185 65" stroke="#7c3aed" stroke-width="4.5"/>
    <circle cx="145" cy="38" r="6" fill="#334155"/>
    <circle cx="175" cy="38" r="6" fill="#334155"/>
    <path d="M160 65 V110" stroke="#7c3aed" stroke-width="6"/>
    <circle cx="160" cy="110" r="14" fill="#0f172a"/>
    <rect x="130" y="125" width="60" height="8" rx="2" fill="#334155"/>
    <path d="M175 110 C200 130 195 160 175 165" fill="none" stroke="#64748b" stroke-width="8"/>
    <rect x="120" y="165" width="80" height="14" rx="4" fill="#0f172a"/>''',

  "MED-LB-005": '''<!-- Laboratory Refrigerator -->
    <rect x="105" y="35" width="110" height="145" rx="8" fill="#f8fafc" stroke="#7c3aed" stroke-width="3"/>
    <rect x="118" y="48" width="84" height="115" rx="4" fill="#ede9fe" opacity="0.6" stroke="#7c3aed" stroke-width="1.5"/>
    <line x1="118" y1="85" x2="202" y2="85" stroke="#7c3aed" stroke-width="2"/>
    <line x1="118" y1="120" x2="202" y2="120" stroke="#7c3aed" stroke-width="2"/>
    <rect x="140" y="38" width="40" height="8" rx="2" fill="#0f172a"/>
    <text x="160" y="44" font-family="sans-serif" font-size="7" fill="#22c55e" text-anchor="middle">4.0Â°C</text>''',

  # ------------------ CAT-06: HOSPITAL FURNITURE & PATIENT CARE ------------------
  "MED-HF-001": '''<!-- Electric ICU Hospital Bed -->
    <rect x="70" y="85" width="180" height="20" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="75" y="65" width="55" height="20" rx="4" fill="#93c5fd" transform="rotate(-18 75 65)"/>
    <path d="M70 70 V135 M250 70 V135" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
    <rect x="95" y="70" width="60" height="15" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <rect x="170" y="70" width="60" height="15" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
    <circle cx="70" cy="142" r="7" fill="#0f172a"/>
    <circle cx="250" cy="142" r="7" fill="#0f172a"/>''',

  "MED-HF-002": '''<!-- Manual Hospital Bed -->
    <rect x="70" y="85" width="180" height="16" rx="4" fill="#3b82f6"/>
    <path d="M70 65 V135 M250 65 V135" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
    <path d="M70 75 H250" stroke="#cbd5e1" stroke-width="3"/>
    <circle cx="70" cy="142" r="7" fill="#0f172a"/>
    <circle cx="250" cy="142" r="7" fill="#0f172a"/>
    <path d="M250 110 L265 110 L265 125" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/>''',

  "MED-HF-003": '''<!-- Foldable Patient Wheelchair -->
    <circle cx="125" cy="120" r="34" fill="none" stroke="#2563eb" stroke-width="4.5"/>
    <circle cx="125" cy="120" r="26" fill="none" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="125" cy="120" r="6" fill="#0f172a"/>
    <path d="M125 120 L155 90 H195 L205 130" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
    <path d="M155 90 V55 C155 45 140 45 140 55" fill="none" stroke="#334155" stroke-width="4.5"/>
    <circle cx="205" cy="142" r="12" fill="none" stroke="#2563eb" stroke-width="3.5"/>
    <circle cx="205" cy="142" r="3" fill="#0f172a"/>''',

  "MED-HF-004": '''<!-- Patient Transfer Stretcher -->
    <rect x="65" y="80" width="190" height="18" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <rect x="75" y="65" width="170" height="15" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <path d="M100 98 L160 140 M220 98 L160 140" stroke="#64748b" stroke-width="6"/>
    <rect x="130" y="135" width="60" height="8" rx="2" fill="#334155"/>
    <path d="M75 140 H245" stroke="#94a3b8" stroke-width="4"/>
    <circle cx="85" cy="150" r="8" fill="#0f172a"/>
    <circle cx="235" cy="150" r="8" fill="#0f172a"/>''',

  "MED-HF-005": '''<!-- Bedside Locker with Overbed Table -->
    <rect x="95" y="70" width="75" height="95" rx="6" fill="#f8fafc" stroke="#2563eb" stroke-width="3"/>
    <rect x="105" y="80" width="55" height="20" rx="3" fill="#e2e8f0"/>
    <circle cx="132" cy="90" r="3" fill="#0f172a"/>
    <rect x="105" y="108" width="55" height="45" rx="3" fill="#e2e8f0"/>
    <path d="M170 160 V65 H235" stroke="#475569" stroke-width="5" stroke-linecap="round"/>
    <rect x="185" y="55" width="55" height="10" rx="2" fill="#2563eb"/>''',

  # ------------------ CAT-07: STERILIZATION & INFECTION CONTROL ------------------
  "MED-ST-001": '''<!-- Tabletop Steam Autoclave -->
    <rect x="85" y="45" width="150" height="115" rx="14" fill="#0f172a" stroke="#0891b2" stroke-width="3.5"/>
    <circle cx="145" cy="102" r="42" fill="#164e63" stroke="#22d3ee" stroke-width="3"/>
    <circle cx="145" cy="102" r="16" fill="#0f172a" stroke="#0891b2" stroke-width="2.5"/>
    <circle cx="210" cy="75" r="12" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
    <path d="M210 75 L216 70" stroke="#ef4444" stroke-width="2"/>
    <rect x="198" y="105" width="24" height="12" rx="2" fill="#0891b2"/>
    <text x="210" y="114" font-family="sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">134Â°C</text>''',

  "MED-ST-002": '''<!-- Vertical Steam Sterilizer -->
    <rect x="110" y="60" width="100" height="105" rx="8" fill="#f1f5f9" stroke="#0891b2" stroke-width="3.5"/>
    <ellipse cx="160" cy="60" rx="50" ry="16" fill="#0f172a" stroke="#22d3ee" stroke-width="3"/>
    <circle cx="160" cy="60" r="12" fill="#0891b2"/>
    <circle cx="160" cy="40" r="10" fill="#ffffff" stroke="#64748b" stroke-width="2"/>
    <path d="M110 165 V180 M210 165 V180" stroke="#475569" stroke-width="5" stroke-linecap="round"/>''',

  "MED-ST-003": '''<!-- ETO Sterilizer -->
    <rect x="90" y="45" width="140" height="115" rx="10" fill="#1e293b" stroke="#0891b2" stroke-width="3"/>
    <rect x="105" y="60" width="75" height="85" rx="6" fill="#0f172a" stroke="#22d3ee" stroke-width="2"/>
    <rect x="190" y="65" width="28" height="40" rx="3" fill="#0891b2" opacity="0.3"/>
    <text x="204" y="88" font-family="sans-serif" font-size="9" font-weight="bold" fill="#22d3ee" text-anchor="middle">ETO</text>
    <circle cx="204" cy="125" r="6" fill="#ef4444"/>''',

  "MED-ST-004": '''<!-- Washer Disinfector -->
    <rect x="95" y="45" width="130" height="125" rx="10" fill="#f8fafc" stroke="#0891b2" stroke-width="3"/>
    <rect x="110" y="60" width="100" height="90" rx="6" fill="#ecfeff" stroke="#22d3ee" stroke-width="2"/>
    <circle cx="160" cy="105" r="28" fill="none" stroke="#0891b2" stroke-width="2.5" stroke-dasharray="6 3"/>
    <path d="M140 105 H180 M160 85 V125" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>''',

  "MED-ST-005": '''<!-- UV-C Room Disinfection Unit -->
    <rect x="130" y="40" width="60" height="120" rx="6" fill="#0f172a" stroke="#0891b2" stroke-width="3"/>
    <rect x="142" y="48" width="10" height="100" rx="4" fill="#a5f3fc" stroke="#22d3ee" stroke-width="1.5"/>
    <rect x="168" y="48" width="10" height="100" rx="4" fill="#a5f3fc" stroke="#22d3ee" stroke-width="1.5"/>
    <circle cx="160" cy="98" r="45" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4 4"/>
    <rect x="115" y="160" width="90" height="16" rx="4" fill="#334155"/>
    <circle cx="125" cy="180" r="5" fill="#0f172a"/>
    <circle cx="195" cy="180" r="5" fill="#0f172a"/>''',

  # ------------------ CAT-08: INFUSION & DRUG DELIVERY ------------------
  "MED-ID-001": '''<!-- Volumetric Infusion Pump -->
    <rect x="105" y="45" width="110" height="120" rx="10" fill="#0f172a" stroke="#d97706" stroke-width="3.5"/>
    <rect x="118" y="58" width="84" height="42" rx="4" fill="#1e293b"/>
    <text x="160" y="82" font-family="sans-serif" font-size="14" font-weight="bold" fill="#22c55e" text-anchor="middle">125.0</text>
    <text x="160" y="93" font-family="sans-serif" font-size="7" fill="#94a3b8" text-anchor="middle">mL / hr</text>
    <path d="M105 120 H215" stroke="#d97706" stroke-width="3"/>
    <circle cx="135" cy="142" r="6" fill="#22c55e"/>
    <circle cx="160" cy="142" r="6" fill="#eab308"/>
    <circle cx="185" cy="142" r="6" fill="#ef4444"/>
    <path d="M160 45 V30 M160 165 V180" stroke="#64748b" stroke-width="3.5"/>''',

  "MED-ID-002": '''<!-- Syringe Infusion Pump -->
    <rect x="75" y="65" width="170" height="90" rx="8" fill="#1e293b" stroke="#d97706" stroke-width="3"/>
    <rect x="90" y="78" width="60" height="32" rx="3" fill="#0f172a"/>
    <text x="120" y="98" font-family="sans-serif" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">5.0 ml/h</text>
    <rect x="160" y="85" width="70" height="18" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <rect x="210" y="80" width="8" height="28" fill="#d97706"/>
    <line x1="218" y1="94" x2="245" y2="94" stroke="#d97706" stroke-width="4"/>''',

  "MED-ID-003": '''<!-- Enteral Feeding Pump -->
    <rect x="110" y="50" width="100" height="115" rx="10" fill="#f8fafc" stroke="#d97706" stroke-width="3"/>
    <circle cx="160" cy="95" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
    <circle cx="160" cy="95" r="10" fill="#d97706"/>
    <path d="M136 95 C136 75 184 75 184 95" fill="none" stroke="#22c55e" stroke-width="3"/>
    <rect x="130" y="130" width="60" height="20" rx="3" fill="#0f172a"/>
    <text x="160" y="143" font-family="sans-serif" font-size="9" fill="#22c55e" text-anchor="middle">FEED 80ml</text>''',

  "MED-ID-004": '''<!-- IV Fluid Warmer -->
    <rect x="115" y="45" width="90" height="125" rx="8" fill="#0f172a" stroke="#d97706" stroke-width="3"/>
    <path d="M140 60 C180 75 140 105 180 120" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
    <rect x="130" y="135" width="60" height="22" rx="3" fill="#1e293b"/>
    <text x="160" y="150" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="middle">38.5Â°C</text>''',

  "MED-ID-005": '''<!-- Infusion Pump Docking Station -->
    <rect x="120" y="35" width="80" height="145" rx="6" fill="#1e293b" stroke="#d97706" stroke-width="3"/>
    <rect x="130" y="45" width="60" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="130" y="73" width="60" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="130" y="101" width="60" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
    <rect x="130" y="129" width="60" height="22" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5"/>
    <path d="M160 35 V20 M160 180 V195" stroke="#64748b" stroke-width="4"/>''',

  # ------------------ CAT-09: GENERAL MEDICAL & EXAMINATION ------------------
  "MED-GM-001": '''<!-- Aneroid Blood Pressure Monitor -->
    <circle cx="120" cy="85" r="32" fill="#ffffff" stroke="#059669" stroke-width="3.5"/>
    <circle cx="120" cy="85" r="4" fill="#0f172a"/>
    <line x1="120" y1="85" x2="135" y2="70" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M100 85 A20 20 0 0 1 140 85" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="170" y="65" width="75" height="55" rx="6" fill="#047857" stroke="#065f46" stroke-width="2"/>
    <path d="M120 117 C120 145 155 145 180 120" fill="none" stroke="#334155" stroke-width="3"/>
    <ellipse cx="205" cy="145" rx="16" ry="10" fill="#1e293b" stroke="#059669" stroke-width="2"/>''',

  "MED-GM-002": '''<!-- Digital Clinical Thermometer -->
    <path d="M90 140 L210 50" stroke="#059669" stroke-width="14" stroke-linecap="round"/>
    <path d="M85 145 L105 130" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/>
    <rect x="145" y="80" width="35" height="14" rx="2" fill="#0f172a" transform="rotate(-37 145 80)"/>
    <circle cx="215" cy="45" r="6" fill="#047857"/>''',

  "MED-GM-003": '''<!-- Professional Acoustic Stethoscope -->
    <path d="M125 40 C125 75 195 75 195 40" fill="none" stroke="#059669" stroke-width="5" stroke-linecap="round"/>
    <path d="M160 68 V125 C160 160 215 160 215 125" fill="none" stroke="#334155" stroke-width="4.5"/>
    <circle cx="215" cy="120" r="16" fill="#cbd5e1" stroke="#059669" stroke-width="3"/>
    <circle cx="215" cy="120" r="6" fill="#047857"/>
    <circle cx="125" cy="38" r="4" fill="#0f172a"/>
    <circle cx="195" cy="38" r="4" fill="#0f172a"/>''',

  "MED-GM-004": '''<!-- Portable Nebulizer -->
    <rect x="95" y="65" width="85" height="80" rx="10" fill="#f8fafc" stroke="#059669" stroke-width="3"/>
    <circle cx="137" cy="105" r="16" fill="#d1fae5"/>
    <path d="M180 100 H210 V85" stroke="#38bdf8" stroke-width="3.5" fill="none"/>
    <rect x="200" y="65" width="22" height="25" rx="4" fill="#059669"/>
    <path d="M211 65 C211 45 225 45 235 55" fill="none" stroke="#a7f3d0" stroke-width="2.5" stroke-dasharray="2 2"/>''',

  "MED-GM-005": '''<!-- Digital Glucometer Kit -->
    <rect x="110" y="50" width="75" height="110" rx="14" fill="#0f172a" stroke="#059669" stroke-width="3"/>
    <rect x="122" y="65" width="50" height="42" rx="4" fill="#1e293b"/>
    <text x="147" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399" text-anchor="middle">108</text>
    <text x="147" y="100" font-family="sans-serif" font-size="6" fill="#94a3b8" text-anchor="middle">mg/dL</text>
    <rect x="142" y="155" width="10" height="15" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
    <path d="M205 75 L205 145" stroke="#475569" stroke-width="10" stroke-linecap="round"/>
    <path d="M205 65 L205 75" stroke="#ef4444" stroke-width="4"/>''',

  # ------------------ CAT-10: EMERGENCY & TRAUMA ------------------
  "MED-ET-001": '''<!-- Biphasic Defibrillator -->
    <rect x="85" y="45" width="150" height="115" rx="10" fill="#1e1b4b" stroke="#dc2626" stroke-width="3.5"/>
    <rect x="98" y="58" width="75" height="55" rx="4" fill="#0f172a"/>
    <path d="M104 88 L114 88 L120 72 L128 102 L136 82 L148 88 L168 88" stroke="#22c55e" stroke-width="2" fill="none"/>
    <circle cx="205" cy="75" r="16" fill="#dc2626"/>
    <text x="205" y="79" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">SHOCK</text>
    <rect x="98" y="125" width="30" height="22" rx="3" fill="#475569"/>
    <rect x="140" y="125" width="30" height="22" rx="3" fill="#475569"/>''',

  "MED-ET-002": '''<!-- Emergency Crash Cart -->
    <rect x="105" y="45" width="110" height="120" rx="6" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
    <rect x="115" y="58" width="90" height="18" rx="2" fill="#ffffff"/>
    <rect x="115" y="82" width="90" height="18" rx="2" fill="#ffffff"/>
    <rect x="115" y="106" width="90" height="18" rx="2" fill="#ffffff"/>
    <rect x="115" y="130" width="90" height="24" rx="2" fill="#ffffff"/>
    <path d="M95 38 H135 V45" stroke="#64748b" stroke-width="3" fill="none"/>
    <circle cx="115" cy="172" r="6" fill="#0f172a"/>
    <circle cx="205" cy="172" r="6" fill="#0f172a"/>''',

  "MED-ET-003": '''<!-- Bag-Valve-Mask Resuscitator (Ambu Bag) -->
    <ellipse cx="145" cy="100" rx="45" ry="24" fill="#38bdf8" opacity="0.4" stroke="#0284c7" stroke-width="3"/>
    <rect x="190" y="90" width="22" height="20" rx="3" fill="#475569"/>
    <ellipse cx="230" cy="100" rx="16" ry="12" fill="#ffffff" stroke="#0284c7" stroke-width="2.5"/>
    <ellipse cx="85" cy="100" rx="16" ry="8" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>''',

  "MED-ET-004": '''<!-- Emergency Portable Suction Unit -->
    <rect x="95" y="60" width="80" height="95" rx="8" fill="#dc2626" stroke="#991b1b" stroke-width="3"/>
    <circle cx="135" cy="95" r="14" fill="#ffffff" stroke="#334155" stroke-width="2"/>
    <rect x="180" y="55" width="45" height="100" rx="6" fill="#38bdf8" opacity="0.3" stroke="#0284c7" stroke-width="2"/>
    <path d="M150 72 C165 58 180 58 195 65" fill="none" stroke="#cbd5e1" stroke-width="3.5"/>''',

  "MED-ET-005": '''<!-- Spinal Immobilization Board -->
    <rect x="75" y="80" width="170" height="42" rx="12" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
    <rect x="95" y="93" width="22" height="15" rx="5" fill="#ffffff"/>
    <rect x="145" y="93" width="22" height="15" rx="5" fill="#ffffff"/>
    <rect x="195" y="93" width="22" height="15" rx="5" fill="#ffffff"/>
    <path d="M110 75 V125 M180 75 V125" stroke="#1e293b" stroke-width="3"/>''',

  # ------------------ CAT-11: MEDICAL CONSUMABLES & DISPOSABLES ------------------
  "MED-MC-001": '''<!-- Nitrile Examination Gloves -->
    <rect x="80" y="55" width="100" height="75" rx="6" fill="#f8fafc" stroke="#65a30d" stroke-width="2.5"/>
    <ellipse cx="130" cy="88" rx="28" ry="14" fill="#a3e635" opacity="0.3"/>
    <path d="M175 90 C190 75 220 75 225 100 C230 115 210 135 190 140 Z" fill="#65a30d" opacity="0.85" stroke="#4d7c0f" stroke-width="2"/>
    <path d="M190 90 L195 70 M202 90 L210 65 M214 95 L225 75" stroke="#4d7c0f" stroke-width="3" stroke-linecap="round"/>''',

  "MED-MC-002": '''<!-- Disposable Syringe 5 mL -->
    <rect x="85" y="92" width="115" height="26" rx="4" fill="#ffffff" stroke="#65a30d" stroke-width="2.5"/>
    <line x1="105" y1="92" x2="105" y2="105" stroke="#65a30d" stroke-width="2"/>
    <line x1="125" y1="92" x2="125" y2="105" stroke="#65a30d" stroke-width="2"/>
    <line x1="145" y1="92" x2="145" y2="105" stroke="#65a30d" stroke-width="2"/>
    <line x1="165" y1="92" x2="165" y2="105" stroke="#65a30d" stroke-width="2"/>
    <path d="M200 97 H255 M255 105 H200" stroke="#334155" stroke-width="2"/>
    <rect x="255" y="92" width="6" height="26" fill="#334155"/>
    <path d="M85 105 H50" stroke="#94a3b8" stroke-width="2.5"/>''',

  "MED-MC-003": '''<!-- IV Cannula 20G -->
    <rect x="110" y="95" width="75" height="20" rx="3" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
    <polygon points="135,95 155,75 165,95" fill="#ec4899"/>
    <polygon points="135,115 155,135 165,115" fill="#ec4899"/>
    <path d="M185 105 H255" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
    <rect x="85" y="98" width="25" height="14" rx="2" fill="#cbd5e1"/>''',

  "MED-MC-004": '''<!-- 3-Ply Surgical Face Masks -->
    <rect x="90" y="68" width="140" height="75" rx="6" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
    <line x1="90" y1="88" x2="230" y2="88" stroke="#0284c7" stroke-width="2"/>
    <line x1="90" y1="108" x2="230" y2="108" stroke="#0284c7" stroke-width="2"/>
    <line x1="90" y1="128" x2="230" y2="128" stroke="#0284c7" stroke-width="2"/>
    <path d="M90 78 C65 78 65 133 90 133" fill="none" stroke="#94a3b8" stroke-width="2.5"/>
    <path d="M230 78 C255 78 255 133 230 133" fill="none" stroke="#94a3b8" stroke-width="2.5"/>''',

  "MED-MC-005": '''<!-- Sterile Gauze Dressing Pack -->
    <rect x="95" y="55" width="130" height="100" rx="8" fill="#ffffff" stroke="#65a30d" stroke-width="3"/>
    <path d="M110 75 H210 M110 95 H210 M110 115 H210 M110 135 H210" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M130 55 V155 M160 55 V155 M190 55 V155" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="185" y="42" width="45" height="22" rx="3" fill="#65a30d"/>
    <text x="207" y="56" font-family="sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">STERILE</text>''',

  # ------------------ CAT-12: MEDICAL GAS & OXYGEN SYSTEMS ------------------
  "MED-MG-001": '''<!-- Medical Oxygen Cylinder -->
    <rect x="135" y="45" width="50" height="130" rx="20" fill="#0369a1" stroke="#0284c7" stroke-width="3"/>
    <rect x="135" y="45" width="50" height="40" rx="10" fill="#ffffff"/>
    <rect x="150" y="25" width="20" height="20" rx="3" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="160" cy="115" r="14" fill="#0284c7"/>
    <text x="160" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">O2</text>''',

  "MED-MG-002": '''<!-- Oxygen Flowmeter with Humidifier Bottle -->
    <rect x="145" y="35" width="28" height="65" rx="4" fill="#f8fafc" stroke="#0369a1" stroke-width="2.5"/>
    <line x1="159" y1="45" x2="159" y2="88" stroke="#0284c7" stroke-width="2"/>
    <circle cx="159" cy="65" r="4" fill="#ef4444"/>
    <rect x="135" y="100" width="48" height="65" rx="8" fill="#38bdf8" opacity="0.3" stroke="#0284c7" stroke-width="2.5"/>
    <path d="M140 140 Q159 135 178 140" stroke="#0284c7" stroke-width="2" fill="none"/>
    <path d="M173 50 H195" stroke="#64748b" stroke-width="3"/>''',

  "MED-MG-003": '''<!-- Medical Gas Regulator -->
    <circle cx="130" cy="85" r="22" fill="#ffffff" stroke="#0369a1" stroke-width="3"/>
    <circle cx="185" cy="85" r="22" fill="#ffffff" stroke="#0369a1" stroke-width="3"/>
    <path d="M130 85 L140 75 M185 85 L175 75" stroke="#ef4444" stroke-width="2"/>
    <rect x="125" y="107" width="65" height="25" rx="4" fill="#eab308" stroke="#ca8a04" stroke-width="2"/>
    <path d="M157 132 V165" stroke="#64748b" stroke-width="8"/>''',

  "MED-MG-004": '''<!-- Medical Vacuum Regulator -->
    <rect x="120" y="45" width="80" height="95" rx="10" fill="#0f172a" stroke="#0369a1" stroke-width="3"/>
    <circle cx="160" cy="85" r="24" fill="#ffffff" stroke="#0284c7" stroke-width="2.5"/>
    <path d="M160 85 L172 75" stroke="#ef4444" stroke-width="2.5"/>
    <rect x="140" y="125" width="40" height="24" rx="4" fill="#38bdf8" opacity="0.3" stroke="#0284c7" stroke-width="2"/>
    <path d="M160 149 V175" stroke="#64748b" stroke-width="4"/>''',

  "MED-MG-005": '''<!-- Medical Gas Manifold System -->
    <rect x="120" y="45" width="80" height="85" rx="6" fill="#334155" stroke="#0369a1" stroke-width="3"/>
    <circle cx="145" cy="75" r="10" fill="#22c55e"/>
    <circle cx="175" cy="75" r="10" fill="#ef4444"/>
    <path d="M70 100 H120 M200 100 H250" stroke="#0284c7" stroke-width="6"/>
    <path d="M75 100 V160 M95 100 V160 M225 100 V160 M245 100 V160" stroke="#0369a1" stroke-width="4"/>
    <rect x="70" y="140" width="10" height="28" rx="2" fill="#0284c7"/>
    <rect x="90" y="140" width="10" height="28" rx="2" fill="#0284c7"/>
    <rect x="220" y="140" width="10" height="28" rx="2" fill="#0284c7"/>
    <rect x="240" y="140" width="10" height="28" rx="2" fill="#0284c7"/>'''
}

# Colors by category
cat_colors = {
    'CAT-01': ('#0284c7', '#38bdf8'),
    'CAT-02': ('#4f46e5', '#818cf8'),
    'CAT-03': ('#db2777', '#f472b6'),
    'CAT-04': ('#0d9488', '#2dd4bf'),
    'CAT-05': ('#7c3aed', '#a78bfa'),
    'CAT-06': ('#2563eb', '#60a5fa'),
    'CAT-07': ('#0891b2', '#22d3ee'),
    'CAT-08': ('#d97706', '#fbbf24'),
    'CAT-09': ('#059669', '#34d399'),
    'CAT-10': ('#dc2626', '#f87171'),
    'CAT-11': ('#65a30d', '#a3e635'),
    'CAT-12': ('#0369a1', '#38bdf8'),
}

# Load products list
with open('frontend/src/data/catalogue/products.ts', 'r', encoding='utf-8') as f:
    text = f.read()

import json
prefix = 'export const PRODUCTS: Product[] = '
start = text.find(prefix) + len(prefix)
end = text.rfind(';\n\nexport const getProductBySku')
products = json.loads(text[start:end])

count = 0
for p in products:
    sku = p['sku']
    name = p['name']
    cat_id = p['categoryId']
    c1, c2 = cat_colors.get(cat_id, ('#6366f1', '#a5b4fc'))

    icon_content = illustrations.get(sku)
    if not icon_content:
        # Fallback to category based graphic
        icon_content = f'''<rect x="100" y="60" width="120" height="80" rx="8" fill="#1e293b" stroke="{c1}" stroke-width="3"/>
        <text x="160" y="105" font-family="sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">{name[:15]}</text>'''

    svg_data = make_svg(sku, name, cat_id, c1, c2, icon_content)
    filepath = f'frontend/public/images/products/{sku.lower()}.svg'
    with open(filepath, 'w', encoding='utf-8') as out:
        out.write(svg_data)
    count += 1

print(f"Generated {count} authentic medical equipment illustrations.")
