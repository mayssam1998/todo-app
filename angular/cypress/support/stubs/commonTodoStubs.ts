type StubObject = {
  method: 'GET' | 'POST';
  url: string;
  response: { fixture: string } | any;
  alias: string;
};

const defaultApiStubs: StubObject[] = [
  {
    method: 'GET',
    url: '**/todos',
    response: { fixture: 'todos/getTodos' },
    alias: 'getTodos',
  },
];

export function stubApiCalls(additionalStubs: StubObject[] = []) {
  const allStubs: StubObject[] = [...defaultApiStubs, ...additionalStubs];

  allStubs.forEach((endpoint) => {
    cy.intercept(endpoint.method, endpoint.url, endpoint.response).as(
      endpoint.alias
    );
  });
}
