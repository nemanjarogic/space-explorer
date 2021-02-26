# Space Explorer

Space Explorer is a full-stack & GraphQL-powered app built using ReactJS and Apollo platform.

This is an interactive app for reserving a seat on an upcoming SpaceX launch. Think of it as an Airbnb for space travel! All of the data is real, thanks to the [SpaceX-API](https://github.com/r-spacex/SpaceX-API).

![Space explorer](https://www.apollographql.com/docs/a81f37ed9dd7c56e7eb9ee3b52769e8d/space-explorer.png "Space explorer")

The app includes the following views:

<ul>
  <li>A login page</li>
  <li>A list of upcoming launches</li>
  <li>A detail view for an individual launch</li>
  <li>A user profile page</li>
  <li>A cart</li>
</ul>

To populate these views, app's data graph is connected to two data sources: a REST API and a SQLite database.
The [SpaceX-API](https://github.com/r-spacex/SpaceX-API) is a read-only data source for fetching launch data. The [SQLite database](https://www.sqlite.org/index.html) is used as a writable data source that allows us to store application data, such as user identities and seat reservations. [Sequelize](https://sequelize.org/) is used for ORM.


For more details take a look at [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd server && npm i && npm start
```

and

```bash
cd client && npm i && npm start
```

### Configure deployed graph (optionally)

<ol>
  <li>From your studio homepage (https://studio.apollographql.com/), click <b>New Graph</b> in the upper right.</li>
  <li>Provide a name for your graph and set the <b>Graph type</b> to <b>Deployed</b>.</li>
  <li>Click <b>Next</b>. A dialog appears instructing you to register your schema.</li>
  <li>Create a <b>.env</b> file in /server directory and paste the environment variables from the dialog.</li>
</ol>

For more details take a look at this [page](https://www.apollographql.com/docs/tutorial/production/).
