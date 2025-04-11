export const getSqlQuery = (query: string, params: any[]) => {
  let i = 0;
  return query
    .split('')
    .map((char) => {
      if (char === '?') {
        char = typeof params[i] === 'string' ? `'${params[i]}'` : params[i];
        i++;
      }
      return char;
    })
    .join('');
};
