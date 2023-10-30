/* eslint-disable prettier/prettier */
function populateTestTypeData(
  testType,
  totalTestCases,
  totalPass,
  totalFail,
  link
) {
  const passCountElement = document.getElementById(`${testType}PassCount`);
  const failCountElement = document.getElementById(`${testType}FailCount`);
  const totalCountElement = document.getElementById(`${testType}TotalCount`);
  const linkReport = document.getElementById(`${testType}Link`);

  passCountElement.textContent = totalPass;
  failCountElement.textContent = totalFail;
  totalCountElement.textContent = totalTestCases;
  linkReport.innerHTML = `<a class="link" href="${link}">View Report 👉</a>`;
}

fetch('report.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((type) => {
      populateTestTypeData(
        type.testType.toLowerCase().replace(' ', ''),
        type.totalTestCases,
        type.totalPass,
        type.totalFail,
        type.reportLink
      );
    });

    const heading = document.getElementById('heading');
    heading.textContent = `Driver App Summary Report - ${data[0].reportDate}`;

    const executor = document.getElementById('buildUrl');
    executor.innerHTML = `<a
          class="link"
          href="${data[0].buildUrl}"
          id="buildUrl"
        >
          #GitHub Actions Run 👉
          <span class="fa fa-external-link"></span>
        </a>`
  })
  .catch((error) => {
    console.error('Error fetching test data:', error);
  });
