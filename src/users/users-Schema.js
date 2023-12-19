const { z } = require('zod');

const registerSchema = z.object({
    name: z.
        string({
            invalid_type_error: 'name must be a string',
            required_error: 'name is requireed'
        }).min(3, { message: 'name is too short' }).max(50, { message: 'name is too long' }),
    email: z.
        string().email({ message: 'Invalid email' }),
    password: z.
        string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(16, { message: 'Password is too long' }),
    role: z.
        string({ required_error: 'role is required' })
    // role: z.enum(['client', 'developer', 'employee']),
});

const loginSchema = z.object({
    email: z.
        string().email({ message: 'Invalid email' }),
    password: z.
        string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(16, { message: 'Password is too long' }),
})

const extractValidationData = (resultValidation) => {
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


function validateUser(data) {
    const result = registerSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}

function validateLogin(data) {
    const result = loginSchema.safeParse(data);    
    const {
        hasError,
        errorMessages,
        data: userData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        userData,
    };
}

module.exports =
{
    validateUser,
    validateLogin
};



