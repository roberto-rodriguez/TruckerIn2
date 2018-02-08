
import * as roles from 'src/components/c/Role'

export function validate(page, data){

    var role = data.roleId

    var fields = null
    var invalidFields = []

   // switch(page){
   //    case 1:
   //         fields =  ['firstName', 'password']
   //
   //         if(role !== roles.COMPANY){
   //           fields.push('lastName')
   //         }
   //         break;
   //    case 2:
   //          fields =  [ 'email', 'phone', 'showPersonalInfo']
   //
   //          // if(!data['location']){
   //          //  invalidFields.push('location')
   //          // }
   //       break;
   //    case 3:
   //          fields =  ['jobStatus']
   //
   //          if(role === roles.DRIVER){
   //            fields = fields.concat([ 'experienceId', 'equipmentId', 'ownerOperator'])
   //          }
   //       break;
   // }
   //
   //  if(fields){
   //        invalidFields =  invalidFields.concat( validatePage(data, fields) )
   //  }


   return invalidFields
}

function validatePage(data, fields){
  return fields.filter((field) => !(data[field] && (data[field].trim ? data[field].trim() : true)))
}
