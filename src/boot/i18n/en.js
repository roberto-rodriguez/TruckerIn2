import auth from "src/views/auth/i18n/en";
import profile from "src/views/profile/i18n/en";
import jobs from "src/views/jobs/i18n/en";
import contacts from "src/views/contacts/i18n/en";

const en = {
  ...auth,
  ...profile,
  ...jobs,
  ...contacts,
  general:{
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

  }
}

export default en
