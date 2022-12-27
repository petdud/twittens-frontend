import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_PATHS, BASE_API_URL } from "../../../core/constants";

const API = `${BASE_API_URL}${API_PATHS.COLLECTIONS}`;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const body = req.body;
  try {
    if (body) {
      const apiResponse = await axios.post(`${API}`, {
        data: body,
        headers: {
          'Authorization': `Basic ${process.env.NEXT_PUBLIC_API_AUTHORIZATION_TOKEN}` 
        }
      });
      res.status(200).json(apiResponse.data)
    } else {
      res.status(500).json({ error: `Wrong ID` });
    }
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