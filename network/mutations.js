export const GETPRODUCT = `{
    products (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`;