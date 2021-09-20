// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function substringReplace(
  str: string | unknown[],
  repl: string,
  init: number,
  size: number | undefined,
) {
  if (init < 0) {
    init = init + str.length;
  }

  size = size !== undefined ? size : str.length;
  if (size < 0) {
    size = size + str.length - init;
  }

  return [str.slice(0, init), repl.substr(0, size), repl.slice(size), str.slice(init + size)].join('');
}
