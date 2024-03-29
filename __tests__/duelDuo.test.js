const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test("clicking draw button displays the choices div", async () => {
    await driver.get("http://localhost:8000");
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();
    const choicesDiv = await driver.findElement(By.id("choices"));
    expect(await choicesDiv.isDisplayed()).toBe(true);
  });

  test("remove bot from duo returns it to choices", async () => {
    await driver.get("http://localhost:8000");
    const drawButton = await driver.findElement(By.id("draw"));
    await drawButton.click();

    const addToDuoButtons = await driver.findElements(By.className("bot-btn"));
    await addToDuoButtons[0].click();

    const playerDuoDiv = await driver.findElement(By.id("player-duo"));
    const botInPlayerDuo = await playerDuoDiv.findElement(
      By.className("bot-card")
    );
    expect(await botInPlayerDuo.isDisplayed()).toBe(true);

    const removeFromDuoButtons = await driver.findElements(
      By.className("bot-btn")
    );
    await removeFromDuoButtons[0].click();

    const choicesDiv = await driver.findElement(By.id("choices"));
    const botInChoices = await choicesDiv.findElement(By.className("bot-card"));
    expect(await botInChoices.isDisplayed()).toBe(true);
  });
});
