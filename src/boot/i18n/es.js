// é, á, í, ó, ú, ñ
import auth from "src/views/auth/i18n/es";
import profile from "src/views/profile/i18n/es";
import jobs from "src/views/jobs/i18n/es";
import contacts from "src/views/contacts/i18n/es";
import settings from "src/views/sidebar/i18n/es";
import cmp from "src/components/i18n/es";

const es = {
  ...auth,
  ...profile,
  ...jobs,
  ...contacts,
  ...settings,
  ...cmp,
  general:{
    error: 'Error inesperado. Por favor intente de nuevo.',
    yes: 'Si',
    edit: 'Editar',
    add: 'Adicionar',
    typeHere: 'Escriba aqui...',
    moreThan: 'Mas de ',
    atLeast: 'Al menos ',
    any: 'Cualquiera',
    anywhere: 'Dondequiera',
    where: 'Donde',
    tabs:{
      jobs: 'Trabajos',
      contacts: 'Contactos'
    }
  },
  notifications:{
    title: 'Notificaciones'
  }

}

export default es
