import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_PATHS, BASE_API_URL } from "../../../core/constants";

const API = `${BASE_API_URL}${API_PATHS.UPDATE_COLLECTION_STATUS}`;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { slug, status }= req.query;
  try {
    if (slug && status) {
      const apiResponse = await axios.patch(`${API}/${slug}?status=${status}`);
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