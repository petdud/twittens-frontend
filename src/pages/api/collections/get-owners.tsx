import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_API_URL, API_PATHS } from "../../../core/constants";

const API = `${BASE_API_URL}${API_PATHS.GET_COLLECTION_OWNERS}`;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { contractAddress, chain }= req.query;
  console.log(contractAddress, chain)
  try {
    if (contractAddress) {
      const apiResponse = await axios.get(`${API}/${contractAddress}?chain=${chain}`);
      res.status(200).json(apiResponse.data)
    } else {
      res.status(409).json({ error: `Wrong contract address provided: ${contractAddress}` });
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