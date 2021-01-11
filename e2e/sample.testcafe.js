import { Selector as $ } from "testcafe";

fixture`Main page`.page`../dist/index.html`;

test("Подсвечивает первый h3", async t => {
  await t
    .typeText(".jsninja input", "h3")
    .click(".jsninja input[type=submit]")
    .expect($("h3").hasClass("highlight"))
    .ok();
});

test("Правильно инициализирует кнопки вперед назад", async t => {
  await t
    .selectText(".jsninja input")
    .pressKey("delete")
    .typeText(".jsninja input", "h3")
    .click(".jsninja input[type=submit]")
    .expect($("h3").hasClass("highlight"))
    .ok();

  await t.expect($("[data-prev]").hasAttribute("disabled")).ok();
  await t.expect($("[data-next]").hasAttribute("disabled")).notOk();
  await t.expect($(".highlight").count).eql(1);
  await t
    .click("[data-prev]")
    .expect(
      $("h3")
        .nth(0)
        .hasClass("highlight")
    )
    .ok();

  await t.expect($(".highlight").count).eql(1);
});

test("Правильно блокирует кнопки вперед назад", async t => {
  await t
    .selectText(".jsninja input")
    .pressKey("delete")
    .typeText(".jsninja input", "h3")
    .click(".jsninja input[type=submit]")
    .expect($("h3").hasClass("highlight"))
    .ok();

  await t.expect($("[data-prev]").hasAttribute("disabled")).ok();
  await t.expect($("[data-next]").hasAttribute("disabled")).notOk();
  await t.expect($(".highlight").count).eql(1);
  await t.click("[data-up]");

  await t.expect($("[data-prev]").hasAttribute("disabled")).ok();
  await t.expect($("[data-next]").hasAttribute("disabled")).ok();

  await t.expect($(".highlight").count).eql(1);
});
