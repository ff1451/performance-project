export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateNickname = (nickname: string) => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const item = localStorage.getItem(key);
    if (!item) continue;
    try {
      const user = JSON.parse(item);
      if (user && user.nickname === nickname) {
        return "이미 사용중인 닉네임입니다.";
      }
    } catch (e) {
      continue;
    }
  }
  return "";
};
