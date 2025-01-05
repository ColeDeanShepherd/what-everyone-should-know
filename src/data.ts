
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

export function getPathToNode(node: IBookNode): IBookNode[] {
  const ancestors = [];
  let current: IBookNode | undefined = node;
  while (current) {
    ancestors.unshift(current);
    current = current.parent;
  }
  return ancestors;
}

export function getOrderedNodes(node: IBookNode): IBookNode[] {
  const orderedNodes: IBookNode[] = [];

  function recurse(node: IBookNode) {
    orderedNodes.push(node);
    node.children.forEach(recurse);
  }

  recurse(node);

  return orderedNodes;
}

export function getPrevAndNextNodes(node: IBookNode): { prevNode: IBookNode | undefined, nextNode: IBookNode | undefined } {
  const orderedNodes = getOrderedNodes(bookData);
  const nodeIndex = orderedNodes.indexOf(node);
  const prevNodeIndex = nodeIndex - 1;
  const nextNodeIndex = nodeIndex + 1;

  return {
    prevNode: (prevNodeIndex >= 0) ? orderedNodes[prevNodeIndex] : undefined,
    nextNode: (nextNodeIndex < orderedNodes.length) ? orderedNodes[nextNodeIndex] : undefined
  };
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
      contents: '<p>Basic math skills are fundamental for navigating daily life, from managing personal finances to understanding statistics in the news. Being comfortable with addition, subtraction, multiplication, division, fractions, and percentages is essential. These skills help you make informed decisions, solve everyday problems, and avoid being misled by misleading figures or calculations.</p>',
      children: [
        {
          title: 'Numbers',
          contents: '<p>Numbers are the foundation of all math and essential for everyday life. They allow us to measure, compare, and make decisions based on quantity. At a minimum, you should be comfortable with whole numbers, fractions, decimals, and negative numbers. A solid grasp of numbers helps with budgeting, cooking, time management, and countless other daily tasks.</p>',
          children: []
        },
        {
          title: 'Addition',
          contents: '<p>Addition is one of the most fundamental math skills, and it forms the basis for almost all other arithmetic operations. Being able to add quickly and accurately is essential for everyday tasks like budgeting, measuring, and comparing quantities. Make sure you\'re comfortable adding both small and large numbers, with and without a calculator, as this skill is a building block for more advanced math concepts.</p>',
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
    },
    {
      title: 'Personal Finance',
      contents: '<p>For better or for worse, money runs the world, and your knowledge of personal finance can be the difference between a comfortable life and a life of struggle.</p>',
      children: [
        {
          title: 'Budgeting',
          contents: '',
          children: []
        },
        {
          title: 'Saving',
          contents: '',
          children: []
        },
        {
          title: 'Investing',
          contents: '',
          children: []
        },
        {
          title: 'Debt Management',
          contents: '',
          children: []
        },
        {
          title: 'Credit Score',
          contents: '',
          children: []
        },
        {
          title: 'Insurance',
          contents: '',
          children: []
        },
        {
          title: 'Tax Planning',
          contents: '',
          children: []
        },
        {
          title: 'Retirement Planning',
          contents: '',
          children: []
        },
        {
          title: 'Insurance',
          contents: '',
          children: []
        },
        {
          title: 'Investment Compounding',
          contents: '',
          children: []
        },
        {
          title: 'Passive Index Funds',
          contents: '',
          children: []
        },
        {
          title: 'Retirement Accounts',
          contents: '',
          children: []
        },
        {
          title: 'Taxes',
          contents: '',
          children: []
        },
        {
          title: 'Savings Accounts',
          contents: '',
          children: []
        },
        {
          title: 'Emergency funds',
          contents: `
            <ul>
              <li>In life, shit happens.</li>
              <li>Plan for it.</li>
              <li>Keep 3 months of expenses, or more, in the bank at all times.</li>
            </ul>`,
          children: []
        },
        {
          title: 'Gambling',
          contents: `
            <ul>
              <li>The house wins in the long run</li>
              <li>Gambler's fallacy</li>
            </ul>`,
          children: []
        }
      ]
    },
    {
      title: 'Health',
      contents: '',
      children: []
    },
    {
      title: 'Mastering your Mind',
      contents: '',
      children: [
        {
          title: 'Dopamine',
          contents: '',
          children: []
        },
        {
          title: 'Mind wandering',
          contents: '',
          children: []
        },
        {
          title: 'Imagination',
          contents: '',
          children: []
        },
        {
          title: 'Unconcious',
          contents: '',
          children: []
        },
        {
          title: 'Ego',
          contents: '<p>Be humble, the world is much bigger than you</p>',
          children: []
        },
        {
          title: 'Delayed gratification',
          contents: '',
          children: []
        },
        {
          title: 'Two systems of thinking',
          contents: '',
          children: []
        },
        {
          title: 'Logical fallacies',
          contents: '',
          children: []
        },
        {
          title: 'Cognitive bias',
          contents: '',
          children: []
        },
        {
          title: 'Critical thinking',
          contents: '',
          children: []
        },
        {
          title: 'Ups &amp; downs',
          contents: '',
          children: []
        },
        {
          title: 'Thought spirals',
          contents: '',
          children: []
        },
        {
          title: 'Everything is temporary',
          contents: '',
          children: []
        },
        {
          title: 'Coping mechanisms',
          contents: '',
          children: []
        },
        {
          title: 'Stress, anxiety, depression',
          contents: '',
          children: []
        },
        {
          title: 'Therapy',
          contents: '',
          children: []
        },
        {
          title: 'Habits',
          contents: '',
          children: []
        },
        {
          title: 'Hedonic treadmill',
          contents: '',
          children: []
        },
        {
          title: 'Fears &amp; phobias',
          contents: '',
          children: []
        },
      ]
    }
  ]
};

initParentLinks(bookData);