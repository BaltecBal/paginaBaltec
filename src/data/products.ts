// AUTO-GENERATED from the product Excel files (Borneras, Cajas, Capacitores, Impulsores, Turbinas, Ventiladores).
// Prices and stock counts are intentionally NOT exposed publicly — this is a "show what we have" catalog.
// Real product images will be added later. The UI renders a neutral tile where an image would go.

export interface Product {
  id: string;
  name: string;
  marca: string;
  shortDesc: string;
  image?: string;
  tipo?: 'Estriado' | 'Refrigerante';
  subGroup?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: Product[];
}

const slug = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toProduct = (
  p: { name: string; marca: string; shortDesc: string; tipo?: string; subGroup?: string },
  prefix: string,
  index: number
): Product => ({
  id: prefix + '-' + slug(p.marca + '-' + p.name) + '-' + index,
  name: p.name,
  marca: p.marca,
  shortDesc: p.shortDesc,
  tipo: p.tipo as 'Estriado' | 'Refrigerante' | undefined,
  subGroup: p.subGroup,
});

// ── Borneras ──
const bornerasItems: Product[] = [
  {
    "name": "Bornera BCR 3",
    "marca": "Corradi",
    "shortDesc": "Carcasa C/112 a C/132 — motores grandes"
  },
  {
    "name": "Bornera BCR 3 A",
    "marca": "Corradi",
    "shortDesc": "Carcasa C/112 a C/132 — motores grandes"
  },
  {
    "name": "Bornera BCR 2 A",
    "marca": "Corradi",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera BCR 2",
    "marca": "Corradi",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera BCR 1",
    "marca": "Corradi",
    "shortDesc": "Carcasa C/63 a C/80 — motores pequeños"
  },
  {
    "name": "Bornera BCZ 2",
    "marca": "Czerweny",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera BCZ 0",
    "marca": "Czerweny",
    "shortDesc": "Carcasa C/63 a C/80 — motores pequeños"
  },
  {
    "name": "Bornera BCZ 1",
    "marca": "Czerweny",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera BML-1",
    "marca": "Marelli",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera BML-2",
    "marca": "Marelli",
    "shortDesc": "Carcasa C/112 a C/132 — motores grandes"
  },
  {
    "name": "Bornera BML 3",
    "marca": "Marelli",
    "shortDesc": "Carcasa C/112 a C/132 — motores grandes"
  },
  {
    "name": "Bornera BMH 1",
    "marca": "MotorMech",
    "shortDesc": "Carcasa C/63 a C/80 — motores pequeños"
  },
  {
    "name": "Bornera BMH 2",
    "marca": "MotorMech",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera C/91-100",
    "marca": "Normalizados",
    "shortDesc": "Carcasa C/91 a C/100 — universal normalizada"
  },
  {
    "name": "Bornera C/112-122",
    "marca": "Normalizados",
    "shortDesc": "Carcasa C/112 a C/122 — universal normalizada"
  },
  {
    "name": "Bornera C/90-100",
    "marca": "Normalizados",
    "shortDesc": "Carcasa C/90 a C/100 — universal normalizada"
  },
  {
    "name": "Bornera BSM 2",
    "marca": "Siemens",
    "shortDesc": "Carcasa C/112 a C/132 — motores grandes"
  },
  {
    "name": "Bornera BSM 3",
    "marca": "Siemens",
    "shortDesc": "Carcasa C/132 en adelante — motores de gran porte"
  },
  {
    "name": "Bornera BSM 1",
    "marca": "Siemens",
    "shortDesc": "Carcasa C/90 a C/100 — motores medianos"
  },
  {
    "name": "Bornera C/63-100",
    "marca": "Tipo Weg",
    "shortDesc": "Carcasa C/63 a C/100 — universal normalizada Weg"
  },
  {
    "name": "Bornera C/112-132",
    "marca": "Tipo Weg",
    "shortDesc": "Carcasa C/112 a C/132 — universal normalizada Weg"
  }
].map((p, i) => toProduct(p, 'borneras', i));

