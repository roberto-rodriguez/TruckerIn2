
//Used when just need to map lang prop
export default function mapStateToProps({globalReducer}) {
	return {
    lang: globalReducer.config.lang
  }
}
