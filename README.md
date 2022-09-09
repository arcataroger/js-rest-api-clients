[![Node.js CI](https://github.com/datocms/js-rest-api-clients/actions/workflows/node.js.yml/badge.svg)](https://github.com/datocms/js-rest-api-clients/actions/workflows/node.js.yml)

# DatoCMS JS REST API Clients

This monorepo contains API clients to interact with DatoCMS:

- `@datocms/cma-client-browser`: Client for the [Content Management API](https://www.datocms.com/docs/content-management-api) (to be used in browser environments).
- `@datocms/cma-client-node`: Client for the [Content Management API](https://www.datocms.com/docs/content-management-api) (to be used in NodeJS environments).
- `@datocms/dashboard-client`: Client for the Dashboard Management API (can be used in any JS environment).
- `@datocms/rest-api-events`: Can be used with any of the above clients to use real-time updates instead of polling to retrieve the result of asyncronous jobs.

You can read more on how to use these clients on the [official documentation page](https://www.datocms.com/docs/content-management-api/using-the-nodejs-clients).

<br /><br />
<a href="https://www.datocms.com/">
<img src="https://www.datocms.com/images/full_logo.svg" height="60">
</a>
<br /><br />

## Development

After checking out the repo, run the following:

```
npm install
lerna bootstrap
npm run build
```

Then, to run the test suite: `npm run test`.

To regenerate the code based on the latest DatoCMS JSON API schema:

```
npm run generate
npm run build
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/datocms/js-rest-api-clients. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
