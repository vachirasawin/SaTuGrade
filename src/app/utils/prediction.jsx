export const MIN_LOADING_TIME = 1000;
export const SUGGESTION_THRESHOLD = 2.5;
export const CAUTION_DROP_THRESHOLD = 0.5;

export const MOCK_PREDICTION = false;
export const MOCK_RECORDED_GRADE = 3.0;
export const MOCK_PREDICTED_GRADE = 2.5;

export const buildMockRecordData = (currentSubjects) => {
    const mockRecord = {};

    currentSubjects.forEach(subject => {
        mockRecord[`${subject.code}_1_Credit`] = 3;
        mockRecord[`${subject.code}_1_Grade`] = MOCK_RECORDED_GRADE;
    });

    return mockRecord;
};

export const buildMockPredictions = (currentSubjects) => {
    const mockPredictions = {};

    currentSubjects.forEach(subject => {
        mockPredictions[subject.code] = MOCK_PREDICTED_GRADE;
    });

    return mockPredictions;
};

export const withMinLoadingTime = async (task) => {
    const startTime = Date.now();
    const result = await task();
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
    }

    return result;
};

export const getRecordedTermsCount = (data, currentSubjects, maxTerm) => {
    let completedTerms = 0;

    for (let t = 1; t <= maxTerm; t++) {
        const isTermComplete = currentSubjects.every(subject => {
            const creditKey = `${subject.code}_${t}_Credit`;
            const gradeKey = `${subject.code}_${t}_Grade`;

            const creditVal = data[creditKey];
            const gradeVal = data[gradeKey];

            const hasCredit = creditVal !== undefined && creditVal !== null && creditVal !== "" && Number(creditVal) > 0;
            const hasGrade = gradeVal !== undefined && gradeVal !== null && gradeVal !== "";

            return hasCredit && hasGrade;
        });

        if (isTermComplete) {
            completedTerms++;
        } else {
            break;
        }
    }

    return completedTerms;
};

export const getLatestGrade = (subject, data, latestTerm) => {
    if (!latestTerm || latestTerm < 1) return null;

    const gradeKey = `${subject.code}_${latestTerm}_Grade`;
    const gradeVal = data[gradeKey];

    if (gradeVal === undefined || gradeVal === null || gradeVal === "") return null;

    const parsed = parseFloat(gradeVal);
    return Number.isNaN(parsed) ? null : parsed;
};

export const getSuggestionSubjects = (currentSubjects, predictions) => {
    return currentSubjects.reduce((result, subject) => {
        const predictedGrade = predictions[subject.code];

        if (predictedGrade !== undefined && predictedGrade <= SUGGESTION_THRESHOLD) {
            result.push({ subject, predictedGrade });
        }

        return result;
    }, []);
};

export const getCautionSubjects = (currentSubjects, predictions, recordData, latestTerm) => {
    return currentSubjects.reduce((result, subject) => {
        const predictedGrade = predictions[subject.code];
        if (predictedGrade === undefined) return result;

        const latestGrade = getLatestGrade(subject, recordData, latestTerm);
        if (latestGrade === null) return result;

        if (predictedGrade <= latestGrade - CAUTION_DROP_THRESHOLD) {
            result.push({ subject, predictedGrade, latestGrade });
        }

        return result;
    }, []);
};