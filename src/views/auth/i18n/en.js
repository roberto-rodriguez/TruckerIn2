// é, á, í, ó, ú, ñ
import tos from "src/views/auth/signup/tos/en";

const en = {
  login:{
    slogan: '- Drive your career -',
    login: 'LOGIN',
    createAccount: 'CREATE ACCOUNT',
    forgotPassword: 'Forgot Password?',
    username: 'Username',
    password: 'Password'
  },
  signup:{
    iAccept: 'I accept the ',
    tos: 'Terms of Service',
    acceptAndFinish: 'Accept and Finish',
    next: 'Next',
    sentCodeText: 'We just sent you an Access Code via SMS to the number ',
    titles:{
      welcome:'Welcome to TruckerIn',
      personal: 'Personal Information',
      companyInfo: 'Company Information',
      contact: 'Contact Information',
      experience: 'Professional Experience',
      validatePhone: 'Validate Phone Number',
      tos: 'Terms of Service',
      aboutMe: 'About Me',
      aboutUs: 'About the Company',
      loading: 'You are all set !'
    },
    subTitles:{
      welcome: 'The fastest growing network of Truckers',
      validatePhone: 'We just sent you a 4 digits access code via SMS',
      contact: 'We will never share it without asking you',
      loading: 'Loading...',
      experience: 'Job Preferences'
    },
    subTitlesError:{
      completeRed: 'Please complete fields marked in red',
      validatePhone: 'Invalid Access Code',
      usernameTaken: 'This username is already taken',
      tos: 'Terms of Service must to be accepted'
    },
    bullets:{
      personal: 'Information',
      contact: 'Contact',
      about: 'About',
      validatePhone: 'Validate Phone',
      tos: 'Términos'
    },
    acceptTerms:{
      enjoy: 'Enjoy',
      free: 'FREE',
      forOneYear: ' for one year',
      afterThat: 'After that, some premium features can be paid'
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
      support: 'Contact Us',
      didntReceive: 'Didnt receive Access Code?',
      enterAccessCode: 'Enter Access Code here',
      hint1: 'Make sure to enter the 4 digits we sent you by text message to the number:'
    },
    about: {
      descBroker: 'Describe in few words your role in the Trucking industry, type of Drivers you use to hire.. etc',
      descCompany: 'Describe in few words about the company, type of Drivers it use to hire.. etc'
    }
  },
  tos:{
    ...tos,
    lastUpdated: 'Last updated on February 14th, 2018.'
  },
  forgotPassword: {
    title: 'Forgot Password',
    contactUs: 'Contact Us',
    text: 'Password recovery functionality will be ready in the next version, but for now you can Contact Us and we will help you.'
  }
}

export default en
