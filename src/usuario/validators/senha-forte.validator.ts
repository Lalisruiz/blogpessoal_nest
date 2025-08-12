import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class SenhaForteConstraint implements ValidatorConstraintInterface {
    validate(senha: string, args: ValidationArguments) {
        if (!senha) return false;

        // Pelo menos 8 caracteres
        if (senha.length < 8) return false;

        // Pelo menos um caracter especial
        const caracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;
        if (!caracteresEspeciais.test(senha)) return false;

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'A senha deve ter pelo menos 8 caracteres e conter pelo menos um caracter especial (!@#$%^&*(),.?":{}|<>)';
    }
}

export function SenhaForte(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: SenhaForteConstraint,
        });
    };
}


