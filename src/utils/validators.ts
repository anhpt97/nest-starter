import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint()
export class isDate implements ValidatorConstraintInterface {
  format = 'YYYY-MM-DD';

  validate(value: any) {
    return dayjs(value, this.format, true).isValid();
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} must be a valid date (Required format: ${this.format})`;
  }
}

@ValidatorConstraint()
export class isPassword implements ValidatorConstraintInterface {
  minLength = 12;

  validate(value: any) {
    return value?.length >= this.minLength;
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} must be at least ${this.minLength} characters long`;
  }
}

@ValidatorConstraint()
export class isUsername implements ValidatorConstraintInterface {
  validate(value: any) {
    return value && /[a-z\d]{4,32}/.test(value);
  }

  defaultMessage({ property }: ValidationArguments) {
    return `${property} must contain only lowercase letters, digits, and be 4-32 characters long`;
  }
}
