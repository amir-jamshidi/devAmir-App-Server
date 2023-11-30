import Validator from "fastest-validator";

const validator = new Validator();

const schema = {
    email: { type: 'email', min: 8, max: 100 },
    phone: { type: 'string', min: 11, max: 11 },
    password: { type: 'string', min: 8, max: 100 },
    confirmPassword: { type: 'equal', field: "password" }
}

const validateSchema = validator.compile(schema);

export default validateSchema;