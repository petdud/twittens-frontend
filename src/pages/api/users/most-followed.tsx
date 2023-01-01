import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_PATHS, BASE_API_URL } from "../../../core/constants";

const API = `${BASE_API_URL}${API_PATHS.GET_MOST_FOLLOWED_USERS}`;

const handler = async (_req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const apiResponse = await axios.get(API);
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
