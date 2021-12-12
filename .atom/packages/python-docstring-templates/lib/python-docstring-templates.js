'use babel';

import { CompositeDisposable } from 'atom';

const BLOCKR = '"""[summary]\n\
\n\
Arguments:\n\
    name {type} -- [description]\n\
\n\
Keyword Arguments:\n\
    name {type} -- [description] (default: {value})\n\
\n\
Raises:\n\
    type: [description]\n\
\n\
Returns:\n\
    type -- [description]\n\
"""';

const EPY = '"""[summary]\n\
\n\
@param name (type): [description]\n\
@return (type): [description]\n\
@raise type: [description]\n\
\n\
"""';

const GOOGLE = '"""[summary]\n\
\n\
Args:\n\
    name (type): [description]\n\
    name (type, optional): [description]. Defaults to value.\n\
\n\
Raises:\n\
    type: [description]\n\
\n\
Returns:\n\
    type: [description]\n\
"""';

const NUMPY = '"""[summary]\n\
\n\
Parameters\n\
----------\n\
name : type\n\
    [description]\n\
name : type, optional\n\
    [description], by default value\n\
\n\
Returns\n\
-------\n\
type\n\
    [description]\n\
\n\
Raises\n\
------\n\
type\n\
    [description]\n\
"""';

const RST = '"""[summary]\n\
\n\
:param name: [description]\n\
:type name: type\n\
:param name: [description], defaults to [value]\n\
:type name: type, optional\n\
:raises type: [description]\n\
:return: [description]\n\
:rtype: type\n\
"""';

const TEMPLATES = {
    docBlockr: BLOCKR,
    Epytext: EPY,
    Googledoc: GOOGLE,
    Numpydoc: NUMPY,
    reStructuredText: RST
};

export default {

  subscriptions: null,

  config: {
    format: {
      title: 'Avaliable docstring formats',
      description: 'Pik a format for Python docstrings.\n\
      Read more: http://daouzli.com/blog/docstring.html',
      type: 'string',
      default: 'reStructuredText',
      enum: Object.keys(TEMPLATES),
    },
  },

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up
    // with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'python-docstring-templates:insert': () => this.insert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  insert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      // Opened editor must be a Python source file
      filext = editor.getTitle().split('.').pop();
      if (filext != 'py') {
        return;
      }
      // We need the actual position to corretly indent the docstring
      const indentation = editor.getCursorBufferPosition().column;
      // User defined style at config
      const style = atom.config.get('python-docstring-templates.format');
      let docstring = '';
      // If its not a valid style, do nothing
      if (!Object.keys(TEMPLATES).includes(style)) {
        // REVIEW: Maybe something more visual
        console.log('Unknown style for docstring: ' + style);
        return;
      }
      // Get the template and insert at current position with indentation
      lines = TEMPLATES[style].split('\n')
      for (var i=0; i < lines.length; i++) {
        if (i > 0 && lines[i] != '') {
            docstring += ' '.repeat(indentation);
        }
        docstring += lines[i];
        docstring += '\n';
      }
      editor.insertText(docstring);
    }
  }

};
