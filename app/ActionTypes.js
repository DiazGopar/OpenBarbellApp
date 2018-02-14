// scanning
export const START_DEVICE_SCAN = 'START_DEVICE_SCAN';
export const STOP_DEVICE_SCAN = 'STOP_DEVICE_SCAN';
export const FOUND_DEVICE = 'FOUND_DEVICE';
export const CONNECT_DEVICE = 'CONNECT_DEVICE';
export const RECONNECT_DEVICE = 'RECONNECT_DEVICE';
export const STOP_RECONNECT = 'STOP_RECONNECT';

// connection status
export const BLUETOOTH_OFF = 'BLUETOOTH_OFF';
export const DISCONNECTED_FROM_DEVICE = 'DISCONNECTED_FROM_DEVICE';
export const CONNECTING_TO_DEVICE = 'CONNECTING_TO_DEVICE';
export const CONNECTED_TO_DEVICE = 'CONNECTED_TO_DEVICE';
export const RECONNECTING_TO_DEVICE = 'RECONNECTING_TO_DEVICE';
export const TROUBLESHOOTING_TIPS = 'TROUBLESHOOTING_TIPS';

// connected
export const ADD_REP_DATA = 'ADD_REP_DATA';
export const DISCONNECT_DEVICE = 'DISCONNECT_DEVICE';

// auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const CANCEL_LOGOUT = 'CANCEL_LOGOUT';
export const SAVE_TOKENS = 'SAVE_TOKENS';
export const TOKENS_READY = 'TOKENS_READY';
export const CLEAR_TOKENS = 'CLEAR_TOKENS'; // TODO: this is a bad action to use for anonymous logout, rename it
export const REAUTHENTICATE_REQUEST = 'REAUTHENTICATE_REQUEST';
export const REAUTHENTICATE_SUCCESS = 'REAUTHENTICATE_SUCCESS';

// sets
export const SAVE_WORKOUT_SET = 'SAVE_WORKOUT_SET';
export const DELETE_WORKOUT_SET = 'DELETE_WORKOUT_SET';
export const SAVE_WORKOUT_SET_TAGS = 'SAVE_WORKOUT_SET_TAGS';
export const SAVE_HISTORY_SET = 'SAVE_HISTORY_SET';
export const DELETE_HISTORY_SET = 'DELETE_HISTORY_SET';
export const SAVE_HISTORY_SET_TAGS = 'SAVE_HISTORY_SET_TAGS';
export const SAVE_WORKOUT_REP = 'SAVE_WORKOUT_REP';
export const SAVE_HISTORY_REP = 'SAVE_HISTORY_REP';
export const END_SET = 'END_SET';
export const DELETE_WORKOUT_VIDEO = 'DELETE_WORKOUT_VIDEO';
export const DELETE_HISTORY_VIDEO = 'DELETE_HISTORY_VIDEO';
export const LOAD_PERSISTED_SET_DATA = 'LOAD_PERSISTED_SET_DATA';
export const END_WORKOUT = 'END_WORKOUT';
export const BEGIN_UPLOADING_SETS = 'BEGIN_UPLOADING_SETS';
export const UPDATE_SET_DATA_FROM_SERVER = 'UPDATE_SET_DATA_FROM_SERVER';
export const FINISH_UPLOADING_SETS = 'FINISH_UPLOADING_SETS';
export const FAILED_UPLOAD_SETS = 'FAILED_UPLOAD_SETS';

// timer
export const PAUSE_END_SET_TIMER = 'PAUSE_END_SET_TIMER';
export const RESUME_END_SET_TIMER = 'RESUME_END_SET_TIMER';
export const START_END_SET_TIMER = 'START_END_SET_TIMER';
export const STOP_END_SET_TIMER = 'STOP_END_SET_TIMER';

// store
export const STORE_INITIALIZED = 'STORE_INITIALIZED';

// tab
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_TAB_HISTORY = 'CHANGE_TAB_HISTORY';

// suggestions
export const UPDATE_TAG_SUGGESTIONS = 'UPDATE_TAG_SUGGESTIONS';
export const UPDATE_EXERCISE_SUGGESTIONS = 'UPDATE_EXERCISE_SUGGESTIONS';

// workout
export const TOGGLE_WORKOUT_METRIC = 'TOGGLE_WORKOUT_METRIC';
export const PRESENT_WORKOUT_EXERCISE = 'PRESENT_WORKOUT_EXERCISE';
export const PRESENT_WORKOUT_EXPANDED = 'PRESENT_WORKOUT_EXPANDED';
export const START_EDITING_WORKOUT_RPE = 'START_EDITING_WORKOUT_RPE';
export const START_EDITING_WORKOUT_WEIGHT = 'START_EDITING_WORKOUT_WEIGHT';
export const DISMISS_WORKOUT_EXERCISE = 'DISMISS_WORKOUT_EXERCISE';
export const DISMISS_WORKOUT_EXPANDED = 'DISMISS_WORKOUT_EXPANDED';
export const END_EDITING_WORKOUT_RPE = 'END_EDITING_WORKOUT_RPE';
export const END_EDITING_WORKOUT_WEIGHT = 'END_EDITING_WORKOUT_WEIGHT';

