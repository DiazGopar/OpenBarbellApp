// TODO: refactor so that selectors are aware of the entire state path
// reason being that, the callers shouldn't know to make this state.sets
// right now only a few of them use the stateRoot
import * as SetTimeCalculator from 'app/utility/transforms/SetTimeCalculator';
import * as SetEmptyCheck from 'app/utility/transforms/SetEmptyCheck';
import * as DurationCalculator from 'app/utility/transforms/DurationCalculator';
import * as RepDataMap from 'app/utility/transforms/RepDataMap';
import * as OneRMCalculator from 'app/utility/transforms/OneRMCalculator';
import * as CollapsedMetrics from 'app/utility/transforms/CollapsedMetrics';
import * as DateUtils from 'app/utility/transforms/DateUtils';
import * as AnalysisSelectors from 'app/redux/selectors/AnalysisSelectors';

const stateRoot = (state) => state.sets;

// Workout

// TODO: fix bug here because I'm no longer using set's end and start time
// apparently I used it for more than just rest timer fml

export const lastWorkoutRepTime = (state) => {
    // check if there's workout data
    var workoutData = stateRoot(state).workoutData;
    if (workoutData.length <= 0) {
        return null;
    }

    // check the current set for end time
    var currentSet = getWorkingSet(state);
    var endTime = SetTimeCalculator.endTime(currentSet);
    if (endTime !== null) {
        return endTime;
    }

    // check previous sets for end time
    if (workoutData.length > 1) {
        for (var i=workoutData.length-2; i>=0; i--) {
            var previousSet = workoutData[i];
            var endTime = SetTimeCalculator.endTime(previousSet);            
            if (endTime !== null) {
                return endTime;
            }
        }
    }

    // no end times found
    return null;
}

export const getWorkoutSets = (state) => {
    return stateRoot(state).workoutData;
};

export const getNumWorkoutSets = (state) => {
    return getWorkoutSets(state).length;
};

export const getIsWorkoutEmpty = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {
        // at least one set
        return false;
    } else if (workoutData.length === 1 && !SetEmptyCheck.isUntouched(workoutData[0])) {
        // only one set and it has data
        return false;
    }

    return true;
};

export const getWorkoutSet = (state, setID) => {
    return stateRoot(state).workoutData.find( set => set.setID == setID );
};

export const getNumWorkoutReps = (state) => {
    const sets = getWorkoutSets(state);
    var num_reps = 0;

    sets.forEach((set) => {
        if (set.reps) {
            num_reps += set.reps.length;
        }
    });

    return num_reps;
};

export const getNumWorkoutSetsWithFields = (state) => {
    const sets = getWorkoutSets(state);
    var num_sets_with_fields = 0;

    sets.forEach((set) => {
        if (!SetEmptyCheck.hasEmptyFields(set)) {
            num_sets_with_fields++;
        }
    });

    return num_sets_with_fields; 
};

export const getPercentWorkoutSetsWithFields = (state) => {
    const sets = getWorkoutSets(state);
    const numSetsFields = getNumWorkoutSetsWithFields(state);

    if (sets.length > 0) {
        return (numSetsFields/(sets.length)) * 100;
    } else {
        return 0;
    }
}

export const getWorkoutDuration = (state) => {
    const sets = getWorkoutSets(state);
    const startDate = SetTimeCalculator.startTime(sets[0]);

    if (startDate) {
        return DurationCalculator.getDurationBetween(startDate, Date.now());
    } else {
        return 0;
    }
};

export const getWorkingSet = (state) => {
    const sets = getWorkoutSets(state);
    if (sets && sets.length > 0) {
        return sets[sets.length - 1];
    }
    return null;
};

export const getIsWorkingSet = (state, setID) => {
    const currentSet = getWorkingSet(state);
    return setID === currentSet.setID;
};

export const getWorkoutPreviousSetHasEmptyReps = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {
        const prevSet = workoutData[workoutData.length - 2];
        if (prevSet) {
            return SetEmptyCheck.hasEmptyReps(prevSet);
        }
    }

    return false;
}

export const getIsPreviousWorkoutSetFilled = (state) => {
    const workoutData = stateRoot(state).workoutData;

    if (workoutData.length >= 2) {        
        const prevSet = workoutData[workoutData.length - 2];
        if (prevSet) {
            if(SetEmptyCheck.hasEmptyFields(prevSet)) {
                return 0;
            } else {
                return 1;
            }
        }
    }
    
    return -1;
};

// Dictionary to Array

const dictToArray = (dictionary) => {
    var array = [];
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property)) {
            array.push(dictionary[property]);
        }
    }
    return array;
};

// History

export const getHistorySetsChronological = (state) => {
    var array = getHistorySets(state);
    array.sort((set1, set2) => {
        let set1Start = SetTimeCalculator.startTime(set1);
        if (set1Start !== null) {
            set1Start = Date.parse(set1Start);
        }

        let set2Start = SetTimeCalculator.startTime(set2);
        if (set2Start !== null) {
            set2Start = Date.parse(set2Start);
        }

        return set1Start - set2Start;
    });
    return array;
};

export const getHistorySets = (state) => {
    const sets = stateRoot(state);
    var array = dictToArray(sets.historyData);
    return array;
};

export const getNumHistorySets = (state) => {
    let sets = stateRoot(state);
    var array = dictToArray(sets.historyData);
    return array.length;
};

export const getNumHistoryReps = (state) => {
    let sets = getHistorySetsChronological(state);

    var num_reps = 0;
    
    sets.forEach((set) => {
        if (set.reps) {
            num_reps += set.reps.length;
        }
    });
    
    return num_reps;    
};

