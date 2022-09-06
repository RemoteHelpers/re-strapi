import axios from 'axios';
import { IFeedbackFormData } from '../types/types';

axios.defaults.baseURL = 'http://testseven.rh-s.com:1733/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const Api = {

  async feedBackForm(data: IFeedbackFormData): Promise<{
    id: number;
    attributes: IFeedbackFormData;
  }> {
    const res = await axios.post('/feedback-forms', { data });

    return res.data.data;
  },

};

export default Api;
