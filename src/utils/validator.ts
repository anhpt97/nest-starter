import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@ValidatorConstraint()
export class isDate implements ValidatorConstraintInterface {
  private format = 'YYYY-MM-DD';

  validate(value: any) {
    return dayjs(value, this.format, true).isValid();
  }

  defaultMessage({ property }) {
    return `${property} must be a valid date (Required format: ${this.format})`;
  }
}

@ValidatorConstraint()
export class isPassword implements ValidatorConstraintInterface {
  validate(value: any) {
    return value && value.length >= 6;
  }

  defaultMessage({ property }) {
    return `${property} must be at least 6 characters long`;
  }
}

@ValidatorConstraint()
export class isUsername implements ValidatorConstraintInterface {
  validate(value: any) {
    return value && /[a-z\d]{4,32}/.test(value);
  }

  defaultMessage({ property }) {
    return `${property} can only contain lowercase letters, numbers and must be 4-32 characters long`;
  }
}
