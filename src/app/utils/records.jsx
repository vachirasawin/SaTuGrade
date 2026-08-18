export const MIN_LOADING_TIME = 1000;

export const withMinLoadingTime = async (task) => {
    const startTime = Date.now();
    const result = await task();
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
    }

    return result;
};

export const formatDataForModel = (recordData, currentSubjects, maxTerm) => {
    const payload = {};

    for (let t = 1; t <= maxTerm; t++) {
        currentSubjects.forEach(subject => {
            const creditKey = `${subject.code}_${t}_Credit`;
            const gradeKey = `${subject.code}_${t}_Grade`;

            payload[creditKey] = recordData[creditKey];
            payload[gradeKey] = recordData[gradeKey];
        });
    }

    return payload;
};

export const isCurrentTermIncomplete = (recordData, currentSubjects, currentId) => {
    let hasAtLeastOneSubject = false;
    let hasIncompleteSubject = false;

    currentSubjects.forEach(subject => {
        const creditKey = `${subject.code}_${currentId}_Credit`;
        const gradeKey = `${subject.code}_${currentId}_Grade`;

        const creditVal = recordData[creditKey];
        const gradeVal = recordData[gradeKey];

        const isCreditFilled = creditVal !== undefined && creditVal !== null && creditVal !== "";
        const isGradeFilled = gradeVal !== undefined && gradeVal !== null && gradeVal !== "";

        if (isCreditFilled || isGradeFilled) {
            hasAtLeastOneSubject = true;

            if (!isCreditFilled || !isGradeFilled) {
                hasIncompleteSubject = true;
            }
        }
    });

    return !hasAtLeastOneSubject || hasIncompleteSubject;
};

export const getDisplayValue = (rawValue) => {
    return (rawValue === 0 || rawValue === null || rawValue === undefined) ? "" : rawValue;
};