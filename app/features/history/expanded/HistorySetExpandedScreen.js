import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './HistorySetExpandedActions';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import SetExpandedView from 'app/shared_features/expanded_set/SetExpandedView';

const mapStateToProps = (state) => {
    if (state.history.expandedSetID !== null) {
        var set = SetsSelectors.getExpandedHistorySet(state.sets, state.history.expandedSetID);
        var repNum = 0;
        var vms = set.reps.map((rep) => {
            repNum++;
            let data = rep.data;

            var duration = RepDataMap.durationOfLift(data)
            if (duration !== null) {
                duration = (duration / 1000000.0).toFixed(2);
            } else {
                duration = "obv2 only";
            }

            return {
                key: "rep"+repNum,
                removed: rep.removed,
                values: [
                    repNum,
                    RepDataMap.averageVelocity(data),
                    RepDataMap.peakVelocity(data),
                    RepDataMap.peakVelocityLocation(data),
                    RepDataMap.rangeOfMotion(data),
                    duration,
                ]
            };
        });
    }

    return {
        visible: state.history.expandedSetID !== null,
        rows: vms
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: Actions.dismissExpanded,
    }, dispatch);
};
 
const HistorySetExpandedScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetExpandedView);

export default HistorySetExpandedScreen;
