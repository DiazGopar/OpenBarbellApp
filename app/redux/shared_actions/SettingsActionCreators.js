import {
    SETTINGS_UPDATE_SET_TIMER,
    SETTINGS_EDIT_SET_TIMER,
    SETTINGS_END_EDIT_SET_TIMER,
    SETTINGS_UPDATE_SYNC_DATE
} from 'app/ActionTypes';

export const updateSetTimer = (duration = 30) => ({
    type: SETTINGS_UPDATE_SET_TIMER,
    endSetTimerDuration: duration
});

export const editSetTimer = () => ({
    type: SETTINGS_EDIT_SET_TIMER,    
});

export const endEditSetTimer = () => ({
    type: SETTINGS_END_EDIT_SET_TIMER,    
});

export const updateSyncDate = (syncDate) => ({
    type: SETTINGS_UPDATE_SYNC_DATE,
    syncDate: syncDate
});