// workout collapsed
export const EXPAND_WORKOUT_SET = 'EXPAND_WORKOUT_SET';
export const COLLAPSE_WORKOUT_SET = 'COLLAPSE_WORKOUT_SET';

// workout tags
export const PRESENT_WORKOUT_TAGS = 'PRESENT_WORKOUT_TAGS';
export const DISMISS_WORKOUT_TAGS = 'DISMISS_WORKOUT_TAGS';
export const REMOVE_WORKOUT_TAG = 'REMOVE_WORKOUT_TAG';
export const ADD_WORKOUT_TAG = 'ADD_WORKOUT_TAG';

// workout video
export const PRESENT_WORKOUT_VIDEO_RECORDER = 'PRESENT_WORKOUT_VIDEO_RECORDER';
export const PRESENT_WORKOUT_VIDEO_PLAYER = 'PRESENT_WORKOUT_VIDEO_PLAYER';
export const DISMISS_WORKOUT_VIDEO_RECORDER = 'DISMISS_WORKOUT_VIDEO_RECORDER';
export const DISMISS_WORKOUT_VIDEO_PLAYER = 'DISMISS_WORKOUT_VIDEO_PLAYER';
export const START_RECORDING_WORKOUT = 'START_RECORDING_WORKOUT';
export const STOP_RECORDING_WORKOUT = 'STOP_RECORDING_WORKOUT';
export const SAVE_WORKOUT_VIDEO = 'SAVE_WORKOUT_VIDEO';
export const SAVE_VIDEO_ERROR = 'SAVE_VIDEO_ERROR';

// history
export const LOADING_HISTORY = 'LOADING_HISTORY';
export const TOGGLE_HISTORY_METRIC = 'TOGGLE_HISTORY_METRIC';
export const PRESENT_HISTORY_EXERCISE = 'PRESENT_HISTORY_EXERCISE';
export const PRESENT_HISTORY_EXPANDED = 'PRESENT_HISTORY_EXPANDED';
export const START_EDITING_HISTORY_RPE = 'START_EDITING_HISTORY_RPE';
export const START_EDITING_HISTORY_WEIGHT = 'START_EDITING_HISTORY_WEIGHT';
export const DISMISS_HISTORY_EXERCISE = 'DISMISS_HISTORY_EXERCISE';
export const DISMISS_HISTORY_EXPANDED = 'DISMISS_HISTORY_EXPANDED';
export const END_EDITING_HISTORY_RPE = 'END_EDITING_HISTORY_RPE';
export const END_EDITING_HISTORY_WEIGHT = 'END_EDITING_HISTORY_WEIGHT';
export const HISTORY_VIEWED = 'HISTORY_VIEWED';

// history collapsed
export const EXPAND_HISTORY_SET = 'EXPAND_HISTORY_SET';
export const COLLAPSE_HISTORY_SET = 'COLLAPSE_HISTORY_SET';

// history tags
export const PRESENT_HISTORY_TAGS = 'PRESENT_HISTORY_TAGS';
export const DISMISS_HISTORY_TAGS = 'DISMISS_HISTORY_TAGS';
export const REMOVE_HISTORY_TAG = 'REMOVE_HISTORY_TAG';
export const ADD_HISTORY_TAG = 'ADD_HISTORY_TAG';

// history video
export const PRESENT_HISTORY_VIDEO_RECORDER = 'PRESENT_HISTORY_VIDEO_RECORDER';
export const PRESENT_HISTORY_VIDEO_PLAYER = 'PRESENT_HISTORY_VIDEO_PLAYER';
export const DISMISS_HISTORY_VIDEO_RECORDER = 'DISMISS_HISTORY_VIDEO_RECORDER';
export const DISMISS_HISTORY_VIDEO_PLAYER = 'DISMISS_HISTORY_VIDEO_PLAYER';
export const START_RECORDING_HISTORY = 'START_RECORDING_HISTORY';
export const STOP_RECORDING_HISTORY = 'STOP_RECORDING_HISTORY';
export const SAVE_HISTORY_VIDEO = 'SAVE_HISTORY_VIDEO';

