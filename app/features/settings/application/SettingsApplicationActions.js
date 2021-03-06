import {
    PRESENT_END_SET_TIMER,
    PRESENT_DEFAULT_METRIC,
} from 'app/configs+constants/ActionTypes';
import * as Analytics from 'app/services/Analytics';

export const presentEndSetTimer = () => {
    Analytics.setCurrentScreen('edit_end_set_timer');

    return {
        type: PRESENT_END_SET_TIMER
    }
};

export const presentSetMetric = () => {
    Analytics.setCurrentScreen('edit_default_metric');
    
    return {
	    type: PRESENT_DEFAULT_METRIC
    }
};
