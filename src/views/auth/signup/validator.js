
export function validate(page, data){
    var invalidFields = []
   switch(page){
      // case 1: invalidFields = validatePage(data, [ 'firstName', 'lastName', 'username', 'password'])
      //    break:
      case 2: //invalidFields =  validatePage(data, [ 'email', 'phone',  'showPersonalInfo'])
              if(!data['location']){
                invalidFields.push('location')
              }
      //    break:
      // case 3: invalidFields =  validatePage(data, [ 'experience', 'jobStatus', 'equipment', 'ownerOperator', 'overRoadExp', 'willTakeOverRoad'])
      //    break:
   }
   return invalidFields
}

function validatePage(data, fields){
  return fields.filter((field) => !(data[field] && (data[field].trim ? data[field].trim() : true)))
}
