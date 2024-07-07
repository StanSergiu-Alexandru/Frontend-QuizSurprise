const requestUrls = {
  authLogin: 'http://192.168.0.127:8083/auth/login',
  authRegister: 'http://192.168.0.127:8083/auth/register',

  getQuestion(type: string) {
    return `http://192.168.0.127:8083/quiz/generateQuestion?subjectType=${type}`;
  },

  validateQuestion(id: number | undefined) {
    return `http://192.168.0.127:8083/quiz/check-answers/${id}`;
  },
};

export default requestUrls;
