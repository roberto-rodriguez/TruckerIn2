
//Used to get the name of hte configs
export default function parseConfig(props, profileInfo, profileExperience, configs) {

	return props.reduce((acc, prop) => {
													var val = 'Not Found';

													var roleId = profileInfo.roleId

													var data = profileExperience
													var config = configs[prop + 'Options']

													switch(prop){
														case 'role':
															data = profileInfo
															break;
														case 'jobStatus':
															if(roleId != 1){
																config = configs['hiringStatusOptions']
															}
													}

													if(config){
														var selectedConfig = config.filter(c => c.id === data[prop + 'Id'])
														if(selectedConfig && selectedConfig.length > 0){
															val = selectedConfig[0].name
														}
													}
                               acc[prop] = val;
                               return acc;
                             }, {})
}
