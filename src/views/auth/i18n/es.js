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
    completeRed: 'Por favor complete las secciones en rojo',
    iAccept: 'I accept the ',
    tos: 'Terms of Service',
    acceptAndFinish: 'Accept and Finish',
    next: 'Next',
    titles:{
      welcome:'Welcome to TruckerIn',
      personal: 'Personal Information',
      contact: 'Contact Information',
      experience: 'Professional Experience',
      validatePhone: 'Validate Phone Number',
      tos: 'Terms of Service'
    },
    subTitles:{
      welcome: 'The fastest growing network of Truckers',
      validatePhone: 'We just sent you a 4 digits access code via SMS',
      contact: 'We will never share it without asking you' 
    },
    bullets:{
      personal: 'Personal',
      contact: 'Contact',
      experience: 'Experience',
      validatePhone: 'Validar Telefono',
      profilePic: 'Imagen de Perfil',
      tos: 'Términos'
    },
    acceptTerms:{
      enjoy: 'Enjoy',
      free: 'FREE',
      forOneYear: ' for one year',
      afterThat: 'After that, some ',
      premium: 'premium features can be paid'
    },
    pic:{
      setPic: 'Set your profile picture',
      latter: 'Do it latter'
    },
    roles:{
      driver: 'Driver',
      broker: 'Broker',
      company: 'Company'
    },
    validatePhone:{
      requestAcess: 'Request New Access Code',
      support: 'Customer Support',
      didntReceive: 'Didnt receive Access Code?'
    }
  },
  tos:{
    ...tos,
    lastUpdated: 'Last updated on February 14th, 2018.'
  }
}

export default es
