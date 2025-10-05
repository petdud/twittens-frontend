import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_PATHS, BASE_API_URL } from '../../../core/routes';

const API = `${BASE_API_URL}${API_PATHS.GET_MOST_FOLLOWED_USERS}`;
const SOCIAL = 'twitter';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { page, limit } = req.query;
    const apiResponse = await axios.get(API, {
      params: {
        page: Number(page as string) || 1,
        limit: Number(limit as string) || 100,
        social: SOCIAL
      },
      headers: {
        'Accept-Encoding': 'gzip, deflate' // Remove Brotli compression
      }
    });
    console.log('apisResponse', apiResponse);
    res.status(200).json(apiResponse.data);
  } catch (err: AxiosError | any) {
    console.log('API Error Details:', {
      message: err.message,
      code: err.code,
      status: err.response?.status,
      statusText: err.response?.statusText,
      url: API,
      params: {
        page: Number(req.query.page as string) || 1,
        limit: Number(req.query.limit as string) || 100,
        social: SOCIAL
      }
    });

    if (axios.isAxiosError(err)) {
      res
        .status(Number(err?.response?.status || 500))
        .json({ error: `Failed to load data: ${err.message}` });
    } else {
      res.status(500).json({ error: `Failed to load data: ${err.message}` });
    }
  }
};

export default handler;
