const axios = require("axios");
const { searchBooks } = require("../src/controllers/book");

jest.mock("axios");

describe("searchBooks", () => {
  it("should return search results", async () => {
    const req = {
      query: {
        query: "flowers",
        startIndex: 0,
        maxResults: 10,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    axios.get.mockResolvedValue({
      data: {
        totalItems: 2,
        items: [],
      },
    });

    await searchBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
