
export function validate(page, data){
   switch(page){
      // case 1: return validatePage(data, [ 'firstName', 'lastName', 'username', 'password'])
      // case 2: return validatePage(data, [ 'email', 'phone', 'locationId', 'showPersonalInfo'])
      // case 3: return validatePage(data, [ 'experience', 'jobStatus', 'equipment', 'ownerOperator', 'overRoadExp', 'willTakeOverRoad'])
   }
   return []
}

function validatePage(data, fields){
  return fields.filter((field) => !(data[field] && (data[field].trim ? data[field].trim() : true)))
}
