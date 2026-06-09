import api from './api';

export const aiService = {
  getTranscript: async (meetingId: string) => {
    return api.get(`/ai/transcript/${meetingId}`);
  },
  getSummary: async (meetingId: string) => {
    return api.get(`/ai/summary/${meetingId}`);
  },
  getActionItems: async (meetingId: string) => {
    return api.get(`/ai/action-items/${meetingId}`);
  },
  generateSmartReport: async (meetingId: string) => {
    return api.post(`/ai/report/${meetingId}`);
  }
};

export default aiService;
