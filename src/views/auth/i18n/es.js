// é, á, í, ó, ú, ñ
import tos from "src/views/auth/signup/tos/es";

const es = {
  login:{
    slogan: '- Maneje su Profesión -',
    login: 'ENTRAR',
    createAccount: 'CREAR CUENTA',
    forgotPassword: 'Olvidó Contraseña?',
    username: 'Usuario',
    password: 'Contraseña'
  },
  signup:{
    iAccept: 'Yo acepto los ',
    tos: 'Términos de Servicios',
    acceptAndFinish: 'Aceptar y Finalizar',
    next: 'Siguiente',
    sentCodeText: 'Le enviamos un Código de Acceso por mensaje de texto al ',
    titles:{
      welcome:'Bienvenido a TruckerIn',
      personal: 'Información Personal',
      companyInfo: 'Información de la Compañia',
      contact: 'Información de Contacto',
      experience: 'Experiencia Profesional',
      validatePhone: 'Validar Número de Teléfono',
      tos: 'Términos de Servicios',
      aboutMe: 'Sobre Mi',
      aboutUs: 'Sobre Nosotros',
      loading: 'Todo Listo !'
    },
    subTitles:{
      welcome: 'Red de Camioneros y Empleadores',
      validatePhone: 'Le enviamos un código de 4 dijitos via SMS',
      contact: 'Nunca la compartiremos sin consultarle',
      loading: 'Entrando...'
    },
    subTitlesError:{
      completeRed: 'Complete los campos marcados en rojo',
      validatePhone: 'Código de Acceso no Válido',
      usernameTaken: 'Este usuario ya esta tomado',
      tos: 'Los terminos de servicios tienen que ser aceptados'
    },
    bullets:{
      personal: 'Información',
      contact: 'Contacto',
      about: 'Sobre Me',
      validatePhone: 'Validar Teléfono',
      tos: 'Términos'
    },
    acceptTerms:{
      enjoy: 'Disfrute',
      free: 'GRATIS',
      forOneYear: ' por un año',
      afterThat: 'Despues de ese tiempo, algunas funcionalidades específicas podrían ser pagadas.'
    },
    pic:{
      setPic: 'Establecer foto de perfil',
      latter: 'Hacerlo despues'
    },
    roles:{
      driver: 'Chofer',
      broker: 'Broker',
      company: 'Compañia',
      canApply: 'Puede aplicar a trabajos',
      canPost: 'Puede publicar trabajos',
      selectRole: 'SELECCIONAR ROL'
    },
    validatePhone:{
      requestAcess: 'Solicitar nuevo Código de Acceso',
      support: 'Contáctenos',
      didntReceive: '¿No recibió el Código de Acceso?',
      enterAccessCode: 'Entre el Código de Acceso aquí',
      hint1: 'Asegurese de entrar los 4 díjitos que le enviamos por mensaje de texto al número:'
    },
    about: {
      descBroker: 'Describa brevemente su rol en la industria de los camiones, tipo de choferes que sueles contratar... etc',
      descCompany:'Describa brevemente su compañia, tipo de choferes que suele contratar.. etc'
    }
  },
  tos:{
    ...tos,
    lastUpdated: 'Actualizado por ultima vez en February 14th, 2018.'
  },
  forgotPassword: {
    title: 'Olvido Contraseña',
    contactUs: 'Contáctenos',
    text: 'Recuperación de contraseña estara disponible en la próxima versión, pero puede contactarnos y lo ayudaremos a recuperarla ahora.'
  }
}

export default es
