import auth from "src/views/auth/i18n/en";
import profile from "src/views/profile/i18n/en";
import jobs from "src/views/jobs/i18n/en";
import contacts from "src/views/contacts/i18n/en";
import settings from "src/views/sidebar/i18n/en";
import cmp from "src/components/i18n/en";


const en = {
  ...auth,
  ...profile,
  ...jobs,
  ...contacts,
  ...settings,
  ...cmp,
  general:{
    hi: 'Hi ',
    error: 'Unexpected Error. Please try again.',
    yes: 'Yes',
    edit: 'Edit',
    add: 'Add',
    typeHere: 'Type here...',
    moreThan: 'More than ',
    atLeast: 'At least ',
    any: 'Any',
    anywhere: 'Anywhere',
    where: 'Where',
    successfuly: 'successfuly',
    sendMsg: 'Send a message...',
    tabs:{
      jobs: 'Jobs',
      contacts: 'Contacts'
    },
    error:{
      contactUs: 'Unexpected Error. Please Contact Us to help you fix the problem.',
      timeout: 'Make sure you are connected to internet and try again.',
      problem: 'Opss.. there was a problem'
    }
  },
  notifications:{
    title: 'Notifications'
  }
}

export default en
