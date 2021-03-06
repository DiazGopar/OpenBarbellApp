// These exist in shared because the Bluetooth service needs access to them
// Services do not have "Actions" they're directly associated with, so they use the shared creator

import { NativeModules } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import {
    START_DEVICE_SCAN,
    STOP_DEVICE_SCAN,
    FOUND_DEVICE,
    BLUETOOTH_OFF,
    DISCONNECTED_FROM_DEVICE,
    CONNECTING_TO_DEVICE,
    CONNECTED_TO_DEVICE,
    ADD_REP_DATA,
    RECONNECTING_TO_DEVICE,
    DISCONNECT_DEVICE,
    CONNECT_DEVICE,
    RECONNECT_DEVICE,
    VELOCITY_DROPPED,
} from 'app/configs+constants/ActionTypes';
import * as TimerActionCreators from './TimerActionCreators';
import * as ConnectedDeviceStatusSelectors from 'app/redux/selectors/ConnectedDeviceStatusSelectors';
import * as SettingsSelectors from 'app/redux/selectors/SettingsSelectors';
import * as SetsSelectors from 'app/redux/selectors/SetsSelectors';
import * as Analytics from 'app/services/Analytics';
import * as ScannedDevicesSelectors from 'app/redux/selectors/ScannedDevicesSelectors';

const RFDuinoLib = NativeModules.RFDuinoLib;

var connectTimeoutTimer = null;
var reconnectTimeoutTimer = null;
var reconnectTimer = null;
const clearTimers = () => {
    BackgroundTimer.clearTimeout(connectTimeoutTimer);
    BackgroundTimer.clearTimeout(reconnectTimeoutTimer);
    BackgroundTimer.clearTimeout(reconnectTimer);
    connectTimeoutTimer = null;
    reconnectTimeoutTimer = null;
    reconnectTimer = null;
};

// SCANNING

export const startDeviceScan = (isManualScan = false) => (dispatch, getState) => {
    RFDuinoLib.startScan();
    const state = getState();
    logAttemptScanAnalytics(state, isManualScan);

    dispatch({
        type: START_DEVICE_SCAN,
        isManualScan: isManualScan,
    });
};

export const stopDeviceScan = () => (dispatch, getState) => {
    RFDuinoLib.stopScan();
    const state = getState();
    logCompletedScanAnalytics(state);

    dispatch({
        type: STOP_DEVICE_SCAN
    });
};

export const foundDevice = (name, identifier) => ({
    type: FOUND_DEVICE,
    device: name,
    deviceIdentifier: identifier
});

// DEVICE

export const connectDevice = (device) => (dispatch, getState) => {
    RFDuinoLib.connectDevice(device);
    const state = getState();
    logAttemptConnectDeviceAnalytics(false, state);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    connectTimeoutTimer = BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status === 'CONNECTING') {
            // disconnect
            logConnectedToDeviceTimedOutAnalytics(false, state);            
            dispatch(disconnectDevice(false)); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice()); // in case it can never find it, visually update
        }
    }, 5000);

    dispatch({
        type: CONNECT_DEVICE,
        device: device
    });
};

export const reconnectDevice = (device, identifier) => (dispatch, getState) => {
    const state = getState();
    logAttemptConnectDeviceAnalytics(true, state);

    // reconnect after a second as V2s have issues
    reconnectTimer = BackgroundTimer.setTimeout(() => {
        RFDuinoLib.connectDevice(device);
    }, 2000);

    // HACK: ideally this is a connect timeout saga
    // but it requires both background timer and access to actions
    // therefore putting it here
    reconnectTimeoutTimer = BackgroundTimer.setTimeout(() => {
        // check to see if stuck connecting
        const state = getState();
        const status = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
        if (status !== 'CONNECTED') {
            // disconnect
            dispatch(disconnectDevice(false)); // in case it's trying to connect, ensure it's actually disconnecting
            dispatch(disconnectedFromDevice(device, identifier)); // in case it can never find it, visually update and trigger another reconnect
            logConnectedToDeviceTimedOutAnalytics(true, state);
        }
    }, 7000);

    dispatch({
        type: RECONNECT_DEVICE,
        device: device
    });
};

export const disconnectDevice = (performAction=true) => (dispatch) => {
    RFDuinoLib.disconnectDevice();

    if (performAction) {
        dispatch({
            type: DISCONNECT_DEVICE
        });
    }
};

// DEVICE STATUS

export const bluetoothIsOff = () => ({
    type: BLUETOOTH_OFF
});