// ── Cajas + Cubrecapacitor ──
const cajasConexion = [
  {
    "name": "Valplas",
    "marca": "Motor Blindado C/71",
    "detalle": "Motor Blindado C/71",
    "shortDesc": "Caja de conexión con terminales"
  },
  {
    "name": "Valplas",
    "marca": "Motor Blindado C/80",
    "detalle": "Motor Blindado C/80",
    "shortDesc": "Caja de conexión con terminales"
  },
  {
    "name": "Valplas",
    "marca": "Terminales Diagonal",
    "detalle": "Terminales Diagonal",
    "shortDesc": "Caja de conexión con terminales"
  },
  {
    "name": "Valplas",
    "marca": "Terminales Paralelo",
    "detalle": "Terminales Paralelo",
    "shortDesc": "Caja de conexión con terminales"
  }
];
const cubreCapacitor = [
  {
    "name": "Valplas",
    "marca": "n38 Terminal Diagonal",
    "detalle": "n38 Terminal Diagonal",
    "shortDesc": "Cubre capacitor para protección de bornes y conexiones"
  },
  {
    "name": "Valplas",
    "marca": "n38 c/ protector enchufe",
    "detalle": "n38 c/ protector enchufe",
    "shortDesc": "Cubre capacitor para protección de bornes y conexiones"
  },
  {
    "name": "Valplas",
    "marca": "n38 Terminal Paralelo",
    "detalle": "n38 Terminal Paralelo",
    "shortDesc": "Cubre capacitor para protección de bornes y conexiones"
  },
  {
    "name": "Valplas",
    "marca": "n38 Base Plana",
    "detalle": "n38 Base Plana",
    "shortDesc": "Cubre capacitor para protección de bornes y conexiones"
  },
  {
    "name": "Valplas",
    "marca": "n51 Terminal Paralelo",
    "detalle": "n51 Terminal Paralelo",
    "shortDesc": "Cubre capacitor para protección de bornes y conexiones"
  }
];
const cajasItems: Product[] = [
  ...cajasConexion.map((p, i) => toProduct({ ...p, subGroup: 'Caja de conexión' }, 'caja-conexion', i)),
  ...cubreCapacitor.map((p, i) => toProduct({ ...p, subGroup: 'Cubre capacitor' }, 'cubre-cap', i)),
];

