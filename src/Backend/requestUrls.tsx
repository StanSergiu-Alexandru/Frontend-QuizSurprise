const baseUrl = 'http://192.168.1.196:8083';
const TabletUrl = 'http://192.168.0.127:8083';

const requestUrls = {
  authLogin: `${baseUrl}/auth/login`,
  authRegister: `${baseUrl}/auth/register`,

  getQuestion(type: string) {
    return `${baseUrl}/quiz/generateQuestion?subjectType=${type}`;
  },

  validateQuestion(id: number | undefined, userId: number | undefined) {
    return `${baseUrl}/quiz/check-answers/${id}/${userId}`;
  },

  increaseUserPoint(id: number) {
    return `${baseUrl}/quizsurprise/userpoints/update/${id}`;
  },
  getUsersAndPoints: `${baseUrl}/quizsurprise/getUsersByPoints`,
};

export default requestUrls;
