import * as usersApi from "./usersApi";

jest.mock("./usersApi");

describe("fetch apis", () => {
  it("should fetch users", async () => {
    const users = [
      {
        _id: "1",
        name: "John Doe",
        email: "test@test.com",
        phone: "1234567890",
      },
    ];
    usersApi.fetchUsers.mockResolvedValue(users);
    const result = await usersApi.fetchUsers();
    expect(result).toEqual(users);
  });

  it("should add user", async () => {
    const newUser = {
      _id: "1",
      name: "John Doe",
      email: "test@test.com",
      phone: "1234567890",
    };
    usersApi.addUserAPI.mockResolvedValue(newUser);
    const result = await usersApi.addUserAPI(newUser);
    expect(result).toEqual(newUser);
  });

  it("should update user", async () => {
    const updatedUser = {
      _id: "1",
      name: "John Doe1",
      email: "test@test.com",
      phone: "1234567890",
    };

    usersApi.updateUserAPI.mockResolvedValue(updatedUser);
    const result = await usersApi.updateUserAPI(updatedUser._id, updatedUser);
    expect(result).toEqual(updatedUser);
  });

  it("should delete user", async () => {
    const userId = "1";
    usersApi.deleteUserAPI.mockResolvedValue(userId);
    const result = await usersApi.deleteUserAPI(userId);
    expect(result).toEqual(userId);
  });
});
