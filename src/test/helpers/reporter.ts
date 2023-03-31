import {
  DisplayProcessor,
  SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import JasmineStartedInfo = jasmine.JasmineStartedInfo;
import CustomReporter = jasmine.CustomReporter;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: JasmineStartedInfo, log: string): string {
    return `TypeScript ${info} ${log}`;
  }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayStacktrace: StacktraceOption.PRETTY,
    },
    customProcessors: [CustomProcessor],
  }) as unknown as CustomReporter
);
