import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const bundles = getBundles(stats, modules);
const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'))
chunks.map(chunk => `<script src="/${chunk.file}"></script>`).join('\n')


ReactDOM.render(<App />, document.getElementById("root"));
