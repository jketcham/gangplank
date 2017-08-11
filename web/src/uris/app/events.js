import ResourceURI from '../resource-uri';


const EventsURI = new ResourceURI({
  pathname: '/events',
  query: '{?order,start_gt,start_lt,owner,page,page_size}',
  defaultQuery: {
    start_gt: new Date().toISOString(),
    order: 'start',
  },
});


export { EventsURI };
