// tests/search.tests.js

const request = require("supertest");
const app = require("../app");
const User = require("../src/models/User");

describe("User Authentication", () => {
  let userToken;

  // Test case for user sign-up
  describe("Sign Up", () => {
    it("should allow a user to sign up with valid credentials", async () => {
      const response = await request(app).post("/api/users/signup").send({
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "User created successfully"
      );
    });

    it("should return 400 if required fields are missing during sign up", async () => {
      const response = await request(app).post("/api/users/signup").send({
        last_name: "Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  // Test case for user sign-in
  describe("Sign In", () => {
    it("should allow a user to sign in with correct credentials", async () => {
      const response = await request(app).post("/api/users/signin").send({
        email: "john@example.com",
        password: "password123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Authentication successful"
      );
      expect(response.body).toHaveProperty("token");
      userToken = response.body.token;
    });
  });

  // Test case for user sign-out
  /*
  describe("Sign Out", () => {
    it("should allow a user to sign out successfully", async () => {
      const response = await request(app)
        .get("/api/users/signout")
        .set("Authorization", `Bearer ${userToken}`);
      console.log('Sign-out response:', response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Sign out successful");
    });
  });
  */
});

afterAll(async () => {
  await User.deleteMany({});
});
