import dynamoose from "dynamoose";

const userSchema = new dynamoose.Schema(
  {
    id: {
      type: Number,
      hashKey: true,
    },
    firstName: String,
    lastName: String,
    email: String,
    gender: {
      type: String,
      enum: ["Female", "Genderfluid", "Male", "Polygender", "Bigender", "Agender", "Non-binary", "Genderqueer"],
    },
    ipAddress: String,
    dateJoined: {
      type: Number,
      index: {
        type: "global",
        project: true,
        name: "dateJoinedIndex",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UsersModel = dynamoose.model("user", userSchema);