// ── Capacitores ──
const capacitoresItems: Product[] = [
  {
    "name": "Capacitor 1 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 1.5 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 2 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 2.5 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 3 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 4 µF — 400 V",
    "marca": "Axial",
    "shortDesc": "Capacitor axial tipo caramelo 400 V"
  },
  {
    "name": "Capacitor 1.5 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 2 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 2.5 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 3 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 4 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 5 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 6 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 8 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 10 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 12.5 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 14 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 16 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 18 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  },
  {
    "name": "Capacitor 20 µF — 400 V",
    "marca": "Fast-On",
    "shortDesc": "Capacitor Fast-On IRAM 400 V"
  }
].map((p, i) => toProduct(p, 'cap', i));

// ── Impulsores ──
const impulsoresItems: Product[] = [
  {
    "name": "Impulsor Z 0",
    "marca": "Czerweny",
    "shortDesc": "Impulsor serie Z (Czerweny) — para extractores e inyectores"
  },
  {
    "name": "Impulsor Z 1",
    "marca": "Czerweny",
    "shortDesc": "Impulsor serie Z (Czerweny) — para extractores e inyectores"
  },
  {
    "name": "Impulsor Z 2",
    "marca": "Czerweny",
    "shortDesc": "Impulsor serie Z (Czerweny) — para extractores e inyectores"
  },
  {
    "name": "Impulsor Z 3",
    "marca": "Czerweny",
    "shortDesc": "Impulsor serie Z (Czerweny) — para extractores e inyectores"
  },
  {
    "name": "Impulsor 32-25-200",
    "marca": "Czerweny",
    "shortDesc": "Impulsor de geometría específica — para aplicaciones industriales"
  },
  {
    "name": "Impulsor 65-40-200",
    "marca": "Czerweny",
    "shortDesc": "Impulsor de geometría específica — para aplicaciones industriales"
  }
].map((p, i) => toProduct(p, 'imp', i));

// ── Turbinas ──
const turbinasItems: Product[] = [
  {
    "name": "Turbina 160X100+100",
    "marca": "Bimont",
    "shortDesc": "Diámetro 160 mm × ancho 100 mm · eje 12.7 mm · rotación derecha"
  },
  {
    "name": "Turbina 160X100+100",
    "marca": "Bimont",
    "shortDesc": "Diámetro 160 mm × ancho 100 mm · eje 12.7 mm · rotación izquierda"
  },
  {
    "name": "Turbina 180X137,5+137,5",
    "marca": "Bimont",
    "shortDesc": "Diámetro 180 mm × ancho 137 mm · eje 12.7 mm · rotación derecha"
  },
  {
    "name": "Turbina 200X115+115",
    "marca": "Bimont",
    "shortDesc": "Diámetro 200 mm × ancho 115 mm · rotación izquierda"
  },
  {
    "name": "Turbina 240X150+150",
    "marca": "Bimont",
    "shortDesc": "Diámetro 240 mm × ancho 150 mm · eje 12.7 mm · rotación izquierda"
  },
  {
    "name": "Turbina 240X150X150",
    "marca": "Bimont",
    "shortDesc": "Diámetro 240 mm × ancho 150 mm · eje 12.7 mm · rotación derecha"
  },
  {
    "name": "Turbina 250X90X90",
    "marca": "Bimont",
    "shortDesc": "Diámetro 250 mm × ancho 90 mm · eje 12.7 mm · rotación derecha"
  },
  {
    "name": "Turbina 250X90X90",
    "marca": "Bimont",
    "shortDesc": "Diámetro 250 mm × ancho 90 mm · eje 12.7 mm · rotación izquierda"
  },
  {
    "name": "Turbina 300X120X120",
    "marca": "Bimont",
    "shortDesc": "Diámetro 300 mm × ancho 120 mm · eje 12.7 mm · rotación izquierda"
  },
  {
    "name": "Turbina 330X160X160",
    "marca": "Bimont",
    "shortDesc": "Diámetro 330 mm × ancho 160 mm · rotación derecha"
  },
  {
    "name": "Turbina 380X190+190",
    "marca": "Bimont",
    "shortDesc": "Diámetro 380 mm × ancho 190 mm · eje 25.4 mm · rotación derecha"
  },
  {
    "name": "Turbina 380X190+190",
    "marca": "Bimont",
    "shortDesc": "Diámetro 380 mm × ancho 190 mm · eje 25.4 mm · rotación izquierda"
  },
  {
    "name": "Turbina 400X180X180",
    "marca": "Bimont",
    "shortDesc": "Diámetro 400 mm × ancho 180 mm · rotación derecha"
  },
  {
    "name": "Turbina 580X260X260",
    "marca": "Bimont",
    "shortDesc": "Diámetro 580 mm × ancho 260 mm · rotación izquierda"
  }
].map((p, i) => toProduct(p, 'turb', i));

// ── Ventiladores ──
const ventiladoresItems: Product[] = [
  {
    "name": "C/100 183x30",
    "marca": "Acec",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/100 183x30"
  },
  {
    "name": "C/132 240x39",
    "marca": "Acec",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/132 240x39"
  },
  {
    "name": "C/160 274x41",
    "marca": "Acec",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/160 274x41"
  },
  {
    "name": "C/180 315x38",
    "marca": "Acec",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/180 315x38"
  },
  {
    "name": "146x19",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146x19"
  },
  {
    "name": "146x22",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146x22"
  },
  {
    "name": "146x27",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146x27"
  },
  {
    "name": "146X16",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146X16"
  },
  {
    "name": "146X19",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146X19"
  },
  {
    "name": "146X22",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 146X22"
  },
  {
    "name": "143x22",
    "marca": "Angar",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 143x22"
  },
  {
    "name": "143x27",
    "marca": "Angar",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 143x27"
  },
  {
    "name": "128x12",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 128x12"
  },
  {
    "name": "128x14",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 128x14"
  },
  {
    "name": "128x15",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 128x15"
  },
  {
    "name": "143X13",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 143X13"
  },
  {
    "name": "143X16",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 143X16"
  },
  {
    "name": "143x19",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 143x19"
  },
  {
    "name": "143x21",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 143x21"
  },
  {
    "name": "143X27",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 143X27"
  },
  {
    "name": "170x17",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 170x17"
  },
  {
    "name": "170x19",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 170x19"
  },
  {
    "name": "170x22",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 170x22"
  },
  {
    "name": "170x24",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 170x24"
  },
  {
    "name": "170x28",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 170x28"
  },
  {
    "name": "190x16",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x16"
  },
  {
    "name": "190x19",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x19"
  },
  {
    "name": "190x22",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x22"
  },
  {
    "name": "190x24",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x24"
  },
  {
    "name": "190x28",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x28"
  },
  {
    "name": "190x29",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 190x29"
  },
  {
    "name": "235x34",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 235x34"
  },
  {
    "name": "235x38",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 235x38"
  },
  {
    "name": "235x39",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 235x39"
  },
  {
    "name": "235x40",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 235x40"
  },
  {
    "name": "280x38",
    "marca": "Corradi",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 280x38"
  },
  {
    "name": "280x44 Estriado",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 280x44 Estriado"
  },
  {
    "name": "143 Estriado",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 143 Estriado"
  },
  {
    "name": "170 Estriado",
    "marca": "Corradi",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 170 Estriado"
  },
  {
    "name": "120x9,5",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x9,5"
  },
  {
    "name": "120x12",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x12"
  },
  {
    "name": "120x14",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x14"
  },
  {
    "name": "120x16",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x16"
  },
  {
    "name": "120x17",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x17"
  },
  {
    "name": "120x19",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x19"
  },
  {
    "name": "137x14",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x14"
  },
  {
    "name": "137x16",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x16"
  },
  {
    "name": "137x17",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x17"
  },
  {
    "name": "137x19",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x19"
  },
  {
    "name": "137x22",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x22"
  },
  {
    "name": "137x24",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 137x24"
  },
  {
    "name": "171x17",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 171x17"
  },
  {
    "name": "171x19",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 171x19"
  },
  {
    "name": "171x22",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 171x22"
  },
  {
    "name": "171x24",
    "marca": "Czerweny",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 171x24"
  },
  {
    "name": "115x16",
    "marca": "Koynor",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 115x16"
  },
  {
    "name": "135x10",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x10"
  },
  {
    "name": "135x14",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x14"
  },
  {
    "name": "135x15",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x15"
  },
  {
    "name": "135x17",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x17"
  },
  {
    "name": "135x19",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x19"
  },
  {
    "name": "135x22",
    "marca": "Lambda",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 135x22"
  },
  {
    "name": "93x17",
    "marca": "Lavarr",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x17"
  },
  {
    "name": "93x19",
    "marca": "Lavarr",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x19"
  },
  {
    "name": "93x20",
    "marca": "Lavarr",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x20"
  },
  {
    "name": "93x22",
    "marca": "Lavarr",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x22"
  },
  {
    "name": "C/71 115x14",
    "marca": "Marelli",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/71 115x14"
  },
  {
    "name": "C/80 135x17",
    "marca": "Marelli",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/80 135x17"
  },
  {
    "name": "C/90 155x18,1",
    "marca": "Marelli",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/90 155x18,1"
  },
  {
    "name": "C/100 170x16,5",
    "marca": "Marelli",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/100 170x16,5"
  },
  {
    "name": "C/112 185x27",
    "marca": "Marelli",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/112 185x27"
  },
  {
    "name": "C/80 134x14",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/80 134x14"
  },
  {
    "name": "C/80 134x16",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/80 134x16"
  },
  {
    "name": "C/90 147x18",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/90 147x18"
  },
  {
    "name": "C/100 160x22",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/100 160x22"
  },
  {
    "name": "C/112 184x22",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/112 184x22"
  },
  {
    "name": "C/132 215x27",
    "marca": "MotorMech",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — C/132 215x27"
  },
  {
    "name": "93x8",
    "marca": "Pedrollo",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x8"
  },
  {
    "name": "93x10",
    "marca": "Pedrollo",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x10"
  },
  {
    "name": "93x12",
    "marca": "Pedrollo",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 93x12"
  },
  {
    "name": "120x19",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 120x19"
  },
  {
    "name": "125x16",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 125x16"
  },
  {
    "name": "125x19",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 125x19"
  },
  {
    "name": "125x20",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 125x20"
  },
  {
    "name": "125x22",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 125x22"
  },
  {
    "name": "125x28",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 125x28"
  },
  {
    "name": "140x16",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 140x16"
  },
  {
    "name": "140x19",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 140x19"
  },
  {
    "name": "140x22",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 140x22"
  },
  {
    "name": "140x26",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 140x26"
  },
  {
    "name": "140x28",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 140x28"
  },
  {
    "name": "190x27",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x27"
  },
  {
    "name": "190x28",
    "marca": "T.Adaptable",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 190x28"
  },
  {
    "name": "190x29",
    "marca": "T.Adaptable",
    "tipo": "Estriado",
    "shortDesc": "Ventilador estriado — 190x29"
  },
  {
    "name": "160X19",
    "marca": "Fuga",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 160X19"
  },
  {
    "name": "160X22",
    "marca": "Fuga",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 160X22"
  },
  {
    "name": "160X27",
    "marca": "Fuga",
    "tipo": "Refrigerante",
    "shortDesc": "Ventilador refrigerante — 160X27"
  }
].map((p, i) => toProduct(p, 'vent', i));

export const categories: Category[] = [
  {
    id: 'borneras',
    name: 'Borneras',
    description: 'Bornes de conexión para motores eléctricos de baja tensión. Compatibles con las principales marcas del mercado (Corradi, Czerweny, Marelli, MotorMech, Siemens, Weg).',
    items: bornerasItems,
  },
  {
    id: 'cajas',
    name: 'Cajas de conexión y cubrecapacitor',
    description: 'Cajas y cubre-capacitores para protección y conexión de motores monofásicos. Marca Valplas.',
    items: cajasItems,
  },
  {
    id: 'capacitores',
    name: 'Capacitores',
    description: 'Condensadores de arranque y trabajo para motores monofásicos. Versiones axiales y Fast-On IRAM en 400 V.',
    items: capacitoresItems,
  },
  {
    id: 'impulsores',
    name: 'Impulsores',
    description: 'Impulsores para extractores e inyectores de aire. Serie Z y modelos específicos Czerweny.',
    items: impulsoresItems,
  },
  {
    id: 'turbinas',
    name: 'Turbinas',
    description: 'Turbinas industriales de alto caudal marca Bimont, en distintas dimensiones y sentidos de rotación.',
    items: turbinasItems,
  },
  {
    id: 'ventiladores',
    name: 'Ventiladores',
    description: 'Ventiladores refrigerantes y estriados para motores eléctricos. Múltiples marcas y medidas estándar del mercado.',
    items: ventiladoresItems,
  },
];

export const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
