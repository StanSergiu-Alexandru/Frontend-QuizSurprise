const baseUrl = 'http://192.168.0.123:8083'
const TabletUrl = 'http://192.168.0.127:8083';

const requestUrls = {
  authLogin: `${baseUrl}/auth/login`,
  authRegister: `${baseUrl}/auth/register`,

  getQuestion(type: string) {
    return `${baseUrl}/quiz/generateQuestion?subjectType=${type}`;
  },

  validateQuestion(id: number | undefined) {
    return `${baseUrl}/quiz/check-answers/${id}`;
  },

  increaseUserPoint(id: number) {
    return `${baseUrl}/quizsurprise/userpoints/update/${id}`;
  },
  getUsersAndPoints: `${baseUrl}/quizsurprise/getUsersByPoints`,
};

export default requestUrls;