// settings
export const PRESENT_SURVEY = 'PRESENT_SURVEY';
export const DISMISS_SURVEY = 'DISMISS_SURVEY';
export const COMPLETE_SURVEY = 'COMPLETE_SURVEY';
export const OPT_OUT_END_WORKOUT_SURVEY_PROMPT = 'OPT_OUT_END_WORKOUT_SURVEY_PROMPT';
export const SAVE_SURVEY_URL = 'SAVE_SURVEY_URL';
export const SAVE_END_SET_TIMER = 'SAVE_END_SET_TIMER';
export const PRESENT_END_SET_TIMER = 'PRESENT_END_SET_TIMER';
export const DISMISS_END_SET_TIMER = 'DISMISS_END_SET_TIMER';
export const SAVE_DEFAULT_METRIC = 'SAVE_DEFAULT_METRIC';
export const PRESENT_DEFAULT_METRIC = 'PRESENT_DEFAULT_METRIC';
export const DISMISS_DEFAULT_METRIC = 'DISMISS_DEFAULT_METRIC';
export const UPDATE_SYNC_DATE = 'UPDATE_SYNC_DATE';
export const EXPORTING_CSV = 'EXPORTING_CSV';
export const UPDATE_HISTORY_FILTER = 'UPDATE_HISTORY_FILTER';
export const FEEDBACK = 'FEEDBACK';
export const EXPORTING_CSV_ERROR = 'EXPORTING_CSV_ERROR';

// app state
export const UNLOCKED_SCREEN = 'UNLOCKED_SCREEN';
export const LOCKED_SCREEN = 'LOCKED_SCREEN';
export const MULTI_TASK_SCREEN = 'MULTI_TASK_SCREEN';

// kill switch
export const FETCH_VERSION = 'FETCH_VERSION';
export const VERSION_OK = 'VERSION_OK';
export const VERSION_KILLED = 'VERSION_KILLED';
export const VERSION_UNAVAILABLE = 'VERSION_UNAVAILABLE';

// Collapsed Metrics
export const PRESENT_COLLAPSED_METRIC = 'PRESENT_COLLAPSED_METRIC';
export const PRESENT_QUANTIFIER = 'PRESENT_QUANTIFIER';
export const DISMISS_COLLAPSED_METRIC = 'DISMISS_COLLAPSED_METRIC';
export const DISMISS_QUANTIFIER = 'DISMISS_QUANTIFIER';
export const SAVE_COLLAPSED_METRIC = 'SAVE_COLLAPSED_METRIC';
export const SAVE_COLLAPSED_METRIC_1 = 'SAVE_COLLAPSED_METRIC_1';
export const SAVE_COLLAPSED_METRIC_2 = 'SAVE_COLLAPSED_METRIC_2';
export const SAVE_COLLAPSED_METRIC_3 = 'SAVE_COLLAPSED_METRIC_3';
export const SAVE_COLLAPSED_METRIC_4 = 'SAVE_COLLAPSED_METRIC_4';
export const SAVE_COLLAPSED_METRIC_5 = 'SAVE_COLLAPSED_METRIC_5';
export const SAVE_QUANTIFIER = 'SAVE_QUANTIFIER';
export const SAVE_QUANTIFIER_1 = 'SAVE_QUANTIFIER_1';
export const SAVE_QUANTIFIER_2 = 'SAVE_QUANTIFIER_2';
export const SAVE_QUANTIFIER_3 = 'SAVE_QUANTIFIER_3';
export const SAVE_QUANTIFIER_4 = 'SAVE_QUANTIFIER_4';
export const SAVE_QUANTIFIER_5 = 'SAVE_QUANTIFIER_5';
export const PRESENT_BIG_METRIC_INFO = 'PRESENT_BIG_METRIC_INFO';

// Analysis
export const TEST_ONE_RM = 'TEST_ONE_RM';
export const CALC_ONE_RM = 'CALC_ONE_RM';
export const PRESENT_SELECT_EXERCISE = 'PRESENT_SELECT_EXERCISE';
export const SAVE_1RM_EXERCISE = 'SAVE_1RM_EXERCISE';
export const DISMISS_SELECT_EXERCISE = 'DISMISS_SELECT_EXERCISE';
export const CHANGE_VELOCITY_SLIDER = 'CHANGE_VELOCITY_SLIDER';
export const CHANGE_1RM_DAYS_RANGE = 'CHANGE_1RM_DAYS_RANGE';
export const PRESENT_INCLUDES_TAGS = 'PRESENT_INCLUDES_TAGS';
export const PRESENT_EXCLUDES_TAGS = 'PRESENT_EXCLUDES_TAGS';
export const SAVE_INCLUDES_TAGS = 'SAVE_INCLUDES_TAGS';
export const SAVE_EXCLUDES_TAGS = 'SAVE_EXCLUDES_TAGS';
export const ADD_INCLUDE_TAG = 'ADD_INCLUDE_TAG';
export const ADD_EXCLUDE_TAG = 'ADD_EXCLUDE_TAG';
export const REMOVE_INCLUDE_TAG = 'REMOVE_INCLUDE_TAG';
export const REMOVE_EXCLUDE_TAG = 'REMOVE_EXCLUDE_TAG';
export const DISMISS_INCLUDES_TAGS = 'DISMISS_INCLUDES_TAGS';
export const DISMISS_EXCLUDES_TAGS = 'DISMISS_EXCLUDES_TAGS';
export const SHOW_INFO_MODAL = 'SHOW_INFO_MODAL';
export const DISMISS_INFO_MODAL = 'DISMISS_INFO_MODAL';
export const PRESENT_BEST_RESULTS = 'PRESENT_BEST_RESULTS';
