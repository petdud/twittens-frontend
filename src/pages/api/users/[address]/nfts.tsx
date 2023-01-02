import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_API_URL } from "../../../../core/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const address = req.query.address;
    const apiResponse = await axios.get(`${BASE_API_URL}users/${address}/nfts`);
    res.status(200).json(apiResponse.data);
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
