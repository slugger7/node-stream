import axios from "axios";

const server = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/fs`,
});

export const getFilesAtDir = async (directory) => {
  try {
    const response = await server.get(
      `/videos?dir=${encodeURIComponent(directory)}`
    );
    return response.data;
  } catch (err) {
      console.error('Error occured when fetching files', err);
      return [];
  }
};

