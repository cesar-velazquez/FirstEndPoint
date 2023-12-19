const { z } = require('zod');

const registerSchema = z.object({
    date: z.
        string({
            invalid_type_error: 'Date must be a string',
            required_error: 'Date is requireed'
        }).min(3, { message: 'Incorrect Format Date must be: YEAR-MONTH-DAY ' }).max(50, { message: 'Incorrect Format Date must be: YEAR-MONTH-DAY ' }),
    motorsNumber: z.
        number({
            required_error: 'Number must be required'
        }),
        // .min(3, { message: 'Number is too short' })
        // .max(10, { message: 'Number is too long' }),
    description: z.
        string({
            invalid_type_error: 'Description must be a string',
            required_error: 'Description is required'
        })
        .min(6, { message: 'Description must be at least 6 characters' })
        .max(30, { message: 'Description is too long' }),
    userid: z.
        number({
            // invalid_type_error: 'userID must be a integer',
            required_error: 'userID is required',
        })
        .min(1, { message: 'userID is too short' })
        .max(4, { message: 'userID is too long' }),
});

function validateRepair(data) {
    const result = registerSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationDataRepair(result);
    return {
        hasError,
        errorMessages,
        userData,
    };
}

const extractValidationDataRepair = (resultValidation) => {
    let errorMessages;
    let data; //data limpia
    const hasError = !resultValidation.success;
    if (hasError) errorMessages = JSON.parse(resultValidation.error.message);
    if (!hasError) data = resultValidation.data;

    return {
        hasError,
        errorMessages,
        data,
    };
};

module.exports = validateRepair;