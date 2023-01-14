import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_PATHS, BASE_API_URL } from "../../../core/routes";

const API = `${BASE_API_URL}${API_PATHS.COLLECTIONS}`;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { slug }= req.query;
  const data = req.body;
  try {
    if (slug && data) {
      const apiResponse = await axios.patch(`${API}/${slug}`, data, { 
        headers: {
          'Authorization': `Basic ${process.env.NEXT_PUBLIC_API_AUTHORIZATION_TOKEN}` 
        }
      });
      res.status(200).json(apiResponse.data)
    } else {
      res.status(409).json({ error: `Wrong slug: ${slug}, or status: ${status}` });
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