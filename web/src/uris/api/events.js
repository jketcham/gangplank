import ResourceURI from '../resource-uri';


const EventsURI = new ResourceURI({
  pathname: '/api/events',
  query: '{?order,sort,start_gt,start_lt,owner}',
  defaultQuery: {
    start_gt: new Date().toISOString(),
    sort: 'start',
  },
});

const EventURI = new ResourceURI({
  pathname: '/api/events/{id}',
});


export { EventsURI, EventURI };
