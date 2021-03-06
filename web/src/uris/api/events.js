import ResourceURI from '../resource-uri';


const EventsURI = new ResourceURI({
  pathname: '/api/events',
  query: '{?order,start_gt,start_lt,owner,page,page_size}',
  defaultQuery: {
    start_gt: new Date().toISOString(),
    order: 'start',
  },
});

const EventURI = new ResourceURI({
  pathname: '/api/events/{id}',
});


export { EventsURI, EventURI };
