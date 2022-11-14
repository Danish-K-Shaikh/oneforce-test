import express, { Request, Response } from "express";
import UserService from "../../service/user";

const router = express.Router();

async function getUserById(req: Request, res: Response) {
  const userObj = new UserService();
  const id: string = req.params.id || "";

  const user = await userObj.getUserById(id);
  if (!user) return res.status(404).json({ msg: `No User found with id ${id}.` });
  return res.status(200).json({ data: user });
}

async function saveUser(req: Request, res: Response) {
  try {
    const user = new UserService();

    const users = await user.saveUser(req.body);
    return res.status(200).json({ data: users });
  } catch (e: any) {
    let errorMsg = { msg: "Internal Server error", error: e };
    let status = 500;
    switch (e.name) {
      case "ConditionalCheckFailedException":
        errorMsg.msg = `User already exists with id ${req.body.id}`;
        status = 422;
    }
    return res.status(status).json(errorMsg);
  }
}

async function listUserByDateJoined(req: Request, res: Response) {
  const user = new UserService();
  const users = await user.listUserByDateJoined(req.query);
  return res.status(200).json({ data: users });
}

router.get("/list", listUserByDateJoined);
router.get("/:id", getUserById);
router.post("/", saveUser);
export default router;
