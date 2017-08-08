import _ from 'lodash';
import URI from 'urijs';
import URITemplate from 'urijs/src/URITemplate';


class ResourceURI {
  constructor({ pathname, query, defaultQuery }) {
    this.pathname = pathname;
    this.query = query || '';
    this.defaultQuery = defaultQuery || {};
    this.URITemplate = new URITemplate(`${this.pathname}${this.query}`);
  }

  expand(query) {
    let parsedQuery = query;

    if (typeof query === 'string') {
      parsedQuery = this.extract(query);
    }

    const nextQuery = _.assign({}, this.defaultQuery, parsedQuery);
    return this.URITemplate.expand(nextQuery);
  }

  extract(querystring) {
    return new URI(querystring).search(true);
  }
}


export default ResourceURI;
