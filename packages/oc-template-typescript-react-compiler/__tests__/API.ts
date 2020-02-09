import * as compiler from "../index";

test("should expose the correct methods", () => {
  expect(compiler).toMatchSnapshot();
});
