import dummyFunctions from "../../src/services/dummyservice.js";

test("result is true amd returns learning JS", () => {
  // IMPL of test

  const spy = jest.spyOn(dummyFunctions, "helper").mockImplementation(() => {
    return true;
  });
  const result = dummyFunctions.execute();
  expect(result).toBe("Learning JS");
});