const getHistoryWorkoutIDs = (state) => {
    let sets = getHistorySetsChronological(state);

    if (sets.length === 0) {
        return [];
    }
    
    let workoutIDs = [sets[0].workoutID];

    for (var i = 1; i < sets.length; i++) {
        if (sets[i].workoutID !== sets[i - 1].workoutID) {
            workoutIDs.push(sets[i].workoutID);
        }
    }

    return workoutIDs;
};

export const getNumHistoryWorkouts = (state) => {
    return getHistoryWorkoutIDs(state).length;
};

export const getHistorySet = (state, setID) => {
    var dictionary = stateRoot(state).historyData;
    for (var property in dictionary) {
        if (dictionary.hasOwnProperty(property)) {
            let set = dictionary[property];
            if (set.setID === setID) {
                return set;
            }
        }
    }
    return null;
};

export const getTimeSinceLastWorkout = (state) => {
    const sets = getHistorySetsChronological(state);
    if (sets.length <= 0) {
        return null;
    } else {
        const lastSet = sets[sets.length-1];
        const startTime = Date.parse(SetTimeCalculator.startTime(lastSet));
        return Date.now() - startTime;
    }
};

// Syncing

export const getSetsToUpload = (state) => {
    const root = stateRoot(state);
    return root.setIDsToUpload.map( setID => root.historyData[setID] );
};

export const getIsUploading = (state) => stateRoot(state).setIDsBeingUploaded.length > 0;

export const hasChangesToSync = (state) => {
    const root = stateRoot(state);
    return (root.setIDsToUpload.length > 0 || root.setIDsBeingUploaded.length > 0);
};

// collapsed metrics

const getBestEverOfMetric = (state, set, metricFunction, isMax=true) => {
    // null if not enough data entered
    if (!isSetComparable(set)) {
        return null;
    }

    const historySets = getHistorySets(state);
    const workoutSets = getWorkoutSets(state);

    // find all instances of this exercise with weight and reps
    const matchedSets = historySets.concat(workoutSets).filter(historySet => areSetsComparable(historySet, set));
    
    let metrics = matchedSets.map((matchedSet) => {
        return metricFunction(matchedSet);
    });

    metrics = metrics.reduce((a, b) => a.concat(b), []);
    
    if (metrics.length > 0) {
        if (isMax) {
            return Math.max(...metrics);
        } else {
            return Math.min(...metrics);
        }
    } else {
        return null;
    }
};

const areSetsComparable = (historySet, set) => {
    if (!isSetComparable(set)) {
        return false;
    }
    return historySet.exercise === set.exercise &&
        historySet.weight === set.weight &&
        historySet.metric === set.metric;
};

const isSetComparable = (set) => {
    if (!set.exercise || set.exercise === '') {
        return false;
    }

    if (!set.weight || set.weight === '') {
        return false;
    }

    if (!set.metric || set.metric === '') {
        return false;
    }

    if (set.reps.length <= 0) {
        return false;
    }

    if (SetEmptyCheck.numValidUnremovedReps(set) <= 0) {
        return false;
    }

    return true;
};

export const getFastestAvgVelocityEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getAvgVelocities);
};

export const getFastestPKVEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getPKVs);
};

export const getFastestDurationEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getDurations, false);
};

export const getSlowestAvgVelocityEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getAvgVelocities, false);
};

export const getSlowestPKVEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getPKVs, false);
};

export const getSlowestDurationEver = (state, set) => {
    return getBestEverOfMetric(state, set, CollapsedMetrics.getDurations);
};

export const getRevision = (state) => stateRoot(state).revision;

// 1rm
// Get Weights and Velocity for the exercise
export const getExerciseData = (state, exercise, type) => {   
    const sets = getAllSets(state);
    let data = [];

    // check if date fits within range
    const range = AnalysisSelectors.getAnalysisRange(state);

    if (type === 'regression') {
        sets.forEach((set) => {
            if (set.exercise === exercise && set.reps.length > 0 && set.weight && DateUtils.checkDateWithinRange(range, set.initialStartTime)) {
                data.push([set.weight, Number(RepDataMap.averageVelocity(set.reps[0].data))]);
            }       
        });
    } else {
        data = [[]]
        sets.forEach((set) => {
            if (set.exercise === exercise && set.reps.length > 0 && set.weight && DateUtils.checkDateWithinRange(range, set.initialStartTime)) {
                data[0].push({ title: set.setID, weight: set.weight, velocity: Number(RepDataMap.averageVelocity(set.reps[0].data)) });
            }       
        });
    }

    return data;
}

export const generateExerciseItems = (state) => {
    const sets = getAllSets(state);
    let exercises = [];

    sets.forEach((set) => {
        if (!exerciseExists(set.exercise, exercises) && set.exercise) {
            exercises.push({ label: set.exercise, value: set.exercise });
        }
    });

    return exercises;
};

// check if exercise exists
const exerciseExists = (exercise, arr) => {
    return arr.some((item) => {
        return item.label === exercise;
    }); 
};

export const getCurrentOneRM = (state, exercise) => {
    const lifts = getExerciseData(state, exercise, 'regression');

    const confidence = OneRMCalculator.getConfidenceInterval(lifts);

    let maxWeight = lifts[0][0];
    let slowestVel = lifts[0][1];

    // highest lift
    // compare against max weight and slowest vel to get max weight at its slowest vel
    for (let i = 1; i < lifts.length; i++) {
        if (lifts[i][0] > maxWeight && lifts[i][1] < slowestVel) {
            maxWeight = lifts[i][0];
            slowestVel = lifts[i][1];
        }
    };

    return { weight: maxWeight, velocity: slowestVel, confidence};
}

export const getAllSets = (state) => {
    const historySets = getHistorySets(state);
    const workoutSets = getWorkoutSets(state);

    return historySets.concat(workoutSets);
}
