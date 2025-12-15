'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas del Servicio Nacional de Migraciones
const OFICINAS = [
  { id: 1, nombre: 'Oficina Central Santiago', direccion: 'Fanor Velasco 56', ciudad: 'Santiago', region: 'Metropolitana', telefono: '600 486 3000', tipo: 'Principal', horario: 'Lun-Vie 8:30-14:00' },
  { id: 2, nombre: 'Oficina Providencia', direccion: 'Av. Providencia 1275', ciudad: 'Providencia', region: 'Metropolitana', telefono: '600 486 3000', tipo: 'Atencion', horario: 'Lun-Vie 8:30-14:00' },
  { id: 3, nombre: 'Oficina Estacion Central', direccion: 'Av. Libertador Bernardo OHiggins 3170', ciudad: 'Estacion Central', region: 'Metropolitana', telefono: '600 486 3000', tipo: 'Atencion', horario: 'Lun-Vie 8:30-14:00' },
  { id: 4, nombre: 'Oficina Antofagasta', direccion: 'Washington 2612', ciudad: 'Antofagasta', region: 'Antofagasta', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 5, nombre: 'Oficina Iquique', direccion: 'Serrano 145', ciudad: 'Iquique', region: 'Tarapaca', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 6, nombre: 'Oficina Arica', direccion: 'Patricio Lynch 298', ciudad: 'Arica', region: 'Arica y Parinacota', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 7, nombre: 'Oficina Valparaiso', direccion: 'Melgarejo 669', ciudad: 'Valparaiso', region: 'Valparaiso', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 8, nombre: 'Oficina Concepcion', direccion: 'Caupolican 567', ciudad: 'Concepcion', region: 'Biobio', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 9, nombre: 'Oficina Temuco', direccion: 'Claro Solar 873', ciudad: 'Temuco', region: 'La Araucania', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 10, nombre: 'Oficina Puerto Montt', direccion: 'OHiggins 116', ciudad: 'Puerto Montt', region: 'Los Lagos', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 11, nombre: 'Oficina Punta Arenas', direccion: 'Bories 901', ciudad: 'Punta Arenas', region: 'Magallanes', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 12, nombre: 'Oficina Copiapo', direccion: 'Los Carrera 691', ciudad: 'Copiapo', region: 'Atacama', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 13, nombre: 'Oficina La Serena', direccion: 'Eduardo de la Barra 336', ciudad: 'La Serena', region: 'Coquimbo', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 14, nombre: 'Oficina Rancagua', direccion: 'Campos 423', ciudad: 'Rancagua', region: 'OHiggins', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
  { id: 15, nombre: 'Oficina Talca', direccion: '1 Sur 898', ciudad: 'Talca', region: 'Maule', telefono: '600 486 3000', tipo: 'Regional', horario: 'Lun-Vie 8:30-14:00' },
];

// Tipos de visa
const TIPOS_VISA = [
  {
    tipo: 'Visa Temporaria',
    duracion: '1 ano',
    renovable: true,
    costo: 80000,
    descripcion: 'Para trabajar, estudiar o reunificacion familiar',
    subcategorias: ['Contrato de trabajo', 'Estudiante', 'Reunificacion familiar', 'Profesional', 'Inversionista'],
    requisitos: ['Pasaporte vigente', 'Certificado antecedentes', 'Contrato o matricula', 'Foto carnet']
  },
  {
    tipo: 'Visa de Responsabilidad Democratica',
    duracion: '1 ano',
    renovable: true,
    costo: 0,
    descripcion: 'Para ciudadanos venezolanos y haitianos',
    subcategorias: ['Venezuela', 'Haiti'],
    requisitos: ['Pasaporte o cedula', 'Certificado antecedentes apostillado', 'Formulario especial']
  },
  {
    tipo: 'Permanencia Definitiva',
    duracion: 'Indefinida',
    renovable: false,
    costo: 150000,
    descripcion: 'Residencia permanente en Chile',
    subcategorias: ['Por visa temporaria', 'Por matrimonio', 'Por hijos chilenos'],
    requisitos: ['1-2 anos con visa temporaria', 'Sin ausencias prolongadas', 'Certificado antecedentes', 'Acreditar sustento']
  },
  {
    tipo: 'Visa de Turismo',
    duracion: '90 dias',
    renovable: true,
    costo: 0,
    descripcion: 'Ingreso como turista (segun nacionalidad)',
    subcategorias: ['Sin visa (Mercosur, UE)', 'Visa consular', 'Visa electronica'],
    requisitos: ['Pasaporte vigente', 'Pasaje ida y vuelta', 'Solvencia economica']
  },
  {
    tipo: 'Visa Sujeta a Contrato',
    duracion: 'Segun contrato',
    renovable: true,
    costo: 80000,
    descripcion: 'Vinculada a empleador especifico',
    subcategorias: ['Contrato indefinido', 'Contrato plazo fijo'],
    requisitos: ['Contrato de trabajo notariado', 'Pasaporte vigente', 'Antecedentes', 'Certificado empleador']
  },
  {
    tipo: 'Visa de Estudiante',
    duracion: 'Segun estudios',
    renovable: true,
    costo: 40000,
    descripcion: 'Para estudios superiores en Chile',
    subcategorias: ['Pregrado', 'Postgrado', 'Intercambio'],
    requisitos: ['Carta aceptacion institucion', 'Solvencia economica', 'Seguro de salud', 'Antecedentes']
  },
];

// Costos de tramites
const COSTOS_TRAMITES = {
  visaTemporaria: 80000,
  visaEstudiante: 40000,
  permanenciaDefinitiva: 150000,
  prorrogaTurismo: 100, // USD
  cedulaIdentidad: 5000,
  cambioVisa: 50000,
  permisoTrabajo: 60000,
  certificadoViaje: 15000,
  certificadoPermanencia: 10000,
};

// Etapas del proceso migratorio
const PROCESO_MIGRATORIO = [
  { etapa: 1, titulo: 'Ingreso al pais', descripcion: 'Entrada como turista o con visa consular', duracion: 'Inmediato', documentos: 'Pasaporte, pasaje, reserva hotel' },
  { etapa: 2, titulo: 'Solicitud de visa', descripcion: 'Tramite online en migracion.cl', duracion: '30-90 dias', documentos: 'Formulario, pasaporte, antecedentes, contrato' },
  { etapa: 3, titulo: 'Toma de biometricos', descripcion: 'Huellas y foto en oficina de migraciones', duracion: '1 dia', documentos: 'Cita agendada, pasaporte' },
  { etapa: 4, titulo: 'Estampado de visa', descripcion: 'Visa estampada en pasaporte', duracion: '15-30 dias', documentos: 'Pasaporte original, pago' },
  { etapa: 5, titulo: 'Cedula de identidad', descripcion: 'Tramite en Registro Civil', duracion: '10 dias', documentos: 'Visa estampada, foto, pago' },
  { etapa: 6, titulo: 'RUT y FONASA', descripcion: 'Inscripcion en sistema de salud', duracion: '1 dia', documentos: 'Cedula de identidad' },
];

// Paises con convenios
const CONVENIOS = [
  { pais: 'Mercosur', beneficio: 'Residencia facilitada', paises: 'Argentina, Brasil, Uruguay, Paraguay, Bolivia' },
  { pais: 'Union Europea', beneficio: 'Turismo sin visa 90 dias', paises: '27 paises UE' },
  { pais: 'Peru', beneficio: 'Residencia bilateral', paises: 'Acuerdo especial' },
  { pais: 'Colombia', beneficio: 'Visa de trabajo facilitada', paises: 'Acuerdo bilateral' },
];

// Glosario migratorio
const GLOSARIO = [
  { termino: 'RUT', definicion: 'Rol Unico Tributario, numero de identificacion fiscal para extranjeros' },
  { termino: 'PDI', definicion: 'Policia de Investigaciones, controla fronteras e inmigracion' },
  { termino: 'SERMIG', definicion: 'Servicio Nacional de Migraciones (ex DEM)' },
  { termino: 'Permanencia Definitiva', definicion: 'Residencia permanente que permite vivir y trabajar indefinidamente' },
  { termino: 'Visa Temporaria', definicion: 'Permiso de residencia temporal renovable anualmente' },
  { termino: 'Prorroga de turismo', definicion: 'Extension de 90 dias adicionales para turistas' },
  { termino: 'Subcategoria', definicion: 'Tipo especifico de visa dentro de una categoria principal' },
  { termino: 'Apostilla', definicion: 'Certificacion internacional de documentos (Convenio de La Haya)' },
  { termino: 'Regularizacion', definicion: 'Proceso para legalizar situacion migratoria irregular' },
  { termino: 'Expulsion', definicion: 'Orden de salida obligatoria del pais por infraccion migratoria' },
  { termino: 'Arraigo', definicion: 'Vinculo con Chile que puede facilitar regularizacion (hijos, trabajo)' },
  { termino: 'Tarjeta UNICA', definicion: 'Documento que permite trabajar mientras se tramita la visa' },
];

export default function MigracionChile() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora
  const [tipoTramite, setTipoTramite] = useState('visaTemporaria');
  const [cantidadPersonas, setCantidadPersonas] = useState('1');
  const [incluyeCedula, setIncluyeCedula] = useState(true);

  const tiposUnicos = ['Todos', ...new Set(OFICINAS.map(o => o.tipo))];

  const oficinasFiltradas = OFICINAS.filter(oficina => {
    const cumpleBusqueda = oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          oficina.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                          oficina.region.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleTipo = filtroTipo === 'Todos' || oficina.tipo === filtroTipo;
    return cumpleBusqueda && cumpleTipo;
  });

  const calcularCostoTotal = () => {
    const personas = parseInt(cantidadPersonas) || 1;
    const costoTramite = COSTOS_TRAMITES[tipoTramite as keyof typeof COSTOS_TRAMITES] || 0;
    const costoCedula = incluyeCedula ? COSTOS_TRAMITES.cedulaIdentidad : 0;
    const subtotal = costoTramite + costoCedula;
    const total = subtotal * personas;
    return { costoTramite, costoCedula, subtotal, total, personas };
  };

  const costos = calcularCostoTotal();

  const nombreTramite: Record<string, string> = {
    visaTemporaria: 'Visa Temporaria',
    visaEstudiante: 'Visa Estudiante',
    permanenciaDefinitiva: 'Permanencia Definitiva',
    prorrogaTurismo: 'Prorroga Turismo (USD)',
    cambioVisa: 'Cambio de Visa',
    permisoTrabajo: 'Permiso de Trabajo',
    certificadoViaje: 'Certificado de Viaje',
    certificadoPermanencia: 'Certificado de Permanencia',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-800 to-cyan-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🛂</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Migracion Chile
            </h1>
            <p className="text-teal-100">
              Servicio Nacional de Migraciones - Guia de tramites y visas
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-slate-800/50 backdrop-blur sticky top-0 z-40 border-b border-teal-500/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'buscador', icon: '🔍', label: 'Oficinas' },
              { id: 'visas', icon: '📋', label: 'Tipos de Visa' },
              { id: 'calculadora', icon: '🧮', label: 'Costos' },
              { id: 'proceso', icon: '📊', label: 'Proceso' },
              { id: 'convenios', icon: '🤝', label: 'Convenios' },
              { id: 'glosario', icon: '📖', label: 'Glosario' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Oficinas */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 mb-6 border border-teal-500/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Oficinas de Migraciones
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Buscar por ciudad, region..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none"
                />
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                >
                  {tiposUnicos.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <p className="text-sm text-teal-400">
                {oficinasFiltradas.length} oficinas encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {oficinasFiltradas.map((oficina, i) => (
                <motion.div
                  key={oficina.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700 hover:border-teal-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{oficina.nombre}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      oficina.tipo === 'Principal' ? 'bg-teal-600 text-white' :
                      oficina.tipo === 'Regional' ? 'bg-cyan-600 text-white' :
                      'bg-slate-600 text-gray-300'
                    }`}>
                      {oficina.tipo}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-teal-400">Direccion:</span> {oficina.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-teal-400">Ciudad:</span> {oficina.ciudad}, {oficina.region}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-teal-400">Telefono:</span> {oficina.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-teal-400">Horario:</span> {oficina.horario}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-cyan-900/30 rounded-xl p-4 border border-cyan-500/30">
              <p className="text-cyan-300 text-sm">
                <strong>Importante:</strong> Para la mayoria de los tramites se requiere agendar hora en{' '}
                <a href="https://tramites.serviciomigraciones.cl" target="_blank" className="underline hover:text-white">
                  tramites.serviciomigraciones.cl
                </a>
              </p>
            </div>
          </motion.section>
        )}

        {/* Tipos de Visa */}
        {seccionActiva === 'visas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📋</span> Tipos de Visa en Chile
            </h2>

            <div className="space-y-4">
              {TIPOS_VISA.map((visa, i) => (
                <motion.div
                  key={visa.tipo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{visa.tipo}</h3>
                      <p className="text-gray-400">{visa.descripcion}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-teal-600/30 text-teal-300 rounded-full text-sm">
                        {visa.duracion}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        visa.costo === 0
                          ? 'bg-green-600/30 text-green-300'
                          : 'bg-orange-600/30 text-orange-300'
                      }`}>
                        {visa.costo === 0 ? 'Gratuita' : `$${visa.costo.toLocaleString('es-CL')}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-teal-400 mb-2">Subcategorias:</h4>
                      <div className="flex flex-wrap gap-2">
                        {visa.subcategorias.map((sub) => (
                          <span key={sub} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-teal-400 mb-2">Requisitos principales:</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {visa.requisitos.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-teal-500">•</span> {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Calculadora de Costos */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Costos Migratorios
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-teal-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Datos del tramite</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tipo de tramite</label>
                    <select
                      value={tipoTramite}
                      onChange={(e) => setTipoTramite(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                    >
                      {Object.entries(nombreTramite).map(([key, nombre]) => (
                        <option key={key} value={key}>{nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Cantidad de personas</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={cantidadPersonas}
                      onChange={(e) => setCantidadPersonas(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="cedula"
                      checked={incluyeCedula}
                      onChange={(e) => setIncluyeCedula(e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-teal-500 focus:ring-teal-500"
                    />
                    <label htmlFor="cedula" className="text-gray-300">
                      Incluir cedula de identidad ($5.000 c/u)
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 backdrop-blur rounded-2xl p-6 border border-teal-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Resumen de costos</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>{nombreTramite[tipoTramite]}</span>
                    <span>${costos.costoTramite.toLocaleString('es-CL')}</span>
                  </div>

                  {incluyeCedula && (
                    <div className="flex justify-between text-gray-300">
                      <span>Cedula de identidad</span>
                      <span>${costos.costoCedula.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <div className="border-t border-teal-500/30 pt-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal por persona</span>
                      <span>${costos.subtotal.toLocaleString('es-CL')}</span>
                    </div>
                  </div>

                  {costos.personas > 1 && (
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>x {costos.personas} personas</span>
                    </div>
                  )}

                  <div className="border-t border-teal-500/30 pt-3">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total a pagar</span>
                      <span className="text-teal-400">${costos.total.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-xs text-gray-400">
                    * Costos aproximados 2024. Pueden variar segun nacionalidad y cambios normativos.
                    Consulte en{' '}
                    <a href="https://serviciomigraciones.cl" target="_blank" className="text-teal-400 underline">
                      serviciomigraciones.cl
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Tabla de costos */}
            <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Tabla de costos de referencia</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-teal-400">Tramite</th>
                      <th className="text-right py-3 px-4 text-teal-400">Costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(COSTOS_TRAMITES).map(([key, valor]) => (
                      <tr key={key} className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-gray-300">{nombreTramite[key] || key}</td>
                        <td className="text-right py-3 px-4 text-white">
                          {key === 'prorrogaTurismo' ? `$${valor} USD` : `$${valor.toLocaleString('es-CL')}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        )}

        {/* Proceso Migratorio */}
        {seccionActiva === 'proceso' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📊</span> Proceso Migratorio en Chile
            </h2>

            <div className="relative">
              {PROCESO_MIGRATORIO.map((etapa, i) => (
                <motion.div
                  key={etapa.etapa}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 mb-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
                      {etapa.etapa}
                    </div>
                    {i < PROCESO_MIGRATORIO.length - 1 && (
                      <div className="w-0.5 h-full bg-teal-500/30 mt-2" />
                    )}
                  </div>

                  <div className="flex-1 bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">{etapa.titulo}</h3>
                      <span className="px-3 py-1 bg-teal-600/30 text-teal-300 rounded-full text-sm">
                        {etapa.duracion}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{etapa.descripcion}</p>
                    <div className="text-sm">
                      <span className="text-teal-400">Documentos:</span>{' '}
                      <span className="text-gray-400">{etapa.documentos}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-yellow-900/30 rounded-xl p-4 border border-yellow-500/30 mt-6">
              <h4 className="font-bold text-yellow-400 mb-2">Consejos importantes:</h4>
              <ul className="text-sm text-yellow-200/80 space-y-1">
                <li>• Inicie sus tramites con anticipacion (minimo 30 dias antes del vencimiento)</li>
                <li>• Mantenga copias digitales de todos sus documentos</li>
                <li>• Verifique que sus antecedentes esten apostillados si es requerido</li>
                <li>• Consulte regularmente el estado de su tramite en linea</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Convenios */}
        {seccionActiva === 'convenios' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🤝</span> Convenios Migratorios
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {CONVENIOS.map((convenio, i) => (
                <motion.div
                  key={convenio.pais}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-5 border border-slate-700"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{convenio.pais}</h3>
                  <p className="text-teal-400 font-medium mb-2">{convenio.beneficio}</p>
                  <p className="text-sm text-gray-400">{convenio.paises}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Acuerdo de Residencia Mercosur</h3>
              <p className="text-gray-400 mb-4">
                Chile es parte del Acuerdo de Residencia del Mercosur, que permite a ciudadanos de paises miembros
                y asociados obtener residencia temporal y luego permanente de forma facilitada.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-teal-400 mb-2">Paises miembros:</h4>
                  <p className="text-sm text-gray-400">Argentina, Brasil, Paraguay, Uruguay</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-teal-400 mb-2">Paises asociados:</h4>
                  <p className="text-sm text-gray-400">Bolivia, Colombia, Ecuador, Peru</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                <p className="text-green-300 text-sm">
                  <strong>Beneficio principal:</strong> Residencia temporal por 2 anos con posibilidad de permanencia definitiva,
                  solo presentando pasaporte y antecedentes penales.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario Migratorio
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-teal-400 mb-2">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-teal-500/30 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bold text-white mb-2">Servicio Nacional de Migraciones</h4>
              <a href="https://serviciomigraciones.cl" target="_blank" className="text-teal-400 hover:underline text-sm">
                serviciomigraciones.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Tramites en linea</h4>
              <a href="https://tramites.serviciomigraciones.cl" target="_blank" className="text-teal-400 hover:underline text-sm">
                tramites.serviciomigraciones.cl
              </a>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Atencion telefonica</h4>
              <p className="text-gray-400 text-sm">600 486 3000</p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-6 text-center">
            <p className="text-gray-500 text-sm">
              Parte de{' '}
              <a href="https://newcool-informada.vercel.app" className="text-teal-400 hover:underline">
                NewCooltura Informada
              </a>
              {' '}- Informacion ciudadana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
