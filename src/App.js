import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { marked } from "marked";

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true,
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: placeholder,
    };
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="title">Markdown Previewer</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="text-center">
                <h4>Markdown Input</h4>
              </div>
              <div className="input">
                <textarea
                  id="editor"
                  className="input"
                  value={this.state.input}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="col text-center">
                <h4>Preview</h4>
              </div>
              <div
                id="preview"
                dangerouslySetInnerHTML={{
                  __html: marked(this.state.input, {
                    renderer: renderer,
                  }),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
