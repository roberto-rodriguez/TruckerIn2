
export function isValid(page, validForm, validFields){

   return validForm || validFields[page]
}


export function validate(page, data){

   switch(page){
     case 1: return data.firstName && data.lastName && data.username && data.password
     case 2: return data.email && data.phone && data.locationId && data.showContactInfo
    // case 3: return data.firstName && data.lastName && data.username && data.password
   }

}

export function isValidForm(page, validFields){

   switch(page){
     case 3: return validFields[1] && validFields[2] && validFields[3]
   }

}
