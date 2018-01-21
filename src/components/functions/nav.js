
import { NavigationActions } from "react-navigation";


export default function nav(navigation, routeName, params){
   navigation.dispatch(  NavigationActions.navigate({routeName, params})   )
}
