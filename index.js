const assert = require("assert");
const { Builder, By, until, Key } = require("selenium-webdriver");
const edge = require("selenium-webdriver/edge");
require("dotenv").config();

const testcases = require("./data/data.json");

const getAlert = async (driver, target, testcase) => {
  await driver.get(target);
  await driver.findElement(By.id("fullName")).sendKeys(testcase.fullName);
  await driver.findElement(By.id("citizenId")).sendKeys(testcase.citizenId);
  await driver.findElement(By.id("issuedBy")).sendKeys(testcase.issuedBy);
  await driver.findElement(By.id("issuedDate")).sendKeys(testcase.issuedDate);

  await driver.findElement(By.id("gender")).sendKeys(testcase.gender);
  await driver.findElement(By.id("birthday")).sendKeys(testcase.birthday);
  await driver.findElement(By.id("ethnic")).sendKeys(testcase.ethnic);
  await driver.findElement(By.id("phoneNumber")).sendKeys(testcase.phoneNumber);

  await driver.findElement(By.id("email")).sendKeys("test@gmail.com");

  await driver
    .findElement(By.id("permanentAddress"))
    .sendKeys(testcase.permanentAddress);
  await driver
    .findElement(By.id("contactAddress"))
    .sendKeys(testcase.contactAddress);
  await driver.findElement(By.id("school")).sendKeys(testcase.school);
  await driver.findElement(By.id("gradYear")).sendKeys(testcase.gradYear);
  await driver
    .findElement(By.id("admissionArea"))
    .sendKeys(testcase.admissionArea);
  await driver
    .findElement(By.id("admissionPrior"))
    .sendKeys(testcase.admissionPrior);

  await driver.findElement(By.id("major")).sendKeys(testcase.major);

  await driver.findElement(By.id("group")).sendKeys(testcase.group);

  if (testcase.isAdvanced === "TRUE") {
    await driver.findElement(By.id("isAdvanced")).sendKeys(Key.SPACE);
  }

  await driver.findElement(By.id("mathScore")).sendKeys(testcase.mathScore);
  await driver
    .findElement(By.id("physicsScore"))
    .sendKeys(testcase.physicsScore);
  await driver
    .findElement(By.id("chemistryScore"))
    .sendKeys(testcase.chemistryScore);

  await driver
    .findElement(By.id("biologyScore"))
    .sendKeys(testcase.biologyScore);

  await driver
    .findElement(By.id("literatureScore"))
    .sendKeys(testcase.literatureScore);

  await driver
    .findElement(By.id("historyScore"))
    .sendKeys(testcase.historyScore);

  await driver
    .findElement(By.id("geographyScore"))
    .sendKeys(testcase.geographyScore);

  await driver
    .findElement(By.id("foreignLanguageScore"))
    .sendKeys(testcase.foreignLanguageScore);

  await driver
    .findElement(By.id("civicEducationScore"))
    .sendKeys(testcase.civicEducationScore);

  await driver.findElement(By.id("applicationTerm")).sendKeys(Key.SPACE);

  await driver.findElement(By.id("btnSubmit")).sendKeys(Key.ENTER);

  await driver.wait(until.alertIsPresent());
  let confirmAlert = await driver.switchTo().alert();
  await confirmAlert.accept();

  await driver.wait(until.alertIsPresent());
  let resultAlert = await driver.switchTo().alert();
  const result = await resultAlert.getText();
  await resultAlert.accept();

  return result;
};

let service;
let driver;

const target = `http://${process.env.DEFAULT_HOST}:${process.env.DEFAULT_PORT}`;

describe("UI Test", () => {
  before(() => {
    service = new edge.ServiceBuilder(process.env.DEFAULT_WEB_DRIVER);
    driver = new Builder()
      .forBrowser("MicrosoftEdge")
      .setEdgeService(service)
      .setEdgeOptions(new edge.Options().addArguments("--inprivate"))
      .build();
  });

  after(() => {
    driver.quit();
  });

  testcases.forEach((testcase, index) => {
    it(`Testcase ${index + 1}`, async () => {
      const result = await getAlert(driver, target, testcase);
      assert.equal(result, testcase.expectedResult);
    });
  });
});
