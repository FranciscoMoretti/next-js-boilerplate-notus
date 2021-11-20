/**
 * return indentation for a level
 * @param level
 */
const getIndent = (level: number) => {
  let result = '',
    i: number = level * 4;
  if (level < 0) {
    throw 'Level is below 0';
  }
  while (i--) {
    result += ' ';
  }
  return result;
};

/**
 * Format and beautify html output
 * @param html the html to format
 */
export const formatHtml = (html: string) => {
  html = html.trim();
  const tokens = html.split(/</);
  let result = '',
    indentLevel = 0;

  for (let i = 0, l = tokens.length; i < l; i++) {
    // @ts-ignore
    const parts = tokens[i].split(/>/);
    if (parts.length === 2) {
      // @ts-ignore
      if (tokens[i][0] === '/') {
        indentLevel--;
      }
      result += getIndent(indentLevel);
      // @ts-ignore
      if (tokens[i][0] !== '/') {
        indentLevel++;
      }

      if (i > 0) {
        result += '<';
      }

      // @ts-ignore
      result += parts[0].trim() + '>\n';
      // @ts-ignore
      if (parts[1].trim() !== '') {
        // @ts-ignore
        result += getIndent(indentLevel) + parts[1].trim().replace(/\s+/g, ' ') + '\n';
      }

      // @ts-ignore
      if (parts[0].match(/^(img|hr|br)/)) {
        indentLevel--;
      }
    } else {
      result += getIndent(indentLevel) + parts[0] + '\n';
    }
  }
  return result;
};
