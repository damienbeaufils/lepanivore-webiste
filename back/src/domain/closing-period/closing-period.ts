import { ClosingPeriodId } from '../type-aliases';
import { ClosingPeriodInterface } from './closing-period.interface';
import { NewClosingPeriodCommand } from './commands/new-closing-period-command';
import { InvalidClosingPeriodError } from './errors/invalid-closing-period.error';

export class ClosingPeriod implements ClosingPeriodInterface {
  static factory: ClosingPeriodFactoryInterface = {
    create(command: NewClosingPeriodCommand): ClosingPeriod {
      return new ClosingPeriod(command);
    },
  };

  id: ClosingPeriodId;
  startDate: Date;
  endDate: Date;

  private constructor(command: NewClosingPeriodCommand) {
    ClosingPeriod.assertStartDateIsValid(command.startDate);
    ClosingPeriod.assertEndDateIsValid(command.startDate, command.endDate);

    this.startDate = command.startDate;
    this.endDate = command.endDate;
  }

  private static assertStartDateIsValid(startDate: Date): void {
    if (!startDate) {
      throw new InvalidClosingPeriodError('start date has to be defined');
    }

    if (ClosingPeriod.isBeforeNowIgnoringHours(startDate)) {
      throw new InvalidClosingPeriodError('start date has to be in the future');
    }
  }

  private static assertEndDateIsValid(startDate: Date, endDate: Date): void {
    if (!endDate) {
      throw new InvalidClosingPeriodError('end date has to be defined');
    }
    if (ClosingPeriod.isBeforeNowIgnoringHours(endDate)) {
      throw new InvalidClosingPeriodError('end date has to be in the future');
    }
    if (endDate.getTime() < startDate.getTime()) {
      throw new InvalidClosingPeriodError('end date has to be greater than start date');
    }
  }

  private static isBeforeNowIgnoringHours(date: Date): boolean {
    const now: Date = new Date();
    now.setHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    return date.getTime() < now.getTime();
  }
}

export interface ClosingPeriodFactoryInterface {
  create(command: NewClosingPeriodCommand): ClosingPeriod;
}
