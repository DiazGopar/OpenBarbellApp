const stateRoot = (state) => state.analysis;

export const getIsEditing1RMExercise = (state) => stateRoot(state).isEditing1RMExercise;

export const getAnalysisE1RMVelocity = (state) => stateRoot(state).e1RMVelocity;

export const getAnalysisE1RMExercise = (state) => stateRoot(state).e1RMExercise;

export const getAnalysisRange = (state) => stateRoot(state).e1RMDaysRange;

export const getTagsToInclude = (state) => stateRoot(state).tagsToInclude;

export const getTagsToExclude = (state) => stateRoot(state).tagsToExclude;