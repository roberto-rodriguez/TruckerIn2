// é, á, í, ó, ú, ñ
import auth from "src/views/auth/i18n/es";
import profile from "src/views/profile/i18n/es";
import jobs from "src/views/jobs/i18n/es";

const es = {
  ...auth,
  ...profile,
  ...jobs,
  general:{
    error: 'Error inesperado. Por favor intente de nuevo.',
    yes: 'Si',
    edit: 'Editar',
    add: 'Adicionar',
    typeHere: 'Escriba aqui...',
    moreThan: 'Mas que '
  }
}

export default es
