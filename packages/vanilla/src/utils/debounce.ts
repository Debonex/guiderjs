// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor = 20
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export default debounce;
