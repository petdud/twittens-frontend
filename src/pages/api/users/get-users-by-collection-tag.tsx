import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_PATHS, BASE_API_URL } from "../../../core/routes";

const API = `${BASE_API_URL}${API_PATHS.GET_USERS_BY_COLLECTION_TAG()}`;

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  const social = _req.query.social as string || "twitter";
  const tag = _req.query.tag as string;
  console.log("tag", tag);
  console.log(API + "?" + "social=" + social + "&" + "tag=" + tag)
  try {
    const apiResponse = await axios.get(API + "?" + "social=" + social + "&" + "tag=" + tag);
    res.status(200).json(apiResponse.data)
  } catch(err: AxiosError | any) {
    err.statusCode
    if (axios.isAxiosError(err)) {
      res.status(Number(err?.response?.status || 500)).json({ error: `Failed to load data with error: ${err?.response?.statusText}` })
    } else {
      res.status(500).json({ error: `Failed to load data with error: ${err}` })
    }
  }
};

export default handler;
