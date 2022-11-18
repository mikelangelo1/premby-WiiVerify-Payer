// generate blob url to host iframe data
export const getGeneratedPageURL = ({ html, css, js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const cssURL = getBlobURL(css, "text/css");
  const jsURL = getBlobURL(js, "text/javascript");

  const source = `
      <html>
        <head>
        </head>
        <body>
          ${html || ""}
        </body>
      </html>
    `;

  return getBlobURL(source, "text/html");
};
