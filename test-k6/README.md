# k6 Tests

## How to run k6 tests

1. Before running the tests, please check if you have k6 installed. If not, check the [documentation](https://grafana.com/docs/k6/latest/set-up/install-k6/) and install k6 package for your operating system. Make sure your verion matches version of type package `@types/k6`, which you can find in dev dependencies of the project.

2. Start your API in a separate terminal. You can use `yarn start` command to start the API. Make sure that you have access to the ElasticSearch cluster (update your .env file if needed, here you can find a credentials for ElasticSearch [link](https://start.1password.com/open/i?a=UDJEA2A425AM3LIT5SOL6HD3MU&v=jmwkvt5n2rgi4quixm2ur3jtiy&i=sodiezd5orhaboz55cxi4xpq2e&h=propertyguru.1password.com)).

3. Create your .env file, copy env variables from .env.example (the one from test-k6 folder) and complete it with your data.

```
cp test-k6/.env.example test-k6/.env
```

Make sure that the port of your API is the same as in your .env file.

4. To locally run regression tests with k6 use:

```bash
$ yarn test:k6
```

To run a specific query, use the --query flag. For example:

```bash
yarn test:k6 --query=salesMetadataMY
```

You can check possible queries [here](./constants.ts).

## k6 tests setup guide

Follow these steps to set up and write k6 tests:

1. Define a folder for the query. Create a dedicated folder for the specific query you are testing.

2. Write tests for this query.

Implement k6 tests for the query you need to verify. Make sure you organize tests into [groups](https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/#groups). Group related tests together for better structure and maintainability.
Example: [test](./sales-metadata-my/test.ts).

3. Update [setup.ts](./setup.ts).

Create exec function in `setup.ts`, e.g.:

```typescript
export const executeSalesMetadataMY = (data: SetUpParameters) => salesMetadataMY(data.requestUrl)
```

Use exec function in Scenarios. Link the functions to your scenarios in `setup.ts`, e.g.:

```typescript
export const SCENARIOS: Record<string, Scenario> = {
    salesMetadataMY: createScenario('executeSalesMetadataMY'),
}
```
