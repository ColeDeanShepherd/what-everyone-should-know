
export interface IBookNode {
  title: string;
  contents: string;
  children: IBookNode[];
  parent?: IBookNode;
}

function initParentLinks(node: IBookNode, parent?: IBookNode) {
  node.parent = parent;
  node.children.forEach(child => initParentLinks(child, node));
}

export function getAncestorsStartFromRoot(node: IBookNode): IBookNode[] {
  const ancestors = [];
  let current: IBookNode | undefined = node;
  while (current) {
    ancestors.unshift(current);
    current = current.parent;
  }
  return ancestors;
}

export const bookData: IBookNode = {
  title: 'What Everyone Should Know',
  contents: `
    <h2>By: Cole Shepherd</h2>
    <p>There's a lot we need to know to be happy, healthy, good people in today's society, and unfortunately we learn very little of it in school. This book is an attempt to cover all of this information at a high level in an unbiased way, and fill in the gaps left by our school system.</p>`,
  children: [
    {
      title: 'Speech',
      contents: '',
      children: []
    },
    {
      title: 'Literacy',
      contents: '',
      children: [
        {
          title: 'How to Read',
          contents: '<p>This is an obvious one, and you already know how to do this if you\'re here. This is one of the most important skills to learn, and without it you cannot effectively function in the world or educate yourself with the vast body of written works in this world. Be sure your vocabulary and reading skills are at least at a high-school level.</p>',
          children: []
        },
        {
          title: 'How to Write',
          contents: '<p>Another obvious one, and an extension of speaking and reading skills. Most people write daily in text messages, emails, and chat apps, so this is another absolutely essential skill. Be sure you can write grammatically correct, complete sentence that concisely convey your message.</p>',
          children: []
        }
      ]
    },
    {
      title: 'Basic Math',
      contents: '',
      children: [
        {
          title: 'Numbers',
          contents: '',
          children: []
        },
        {
          title: 'Addition',
          contents: '',
          children: []
        },
        {
          title: 'Subtraction',
          contents: '',
          children: []
        },
        {
          title: 'Multiplication',
          contents: '',
          children: []
        },
        {
          title: 'Division',
          contents: '',
          children: []
        },
        {
          title: 'Fractions',
          contents: '',
          children: []
        },
        {
          title: 'Percentages',
          contents: '',
          children: []
        }
      ]
    }
  ]
};

initParentLinks(bookData);