import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetForm from 'app/shared_features/set_card/SetForm';
import * as Actions from './EditHistorySetFormActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSet: Actions.saveSet,
        tapExercise: Actions.presentExercise,
        tapTags: Actions.presentTags,
    }, dispatch);
};

const EditHistorySetFormScreen = connect(
    null,
    mapDispatchToProps
)(SetForm);

export default EditHistorySetFormScreen;
