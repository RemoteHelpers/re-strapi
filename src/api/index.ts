/* eslint-disable @typescript-eslint/quotes */
import axios from "axios";
import { IFeedbackFormData } from "../types/types";

axios.defaults.baseURL = "http://testseven.rh-s.com:1733/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

type TUploadFile = {
  files: File;
  fileInfo?: {
    name: string;
    caption: string;
    alternativeText: string;
    folder: string | null;
  };
};

const Api = {
  async feedBackForm(data: IFeedbackFormData): Promise<{
    id: number;
    attributes: IFeedbackFormData;
  }> {
    const res = await axios.post("/form-users", { data });

    return res.data.data;
  },

  async uploadFile(data: TUploadFile) {
    const res = await axios.post("/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res?.data?.length !== 0) {
      return res.data;
    }

    return [];
  },
};

export default Api;
