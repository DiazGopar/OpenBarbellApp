import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    EMPTY_METRIC,
    AVG_VELOCITY_METRIC,
    RPE_METRIC,
    DURATION_METRIC,
    ROM_METRIC,
    PKH_METRIC,
    PKV_METRIC,
    EMPTY_QUANTIFIER,
    AVG_QUANTIFIER,
    BEST_EVER_QUANTIFIER,
} from 'app/constants/CollapsedMetricTypes';

import PickerModal from 'app/shared_features/picker/PickerModal';
import * as Actions from './SettingsCollapsedMetricActions';
import * as CollapsedSettingsSelectors from 'app/redux/selectors/CollapsedSettingsSelectors';
import * as CollapsedMetricsUtility from 'app/utility/transforms/CollapsedMetrics';

const pickerItem = (metric) => ({
    label: CollapsedMetricsUtility.metricToString(metric),
    value: metric,
});

const mapStateToProps = (state) => {
    switch (CollapsedSettingsSelectors.getCurrentQuantifier(state)) {
        case BEST_EVER_QUANTIFIER:
            var items = [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        case AVG_QUANTIFIER:
            var items = [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
        default:
            var items = [
                pickerItem(AVG_VELOCITY_METRIC),
                pickerItem(PKV_METRIC),
                pickerItem(PKH_METRIC),
                pickerItem(ROM_METRIC),
                pickerItem(DURATION_METRIC),
                pickerItem(RPE_METRIC),
            ];
    };

    return {
        isModalShowing: CollapsedSettingsSelectors.getIsEditingMetric(state),
        items: items,
        selectedValue: CollapsedSettingsSelectors.getCurrentMetric(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectValue: Actions.saveDefaultCollapsedMetricSetting,
        closeModal: Actions.dismissCollapsedMetricSetter
    }, dispatch);
};

const SettingsCollapsedMetrics = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickerModal);

export default SettingsCollapsedMetrics;