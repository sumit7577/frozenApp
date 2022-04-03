export const GETUSER = `{
    customer (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`;