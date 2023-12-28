export const get = <V>(keyName: string, defaultValue?: V) => {
  try {
    const value = window.localStorage.getItem(keyName);

    if (value) {
      return JSON.parse(value) as V;
    }

    window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
    return defaultValue;
  } catch {
    return defaultValue;
  }
};

export const set = <V>(keyName: string, value: V) => {
  try {
    window.localStorage.setItem(keyName, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const remove = (keyName: string) => {
  window.localStorage.removeItem(keyName);
};
