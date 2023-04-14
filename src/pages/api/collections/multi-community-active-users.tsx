import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_API_URL, API_PATHS } from "../../../core/routes";

const API = BASE_API_URL + API_PATHS.GET_MULTI_COLLECTION_ACTIVE_USERS();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const slugs = req.query.slugs;
  try {
    const apiResponse = await axios.get(`${API}?slugs=${slugs}`);
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