export const disconnectedFromDevice = (name=null, identifier=null) => (dispatch, getState) => {
    clearTimers();

    Analytics.setUserProp('connected_device_id', null);
    Analytics.setUserProp('device_version', null);

    const state = getState();
    const deviceStatus = ConnectedDeviceStatusSelectors.getConnectedDeviceStatus(state);
    if (deviceStatus === 'CONNECTED' || deviceStatus === 'DISCONNECTING') {
        const isIntentional = deviceStatus === 'DISCONNECTING';
        logDisconnectedFromDeviceAnalytics(isIntentional, state);
    }

    dispatch({
        type: DISCONNECTED_FROM_DEVICE,
        device: name,
        deviceIdentifier: identifier
    });
};

export const connectingToDevice = (name, identifier) => ({
    type: CONNECTING_TO_DEVICE,
    deviceName: name,
    deviceIdentifier: identifier
});

export const connectedToDevice = (name, identifier) => (dispatch, getState) => {
    clearTimers();

    // analytics
    Analytics.setUserProp('connected_device_id', name);
    checkOBVersion(name);
    const state = getState();
    logConnectedToDeviceAnalytics(state);

    dispatch({
        type: CONNECTED_TO_DEVICE,
        deviceName: name,
        deviceIdentifier: identifier
    });
};

export const reconnectingToDevice = (name) => {
    checkOBVersion(name);

    return {
        type: RECONNECTING_TO_DEVICE,
        deviceName: name,
    };
};

// DATA

export const receivedLiftData = (isValid, data, time=new Date()) => (dispatch, getState) => {
    const state = getState();

    logAddRepAnalytics(state);

    dispatch(TimerActionCreators.sanityCheckTimer());
    dispatch({
        type: ADD_REP_DATA,
        isValid: isValid,
        data: data,
        deviceName: state.connectedDevice.deviceName,
        deviceIdentifier: state.connectedDevice.deviceIdentifier,
        time: time
    });
    dispatch(TimerActionCreators.startEndSetTimer());

};

// ANALYTICS

const logAddRepAnalytics = (state) => {
    const currentSet = SetsSelectors.getWorkingSet(state);
    let set_id = currentSet.set_id;
    let rep_count = currentSet.reps.length;
    let has_exercise_name = Boolean(currentSet.exercise);
    let has_weight = Boolean(currentSet.weight);
    let has_rpe = Boolean(currentSet.rpe);
    let has_tags = Boolean(currentSet.tags.length);
    let has_video = Boolean(currentSet.videoFileUrl);
    let has_reps = Boolean(SetsSelectors.getNumWorkoutReps(state));
    let end_set_time_left = SettingsSelectors.getEndSetTimeLeft(state);

    Analytics.logEventWithAppState('add_rep', {
        set_id: set_id,
        rep_count: rep_count,
        has_exercise_name: has_exercise_name,
        has_weight: has_weight,
        has_rpe: has_rpe,
        has_tags: has_tags,
        has_video: has_video,
        has_reps: has_reps,
        end_set_time_left: end_set_time_left,
    }, state);
};

function checkOBVersion(name) {
    if (name.charAt(3) === '1') {
        Analytics.setUserProp('device_version', 'v1')
    } else if (name.charAt(3) === '2') {
        Analytics.setUserProp('device_version', 'v2');
    } else if (name.charAt(3) === '3') {
        Analytics.setUserProp('device_version', 'v3');
    }    
};

const logAttemptScanAnalytics = (state, isManualScan) => {
    Analytics.logEventWithAppState('attempt_scan', {
        is_manual: isManualScan,
    }, state);
};

const logCompletedScanAnalytics = (state) => {
    const isManualScan = ScannedDevicesSelectors.getIsManualScan(state);
    const manualScannedNone = ScannedDevicesSelectors.getManualScannedNone(state);

    Analytics.logEventWithAppState('completed_scan', {
        is_manual: isManualScan,
        manual_scanned_none: manualScannedNone,
    }, state);
};

const logAttemptConnectDeviceAnalytics = (isReconnect, state) => {
    Analytics.logEventWithAppState('attempt_connect_device', {
        is_reconnect: isReconnect
    }, state);
};

const logConnectedToDeviceAnalytics = (state) => {
    Analytics.logEventWithAppState('connected_to_device', {
    }, state);
};

const logConnectedToDeviceTimedOutAnalytics = (isReconnect, state) => {
    Analytics.logEventWithAppState('connect_to_device_timed_out', {
        is_reconnect: isReconnect
    }, state);
};

const logDisconnectedFromDeviceAnalytics = (isIntentional, state) => {
    Analytics.logEventWithAppState('disconnected_from_device', {
        is_intentional: isIntentional
    }, state);
};
