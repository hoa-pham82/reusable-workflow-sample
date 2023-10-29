/* eslint-disable prettier/prettier */
import fs from 'fs'
import path from 'path'

export function extractData(resultPath, testType, buildNumber=process.argv[2]) {
  const files = fs.readdirSync(resultPath);
  const totalTestRun = files.filter((file) => file.endsWith('.json') && file !== 'executor.json').length;

  let passedCount = 0;
  let failedCount = 0;

  const baseUrl = 'https://hoa-pham82.github.io/reusable-workflow-sample'
  let uri;

  files
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const filePath = path.join(resultPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      if (jsonData.status === 'passed') {
        passedCount++;
      } else if (jsonData.status === 'failed') {
        failedCount++;
      }
    });
  

  if (testType === 'Unit Test') {
    uri = "allure-history-ut";
  }
  else if (testType === 'Android Test') {
    uri = "allure-history-android";
  }
  else {
    uri = "allure-history-ios";
  }

  return {
    testType: testType,
    totalTestCases: totalTestRun,
    totalPass: passedCount,
    totalFail: failedCount,
    reportLink: `${baseUrl}/${uri}/${buildNumber}`
  };
}


let data = [
  extractData('allure-results-ut', 'Unit Test'),
  extractData('allure-results-detox', 'Android Test'),
  extractData('allure-results-detox', 'iOS Test'),
];

const jsonData = JSON.stringify(data, null, 2); 
fs.writeFileSync('report.json', jsonData, 'utf-8');