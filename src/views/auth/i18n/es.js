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
    iAccept: 'I accept the ',
    tos: 'Terms of Service',
    acceptAndFinish: 'Accept and Finish',
    next: 'Next',
    titles:{
      welcome:'Welcome to TruckerIn',
      personal: 'Personal Information',
      companyInfo: 'Company Information',
      contact: 'Contact Information',
      experience: 'Professional Experience',
      validatePhone: 'Validate Phone Number',
      tos: 'Terms of Service',
      aboutMe: 'About Me',
      aboutUs: 'About Us'
    },
    titlesError:{
      validatePhone: 'Invalid Access Code'
    },
    subTitles:{
      welcome: 'The fastest growing network of Truckers',
      validatePhone: 'We just sent you a 4 digits access code via SMS',
      contact: 'We will never share it without asking you'
    },
    subTitlesError:{
      completeRed: 'Please complete fields marked in red',
      validatePhone: 'Make sure you entered the right phone number',
      usernameTaken: 'This username is already taken',
      tos: 'Terms of Service must to be accepted'
    },
    bullets:{
      personal: 'Information',
      contact: 'Contact',
      about: 'About',
      validatePhone: 'Validar Telefono',
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
      company: 'Company',
      canApply: 'Can apply to Jobs',
      canPost: 'Can post Jobs Applications',
      selectRole: 'SELECT ROLE'
    },
    validatePhone:{
      requestAcess: 'Request New Access Code',
      support: 'Customer Support',
      didntReceive: 'Didnt receive Access Code?',
      enterAccessCode: 'Enter Access Code here'
    },
    about: {
      descBroker: 'Describe in few words your role in the Trucking industry, type of Drivers you use to hire.. etc',
      descCompany: 'Describe in few words about the company, type of Drivers it use to hire.. etc'
    }
  },
  tos:{
    ...tos,
    lastUpdated: 'Last updated on February 14th, 2018.'
  }
}

export default es
